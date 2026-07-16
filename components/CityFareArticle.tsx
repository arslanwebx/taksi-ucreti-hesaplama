import Link from 'next/link';
import type { Metadata } from 'next';
import { ArticlePage } from './ArticlePage';
import { Calculator } from './Calculator';
import { TableOfContents } from './TableOfContents';
import { fare, formatDate, money, sourceTierLabel, type PublishedCity } from '@/src/data/cities';
import { pageMetadata } from '@/lib/seo';

const trafficLawUrl='https://www.mevzuat.gov.tr/mevzuatmetin/1.5.2918.pdf';
const municipalLinks:Record<string,{label:string;url:string}>={
  istanbul:{label:'İBB TUHİM ücret tarifeleri arşivi',url:'https://tuhim.ibb.gov.tr/ucret-tarifeler/'},
  ankara:{label:'Ankara Büyükşehir Belediyesi UKOME kararları',url:'https://www.ankara.bel.tr/ukome'},
  izmir:{label:'İzmir Büyükşehir Belediyesi ulaşım duyuruları',url:'https://www.izmir.bel.tr/tr/Ulasim/23/81'},
  antalya:{label:'Antalya Büyükşehir Belediyesi ulaşım sayfası',url:'https://www.antalya.bel.tr/kurumsal/birimler/ulasim-planlama-ve-rayli-sistem-dairesi-baskanligi'},
};

const editorial:Record<string,{intro:string;routeAdvice:string;planning:string;mistake:string}>={
  istanbul:{
    intro:'İstanbul’da taksi ücretini belirleyen yalnızca kilometre değildir. Sarı, turkuaz, 8+1 ve siyah taksilerin tarifeleri farklıdır; iki yaka arasındaki rota, köprü veya tünel seçimi ve düşük hızda geçen süre toplamı belirgin biçimde değiştirebilir.',
    routeAdvice:'Aynı başlangıç ve varış noktası için sahil yolu, çevre yolu, köprü veya Avrasya Tüneli farklı mesafe ve geçiş bedeli oluşturabilir. Özellikle yaka değiştiren yolculuklarda hesaplamadan önce kullanılacak rotayı haritada kontrol edin.',
    planning:'Kısa şehir içi yolculukta minimum ücret, uzun veya yoğun trafikli yolculukta ise kilometre ile zaman bedeli daha önemlidir. Havalimanı ve karşı yaka rotalarında ücretli geçişi hesaplayıcıdaki ek ücret alanına ayrıca girmek gerekir.',
    mistake:'En sık hata, bir araç kategorisinin sonucunu başka kategori için geçerli sanmaktır. Taksinin rengini veya kategorisini seçmeden yapılan tahmin, doğru mesafe girilse bile yanıltıcı olabilir.',
  },
  ankara:{
    intro:'Ankara’da merkez içindeki kısa yolculuklarla Esenboğa, Batıkent veya Sincan yönündeki uzun rotalar aynı şekilde değerlendirilmez. Açılış ve kilometre bedeline ek olarak yoğun saatlerde bekleme süresi, özellikle ana arterlerde, tahmini yükseltebilir.',
    routeAdvice:'Kızılay, Çankaya ve AŞTİ çevresinde tek yönler ile kavşak düzeni haritadaki düz çizgiden daha uzun bir sürüş oluşturabilir. Esenboğa yönünde ise başlangıç mahallesi toplam mesafeyi ciddi biçimde değiştirir.',
    planning:'Kısa bir merkez yolculuğunda önce minimum ücret eşiğini kontrol edin. Çevre ilçeye veya havalimanına gidiyorsanız araçla rota mesafesini kullanın ve varsa otoyol bedelini ayrı değerlendirin.',
    mistake:'Kuş uçuşu mesafeyi taksimetre mesafesi sanmak Ankara için sık yapılan hatadır. Geniş bulvarlar hızlı görünse de dönüşler, alt geçitler ve bağlantı yolları gerçek mesafeyi uzatabilir.',
  },
  izmir:{
    intro:'İzmir sayfasındaki hesap merkez taksi tarifesini kullanır. Konak, Bornova, Karşıyaka ve Gaziemir arasında körfez çevresindeki yol seçimi mesafeyi etkiler; merkez dışındaki ilçelerde ise farklı bir yerel tarife bulunabilir.',
    routeAdvice:'Körfezin iki tarafındaki noktaları karşılaştırırken başlangıç semtini net seçin. Konak ile Karşıyaka arasında kullanılan bağlantı, yoğunluk ve yol çalışmaları hem süreyi hem de taksimetre mesafesini değiştirebilir.',
    planning:'Merkez ilçelerde hesaplayıcıdaki kilometre tahmini iyi bir başlangıçtır. Urla, Çeşme, Torbalı veya daha dış bir ilçede araca binmeden önce merkez tarifesinin geçerli olup olmadığını ayrıca sorun.',
    mistake:'İzmir genelinde tek tarife varmış gibi davranmak doğru değildir. Bu sayfadaki merkez tarifesini çevre ilçe yolculuğuna doğrudan uygulamak, olduğundan düşük veya yüksek sonuç verebilir.',
  },
  antalya:{
    intro:'Antalya hesaplayıcısı merkez tarifesine göre çalışır. Lara, Konyaaltı, Kaleiçi ve havalimanı çevresindeki yolculuklarda turizm sezonu trafiği süreyi uzatabilir; Alanya veya Gazipaşa gibi dış ilçelerde farklı tarifeler söz konusu olabilir.',
    routeAdvice:'Otel veya tesis adını değil, aracın gerçekten alacağı giriş noktasını haritada seçin. Büyük tatil tesislerinde ana yol ile lobi arasındaki ek mesafe ve yoğun saatlerdeki bekleme tahmini etkileyebilir.',
    planning:'Kaleiçi gibi araç erişiminin sınırlı olduğu bölgelerde bırakma noktasını önceden netleştirin. Belek, Kundu ve havalimanı yönünde merkez tarifesinin kapsamını ve olası ek yol bedellerini sürücüyle konuşun.',
    mistake:'Antalya merkez tarifesini bütün il sınırına uygulamak en önemli hatadır. İlçeler arası uzun bir yolculukta kalkış noktası, yerel tarife ve dönüş koşulları ayrıca doğrulanmalıdır.',
  },
};

