import Link from 'next/link';
import { ArticlePage } from './ArticlePage';
import { Calculator } from './Calculator';
import { TableOfContents } from './TableOfContents';
import { calculateFare } from '@/lib/taxi-calculator';
import { ankaraRoutes } from '@/src/data/ankara-routes';
import { formatDate, money, publishedCities } from '@/src/data/cities';
import { canonical, site } from '@/src/data/site';

const city = publishedCities.find((item) => item.slug === 'ankara')!;
export const ankaraPageTitle = 'Ankara Taksi Ücreti Hesaplama 2026';
export const ankaraPageDescription = 'Ankara taksi ücretini 2026 güncel tarifesiyle hesaplayın. Açılış, kilometre, indi-bindi, bekleme ücretleri ve popüler rota tahminlerini görün.';

const faqs = [
  { question: 'Ankara taksi açılış ücreti ne kadar?', answer: '1 Mart 2026 tarihli Ankara tarifesinde sarı taksi açılış ücreti 65 TL’dir.' },
  { question: 'Ankara taksi kilometre ücreti ne kadar?', answer: 'Ankara sarı taksi kilometre ücreti 40 TL’dir. Gerçek taksimetre tutarı gidilen yol mesafesine göre oluşur.' },
  { question: 'Ankara indi-bindi ücreti ne kadar?', answer: 'Ankara’da minimum, yaygın adıyla indi-bindi ücreti 200 TL’dir. Hesap bu tutarın altında kalırsa 200 TL uygulanır; ayrıca eklenmez.' },
  { question: 'Ankara taksi bekleme ücreti ne kadar?', answer: 'Tarife kaydındaki bekleme ücreti dakika başına 7 TL’dir. Hesaplayıcı yalnızca kullanıcının girdiği bekleme süresini hesaba katar.' },
  { question: 'Ankara taksilerinde gece tarifesi var mı?', answer: 'Kullanılan Ankara tarife kaydında ayrı bir gece tarifesi belirtilmez. Aynı sarı taksi tarifesi esas alınır; bekleme ve gerçek rota toplamı değiştirebilir.' },
  { question: 'Ankara taksilerinde kredi kartı geçer mi?', answer: 'Kart kabulü araca ve ödeme cihazının çalışmasına göre değişebilir. Kartla ödeyecekseniz yolculuk başlamadan önce sürücüye sormanız uygundur.' },
  { question: 'Kızılay ile Esenboğa Havalimanı taksi ücreti ne kadar?', answer: `Yaklaşık 30 km için bekleme ve ek yol bedeli olmadan sarı taksi tahmini ${money(calculateFare(city, 30).total)} tutar. Başlangıç adresi, rota ve trafik gerçek tutarı değiştirebilir.` },
  { question: 'AŞTİ ile Kızılay taksi ücreti ne kadar?', answer: `Yaklaşık 6 km için bekleme ve ek yol bedeli olmadan sarı taksi tahmini ${money(calculateFare(city, 6).total)} tutar. Gerçek rota ve trafik sonucu değiştirebilir.` },
];

