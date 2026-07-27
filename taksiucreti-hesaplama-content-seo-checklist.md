# Taksiucreti-hesaplama.blog — Codex İçerik & SEO Master Checklist

**Kullanım:** Bir anahtar kelime/şehir/rota/konu ver → Codex önce Araştırma Protokolü'nü uygular, sonra Sayfa Tipi Kararı'nı verir, sonra ilgili şablonu ve tüm checklist maddelerini uygulayarak yayına hazır içerik üretir. Bu dosya tek referans kaynağıdır; tüm kararlar buradaki kurallara göre alınır.

---

## 0. Site Profili (Codex bunu her zaman aklında tutmalı)

- **Marka:** Taksi Ücreti Hesaplama — Türkiye genelinde 81 il için taksi ücreti hesaplama aracı ve tarife rehberi.
- **Dil/Bölge:** Türkçe (tr_TR), tek pazar.
- **İçerik türü:** Bilgilendirici + interaktif hesaplayıcı destekli tarife rehberleri. Satış/afiliate dili yok, reklam geliri (AdSense) ile monetize.
- **Sesi/Persona:** Tarafsız, kaynak odaklı, "veri denetçisi" tonu. Yazar: Oğuzhan Arslan — her sayfada "Yazan / Güncellendi / Son kontrol" bilgisi var.
- **Temel farklılaştırıcı:** Her tarife kaydının kaynağı (belediye/UKOME/meslek odası kararı), referans tarihi ve "son kontrol" tarihi açıkça gösteriliyor. Resmî olmayan kayıtlar "ikincil/tahmini" olarak etiketleniyor. Bu şeffaflık kalıbı asla bozulmamalı.
- **Ana entity:** "Taksi ücreti hesaplama" (şehir bazlı tarife: açılış ücreti, kilometre ücreti, minimum/indi-bindi ücreti, varsa zaman/bekleme tarifesi).

---

## 1. Anahtar Kelime Verildiğinde: Ön Araştırma Protokolü (yazmadan ÖNCE)

Codex bir anahtar kelime aldığında yazmaya başlamadan önce sırasıyla:

1. **Mevcut site taraması:** `/sehirler/`, `/blog/`, ana sayfa ve ilgili şehir sayfalarını kontrol et. Aynı intent'i hedefleyen bir sayfa var mı? Varsa yeni sayfa açma — mevcut sayfayı güncelle veya farklı bir alt-intent bul (kannibalizasyonu önle, bkz. Madde 23 orijinal checklist).
2. **Search intent tanımla:** Kullanıcı ne öğrenmek istiyor — genel tarife mi, belirli bir rota tahmini mi, kavram açıklaması mı (örn. "indi-bindi nedir"), karşılaştırma mı (şehirler arası), yoksa havalimanı/özel güzergah mı?
3. **Resmî kaynak araştırması (zorunlu):** Şehir/ilçe belediyesi, UKOME kararı, taksi/şoförler odası (S.S. Taksiciler Kooperatifi vb.) duyurusu, resmî PDF/karar metni ara. Bulunan her rakam için: kaynak linki, karar/tarife tarihi, kaynak güvenilirlik seviyesi (Resmî / Yetkili meslek kuruluşu / İkincil-tahmini) not edilir.
4. **Rakip/SERP taraması:** Aynı anahtar kelime için üst sıradaki sayfaları incele — eksik kalan noktaları, cevaplanmamış soruları, zayıf/güncel olmayan verileri tespit et. Bunları geçmek için kullan, kopyalamak için değil.
5. **Semantik alan araştırması:** İlgili terimler (açılış ücreti, kilometre ücreti, indi-bindi, taksimetre, bekleme tarifesi, köprü/tünel/otoyol geçişi, gece tarifesi, sarı/turkuaz taksi), "insanlar ayrıca soruyor" soruları, ilgili rotalar/semtler, ilgili şehirler.
5b. **Rakam ve tarih doğrulama:** Açılış ücreti, km ücreti, minimum ücret, geçerlilik tarihi rakamlarını mutlaka birincil kaynaktan teyit et — asla tahmin/uydurma rakam kullanma. Kaynak bulunamıyorsa sayfada "ikincil/tahmini kayıt" etiketiyle belirt, resmî gibi sunma.
6. **İç linkleme fırsatları:** Hangi mevcut sayfalara (ana sayfa hesaplayıcı, `/sehirler/`, ilgili şehir sayfaları, `/indi-bindi-ucreti-nedir/`, `/taksi-ucreti-nasil-hesaplanir/`, `/veri-kaynaklari-ve-hesaplama-yontemi/`, `/havalimani-taksi-ucretleri/`, yazar sayfası) doğal bağlantı verilecek, hangi mevcut sayfalardan bu yeni sayfaya link eklenmeli.

