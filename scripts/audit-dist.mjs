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
if (!home.includes('<title>Taksi Ücreti Hesaplama 2026 | 81 İl Güncel Taksi Tarifesi</title>')) errors.push('Ana sayfa title değeri hedef metinle eşleşmiyor.');
if (!home.includes('Şehrinizi seçin, mesafeyi girin ve açılış, kilometre ve minimum ücret tarifesine göre Taksi Ücreti Hesaplama sonucunu saniyeler içinde görüntüleyin. 81 il ve kaynak bilgileri.')) errors.push('Ana sayfa meta açıklaması hedef metinle eşleşmiyor.');
const tariffTable = home.match(/id="guncel-taksi-tarifeleri"[\s\S]*?<\/section>/i)?.[0] ?? '';
if ((tariffTable.match(/<tbody>/g)?.length ?? 0) !== 1 || (tariffTable.match(/<tr/g)?.length ?? 0) !== 7) errors.push('Ana sayfadaki altı şehirlik tarife tablosu taranabilir HTML olarak üretilmedi.');
const routeTable = home.match(/id="populer-taksi-rotalari"[\s\S]*?<\/section>/i)?.[0] ?? '';
if ((routeTable.match(/<tbody>/g)?.length ?? 0) !== 1 || (routeTable.match(/<tr/g)?.length ?? 0) !== 11) errors.push('Ana sayfadaki on rotalık tahmin tablosu taranabilir HTML olarak üretilmedi.');
const cityOptions = home.match(/<option value="[^"]*"/g)?.length ?? 0;
if (cityOptions !== 82) errors.push(`Şehir seçicisinde şehir seçimi dahil 82 yerine ${cityOptions} seçenek var.`);
if (/href="\/\?city=/i.test(home)) errors.push('Ana sayfada parametreli şehir bağlantısı kaldı.');
const cityDirectoryBlock = home.match(/class="city-directory"[\s\S]*?<\/section>/i)?.[0] ?? '';
if ((cityDirectoryBlock.match(/class="popular-cities"/g)?.length ?? 0) !== 1) errors.push('Ana sayfada tek popüler şehir seçim grubu bulunmalı.');
if ((cityDirectoryBlock.match(/<button/g)?.length ?? 0) !== 10) errors.push('Popüler şehir seçiminde bağlantı yerine 10 düğme bulunmalı.');
if (cityDirectoryBlock.includes('class="all-cities"')) errors.push('Ana sayfa ilk HTML çıktısında 81 şehir adı ikinci kez listelenmemeli.');
const faqBlock = home.match(/class="faq"[\s\S]*?class="author-box/i)?.[0] ?? '';
const faqCount = faqBlock.match(/<details/g)?.length ?? 0;
if (faqCount !== 11) errors.push(`Ana sayfada 11 yerine ${faqCount} SSS var.`);
const cityGuideBlock = home.match(/id="sehir-hesaplayicilari"[\s\S]*?<\/section>/i)?.[0] ?? '';
if ((cityGuideBlock.match(/class="article-card"/g)?.length ?? 0) !== 6) errors.push('Ana sayfa popüler şehir rehberlerinde altı mevcut şehir kartı bulunmalı.');
if ((cityGuideBlock.match(/<h3>/g)?.length ?? 0) !== 6 || /<article class="article-card"[\s\S]*?<h2>/i.test(cityGuideBlock)) errors.push('Ana sayfa popüler şehir kartları H3 kullanmalı.');
if (cityGuideBlock.includes('<time')) errors.push('Ana sayfa şehir kartlarında tekrarlanan güncelleme tarihleri gösterilmemeli.');
if (/Yoğun trafik<\/strong>|traffic=high/i.test(home)) errors.push('Belgesiz yoğun trafik katsayısı ana sayfadan kaldırılmadı.');
if (!home.includes('calculator-simple')) errors.push('Ana hesaplayıcı sade hesaplayıcı düzeniyle üretilmedi.');
if ((home.match(/class="author-box/g)?.length ?? 0) !== 1) errors.push('Ana sayfa makalesinin sonunda tek yazar kutusu bulunmalı.');
if (!home.includes('G-9DE2SY0711') || !home.includes('googletagmanager.com/gtag/js')) errors.push('Google Analytics etiketi üretim HTML dosyasına eklenmedi.');
for (const schemaType of ['WebSite','WebPage','Organization','Person','BreadcrumbList','WebApplication','FAQPage']) {
  if (!home.includes(`"@type":"${schemaType}"`)) errors.push(`Ana sayfa JSON-LD grafiğinde ${schemaType} eksik.`);
}

const blog = readFileSync(join(outputDirectory, 'blog', 'index.html'), 'utf8');
if ((blog.match(/class="article-card"/g)?.length ?? 0) !== 10) errors.push('Blog arşivinde on yazının tamamı bulunmalı.');
if (/class="card-link"/i.test(blog)) errors.push('Blog arşivindeki yinelenen kart CTA metinleri kaldırılmadı.');
if ((blog.match(/href="\/yazar\/oguzhan-arslan\/"/g)?.length ?? 0) < 8) errors.push('Blog arşivindeki her yazar adı profil sayfasına bağlanmalı.');
if (!blog.match(/<nav[^>]+id="primary-navigation"[\s\S]*?href="\/iletisim\/"[\s\S]*?<\/nav>/i)) errors.push('Ana menüde iletişim sayfası bağlantısı bulunmalı.');
for (const slug of ['ankara-taksi-ucreti','antalya-taksi-ucreti','bursa-taksi-ucreti','konya-taksi-ucreti','istanbul-taksi-ucreti','izmir-taksi-ucreti','istanbul-havalimani-taksi-ucreti','sabiha-gokcen-taksi-ucreti','taksi-ucreti-nasil-hesaplanir','indi-bindi-ucreti-nedir']) {
  const html = readFileSync(join(outputDirectory, slug, 'index.html'), 'utf8');
  if ((html.match(/class="author-box/g)?.length ?? 0) !== 1) errors.push(`${slug}: tek yazar kutusu bulunmalı.`);
  if (!html.includes('class="article-meta"')) errors.push(`${slug}: yazı üst bilgisi bulunamadı.`);
  if (!/class="toc"[\s\S]*?aria-expanded="false"/i.test(html)) errors.push(`${slug}: İçindekiler kapalı başlamıyor.`);
}
const expectedCityTitles = {
  'ankara-taksi-ucreti': 'Ankara Taksi Ücreti Hesaplama 2026 (Kaç TL Tutar?)',
  'istanbul-taksi-ucreti': 'İstanbul Taksi Ücreti [2026] – Hesaplama Aracı',
  'antalya-taksi-ucreti': 'Antalya Taksi Ücreti 2026: Güncel Fiyatlar ve Hesaplama',
  'bursa-taksi-ucreti': 'Bursa Taksi Ücreti 2026: Anında Hesaplama',
  'izmir-taksi-ucreti': 'İzmir Taksi Ücreti 2026: Hemen Hesaplama',
};
for (const [slug, expectedTitle] of Object.entries(expectedCityTitles)) {
  const html = readFileSync(join(outputDirectory, slug, 'index.html'), 'utf8');
  if (!html.includes(`<title>${expectedTitle}</title>`)) errors.push(`${slug}: SEO title hedef metinle eşleşmiyor.`);
  const h2Texts = [...html.matchAll(/<h2[^>]*>([^<]+)<\/h2>/gi)].map((match) => match[1].trim().toLocaleLowerCase('tr-TR'));
  if (h2Texts.some((heading, index) => h2Texts.indexOf(heading) !== index)) errors.push(`${slug}: yinelenen H2 başlığı bulundu.`);
  if (!html.includes('Ücreti hesapla')) errors.push(`${slug}: sade hesaplayıcı düğmesi bulunamadı.`);
  if (slug === 'antalya-taksi-ucreti' && !html.includes('ikincil 2026 kaydından derlenmiştir')) errors.push('Antalya: kaynak belirsizliği görünür biçimde açıklanmadı.');
}
const ankaraHtml = readFileSync(join(outputDirectory, 'ankara-taksi-ucreti', 'index.html'), 'utf8');
const ankaraDescription = 'Ankara taksi ücreti hesaplama aracıyla açılış, km ve indi-bindi tarifesine göre 2026 güncel ücretinizi saniyeler içinde öğrenin.';
if (!ankaraHtml.includes(`<meta name="description" content="${ankaraDescription}"/>`)) errors.push('Ankara: hedef meta açıklaması eksik.');
if (!/<h1[^>]*>Ankara Taksi Ücreti Hesaplama 2026<\/h1>/i.test(ankaraHtml)) errors.push('Ankara: hedef H1 eksik.');
if ((ankaraHtml.match(/Ankara taksi hesaplama nasıl yapılır\?/g)?.length ?? 0) < 2) errors.push('Ankara: yeni FAQ görünür içerik ve FAQPage şemasında birlikte bulunmalı.');
if (!ankaraHtml.includes('"@type":"HowTo"') || (ankaraHtml.match(/"@type":"HowToStep"/g)?.length ?? 0) !== 5) errors.push('Ankara: beş adımlı HowTo şeması eksik.');
if (!ankaraHtml.includes('alt="Ankara taksi ücreti hesaplama 2026 - güncel tarife"')) errors.push('Ankara: hedef görsel alt metni eksik.');
if (!ankaraHtml.includes('"datePublished":"2026-07-16"') || !ankaraHtml.includes('"dateModified":"2026-07-30"')) errors.push('Ankara: yayın ve güncelleme tarihleri şemada doğru ayrılmalı.');
if (!ankaraHtml.includes('<time dateTime="2026-07-30">30 Temmuz 2026</time>')) errors.push('Ankara: görünür güncelleme tarihi 30 Temmuz 2026 olmalı.');
const citiesHtml = readFileSync(join(outputDirectory, 'sehirler', 'index.html'), 'utf8');
if (!/<a[^>]+href="\/ankara-taksi-ucreti\/"[^>]*>Ankara taksi ücreti hesaplama<\/a>/i.test(citiesHtml)) errors.push('Şehirler: Ankara hedef anchor metni eksik.');
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
  if (new Set(urls).size !== urls.length) errors.push('Sitemap içinde yinelenen URL bulundu.');
  if ((xml.match(/<lastmod>/g)?.length ?? 0) !== urls.length) errors.push('Sitemap içindeki her URL için lastmod bulunmalı.');
  if ((xml.match(/<changefreq>/g)?.length ?? 0) !== urls.length) errors.push('Sitemap içindeki her URL için changefreq bulunmalı.');
  if ((xml.match(/<priority>/g)?.length ?? 0) !== urls.length) errors.push('Sitemap içindeki her URL için priority bulunmalı.');
}
const robotsPath = join(outputDirectory, 'robots.txt');
if (!existsSync(robotsPath)) errors.push('robots.txt üretilmedi.');
else {
  const robots = readFileSync(robotsPath, 'utf8');
  if (!/^User-agent:\s*\*/mi.test(robots) || !/^Allow:\s*\/$/mi.test(robots) || !robots.includes(`${productionOrigin}/sitemap.xml`)) errors.push('robots.txt beklenen tarama ve sitemap kurallarını içermiyor.');
}
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log(`${htmlFiles.length} HTML sayfası; 81 şehir seçeneği, 11 SSS, yazar kutuları, Google etiketi, sitemap.xml, canonical, H1, meta, JSON-LD ve iç bağlantılar doğrulandı.`);