export function AnkaraFareArticle() {
  const webApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Ankara Taksi Ücreti Hesaplayıcı',
    url: canonical('/ankara-taksi-ucreti/'),
    applicationCategory: 'TravelApplication',
    operatingSystem: 'Web',
    inLanguage: 'tr-TR',
    description: 'Ankara sarı taksi tarifesiyle mesafe, bekleme ve bilinen ek yol ücretlerine göre tahmini ücret hesaplar.',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'TRY' },
    publisher: { '@type': 'Organization', name: site.publisher, url: site.url },
  };

  return (
    <ArticlePage title={ankaraPageTitle} description={ankaraPageDescription} path="/ankara-taksi-ucreti/" modified={city.lastVerified} category="Şehirler" readingMinutes={8} faqs={faqs} additionalSchemas={[webApplicationSchema]}>
      <p>Ankara taksi ücreti sabit değildir. Açılış ücretine gidilen yol, varsa bekleme süresi ve bilinen ek yol bedelleri eklenir; hesap 200 TL’nin altında kalırsa minimum ücret uygulanır.</p>
      <section className="fare-answer-box" aria-label="Ankara 2026 taksi tarifesi özeti">
        <strong>Ankara sarı taksi tarifesi</strong>
        <dl>
          <div><dt>Açılış ücreti</dt><dd>65 TL</dd></div>
          <div><dt>Kilometre ücreti</dt><dd>40 TL</dd></div>
          <div><dt>Minimum / indi-bindi</dt><dd>200 TL</dd></div>
          <div><dt>Bekleme ücreti</dt><dd>7 TL/dk</dd></div>
          <div><dt>Geçerlilik tarihi</dt><dd>1 Mart 2026</dd></div>
        </dl>
        <p>Kaynak: <a href={city.sourceUrl} rel="external">Ankara Esnaf ve Sanatkârlar Odaları Birliği tarife komisyonu</a> · Son kontrol: <time dateTime={city.lastVerified}>{formatDate(city.lastVerified)}</time></p>
      </section>

      <p>Sayfadaki hesaplayıcı ve rota tahminleri aynı merkezi Ankara sarı taksi kaydından üretilir.</p>
      <TableOfContents items={[
        { id: 'hesaplama', label: 'Ankara taksi ücreti hesaplama' },
        { id: 'tarife', label: '2026 Ankara taksi tarifesi' },
        { id: 'rotalar', label: 'Popüler Ankara rota ücretleri' },
        { id: 'uygulama', label: 'Taksimetre ve yolculuk notları' },
        { id: 'kaynak', label: 'Tarife kaynağı ve doğrulama' },
        { id: 'sik-sorulan-sorular', label: 'Sık sorulan sorular' },
      ]}/>

      <section id="hesaplama">
        <h2>Ankara taksi ücreti hesaplama</h2>
        <p>Mesafeyi elle yazın, hızlı mesafe düğmelerini kullanın veya popüler bir Ankara rotasını seçerek yaklaşık kilometreyi yükleyin. Bekleme dakikası ve bildiğiniz yol ücretleri isteğe bağlıdır.</p>
        <Calculator fixedCity="ankara" distancePresets={ankaraRoutes}/>
      </section>

      <section id="tarife">
        <h2>2026 Ankara sarı taksi tarifesi</h2>
        <div className="table-wrap"><table><caption>1 Mart 2026’dan itibaren geçerli Ankara sarı taksi kalemleri</caption><thead><tr><th scope="col">Tarife kalemi</th><th scope="col">Tutar</th><th scope="col">Hesaptaki yeri</th></tr></thead><tbody>
          <tr><th scope="row">Açılış</th><td>{money(city.openingFare)}</td><td>Yolculuk başlangıcında</td></tr>
          <tr><th scope="row">Kilometre</th><td>{money(city.perKmFare)}</td><td>Gidilen her kilometre için</td></tr>
          <tr><th scope="row">Bekleme</th><td>{money(city.waitingFarePerMinute ?? 0)}/dk</td><td>Girilen bekleme süresi için</td></tr>
          <tr><th scope="row">Minimum / indi-bindi</th><td>{money(city.minimumFare)}</td><td>Hesabın alt sınırı</td></tr>
        </tbody></table></div>
        <p>Formül: <strong>açılış + (mesafe × kilometre tarifesi) + (bekleme × dakika tarifesi) + bilinen ek yol ücretleri</strong>. Ara toplam 200 TL’den düşükse toplam 200 TL’ye tamamlanır.</p>
      </section>

      <section id="rotalar">
        <h2>Popüler Ankara rota ücretleri</h2>
        <div className="table-wrap"><table><caption>Bekleme ve ek yol bedeli hariç yaklaşık sarı taksi tutarları</caption><thead><tr><th scope="col">Rota</th><th scope="col">Yaklaşık yol mesafesi</th><th scope="col">Sarı taksi tahmini</th></tr></thead><tbody>{ankaraRoutes.map((route) => <tr key={route.name}><th scope="row">{route.name}</th><td>{route.distanceKm} km</td><td>{money(calculateFare(city, route.distanceKm).total)}</td></tr>)}</tbody></table></div>
        <p>Mesafeler rota planlama tahminidir. Tam başlangıç ve bırakma adresi, tek yönler, trafik, duraklamalar ve seçilen yol gerçek taksimetre tutarını değiştirebilir. Havalimanı için <Link href="/havalimani-taksi-ucretleri/#esenboga">Esenboğa taksi yolculuğu notlarını</Link> da inceleyin.</p>
      </section>

      <section id="uygulama">
        <h2>Ankara’da taksimetre ve yolculuk notları</h2>
        <ul><li>Hesap yalnızca doğrulanmış Ankara sarı taksi tarifesini kullanır; İstanbul’dan kategori oranı türetilmez.</li><li>Ayrı bir gece tarifesi belirtilmez. Trafikte oluşan bekleme toplamı değiştirebilir.</li><li>Esenboğa yolculukları sabit fiyat değildir; gerçek mesafe ve bekleme taksimetreye yansır.</li><li>Kartla ödeme yapacaksanız cihaz durumunu binmeden önce teyit edin.</li></ul>
        <p><Link href="/">Ana taksi hesaplayıcısını</Link> kullanabilir, <Link href="/sehirler/">şehir tarifeleri merkezine</Link> dönebilir, <Link href="/indi-bindi-ucreti-nedir/">indi-bindi ücretinin nasıl uygulandığını</Link> veya <Link href="/taksi-ucreti-nasil-hesaplanir/">taksi ücretinin hesaplama adımlarını</Link> okuyabilirsiniz.</p>
      </section>

      <section className="source-box" id="kaynak">
        <h2>Tarife kaynağı ve doğrulama</h2>
        <p><strong>Geçerlilik tarihi:</strong> 1 Mart 2026 · <strong>Son kontrol:</strong> <time dateTime={city.lastVerified}>{formatDate(city.lastVerified)}</time></p>
        <p>Tarife değerleri, yetkili meslek kuruluşu olan <a href={city.sourceUrl} rel="external">Ankara Esnaf ve Sanatkârlar Odaları Birliği Ücret Tarifeleri Değerlendirme Komisyonu</a> kaydıyla izlenir. Yeni bir tarife kartı yayımlandığında merkezi veri güncellenmelidir.</p>
      </section>
    </ArticlePage>
  );
}
