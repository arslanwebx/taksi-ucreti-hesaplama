import Link from 'next/link';
import { ArticlePage } from './ArticlePage';
import { Calculator } from './Calculator';
import { TableOfContents } from './TableOfContents';
import { calculateFare } from '@/lib/taxi-calculator';
import { antalyaRoutes } from '@/src/data/antalya-routes';
import { izmirRoutes } from '@/src/data/izmir-routes';
import { formatDate, money, publishedCities } from '@/src/data/cities';
import { canonical, site } from '@/src/data/site';

type RegionalSlug = 'izmir' | 'antalya';
const quickDistances = [3, 5, 10, 20] as const;

const pageConfig = {
  izmir: {
    title: 'İzmir Taksi Ücreti Hesaplama 2026',
    description: 'İzmir taksi ücretini 2026 güncel tarifesiyle hesaplayın. Açılış, kilometre, indi-bindi ücretleri ve popüler İzmir rota tahminlerini inceleyin.',
    routes: izmirRoutes,
    intro: 'İzmir merkez taksi ücreti açılış, gidilen yol ve minimum ücret kuralıyla hesaplanır. Körfezin iki yakası arasındaki yol seçimi gerçek mesafeyi değiştirebilir.',
    airportName: 'Adnan Menderes Havalimanı',
    airportAnchor: 'adnan-menderes',
  },
  antalya: {
    title: 'Antalya Taksi Ücreti Hesaplama 2026',
    description: 'Antalya taksi ücretini 2026 güncel tarifesiyle hesaplayın. Açılış, kilometre, kısa mesafe ücretleri ve popüler Antalya rota tahminlerini görün.',
    routes: antalyaRoutes,
    intro: 'Antalya merkez tarifesi şehir içi planlama için kullanılır. Kaleiçi erişimi, turizm bölgeleri ve Belek yönündeki dış rotalarda gerçek mesafe ile yerel tarife ayrıca kontrol edilmelidir.',
    airportName: 'Antalya Havalimanı',
    airportAnchor: 'antalya-havalimani',
  },
} as const;

function cityFaqs(slug: RegionalSlug, city: (typeof publishedCities)[number]) {
  const routeFare = (km: number) => money(calculateFare(city, km).total);
  if (slug === 'izmir') return [
    { question: 'İzmir taksi açılış ücreti ne kadar?', answer: `İzmir merkez sarı taksi açılış ücreti ${money(city.openingFare)} tutar.` },
    { question: 'İzmir taksi kilometre ücreti ne kadar?', answer: `Merkez tarife kaydında kilometre ücreti ${money(city.perKmFare)} tutar.` },
    { question: 'İzmir indi-bindi ücreti ne kadar?', answer: `Minimum yolculuk ücreti ${money(city.minimumFare)} tutar; normal hesabın üzerine ayrıca eklenmez.` },
    { question: 'İzmir taksilerinde gece tarifesi var mı?', answer: 'Kullanılan merkez tarife kaydında ayrı bir gece katsayısı uygulanmaz. Güncel tarife kartını araçta kontrol edin.' },
    { question: 'İzmir taksilerinde kart geçer mi?', answer: 'Kart kabulü araç ve cihaz durumuna göre değişebilir; yolculuk öncesinde sürücüye sorun.' },
    { question: 'Konak ile Bornova taksi ücreti ne kadar?', answer: `Yaklaşık 12 km için tahmin ${routeFare(12)} tutar. Trafik ve gerçek adres sonucu değiştirebilir.` },
    { question: 'Konak ile Adnan Menderes Havalimanı taksi ücreti ne kadar?', answer: `Yaklaşık 18 km için tahmin ${routeFare(18)} tutar. Havalimanı giriş noktası ve rota sonucu değiştirebilir.` },
    { question: 'Çeşme’de aynı İzmir merkez tarifesi mi uygulanır?', answer: 'Çeşme ve diğer dış ilçelerde yerel tarife merkez kaydından farklı olabilir. Araca binmeden önce onaylı tarife kartını kontrol edin.' },
  ];
  return [
    { question: 'Antalya taksi açılış ücreti ne kadar?', answer: `Kullanılan merkez kaydında açılış ücreti ${money(city.openingFare)} tutar; kayıt ikincil kaynaktan derlenmiştir.` },
    { question: 'Antalya taksi kilometre ücreti ne kadar?', answer: `Kullanılan merkez kaydında kilometre ücreti ${money(city.perKmFare)} tutar.` },
    { question: 'Antalya minimum taksi ücreti ne kadar?', answer: `Kısa yolculuklarda minimum ücret ${money(city.minimumFare)} tutar.` },
    { question: 'Antalya taksilerinde gece tarifesi var mı?', answer: 'Kullanılan kayıtta ayrı gece tarifesi belgelenmemiştir. Araçtaki onaylı tarife kartını kontrol edin.' },
    { question: 'Antalya taksilerinde kart geçer mi?', answer: 'Kart kabulü araç ve cihaz durumuna göre değişebilir; binmeden önce teyit edin.' },
    { question: 'Antalya Havalimanı ile Kaleiçi taksi ücreti ne kadar?', answer: `Yaklaşık 15 km için tahmin ${routeFare(15)} tutar. Trafik ve bırakma noktası sonucu değiştirebilir.` },
    { question: 'Antalya Havalimanı ile Lara taksi ücreti ne kadar?', answer: `Yaklaşık 13 km için tahmin ${routeFare(13)} tutar.` },
    { question: 'Belek ve tatil bölgelerinde tarife farklı mı?', answer: 'Belek ve resort bölgelerinde yerel uygulama veya farklı tarife görülebilir. Antalya merkez kaydını kesin fiyat olarak kullanmayın.' },
  ];
}

