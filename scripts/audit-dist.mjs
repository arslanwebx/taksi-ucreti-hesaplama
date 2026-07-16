import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { extname, join, relative } from 'node:path';

const outputDirectory = 'dist';
const siteSource = readFileSync('src/data/site.ts', 'utf8');
const productionOrigin = siteSource.match(/url:\s*'([^']+)'/)?.[1];

if (!existsSync(outputDirectory)) {
  throw new Error('dist klasörü bulunamadı. Önce Astro derlemesini çalıştırın.');
}

if (!productionOrigin) {
  throw new Error('src/data/site.ts içindeki üretim adresi okunamadı.');
}

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = join(directory, entry.name);
    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

const htmlFiles = walk(outputDirectory).filter((file) => file.endsWith('.html'));
const pages = htmlFiles.map((file) => ({ file, html: readFileSync(file, 'utf8') }));
const errors = [];
const titles = new Map();
const descriptions = new Map();

function registerUnique(collection, value, file, label) {
  if (!value) {
    errors.push(`${relative(outputDirectory, file)}: ${label} bulunamadı.`);
    return;
  }

  if (collection.has(value)) {
    errors.push(`${relative(outputDirectory, file)}: ${label} başka bir sayfayla aynı (${collection.get(value)}).`);
    return;
  }

  collection.set(value, relative(outputDirectory, file));
}

function outputPathForUrl(pathname) {
  if (pathname === '/') return join(outputDirectory, 'index.html');
  if (pathname.endsWith('/')) return join(outputDirectory, pathname.slice(1), 'index.html');
  if (extname(pathname)) return join(outputDirectory, pathname.slice(1));
  return join(outputDirectory, pathname.slice(1), 'index.html');
}

for (const { file, html } of pages) {
  const isErrorPage = file.endsWith('404.html');
  const title = html.match(/<title>([^<]+)<\/title>/i)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1];

  if (!isErrorPage) {
    registerUnique(titles, title, file, 'title');
    registerUnique(descriptions, description, file, 'meta description');

    const headingCount = html.match(/<h1(?:\s|>)/gi)?.length ?? 0;
    if (headingCount !== 1) errors.push(`${relative(outputDirectory, file)}: ${headingCount} adet H1 bulundu.`);

    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
    if (!canonical?.startsWith(`${productionOrigin}/`)) {
      errors.push(`${relative(outputDirectory, file)}: üretim canonical adresi bulunamadı.`);
    }
  }

  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(match[1]);
    } catch {
      errors.push(`${relative(outputDirectory, file)}: geçersiz JSON-LD.`);
    }
  }

  for (const match of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const pathname = match[1];
    if (pathname.startsWith('/api/')) continue;
    if (!existsSync(outputPathForUrl(pathname))) {
      errors.push(`${relative(outputDirectory, file)}: kırık iç bağlantı ${pathname}`);
    }
  }
}

const nightInputs = pages.reduce(
  (total, { html }) => total + (html.match(/<input[^>]+name="night"/gi)?.length ?? 0),
  0,
);
if (nightInputs > 0) errors.push(`Doğrulanmış gece tarifesi yokken ${nightInputs} gece tarifesi alanı üretildi.`);

const sitemap = readFileSync(join(outputDirectory, 'sitemap-index.xml'), 'utf8');
const sitemapUrls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
for (const url of sitemapUrls) {
  if (!url.startsWith(`${productionOrigin}/`) || url.includes('?')) {
    errors.push(`Sitemap içinde geçersiz adres: ${url}`);
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(
  `${htmlFiles.length} HTML sayfası, ${sitemapUrls.length} sitemap adresi, canonical, H1, meta, JSON-LD ve iç bağlantılar doğrulandı.`,
);