Bu adımlar tamamlanmadan içerik üretimine geçilmez.

---

## 2. Sayfa Tipi Kararı

Anahtar kelimeye göre uygun şablonu seç:

| Sayfa tipi | Örnek anahtar kelime | URL kalıbı |
|---|---|---|
| **Şehir tarife sayfası** | "ankara taksi ücreti", "izmir taksi ücreti hesaplama" | `/{sehir}-taksi-ucreti/` |
| **Havalimanı/terminal sayfası** | "istanbul havalimanı taksi ücreti" | `/{sehir}-havalimani-taksi-ucreti/` |
| **Kavram/rehber makalesi (blog)** | "indi bindi ücreti nedir", "taksi ücreti nasıl hesaplanır" | `/{konu-slug}/` |
| **Karşılaştırma/hub sayfası** | "şehirler arası taksi ücreti karşılaştırma" | `/sehirler/` altında veya blog |
| **Rota odaklı içerik** | "taksim kadıköy taksi ücreti" | Ana şehir sayfası içinde bölüm olarak (ayrı sayfa açma, cannibalization riski) |

Şehir sayfası zaten varsa ve talep sadece belirli bir rota ise, **yeni sayfa açma** — mevcut şehir sayfasındaki "Popüler rotalar" tablosuna satır ekle.

---

## 3. Zorunlu Sayfa İskeleti (Şehir/Tarife Sayfaları İçin)

Site genelinde gözlemlenen kalıba göre her tarife sayfası bu sırayı takip eder:

1. **Breadcrumb** (Ana Sayfa → Sayfa adı)
2. **H1:** `{Şehir} Taksi Ücreti Hesaplama {Yıl}`
3. **Yazar/tarih satırı:** Yazan: [Oğuzhan Arslan] • Güncellendi: [tarih] • Kategori • Okuma süresi
4. **Giriş (2-3 satır, meta description ile uyumlu)**
5. **Öne çıkan görsel** (alt text ile, dosya adı slug uyumlu)
6. **"Kısa cevap" kutusu** — sorunun 2-3 cümlelik direkt cevabı
7. **Tarife özet kartı** — açılış / km / minimum / varsa zaman tarifesi + geçerlilik tarihi
8. **Hesaplayıcı embed** (şehir + mesafe + popüler varış noktası + ek geçiş ücreti alanı)
9. **H2: "{Şehir} taksi ücreti hesaplama"** — hesaplayıcı açıklaması
10. **H2: "{Yıl} {Şehir} sarı taksi tarifesi"** — tam tarife tablosu (kalem / tutar / uygulama)
11. **H2: "Popüler {Şehir} rota tahminleri"** — rota tablosu (rota / mesafe / tahmini ücret / geçiş notu / işlem)
12. **H2: Konuya özgü ek bölüm** (örn. "Trafik ve zaman tarifesi nasıl etkiler?") — şehre özgü farklılaştırıcı bilgi, kopyala-yapıştır değil
13. **H2: İlgili özel sayfaya link** (havalimanı vb. varsa)
14. **H2: "Resmî tarife kaynağı"** — geçerlilik tarihi, son kontrol tarihi, birincil kaynak linki
15. **İç link satırı** (Türkiye geneli hesaplayıcı / şehirler hub / indi-bindi rehberi / hesaplama yöntemi rehberi)
16. **H2: "Sık sorulan sorular"** — 8-12 soru, JSON-LD FAQ schema ile birebir eşleşen
17. **Yazar bloğu** (foto + kısa bio + inceleme yaklaşımı linki)
18. **Standart footer** (hızlı bağlantılar, şeffaflık, iletişim, sorumluluk reddi)

