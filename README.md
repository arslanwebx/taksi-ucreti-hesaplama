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
