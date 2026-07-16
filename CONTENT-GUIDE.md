# Content Guide

## Zorunlu metadata şeması

Şehir, havalimanı, rehber, rota ve politika içerikleri şu alanları taşımalıdır: başlık, slug, meta başlık, meta açıklama, H1, giriş, yayın/değişiklik tarihi, yazar, değerlendirici (varsa), canonical, kategori, ilişkili sayfalar, birincil/ikincil anahtar kelimeler, görünür SSS, kaynaklar ve indeksleme durumu.

Tarife sayfasında ayrıca açılış, kilometre, minimum, doğrulanmış bekleme, kategoriler, gece kuralı, ek ücretler, yürürlük ve doğrulama tarihleri ile kaynak adı/URL'si zorunludur. Bilinmeyen değer uydurulmaz; opsiyonel alan boş bırakılır ve arayüz bunu açıklar.

## Yeni şehir

1. `src/data/cities.ts` dosyasına benzersiz `slug` ve `path` ile `City` ekleyin.
2. Resmî kaynağı tercih edin; yoksa `sourceTier: 'ikincil'` kullanın.
3. Yerel ilçeler, havalimanı ilişkisi ve yalnızca makul örnek mesafeler ekleyin.
4. Gece zammını yalnızca açık tarife varsa tanımlayın; mevcut motor ayrıca katsayı uygulamaz.
5. Build alın, sayfada bir H1 ve sitemap girdisi olduğunu kontrol edin.

## Havalimanı, rehber, rota ve politika

- Substantial özel içerik için `src/pages/` altında kanonik Astro sayfası oluşturun.
- İnce havalimanı sayfası açmayın; şehir sayfasına veya havalimanı merkezine bağlayın.
- `/rotalar/` merkezi ancak yeterli özgün rota içeriği oluştuğunda yayımlanmalıdır.
- Kurumsal politika metinleri `src/data/pages.ts` içinde tutulabilir.
- Aynı arama niyetine ikinci slug açmayın.

## Yayın kontrolü

- [ ] Benzersiz slug, başlık, meta açıklama ve canonical
- [ ] Tam olarak bir H1, boş olmayan içerik, geçerli tarihler
- [ ] Tarife için kaynak ve yürürlük tarihi
- [ ] Açıklayıcı iç bağlantılar; genel “buraya tıklayın” yok
- [ ] Görünür SSS olmadan FAQ schema yok
- [ ] İlgili sayfalardan en az bir gelen bağlantı
- [ ] Featured/stock/placeholder görsel yok
- [ ] `npm run build` başarılı
