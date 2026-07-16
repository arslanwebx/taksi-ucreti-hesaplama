import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const root = new URL('..', import.meta.url);
const fareSource = readFileSync(new URL('../src/data/taxi-fares.ts', import.meta.url), 'utf8');
const pageSource = readFileSync(new URL('../src/data/pages.ts', import.meta.url), 'utf8');
const calculatorSource = readFileSync(new URL('../components/Calculator.tsx', import.meta.url), 'utf8');
const errors = [];

const arrayBody = fareSource.match(/export const taxiFares:[\s\S]*?=\s*\[([\s\S]*?)\n\];/)?.[1] ?? '';
const blocks = [...arrayBody.matchAll(/\{\s*plateCode:[\s\S]*?\n\s*\}/g)].map((match) => match[0]);
const readNumber = (block, field) => Number(block.match(new RegExp(`${field}:\\s*([\\d.]+)`))?.[1]);
const readString = (block, field) => {
  const literal = block.match(new RegExp(`${field}:\\s*("(?:[^"\\\\]|\\\\.)*")`))?.[1];
  return literal ? JSON.parse(literal) : '';
};
const fares = blocks.map((block) => ({
  plateCode: readNumber(block, 'plateCode'),
  city: readString(block, 'city'),
  slug: readString(block, 'slug'),
  region: readString(block, 'region'),
  openingFare: readNumber(block, 'openingFare'),
  perKmFare: readNumber(block, 'perKmFare'),
  minimumFare: readNumber(block, 'minimumFare'),
  dataStatus: readString(block, 'dataStatus'),
  referenceDate: readString(block, 'referenceDate'),
  lastVerified: readString(block, 'lastVerified'),
  sourceUrl: readString(block, 'sourceUrl'),
  implementationStatus: readString(block, 'implementationStatus'),
  note: readString(block, 'note'),
  isEstimated: /isEstimated:\s*true/.test(block),
}));
const pages = [...pageSource.matchAll(/\{slug:'([^']+)',title:'([^']+)',description:'([^']+)'/g)]
  .map((match) => ({ slug: match[1], title: match[2], description: match[3] }));

if (fares.length !== 81) errors.push(`Tarife kayıt sayısı 81 olmalı; ${fares.length} bulundu.`);
const plates = fares.map((fare) => fare.plateCode).sort((a, b) => a - b);
if (plates.some((plate, index) => plate !== index + 1)) errors.push('Plaka kodları 1–81 aralığını eksiksiz kapsamıyor.');
for (const [label, values] of [
  ['şehir', fares.map((fare) => fare.city)],
  ['slug', fares.map((fare) => fare.slug)],
  ['plaka', fares.map((fare) => fare.plateCode)],
]) {
  if (new Set(values).size !== values.length) errors.push(`Tekrarlanan ${label} kaydı bulundu.`);
}

for (const item of fares) {
  if (!item.city || !item.slug || !item.region || !item.dataStatus || !item.referenceDate || !item.lastVerified || !item.implementationStatus || !item.note) {
    errors.push(`${item.city || item.plateCode}: zorunlu tarife alanı boş.`);
  }
  if (![item.openingFare, item.perKmFare, item.minimumFare].every((value) => Number.isFinite(value) && value > 0)) {
    errors.push(`${item.city}: ücret alanı sıfır, negatif veya geçersiz.`);
  }
  try {
    if (new URL(item.sourceUrl).protocol !== 'https:') throw new Error();
  } catch {
    errors.push(`${item.city}: kaynak adresi geçerli HTTPS URL değil.`);
  }
  const shouldBeEstimated = /tahmini|teyit gerekli|ilçe bazlı|genelleme riski/i.test(`${item.dataStatus} ${item.note}`);
  if (shouldBeEstimated !== item.isEstimated) errors.push(`${item.city}: tahmini veri işareti durum/not alanıyla eşleşmiyor.`);
}

const checkpoints = {
  istanbul: [65.4, 43.56, 210],
  ankara: [65, 40, 200],
  izmir: [40, 54, 210],
  antalya: [50, 50, 200],
};
for (const [slug, expected] of Object.entries(checkpoints)) {
  const item = fares.find((fare) => fare.slug === slug);
  if (!item) errors.push(`${slug}: kontrol kaydı bulunamadı.`);
  else if ([item.openingFare, item.perKmFare, item.minimumFare].some((value, index) => value !== expected[index])) {
    errors.push(`${item.city}: Excel kontrol değerleri uyuşmuyor.`);
  }
}

const estimatedCount = fares.filter((fare) => fare.isEstimated).length;
if (estimatedCount !== 6) errors.push(`Tahmini tarife sayısı 6 olmalı; ${estimatedCount} bulundu.`);
const warning = 'Bu şehir için kullanılan tarife mevcut kaynaklara dayalı tahmini bir değerdir. Güncel taksimetre tutarı farklı olabilir.';
if (!calculatorSource.includes(warning)) errors.push('Tahmini tarife uyarısı hesaplayıcıda eksik.');
if (!calculatorSource.includes('Tarife kaynağını inceleyin') || !calculatorSource.includes('Tarife referansı:') || !calculatorSource.includes('Son kontrol:')) {
  errors.push('Hesap sonucunda kaynak, referans veya son kontrol bilgisi eksik.');
}

const fareSlugs = new Set(fares.map((fare) => fare.slug));
const pageSlugs = pages.map((page) => page.slug);
const duplicates = pageSlugs.filter((slug, index) => pageSlugs.indexOf(slug) !== index || fareSlugs.has(slug));
if (duplicates.length) errors.push(`Tekrarlanan slug: ${[...new Set(duplicates)].join(', ')}`);
for (const page of pages) {
  if (!page.title.trim()) errors.push(`${page.slug}: başlık eksik.`);
  if (page.description.trim().length < 70) errors.push(`${page.slug}: meta açıklaması çok kısa.`);
}

const walk = (directory) => readdirSync(directory).flatMap((name) => {
  const path = join(directory, name);
  return statSync(path).isDirectory() ? walk(path) : [path];
});
const sourceRoots = ['app', 'components', 'src'].map((directory) => new URL(`../${directory}`, import.meta.url).pathname.replace(/^\/(.:)/, '$1'));
const sourceFiles = sourceRoots.flatMap(walk).filter((file) => ['.ts', '.tsx', '.astro', '.css'].includes(extname(file)));
if (/\beyebrow\b/i.test(sourceFiles.map((file) => readFileSync(file, 'utf8')).join('\n'))) {
  errors.push('Site kaynaklarında eyebrow etiketi veya stili kaldı.');
}
for (const file of sourceFiles) {
  if (!['.ts', '.tsx', '.astro'].includes(extname(file)) || file.replaceAll('\\', '/').endsWith('/data/taxi-fares.ts')) continue;
  const source = readFileSync(file, 'utf8');
  if (/(?:openingFare|perKmFare|minimumFare)\s*:\s*\d/.test(source)) {
    errors.push(`${relative(new URL('..', root).pathname, file)}: tarife değeri üretilen merkezî veri dosyası dışında tekrarlandı.`);
  }
}

if (errors.length) {
  console.error(`İçerik doğrulaması başarısız:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`${fares.length} il tarifesi, ${estimatedCount} tahmini kayıt ve ${pages.length} kurumsal içerik doğrulandı; tarife tekrarına rastlanmadı.`);
