import type { Metadata } from 'next';
import Link from 'next/link';
import { Calculator } from '@/components/Calculator';
import { AuthorBox } from '@/components/AuthorBox';
import { BlogCard } from '@/components/BlogCard';
import { JsonLd } from '@/components/JsonLd';
import { fare, money, publishedCities } from '@/src/data/cities';
import { posts } from '@/src/data/posts';
import { canonical, site } from '@/src/data/site';
import { pageMetadata } from '@/lib/seo';

const title = 'Taksi Ücreti Hesaplama 2026 | Güncel Şehir Tarifeleri';
const description = 'Şehrinizi ve yol mesafesini seçerek taksi ücretini hesaplayın. Açılış, kilometre, minimum ücret, kaynak ve son kontrol bilgisini görün.';
export const metadata: Metadata = pageMetadata(title, description, '/');

const factors = [
  ['01', 'Açılış bedeli', 'Taksimetrenin yolculuğa başladığı ilk tutardır ve şehrin tarife kaydından alınır.'],
  ['02', 'Yol mesafesi', 'Kuş uçuşu değil, araçla gidilecek yaklaşık karayolu mesafesi hesaba girilmelidir.'],
  ['03', 'Kilometre tarifesi', 'Araç ilerledikçe her kilometre için şehir tarifesindeki tutar eklenir.'],
  ['04', 'Minimum ücret', 'Kısa yolculukta hesap alt sınırın altında kalırsa indi bindi tutarı uygulanır.'],
  ['05', 'Ek ücretler', 'Köprü, tünel ve otoyol gibi bilinen bedeller kullanıcı tarafından ayrıca eklenebilir.'],
  ['06', 'Tarife kaynağı', 'Her sonuçta kullanılan kaynak bağlantısı ve son kontrol tarihi açıkça gösterilir.'],
  ['07', 'Tahmini kayıtlar', 'Kaynağı tahmini kabul edilen şehirlerde sonuç ekranında belirgin bir uyarı gösterilir.'],
  ['08', 'Güzergâh ve trafik', 'Tek yönler, yol çalışmaları ve yoğunluk gerçek araç rotası mesafesini değiştirebilir.'],
] as const;

const faqs = [
  ['Taksi ücreti nasıl hesaplanır?', 'Açılış bedeline gidilen mesafenin kilometre karşılığı eklenir. Sonuç minimum ücretin altındaysa minimum ücret uygulanır; kullanıcının girdiği ücretli geçişler ayrıca eklenir.'],
  ['İndi bindi ücreti nedir?', 'İndi bindi, kısa yolculuklarda uygulanan minimum yolculuk ücretidir. Normal tutarın üzerine ayrıca eklenen ikinci bir ücret değildir.'],
  ['Hangi mesafeyi yazmalıyım?', 'Harita uygulamasındaki araçla gidilecek yol mesafesini kullanın. Kuş uçuşu uzaklık doğru bir taksi tahmini vermez.'],
  ['Köprü ve otoyol ücrete dahil mi?', 'Hayır. Kullanılacak köprü, tünel veya otoyol bedelini ek yol ücreti alanına ayrıca yazmanız gerekir.'],
  ['Trafik taksi ücretini artırır mı?', 'Trafik gerçek yolculuk koşullarını etkileyebilir; ancak bu hesaplayıcı trafik veya bekleme için kendiliğinden ücret eklemez.'],
  ['Tahmini tarife ne demektir?', 'Bazı şehirlerde kayıt mevcut kaynakların birlikte değerlendirilmesiyle tahmini olarak işaretlenmiştir. Bu şehirlerde sonuç ekranında ayrıca uyarı gösterilir.'],
  ['Sonuç neden taksimetreden farklı olabilir?', 'Gerçek rota, trafik, yerel uygulama, yol çalışması, geçiş bedeli ve yeni tarife kararları tahminle taksimetre arasında fark oluşturabilir.'],
  ['81 ilin tamamında hesaplama yapılabilir mi?', 'Evet. Şehirlerin tamamı seçicide bulunur ve hesaplanabilir. Her sonuçta kaynak ve son kontrol bilgisi yer alır.'],
  ['Tarifeler ne sıklıkla güncelleniyor?', 'Kaynaklar düzenli olarak kontrol edilir. Her şehir sonucunda tarife referansı, kaynak bağlantısı ve son kontrol tarihi gösterilir.'],
  ['Havalimanı taksi ücretleri sabit mi?', 'Genellikle sabit değildir. Terminal ile varış noktası arasındaki güncel yol mesafesi ve ücretli yollar toplamı belirler.'],
] as const;

