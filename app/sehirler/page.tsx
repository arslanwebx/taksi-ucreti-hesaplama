import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentShell } from '@/components/ContentShell';
import { BlogCard } from '@/components/BlogCard';
import { cityPosts } from '@/src/data/posts';
import { taxiFares } from '@/src/data/taxi-fares';
import { pageMetadata } from '@/lib/seo';

const title = 'Şehir Taksi Ücreti Hesaplama';
const description = 'Türkiye’nin 81 ilinde taksi ücreti hesaplayın; İstanbul, Ankara, İzmir ve Antalya için ayrıntılı şehir rehberlerini inceleyin.';
export const metadata: Metadata = pageMetadata(title, description, '/sehirler/');

export default function CitiesPage() {
  const estimatedCount = taxiFares.filter((city) => city.isEstimated).length;
  return (
    <ContentShell title={title} description={description} path="/sehirler/">
      <p className="notice">81 ilin tamamı ana hesaplayıcıda kullanılabilir. {estimatedCount} şehir kaydı mevcut kaynaklara dayalı tahmini veri olarak işaretlenmiştir ve hesap sonucunda açık uyarı gösterilir.</p>
      <section>
        <h2>Ayrıntılı şehir rehberleri</h2>
        <p>İnce içerik üretmemek için yalnızca kapsamlı biçimde hazırlanan şehir rehberleri ayrı sayfa olarak yayımlanır. Diğer iller için ana hesaplayıcıyı kullanabilirsiniz.</p>
        <div className="article-grid">{cityPosts.map((post) => <BlogCard key={post.path} {...post} title={post.path === '/ankara-taksi-ucreti/' ? 'Ankara taksi ücreti hesaplama' : post.title}/>)}</div>
      </section>
      <section>
        <h2>Diğer şehirlerde nasıl hesaplama yapılır?</h2>
        <p>Ana sayfadaki şehir alanına il adını veya plaka kodunu yazın. Sonuç ekranında açılış, mesafe, minimum ücret uygulaması, tarife referansı, son kontrol tarihi ve kaynak bağlantısı birlikte gösterilir.</p>
        <p><Link className="button" href="/#hesaplayici">81 il hesaplayıcısını aç</Link></p>
      </section>
    </ContentShell>
  );
}
