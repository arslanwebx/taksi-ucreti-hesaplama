# URL Map

| Old URL | New URL | Action | Reason |
|---|---|---|---|
| `/` | `/` | keep | Ana hesaplayıcı ve genel arama niyeti |
| `/istanbul-taksi-ucreti/` | aynı | keep | İstanbul otoriter şehir URL'si |
| `/ankara-taksi-ucreti/` | aynı | keep | Ankara otoriter şehir URL'si |
| `/izmir-taksi-ucreti/` | aynı | keep | İzmir otoriter şehir URL'si |
| `/antalya-taksi-ucreti/` | aynı | keep | Antalya otoriter şehir URL'si |
| `/istanbul-havalimani-taksi-ucreti/` | aynı | keep | Değerli havalimanı rehberi |
| `/sehirler/` | aynı | keep | Şehir merkezi |
| `/taksi-rehberi/` | aynı | keep | Rehber merkezi |
| `/hakkimizda/`, `/iletisim/` | aynı | keep | Güven sayfaları |
| `/gizlilik-politikasi/` | aynı | keep | Yasal URL |
| `/kullanim-sartlari/` | `/kullanim-kosullari/` | 301 | Tek kanonik koşullar URL'si |
| `/author/oguzhan-arslan/` | `/yazar/oguzhan-arslan/` | 301 | Türkçe ve kanonik yazar URL'si |
| `/author/admin/` | `/yazar/oguzhan-arslan/` | 301 | Eski yazar kopyası |
| `/category/sehirler/`, `/kategori/sehirler/` | `/sehirler/` | 301 | Tek şehir merkezi |
| `/category/taksi-rehberi/`, `/kategori/taksi-rehberi/` | `/taksi-rehberi/` | 301 | Tek rehber merkezi |
| `/tag/taksi-ucreti/` | `/taksi-rehberi/` | 301 | En yakın ilgili içerik merkezi |
| `/tag/taksi-hesaplama/` | `/` | 301 | Ana hesaplayıcıyla aynı niyet |

HTTP ve `www` istekleri Worker tarafından doğrudan HTTPS non-www kanonik URL'ye yönlendirilir.
