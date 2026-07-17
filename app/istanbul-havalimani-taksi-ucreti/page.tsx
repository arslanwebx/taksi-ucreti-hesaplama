import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticlePage } from '@/components/ArticlePage';
import { Calculator } from '@/components/Calculator';
import { TableOfContents } from '@/components/TableOfContents';
import { fareCategories, faresByCategory, formatDate, money, publishedCities } from '@/src/data/cities';
import { istanbulAirportQuickRouteNames, istanbulAirportRoutes } from '@/src/data/istanbul-airport-routes';
import { canonical, site } from '@/src/data/site';
import { pageMetadata } from '@/lib/seo';

const city = publishedCities.find((item) => item.slug === 'istanbul')!;
const title = 'İstanbul Havalimanı Taksi Ücreti 2026: Taksim ve İlçe Fiyatları';
const description = 'İstanbul Havalimanı’ndan Taksim, Sultanahmet, Kadıköy ve diğer ilçelere 2026 taksi ücretlerini hesaplayın. Güncel İBB tarifesi ve rota tablosu.';
const path = '/istanbul-havalimani-taksi-ucreti/';
const quickRoutes = istanbulAirportRoutes.filter((route) =>
  (istanbulAirportQuickRouteNames as readonly string[]).includes(route.name),
);
const yellowEstimate = (distanceKm: number) => faresByCategory(city, distanceKm)[0]!.total;
const faqs = [
  { question: 'İstanbul Havalimanı ile Taksim arası taksi kaç TL tutar?', answer: `Yaklaşık 42 km için sarı taksi tahmini ${money(yellowEstimate(42))} tutar. Bekleme ve ücretli yollar dahil değildir; gerçek taksimetre tutarı rotaya göre değişir.` },
  { question: 'İstanbul Havalimanı ile Sultanahmet arası taksi kaç TL tutar?', answer: `Yaklaşık 47 km için sarı taksi tahmini ${money(yellowEstimate(47))} tutar. Bu bir planlama değeridir; bekleme ve varsa ücretli yol bedeli ayrıca eklenir.` },
  { question: 'İstanbul Havalimanı taksi fiyatları sabit midir?', answer: 'Hayır. Resmî taksiler taksimetre kullanır. Toplam; açılış, gidilen mesafe, zaman tarifesi ve varsa ücretli geçişlerden oluşur.' },
  { question: 'İstanbul taksilerinde gece tarifesi var mı?', answer: 'İBB tarifesinde ayrı bir gece tarifesi yer almaz; aynı taksimetre tarifesi günün her saatinde geçerlidir.' },
  { question: 'Havalimanı taksilerinde kredi kartı geçer mi?', answer: 'Birçok araç kart kabul eder ancak cihaz veya bağlantı sorunu yaşanabilir. Binmeden önce kartla ödeme yapacağınızı doğrulamanız ve alternatif ödeme yöntemi bulundurmanız uygundur.' },
  { question: 'Bagaj için ayrı ücret alınır mı?', answer: 'Standart yolcu bagajı için tarifede ayrı bir bagaj kalemi bulunmaz. Olağan dışı büyüklükte veya araç kapasitesini aşan eşya için binmeden önce uygun aracı teyit edin.' },
  { question: 'Köprü, tünel ve otoyol ücretleri tahmine dahil mi?', answer: 'Hayır. Tablodaki tutarlar taksimetre tahminidir. Kullanılan köprü, tünel veya otoyol bedeli yolcu tarafından ayrıca ödenir.' },
  { question: 'Resmî İstanbul Havalimanı taksi durağı nasıl bulunur?', answer: 'Terminaldeki taksi yönlendirmelerini izleyip resmî sıradan araca binin. Araç plakasını ve taksimetrenin yolculuk başında açıldığını kontrol edin; terminal içinde bireysel transfer tekliflerine temkinli yaklaşın.' },
];

export const metadata: Metadata = pageMetadata(title, description, path, 'article');

