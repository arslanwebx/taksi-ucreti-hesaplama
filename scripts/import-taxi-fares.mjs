import { access, mkdir, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import readXlsxFile from 'read-excel-file/node';

const workbookName = 'Turkiye_81_Il_Taksi_Tarifeleri_Tek_Sayfa_2026.xlsx';
const expectedSheet = '81 İl Taksi Tarifeleri';
const requiredColumns = [
  'Plaka',
  'İl',
  'Bölge',
  'Açılış (TL)',
  'Km Ücreti (TL)',
  'Minimum / İndi-Bindi (TL)',
  '5 km Tahmini (TL)',
  '10 km Tahmini (TL)',
  'Veri Durumu',
  'Referans / Yürürlük',
  'Son Kontrol',
  'Kaynak URL',
  'Codex Kullanımı',
  'Not',
];

async function firstExisting(paths) {
  for (const path of paths) {
    try {
      await access(path, constants.R_OK);
      return path;
    } catch {}
  }
  return paths[0];
}

const inputPath = resolve(await firstExisting([
  process.argv[2] ?? join(process.cwd(), workbookName),
  join(homedir(), 'Downloads', workbookName),
]));
const outputPath = resolve(process.cwd(), 'src/data/taxi-fares.ts');

const slugify = (city) => city
  .trim()
  .toLocaleLowerCase('tr-TR')
  .replaceAll('ı', 'i')
  .replaceAll('ğ', 'g')
  .replaceAll('ü', 'u')
  .replaceAll('ş', 's')
  .replaceAll('ö', 'o')
  .replaceAll('ç', 'c')
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

const asText = (value) => value == null ? '' : String(value).trim();
const asPositiveNumber = (value, label, city) => {
  const number = typeof value === 'number' ? value : Number(String(value).replace(',', '.'));
  if (!Number.isFinite(number) || number <= 0) throw new Error(`${city}: ${label} sıfır, negatif veya geçersiz.`);
  return number;
};
const asDateText = (value) => {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return asText(value);
};
const quote = (value) => JSON.stringify(value);
const officialSourceOverrides = {
  ankara: {
    sourceUrl: 'https://www.ankesob.org.tr/birlik-ucret-tarifeleri-degerlendirme-komisyonu/',
    dataStatus: 'Yetkili meslek kuruluşu kaynak kaydı',
    lastVerified: '2026-07-30',
    note: 'Tarife rakamları 1 Mart 2026 Ankara kaydıdır; bağlantı yetkili fiyat tarifesi komisyonu kaynağıdır.',
  },
  antalya: {
    sourceUrl: 'https://www.antalya.bel.tr/tr/ukome-kararlari?ukome-yil=2025&ukome-ay=3',
    dataStatus: 'İkincil tarife kaydı - resmî UKOME arşivi bağlantısı',
    referenceDate: '28.03.2025 tarihli 178 sayılı UKOME kararı (resmî karşılaştırma)',
    note: '2026 tarife rakamları ikincil kayıttan derlenmiştir. Bağlantı, belediyenin yayımladığı en güncel taksi tarifesi olan 28.03.2025 tarihli 178 sayılı UKOME kararını gösterecek şekilde filtrelenmiştir; araçtaki onaylı fiyat tarife kartı yolculuk öncesi kontrol edilmelidir.',
  },
  izmir: {
    sourceUrl: 'https://www.izmir.bel.tr/YuklenenDosyalar/MeclisToplantiTutanak/03062026165449.pdf',
    dataStatus: 'Resmî belediye meclis kararı',
    note: '17 Nisan 2026 tarihli resmî toplantı tutanağında ticari taksi tarifesi değişikliği oybirliğiyle kabul edilmiştir.',
  },
  istanbul: {
    lastVerified: '2026-07-30',
  },
};

let workbook;
try {
  workbook = await readXlsxFile(inputPath, { getSheets: true });
} catch (error) {
  throw new Error(`Excel dosyası okunamadı: ${inputPath}\n${error instanceof Error ? error.message : error}`);
}

if (workbook.length !== 1 || workbook[0]?.sheet !== expectedSheet) {
  const found = workbook.map((item) => item.sheet).join(', ') || 'sayfa bulunamadı';
  throw new Error(`Excel sayfa adı "${expectedSheet}" olmalı. Bulunan: ${found}`);
}

const rows = workbook[0].data;
const headers = rows[0]?.map(asText) ?? [];
for (const column of requiredColumns) if (!headers.includes(column)) throw new Error(`Zorunlu sütun eksik: ${column}`);

const dataRows = rows.slice(1).filter((row) => row.some((value) => value !== null && asText(value) !== ''));
if (dataRows.length !== 81) throw new Error(`Excel dosyasında tam 81 il olmalı; ${dataRows.length} satır bulundu.`);

const index = Object.fromEntries(requiredColumns.map((column) => [column, headers.indexOf(column)]));
const records = dataRows.map((row, rowIndex) => {
  const city = asText(row[index['İl']]) || `Satır ${rowIndex + 2}`;
  const plateCode = asPositiveNumber(row[index.Plaka], 'Plaka', city);
  if (!Number.isInteger(plateCode)) throw new Error(`${city}: plaka kodu tam sayı olmalı.`);
  const region = asText(row[index['Bölge']]);
  const openingFare = asPositiveNumber(row[index['Açılış (TL)']], 'Açılış ücreti', city);
  const perKmFare = asPositiveNumber(row[index['Km Ücreti (TL)']], 'Kilometre ücreti', city);
  const minimumFare = asPositiveNumber(row[index['Minimum / İndi-Bindi (TL)']], 'Minimum ücret', city);
  const fiveKm = asPositiveNumber(row[index['5 km Tahmini (TL)']], '5 km tahmini', city);
  const tenKm = asPositiveNumber(row[index['10 km Tahmini (TL)']], '10 km tahmini', city);
  let dataStatus = asText(row[index['Veri Durumu']]);
  let referenceDate = asDateText(row[index['Referans / Yürürlük']]);
  let lastVerified = asDateText(row[index['Son Kontrol']]);
  let sourceUrl = asText(row[index['Kaynak URL']]);
  const implementationStatus = asText(row[index['Codex Kullanımı']]);
  let note = asText(row[index.Not]);
  const slug = slugify(city);
  const sourceOverride = officialSourceOverrides[slug];
  if (sourceOverride) {
    ({ sourceUrl, dataStatus, note } = sourceOverride);
    if (sourceOverride.referenceDate) referenceDate = sourceOverride.referenceDate;
    if (sourceOverride.lastVerified) lastVerified = sourceOverride.lastVerified;
  }
  const isEstimated = /tahmini|teyit gerekli|ilçe bazlı|genelleme riski/i.test(`${dataStatus} ${note}`);

  for (const [label, value] of [['İl', city], ['Bölge', region], ['Veri Durumu', dataStatus], ['Referans / Yürürlük', referenceDate], ['Codex Kullanımı', implementationStatus], ['Not', note]]) {
    if (!value) throw new Error(`${city}: ${label} alanı boş.`);
  }
  if (!lastVerified) throw new Error(`${city}: Son Kontrol alanı boş.`);
  if (!sourceUrl) throw new Error(`${city}: Kaynak URL alanı boş.`);
  try {
    const url = new URL(sourceUrl);
    if (url.protocol !== 'https:') throw new Error();
  } catch {
    throw new Error(`${city}: Kaynak URL geçerli bir HTTPS adresi değil.`);
  }
  if (!slug) throw new Error(`${city}: geçerli slug üretilemedi.`);

  const calculatedFiveKm = Math.max(minimumFare, openingFare + 5 * perKmFare);
  const calculatedTenKm = Math.max(minimumFare, openingFare + 10 * perKmFare);
  if (Math.abs(calculatedFiveKm - fiveKm) > 0.01) throw new Error(`${city}: 5 km tahmini uyuşmuyor. Excel=${fiveKm}, hesap=${calculatedFiveKm}.`);
  if (Math.abs(calculatedTenKm - tenKm) > 0.01) throw new Error(`${city}: 10 km tahmini uyuşmuyor. Excel=${tenKm}, hesap=${calculatedTenKm}.`);

  return { plateCode, city, slug, region, openingFare, perKmFare, minimumFare, dataStatus, referenceDate, lastVerified, sourceUrl, implementationStatus, note, isEstimated };
});

const duplicate = (values) => values.find((value, position) => values.indexOf(value) !== position);
const duplicateCity = duplicate(records.map((record) => record.city));
const duplicatePlate = duplicate(records.map((record) => record.plateCode));
const duplicateSlug = duplicate(records.map((record) => record.slug));
if (duplicateCity) throw new Error(`Tekrarlanan il: ${duplicateCity}`);
if (duplicatePlate) throw new Error(`Tekrarlanan plaka kodu: ${duplicatePlate}`);
if (duplicateSlug) throw new Error(`Tekrarlanan slug: ${duplicateSlug}`);

const plates = records.map((record) => record.plateCode).sort((a, b) => a - b);
if (plates.some((plate, position) => plate !== position + 1)) throw new Error('Plaka kodları 1–81 aralığını eksiksiz kapsamıyor.');

records.sort((a, b) => a.city.localeCompare(b.city, 'tr'));
const recordLines = records.map((record) => `  {
    plateCode: ${record.plateCode},
    city: ${quote(record.city)},
    slug: ${quote(record.slug)},
    region: ${quote(record.region)},
    openingFare: ${record.openingFare},
    perKmFare: ${record.perKmFare},
    minimumFare: ${record.minimumFare},
    dataStatus: ${quote(record.dataStatus)},
    referenceDate: ${quote(record.referenceDate)},
    lastVerified: ${quote(record.lastVerified)},
    sourceUrl: ${quote(record.sourceUrl)},
    implementationStatus: ${quote(record.implementationStatus)},
    note: ${quote(record.note)},
    isEstimated: ${record.isEstimated},
  }`);

const output = `// This file is generated by scripts/import-taxi-fares.mjs. Do not edit tariff values manually.
export type TaxiFare = {
  plateCode: number;
  city: string;
  slug: string;
  region: string;
  openingFare: number;
  perKmFare: number;
  minimumFare: number;
  waitingFarePerMinute?: number;
  dataStatus: string;
  referenceDate: string;
  lastVerified: string;
  sourceUrl: string;
  implementationStatus: string;
  note: string;
  isEstimated: boolean;
};

export const taxiFares: TaxiFare[] = [
${recordLines.join(',\n')}
];

export const taxiFareBySlug = Object.fromEntries(taxiFares.map((fare) => [fare.slug, fare])) as Record<string, TaxiFare>;
`;

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, output, 'utf8');
const estimatedCount = records.filter((record) => record.isEstimated).length;
console.log(`${records.length} il tarifesi üretildi; ${estimatedCount} tahmini satır işaretlendi.`);
console.log(`Kaynak: ${inputPath}`);
console.log(`Çıktı: ${outputPath}`);
