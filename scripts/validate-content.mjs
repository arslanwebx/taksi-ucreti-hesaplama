import { readFileSync } from 'node:fs';

const citySource = readFileSync(new URL('../src/data/cities.ts', import.meta.url), 'utf8');
const pageSource = readFileSync(new URL('../src/data/pages.ts', import.meta.url), 'utf8');
const errors = [];
const cityBlocks = [...citySource.matchAll(/name:\s*'([^']+)'[\s\S]*?slug:\s*'([^']+)'[\s\S]*?path:\s*'([^']+)'[\s\S]*?effectiveDate:\s*'([^']+)'[\s\S]*?verifiedDate:\s*'([^']+)'[\s\S]*?sourceName:\s*'([^']+)'[\s\S]*?sourceUrl:\s*'([^']+)'/g)]
  .map((match) => ({ name: match[1], slug: match[2], path: match[3], effectiveDate: match[4], verifiedDate: match[5], sourceName: match[6], sourceUrl: match[7] }));
const pageSlugs = [...pageSource.matchAll(/\{slug:'([^']+)',title:'([^']+)',description:'([^']+)'/g)]
  .map((match) => ({ slug: match[1], title: match[2], description: match[3] }));

if (cityBlocks.length === 0) errors.push('Hiç şehir kaydı bulunamadı.');
const allSlugs = [...cityBlocks.map((city) => city.slug), ...pageSlugs.map((page) => page.slug)];
const duplicates = allSlugs.filter((slug, index) => allSlugs.indexOf(slug) !== index);
if (duplicates.length) errors.push(`Tekrarlanan slug: ${[...new Set(duplicates)].join(', ')}`);

for (const city of cityBlocks) {
  if (!city.name || !city.slug || city.path !== `/${city.slug}-taksi-ucreti/`) errors.push(`${city.name || city.slug}: geçersiz kimlik veya canonical path.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(city.effectiveDate) || Number.isNaN(Date.parse(city.effectiveDate))) errors.push(`${city.name}: geçersiz yürürlük tarihi.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(city.verifiedDate) || Number.isNaN(Date.parse(city.verifiedDate))) errors.push(`${city.name}: geçersiz doğrulama tarihi.`);
  if (!city.sourceName || !/^https:\/\//.test(city.sourceUrl)) errors.push(`${city.name}: tarife kaynağı eksik veya güvenli URL değil.`);
}
for (const page of pageSlugs) {
  if (!page.title.trim()) errors.push(`${page.slug}: başlık eksik.`);
  if (page.description.trim().length < 70) errors.push(`${page.slug}: meta açıklaması çok kısa.`);
}
if (errors.length) {
  console.error(`İçerik doğrulaması başarısız:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`${cityBlocks.length} şehir ve ${pageSlugs.length} kurumsal içerik doğrulandı.`);
