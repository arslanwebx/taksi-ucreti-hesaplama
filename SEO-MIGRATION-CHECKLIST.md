# SEO Migration Checklist

## URL envanteri ve koruma

- [x] `/`
- [x] `/istanbul-taksi-ucreti/`
- [x] `/ankara-taksi-ucreti/`
- [x] `/izmir-taksi-ucreti/`
- [x] `/antalya-taksi-ucreti/`
- [x] `/istanbul-havalimani-taksi-ucreti/`
- [x] `/sehirler/`, `/taksi-rehberi/`
- [x] Kurumsal, yasal, iletişim ve yazar URL'leri
- [x] Eski `kullanim-sartlari` ve legacy author URL'leri doğrudan 301

## Build kontrolleri

- [ ] Deploy sonrası tüm canonical URL'ler 200
- [x] Üretim canonical alan adı
- [x] Tek H1 şablonu, benzersiz başlık ve açıklamalar
- [x] `robots.txt`, yalnızca kanonik sayfalı sitemap
- [x] Article, WebPage, WebApplication, Organization, FAQ ve Breadcrumb şemaları görünür içerikle uyumlu
- [ ] Schema validator ile üretim URL'lerini test et
- [ ] Tarama ile kırık iç/dış link kontrolü
- [ ] HTTP/www/trailing-slash yönlendirmelerini üretimde doğrula
- [ ] Search Console sitemap gönderimi ve URL denetimi

## Lansman sonrası

- [ ] Cloudflare custom domain ve SSL
- [ ] `_headers` güvenlik başlıkları
- [ ] İletişim webhook secret ve gerçek teslim testi
- [ ] 404, redirect ve Worker hata günlükleri
- [ ] 7, 14 ve 30. gün indeksleme/kanonik izleme
- [ ] Eski WordPress kapsam raporundaki ek URL'leri envantere ekle
