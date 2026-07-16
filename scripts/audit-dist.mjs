import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const outputDirectory = 'out';
const siteSource = readFileSync('src/data/site.ts', 'utf8');
const productionOrigin = siteSource.match(/url:\s*'([^']+)'/)?.[1];
if (!existsSync(outputDirectory)) throw new Error('out klasörü bulunamadı. Önce Next.js derlemesini çalıştırın.');
if (!productionOrigin) throw new Error('Üretim adresi okunamadı.');

const walk = (directory) => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
  const path = join(directory, entry.name);
  return entry.isDirectory() ? walk(path) : [path];
});
const htmlFiles = walk(outputDirectory).filter((file) => file.endsWith('.html'));
const pages = htmlFiles.map((file) => ({ file, html: readFileSync(file, 'utf8') }));
const errors = [];
const titles = new Map();
const descriptions = new Map();

function outputPathForUrl(pathname) {
  if (pathname === '/') return join(outputDirectory, 'index.html');
  if (pathname.endsWith('/')) return join(outputDirectory, pathname.slice(1), 'index.html');
  if (extname(pathname)) return join(outputDirectory, pathname.slice(1));
  return join(outputDirectory, pathname.slice(1), 'index.html');
}

for (const { file, html } of pages) {
  const name = relative(outputDirectory, file).replaceAll('\\', '/');
  const isError = name === '404.html' || name.startsWith('404/') || name.startsWith('_not-found/');
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];
  if (!isError) {
    if (!title) errors.push(`${name}: title bulunamadı.`);
    else if (titles.has(title)) errors.push(`${name}: title başka sayfayla aynı (${titles.get(title)}).`);
    else titles.set(title, name);
    if (!description) errors.push(`${name}: meta description bulunamadı.`);
    else if (descriptions.has(description)) errors.push(`${name}: meta description başka sayfayla aynı (${descriptions.get(description)}).`);
    else descriptions.set(description, name);
    const h1 = html.match(/<h1(?:\s|>)/gi)?.length ?? 0;
    if (h1 !== 1) errors.push(`${name}: ${h1} adet H1 bulundu.`);
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
    if (!canonical?.startsWith(`${productionOrigin}/`)) errors.push(`${name}: üretim canonical adresi bulunamadı.`);
  }
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try { JSON.parse(match[1]); } catch { errors.push(`${name}: geçersiz JSON-LD.`); }
  }
  for (const match of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const pathname = match[1];
    if (pathname.startsWith('/api/')) continue;
    if (!existsSync(outputPathForUrl(pathname))) errors.push(`${name}: kırık iç bağlantı ${pathname}`);
  }
}

