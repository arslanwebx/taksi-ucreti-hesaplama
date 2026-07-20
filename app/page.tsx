import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator } from '@/components/Calculator';
import { AuthorBox } from '@/components/AuthorBox';
import { BlogCard } from '@/components/BlogCard';
import { CityDirectory } from '@/components/CityDirectory';
import { JsonLd } from '@/components/JsonLd';
import { posts } from '@/src/data/posts';
import { canonical, site } from '@/src/data/site';
import { pageMetadata } from '@/lib/seo';

const title = 'Taksi Ücreti Hesaplama 2026 | 81 İl Güncel Taksi Tarifesi';
const description = 'Şehrinizi seçin, mesafeyi girin ve açılış, kilometre ve minimum ücret tarifesine göre tahmini taksi ücretinizi hesaplayın. 81 il ve kaynak bilgileri.';
export const metadata: Metadata = pageMetadata(title, description, '/');

const faqs = [
  ['Taksi ücreti nasıl hesaplanır?', 'Açılış ücretine araçla gidilecek mesafenin kilometre karşılığı eklenir. Belgelenmiş bir bekleme tarifesi varsa bekleme tutarı, kullanıcının girdiği köprü veya otoyol bedeli de hesaba katılır. Toplam minimum ücretin altında kalırsa minimum ücret uygulanır.'],
  ['İndi bindi ücreti nedir?', 'İndi bindi, kısa yolculuklarda uygulanan minimum yolculuk ücretidir. Hesaplanan tutarın üzerine eklenen ikinci bir ücret değildir.'],
  ['Taksi kilometre ücreti şehirden şehre değişir mi?', 'Evet. Açılış, kilometre ve minimum ücretler il bazında değişebilir. Bazı ilçelerde veya belgelenmiş araç türlerinde farklı yerel tarifeler de bulunabilir.'],
  ['Hangi mesafeyi girmeliyim?', 'Bir harita uygulamasındaki araçla gidilecek yol mesafesini kullanın. Kuş uçuşu uzaklık taksi rotasını doğru yansıtmaz.'],
  ['Trafik taksi ücretini artırır mı?', 'Trafik gerçek taksimetre tutarını etkileyebilir. Ancak sitede belgelenmiş bir bekleme tarifesi olmayan şehirler için otomatik bekleme ücreti eklenmez.'],
  ['Bekleme ücreti hesaplamaya dahil mi?', 'Yalnızca seçilen şehir kaydında dakika başına belgelenmiş bir bekleme tarifesi varsa bekleme alanı gösterilir. Mevcut veri setinde bu alanı destekleyen şehir bulunmadığından bekleme ücreti otomatik eklenmez.'],
  ['Köprü ve otoyol ücretleri dahil mi?', 'Hayır. Bildiğiniz köprü, tünel veya otoyol bedelini ek geçiş ücreti alanına ayrıca yazmanız gerekir.'],
  ['Gece tarifesi uygulanıyor mu?', 'Türkiye genelinde geçerli tek bir gece tarifesi yoktur. Hesaplayıcı, şehir kaydında belgelenmeyen bir gece katsayısı uygulamaz.'],
  ['Hesaplanan ücret kesin midir?', 'Hayır. Sonuç planlama amaçlı tahmindir. Gerçek rota, trafik, yerel uygulama, tarife değişikliği ve ücretli geçişler nedeniyle taksimetre tutarı farklı olabilir.'],
  ['Tarifeler ne sıklıkla güncellenir?', 'Kaynaklar dönemsel olarak ve kullanıcı düzeltme bildirimleri geldiğinde kontrol edilir. Her sonuçta kullanılan referans, kaynak bağlantısı ve son kontrol tarihi gösterilir.'],
] as const;

const guidePosts = posts.filter((post) => post.category === 'Şehirler');