Blog/kavram makaleleri için 6-11 arası hesaplayıcı/tarife-tablosu bölümleri konuya göre uyarlanır veya kaldırılır, ama Kısa cevap + FAQ + Kaynak + Yazar bloğu her zaman kalır.

---

## 4. İçerik Yazım Checklist'i (her makale için uygulanır)

Aşağıdaki maddeler nihai, yayına hazır içeriğe doğrudan uygulanır — not veya açıklama olarak değil.

1. Okuyucunun ana sorusunu ilk paragrafta 2-3 satırda cevapla ("Kısa cevap" kutusu), ardından H2/H3 ile detay, adımlar, örnekler.
2. Gerçek arama amacına birebir uy: genel tarife mi, rota tahmini mi, kavram açıklaması mı net olarak belirle ve ona göre yaz.
3. Bilgilendirici ve faydacı kal. Satış dili, abartılı iddia, gereksiz promosyon yok — bu site tarife verisi sunar, ürün satmaz.
4. Önce okuyucu için, sonra arama motoru için yaz. SEO netliği artırmalı, doğallığı bozmamalı.
5. Ana anahtar kelimeyi başlıkta, girişte, en az bir alt başlıkta ve içerik boyunca doğal şekilde kullan.
6. İlgili terimleri doğal kullan: açılış ücreti, kilometre ücreti, indi-bindi, taksimetre, minimum ücret, bekleme tarifesi, köprü/tünel/otoyol geçişi. Zorlama veya mekanik tekrar yok.
7. Her makaleyi yapısal olarak benzersiz kur — giriş, başlık sırası, örnekler, rota seçimi, karşılaştırmalar, FAQ ve sonucu şehirden şehire farklılaştır. Kısa paragraflar, max 3 satır.
8. Tarafsız bir "veri denetçisi" uzman sesiyle yaz. Aktif çatı, net ifade, doğal cümle akışı. Robotik geçişler ve uzun tire kullanma.
9. Taranabilir yapı: net başlıklar, kısa ama eksiksiz paragraflar, seçici kalın metin, sadece okunabilirliği artırdığında liste kullan.
10. Tablo sadece tarife karşılaştırması, rota listesi, fiyat dökümü gibi gerçekten karşılaştırma gerektiren yerlerde kullanılır (bu sitede tablo kullanımı zaten çekirdek formattır).
11. Konuyu eksiksiz ama yalın kapsa — tekrar, belirsiz iddia, alakasız arka plan, gereksiz bölüm ekleme.
12. Kelime sayısını konuya göre belirle: şehir sayfaları ~1200-1800 kelime civarı (mevcut İstanbul sayfası referans alınabilir), kavram makaleleri konunun derinliğine göre değişir. Doldurma yapma.
13. Teknik terimleri (taksimetre, UKOME, indi-bindi, zaman tarifesi/dönüşüm hızı) basit dille açıkla, örnek ve yaygın hata notu ekle.
14. Rakip içerikten netlik, derinlik, orijinal rota örnekleri ve daha eksiksiz kapsamla ayrış.
15. Önemli iddiaları 2-3 doğal dış linkle destekle — belediye/UKOME/resmî tarife PDF'i, meslek odası duyurusu gibi güvenilir kaynaklar (bu site için bu zorunlu, süsleme değil).
16. E-E-A-T: bilgi doğru, spesifik, dengeli ve doğru şekilde atıflandırılmış olmalı. Abartılı kesinlik iddiasından kaçın — sonucun tahmini olduğunu ve gerçek taksimetrenin belirleyici olduğunu her sayfada netleştir.
17. İlgili iç linkleri doğal ekle: hesaplayıcı, `/sehirler/`, ilgili şehir/havalimanı sayfaları, `/indi-bindi-ucreti-nedir/`, `/taksi-ucreti-nasil-hesaplanir/`, `/veri-kaynaklari-ve-hesaplama-yontemi/`. Açıklayıcı anchor text kullan, zorlama link yok.
18. Gerçek, faydalı bir FAQ bölümü ekle (8-12 soru) + görünen FAQ ile birebir eşleşen geçerli JSON-LD FAQPage schema.
19. Bir özgün öne çıkan görsel ve gerektiğinde 1-2 içerik görseli oluştur/kullan; dosya boyutu, boyut, dosya adı ve alt text optimize edilir (dosya adı kalıbı: `{sehir}-taksi-ucreti-960.jpg`).
20. Arama amacına uyan, ana kelimeyi doğal içeren, başka sayfayla çakışmayan özgün SEO başlığı ve meta açıklaması yaz (mevcut kalıp: `{Şehir} Taksi Ücreti Hesaplama {Yıl}` / `{Şehir} Taksi Ücreti [{Yıl}] – Hesaplama Aracı`).
21. Kısa, okunabilir, anahtar kelimeyle ilgili URL slug kullan (`/{sehir}-taksi-ucreti/` kalıbı). Yayınlanmış URL'yi gerekmedikçe değiştirme; değiştirirsen 301 yönlendirme ekle.
22. Tek net H1, mantıklı H2/H3 hiyerarşisi. Seviye atlama yok, başlıkları sadece görsel stil için kullanma.
23. Yayınlamadan önce mevcut sayfaları kontrol ederek keyword cannibalization'ı önle. Her sayfa farklı bir ana anahtar kelimeyi ve net farklı bir arama amacını hedeflemeli (örn. genel şehir sayfası vs. havalimanı sayfası vs. rota detayı — ayrı sayfa yerine mevcut sayfaya bölüm ekleme tercih edilir).
24. Sayfanın teknik olarak indekslenebilir olduğunu doğrula: doğru canonical URL, sitemap'te yer alma, robots.txt/noindex ile yanlışlıkla engellenmemiş olma, mobilde düzgün yüklenme, kırık link olmaması.
25. Orijinal yayıncılık ve doğru atıf önemini anlamak için Google patentini (US8707459B2) referans al — içerikte bundan hiç bahsetme, sadece orijinallik standardını içselleştirmek için.
26. Yazmadan önce konuyu derinlemesine araştır, önemli gerçekleri güncel ve güvenilir kaynaklarla doğrula (bkz. Bölüm 1, Madde 3). Sadece doğru ve gerçekten değerli bilgi kullan; istatistik, iddia, alıntı veya uzman görüşü asla uydurma.
27. Yayınlamadan önce orijinallik, dilbilgisi/noktalama, başlık hiyerarşisi, anahtar kelime kullanımı, linkler, gerçek doğruluğu, görsel optimizasyonu ve genel okunabilirliği kontrol et.
28. Net anlatım, gerçekçi örnekler (gerçek semt/rota adları), değişken cümle yapısı ve akıcı geçişlerle ilgi çekici hale getir — doğruluk ve derinlikten ödün vermeden.

