import Link from 'next/link';
import { ArticlePage } from './ArticlePage';
import { Calculator } from './Calculator';
import { LoadCalculatorDistanceButton } from './LoadCalculatorDistanceButton';
import { TableOfContents } from './TableOfContents';
import { calculateFare } from '@/lib/taxi-calculator';
import { formatDate, money, publishedCities } from '@/src/data/cities';
import { istanbulRoutes } from '@/src/data/istanbul-routes';
import { canonical, site } from '@/src/data/site';

const city = publishedCities.find((item) => item.slug === 'istanbul')!;
export const istanbulPageTitle = 'İstanbul Taksi Ücreti Hesaplama 2026';
export const istanbulPageDescription = 'İstanbul taksi ücretini 2026 güncel tarifesiyle hesaplayın. Sarı taksi açılış, kilometre, indi-bindi ücretini ve popüler rota tahminlerini görün.';
export const istanbulMetaDescription = "İstanbul'da sarı, turkuaz ve VIP taksi tarifesi farklıdır. 2026 güncel İBB tarifesiyle açılış, km ve zaman ücretini hesaplayın — köprü/tünel geçişi hariç.";

const taksimKadikoy = istanbulRoutes.find((route) => route.name === 'Taksim – Kadıköy')!;
const faqs = [
  { question: 'İstanbul taksi kilometre ücreti ne kadar?', answer: '16 Şubat 2026’dan itibaren geçerli İBB tarifesinde sarı taksi kilometre ücreti 43,56 TL’dir.' },
  { question: 'İstanbul indi-bindi ücreti ne kadar?', answer: 'Sarı takside minimum yolculuk, yaygın adıyla indi-bindi ücreti 230 TL’dir. Hesaplanan tutar bunun altında kalırsa 230 TL uygulanır; ayrıca eklenmez.' },
  { question: 'İstanbul taksilerinde gece tarifesi var mı?', answer: 'İBB tarifesinde ayrı bir gece tarifesi yer almaz. Aynı sarı taksi tarifesi uygulanır; rota ve düşük hızda geçen süre toplamı değiştirebilir.' },
  { question: 'İstanbul taksisinde bekleme süresi nasıl hesaplanır?', answer: 'Resmî tarifede sarı taksi zaman ücreti 544,45 TL/saat ve dönüşüm hızı 12,50 km/saattir. Taksimetre düşük hızda mesafe ve zaman ölçümü arasında dönüşüm uygular; bu nedenle hesaplayıcı mesafe ücretinin üzerine tüm bekleme dakikalarını ayrıca eklemez.' },
  { question: 'Köprü ve tünel ücretleri taksi fiyatına dahil mi?', answer: 'Hayır. Kullanılan köprü, Avrasya Tüneli veya ücretli otoyol bedeli taksimetre tahmininden ayrı olarak yolcuya eklenebilir.' },
  { question: 'İstanbul taksilerinde kredi kartı geçer mi?', answer: 'Birçok araç kart kabul eder ancak cihaz veya bağlantı durumu değişebilir. Kartla ödemeyi yolculuk başlamadan önce teyit etmek uygundur.' },
  { question: 'Taksi bagaj için ayrı ücret alır mı?', answer: 'Standart yolcu bagajı için İBB tarifesinde ayrı bir bagaj kalemi bulunmaz. Araç kapasitesini aşan eşya için uygun aracı önceden teyit edin.' },
  { question: 'Sarı ve turkuaz taksi arasındaki fark nedir?', answer: 'Bu sayfa yalnızca standart ve en yaygın seçenek olan sarı taksinin doğrulanmış tarifesini hesaplar. Diğer araç kategorileri sarı taksi fiyatından oranlanmaz ve burada fiyatlandırılmaz.' },
  { question: 'İstanbul taksi hesaplayıcısı kesin sonuç verir mi?', answer: 'Hayır. Sonuç yaklaşık planlama değeridir. Gerçek adres, yol seçimi, trafik, düşük hızda geçen süre ve ücretli geçişler taksimetre tutarını değiştirebilir.' },
  { question: 'Taksim ile Kadıköy taksi ücreti ne kadar?', answer: `Yaklaşık ${taksimKadikoy.distanceKm} km için sarı taksi tahmini ${money(calculateFare(city, taksimKadikoy.distanceKm).total)} tutar. Köprü veya tünel bedeli ile trafik etkisi bu tahmine dahil değildir.` },
  { question: 'İstanbul taksi hesaplama nasıl yapılır?', answer: 'Temel hesap, 71,94 TL açılış ücretine gidilen mesafenin 47,92 TL/km ile çarpımının eklenmesi ve sonucun 230 TL indi-bindi tabanıyla karşılaştırılmasıdır. Mesafeyi sayfadaki hesaplayıcıya girip “Hesapla” düğmesine tıklayarak tahmini sonucu anında görebilirsiniz.' },
];

