import Link from 'next/link';
import { ArticlePage } from './ArticlePage';
import { Calculator } from './Calculator';
import { TableOfContents } from './TableOfContents';
import { bursaRoutes } from '@/src/data/bursa-routes';
import { taxiFareBySlug } from '@/src/data/taxi-fares';
import { calculateFare, formatCurrency } from '@/lib/taxi-calculator';
import { canonical, site } from '@/src/data/site';

const city = taxiFareBySlug.bursa!;
const path = '/bursa-taksi-ucreti/';
const title = 'Bursa Taksi Ücreti 2026: Güncel KM ve İndi Bindi Hesaplama';
const description = 'Bursa taksi ücreti için 2026 açılış, kilometre ve indi-bindi tarifesini; Bursa Otogar, Ulucami, Görükle ve Mudanya rota tahminleriyle inceleyin.';
const officialCouncilDecision = 'https://www.bursa.bel.tr/dosyalar/meclis_kararlari/260129102727_20.01.2026-Kararlar-imzasiz.pdf';
const municipalTaxiService = 'https://www.bursa.bel.tr/hizmet-kat/zabita-18';
const exampleDistances = [2, 5, 10, 15, 25] as const;

const faqs = [
  { question: 'Bursa taksi açılış ücreti ne kadar?', answer: '15 Mart 2026 itibarıyla Bursa sarı taksi açılış ücreti 52 TL’dir.' },
  { question: 'Bursa taksi kilometre ücreti ne kadar?', answer: 'Bursa sarı taksi kilometre ücreti 45 TL’dir. Taksimetre, gidilen gerçek araç mesafesine göre artar.' },
  { question: 'Bursa indi-bindi ücreti ne kadar?', answer: 'Bursa’da minimum, yaygın adıyla indi-bindi ücreti 150 TL’dir. Açılış ve mesafe toplamı bu tutarın altında kalırsa 150 TL uygulanır; ayrıca eklenmez.' },
  { question: 'Bursa taksilerinde bekleme ücreti ne kadar?', answer: 'İncelenen 15 Mart 2026 Bursa tarife kaynaklarında dakika başına bekleme bedeli doğrulanamadı. Bu nedenle hesaplayıcı Bursa için otomatik bekleme ücreti eklemez.' },
  { question: 'Bursa taksilerinde gece tarifesi var mı?', answer: 'İncelenen Bursa 2026 tarife kaynaklarında ayrı bir gece tarifesi doğrulanamadı. Gece için farklı bir oran varsaymak yerine araçtaki onaylı tarife kartını kontrol edin.' },
  { question: 'Bursa Otogar ile Ulucami arası taksi ücreti ne kadar?', answer: `Yaklaşık 12 km için, bekleme ve ek geçiş olmadan tahmin ${formatCurrency(calculateFare(city, 12).total)} tutar. Tam adres ve trafik sonucu değiştirebilir.` },
  { question: 'Mudanya ile Bursa merkez arasında taksi ücreti sabit mi?', answer: 'Hayır. Mudanya yönünde başlangıç noktası, kullanılan yol ve bırakma adresi kilometreyi değiştirir. Taksimetre sabit rota fiyatı değil, gerçek yolculuk ölçümüyle çalışır.' },
  { question: 'Bursa taksi ücreti hesaplama sonucu neden taksimetreden farklı olabilir?', answer: 'Haritadaki rota, trafik, kısa süreli duraklama, gerçek giriş-çıkış noktası ve varsa ücretli geçişler toplamı değiştirebilir. Sayfadaki sonuç planlama tahminidir.' },
];