---

## 5. Bu Siteye Özgü Ek Kurallar (standart checklist'in ötesinde)

- **Kaynak şeffaflığı zorunlu:** Her tarife rakamının yanına kaynak türü etiketlenir — "Resmî belediye meclis kararı", "Yetkili meslek kuruluşu kaynak kaydı", "İkincil tarife kaydı / tahmini". Resmî olmayan veri asla resmî gibi sunulmaz.
- **"Son kontrol" ve "geçerlilik tarihi" ayrımı** her sayfada net olmalı — biri verinin ne zamandan itibaren geçerli olduğu, diğeri en son ne zaman doğrulandığı.
- **Sonuç her zaman tahmini olarak çerçevelenir.** "Kesin tutarı taksimetre belirler" ifadesi veya eşdeğeri her hesaplayıcı bloğunda ve uygun FAQ sorularında tekrar eder.
- **Zaman/bekleme tarifesi sadece belgelenmişse gösterilir.** Kaynakta yoksa otomatik/varsayılan bekleme ücreti eklenmez ve bu durum açıkça belirtilir.
- **Bagaj, gece tarifesi, taksi türü (sarı/turkuaz) gibi konularda** sadece doğrulanmış resmî bilgi varsa iddia edilir; yoksa "ayrı bir ... bulunmaz" şeklinde net ve dürüst yanıt verilir.
- **Rota tahminleri** gerçek semt/nokta adlarıyla kurulur, mesafeler "yaklaşık" olarak etiketlenir, trafik/köprü/tünel etkisi hariç tutulduğu belirtilir.
- **Yıl güncellemesi:** Başlıklarda ve H1'lerde güncel yıl (2026) kullanılır; tarife değiştiğinde sayfa güncellenir, yeni sayfa açılmaz.

