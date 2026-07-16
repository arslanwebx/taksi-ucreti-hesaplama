# Taksi Ücreti Hesaplama

WordPress bağımlılığı olmadan çalışan, Next.js ve TypeScript ile statik üretilen Türkçe taksi tarifesi ve hesaplama sitesi. 81 il tarifesi Excel çalışma kitabından üretilir; hesaplayıcı ve şehir içerikleri aynı merkezî veriyi kullanır.

## Kurulum ve komutlar

```bash
npm install
npm run import:fares
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

Next.js statik çıktıyı `out/` içine üretir. `wrangler.jsonc`, bu dizini Cloudflare Workers Static Assets olarak yayımlar. Worker önce ana host/HTTPS yönlendirmesini ve `/api/contact` isteğini işler, diğer istekleri statik varlıklara aktarır.

## Ortam değişkeni

İletişim formunun mesaj teslimi için `CONTACT_WEBHOOK_URL` Wrangler secret olarak eklenmelidir:

```bash
npx wrangler secret put CONTACT_WEBHOOK_URL
```

Webhook JSON kabul etmeli ve başarılı işlemde 2xx dönmelidir. Secret yoksa form sahte başarı göstermez; kullanıcıya e-posta bağlantısını kullanmasını söyler. Analitik şu an yapılandırılmamıştır.

## İçerik ve tarife iş akışı

- Ana tarife kaynağı `Turkiye_81_Il_Taksi_Tarifeleri_Tek_Sayfa_2026.xlsx` çalışma kitabıdır.
- Çalışma kitabını proje köküne veya kullanıcının `Downloads` klasörüne yerleştirin ve `npm run import:fares` komutunu çalıştırın.
- `scripts/import-taxi-fares.mjs` sayfa adını, zorunlu sütunları, tam 81 satırı, plaka/şehir/slug tekrarlarını, pozitif ücretleri, HTTPS kaynaklarını ve Excel'deki 5 km/10 km kontrol toplamlarını doğrular.
- Üretilen `src/data/taxi-fares.ts` dosyasındaki tarife rakamlarını elle değiştirmeyin. Hesaplayıcı 81 ilin tamamında `max(minimum, açılış + kilometre × km) + kullanıcı ek ücretleri` formülünü kullanır.
- Durum veya not alanında tahmini/teyit gerekli/ilçe bazlı/genelleme riski ifadesi bulunan kayıtlar tahmini işaretlenir ve sonuç ekranında uyarı gösterilir.
- Ayrı şehir yazıları yalnızca İstanbul, Ankara, İzmir ve Antalya için korunur; 81 adet ince içerik sayfası üretilmez.
- Build öncesi `scripts/validate-content.mjs` 81 kayıt, kontrol şehirleri, tahmini satırlar, metadata, kaynak görünürlüğü ve merkezî tarife kullanımını denetler.
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
