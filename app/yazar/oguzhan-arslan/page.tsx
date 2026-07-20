import type { Metadata } from 'next';
import Link from 'next/link';
import { BlogCard } from '@/components/BlogCard';
import { ContentShell } from '@/components/ContentShell';
import { JsonLd } from '@/components/JsonLd';
import { pageMetadata } from '@/lib/seo';
import { latestPosts } from '@/src/data/posts';
import { canonical, site } from '@/src/data/site';

const title='Oğuzhan Arslan';
const description='Taksi Ücreti Hesaplama yazarı Oğuzhan Arslan’ın içerik hazırlama, tarife kaynağı doğrulama ve hesaplama inceleme yöntemini öğrenin.';
const path='/yazar/oguzhan-arslan/';

export const metadata:Metadata=pageMetadata(title,description,path);

export default function AuthorPage(){
  const schema=[
    {'@context':'https://schema.org','@type':'ProfilePage',name:title,url:canonical(path),mainEntity:{'@type':'Person',name:site.author.name,url:canonical(path),jobTitle:'İçerik yazarı ve tarife araştırmacısı'}},
    {'@context':'https://schema.org','@type':'Person',name:site.author.name,url:canonical(path),jobTitle:'İçerik yazarı ve tarife araştırmacısı'},
  ];
  return <><JsonLd data={schema}/><ContentShell title={title} description={description} path={path}>
    <div className="profile-intro"><div className="author-avatar large" aria-hidden="true">OA</div><div><h2>Yazar hakkında</h2><p>Oğuzhan Arslan, Taksi Ücreti Hesaplama sitesinin içerik yazarı ve yöneticisidir. Şehir tarifelerini kullanıcıların yolculuk öncesinde anlayabileceği açık bir dille sunar.</p></div></div>
    <section><h2>Sitedeki rolü</h2><p>Belediye, UKOME, meslek odası ve ilgili kamu kurumu yayınlarını inceler; tarife tarihlerini ve araç kategorilerini merkezî veri kaydıyla karşılaştırır. Şehir yazıları, örnek tablolar ve hesaplayıcı aynı tarife verisini kullandığı için içerikteki rakamların birbirinden kopmasını önler.</p><p>Bir ücret güvenilir biçimde doğrulanamıyorsa tahmini bir rakam üretmek yerine o şehir için hesaplamayı kapalı tutar. Bu yaklaşım, eksik bilgiyle kesin sonuç izlenimi vermemek için bilinçli bir yayın tercihidir.</p></section>
    <section><h2>Tarife araştırma ve güncelleme yöntemi</h2><ol><li>Önce yürürlük tarihi bulunan resmî karar veya tarife belgesi aranır.</li><li>Açılış, kilometre, minimum ücret, bekleme ve araç kategorileri ayrı ayrı kaydedilir.</li><li>Sayfadaki örnek sonuçlar aynı hesaplama fonksiyonuyla yeniden üretilir.</li><li>Kaynak erişimi, canonical adresler, iç bağlantılar ve mobil görünüm üretim derlemesinde kontrol edilir.</li></ol><p><Link href="/veri-kaynaklari-ve-hesaplama-yontemi/">Veri kaynakları ve hesaplama yönteminin ayrıntılarını inceleyin</Link>.</p></section>
    <section><h2>Düzeltme ve geri bildirim</h2><p>Yeni bir belediye kararı, hatalı görünen tarife veya hesaplama sorunu fark ederseniz kaynağın bağlantısıyla birlikte <Link href="/iletisim/">iletişim formunu</Link> kullanabilirsiniz. Belgelenebilen düzeltmeler merkezî veri kaydına uygulanır ve ilgili sayfaların tamamına yansır.</p></section>
    <section><h2>Son yazılar</h2><div className="article-grid">{latestPosts.slice(0,9).map((post)=><BlogCard key={post.path} {...post}/>)}</div><p className="author-posts-cta"><Link className="button" href="/blog/">Daha fazla blog yazısı gör</Link></p></section>
  </ContentShell></>;
}