---

## 6. Teknik SEO Checklist

- [ ] Canonical URL doğru ve self-referencing
- [ ] robots meta: `index, follow`
- [ ] XML sitemap'e dahil
- [ ] Mobile-first render, Core Web Vitals: LCP < 2.5s, INP < 200ms, CLS < 0.1 (75. persentil)
- [ ] Breadcrumb schema (BreadcrumbList)
- [ ] Article/WebPage schema + FAQPage schema (görünen FAQ ile birebir eşleşen)
- [ ] Yazar/Person schema veya en azından yazar bio linki (`/yazar/oguzhan-arslan/`)
- [ ] Görsel alt text + optimize dosya boyutu + tanımlayıcı dosya adı
- [ ] Open Graph + Twitter Card meta (site genelinde og:image `og-brand.svg` veya sayfa görseli)
- [ ] URL slug kısa, okunabilir, anahtar kelime içerir
- [ ] Kırık link kontrolü
- [ ] İç link: en az 3-5 alakalı iç link (hesaplayıcı, hub sayfa, ilgili rehberler)
- [ ] Dış link: 2-3 resmî/güvenilir kaynak

---

## 7. Yayın Öncesi Son Kontrol (Launch Checklist)

- [ ] H1 tek ve doğru
- [ ] Meta title + description özgün, kelime tekrarı yok, karakter sınırları içinde
- [ ] Tarife rakamları birincil kaynaktan doğrulandı, kaynak linki eklendi
- [ ] Geçerlilik tarihi + son kontrol tarihi doğru
- [ ] FAQ metni ile JSON-LD FAQ schema birebir eşleşiyor
- [ ] Hesaplayıcı embed doğru şehir/varsayılan değerlerle çalışıyor
- [ ] Rota tablosu gerçek/mantıklı mesafe ve tutarlarla dolu
- [ ] İç linkler çalışıyor ve alakalı
- [ ] Görsel(ler) optimize, alt text dolu
- [ ] Yazar bloğu ve footer standart kalıpla eşleşiyor
- [ ] Cannibalization kontrolü yapıldı — mevcut hiçbir sayfayla intent çakışmıyor
- [ ] Dil/imla/noktalama kontrolü yapıldı, doğal ve akıcı okunuyor

---

## 8. Codex İçin Çalışma Talimatı (özet)

Bir anahtar kelime verildiğinde Codex şu sırayla ilerler:

1. Bölüm 1'deki araştırma protokolünü uygula (mevcut sayfa taraması, intent, resmî kaynak araştırması, rakip taraması, semantik alan, iç link fırsatları).
2. Bölüm 2'ye göre sayfa tipine karar ver; mevcut sayfa varsa güncelleme öner, yeni sayfa açma.
3. Bölüm 3'teki iskeleti uygula.
4. Bölüm 4 ve 5'teki tüm kuralları nihai metne doğrudan uygula.
5. Bölüm 6 ve 7'deki teknik/yayın checklist'lerini kontrol listesi olarak çıktıya ekle.
6. Teslimat formatı: (a) yayına hazır tam sayfa içeriği (H1'den footer'a), (b) SEO title + meta description, (c) URL slug önerisi, (d) FAQ JSON-LD kod bloğu, (e) önerilen iç/dış linkler listesi, (f) uygulanan kaynak referansları (link + tarih).
