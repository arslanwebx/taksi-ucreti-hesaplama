import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticlePage } from '@/components/ArticlePage';
import { Calculator } from '@/components/Calculator';
import { TableOfContents } from '@/components/TableOfContents';
import { fareCategories, faresByCategory, formatDate, money, publishedCities } from '@/src/data/cities';
import { pageMetadata } from '@/lib/seo';

const city = publishedCities.find((item) => item.slug === 'istanbul')!;
const routes = [['Taksim', 42], ['Sultanahmet', 47], ['Beşiktaş', 44], ['Kadıköy', 60], ['Sabiha Gökçen Havalimanı', 80]] as const;
const title = 'İstanbul Havalimanı Taksi Ücreti 2026';
const description = 'İstanbul Havalimanı taksi ücretini güncel İstanbul tarife kaydıyla hesaplayın; örnek rotaları, ücretli yol etkisini ve kaynak bilgisini inceleyin.';
const path = '/istanbul-havalimani-taksi-ucreti/';
const faqs = [
  { question: 'İstanbul Havalimanı taksi ücreti sabit midir?', answer: 'Hayır. Yolculuk taksimetre üzerinden hesaplanır. Gerçek rota ve ücretli yol tercihi toplamı değiştirebilir.' },
  { question: 'İstanbul Havalimanı ile Taksim arası taksi kaç TL tutar?', answer: 'Tutar seyahat anındaki rotaya bağlıdır. Sayfadaki örnek yaklaşık 42 km ve ek ücret hariç hesaplanır; güncel harita mesafesini hesaplayıcıya girmek daha doğru sonuç verir.' },
  { question: 'Hesaplayıcı trafik veya bekleme ücreti ekliyor mu?', answer: 'Hayır. Hesaplayıcı yalnızca açılış, kilometre ve minimum ücret kuralını uygular. Köprü, tünel veya otoyol gibi bildiğiniz bedelleri ek ücret alanına kendiniz girebilirsiniz.' },
  { question: 'Köprü veya otoyol ücreti temel tahmine dahil midir?', answer: 'Hayır. Kullanılacak rota ve geçiş bedelini sürücüyle önceden netleştirip hesaplayıcıdaki ek ücret alanına ayrıca yazmanız gerekir.' },
];

export const metadata: Metadata = pageMetadata(title, description, path, 'article');

