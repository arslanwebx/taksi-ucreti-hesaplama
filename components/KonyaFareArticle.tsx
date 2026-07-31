import Link from 'next/link';
import { ArticlePage } from './ArticlePage';
import { Calculator } from './Calculator';
import { CalculatorWithAds } from './CalculatorWithAds';
import { TableOfContents } from './TableOfContents';
import { taxiFareBySlug } from '@/src/data/taxi-fares';
import { calculateFare, formatCurrency } from '@/lib/taxi-calculator';
import { canonical, site } from '@/src/data/site';

const city = taxiFareBySlug.konya!;
const path = '/konya-taksi-ucreti/';
const seoTitle = 'Konya Taksi Ücreti Hesaplama 2026';
const h1 = 'Konya Taksi Ücreti Hesaplama 2026';
const description = 'Konya taksi ücreti hesaplama aracıyla mesafeye göre tahmini fiyatı öğrenin. 2026 açılış, kilometre ve indi-bindi tarifesini inceleyin.';
const exampleDistances = [1, 2, 3, 4, 5, 7, 10, 15, 20, 25, 30, 40, 50] as const;

const faqs = [
  { question: 'Konya taksi açılış ücreti ne kadar?', answer: 'Konya’da 2026 taksimetre açılış ücreti 55 TL’dir. Bu tutarın üzerine kilometre başına 50 TL eklenir.' },
  { question: 'Konya’da taksi kilometre ücreti kaç TL?', answer: 'Güncel tarifede kilometre başına ücret 50 TL’dir. Her 100 metre yaklaşık 5 TL’ye karşılık gelir.' },
  { question: 'Konya indi-bindi ücreti ne kadar?', answer: 'Kısa mesafelerde uygulanan minimum ücret 200 TL’dir. Normal hesaplama bunun altında kalırsa 200 TL ödenir.' },
  { question: 'Konya’da 5 kilometre taksi ücreti ne kadar?', answer: 'Açılış ve kilometre tarifesine göre 5 kilometrelik beklemesiz yolculuk yaklaşık 305 TL’dir.' },
  { question: 'Konya’da 10 kilometre taksi ücreti ne kadar?', answer: '10 kilometre için temel hesaplama 55 + 500 TL’dir ve yaklaşık toplam 555 TL olur.' },
  { question: 'İndi-bindi ücretine açılış ayrıca eklenir mi?', answer: 'Hayır. İndi-bindi, kısa yolculuklar için belirlenen minimum ödeme sınırıdır; ayrıca eklenen ikinci bir ücret değildir.' },
  { question: 'Konya’da gece taksiler daha pahalı mı?', answer: 'İncelenen güncel tarife duyurularında gece için ayrı bir genel zam oranı belirtilmemiştir.' },
  { question: 'Hesaplama sonucu neden taksimetreden farklı çıkabilir?', answer: 'Gerçek rota, trafik, bekleme, ek duraklar ve ücretli geçişler taksimetrede farklı bir sonuç oluşturabilir.' },
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
        { id: 'hesaplama', label: 'Konya taksi ücreti hesaplama' }, { id: 'tarife', label: 'Açılış, kilometre ve indi-bindi' }, { id: 'mesafe-ornekleri', label: 'Mesafeye göre Konya taksi fiyatları' }, { id: 'indi-bindi', label: 'Minimum ücret nasıl uygulanır?' }, { id: 'etkileyenler', label: 'Ücreti değiştiren unsurlar' }, { id: 'havalimani', label: 'Konya Havalimanı taksi ücreti' }, { id: 'daha-dogru-tahmin', label: 'Daha doğru tahmin için' }, { id: 'kaynak', label: 'Tarife kaynağı' }, { id: 'sik-sorulan-sorular', label: 'Sık sorulan sorular' },
      ]} />

      <section id="hesaplama"><h2>Konya taksi ücreti hesaplama</h2><p>Mesafenizi girerek yaklaşık yolculuk bedelini görün. Hesap yalnızca Konya için kayıtlı sarı taksi tarifesini kullanır; son ödeme taksimetre, gerçek güzergâh, trafik ve varsa ek geçiş ücretlerine göre değişebilir.</p><CalculatorWithAds><Calculator fixedCity="konya" /></CalculatorWithAds></section>

      <section id="tarife"><h2>Konya taksi tarifesi: açılış, kilometre ve indi-bindi</h2><p>Konya’da 4 Mayıs 2026 tarihinde yürürlüğe giren yeni tarifeye ilişkin yerel tarife duyurusunda açılış ücretinin {formatCurrency(city.openingFare)}’ye, kilometre ücretinin {formatCurrency(city.perKmFare)}’ye ve kısa mesafe ücretinin {formatCurrency(city.minimumFare)}’ye yükseldiği belirtiliyor. Aynı değerler Konya’da hizmet veren yerel taksi sitesinin güncel tarife sayfasında da yayımlanıyor.</p><div className="table-wrap"><table><caption>4 Mayıs 2026 itibarıyla Konya sarı taksi tarife kalemleri</caption><thead><tr><th scope="col">Tarife kalemi</th><th scope="col">2026 ücreti</th></tr></thead><tbody><tr><th scope="row">Taksimetre açılışı</th><td>{formatCurrency(city.openingFare)}</td></tr><tr><th scope="row">Kilometre başına ücret</th><td>{formatCurrency(city.perKmFare)}</td></tr><tr><th scope="row">Her 100 metre</th><td>{formatCurrency(city.perKmFare / 10)}</td></tr><tr><th scope="row">İndi-bindi / minimum ücret</th><td>{formatCurrency(city.minimumFare)}</td></tr><tr><th scope="row">Yürürlük tarihi</th><td>4 Mayıs 2026</td></tr></tbody></table></div><p><strong>İndi-bindi ücreti ayrı bir ek ücret değildir.</strong> Açılış ve mesafe üzerinden hesaplanan taksimetre tutarı {formatCurrency(city.minimumFare)}’nin altında kalırsa minimum {formatCurrency(city.minimumFare)} tahsil edilir. Tutar bu sınırı geçtiğinde taksimetrede görülen miktar esas alınır.</p><p>Temel hesap: <strong>{formatCurrency(city.openingFare)} + (gidilen kilometre × {formatCurrency(city.perKmFare)})</strong>. Sonuç {formatCurrency(city.minimumFare)}’den düşükse minimum indi-bindi ücreti uygulanır.</p></section>

      <section id="mesafe-ornekleri"><h2>Mesafeye göre Konya taksi fiyatları</h2><p>Aşağıdaki tutarlar yalnızca açılış ve kilometre tarifesine göre hazırlanmıştır. Trafik beklemesi, güzergâh değişikliği, ek duraklar ve ücretli geçişler dahil değildir.</p><div className="table-wrap"><table><caption>Mesafeye göre Konya sarı taksi tahminleri</caption><thead><tr><th scope="col">Mesafe</th><th scope="col">Tahmini ücret</th></tr></thead><tbody>{exampleDistances.map((km) => <tr key={km}><th scope="row">{km} km</th><td>{formatCurrency(calculateFare(city, km).total)}</td></tr>)}</tbody></table></div><p>Bu tablo sabit fiyat garantisi değildir. Taksimetre, harita uygulamasındaki teorik mesafe yerine aracın gerçekten katettiği mesafeyi esas alır.</p><h3>5, 10 ve 20 km için pratik hesaplamalar</h3><p><strong>5 kilometre:</strong> {formatCurrency(city.openingFare)} + (5 × {formatCurrency(city.perKmFare)}) = {formatCurrency(calculateFare(city, 5).total)}. Bekleme ve ek ücret yoksa yaklaşık bu tutar ödenir.</p><p><strong>10 kilometre:</strong> {formatCurrency(city.openingFare)} + (10 × {formatCurrency(city.perKmFare)}) = {formatCurrency(calculateFare(city, 10).total)}. Normal rota varsayımıyla yaklaşık bu tutar oluşur.</p><p><strong>20 kilometre:</strong> {formatCurrency(city.openingFare)} + (20 × {formatCurrency(city.perKmFare)}) = {formatCurrency(calculateFare(city, 20).total)}. Trafik ve ek geçiş hariç yaklaşık sonuç budur.</p></section>

      <section id="indi-bindi"><h2>Konya indi-bindi ücreti nasıl uygulanır?</h2><p>Konya’da 2026 kısa mesafe veya indi-bindi ücreti {formatCurrency(city.minimumFare)}’dir. Açılış ve kilometre üzerinden hesaplanan ücret bu tutarın altında kalırsa yolcu minimum ücreti öder.</p><h3>Kısa mesafede minimum ücret örneği</h3><p>2 kilometrelik yolculuğun normal hesaplaması {formatCurrency(city.openingFare)} + (2 × {formatCurrency(city.perKmFare)}) = {formatCurrency(city.openingFare + 2 * city.perKmFare)} olur. Bu tutar {formatCurrency(city.minimumFare)}’nin altında kaldığı için yaklaşık ödeme {formatCurrency(city.minimumFare)}’dir.</p><h3>Minimum sınırı geçen örnek</h3><p>6 kilometrede hesaplama {formatCurrency(city.openingFare)} + (6 × {formatCurrency(city.perKmFare)}) = {formatCurrency(calculateFare(city, 6).total)} sonucunu verir. Tutar minimum sınırı geçtiği için doğrudan taksimetre tutarı esas alınır.</p></section>

      <section id="etkileyenler"><h2>Konya’da taksi ücretini değiştiren unsurlar</h2><h3>Gerçek güzergâh</h3><p>Yol çalışması, kapalı cadde veya sürücünün seçtiği alternatif rota mesafeyi uzatabilir. Haritada görülen en kısa yol ile gerçek yolculuk her zaman aynı olmayabilir.</p><h3>Trafik ve bekleme</h3><p>Kırmızı ışıklar, yoğun kavşaklar ve sıkışık trafik yolculuk süresini artırabilir. İncelenen güncel tarife duyurularında net bir dakika bazlı bekleme değeri yayımlanmadığı için bu makalede doğrulanmamış bir bekleme bedeli kullanılmaz.</p><h3>Başlangıç ve varış noktasının kesinliği</h3><p>“Konya merkez” veya “Selçuklu” gibi geniş bölgeler birkaç kilometrelik fark yaratabilir. Daha gerçekçi hesaplama için mahalle, cadde veya tam konum üzerinden rota mesafesini kontrol edin.</p><h3>Ek duraklar ve ücretli geçişler</h3><p>Yolculuk sırasında ek durak verilmesi veya ücretli bir güzergâh kullanılması toplam bedeli artırabilir. Uzun yolculuklarda sürücüyle tahmini rotayı önceden konuşmak faydalıdır.</p><p>Minimum ücretin işleyişini <Link href="/indi-bindi-ucreti-nedir/">indi-bindi rehberinde</Link>, genel yöntemi ise <Link href="/taksi-ucreti-nasil-hesaplanir/">taksi ücreti hesaplama açıklamasında</Link> inceleyin.</p></section>

      <section id="havalimani"><h2>Konya Havalimanı taksi ücreti nasıl tahmin edilir?</h2><p>Konya Havalimanı ile şehir arasındaki ücret, “merkez” için tek bir sabit rakamla açıklanamaz. Selçuklu, Karatay ve Meram’ın farklı noktaları aynı mesafede olmadığı için başlangıç veya varış adresi belirleyicidir.</p><p>Önce harita üzerinden gerçek rota mesafesini bulun, ardından kilometreyi güncel tarifeyle hesaplayın. Bagaj normal koşullarda kilometre tarifesini değiştirmez; ancak uzun bekleme veya ek duraklar toplamı yükseltebilir.</p></section>

      <section id="daha-dogru-tahmin"><h2>Daha doğru tahmin için 4 küçük kontrol</h2><ul><li>Rota mesafesini tam başlangıç ve varış adresiyle kontrol edin.</li><li>Yolculuğun {formatCurrency(city.minimumFare)} minimum ücret sınırında olup olmadığına bakın.</li><li>Uzun rotalarda sürücüyle kullanılacak yolu önceden konuşun.</li><li>Taksimetrenin yolculuk başında açıldığını kontrol edin.</li></ul></section>

      <section className="source-box" id="kaynak"><h2>Tarife kaynağı ve kontrol</h2><p><strong>Yürürlük:</strong> 4 Mayıs 2026 · <strong>Son kontrol:</strong> 26 Temmuz 2026</p><p>{formatCurrency(city.openingFare)} açılış, {formatCurrency(city.perKmFare)} kilometre ve {formatCurrency(city.minimumFare)} minimum değerleri; <a href={city.sourceUrl} rel="external">Konya taksi tarifesi duyurusunu aktaran Merhaba Haber</a>, <a href="https://haberdairesi.com/konya/konyada-taksi-ucretleri-de-zamlandi-yeni-tarife-bu-tarihte-basliyor-186230h" rel="external">Haber Dairesi</a> ve <a href="https://www.konyataksihizmeti.com/guncel-konya-taksi-ucreti-2026/" rel="external">Konya Taksi Hizmeti</a> ile karşılaştırılarak kullanılmıştır.</p><p><Link href="/">Ana sayfadaki taksi ücreti hesaplama aracına</Link> dönebilir veya <Link href="/sehirler/">diğer şehir tarifelerini</Link> karşılaştırabilirsiniz.</p></section>

      <section><h2>Sonuç</h2><p>Konya taksi ücreti 2026 tarifesinde açılış {formatCurrency(city.openingFare)}, kilometre ücreti {formatCurrency(city.perKmFare)} ve indi-bindi bedeli {formatCurrency(city.minimumFare)}’dir. Beş kilometrelik yolculuk yaklaşık {formatCurrency(calculateFare(city, 5).total)}, 10 kilometrelik yolculuk ise yaklaşık {formatCurrency(calculateFare(city, 10).total)} tutar.</p><p>Yolculuk öncesinde <Link href="/#hesaplayici">ana hesaplama aracını kullanmak</Link> bütçe planlamasını kolaylaştırır. Kesin ödeme her zaman yolculuk sonunda taksimetrede görülen tutar üzerinden belirlenir.</p></section>
    </ArticlePage>
  );
}
