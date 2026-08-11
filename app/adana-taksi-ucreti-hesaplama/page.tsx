import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticlePage } from '@/components/ArticlePage';
import { Calculator } from '@/components/Calculator';
import { TableOfContents } from '@/components/TableOfContents';
import { pageMetadata } from '@/lib/seo';
import { calculateFare, formatCurrency } from '@/lib/taxi-calculator';
import { canonical } from '@/src/data/site';
import { taxiFareBySlug } from '@/src/data/taxi-fares';

const seoTitle = 'Adana Taksi Ücreti Hesaplama 2026 (Resmi Tarife: 45 TL Açılış)';
const heading = 'Adana Taksi Ücreti Hesaplama 2026';
const description = "Adana'da 2026 taksi ücretleri ne kadar? Esnaf Odası'nın resmi meclis kararına göre açılış, km ve indi bindi tarifesi, örnek hesaplamalarla burada.";
const path = '/adana-taksi-ucreti-hesaplama/';
const published = '2026-08-11';
const modified = '2026-08-11';
const tariff = taxiFareBySlug.adana!;
const distances = [2, 5, 10, 20, 30] as const;

const faqs = [
  { question: 'Adana taksi açılış ücreti 2026 yılında kaç TL?', answer: 'Adana Büyükşehir Belediye Meclisinin 12 Aralık 2025 tarihli kararına göre taksimetre açılış ücreti 45 TL’dir.' },
  { question: 'Adana taksi kilometre ücreti kaç TL?', answer: 'Standart ticari taksiler için mesafe tarifesi kilometre başına 50 TL’dir.' },
  { question: 'Adana indi bindi ücreti kaç TL?', answer: '0–2,5 kilometre arasındaki kısa yolculuklar için minimum ücret 170 TL’dir. Bu tutar normal ücrete eklenmez; hesabın alt sınırıdır.' },
  { question: 'Adana taksilerinde gece tarifesi var mı?', answer: 'Kararda ayrı bir gece tarifesi belirtilmemiştir. Açılış, kilometre ve kısa mesafe tarifesi 24 saat geçerlidir.' },
  { question: 'Adana taksi bekleme ücreti nasıl hesaplanır?', answer: 'Resmî zaman tarifesi saatte 300 TL, yani dakikada 5 TL’dir. Bekleme veya düşük hızda geçen süre gerçek taksimetre tutarını artırabilir.' },
  { question: 'Çukurova Havalimanı Adana merkez taksi ücreti ne kadar?', answer: 'Ücret, terminal ile tam varış adresi arasındaki araç rotasına göre değişir. Haritadaki güncel yol mesafesini hesaplayıcıya girerek tarife bazlı tahmin alın; bekleme ve ücretli yolları ayrıca değerlendirin.' },
];

const schemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Adana Taksi Ücreti Hesaplama',
    url: canonical(path),
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    description,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'Adana taksi ücreti nasıl hesaplanır?',
    description: 'Adana tarifesine göre araç rotası mesafesinden tahmini taksi ücreti hesaplama adımları.',
    totalTime: 'PT1M',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Rota mesafesini bulun', text: 'Başlangıç ve varış noktaları arasındaki araçla gidilecek kilometreyi haritadan kontrol edin.' },
      { '@type': 'HowToStep', position: 2, name: 'Mesafeyi girin', text: 'Kilometre değerini Adana hesaplayıcısına yazın.' },
      { '@type': 'HowToStep', position: 3, name: 'Tahmini ücreti hesaplayın', text: '45 TL açılış ve kilometre başına 50 TL üzerinden hesaplanan sonucu görüntüleyin.' },
      { '@type': 'HowToStep', position: 4, name: 'Minimum ücreti kontrol edin', text: 'Sonuç 170 TL’nin altındaysa kısa mesafe minimum ücreti uygulanır.' },
      { '@type': 'HowToStep', position: 5, name: 'Ek koşulları değerlendirin', text: 'Bekleme, trafik, duraklama ve ücretli yol giderlerinin gerçek tutarı artırabileceğini hesaba katın.' },
    ],
  },
];

export const metadata: Metadata = pageMetadata(seoTitle, description, path, 'article');

