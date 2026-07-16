import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const root = new URL('..', import.meta.url);
const cityPath = new URL('../src/data/cities.ts', import.meta.url);
const citySource = readFileSync(cityPath, 'utf8');
const pageSource = readFileSync(new URL('../src/data/pages.ts', import.meta.url), 'utf8');
const errors = [];
const registryBlock = citySource.slice(citySource.indexOf('const provinceRegistry'), citySource.indexOf('] as const;', citySource.indexOf('const provinceRegistry')));
const provinces = [...registryBlock.matchAll(/\[(\d+),\s*'([^']+)',\s*'([^']+)'\]/g)].map((match) => ({ code:Number(match[1]), name:match[2], slug:match[3] }));
const cityPattern = /name:\s*'([^']+)',\s*slug:\s*'([^']+)',\s*path:\s*'([^']+)',\s*opening:\s*([\d.]+),\s*perKm:\s*([\d.]+),\s*minimum:\s*([\d.]+)[\s\S]*?effectiveDate:\s*'([^']+)',\s*verifiedDate:\s*'([^']+)',\s*sourceName:\s*'([^']+)',\s*sourceUrl:\s*'([^']+)',\s*sourceTier:\s*'([^']+)',\s*status:\s*'([^']+)'/g;
const matches = [...citySource.matchAll(cityPattern)];
const cities = matches.map((match, index) => {
  const end = matches[index + 1]?.index ?? citySource.indexOf('\n];', match.index);
  const block = citySource.slice(match.index, end);
  const firstCategory = block.match(/categories:\s*\[\s*\{[\s\S]*?opening:\s*([\d.]+),\s*perKm:\s*([\d.]+),\s*minimum:\s*([\d.]+)/);
  const night = block.match(/nightTariff:\s*\{\s*enabled:\s*(true|false),\s*multiplier:\s*([\d.]+),\s*sourceUrl:\s*(null|'[^']+'),\s*note:\s*'([^']+)'/);
  return { name:match[1], slug:match[2], path:match[3], opening:Number(match[4]), perKm:Number(match[5]), minimum:Number(match[6]), effectiveDate:match[7], verifiedDate:match[8], sourceName:match[9], sourceUrl:match[10], sourceTier:match[11], status:match[12], firstCategory, night };
});
const pages = [...pageSource.matchAll(/\{slug:'([^']+)',title:'([^']+)',description:'([^']+)'/g)].map((match) => ({ slug:match[1], title:match[2], description:match[3] }));

if (provinces.length !== 81) errors.push(`İl kayıt sayısı 81 olmalı; ${provinces.length} bulundu.`);
if (!cities.length) errors.push('Doğrulanmış tarife kaydı bulunamadı.');
const provinceCodes = provinces.map((province) => province.code).sort((a,b) => a-b);
if (provinceCodes.some((code,index) => code !== index + 1)) errors.push('İl plaka kodları 1–81 aralığını eksiksiz kapsamıyor.');
const provinceSlugs = provinces.map((province) => province.slug);
if (new Set(provinceSlugs).size !== provinces.length || new Set(provinces.map((province) => province.name)).size !== provinces.length) errors.push('İl adı veya slug kaydı tekrarlanıyor.');
const slugs = [...provinceSlugs, ...pages.map((page) => page.slug)];
const duplicates = slugs.filter((slug, index) => slugs.indexOf(slug) !== index);
if (duplicates.length) errors.push(`Tekrarlanan slug: ${[...new Set(duplicates)].join(', ')}`);

for (const city of cities) {
  if (!provinces.some((province) => province.slug === city.slug)) errors.push(`${city.name}: 81 il kayıt listesinde bulunamadı.`);
  if (city.path !== `/${city.slug}-taksi-ucreti/`) errors.push(`${city.name}: canonical path şehir slug'ıyla eşleşmiyor.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(city.effectiveDate) || Number.isNaN(Date.parse(city.effectiveDate))) errors.push(`${city.name}: geçersiz yürürlük tarihi.`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(city.verifiedDate) || Number.isNaN(Date.parse(city.verifiedDate))) errors.push(`${city.name}: geçersiz doğrulama tarihi.`);
  if (!city.sourceName || !/^https:\/\//.test(city.sourceUrl)) errors.push(`${city.name}: tarife kaynağı eksik veya HTTPS değil.`);
  if (!['official','secondary','unverified'].includes(city.sourceTier)) errors.push(`${city.name}: geçersiz kaynak düzeyi.`);
  if (city.sourceTier === 'unverified' && city.status === 'published') errors.push(`${city.name}: doğrulanmamış kayıt yayımlanamaz.`);
  if (!city.firstCategory) errors.push(`${city.name}: standart kategori bulunamadı.`);
  else if (city.opening !== Number(city.firstCategory[1]) || city.perKm !== Number(city.firstCategory[2]) || city.minimum !== Number(city.firstCategory[3])) errors.push(`${city.name}: üst seviye tarife standart kategoriyle eşleşmiyor.`);
  if (!city.night) errors.push(`${city.name}: gece tarifesi yapılandırması eksik.`);
  else if (city.night[1] === 'true' && (Number(city.night[2]) <= 1 || city.night[3] === 'null')) errors.push(`${city.name}: etkin gece tarifesi için katsayı ve kaynak zorunludur.`);
}

for (const page of pages) {
  if (!page.title.trim()) errors.push(`${page.slug}: başlık eksik.`);
  if (page.description.trim().length < 70) errors.push(`${page.slug}: meta açıklaması çok kısa.`);
}

const walk = (directory) => readdirSync(directory).flatMap((name) => {
  const path = join(directory, name); return statSync(path).isDirectory() ? walk(path) : [path];
});
const sourceRoots = ['app','components','src'].map((directory) => new URL(`../${directory}`, import.meta.url).pathname.replace(/^\/(.:)/, '$1'));
if (/\beyebrow\b/i.test(sourceRoots.flatMap(walk).filter((file)=>['.ts','.tsx','.astro','.css'].includes(extname(file))).map((file)=>readFileSync(file,'utf8')).join('\n'))) {
  errors.push('Site kaynaklarında eyebrow etiketi veya stili kaldı.');
}
for (const file of sourceRoots.flatMap(walk)) {
  if (!['.ts','.tsx','.astro'].includes(extname(file)) || file.replaceAll('\\','/').endsWith('/data/cities.ts')) continue;
  const source = readFileSync(file, 'utf8');
  if (/(?:opening|perKm|minimum|waitingPerHour)\s*:\s*\d/.test(source)) errors.push(`${relative(new URL('..', root).pathname, file)}: tarife değeri merkezî şehir dosyası dışında tekrarlandı.`);
}

if (errors.length) {
  console.error(`İçerik doğrulaması başarısız:\n- ${errors.join('\n- ')}`);
  process.exit(1);
}
console.log(`${provinces.length} il, ${cities.length} doğrulanmış tarife ve ${pages.length} kurumsal içerik doğrulandı; tarife tekrarına rastlanmadı.`);