const home = readFileSync(join(outputDirectory, 'index.html'), 'utf8');
if (/2026 taksi tarifesi karşılaştırması/i.test(home) || /id="tarife-karsilastirma"/i.test(home)) errors.push('Ana sayfadaki 81 şehir karşılaştırma tablosu kaldırılmadı.');
if (!home.includes('<title>Taksi Ücreti Hesaplama 2026 | 81 İl Güncel Tarifeler</title>')) errors.push('Ana sayfa title değeri hedef metinle eşleşmiyor.');
if (!home.includes('Şehrinizi seçin, mesafeyi girin ve açılış, kilometre ve minimum ücret tarifesine göre tahmini taksi ücretinizi hesaplayın. 81 il ve kaynak bilgileri.')) errors.push('Ana sayfa meta açıklaması hedef metinle eşleşmiyor.');
const cityOptions = home.match(/role="option"/g)?.length ?? 0;
if (cityOptions !== 81) errors.push(`Şehir seçicisinde 81 yerine ${cityOptions} seçenek var.`);
if ((home.match(/\?city=[a-z-]+#hesaplayici/g)?.length ?? 0) < 81) errors.push('Ana sayfa şehir dizininde 81 hesaplayıcı bağlantısı bulunamadı.');
const faqBlock = home.match(/class="faq"[\s\S]*?class="author-box/i)?.[0] ?? '';
const faqCount = faqBlock.match(/<details/g)?.length ?? 0;
if (faqCount !== 10) errors.push(`Ana sayfada 10 yerine ${faqCount} SSS var.`);
const cityGuideBlock = home.match(/id="sehir-hesaplayicilari"[\s\S]*?<\/section>/i)?.[0] ?? '';
if ((cityGuideBlock.match(/class="article-card"/g)?.length ?? 0) !== 4) errors.push('Ana sayfa popüler şehir rehberlerinde dört mevcut şehir kartı bulunmalı.');
if ((home.match(/class="author-box/g)?.length ?? 0) !== 1) errors.push('Ana sayfa makalesinin sonunda tek yazar kutusu bulunmalı.');
if (!home.includes('G-9DE2SY0711') || !home.includes('googletagmanager.com/gtag/js')) errors.push('Google Analytics etiketi üretim HTML dosyasına eklenmedi.');
for (const schemaType of ['WebSite','WebPage','Organization','Person','BreadcrumbList','WebApplication','FAQPage']) {
  if (!home.includes(`"@type":"${schemaType}"`)) errors.push(`Ana sayfa JSON-LD grafiğinde ${schemaType} eksik.`);
}

const blog = readFileSync(join(outputDirectory, 'blog', 'index.html'), 'utf8');
if ((blog.match(/class="article-card"/g)?.length ?? 0) !== 7) errors.push('Blog arşivinde yedi yazının tamamı bulunmalı.');
for (const slug of ['ankara-taksi-ucreti','antalya-taksi-ucreti','istanbul-taksi-ucreti','izmir-taksi-ucreti','istanbul-havalimani-taksi-ucreti','taksi-ucreti-nasil-hesaplanir','indi-bindi-ucreti-nedir']) {
  const html = readFileSync(join(outputDirectory, slug, 'index.html'), 'utf8');
  if ((html.match(/class="author-box/g)?.length ?? 0) !== 1) errors.push(`${slug}: tek yazar kutusu bulunmalı.`);
  if (!html.includes('class="article-meta"')) errors.push(`${slug}: yazı üst bilgisi bulunamadı.`);
  if (!/class="toc"[\s\S]*?aria-expanded="false"/i.test(html)) errors.push(`${slug}: İçindekiler kapalı başlamıyor.`);
}
for (const asset of ['logo.svg','logo-mark.svg','favicon.svg','og-brand.svg','_redirects']) if (!existsSync(join(outputDirectory, asset))) errors.push(`Varlık eksik: ${asset}`);
const redirects = readFileSync(join(outputDirectory, '_redirects'), 'utf8');
if (!redirects.includes('/taksi-rehberi/ /yazar/oguzhan-arslan/ 301')) errors.push('Eski yazar URL yönlendirmesi eksik.');
if (!existsSync(join(outputDirectory, 'yazar', 'oguzhan-arslan', 'index.html'))) errors.push('Yazar profil sayfası üretilmedi.');
if (!existsSync(join(outputDirectory, 'sitemap', 'index.html'))) errors.push('HTML site haritası üretilmedi.');
const sitemapPath = join(outputDirectory, 'sitemap.xml');
if (!existsSync(sitemapPath)) errors.push('GSC için sitemap.xml üretilmedi.');
else {
  const xml = readFileSync(sitemapPath, 'utf8');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (urls.length < 20) errors.push(`sitemap.xml yalnızca ${urls.length} adres içeriyor.`);
  for (const url of urls) if (!url.startsWith(`${productionOrigin}/`) || url.includes('?')) errors.push(`Sitemap içinde geçersiz adres: ${url}`);
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`${htmlFiles.length} HTML sayfası; 81 şehir seçeneği, 10 SSS, yazar kutuları, Google etiketi, sitemap.xml, canonical, H1, meta, JSON-LD ve iç bağlantılar doğrulandı.`);