export function cityFareMetadata(city: PublishedCity): Metadata {
  return pageMetadata(`${city.name} Taksi Ücreti Hesaplama 2026`, `${city.name} güncel taksi ücretini hesaplayın. Açılış, kilometre, minimum ücret, bekleme, örnek rotalar ve doğrulanmış tarife kaynağını inceleyin.`, city.path, 'article');
}

export function CityFareArticle({ city }: { city: PublishedCity }) {
  const title=`${city.name} Taksi Ücreti Hesaplama 2026`;
  const description=`${city.name} güncel taksi ücretini hesaplayın. Açılış, kilometre, minimum ücret, bekleme, örnek rotalar ve doğrulanmış tarife kaynağını inceleyin.`;
  const copy=editorial[city.slug] ?? {
    intro:`${city.name} taksi ücretinde açılış, kilometre, minimum ücret ve varsa bekleme bedeli birlikte değerlendirilir.`,
    routeAdvice:'Başlangıç ve varış noktasını haritada kesinleştirip kuş uçuşu yerine araç rotası mesafesini kullanın.',
    planning:'Kısa yolculuklarda minimum ücret, daha uzun yolculuklarda kilometre ve bekleme bedeli daha belirleyici olur.',
    mistake:'Güncel araç rotası yerine kuş uçuşu mesafeyi kullanmak tahmini yanıltabilir.',
  };
  const standard=city.categories[0]!;
  const municipal=municipalLinks[city.slug] ?? {label:`${city.name} belediyesi`,url:city.sourceUrl};
  const breakEven=Math.max(0,(standard.minimum-standard.opening)/standard.perKm);
  const examples=[3,10,20].map((km)=>({km,total:fare(city,km).total}));
  const faqs=[
    {question:`${city.name} taksi ücreti nasıl hesaplanır?`,answer:`Açılış bedeline gidilen kilometre için oluşan tutar ve varsa bekleme bedeli eklenir. Sonuç minimum ücretin altında kalırsa ${city.name} için geçerli minimum ücret uygulanır; ücretli geçişler ayrıca eklenir.`},
    {question:`${city.name} taksisinde minimum ücret ne zaman uygulanır?`,answer:`Standart kategoride açılış ve mesafe hesabı ${money(standard.minimum)} tutarına ulaşana kadar minimum ücret geçerlidir. Trafik, bekleme veya ek yol ücretleri bu değerlendirmeyi değiştirebilir.`},
    {question:`${city.name} için gece tarifesi var mı?`,answer:city.nightTariff.note},
    {question:'Hesaplayıcıdaki sonuç kesin midir?',answer:'Hayır. Sonuç planlama amaçlı tahmindir. Gerçek rota, düşük hızda geçen süre, araç kategorisi, ücretli geçişler ve yürürlüğe giren yeni kararlar nedeniyle taksimetre tutarı farklı olabilir.'},
  ];

  return <ArticlePage title={title} description={description} path={city.path} modified={city.verifiedDate} category="Şehirler" readingMinutes={9} faqs={faqs}>
    <p className="notice"><strong>Kısa cevap:</strong> {copy.intro}</p>
    <p>Bu sayfadaki hesaplayıcı, tarife tablosu ve örnek rotalar aynı merkezî veri kaydından üretilir. Böylece bir tarife güncellendiğinde sayfadaki rakamlar birlikte değişir; kesin yolculuk tutarını ise her zaman araçtaki taksimetre belirler.</p>
    <TableOfContents items={[{id:'hesaplama',label:`${city.name} taksi ücreti hesaplama`},{id:'tarife',label:'Tarife kalemleri nasıl okunur?'},{id:'ornekler',label:'Mesafeye göre örnek ücretler'},{id:'rotalar',label:'Rota ve yerel yolculuk notları'},{id:'hazirlik',label:'Yolculuktan önce kontrol listesi'},{id:'kaynak',label:'Kaynak ve doğrulama'},{id:'sik-sorulan-sorular',label:'Sık sorulan sorular'}]}/>

    <section id="hesaplama"><h2>{city.name} taksi ücreti hesaplama</h2><p>Harita uygulamasında araçla gidilecek yaklaşık mesafeyi bulun. Şehir ve varsa araç kategorisini seçtikten sonra kilometreyi girin. Trafikte düşük hızda kalma ihtimali veya köprü, tünel ve otoyol bedeli varsa ilgili alanları açarak ayrı ekleyin.</p><Calculator fixedCity={city.slug}/><p>Sonucu “sabit fiyat” olarak değil, yolculuk bütçesi için bir aralık belirleme aracı olarak değerlendirin. Haritanın önerdiği iki rota arasında kilometre farkı varsa her ikisini de hesaplamak daha gerçekçi bir alt ve üst tahmin verir.</p></section>

    <section id="tarife"><h2>Tarife kalemleri nasıl okunur?</h2><div className="table-wrap"><table><thead><tr><th>Araç türü</th><th>Açılış</th><th>Kilometre</th><th>Minimum</th><th>Bekleme / saat</th></tr></thead><tbody>{city.categories.map((category)=><tr key={category.id}><th scope="row">{category.name}</th><td>{money(category.opening)}</td><td>{money(category.perKm)}</td><td>{money(category.minimum)}</td><td>{category.waitingPerHour?money(category.waitingPerHour):'Yayımlanmamış'}</td></tr>)}</tbody></table></div><p><strong>Açılış bedeli</strong> taksimetre çalıştığında başlangıçta görülen tutardır. <strong>Kilometre bedeli</strong> araç ilerledikçe eklenir. <strong>Minimum ücret</strong> ise çok kısa yolculuklarda ödenecek alt sınırdır; normal tutarın üzerine ikinci kez eklenen bir ücret değildir.</p><p>Standart kategoride, yalnızca açılış ve mesafe hesabı dikkate alındığında minimum ücret eşiği yaklaşık <strong>{breakEven.toLocaleString('tr-TR',{maximumFractionDigits:2})} km</strong> civarındadır. Bu değer rota veya garanti edilen sabit mesafe değildir; bekleme bedeli devreye girerse eşik daha erken aşılabilir.</p><p>{city.nightTariff.note}</p></section>

    <section id="ornekler"><h2>Mesafeye göre örnek ücretler</h2><p>Aşağıdaki sonuçlar standart araç kategorisi, sıfır bekleme ve sıfır ek yol ücreti varsayımıyla hesaplanır. Amaç farklı mesafelerde tarifenin nasıl davrandığını göstermektir.</p><div className="table-wrap"><table><thead><tr><th>Örnek mesafe</th><th>Beklemesiz tahmin</th><th>Yorum</th></tr></thead><tbody>{examples.map((example)=><tr key={example.km}><th scope="row">{example.km} km</th><td>{money(example.total)}</td><td>{standard.opening+example.km*standard.perKm<standard.minimum?'Minimum ücret uygulanır.':'Açılış ve kilometre hesabı minimumu aşar.'}</td></tr>)}</tbody></table></div><p>{copy.planning}</p><p><Link href="/indi-bindi-ucreti-nedir/">Minimum ücretin nasıl çalıştığını</Link> veya <Link href="/taksi-ucreti-nasil-hesaplanir/">taksi hesabının bütün kalemlerini</Link> ayrıntılı okuyabilirsiniz.</p></section>

    <section id="rotalar"><h2>Rota ve yerel yolculuk notları</h2><p>{copy.routeAdvice}</p><div className="table-wrap"><table><thead><tr><th>Rota</th><th>Örnek mesafe</th><th>Beklemesiz standart tahmin</th></tr></thead><tbody>{city.routes.map((route)=><tr key={route.name}><th scope="row">{route.name}</th><td>{route.km} km</td><td>{money(fare(city,route.km).total)}</td></tr>)}</tbody></table></div><p>Tablodaki mesafeler başlangıç noktası kesinleştirilmeden hazırlanmış planlama örnekleridir. Güncel navigasyon mesafesi, seçilen cadde ve bırakma noktası gerçek uzunluğu değiştirir.</p><ul>{city.local.map((note)=><li key={note}>{note}</li>)}{city.extras.map((note)=><li key={note}>{note}</li>)}</ul>{city.airport&&<p><Link href={city.airport.path}>{city.airport.name} yolculuk seçeneklerini inceleyin</Link>.</p>}</section>

    <section id="hazirlik"><h2>Yolculuktan önce kontrol listesi</h2><ol><li>Haritada kuş uçuşu değil, araç rotası mesafesini kontrol edin.</li><li>Taksi kategorisi varsa araca binmeden önce doğru kategoriyi seçin.</li><li>Taksimetrenin yolculuk başında açıldığını kontrol edin.</li><li>Ücretli yol seçeneğini ve geçiş bedelini sürücüyle netleştirin.</li><li>Ödeme sonunda mümkünse fiş veya yolculuk kaydını saklayın.</li></ol><p><strong>Yaygın hata:</strong> {copy.mistake}</p><p>Tarife veya hizmetle ilgili belgelenebilir bir sorun için ilgili belediyenin başvuru kanalını ya da <a href="https://www.turkiye.gov.tr/sikayet-ve-bilgi-edinme-hizmetleri" rel="external">e-Devlet şikâyet ve bilgi edinme hizmetlerini</a> kullanabilirsiniz.</p></section>

    <section className="source-box" id="kaynak"><h2>Kaynak ve doğrulama</h2><p><strong>{sourceTierLabel[city.sourceTier]}:</strong> {city.sourceName}. Tarife <time dateTime={city.effectiveDate}>{formatDate(city.effectiveDate)}</time> tarihinde yürürlüğe girdi ve <time dateTime={city.verifiedDate}>{formatDate(city.verifiedDate)}</time> tarihinde yeniden kontrol edildi.</p><ul><li><a href={city.sourceUrl} rel="external">Kullanılan tarife kaynağını aç</a></li><li><a href={municipal.url} rel="external">{municipal.label}</a></li><li><a href={trafficLawUrl} rel="external">2918 sayılı Karayolları Trafik Kanunu</a></li></ul><p>Kaynak tarihi yeni bir karar nedeniyle değişirse hesaplayıcı güncellenene kadar sayfadaki “son kontrol” tarihini dikkate alın. Güncel belgeyi bulduğunuz hâlde burada farklı bir tarife görüyorsanız <Link href="/iletisim/">düzeltme talebi gönderin</Link>.</p></section>
  </ArticlePage>;
}
