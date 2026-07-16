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
const description = 'Şehrinizi ve yol mesafesini seçerek güncel taksi ücretini hesaplayın. Açılış, kilometre, minimum ücret, bekleme ve geçiş bedellerini görün.';
export const metadata: Metadata = pageMetadata(title, description, '/');

const factors = [
  ['01', 'Açılış bedeli', 'Taksimetrenin yolculuğa başladığı ilk tutardır. Şehir ve araç kategorisine göre değişir.'],
  ['02', 'Yol mesafesi', 'Kuş uçuşu değil, araçla gidilecek yaklaşık karayolu mesafesi hesaba girilmelidir.'],
  ['03', 'Kilometre tarifesi', 'Araç ilerledikçe her kilometre için şehir tarifesindeki tutar eklenir.'],
  ['04', 'Minimum ücret', 'Kısa yolculukta hesap alt sınırın altında kalırsa indi bindi tutarı uygulanır.'],
  ['05', 'Bekleme süresi', 'Yalnızca şehir kaydında doğrulanmış saatlik bekleme bedeli varsa tahmine eklenir.'],
  ['06', 'Taksi kategorisi', 'Sarı, turkuaz veya farklı araç sınıfları aynı rotada farklı sonuç verebilir.'],
  ['07', 'Ücretli geçişler', 'Köprü, tünel ve otoyol bedelleri tarifeden ayrı olarak kullanıcı tarafından eklenir.'],
  ['08', 'Güzergâh ve trafik', 'Tek yönler, yol çalışmaları ve yoğunluk mesafeyi ve zaman bedelini değiştirebilir.'],
] as const;