export default function HomePage() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'WebSite', '@id': canonical('/#website'), url: canonical('/'), name: site.name, inLanguage: 'tr-TR', publisher: { '@id': canonical('/#organization') } },
      { '@type': 'WebPage', '@id': canonical('/#webpage'), url: canonical('/'), name: title, description, inLanguage: 'tr-TR', isPartOf: { '@id': canonical('/#website') }, about: { '@id': canonical('/#calculator') }, author: { '@id': canonical('/#author') }, breadcrumb: { '@id': canonical('/#breadcrumb') } },
      { '@type': 'Organization', '@id': canonical('/#organization'), name: site.publisher, url: canonical('/'), logo: { '@type': 'ImageObject', url: canonical('/logo.svg') } },
      { '@type': 'Person', '@id': canonical('/#author'), name: site.author.name, url: canonical(site.author.url) },
      { '@type': 'BreadcrumbList', '@id': canonical('/#breadcrumb'), itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: canonical('/') }] },
      { '@type': 'WebApplication', '@id': canonical('/#calculator'), name: 'Taksi Ücreti Hesaplama', url: canonical('/#hesaplayici'), description: 'Şehir tarifesi ve yol mesafesine göre tarayıcıda çalışan taksi ücreti tahmin aracı.', applicationCategory: 'FinanceApplication', operatingSystem: 'Web', browserRequirements: 'JavaScript', isAccessibleForFree: true, inLanguage: 'tr-TR' },
      { '@type': 'FAQPage', '@id': canonical('/#faq'), mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
    ],
  };

  return (
    <>
      <JsonLd data={graph}/>
      <header className="hero home-hero">
        <div className="container">
          <h1>Taksi Ücreti Hesaplama</h1>
          <p className="lead">Şehrinizi seçin ve araçla gidilecek mesafeyi girin. Güncel açılış, kilometre ve minimum ücret tarifesine göre tahmini taksi ücretinizi saniyeler içinde hesaplayın.</p>
        </div>
      </header>

      <article className="home-article">
        <section className="section calculator-section"><div className="container"><Calculator/></div></section>

        <section className="section soft" id="hesaplama-yontemi">
          <div className="container">
            <div className="section-heading"><h2>Taksi Ücreti Nasıl Hesaplanır?</h2><p>Temel hesap, seçilen şehrin tarife kaydı ve araçla gidilecek mesafe üzerinden yapılır.</p></div>
            <div className="calculation-steps">
              <article><span>1</span><h3>Açılış ücreti</h3><p>Taksimetrenin yolculuk başında kullandığı başlangıç tutarıdır.</p></article>
              <article><span>2</span><h3>Mesafe bedeli</h3><p>Girilen kilometre, şehirdeki kilometre tarifesiyle çarpılır.</p></article>
              <article><span>3</span><h3>Minimum ücret</h3><p>Açılış ve mesafe toplamı alt sınırın altında kalırsa minimum ücret uygulanır.</p></article>
              <article><span>4</span><h3>Ek geçişler</h3><p>Köprü, tünel ve otoyol gibi bilinen tutarlar kullanıcı tarafından eklenir.</p></article>
            </div>
            <div className="formula-box"><strong>Temel formül</strong><code>maksimum(minimum ücret, açılış + kilometre × km + belgelenmiş bekleme + ek geçiş)</code><p>Minimum ücret hesaplanan tutarın üzerine ikinci kez eklenmez. Ayrıntılı örnekler için <Link href="/taksi-ucreti-nasil-hesaplanir/">taksi ücreti hesaplama rehberini</Link> inceleyin.</p></div>
          </div>
        </section>

        <section className="section">
          <div className="container info-grid">
            <article><h2>İndi Bindi Ücreti Nasıl Uygulanır?</h2><p>İndi bindi, kısa mesafede ödenecek alt sınırdır. Örneğin açılış ve kilometre hesabı minimum ücretin altında kalırsa yalnızca minimum tutara tamamlanır.</p><p><Link href="/indi-bindi-ucreti-nedir/">Minimum ücret uygulamasını örneklerle okuyun →</Link></p></article>
            <article><h2>Taksi Ücretini Neler Değiştirebilir?</h2><ul><li>Haritadaki gerçek araç rotası ve tek yönlü yollar</li><li>Belgelenmiş bekleme tarifesi bulunan yerlerde düşük hızda geçen süre</li><li>Köprü, tünel ve otoyol ücretleri</li><li>İlçe veya belgelenmiş taksi türü farkları</li><li>Site henüz güncellenmeden yürürlüğe giren yeni kararlar</li></ul></article>
            <article><h2>Daha Doğru Bir Tahmin İçin</h2><p>Başlangıç ve varış adresinizi bir harita uygulamasında açın; kuş uçuşu mesafe yerine sürüş mesafesini kullanın. Ücretli yol kullanacaksanız bildiğiniz geçiş bedelini ayrı alana ekleyin.</p><p>Bu projede güvenilir bir rota API anahtarı bulunmadığı için başlangıç-varış adresinden otomatik mesafe üretilmez.</p></article>
            <article><h2>Tarifeler Nasıl Kontrol Ediliyor?</h2><p>Her kayıtta kaynak bağlantısı, referans bilgisi ve son kontrol tarihi saklanır. İkincil ya da tahmini kayıtlar sonuç ekranında açıkça etiketlenir; resmî olmayan bir kayıt resmî olarak sunulmaz.</p><p><Link href="/veri-kaynaklari-ve-hesaplama-yontemi/">Veri kaynakları ve hesaplama yöntemini inceleyin →</Link></p></article>
          </div>
        </section>

        <section className="section soft" id="sehir-hesaplayicilari">
          <div className="container">
            <div className="section-heading"><h2>Popüler Şehir Rehberleri</h2><p>Ayrıntılı yerel rota notları ve kaynak açıklamaları bulunan mevcut şehir sayfaları.</p></div>
            <div className="article-grid">{guidePosts.map((post) => <BlogCard key={post.path} {...post} headingLevel="h3" showDate={false}/>)}</div>
            <p className="section-links"><Link href="/havalimani-taksi-ucretleri/">Havalimanı taksi ücretleri</Link><Link href="/blog/">Tüm taksi rehberleri</Link></p>
          </div>
        </section>

        <section className="section" id="iller">
          <div className="container">
            <div className="section-heading"><h2>81 İlde Taksi Ücreti Hesaplama</h2><p>Tarifeler il bazında, bazı yerlerde ise ilçe veya araç türüne göre değişebilir. Şehri seçerek hesaplayıcıya yükleyin; ayrı rehber yalnızca mevcutsa gösterilir.</p></div>
            <CityDirectory/>
          </div>
        </section>

        <section className="section soft">
          <div className="container">
            <div className="faq"><h2>Sık Sorulan Sorular</h2>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div>
          </div>
        </section>

        <section className="section review-section">
          <div className="container">
            <div className="review-copy"><h2>Yazar ve İnceleme Yöntemi</h2><p>Oğuzhan Arslan tarife kaynaklarını, hesaplama anlatımlarını ve kullanıcı düzeltme bildirimlerini inceler. Resmî teyidi bulunmayan veya ilçe genellemesi içeren kayıtlar tahmini olarak etiketlenir.</p><p><strong>Ana sayfanın son anlamlı incelemesi:</strong> 16 Temmuz 2026</p><p><Link href="/iletisim/">Tarife değişikliği bildirin</Link> veya <Link href="/hakkimizda/">site hakkında daha fazla bilgi alın</Link>.</p></div>
            <AuthorBox/>
          </div>
        </section>
      </article>
    </>
  );
}