export default function HomePage() {
  const exampleCity = publishedCities.find((city) => city.slug === 'istanbul')!;
  const exampleKm = 10;
  const example = fare(exampleCity, exampleKm);
  const schemas = [
    { '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url, inLanguage: 'tr-TR' },
    { '@context': 'https://schema.org', '@type': 'Organization', name: site.publisher, url: site.url, logo: canonical('/logo.svg') },
    { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'Taksi Ücreti Hesaplama', url: canonical('/'), applicationCategory: 'FinanceApplication', operatingSystem: 'Web', isAccessibleForFree: true },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: faqs.map(([question, answer]) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) },
  ];
  return <>
    <JsonLd data={schemas}/>
    <header className="hero"><div className="container hero-grid"><div className="hero-copy"><h1>Taksi Ücreti <span>Hesaplama</span></h1><p className="lead">Şehrinizi ve yol üzerinden gidilecek mesafeyi seçin. Açılış, kilometre, minimum ücret ve kaynak bilgisini tek bakışta görün.</p></div><aside className="hero-facts"><h2>Kısa cevap</h2><p>Hesaplayıcı seçtiğiniz şehrin merkezî tarife kaydını kullanır. Sonuç yolculuk tahminidir; kesin tutarı araçtaki taksimetre belirler.</p><Link href="/veri-kaynaklari-ve-hesaplama-yontemi/">Hesaplama yöntemini inceleyin →</Link></aside></div></header>
    <article className="home-article">
      <section className="section calculator-section"><div className="container"><Calculator/></div></section>
      <section className="section soft"><div className="container"><div className="section-heading"><h2>Taksi ücretini neler belirler?</h2><p>Hesap, görünür ve denetlenebilir ücret kalemlerinden oluşur; tahmini veri kullanıldığında açıkça belirtilir.</p></div><div className="factor-grid">{factors.map(([number, heading, copy]) => <article className="factor-card" key={number}><span>{number}</span><h3>{heading}</h3><p>{copy}</p></article>)}</div><div className="worked-example"><div><h3>{exampleCity.city} için anlaşılır bir örnek</h3><p>{exampleKm} km ve ek ücret olmadan hesaplanan örnek. Rakamlar doğrudan merkezî şehir verisinden alınır.</p></div><dl><div><dt>Açılış</dt><dd>{money(example.opening)}</dd></div><div><dt>Mesafe bedeli</dt><dd>{money(example.distance)}</dd></div><div><dt>Minimum farkı</dt><dd>{money(example.adjustment)}</dd></div><div><dt>Tahmini toplam</dt><dd>{money(example.total)}</dd></div></dl></div></div></section>
      <section className="section"><div className="container before-grid"><div><h2>Hesaplamadan önce</h2><p>Rotanızı bir harita uygulamasından kontrol edin ve araçla gidilecek mesafeyi kullanın. Ücretli yol tercihini sürücüyle yolculuk başlamadan netleştirin.</p><ul className="check-list"><li>Karayolu mesafesini kontrol edin</li><li>Doğru şehri seçin</li><li>Yalnızca bilinen ek ücretleri yazın</li><li>Sonucun tahmin olduğunu unutmayın</li></ul></div><div><h2>Tahmin neden değişebilir?</h2><p>Taksimetre gerçek yolculuğu ölçer. Tek yönler, güzergâh değişikliği, trafik, yol çalışması ve yeni tarife kararları ekrandaki tahmini değiştirebilir.</p><p>Önemli bir yolculuktan önce güncel tarifeyi kaynak bağlantısından ve yerel yetkili kurumdan doğrulamanızı öneririz.</p><Link className="button" href="/sorumluluk-reddi/">Tahmin sınırlarını okuyun</Link></div></div></section>
      <section className="section soft" id="sehir-hesaplayicilari"><div className="container"><div className="section-heading"><h2>Şehre özel güncel rehberler</h2><p>Yalnızca tarifesi kaynakla doğrulanmış şehir yazıları yayımlanır. Her kartta tarih, yazar ve doğrudan hesaplama bağlantısı bulunur.</p></div><div className="article-grid">{posts.filter((post) => post.category === 'Şehirler').map((post) => <BlogCard key={post.path} {...post}/>)}</div><p><Link className="button" href="/sehirler/">Tüm şehirleri görüntüle</Link></p></div></section>
      <section className="section" id="son-rehberler"><div className="container"><div className="section-heading"><h2>Son rehberler</h2><p>Taksi hesaplaması, minimum ücret ve havalimanı yolculukları için sade, kaynak kontrollü içerikler.</p></div><div className="article-grid">{posts.filter((post) => post.category !== 'Şehirler').slice(0, 3).map((post) => <BlogCard key={post.path} {...post}/>)}</div><p><Link className="button" href="/blog/">Tüm yazıları görüntüle</Link></p></div></section>
      <section className="section soft"><div className="container"><div className="faq"><h2>Sık sorulan sorular</h2>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div><AuthorBox/></div></section>
    </article>
  </>;
}
