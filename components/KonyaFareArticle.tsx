import Link from 'next/link';
import { ArticlePage } from './ArticlePage';
import { Calculator } from './Calculator';
import { TableOfContents } from './TableOfContents';
import { taxiFareBySlug } from '@/src/data/taxi-fares';
import { calculateFare, formatCurrency } from '@/lib/taxi-calculator';
import { canonical, site } from '@/src/data/site';

const city = taxiFareBySlug.konya!;
const path = '/konya-taksi-ucreti/';
const seoTitle = 'Konya Taksi Ücreti 2026: Güncel Açılış ve Fiyatı Hesaplama';
const h1 = 'Konya Taksi Ücreti 2026: Güncel Tarife ve Hesaplama';
const description = 'Konya taksi ücreti hesaplama aracıyla mesafeye göre tahmini fiyatı öğrenin. 2026 açılış, kilometre ve indi-bindi tarifesini inceleyin.';
const exampleDistances = [1, 2, 3, 4, 5, 7, 10, 15, 20, 25, 30, 40, 50] as const;

const faqs = [
  { question: 'Konya taksi açılış ücreti ne kadar?', answer: 'Konya’da 2026 taksimetre açılış ücreti 55 TL’dir. Yolculuk başladığında bu tutarın üzerine kilometre başına 50 TL eklenir.' },
  { question: 'Konya’da taksi kilometre ücreti kaç TL?', answer: 'Güncel tarifede kilometre başına ücret 50 TL’dir. Bu da her 100 metre için yaklaşık 5 TL anlamına gelir.' },
  { question: 'Konya indi-bindi ücreti ne kadar?', answer: 'Konya’da kısa mesafe indi-bindi ücreti 200 TL’dir. Normal hesaplama 200 TL’nin altında kaldığında minimum 200 TL ödenir.' },
  { question: 'Konya’da 5 kilometre taksi ücreti ne kadar?', answer: 'Açılış ve kilometre tarifesine göre 5 kilometrelik beklemesiz yolculuk yaklaşık 305 TL tutar.' },
  { question: 'Konya’da 10 kilometre taksi ücreti ne kadar?', answer: '10 kilometre için temel hesaplama 55 + 500 TL şeklindedir. Tahmini toplam 555 TL’dir.' },
  { question: 'İndi-bindi ücretine açılış ücreti ayrıca eklenir mi?', answer: 'Hayır. İndi-bindi, kısa yolculuklar için belirlenen minimum ödeme sınırıdır. Taksimetre 200 TL’yi geçtiğinde gerçek taksimetre tutarı ödenir.' },
  { question: 'Konya’da gece taksiler daha pahalı mı?', answer: 'İncelenen güncel Konya tarife duyurularında gece için ayrı bir genel zam oranı belirtilmemiştir. Doğrulanmamış bir gece katsayısı hesaplamaya eklenmemelidir.' },
  { question: 'Hesaplama sonucu neden taksimetreden farklı çıkabilir?', answer: 'Çevrim içi sonuç tahmini mesafeye göre hazırlanır. Gerçek güzergâh, trafik, bekleme, ek duraklar ve ücretli geçişler taksimetrede farklı bir sonuç oluşturabilir.' },
];

