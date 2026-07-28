import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticlePage } from '@/components/ArticlePage';
import { Calculator } from '@/components/Calculator';
import { TableOfContents } from '@/components/TableOfContents';
import { calculateFare } from '@/lib/taxi-calculator';
import { formatDate, money, publishedCities } from '@/src/data/cities';
import { canonical, site } from '@/src/data/site';
import { sabihaGokcenQuickRouteNames, sabihaGokcenRoutes } from '@/src/data/sabiha-gokcen-routes';
import { pageMetadata } from '@/lib/seo';

const city = publishedCities.find((item) => item.slug === 'istanbul')!;
const path = '/sabiha-gokcen-taksi-ucreti/';
const title = 'Sabiha Gökçen Taksi Ücreti – Hesaplama Aracı (2026)';
const h1 = 'Sabiha Gökçen Taksi Ücreti Hesaplama (2026)';
const description = 'Sabiha Gökçen Havalimanı’ndan Kadıköy, Taksim, Üsküdar ve diğer ilçelere 2026 taksi ücretini hesaplayın. Güncel İBB tarifesi ve rota tablosu.';
const modified = '2026-07-27';
const quickRoutes = sabihaGokcenRoutes.filter((route) =>
  (sabihaGokcenQuickRouteNames as readonly string[]).includes(route.name),
);
const estimate = (distanceKm: number) => calculateFare(city, distanceKm).total;
const faqs = [
  { question: 'Sabiha Gökçen ile Taksim arası taksi kaç TL tutar?', answer: `Yaklaşık 42 km için sarı taksi tahmini ${money(estimate(42))} tutar. Bekleme ve ücretli yollar dahil değildir; gerçek taksimetre tutarı seçilen rotaya göre değişir.` },
  { question: 'Sabiha Gökçen ile Kadıköy arası taksi kaç TL tutar?', answer: `Yaklaşık 35 km için sarı taksi tahmini ${money(estimate(35))} tutar. Bu bir planlama değeridir; trafik ve bekleme süresi gerçek tutarı değiştirebilir.` },
  { question: 'Sabiha Gökçen taksi fiyatları sabit midir?', answer: 'Hayır. Resmî taksiler taksimetre kullanır. Toplam; açılış ücreti, gidilen mesafe, zaman tarifesi ve varsa ücretli geçişlerden oluşur.' },
  { question: 'Sabiha Gökçen’de gece tarifesi var mı?', answer: 'İBB tarifesinde ayrı bir gece tarifesi yer almaz; aynı sarı taksi tarifesi günün her saatinde geçerlidir.' },
  { question: 'Sabiha Gökçen ile İstanbul Havalimanı arası taksiyle gidilebilir mi?', answer: `Evet. Yaklaşık 80 km için sarı taksi tahmini ${money(estimate(80))} seviyesindedir. Köprü, tünel ve otoyol bedelleri bu tahmine dahil değildir.` },
  { question: 'Havalimanı taksilerinde kredi kartı geçer mi?', answer: 'Birçok araç kart kabul eder; ancak cihaz veya bağlantı sorunu yaşanabilir. Binmeden önce kartla ödeme yapacağınızı doğrulamanız uygundur.' },
  { question: 'Bagaj için ayrı ücret alınır mı?', answer: 'Standart yolcu bagajı için tarifede ayrı bir bagaj kalemi bulunmaz. Araç kapasitesini aşan eşya için binmeden önce uygun aracı teyit edin.' },
  { question: 'Köprü, tünel ve otoyol ücretleri tahmine dahil mi?', answer: 'Hayır. Tablodaki tutarlar taksimetre tahminidir. Kullanılan köprü, tünel veya otoyol bedeli yolcu tarafından ayrıca ödenir.' },
  { question: 'Sabiha Gökçen’de resmî taksi durağı nasıl bulunur?', answer: 'Terminal çıkışındaki resmî taksi yönlendirmelerini izleyip sıradaki araca binin. Plakayı not edin ve taksimetrenin yolculuk başında açıldığını kontrol edin.' },
  { question: 'Sabiha Gökçen taksi ücretine TEM otoyolu ücreti dahil mi?', answer: 'Standart TEM kullanımı genellikle ek ücretli geçiş gerektirmez. Ancak sürücünün tercih ettiği bağlantı yoluna göre durum değişebilir; köprü veya Avrasya Tüneli kullanılırsa bu bedel ayrıca eklenir.' },
];