export function BursaFareArticle() {
  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Bursa Taksi Ücreti Hesaplayıcı',
    url: canonical(path),
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Web',
    inLanguage: 'tr-TR',
    description: 'Bursa sarı taksi tarifesiyle mesafeye göre tahmini ücret hesaplar.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
    publisher: { '@type': 'Organization', name: site.publisher, url: site.url },
  };

  return (
    <ArticlePage title={title} description={description} path={path} modified={city.lastVerified} category="Şehirler" readingMinutes={8} faqs={faqs} additionalSchemas={[webApplicationSchema]}>
      <p className="notice"><strong>Kısa cevap:</strong> Bursa taksi ücreti, 52 TL açılış ve kilometre başına 45 TL üzerinden ilerler. Açılış ile mesafe toplamı 150 TL’nin altında kalırsa indi-bindi olarak 150 TL uygulanır.</p>

      <section className="fare-answer-box" aria-label="Bursa 2026 sarı taksi tarifesi özeti">
        <strong>Bursa sarı taksi tarifesi</strong>
        <dl>
          <div><dt>Açılış ücreti</dt><dd>{formatCurrency(city.openingFare)}</dd></div>
          <div><dt>Kilometre ücreti</dt><dd>{formatCurrency(city.perKmFare)}</dd></div>
          <div><dt>Minimum / indi-bindi</dt><dd>{formatCurrency(city.minimumFare)}</dd></div>
          <div><dt>Geçerlilik tarihi</dt><dd>15 Mart 2026</dd></div>
        </dl>
        <p>Tarifede dakika başına bekleme kalemi doğrulanamadığı için bu sayfada bekleme ücreti gösterilmez.</p>
      </section>

      <TableOfContents items={[
        { id: 'hesaplama', label: 'Bursa taksi ücreti hesaplama' },
        { id: 'tarife', label: '2026 Bursa taksi tarifesi' },
        { id: 'ornekler', label: '2, 5 ve 10 km örnekleri' },
        { id: 'rotalar', label: 'Bursa rota tahminleri' },
        { id: 'taksimetre', label: 'Taksimetreyi etkileyenler' },
        { id: 'kaynak', label: 'Tarife kaynağı' },
        { id: 'sik-sorulan-sorular', label: 'Sık sorulan sorular' },
      ]}/>

      <section id="hesaplama">
        <h2>Bursa taksi ücreti hesaplama</h2>
        <p>Haritadaki araç mesafesini girin veya aşağıdaki Bursa rota örneklerinden birini seçin. Hesap, yalnızca Bursa için kayıtlı sarı taksi tarifesini kullanır.</p>
        <Calculator fixedCity="bursa" distancePresets={bursaRoutes}/>
      </section>

      <section id="tarife">
        <h2>2026 Bursa taksi tarifesi</h2>
        <div className="table-wrap"><table><caption>15 Mart 2026 itibarıyla Bursa sarı taksi tarife kalemleri</caption><thead><tr><th scope="col">Tarife kalemi</th><th scope="col">Tutar</th><th scope="col">Açıklama</th></tr></thead><tbody>
          <tr><th scope="row">Açılış</th><td>{formatCurrency(city.openingFare)}</td><td>Yolculuk başladığında</td></tr>
          <tr><th scope="row">Kilometre</th><td>{formatCurrency(city.perKmFare)}</td><td>Gidilen her kilometre için</td></tr>
          <tr><th scope="row">Minimum / indi-bindi</th><td>{formatCurrency(city.minimumFare)}</td><td>Kısa yolculuklarda alt sınır</td></tr>
          <tr><th scope="row">Bekleme</th><td>Doğrulanmadı</td><td>Otomatik olarak eklenmez</td></tr>
        </tbody></table></div>
        <p>Temel hesap: <strong>açılış + (mesafe × kilometre ücreti)</strong>. Ara toplam 150 TL’nin altında kaldığında sistem yalnızca minimum ücreti uygular; indi-bindi ikinci kez eklenmez.</p>
      </section>

      <section id="ornekler">
        <h2>2 km, 5 km ve 10 km Bursa taksi ücreti örnekleri</h2>
        <p>Bu tutarlar bekleme, köprü, tünel, otoyol ve farklı rota seçimi olmadan hesaplanmıştır.</p>
        <div className="table-wrap"><table><caption>Mesafeye göre Bursa sarı taksi tahminleri</caption><thead><tr><th scope="col">Mesafe</th><th scope="col">Açılış + kilometre</th><th scope="col">Uygulanan tahmin</th></tr></thead><tbody>{exampleDistances.map((km) => { const fare = calculateFare(city, km); return <tr key={km}><th scope="row">{km} km</th><td>{formatCurrency(fare.subtotal)}</td><td>{formatCurrency(fare.total)}</td></tr>; })}</tbody></table></div>
        <p>2 km örneğinde ara toplam 150 TL’nin altında kaldığı için minimum ücret devreye girer. 5 km ve üzerindeki örneklerde kilometre hesabı minimum tutarı aşar.</p>
      </section>

      <section id="rotalar">
        <h2>Bursa’da popüler rota tahminleri</h2>
        <div className="table-wrap"><table><caption>Gerçek trafik ve ek geçişler hariç yaklaşık sarı taksi tutarları</caption><thead><tr><th scope="col">Rota</th><th scope="col">Yaklaşık araç mesafesi</th><th scope="col">Tahmini ücret</th></tr></thead><tbody>{bursaRoutes.map((route) => <tr key={route.name}><th scope="row">{route.name}</th><td>{route.distanceKm} km</td><td>{formatCurrency(calculateFare(city, route.distanceKm).total)}</td></tr>)}</tbody></table></div>
        <p>Otogar, Ulucami, Görükle ve Mudanya yönünde gerçek başlangıç noktası ile seçilen yol aynı değildir. Özellikle Mudanya yolu ve şehir hastanesi yönünde navigasyondaki araç mesafesini kontrol edin.</p>
      </section>

      <section id="taksimetre">
        <h2>Bursa taksi tutarını neler etkiler?</h2>
        <h3>İndi-bindi ve gerçek mesafe</h3>
        <p>Kısa mesafede minimum ücret belirleyicidir. Yol uzadıkça 45 TL kilometre bedeli toplamda daha büyük pay alır.</p>
        <h3>Trafik ve bekleme</h3>
        <p>Yoğun trafik gerçek yolculuğu uzatabilir. Ancak 2026 Bursa kaynaklarında dakika başına bekleme ücreti doğrulanmadığı için bu hesaplayıcı tahmine varsayımsal bir bekleme tutarı katmaz.</p>
        <h3>Gece tarifesi ve rota farkı</h3>
        <p>İncelenen Bursa 2026 kaynaklarında ayrı gece tarifesi doğrulanmadı. Gece, tek yönler, yol çalışmaları ve sürücünün kullandığı rota kilometreyi değiştirebilir; nihai tutar taksimetrede görünür.</p>
        <p>Minimum ücretin işleyişini <Link href="/indi-bindi-ucreti-nedir/">indi-bindi rehberinde</Link>, genel yöntemi ise <Link href="/taksi-ucreti-nasil-hesaplanir/">taksi ücreti hesaplama açıklamasında</Link> görebilirsiniz.</p>
      </section>

      <section className="source-box" id="kaynak">
        <h2>Tarife kaynağı ve kontrol</h2>
        <p><strong>Yürürlük:</strong> 15 Mart 2026 · <strong>Son kontrol:</strong> 20 Temmuz 2026</p>
        <p>52 TL açılış, 45 TL kilometre ve 150 TL minimum değerleri; <a href={city.sourceUrl} rel="external">Bursa Şoförler ve Otomobilciler Esnaf Odası tarife duyurusu</a> ile <a href={officialCouncilDecision} rel="external">20 Ocak 2026 tarihli 162 sayılı Bursa Büyükşehir Belediyesi Meclis Kararı</a> birlikte kontrol edilerek kullanılmıştır.</p>
        <p>Tarife veya uygulama konusunda belediyenin <a href={municipalTaxiService} rel="external">taksi-dolmuş-minibüs hizmetleri</a> bilgisine başvurabilirsiniz. Kaynak seçimi için <Link href="/veri-kaynaklari-ve-hesaplama-yontemi/">veri kaynakları ve hesaplama yöntemini</Link> inceleyin.</p>
        <p><Link href="/">Ana sayfadaki taksi ücreti hesaplama aracına</Link> dönebilir veya <Link href="/sehirler/">diğer şehir tarifelerini</Link> karşılaştırabilirsiniz.</p>
      </section>

      <section>
        <h2>Sonuç</h2>
        <p>Bursa’da kısa bir yolculukta 150 TL indi-bindi eşiğini, daha uzun rotalarda ise kilometre tarifesini esas alın. Yola çıkmadan önce araçtaki güncel tarife kartını ve gerçek rota mesafesini kontrol edin.</p>
      </section>
    </ArticlePage>
  );
}