export function KonyaFareArticle() {
  const webApplicationSchema = {
    '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Konya Taksi Ücreti Hesaplayıcı', url: canonical(path), applicationCategory: 'TravelApplication', operatingSystem: 'Web', inLanguage: 'tr-TR', description: 'Konya sarı taksi tarifesiyle mesafeye göre tahmini ücret hesaplar.', offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' }, publisher: { '@type': 'Organization', name: site.publisher, url: site.url },
  };

  return (
    <ArticlePage title={seoTitle} heading={h1} description={description} path={path} modified={city.lastVerified} category="Şehirler" readingMinutes={8} faqs={faqs} additionalSchemas={[webApplicationSchema]}>
      <p className="notice"><strong>Kısa cevap:</strong> Konya taksi ücreti 2026 tarifesinde açılış {formatCurrency(city.openingFare)}, kilometre başına ücret {formatCurrency(city.perKmFare)}, kısa mesafe indi-bindi ücreti ise {formatCurrency(city.minimumFare)}’dir. Bekleme ve ek geçiş ücreti olmayan 10 kilometrelik yolculuk yaklaşık {formatCurrency(calculateFare(city, 10).total)} tutar.</p>

      <section className="fare-answer-box" aria-label="Konya 2026 sarı taksi tarifesi özeti">
        <strong>Konya sarı taksi tarifesi</strong>
        <dl>
          <div><dt>Taksimetre açılışı</dt><dd>{formatCurrency(city.openingFare)}</dd></div>
          <div><dt>Kilometre başına ücret</dt><dd>{formatCurrency(city.perKmFare)}</dd></div>
          <div><dt>100 metre ücreti</dt><dd>{formatCurrency(city.perKmFare / 10)}</dd></div>
          <div><dt>İndi-bindi / minimum</dt><dd>{formatCurrency(city.minimumFare)}</dd></div>
          <div><dt>Tarife başlangıcı</dt><dd>4 Mayıs 2026</dd></div>
        </dl>
        <p>İncelenen güncel duyurularda dakika başına bekleme kalemi net olarak doğrulanamadığı için hesaplayıcı buna varsayımsal bir ücret eklemez.</p>
      </section>

      <TableOfContents items={[
        { id: 'hesaplama', label: 'Konya taksi ücreti hesaplama' }, { id: 'tarife', label: '2026 Konya taksi tarifesi' }, { id: 'mesafe-ornekleri', label: 'Konya’da kaç kilometre kaç TL?' }, { id: 'indi-bindi', label: 'İndi-bindi nasıl uygulanır?' }, { id: 'etkileyenler', label: 'Fiyatı değiştiren durumlar' }, { id: 'havalimani', label: 'Konya Havalimanı yolculukları' }, { id: 'kaynak', label: 'Tarife kaynağı' }, { id: 'sik-sorulan-sorular', label: 'Sık sorulan sorular' },
      ]} />

      <section id="hesaplama"><h2>Konya taksi ücreti hesaplama</h2><p>Mesafenizi girerek yaklaşık yolculuk bedelini görün. Hesap yalnızca Konya için kayıtlı sarı taksi tarifesini kullanır; son ödeme taksimetre, gerçek güzergâh, trafik ve varsa ek geçiş ücretlerine göre değişebilir.</p><Calculator fixedCity="konya" /></section>

      <section id="tarife"><h2>Konya taksi tarifesine hızlı bakış</h2><p>Konya’da yeni taksi tarifesi 4 Mayıs 2026 tarihinden itibaren geçerlidir. Tarife, Konya Esnaf ve Sanatkârlar Odaları Birliği duyurusunu aktaran güncel haber kaynaklarıyla kontrol edilmiştir.</p><div className="table-wrap"><table><caption>4 Mayıs 2026 itibarıyla Konya sarı taksi tarife kalemleri</caption><thead><tr><th scope="col">Tarife kalemi</th><th scope="col">Güncel ücret</th></tr></thead><tbody><tr><th scope="row">Taksimetre açılışı</th><td>{formatCurrency(city.openingFare)}</td></tr><tr><th scope="row">Kilometre başına ücret</th><td>{formatCurrency(city.perKmFare)}</td></tr><tr><th scope="row">100 metre ücreti</th><td>{formatCurrency(city.perKmFare / 10)}</td></tr><tr><th scope="row">İndi-bindi ücreti</th><td>{formatCurrency(city.minimumFare)}</td></tr><tr><th scope="row">Tarifenin başlangıcı</th><td>4 Mayıs 2026</td></tr></tbody></table></div><p><strong>Önemli:</strong> İndi-bindi, taksimetreye sonradan eklenen ayrı bir ücret değildir. Açılış ve mesafe üzerinden bulunan tutar {formatCurrency(city.minimumFare)}’nin altında kaldığında minimum ücret uygulanır.</p><p>Temel hesap: <strong>{formatCurrency(city.openingFare)} + (gidilen kilometre × {formatCurrency(city.perKmFare)})</strong>. Sonuç {formatCurrency(city.minimumFare)}’den düşükse yolculuk bedeli minimum ücret olarak kabul edilir.</p></section>

      <section id="mesafe-ornekleri"><h2>Konya’da kaç kilometre kaç TL?</h2><p>Aşağıdaki tahminler yalnızca açılış ve kilometre tarifesine göre hazırlanmıştır. Trafik, bekleme, yol değişikliği ve ek geçiş ücretleri dahil değildir.</p><div className="table-wrap"><table><caption>Mesafeye göre Konya sarı taksi tahminleri</caption><thead><tr><th scope="col">Mesafe</th><th scope="col">Tahmini ücret</th></tr></thead><tbody>{exampleDistances.map((km) => <tr key={km}><th scope="row">{km} km</th><td>{formatCurrency(calculateFare(city, km).total)}</td></tr>)}</tbody></table></div><p>Bu fiyatlar sabit yolculuk teklifi değildir. Taksimetre aracın gerçekten katettiği mesafeyi esas aldığı için navigasyon tahminiyle küçük farklar görülebilir.</p><h3>5, 10 ve 20 km için örnek hesaplamalar</h3><p><strong>5 kilometre:</strong> {formatCurrency(city.openingFare)} + (5 × {formatCurrency(city.perKmFare)}) = {formatCurrency(calculateFare(city, 5).total)}.</p><p><strong>10 kilometre:</strong> {formatCurrency(city.openingFare)} + (10 × {formatCurrency(city.perKmFare)}) = {formatCurrency(calculateFare(city, 10).total)}.</p><p><strong>20 kilometre:</strong> {formatCurrency(city.openingFare)} + (20 × {formatCurrency(city.perKmFare)}) = {formatCurrency(calculateFare(city, 20).total)}.</p></section>

      <section id="indi-bindi"><h2>Konya indi-bindi ücreti nasıl uygulanır?</h2><p>Konya’da 2026 kısa mesafe veya indi-bindi ücreti {formatCurrency(city.minimumFare)}’dir. Açılış ve kilometre üzerinden hesaplanan ücret bu tutarın altında kalırsa yolcu minimum ücreti öder.</p><p>Örneğin 2 kilometrelik yolculuk için normal hesap {formatCurrency(city.openingFare)} + (2 × {formatCurrency(city.perKmFare)}) = {formatCurrency(city.openingFare + 2 * city.perKmFare)} olur. Bu tutar minimumun altında olduğu için ödenecek yaklaşık bedel {formatCurrency(city.minimumFare)}’dir. Yaklaşık 3 kilometrede hesap {formatCurrency(calculateFare(city, 3).total)}’ye ulaştığından doğrudan taksimetre tutarı esas alınır.</p></section>

      <section id="etkileyenler"><h2>Konya’da taksi fiyatını değiştiren durumlar</h2><h3>Kullanılan güzergâh</h3><p>Sürücünün tercih ettiği yol, yol çalışmaları veya kapalı caddeler toplam mesafeyi artırabilir. Daha uzun rota doğrudan daha yüksek taksimetre tutarı anlamına gelir.</p><h3>Trafik ve duraklamalar</h3><p>Kavşaklar, yoğun trafik ve uzun beklemeler yolculuk süresini uzatabilir. Güncel Konya kaynaklarında net bir zaman tarifesi doğrulanamadığı için hesaplamaya rastgele bekleme bedeli eklenmez.</p><h3>Başlangıç noktası ve ek giderler</h3><p>“Konya merkez” veya “Selçuklu” gibi geniş bölgelerde birkaç kilometrelik konum farkı oluşabilir. Ücretli yol, otopark veya benzeri zorunlu giderler de taksimetre bedelinden ayrı değerlendirilebilir.</p><p>Minimum ücretin işleyişini <Link href="/indi-bindi-ucreti-nedir/">indi-bindi rehberinde</Link>, genel yöntemi ise <Link href="/taksi-ucreti-nasil-hesaplanir/">taksi ücreti hesaplama açıklamasında</Link> inceleyin.</p></section>

      <section id="havalimani"><h2>Konya Havalimanı yolculuklarında nelere dikkat edilmeli?</h2><p>Konya Havalimanı ile şehir merkezi arasındaki ücret, yolcunun alınacağı veya bırakılacağı mahalleye göre önemli ölçüde değişebilir. Selçuklu, Karatay ve Meram’ın farklı noktaları aynı mesafeye sahip değildir.</p><p>“Şehir merkezi” ifadesine güvenmek yerine gerçek konumla rota mesafesini kontrol edin. Bagaj miktarı normal şartlarda kilometre tarifesini değiştirmez; bekleme veya ek duraklar toplam ücreti artırabilir.</p></section>

      <section className="source-box" id="kaynak"><h2>Tarife kaynağı ve kontrol</h2><p><strong>Yürürlük:</strong> 4 Mayıs 2026 · <strong>Son kontrol:</strong> 26 Temmuz 2026</p><p>{formatCurrency(city.openingFare)} açılış, {formatCurrency(city.perKmFare)} kilometre ve {formatCurrency(city.minimumFare)} minimum değerleri; <a href={city.sourceUrl} rel="external">Konya taksi tarifesi duyurusunu aktaran Merhaba Haber</a>, <a href="https://haberdairesi.com/konya/konyada-taksi-ucretleri-de-zamlandi-yeni-tarife-bu-tarihte-basliyor-186230h" rel="external">Haber Dairesi</a> ve <a href="https://www.konyataksihizmeti.com/guncel-konya-taksi-ucreti-2026/" rel="external">Konya Taksi Hizmeti</a> ile karşılaştırılarak kullanılmıştır.</p><p><Link href="/">Ana sayfadaki taksi ücreti hesaplama aracına</Link> dönebilir veya <Link href="/sehirler/">diğer şehir tarifelerini</Link> karşılaştırabilirsiniz.</p></section>

      <section><h2>Sonuç</h2><p>Konya taksi ücreti 2026 tarifesinde açılış {formatCurrency(city.openingFare)}, kilometre ücreti {formatCurrency(city.perKmFare)} ve indi-bindi bedeli {formatCurrency(city.minimumFare)}’dir. Beş kilometrelik yolculuk yaklaşık {formatCurrency(calculateFare(city, 5).total)}, 10 kilometrelik yolculuk ise yaklaşık {formatCurrency(calculateFare(city, 10).total)} tutar. Kesin ödeme, yolculuk sonunda taksimetrede görülen tutar üzerinden belirlenir.</p></section>
    </ArticlePage>
  );
}