export default function IstanbulAirport() {
  const categories = fareCategories(city);
  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'İstanbul Havalimanı Taksi Ücreti Hesaplayıcı',
    url: canonical(path),
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Web',
    inLanguage: 'tr-TR',
    description: 'Mesafe, bekleme süresi ve ek geçiş bedeline göre İstanbul taksi ücreti tahmini hesaplar.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
    publisher: { '@type': 'Organization', name: site.publisher, url: site.url },
  };

  return (
    <ArticlePage
      title={title}
      description={description}
      path={path}
      modified={city.lastVerified}
      category="Havalimanı Taksi Ücretleri"
      readingMinutes={10}
      faqs={faqs}
      additionalSchemas={[webApplicationSchema]}
    >
      <p className="notice"><strong>Kısa cevap:</strong> İstanbul Havalimanı’nda sabit taksi fiyatı yoktur. Son tutarı taksimetre; gerçek yol mesafesi, trafikte geçen süre ve varsa köprü, tünel veya otoyol bedellerine göre belirler. Bu sayfadaki hesaplamalar güncel resmî İBB/TUHİM tarifesini kullanır.</p>

      <section className="quick-fare-summary" aria-labelledby="hizli-fiyat-ozeti">
        <h2 id="hizli-fiyat-ozeti">Hızlı Fiyat Özeti</h2>
        <div className="table-wrap">
          <table>
            <caption>İstanbul Havalimanı’ndan popüler noktalara sarı taksi tahminleri</caption>
            <thead><tr><th scope="col">Varış</th><th scope="col">Yaklaşık mesafe</th><th scope="col">Sarı taksi tahmini</th></tr></thead>
            <tbody>{quickRoutes.map((route) => <tr key={route.name}><th scope="row">{route.name}</th><td>{route.distanceKm} km</td><td>{money(yellowEstimate(route.distanceKm))}</td></tr>)}</tbody>
          </table>
        </div>
        <p><strong>Ücretli geçişler hariçtir.</strong> Mesafeler planlama amaçlı yaklaşık yol mesafeleridir; gerçek rota ve taksimetre tutarı değişebilir.</p>
      </section>

      <TableOfContents items={[
        { id: 'hesaplama', label: 'Taksi ücreti hesaplama' },
        { id: 'rotalar', label: 'İlçe ve rota fiyatları' },
        { id: 'tarife', label: 'Güncel İstanbul tarifesi' },
        { id: 'taksi-turleri', label: 'Taksi türleri ve ek ücretler' },
        { id: 'terminal', label: 'Terminalde taksi kullanımı' },
        { id: 'alternatifler', label: 'Diğer ulaşım seçenekleri' },
        { id: 'sik-sorulan-sorular', label: 'Sık sorulan sorular' },
      ]}/>

      <section id="hesaplama">
        <h2>İstanbul Havalimanı taksi ücreti hesaplama</h2>
        <p>Varış noktasını seçerek yaklaşık mesafeyi yükleyin veya haritadaki güncel araç mesafesini elle yazın. Bekleme dakikası ve bildiğiniz geçiş bedelleri isteğe bağlıdır.</p>
        <Calculator fixedCity="istanbul" distancePresets={istanbulAirportRoutes}/>
        <p>Hesaplayıcı, İBB’nin yayımladığı zaman tarifesini yalnızca girdiğiniz bekleme dakikalarına uygular. Trafikte taksimetre mesafe ve zaman ölçümü arasında kendi dönüşüm kuralıyla çalıştığından sonuç kesin fiyat değil, karşılaştırılabilir bir planlama tahminidir.</p>
      </section>

      <section id="rotalar">
        <h2>İstanbul Havalimanı ilçe ve rota fiyatları</h2>
        <div className="table-wrap">
          <table>
            <caption>Ücretli geçişler hariç yaklaşık taksimetre tutarları</caption>
            <thead><tr><th scope="col">Varış noktası</th><th scope="col">Yaklaşık yol</th><th scope="col">Sarı taksi</th><th scope="col">Turkuaz taksi</th><th scope="col">Ücretli yol notu</th></tr></thead>
            <tbody>{istanbulAirportRoutes.map((route) => {
              const estimates = faresByCategory(city, route.distanceKm);
              return <tr key={route.name}><th scope="row">{route.name}</th><td>{route.distanceKm} km</td><td>{money(estimates[0]!.total)}</td><td>{money(estimates[1]!.total)}</td><td>{route.paidRoadNote}</td></tr>;
            })}</tbody>
          </table>
        </div>
        <p>Bu değerler terminal ile bölge merkezi arasındaki yaklaşık araç mesafesinden programlı olarak hesaplanır. Otelin sokağı, yol çalışması, trafik yönlendirmesi ve sürücünün kullandığı rota kilometreyi değiştirebilir.</p>
      </section>

      <section id="tarife">
        <h2>2026 İstanbul taksi tarifesi</h2>
        <div className="table-wrap"><table><caption>16 Şubat 2026’dan itibaren geçerli İBB tarifesi</caption><thead><tr><th scope="col">Taksi türü</th><th scope="col">Açılış</th><th scope="col">Kilometre</th><th scope="col">Dakika</th><th scope="col">Minimum</th></tr></thead><tbody>{categories.map((category) => <tr key={category.id}><th scope="row">{category.label}</th><td>{money(category.tariff.openingFare)}</td><td>{money(category.tariff.perKmFare)}</td><td>{money(category.tariff.waitingFarePerMinute ?? 0)}</td><td>{money(category.tariff.minimumFare)}</td></tr>)}</tbody></table></div>
        <p>Değerler <a href={city.sourceUrl} rel="external">12 Şubat 2026 tarihli 263 sayılı İBB Meclis Kararına dayanan resmî taksi tarifesinden</a> alınmıştır. Belge 16 Şubat 2026’dan itibaren geçerlidir ve <time dateTime={city.lastVerified}>{formatDate(city.lastVerified)}</time> tarihinde kontrol edilmiştir. Güncel belgeler <a href="https://tuhim.ibb.gov.tr/ucret-tarifeler/" rel="external">TUHİM ücret tarifeleri arşivinde</a> yayımlanır.</p>
      </section>

      <section id="taksi-turleri">
        <h2>Sarı, turkuaz ve siyah taksi arasındaki farklar</h2>
        <ul>
          <li><strong>Sarı taksi:</strong> Standart ve en yaygın seçenektir; tablolardaki ana tahmin bu tarifeyi esas alır.</li>
          <li><strong>Turkuaz taksi:</strong> Daha yüksek araç segmentidir ve resmî açılış, kilometre, zaman ve minimum ücretleri sarı taksiden yüksektir.</li>
          <li><strong>Siyah/VIP taksi:</strong> En yüksek segmenttir; daha geniş araç sunabilir ve resmî tarifesi belirgin biçimde daha yüksektir.</li>
        </ul>
        <h3>Gece tarifesi ve trafik</h3>
        <p>İstanbul’da ayrı gündüz ve gece taksi tarifesi yoktur. Ancak yoğun trafikte taksimetrenin zaman tarifesi devreye girebildiği için aynı güzergâhın son tutarı değişebilir.</p>
        <h3>Köprü, tünel ve otoyol bedelleri</h3>
        <p>Kuzey Marmara Otoyolu, köprüler ve Avrasya Tüneli gibi ücretler taksimetre tahminine dahil değildir; kullanılan güzergâha göre ayrıca eklenir. Yola çıkmadan önce sürücüyle rota tercihini netleştirin.</p>
      </section>

      <section id="terminal">
        <h2>Terminalde resmî taksi nasıl kullanılır?</h2>
        <ol><li>Terminaldeki taksi işaretlerini izleyip resmî sırayı kullanın.</li><li>Plakayı not edin ve taksimetrenin başlangıçta açıldığını kontrol edin.</li><li>Adresi haritada gösterip ücretli yol tercihini sorun.</li><li>Kartla ödeyecekseniz araca binmeden önce teyit edin.</li><li>Ödeme kaydını yolculuk bitene kadar saklayın.</li></ol>
        <p>Havalimanının güncel ulaşım ve taksi bilgileri için <a href="https://www.istairport.com/havalimani/havalimani-ulasim/sehir-ici-ulasim/taksi/" rel="external">İstanbul Havalimanı ulaşım sayfasını</a>; metro, Havaist, İETT ve terminal bağlantıları için <a href="https://www.dhmi.gov.tr/Sayfalar/Havalimani/Istanbul/Ulasim.aspx" rel="external">DHMİ ulaşım bilgisini</a> kontrol edebilirsiniz.</p>
      </section>

      <section id="alternatifler">
        <h2>Taksi dışındaki ulaşım seçenekleri</h2>
        <p>M11 metro trafikten daha az etkilenir. Havaist ve İETT, güzergâhı uygun yolcular için daha ekonomik olabilir. Birden fazla yolcu, fazla bagaj veya kapıdan kapıya ulaşım gerektiğinde taksi daha pratik bir seçenek olabilir.</p>
        <p><Link href="/">Türkiye geneli taksi hesaplayıcısına</Link>, <Link href="/istanbul-taksi-ucreti/">İstanbul taksi tarifesi rehberine</Link> veya <Link href="/havalimani-taksi-ucretleri/">havalimanı taksi rehberleri merkezine</Link> geçebilirsiniz. Şehirler arası planlama için <Link href="/sehirler/">yayımlanmış şehir tarifelerini</Link> inceleyin.</p>
      </section>
    </ArticlePage>
  );
}