export function RegionalCityFareArticle({ slug }: { slug: RegionalSlug }) {
  const city = publishedCities.find((item) => item.slug === slug)!;
  const config = pageConfig[slug];
  const faqs = cityFaqs(slug, city);
  const webApplicationSchema = {
    '@context': 'https://schema.org', '@type': 'WebApplication',
    name: `${city.city} Taksi Ücreti Hesaplayıcı`, url: canonical(city.path),
    applicationCategory: 'TravelApplication', operatingSystem: 'Web', inLanguage: 'tr-TR',
    description: `${city.city} merkez sarı taksi tarifesiyle mesafeye göre tahmini ücret hesaplar.`,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
    publisher: { '@type': 'Organization', name: site.publisher, url: site.url },
  };
  const tariffTable = (
    <section id="tarife">
      <h2>{slug === 'izmir' ? 'İzmir merkez tarifesi ve dış ilçeler' : 'Antalya merkez tarife kaydının kapsamı'}</h2>
      <div className="table-wrap"><table><caption>{city.city} sarı taksi tarife özeti</caption><thead><tr><th scope="col">Açılış</th><th scope="col">Kilometre</th><th scope="col">Minimum</th><th scope="col">Referans</th></tr></thead><tbody><tr><td>{money(city.openingFare)}</td><td>{money(city.perKmFare)}</td><td>{money(city.minimumFare)}</td><td>{city.referenceDate}</td></tr></tbody></table></div>
      <p>{slug === 'izmir' ? 'İzmir Büyükşehir Belediyesi Meclisi, 17 Nisan 2026 tarihli tutanakta il genelindeki ticari taksi tarifesi değişikliğini kabul etmiştir. Çeşme ve farklı yerel uygulamaların bulunduğu dış ilçelerde araçtaki tarife kartını ayrıca kontrol edin.' : '50 TL açılış, 50 TL/km ve 200 TL minimum değerleri ikincil 2026 kaydından derlenmiştir. Belediye bağlantısı 28 Mart 2025 tarihli 178 sayılı UKOME kararını karşılaştırma amacıyla gösterir; bu değerleri doğrudan resmî 2026 teyidi olarak kabul etmeyin.'}</p>
    </section>
  );
  const routeTable = (
    <section id="rotalar">
      <h2>{slug === 'izmir' ? 'Körfez ve merkez ilçeler arasında rota tahminleri' : 'Havalimanı, Kaleiçi ve turizm bölgeleri rota tahminleri'}</h2>
      <div className="table-wrap"><table><caption>Gerçek rota ve trafik etkisi hariç yaklaşık sarı taksi tutarları</caption><thead><tr><th scope="col">Rota</th><th scope="col">Yaklaşık yol</th><th scope="col">Tahmini ücret</th></tr></thead><tbody>{config.routes.map((route) => <tr key={route.name}><th scope="row">{route.name}</th><td>{route.distanceKm} km</td><td>{money(calculateFare(city, route.distanceKm).total)}</td></tr>)}</tbody></table></div>
      <p>Tüm mesafe ve tutarlar tahmindir. Tam adres, giriş noktası, yol seçimi, trafik ve duraklama gerçek taksimetre tutarını değiştirebilir.</p>
    </section>
  );

  return (
    <ArticlePage title={config.title} description={config.description} path={city.path} modified={city.lastVerified} category="Şehirler" readingMinutes={8} faqs={faqs} additionalSchemas={[webApplicationSchema]}>
      <p>{config.intro}</p>
      <section className="fare-answer-box" aria-label={`${city.city} tarife özeti`}>
        <strong>{city.city} sarı taksi özeti</strong>
        <dl><div><dt>Açılış</dt><dd>{money(city.openingFare)}</dd></div><div><dt>Kilometre</dt><dd>{money(city.perKmFare)}</dd></div><div><dt>Minimum</dt><dd>{money(city.minimumFare)}</dd></div><div><dt>Geçerlilik</dt><dd>{city.referenceDate}</dd></div></dl>
        <p>Kaynak: <a href={city.sourceUrl} rel="external">{slug === 'izmir' ? 'İzmir Büyükşehir Belediyesi Meclis tutanağı' : 'Antalya UKOME arşivi ve ikincil tarife kaydı'}</a> · Son kontrol: <time dateTime={city.lastVerified}>{formatDate(city.lastVerified)}</time></p>
      </section>
      <TableOfContents items={[{ id: 'hesaplama', label: `${city.city} hesaplayıcı` }, { id: 'rotalar', label: 'Popüler rota tahminleri' }, { id: 'tarife', label: 'Tarife ve kapsamı' }, { id: 'hizli', label: 'Hızlı mesafe örnekleri' }, { id: 'havalimani', label: `${config.airportName} özeti` }, { id: 'sik-sorulan-sorular', label: 'Sık sorulan sorular' }]}/>
      <section id="hesaplama"><h2>{city.city} için taksi tutarını hesaplayın</h2><p>Şehir seçili gelir. Popüler rotayı yükleyebilir veya güncel araç mesafesini elle yazabilirsiniz.</p><Calculator fixedCity={slug} distancePresets={config.routes}/></section>
      {slug === 'izmir' ? <>{routeTable}{tariffTable}</> : <>{tariffTable}{routeTable}</>}
      <section id="hizli"><h2>{city.city} hızlı mesafe örnekleri</h2><div className="table-wrap"><table><thead><tr><th scope="col">Mesafe</th><th scope="col">Tahmini sarı taksi ücreti</th></tr></thead><tbody>{quickDistances.map((km) => <tr key={km}><th scope="row">{km} km</th><td>{money(calculateFare(city, km).total)}</td></tr>)}</tbody></table></div></section>
      <section id="havalimani"><h2>{config.airportName} için kısa not</h2><p>Bu sayfa genel şehir tarifesine odaklanır. Terminal ve transfer ayrıntıları için <Link href={`/havalimani-taksi-ucretleri/#${config.airportAnchor}`}>havalimanı taksi rehberindeki ilgili bölümü</Link> kullanın.</p></section>
      <section className="source-box"><h2>Planlama bağlantıları</h2><p><Link href="/">Ana hesaplayıcı</Link> · <Link href="/sehirler/">Şehirler merkezi</Link> · <Link href="/indi-bindi-ucreti-nedir/">Minimum ücret rehberi</Link> · <Link href="/taksi-ucreti-nasil-hesaplanir/">Hesaplama yöntemi</Link></p></section>
    </ArticlePage>
  );
}
