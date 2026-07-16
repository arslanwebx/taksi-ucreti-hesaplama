import Link from 'next/link';
import type { Metadata } from 'next';
import { ArticlePage } from './ArticlePage';
import { Calculator } from './Calculator';
import { TableOfContents } from './TableOfContents';
import { fare, formatDate, money, type PublishedCity } from '@/src/data/cities';
import { pageMetadata } from '@/lib/seo';

const trafficLawUrl = 'https://www.mevzuat.gov.tr/mevzuatmetin/1.5.2918.pdf';
const municipalLinks: Record<string, { label: string; url: string }> = {
  istanbul: { label: 'İBB TUHİM ücret tarifeleri arşivi', url: 'https://tuhim.ibb.gov.tr/ucret-tarifeler/' },
  ankara: { label: 'Ankara Büyükşehir Belediyesi UKOME kararları', url: 'https://www.ankara.bel.tr/ukome' },
  izmir: { label: 'İzmir Büyükşehir Belediyesi ulaşım duyuruları', url: 'https://www.izmir.bel.tr/tr/Ulasim/23/81' },
  antalya: { label: 'Antalya Büyükşehir Belediyesi ulaşım sayfası', url: 'https://www.antalya.bel.tr/kurumsal/birimler/ulasim-planlama-ve-rayli-sistem-dairesi-baskanligi' },
};

const editorial: Record<string, { intro: string; routeAdvice: string; planning: string; mistake: string }> = {
  istanbul: {
    intro: 'İstanbul taksi tahmini açılış bedeli, gidilen kilometre ve minimum ücret kuralıyla hesaplanır. İki yaka arasındaki rota ile köprü, tünel veya otoyol tercihi toplam bütçeyi ayrıca etkileyebilir.',
    routeAdvice: 'Aynı başlangıç ve varış noktası için sahil yolu, çevre yolu, köprü veya Avrasya Tüneli farklı mesafe ve geçiş bedeli oluşturabilir. Özellikle yaka değiştiren yolculuklarda rotayı haritada kontrol edin.',
    planning: 'Kısa şehir içi yolculukta minimum ücret, uzun yolculukta ise kilometre bedeli daha belirleyicidir. Ücretli geçiş tutarını biliyorsanız hesaplayıcıya ayrıca ekleyin.',
    mistake: 'Kuş uçuşu mesafeyi yol mesafesi sanmak ve ücretli geçişi temel tarifeye dahil kabul etmek, İstanbul tahminlerinde en sık görülen iki hatadır.',
  },
  ankara: {
    intro: 'Ankara’da merkez içindeki kısa yolculuklarla Esenboğa, Batıkent veya Sincan yönündeki uzun rotalar arasında belirgin mesafe farkı vardır. Hesap açılış, kilometre ve minimum ücret verilerini kullanır.',
    routeAdvice: 'Kızılay, Çankaya ve AŞTİ çevresinde tek yönler ile kavşak düzeni haritadaki düz çizgiden daha uzun bir sürüş oluşturabilir. Esenboğa yönünde başlangıç mahallesi toplam mesafeyi ciddi biçimde değiştirir.',
    planning: 'Kısa bir merkez yolculuğunda önce minimum ücret eşiğini kontrol edin. Çevre ilçeye veya havalimanına gidiyorsanız güncel araç rotası mesafesini kullanın.',
    mistake: 'Kuş uçuşu mesafeyi taksimetre mesafesi sanmak Ankara için sık yapılan hatadır. Bağlantı yolları ve dönüşler gerçek kilometreyi uzatabilir.',
  },
  izmir: {
    intro: 'İzmir sayfasındaki hesap merkez tarife kaydını kullanır. Konak, Bornova, Karşıyaka ve Gaziemir arasındaki yol seçimi mesafeyi etkiler; çevre ilçelerde yerel tarife farklı olabilir.',
    routeAdvice: 'Körfezin iki tarafındaki noktaları karşılaştırırken başlangıç ve bırakma adresini net seçin. Yol çalışmaları ve seçilen bağlantı gerçek taksimetre mesafesini değiştirebilir.',
    planning: 'Merkez ilçelerde hesaplayıcıdaki kilometre tahmini iyi bir başlangıçtır. Urla, Çeşme, Torbalı veya daha dış bir ilçede yerel tarifeyi ayrıca sorun.',
    mistake: 'İzmir genelinde tek tarife varmış gibi davranmak doğru değildir. Merkez verisini çevre ilçe yolculuğuna doğrudan uygulamak yanıltıcı olabilir.',
  },
  antalya: {
    intro: 'Antalya hesaplayıcısı merkez tarife kaydına göre çalışır. Lara, Konyaaltı, Kaleiçi ve havalimanı çevresindeki yolculuklarda doğru araç rotasını kullanmak önemlidir.',
    routeAdvice: 'Otel veya tesis adını değil, aracın gerçekten alacağı giriş noktasını haritada seçin. Büyük tatil tesislerinde ana yol ile lobi arasındaki mesafe sonucu etkileyebilir.',
    planning: 'Kaleiçi gibi araç erişiminin sınırlı olduğu bölgelerde bırakma noktasını önceden netleştirin. Belek, Kundu ve havalimanı yönünde olası ücretli yol bedellerini ayrıca değerlendirin.',
    mistake: 'Antalya merkez tarifesini bütün il sınırına uygulamak en önemli hatadır. İlçeler arası yolculukta yerel tarife ayrıca doğrulanmalıdır.',
  },
};

