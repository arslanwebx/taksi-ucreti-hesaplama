# Taksi Ücreti Hesaplama

WordPress bağımlılığı olmadan çalışan, Astro ve TypeScript ile statik üretilen Türkçe taksi tarifesi ve hesaplama sitesi. Tarife tabloları ile hesaplayıcılar `src/data/cities.ts` içindeki tek kaynağı kullanır.

## Kurulum ve komutlar

```bash
npm install
npm run dev
npm run build
npm run preview
npx wrangler deploy
```

Cloudflare ayarları tam olarak:

```text
Build command: npm run build
Deploy command: npx wrangler deploy
Version command: npx wrangler deploy
Root directory: /
```

Astro statik çıktıyı `dist/` içine üretir. `wrangler.jsonc`, bu dizini Cloudflare Workers Static Assets olarak yayımlar. Worker önce ana host/HTTPS yönlendirmesini ve `/api/contact` isteğini işler, diğer istekleri statik varlıklara aktarır.

## Ortam değişkeni

İletişim formunun mesaj teslimi için `CONTACT_WEBHOOK_URL` Wrangler secret olarak eklenmelidir:

```bash
npx wrangler secret put CONTACT_WEBHOOK_URL
```

Webhook JSON kabul etmeli ve başarılı işlemde 2xx dönmelidir. Secret yoksa form sahte başarı göstermez; kullanıcıya e-posta bağlantısını kullanmasını söyler. Analitik şu an yapılandırılmamıştır.

## İçerik ve tarife iş akışı

- Tarife değişikliklerinde önce resmî kararın kapsamı, yürürlük tarihi ve kategorileri doğrulanır.
- `src/data/cities.ts` içindeki tek şehir kaydı güncellenir; tablolar ve hesaplayıcı otomatik yenilenir.
- Yeni şehir için `City` şemasını eksiksiz doldurun, kaynak düzeyini belirtin ve `getStaticPaths` çıktısını build ile doğrulayın. Build öncesi `scripts/validate-content.mjs` yinelenen slug, tarih, metadata ve kaynak alanlarını denetler.
- Yeni politika/kurumsal içerik `src/data/pages.ts` üzerinden eklenebilir.
- Yeni özel rehber gerekiyorsa `src/pages/` altında tek kanonik slug ile oluşturun.
- Eski URL değişiyorsa `public/_redirects` içine doğrudan nihai URL'ye 301 ekleyin; zincir oluşturmayın.

## Alan adı ve üretim

Worker'a `taksiucreti-hesaplama.blog` özel alan adı bağlanmalıdır. Canonical ve sitemap üretim alanı sabittir; önizleme alanı canonical'a sızmaz. Deploy sonrasında özel alan adı, webhook secret, form teslimi, yönlendirmeler ve Search Console mülkü manuel kontrol edilmelidir.

### Eski WordPress origin ve DNS kontrolü

Yeni ve eski sitenin aynı anda görünmesini önlemek için Cloudflare panelinde şu kontroller zorunludur:

1. Apex alan adı ile `www` yalnızca bu Worker dağıtımına bağlanmalıdır.
2. Eski WordPress sunucusuna giden A, AAAA veya CNAME kaydı kaldırılmalıdır. Eski origin adresi Worker fallback ya da route olarak tutulmamalıdır.
3. Worker custom domain/route listesinde hem ana alan adı hem `www` görünmelidir. Worker, `www` ve HTTP isteklerini tek 301 ile HTTPS non-www adrese gönderir.
4. Deploy edilen tüm HTML yanıtlarında aynı `X-Site-Version` başlığı görülmelidir. Farklı değer veya başlıksız WordPress HTML'i, yanlış DNS/route işaretidir.
5. `/wp-admin/`, `/wp-json/`, `/wp-content/`, `/feed/` ve benzeri eski uç noktalar Worker tarafından 410 döndürür; origin'e aktarılmaz.

### Cache politikası ve deploy sonrası temizlik

- HTML, tarayıcıda `max-age=0, must-revalidate`; Cloudflare tarafında en fazla 5 dakika ve kısa `stale-while-revalidate` süresiyle sunulur.
- Hash'li `/_astro/*` dosyaları bir yıl `immutable` cache alır.
- HTML query string varyasyonları temiz canonical URL'ye 301 olur; gereksiz ayrı cache anahtarı oluşmaz.
- Her anlamlı içerik/tarife deploy'undan sonra Cloudflare Dashboard → **Caching → Configuration → Purge Everything** işlemini bir kez çalıştırın. Ardından ana sayfa ve önemli şehir URL'lerinde `X-Site-Version`, canonical ve yeni HTML'i kontrol edin.
- Purge işleminden sonra eski WordPress çıktısı görülüyorsa cache tekrar tekrar temizlenmemeli; DNS, Worker custom domain ve route önceliği düzeltilmelidir.

İletişim endpoint'i IP başına 10 dakikada 5 istekle sınırlandırılır ve honeypot kontrolü uygular. Çoklu Worker isolate'larında daha güçlü koruma için Cloudflare panelinde `/api/contact` yoluna ayrıca zone-level rate limiting kuralı tanımlanması önerilir.