export default function IstanbulAirport() {
  const categories = fareCategories(city);
  return (
    <ArticlePage title={title} description={description} path={path} modified={city.lastVerified} category="Havalimanı Taksi Ücretleri" readingMinutes={9} faqs={faqs}>
      <p className="notice"><strong>Kısa cevap:</strong> İstanbul Havalimanı için şehir merkezine sabit taksi fiyatı yoktur. Temel tahmin açılış ücreti, araç rotası kilometresi ve minimum ücret kuralıyla hesaplanır; ücretli geçişler ayrıca eklenir.</p>
      <p>Havalimanının büyük bir alana yayılması, otel veya semtin farklı giriş noktaları ve rota seçenekleri nedeniyle internette görülen tek bir rakam her yolculuğa uymaz. En sağlıklı yöntem, güncel araç rotası mesafesini bulup hesaplayıcıya girmektir.</p>
      <TableOfContents items={[
        { id: 'hesaplama', label: 'İstanbul Havalimanı taksi hesaplama' },
        { id: 'tarife', label: 'Kullanılan İstanbul tarifesi' },
        { id: 'rotalar', label: 'Popüler varış noktaları' },
        { id: 'rota-etkisi', label: 'Rota ve ücretli yol etkisi' },
        { id: 'hazirlik', label: 'Terminalde taksiye binmeden önce' },
        { id: 'alternatifler', label: 'Taksi dışındaki ulaşım seçenekleri' },
        { id: 'kaynak', label: 'Tarife ve ulaşım kaynakları' },
        { id: 'sik-sorulan-sorular', label: 'Sık sorulan sorular' },
      ]}/>

      <section id="hesaplama">
        <h2>İstanbul Havalimanı taksi ücreti hesaplama</h2>
        <p>Harita uygulamasında İstanbul Havalimanı’nı başlangıç, gerçek otel veya bırakma noktasını varış olarak seçin. Görünen araç mesafesini aşağıdaki hesaplayıcıya girin. Ücretli yol bedelini biliyorsanız ek ücret alanından ayrıca ekleyin.</p>
        <Calculator fixedCity="istanbul"/>
        <p>Harita birden fazla rota sunuyorsa kısa rota ile hızlı rotayı ayrı ayrı hesaplayın. Böylece tek bir kesin rakam yerine olası yol tercihlerini yansıtan daha gerçekçi bir aralık elde edersiniz.</p>
      </section>

      <section id="tarife">
        <h2>Kullanılan İstanbul tarifesi</h2>
        <div className="table-wrap"><table><thead><tr><th>Tarife</th><th>Açılış</th><th>Kilometre</th><th>Minimum</th></tr></thead><tbody>{categories.map((category) => <tr key={category.id}><th scope="row">{category.label}</th><td>{money(category.tariff.openingFare)}</td><td>{money(category.tariff.perKmFare)}</td><td>{money(category.tariff.minimumFare)}</td></tr>)}</tbody></table></div>
        <p>Hesaplayıcı Sarı, Turkuaz ve Siyah VIP taksi tutarlarını birlikte gösterir. İstanbul kategori değerleri güncel İBB taksi taşımacılığı ücret tarifesindeki oranlara dayanır. Otomatik trafik ücreti eklenmez.</p>
      </section>

      <section id="rotalar">
        <h2>Popüler varış noktaları için örnekler</h2>
        <div className="table-wrap"><table><thead><tr><th>Varış</th><th>Örnek mesafe</th>{categories.map((category) => <th key={category.id}>{category.shortLabel}</th>)}</tr></thead><tbody>{routes.map(([name, km]) => <tr key={name}><th scope="row">{name}</th><td>{km} km</td>{faresByCategory(city, km).map((category) => <td key={category.id}>{money(category.total)}</td>)}</tr>)}</tbody></table></div>
        <p>Mesafeler yalnızca planlama örneğidir. Terminal çıkış noktası, otelin bulunduğu sokak, yol çalışması, karşı yaka geçişi ve güncel navigasyon rotası gerçek kilometreyi değiştirebilir.</p>
        <p>Kadıköy veya Sabiha Gökçen Havalimanı gibi karşı yaka varışlarında köprü veya tünel seçimi ayrıca önem kazanır. Geçiş bedeli tabloda yer alan temel tahmine dahil değildir.</p>
      </section>

      <section id="rota-etkisi">
        <h2>Rota ve ücretli yol toplamı nasıl değiştirir?</h2>
        <h3>Güncel araç rotası</h3>
        <p>Trafik ve yol çalışmaları navigasyonun önerdiği güzergâhı değiştirebilir. Hesaplayıcı bekleme süresini fiyatlandırmaz; bu nedenle sonuç kilometreye dayalı bir planlama değeridir.</p>
        <h3>Otoyol ve köprü tercihi</h3>
        <p>Kuzey Marmara Otoyolu, köprüler veya Avrasya Tüneli daha hızlı bir rota sağlayabilir; ancak geçiş tutarı doğurur. Daha ucuz görünen ücretsiz rota ise daha uzun mesafe oluşturabilir.</p>
        <h3>Bırakma noktasının kesinliği</h3>
        <p>“Taksim” gibi geniş bir bölge yerine otelin veya adresin tam konumunu kullanın. Birkaç kilometrelik son bölüm dahi tahmini belirgin biçimde değiştirebilir.</p>
      </section>

      <section id="hazirlik">
        <h2>Terminalde taksiye binmeden önce</h2>
        <ol><li>Terminalde yönlendirilmiş resmî taksi alanını kullanın.</li><li>Taksimetrenin yolculuk başında açıldığını kontrol edin.</li><li>Varış adresini haritada gösterip tercih edilen rotayı netleştirin.</li><li>Ücretli yol kullanılacaksa geçiş bedelinin nasıl ekleneceğini sorun.</li><li>Plaka ve ödeme kaydını yolculuk bitene kadar saklayın.</li></ol>
        <p>DHMİ, İstanbul Havalimanı’na metro, otobüs, taksi ve özel araçla erişilebildiğini belirtir. Güncel terminal ulaşım bilgisini <a href="https://www.dhmi.gov.tr/Sayfalar/Havalimani/Istanbul/Ulasim.aspx" rel="external">DHMİ İstanbul Havalimanı ulaşım sayfasından</a> kontrol edebilirsiniz.</p>
      </section>

      <section id="alternatifler">
        <h2>Taksi dışındaki ulaşım seçenekleri</h2>
        <p>Tek kişi ve az bagajla seyahat ediyorsanız metro veya otobüs toplam maliyeti düşürebilir. Birden fazla yolcu, fazla bagaj veya kapıdan kapıya ulaşım ihtiyacında taksi daha pratik olabilir.</p>
        <ul><li><strong>M11 metro:</strong> Raylı sistem bağlantısı uygun olan varışlar için trafikten daha az etkilenir.</li><li><strong>Havaist ve İETT:</strong> Güzergâh ve saat uygun olduğunda ekonomik alternatif sunar.</li><li><strong>Taksi:</strong> Doğrudan adrese ulaşım ve bagaj kolaylığı sağlar; rota ve ücretli geçiş maliyeti yükseltebilir.</li></ul>
        <p><Link href="/istanbul-taksi-ucreti/">İstanbul şehir içi taksi tarifesini</Link> ve <Link href="/havalimani-taksi-ucretleri/">diğer havalimanı yolculuk rehberlerini</Link> de inceleyebilirsiniz.</p>
      </section>

      <section className="source-box" id="kaynak">
        <h2>Tarife ve ulaşım kaynakları</h2>
        <p><strong>Tarife referansı:</strong> {city.referenceDate}. Tarife kaydı <time dateTime={city.lastVerified}>{formatDate(city.lastVerified)}</time> tarihinde yeniden kontrol edilmiştir.</p>
        <ul><li><a href={city.sourceUrl} rel="external">Kullanılan İstanbul tarife kaynağı</a></li><li><a href="https://tuhim.ibb.gov.tr/ucret-tarifeler/" rel="external">İBB TUHİM güncel ücret tarifeleri arşivi</a></li><li><a href="https://www.dhmi.gov.tr/Sayfalar/Havalimani/Istanbul/Ulasim.aspx" rel="external">DHMİ İstanbul Havalimanı ulaşım bilgileri</a></li></ul>
        <p>Yeni bir karar yayımlandıysa ancak hesaplayıcı henüz farklı görünüyorsa belge bağlantısıyla <Link href="/iletisim/">tarife düzeltmesi bildirin</Link>.</p>
      </section>
    </ArticlePage>
  );
}