const faqs = [
  ['Taksi ücreti nasıl hesaplanır?', 'Açılış bedeline gidilen mesafenin kilometre karşılığı eklenir. Doğrulanmış bekleme tarifesi ve gerçekten kullanılan ücretli geçişler de toplamı etkileyebilir.'],
  ['İndi bindi ücreti nedir?', 'İndi bindi, kısa yolculuklarda uygulanan minimum yolculuk ücretidir. Normal tutarın üzerine ayrıca eklenen ikinci bir ücret değildir.'],
  ['Hangi mesafeyi yazmalıyım?', 'Harita uygulamasındaki araçla gidilecek yol mesafesini kullanın. Kuş uçuşu uzaklık doğru bir taksi tahmini vermez.'],
  ['Köprü ve otoyol ücrete dahil mi?', 'Hayır. Kullanılacak köprü, tünel veya otoyol bedelini ek yol ücreti alanına ayrıca yazmanız gerekir.'],
  ['Trafik taksi ücretini artırır mı?', 'Şehirde doğrulanmış bekleme veya düşük hız tarifesi varsa trafikte geçen süre tutarı artırabilir. Bu değer olmayan şehirlerde site oran uydurmaz.'],
  ['Gece tarifesi var mı?', 'Türkiye genelinde ortak bir gece tarifesi yoktur. Ayrı gece tarifesi ancak şehir için güncel bir kaynakla doğrulanırsa gösterilir.'],
  ['Sonuç neden taksimetreden farklı olabilir?', 'Gerçek rota, trafik, taksi kategorisi, yol çalışması, geçiş bedeli ve yeni tarife kararları tahminle taksimetre arasında fark oluşturabilir.'],
  ['81 ilin tamamında hesaplama yapılabilir mi?', 'Şehirlerin tamamı seçicide bulunur; ancak yalnızca güncel ve güvenilir tarifesi doğrulanmış şehirlerde hesaplama açıktır.'],
  ['Tarifeler ne sıklıkla güncelleniyor?', 'Belediye, UKOME ve yetkili kurum duyuruları düzenli olarak kontrol edilir. Her yayımlanmış şehirde yürürlük ve son doğrulama tarihi gösterilir.'],
  ['Havalimanı taksi ücretleri sabit mi?', 'Genellikle sabit değildir. Terminal ile varış noktası arasındaki güncel yol mesafesi, taksi kategorisi, trafik ve ücretli yollar toplamı belirler.'],
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
    <header className="hero"><div className="container hero-grid"><div className="hero-copy"><h1>Taksi Ücreti <span>Hesaplama</span></h1><p className="lead">Şehrinizi ve yol üzerinden gidilecek mesafeyi seçin. Açılış, kilometre, minimum ücret, bekleme ve geçiş bedellerini tek bakışta görün.</p></div><aside className="hero-facts"><h2>Kısa cevap</h2><p>Hesaplayıcı seçtiğiniz şehrin merkezî tarife kaydını kullanır. Sonuç yolculuk tahminidir; kesin tutarı araçtaki taksimetre belirler.</p><Link href="/veri-kaynaklari-ve-hesaplama-yontemi/">Hesaplama yöntemini inceleyin →</Link></aside></div></header>
    <article className="home-article">
      <section className="section calculator-section"><div className="container"><Calculator/></div></section>
      <section className="section soft"><div className="container"><div className="section-heading"><h2>Taksi ücretini neler belirler?</h2><p>Hesap, görünür ve denetlenebilir ücret kalemlerinden oluşur. Doğrulanmamış hiçbir oran varsayılmaz.</p></div><div className="factor-grid">{factors.map(([number, heading, copy]) => <article className="factor-card" key={number}><span>{number}</span><h3>{heading}</h3><p>{copy}</p></article>)}</div><div className="worked-example"><div><h3>{exampleCity.name} için anlaşılır bir örnek</h3><p>{exampleKm} km, beklemesiz standart taksi yolculuğu. Bu örnek doğrudan merkezî ve doğrulanmış şehir verisinden hesaplanır.</p></div><dl><div><dt>Açılış + mesafe</dt><dd>{money(example.distance)}</dd></div><div><dt>Minimum farkı</dt><dd>{money(example.adjustment)}</dd></div><div><dt>Ek ücret</dt><dd>{money(example.extra)}</dd></div><div><dt>Tahmini toplam</dt><dd>{money(example.total)}</dd></div></dl></div></div></section>
      <section className="section"><div className="container before-grid"><div><h2>Hesaplamadan önce</h2><p>Rotanızı bir harita uygulamasından kontrol edin ve araçla gidilecek mesafeyi kullanın. Seçeceğiniz taksi kategorisi ile ücretli yol tercihini sürücüyle yolculuk başlamadan netleştirin.</p><ul className="check-list"><li>Karayolu mesafesini kontrol edin</li><li>Doğru şehir ve araç türünü seçin</li><li>Yalnızca kullanılacak geçişleri ekleyin</li><li>Sonucun tahmin olduğunu unutmayın</li></ul></div><div><h2>Tahmin neden değişebilir?</h2><p>Taksimetre gerçek yolculuğu ölçer. Tek yönler, güzergâh değişikliği, düşük hızda geçen süre, yol çalışması ve yeni tarife kararları ekrandaki tahmini değiştirebilir.</p><p>Önemli bir yolculuktan önce güncel tarifeyi kaynak bağlantısından ve yerel yetkili kurumdan doğrulamanızı öneririz.</p><Link className="button" href="/sorumluluk-reddi/">Tahmin sınırlarını okuyun</Link></div></div></section>
      <section className="section soft" id="sehir-hesaplayicilari"><div className="container"><div className="section-heading"><h2>Şehre özel güncel rehberler</h2><p>Yalnızca tarifesi kaynakla doğrulanmış şehir yazıları yayımlanır. Her kartta tarih, yazar ve doğrudan hesaplama bağlantısı bulunur.</p></div><div className="article-grid">{posts.filter((post) => post.category === 'Şehirler').map((post) => <BlogCard key={post.path} {...post}/>)}</div><p><Link className="button" href="/sehirler/">Tüm şehirleri görüntüle</Link></p></div></section>
      <section className="section" id="son-rehberler"><div className="container"><div className="section-heading"><h2>Son rehberler</h2><p>Taksi hesaplaması, minimum ücret ve havalimanı yolculukları için sade, kaynak kontrollü içerikler.</p></div><div className="article-grid">{posts.filter((post) => post.category !== 'Şehirler').slice(0, 3).map((post) => <BlogCard key={post.path} {...post}/>)}</div><p><Link className="button" href="/blog/">Tüm yazıları görüntüle</Link></p></div></section>
      <section className="section soft"><div className="container"><div className="faq"><h2>Sık sorulan sorular</h2>{faqs.map(([question, answer]) => <details key={question}><summary>{question}</summary><p>{answer}</p></details>)}</div><AuthorBox/></div></section>
    </article>
  </>;
}