export function IstanbulFareArticle() {
  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'İstanbul Sarı Taksi Ücreti Hesaplayıcı',
    url: canonical('/istanbul-taksi-ucreti/'),
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Web',
    inLanguage: 'tr-TR',
    description: 'İstanbul sarı taksi tarifesiyle yol mesafesi ve bilinen ek geçiş bedellerine göre tahmini ücret hesaplar.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
    publisher: { '@type': 'Organization', name: site.publisher, url: site.url },
  };
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'İstanbul taksi ücreti nasıl hesaplanır?',
    description: 'İstanbul sarı taksi tarifesiyle mesafe ve bilinen ücretli geçişlere göre tahmini ücret hesaplama adımları.',
    step: [
      { '@type': 'HowToStep', position: 1, name: 'Açılış ücretini not edin', text: 'Açılış ücretini 71,94 TL olarak not edin.' },
      { '@type': 'HowToStep', position: 2, name: 'Mesafeyi girin', text: 'Gidilen mesafeyi kilometre olarak girin.' },
      { '@type': 'HowToStep', position: 3, name: 'Mesafe bedelini hesaplayın', text: 'Mesafeyi 47,92 TL/km kilometre ücretiyle çarpın.' },
      { '@type': 'HowToStep', position: 4, name: 'Minimum ücretle karşılaştırın', text: 'Sonucu 230 TL indi-bindi tabanıyla karşılaştırın ve yüksek olan tutarı kullanın.' },
      { '@type': 'HowToStep', position: 5, name: 'Bilinen geçiş ücretlerini ekleyin', text: 'Bilinen köprü, tünel veya otoyol geçiş ücretlerini varsa ayrıca ekleyin.' },
    ],
  };

  return (
    <ArticlePage title={istanbulPageTitle} description={istanbulPageDescription} path="/istanbul-taksi-ucreti/" published="2026-07-16" modified={city.lastVerified} category="Şehirler" readingMinutes={9} faqs={faqs} additionalSchemas={[webApplicationSchema, howToSchema]} featuredImageAlt="İstanbul taksi ücreti hesaplama 2026 - güncel sarı taksi tarifesi">
      <p className="notice"><strong>Kısa cevap:</strong> İstanbul’da sarı taksi ücreti açılış, taksimetrenin ölçtüğü yol ve düşük hızda geçen süreye göre oluşur. Kısa yolculuklarda minimum ücret uygulanır; ücretli geçişler ayrıca eklenebilir.</p>

      <section className="fare-answer-box" aria-label="İstanbul 2026 sarı taksi tarifesi özeti">
        <strong>İstanbul sarı taksi tarifesi</strong>
        <dl>
          <div><dt>Açılış ücreti</dt><dd>{money(city.openingFare)}</dd></div>
          <div><dt>Kilometre ücreti</dt><dd>{money(city.perKmFare)}</dd></div>
          <div><dt>Minimum / indi-bindi</dt><dd>{money(city.minimumFare)}</dd></div>
          <div><dt>Zaman tarifesi</dt><dd>9,07 TL/dk</dd></div>
          <div><dt>Geçerlilik tarihi</dt><dd>16 Şubat 2026</dd></div>
        </dl>
        <p>Köprü, Avrasya Tüneli ve ücretli otoyol bedelleri ayrıca eklenebilir.</p>
      </section>

      <TableOfContents items={[
        { id: 'hesaplama', label: 'İstanbul taksi ücreti hesaplama' },
        { id: 'tarife', label: '2026 İstanbul sarı taksi tarifesi' },
        { id: 'rotalar', label: 'Popüler İstanbul rota tahminleri' },
        { id: 'zaman-tarifesi', label: 'Trafik ve zaman tarifesi' },
        { id: 'havalimani', label: 'İstanbul Havalimanı yolculukları' },
        { id: 'kaynak', label: 'Resmî kaynak ve doğrulama' },
        { id: 'sik-sorulan-sorular', label: 'Sık sorulan sorular' },
      ]}/>

      <section id="hesaplama">
        <h2>İstanbul taksi ücreti hesaplama</h2>
        <p>İstanbul seçili gelir. Haritadaki araç mesafesini yazın veya popüler bir rotayı seçerek yaklaşık kilometreyi yükleyin; mesafe alanını daha sonra elle değiştirebilirsiniz.</p>
        <Calculator fixedCity="istanbul" distancePresets={istanbulRoutes} allowWaitingInput={false}/>
        <p>Sonuç yalnızca doğrulanmış sarı taksi tarifesiyle hesaplanır. Gerçek taksimetre tutarı düşük hızda geçen süreyi kendi dönüşüm kuralıyla işler; ücretli geçiş tutarını biliyorsanız ek yol ücreti alanına yazabilirsiniz.</p>
      </section>

      <section id="tarife">
        <h2>2026 İstanbul sarı taksi tarifesi</h2>
        <div className="table-wrap"><table><caption>16 Şubat 2026’dan itibaren geçerli İBB sarı taksi tarifesi</caption><thead><tr><th scope="col">Tarife kalemi</th><th scope="col">Tutar</th><th scope="col">Uygulama</th></tr></thead><tbody>
          <tr><th scope="row">Açılış</th><td>{money(city.openingFare)}</td><td>Yolculuk başında</td></tr>
          <tr><th scope="row">Mesafe</th><td>{money(city.perKmFare)}/km</td><td>Taksimetrenin ölçtüğü yol için</td></tr>
          <tr><th scope="row">Minimum / indi-bindi</th><td>{money(city.minimumFare)}</td><td>Yolculuk başına alt sınır</td></tr>
          <tr><th scope="row">Zaman</th><td>544,45 TL/saat</td><td>9,07 TL/dk; dönüşüm hızı 12,50 km/saat</td></tr>
        </tbody></table></div>
        <p>İBB belgesinde ayrı gündüz ve gece tarifesi bulunmaz. Bu sayfa önceki talebiniz doğrultusunda yalnızca sarı taksiyi fiyatlandırır; farklı araç kategorilerinin ücretlerini sarı taksi üzerinden türetmez.</p>
      </section>

      <section id="rotalar">
        <h2>Popüler İstanbul rota tahminleri</h2>
        <div className="table-wrap"><table><caption>Bekleme etkisi ve ücretli geçişler hariç yaklaşık sarı taksi tutarları</caption><thead><tr><th scope="col">Rota</th><th scope="col">Yaklaşık yol</th><th scope="col">Sarı taksi tahmini</th><th scope="col">Geçiş notu</th><th scope="col">İşlem</th></tr></thead><tbody>{istanbulRoutes.map((route) => <tr key={route.name}><th scope="row">{route.name}</th><td>{route.distanceKm} km</td><td>{money(calculateFare(city, route.distanceKm).total)}</td><td>{route.paidCrossingNote}</td><td><LoadCalculatorDistanceButton distanceKm={route.distanceKm}/></td></tr>)}</tbody></table></div>
        <p>Tüm tutarlar tahmindir. Başlangıç adresi, bina veya terminal girişi, yol seçimi, trafik, duraklamalar ve ücretli geçişler gerçek taksimetre tutarını değiştirebilir.</p>
      </section>

      <section id="zaman-tarifesi">
        <h2>Trafik ve zaman tarifesi nasıl etkiler?</h2>
        <p>Resmî tarifede sarı taksi zaman bedeli 544,45 TL/saat, bir dakikalık ölçüm bedeli 9,07 TL ve dönüşüm hızı 12,50 km/saattir. Taksimetre düşük hızda zaman esasına geçebildiği için mesafe ücretine bütün bekleme dakikalarını ayrıca eklemek çifte hesap oluşturabilir. Bu nedenle İstanbul hesaplayıcısında yanıltıcı bir bekleme alanı gösterilmez.</p>
        <p>Köprü, Avrasya Tüneli ve ücretli otoyol bedelleri bu temel tahminden ayrıdır. Rotayı yolculuk başlamadan önce sürücüyle netleştirin.</p>
      </section>

      <section id="havalimani">
        <h2>İstanbul Havalimanı taksi yolculukları</h2>
        <p>Bu sayfa şehir içi genel tarife ve rotalara odaklanır. Terminal çıkışı, Taksim ve ilçe bağlantıları için ayrı hazırlanan <Link href="/istanbul-havalimani-taksi-ucreti/">İstanbul Havalimanı taksi ücreti rehberini</Link> kullanın.</p>
      </section>

      <section className="source-box" id="kaynak">
        <h2>Resmî tarife kaynağı</h2>
        <p><strong>Geçerlilik:</strong> 16 Şubat 2026 · <strong>Son kontrol:</strong> <time dateTime={city.lastVerified}>{formatDate(city.lastVerified)}</time></p>
        <p>Rakamlar, 12 Şubat 2026 tarihli 263 sayılı İBB Meclis Kararına dayanan <a href={city.sourceUrl} rel="external">İBB/TUHİM Taksi Taşımacılığı Ücret Tarifesinden</a> alınmıştır. Güncel belgeler <a href="https://tuhim.ibb.gov.tr/ucret-tarifeler/" rel="external">TUHİM tarife arşivinden</a> kontrol edilebilir.</p>
        <p>Bazı sitelerde hâlâ 16 Şubat 2026 öncesine ait 65,40 TL / 43,56 TL gibi eski rakamlar yer alabiliyor; bu sayfadaki 71,94 TL / 47,92 TL değerleri 12 Şubat 2026 tarihli 263 sayılı İBB Meclis Kararı sonrası güncel tarifeyi yansıtır.</p>
        <p><Link href="/">Türkiye geneli hesaplayıcıya</Link>, <Link href="/sehirler/">şehir hesaplayıcıları merkezine</Link>, <Link href="/indi-bindi-ucreti-nedir/">minimum ücret rehberine</Link> veya <Link href="/taksi-ucreti-nasil-hesaplanir/">hesaplama yöntemi rehberine</Link> geçebilirsiniz.</p>
      </section>
    </ArticlePage>
  );
}