export default function AdanaTaxiFarePage() {
  return (
    <ArticlePage title={seoTitle} heading={heading} description={description} path={path} published={published} modified={modified} category="Şehirler" readingMinutes={9} faqs={faqs} additionalSchemas={schemas} featuredImageAlt="Adana taksi ücreti hesaplama 2026 - güncel tarife ve hesaplama aracı">
      <p className="notice"><strong>Kısa cevap:</strong> Adana’da taksimetre açılışı 45 TL, kilometre ücreti 50 TL ve 0–2,5 km kısa mesafe ücreti 170 TL’dir. Bekleme tarifesi dakikada 5 TL’dir.</p>
      <p>Adana taksi ücreti hesaplama aracı, haritada gördüğünüz araç rotası mesafesini güncel tarife kalemleriyle birleştirir. Sonuç planlama amaçlıdır; taksimetrenin ölçtüğü gerçek mesafe ve süre esas alınır.</p>

      <TableOfContents items={[
        { id: 'hesaplayici', label: 'Adana taksi ücreti hesaplama' },
        { id: 'guncel-tarife', label: '2026 Adana taksi tarifesi' },
        { id: 'hesaplama-formulu', label: 'Hesaplama formülü ve örnekler' },
        { id: 'indi-bindi', label: 'İndi bindi ve gece tarifesi' },
        { id: 'bekleme-ek-ucretler', label: 'Bekleme ve ek ücretler' },
        { id: 'cukurova-havalimani', label: 'Çukurova Havalimanı taksi hesabı' },
        { id: 'sonuc-farklari', label: 'Tahmin neden farklı çıkabilir?' },
        { id: 'sik-sorulan-sorular', label: 'Sık sorulan sorular' },
      ]}/>

      <section id="hesaplayici">
        <h2>Adana Taksi Ücreti Hesaplama</h2>
        <p>Haritadaki araçla gidilecek mesafeyi kilometre olarak girin. Hesaplayıcı açılış, mesafe ve minimum ücret kuralına göre tahmini tutarı verir.</p>
        <Calculator fixedCity="adana"/>
        <p className="calc-disclaimer">Ek ücretler nedeniyle gerçek taksimetre tutarı farklı olabilir. Sonucu yolculuk planlaması için kullanın.</p>
      </section>

      <section id="guncel-tarife">
        <h2>2026 Adana Taksi Tarifesi</h2>
        <div className="table-wrap"><table><caption>Adana standart ticari taksi tarifesi</caption><thead><tr><th>Tarife kalemi</th><th>Tutar</th></tr></thead><tbody><tr><th scope="row">Taksimetre açılışı</th><td>45 TL</td></tr><tr><th scope="row">Kilometre ücreti</th><td>50 TL/km</td></tr><tr><th scope="row">Kısa mesafe (0–2,5 km)</th><td>170 TL</td></tr><tr><th scope="row">Zaman tarifesi</th><td>300 TL/saat (5 TL/dk)</td></tr></tbody></table></div>
        <p>Bu tutarlar <a href="https://www.adana.bel.tr/panel/uploads/mecliskararlari_v/files/2025-aralik-pdfsi.pdf" rel="external">Adana Büyükşehir Belediyesi’nin 12 Aralık 2025 tarihli taksi tarife kararında</a> yer alır. 308 sayılı karar, tarifenin 24 saat uygulanacağını belirtir.</p>
      </section>

      <section id="hesaplama-formulu">
        <h2>Adana Taksi Ücreti Nasıl Hesaplanır?</h2>
        <p className="notice"><strong>Tahmini ücret = en yüksek değer: 170 TL veya (45 TL + mesafe × 50 TL)</strong></p>
        <p>Bekleme yoksa 2 km hesabı 145 TL çıkar; bu tutar 170 TL minimumun altında olduğu için 170 TL uygulanır. Daha uzun rotalarda açılış ve kilometre toplamı minimumu geçtiğinde normal hesap geçerlidir.</p>
        <div className="table-wrap"><table><caption>Adana için örnek mesafe hesapları</caption><thead><tr><th>Mesafe</th><th>Tarife hesabı</th><th>Tahmini ücret</th></tr></thead><tbody>{distances.map((distance) => { const fare = calculateFare(tariff, distance); return <tr key={distance}><th scope="row">{distance} km</th><td>45 TL + ({distance} × 50 TL)</td><td>{formatCurrency(fare.total)}</td></tr>; })}</tbody></table></div>

        <figure className="article-inline-image">
          <img src="/blog/adana-sari-taksi-seyhan-960.webp" srcSet="/blog/adana-sari-taksi-seyhan-480.webp 480w, /blog/adana-sari-taksi-seyhan-960.webp 960w" sizes="(max-width: 908px) calc(100vw - 48px), 860px" alt="Adana’da sarı taksi ve şehir içi yolculuk görünümü" width="960" height="640" loading="lazy" decoding="async"/>
          <figcaption>Adana taksi ücreti tahmini için kuş uçuşu uzaklık yerine haritadaki araç rotası mesafesini kullanın.</figcaption>
        </figure>
      </section>

      <section id="indi-bindi">
        <h2>Adana İndi Bindi Ücreti ve Gece Tarifesi</h2>
        <p>Adana’da 0–2,5 km arasındaki yolculukların minimum ücreti 170 TL’dir. İndi bindi bedeli, hesaplanan tutarın üzerine eklenen ayrı bir ücret değildir. Taksimetre hesabı 170 TL’yi aşarsa daha yüksek olan normal tutar ödenir. Minimum ücretin işleyişini <Link href="/indi-bindi-ucreti-nedir/">indi bindi ücreti rehberinde</Link> ayrıntılı görebilirsiniz.</p>
        <p>Resmî kararda ayrı bir gece katsayısı bulunmaz; aynı tarife 24 saat geçerlidir.</p>
      </section>

      <section id="bekleme-ek-ucretler">
        <h2>Bekleme, Trafik ve Ek Ücretler</h2>
        <p>Adana için zaman tarifesi saatte 300 TL, dakikada 5 TL’dir. Trafikte düşük hızla ilerleme, yolcu isteğiyle durma, bekleme, bagaj işlemleri ve benzeri durumlar gerçek taksimetre tutarını artırabilir.</p>
        <p>Köprü, tünel ve otoyol geçiş ücretleri hesaplayıcı sonucuna dahil değildir. Rotada ücretli geçiş varsa ödenen bedel yukarıdaki tahmine ayrıca eklenebilir. Genel yöntemi <Link href="/taksi-ucreti-nasil-hesaplanir/">taksi ücreti hesaplama rehberinde</Link> inceleyebilirsiniz.</p>
      </section>

      <section id="cukurova-havalimani">
        <h2>Çukurova Havalimanı – Adana Taksi Ücreti</h2>
        <p>Adana’nın tarifeli ticari yolcu uçuşları Çukurova Uluslararası Havalimanı üzerinden yapılır. Terminalin konumu ve ulaşım bilgileri için <a href="https://dhmi.gov.tr/Sayfalar/Havalimani/Cukurova/GenelBilgiler.aspx" rel="external">DHMİ Çukurova Uluslararası Havalimanı genel bilgilerini</a> kontrol edebilirsiniz.</p>
        <p>Havalimanı ile Adana’daki tam adresiniz arasındaki güncel araç rotasını haritadan bulun ve mesafeyi hesaplayıcıya girin. Sabit bir havalimanı fiyatı varsaymayın; rota, bekleme ve varsa ücretli yol bedelleri sonucu değiştirir. Diğer terminaller için <Link href="/havalimani-taksi-ucretleri/">havalimanı taksi ücretleri rehberine</Link> geçin.</p>
      </section>

      <section id="sonuc-farklari">
        <h2>Hesaplayıcı ile Taksimetre Neden Farklı Çıkabilir?</h2>
        <ul><li>Haritadaki tahmini rota ile sürülen gerçek rota farklı olabilir.</li><li>Trafikte yavaş ilerleme veya bekleme zaman tarifesini devreye sokabilir.</li><li>Yolcu isteğiyle yapılan duraklamalar süreyi artırabilir.</li><li>Ücretli yol ve benzeri geçiş bedelleri ayrıca tahsil edilebilir.</li><li>Yeni bir yerel tarife yürürlüğe girmiş olabilir.</li></ul>
        <p>Yolculuk öncesinde taksimetrenin açık olduğunu ve araçtaki tarife bilgisini kontrol edin. Kaynakta ya da hesapta bir uyumsuzluk görürseniz <Link href="/iletisim/">iletişim sayfasından</Link> karar bağlantısıyla bildirebilirsiniz.</p>
        <p><Link href="/">81 il taksi ücreti hesaplayıcısına</Link> dönün veya diğer yayımlanmış <Link href="/sehirler/">şehir tarifelerini</Link> karşılaştırın.</p>
      </section>
    </ArticlePage>
  );
}