export const metadata: Metadata = pageMetadata(title, description, path, 'article');

export default function SabihaGokcenTaxiFarePage() {
  const webApplicationSchema = {
    '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Sabiha Gökçen Taksi Ücreti Hesaplayıcı', url: canonical(path),
    applicationCategory: 'TravelApplication', operatingSystem: 'Web', inLanguage: 'tr-TR', description,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' }, publisher: { '@type': 'Organization', name: site.publisher, url: site.url },
  };

  return <ArticlePage title={title} heading={h1} description={description} path={path} modified={modified} category="Havalimanı Taksi Ücretleri" readingMinutes={9} faqs={faqs} additionalSchemas={[webApplicationSchema]}>
    <p className="notice"><strong>Kısa cevap:</strong> Sabiha Gökçen’de sabit taksi fiyatı yoktur. Son tutarı taksimetre; gidilen yol mesafesi, trafikte geçen süre ve varsa köprü, tünel veya otoyol bedellerine göre belirler. Bu sayfadaki hesaplamalar İstanbul’da geçerli resmî sarı taksi tarifesini kullanır.</p>

    <section className="quick-fare-summary" aria-labelledby="hizli-fiyat-ozeti">
      <h2 id="hizli-fiyat-ozeti">Hızlı fiyat özeti</h2>
      <div className="table-wrap"><table><caption>Sabiha Gökçen’den popüler noktalara sarı taksi tahminleri</caption><thead><tr><th scope="col">Varış</th><th scope="col">Yaklaşık mesafe</th><th scope="col">Sarı taksi tahmini</th></tr></thead><tbody>{quickRoutes.map((route) => <tr key={route.name}><th scope="row">{route.name}</th><td>{route.distanceKm} km</td><td>{money(estimate(route.distanceKm))}</td></tr>)}</tbody></table></div>
      <p><strong>Ücretli geçişler hariçtir.</strong> Mesafeler planlama amaçlı yaklaşık yol mesafeleridir; gerçek rota ve taksimetre tutarı değişebilir.</p>
    </section>

    <TableOfContents items={[
      { id: 'hesaplama', label: 'Sabiha Gökçen taksi ücreti hesaplama' }, { id: 'rotalar', label: 'Popüler rota fiyatları' },
      { id: 'tarife', label: '2026 İstanbul sarı taksi tarifesi' }, { id: 'terminal', label: 'Terminal çıkışı ve geçişler' },
      { id: 'istanbul-havalimani', label: 'İstanbul Havalimanı bağlantısı' }, { id: 'kaynak', label: 'Resmî kaynak' },
      { id: 'sik-sorulan-sorular', label: 'Sık sorulan sorular' },
    ]}/>

    <section id="hesaplama">
      <h2>Sabiha Gökçen taksi ücreti hesaplama</h2>
      <p>Varış noktasını seçerek yaklaşık mesafeyi yükleyin veya haritadaki güncel araç mesafesini yazın. İstanbul seçili gelir; Sabiha Gökçen, Pendik’te ve İstanbul sarı taksi tarifesi kapsamındadır.</p>
      <Calculator fixedCity="istanbul" distancePresets={sabihaGokcenRoutes} allowWaitingInput={false}/>
      <p>Sonuç tahminidir. Taksimetre düşük hızda mesafe ve zaman ölçümü arasında kendi dönüşüm kuralıyla çalışır; bilinen köprü, tünel veya otoyol bedelini ek yol ücreti alanına ayrıca yazabilirsiniz.</p>
    </section>

    <section id="rotalar">
      <h2>Sabiha Gökçen’den popüler rota fiyatları</h2>
      <div className="table-wrap"><table><caption>Bekleme etkisi ve ücretli geçişler hariç yaklaşık sarı taksi tutarları</caption><thead><tr><th scope="col">Varış noktası</th><th scope="col">Yaklaşık yol</th><th scope="col">Sarı taksi</th><th scope="col">Ücretli yol notu</th></tr></thead><tbody>{sabihaGokcenRoutes.map((route) => <tr key={route.name}><th scope="row">{route.name}</th><td>{route.distanceKm} km</td><td>{money(estimate(route.distanceKm))}</td><td>{route.paidRoadNote}</td></tr>)}</tbody></table></div>
      <p>Bu değerler terminal ile varış bölgesi arasındaki yaklaşık araç mesafesinden hesaplanır. Başlangıç kapısı, trafik, yol çalışması ve sürücünün seçtiği güzergâh gerçek kilometreyi değiştirebilir.</p>
    </section>

    <section id="tarife">
      <h2>2026 İstanbul sarı taksi tarifesi</h2>
      <div className="table-wrap"><table><caption>16 Şubat 2026’dan itibaren Sabiha Gökçen dahil İstanbul genelinde geçerli sarı taksi tarifesi</caption><thead><tr><th scope="col">Tarife kalemi</th><th scope="col">Tutar</th><th scope="col">Uygulama</th></tr></thead><tbody>
        <tr><th scope="row">Açılış</th><td>{money(city.openingFare)}</td><td>Yolculuk başında</td></tr><tr><th scope="row">Mesafe</th><td>{money(city.perKmFare)}/km</td><td>Taksimetrenin ölçtüğü yol için</td></tr><tr><th scope="row">Zaman</th><td>{money(city.waitingFarePerMinute ?? 0)}/dk</td><td>Düşük hızda tarife dönüşümü uygulanabilir</td></tr><tr><th scope="row">Minimum / indi-bindi</th><td>{money(city.minimumFare)}</td><td>Yolculuk başına alt sınır</td></tr>
      </tbody></table></div>
      <p>Sabiha Gökçen için ayrı bir havalimanı tarifesi veya gece zammı yoktur. Bu sayfa yalnızca kaynakla doğrulanmış sarı taksi tarifesini gösterir.</p>
    </section>

    <section id="terminal">
      <h2>Terminal çıkışı, trafik ve ücretli geçişler</h2>
      <p>Terminal çıkışındaki resmî taksi yönlendirmelerini izleyin, plakayı not edin ve taksimetrenin yolculuk başında açıldığını kontrol edin. TEM ve bağlantı yollarında trafik yoğunluğu, düşük hızda geçen sürenin toplamı etkilemesine neden olabilir.</p>
      <p>Anadolu Yakası rotalarında ücretli geçiş gerekmeyebilir. Avrupa Yakası’na geçerken köprü veya Avrasya Tüneli kullanılacaksa bu bedel taksimetre tahmininden ayrı olarak eklenebilir. Rota tercihini yolculuk başlamadan önce netleştirin.</p>
    </section>

    <section id="istanbul-havalimani">
      <h2>İstanbul Havalimanı’na geçiş gerekiyorsa</h2>
      <p>Bu sayfa Sabiha Gökçen çıkışlı rotalara odaklanır. Diğer havalimanından başlayan yolculuklar için <Link href="/istanbul-havalimani-taksi-ucreti/">İstanbul Havalimanı taksi ücreti rehberini</Link>, şehir içindeki genel tahminler için <Link href="/istanbul-taksi-ucreti/">İstanbul taksi ücreti hesaplama sayfasını</Link> kullanın.</p>
      <p>Tek yolcu ve az bagaj için M4 metro, HAVABÜS veya İETT hatları daha ekonomik olabilir. Birden fazla yolcu, fazla bagaj veya kapıdan kapıya ulaşım gerektiğinde taksi daha pratik bir seçenek olabilir.</p>
    </section>

    <section className="source-box" id="kaynak">
      <h2>Resmî tarife kaynağı</h2>
      <p><strong>Geçerlilik:</strong> 16 Şubat 2026 · <strong>Son kontrol:</strong> <time dateTime={modified}>{formatDate(modified)}</time></p>
      <p>Rakamlar, 12 Şubat 2026 tarihli 263 sayılı İBB Meclis Kararına dayanan <a href={city.sourceUrl} rel="external">İBB/TUHİM Taksi Taşımacılığı Ücret Tarifesinden</a> alınmıştır. Güncel belgeler <a href="https://tuhim.ibb.gov.tr/ucret-tarifeler/" rel="external">TUHİM ücret tarifeleri arşivinde</a> yayımlanır.</p>
      <p>Terminal ulaşım bilgileri için <a href="https://www.sabihagokcen.aero/" rel="external">Sabiha Gökçen Havalimanı resmî sitesini</a> kontrol edin. <Link href="/">Türkiye geneli hesaplayıcıya</Link>, <Link href="/havalimani-taksi-ucretleri/">havalimanı taksi rehberleri merkezine</Link>, <Link href="/sehirler/">şehir rehberlerine</Link> ve <Link href="/veri-kaynaklari-ve-hesaplama-yontemi/">hesaplama yöntemine</Link> geçebilirsiniz.</p>
    </section>
  </ArticlePage>;
}