const seoTitles: Record<string, string> = {
  ankara: 'Ankara Taksi Ücreti Hesaplama 2026 – Kaç TL Tutar?',
  istanbul: 'İstanbul Taksi Ücreti Hesaplama | Güncel Fiyatlar 2026',
  antalya: 'Antalya Taksi Ücreti Hesaplama | Güncel Tarife 2026',
  izmir: 'İzmir Taksi Ücreti Hesaplama | Güncel Fiyatlar 2026',
};

export function cityFareMetadata(city: PublishedCity): Metadata {
  return pageMetadata(
    seoTitles[city.slug] ?? `${city.city} Taksi Ücreti Hesaplama 2026`,
    `${city.city} taksi ücretini açılış, kilometre ve minimum ücret verileriyle hesaplayın; örnek rotaları, kaynak ve son kontrol bilgisini inceleyin.`,
    city.path,
    'article',
  );
}

export function CityFareArticle({ city }: { city: PublishedCity }) {
  const title = `${city.city} Taksi Ücreti Hesaplama 2026`;
  const description = `${city.city} taksi ücretini açılış, kilometre ve minimum ücret verileriyle hesaplayın; örnek rotaları, kaynak ve son kontrol bilgisini inceleyin.`;
  const copy = editorial[city.slug] ?? {
    intro: `${city.city} taksi tahmini açılış, kilometre ve minimum ücret verileriyle hesaplanır.`,
    routeAdvice: 'Başlangıç ve varış noktasını haritada kesinleştirip kuş uçuşu yerine araç rotası mesafesini kullanın.',
    planning: 'Kısa yolculuklarda minimum ücret, daha uzun yolculuklarda kilometre bedeli daha belirleyici olur.',
    mistake: 'Güncel araç rotası yerine kuş uçuşu mesafeyi kullanmak tahmini yanıltabilir.',
  };
  const municipal = municipalLinks[city.slug] ?? { label: `${city.city} belediyesi`, url: city.sourceUrl };
  const breakEven = Math.max(0, (city.minimumFare - city.openingFare) / city.perKmFare);
  const examples = [3, 10, 20].map((km) => ({ km, total: fare(city, km).total }));
  const faqs = [
    { question: `${city.city} taksi ücreti nasıl hesaplanır?`, answer: `Açılış ücretine kilometre başına tarife eklenir. Hesap ${money(city.minimumFare)} tutarının altında kalırsa minimum ücret uygulanır; kullanıcının girdiği köprü, tünel veya otoyol bedeli ayrıca eklenir.` },
    { question: `${city.city} taksisinde minimum ücret ne zaman uygulanır?`, answer: `Açılış ve mesafe toplamı ${money(city.minimumFare)} tutarına ulaşana kadar minimum ücret geçerlidir. Bu tutar normal hesabın üzerine ikinci kez eklenmez.` },
    { question: 'Köprü, tünel ve otoyol ücreti dahil mi?', answer: 'Hayır. Bu bedeller şehir tarifesinin kilometre hesabından ayrıdır. Bildiğiniz ek tutarı hesaplayıcıdaki ek ücret alanına yazabilirsiniz.' },
    { question: 'Hesaplayıcıdaki sonuç kesin midir?', answer: 'Hayır. Sonuç planlama amaçlı tahmindir. Gerçek rota, yol çalışması, trafik, yerel uygulama ve yeni tarife kararları nedeniyle taksimetre tutarı farklı olabilir.' },
  ];

  return (
    <ArticlePage title={title} description={description} path={city.path} modified={city.lastVerified} category="Şehirler" readingMinutes={9} faqs={faqs}>
      <p className="notice"><strong>Kısa cevap:</strong> {copy.intro}</p>
      {city.isEstimated && <p className="notice"><strong>Tahmini veri:</strong> Bu şehir için kullanılan tarife mevcut kaynaklara dayalı tahmini bir değerdir. Güncel taksimetre tutarı farklı olabilir.</p>}
      <p>Bu sayfadaki hesaplayıcı, tarife tablosu ve örnek rotalar aynı merkezî veri kaydından üretilir. Böylece rakamlar birbiriyle tutarlı kalır. Kesin yolculuk tutarını ise her zaman araçtaki taksimetre belirler.</p>
      <TableOfContents items={[
        { id: 'hesaplama', label: `${city.city} taksi ücreti hesaplama` },
        { id: 'tarife', label: 'Tarife kalemleri nasıl okunur?' },
        { id: 'ornekler', label: 'Mesafeye göre örnek ücretler' },
        { id: 'rotalar', label: 'Rota ve yerel yolculuk notları' },
        { id: 'hazirlik', label: 'Yolculuktan önce kontrol listesi' },
        { id: 'kaynak', label: 'Kaynak ve doğrulama' },
        { id: 'sik-sorulan-sorular', label: 'Sık sorulan sorular' },
      ]}/>

      <section id="hesaplama">
        <h2>{city.city} taksi ücreti hesaplama</h2>
        <p>Harita uygulamasında araçla gidilecek yaklaşık mesafeyi bulun ve kilometreyi girin. Köprü, tünel, otoyol veya bildiğiniz başka bir ek tutar varsa ek ücret alanını açın. Hesaplayıcı trafik ya da bekleme için kendiliğinden ücret eklemez.</p>
        <Calculator fixedCity={city.slug}/>
        <p>Sonucu sabit fiyat olarak değil, yolculuk bütçesi için bir planlama değeri olarak kullanın. Haritanın önerdiği rotalar arasında kilometre farkı varsa her rotayı ayrı hesaplayarak olası aralığı görebilirsiniz.</p>
      </section>

      <section id="tarife">
        <h2>Tarife kalemleri nasıl okunur?</h2>
        <div className="table-wrap"><table><thead><tr><th>Tarife</th><th>Açılış</th><th>Kilometre</th><th>Minimum</th></tr></thead><tbody><tr><th scope="row">{city.city}</th><td>{money(city.openingFare)}</td><td>{money(city.perKmFare)}</td><td>{money(city.minimumFare)}</td></tr></tbody></table></div>
        <p><strong>Açılış ücreti</strong> yolculuğun başlangıç tutarıdır. <strong>Kilometre bedeli</strong> gidilen mesafeyle çarpılır. <strong>Minimum ücret</strong> ise kısa yolculuklarda ödenecek alt sınırdır; normal tutarın üzerine ikinci kez eklenmez.</p>
        <p>Yalnızca açılış ve mesafe hesabı dikkate alındığında minimum ücret eşiği yaklaşık <strong>{breakEven.toLocaleString('tr-TR', { maximumFractionDigits: 2 })} km</strong> civarındadır. Bu değer sabit rota garantisi değildir.</p>
      </section>

      <section id="ornekler">
        <h2>Mesafeye göre örnek ücretler</h2>
        <p>Aşağıdaki sonuçlar ek ücret girilmeden hesaplanır. Amaç, tarifenin farklı mesafelerde nasıl davrandığını anlaşılır biçimde göstermektir.</p>
        <div className="table-wrap"><table><thead><tr><th>Örnek mesafe</th><th>Temel tahmin</th><th>Yorum</th></tr></thead><tbody>{examples.map((example) => <tr key={example.km}><th scope="row">{example.km} km</th><td>{money(example.total)}</td><td>{city.openingFare + example.km * city.perKmFare < city.minimumFare ? 'Minimum ücret uygulanır.' : 'Açılış ve kilometre hesabı minimumu aşar.'}</td></tr>)}</tbody></table></div>
        <p>{copy.planning}</p>
        <p><Link href="/indi-bindi-ucreti-nedir/">Minimum ücretin nasıl çalıştığını</Link> veya <Link href="/taksi-ucreti-nasil-hesaplanir/">taksi hesabının bütün kalemlerini</Link> ayrıntılı okuyabilirsiniz.</p>
      </section>

      <section id="rotalar">
        <h2>Rota ve yerel yolculuk notları</h2>
        <p>{copy.routeAdvice}</p>
        <div className="table-wrap"><table><thead><tr><th>Rota</th><th>Örnek mesafe</th><th>Ek ücretsiz tahmin</th></tr></thead><tbody>{city.routes.map((route) => <tr key={route.name}><th scope="row">{route.name}</th><td>{route.km} km</td><td>{money(fare(city, route.km).total)}</td></tr>)}</tbody></table></div>
        <p>Tablodaki mesafeler planlama örnekleridir. Başlangıç adresi, seçilen cadde ve bırakma noktası gerçek uzunluğu değiştirebilir.</p>
        <ul>{city.local.map((note) => <li key={note}>{note}</li>)}{city.extras.map((note) => <li key={note}>{note}</li>)}</ul>
        {city.airport && <p><Link href={city.airport.path}>{city.airport.name} yolculuk seçeneklerini inceleyin</Link>.</p>}
      </section>

      <section id="hazirlik">
        <h2>Yolculuktan önce kontrol listesi</h2>
        <ol><li>Haritada kuş uçuşu değil, araç rotası mesafesini kontrol edin.</li><li>Taksimetrenin yolculuk başında açıldığını kontrol edin.</li><li>Ücretli yol seçeneğini ve geçiş bedelini sürücüyle netleştirin.</li><li>İlçe tarifesi farklı olabilecek yolculuklarda yerel uygulamayı sorun.</li><li>Ödeme sonunda mümkünse fiş veya yolculuk kaydını saklayın.</li></ol>
        <p><strong>Yaygın hata:</strong> {copy.mistake}</p>
        <p>Tarife veya hizmetle ilgili belgelenebilir bir sorun için ilgili belediyenin başvuru kanalını ya da <a href="https://www.turkiye.gov.tr/sikayet-ve-bilgi-edinme-hizmetleri" rel="external">e-Devlet şikâyet ve bilgi edinme hizmetlerini</a> kullanabilirsiniz.</p>
      </section>

      <section className="source-box" id="kaynak">
        <h2>Kaynak ve doğrulama</h2>
        <p><strong>Tarife referansı:</strong> {city.referenceDate}. Kayıt <time dateTime={city.lastVerified}>{formatDate(city.lastVerified)}</time> tarihinde yeniden kontrol edildi.</p>
        <ul><li><a href={city.sourceUrl} rel="external">Kullanılan tarife kaynağını aç</a></li><li><a href={municipal.url} rel="external">{municipal.label}</a></li><li><a href={trafficLawUrl} rel="external">2918 sayılı Karayolları Trafik Kanunu</a></li></ul>
        <p>Yeni bir karar yayımlandığı hâlde burada farklı bir tarife görüyorsanız belge bağlantısıyla <Link href="/iletisim/">düzeltme talebi gönderin</Link>.</p>
      </section>
    </ArticlePage>
  );
}
