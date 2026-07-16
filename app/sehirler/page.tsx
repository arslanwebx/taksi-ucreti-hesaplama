import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentShell } from '@/components/ContentShell';
import { BlogCard } from '@/components/BlogCard';
import { cityPosts } from '@/src/data/posts';
import { cities, publishedCities } from '@/src/data/cities';
import { pageMetadata } from '@/lib/seo';

const title = 'Şehir Taksi Ücreti Hesaplama';
const description = 'Türkiye’nin 81 ilini görüntüleyin; tarifesi doğrulanmış şehirlerde güncel taksi ücretini hesaplayın, bekleyen şehirlerin kaynak durumunu görün.';
export const metadata: Metadata = pageMetadata(title, description, '/sehirler/');

export default function CitiesPage(){return <ContentShell title={title} description={description} path="/sehirler/"><p className="notice">81 ilin tamamı sistemde kayıtlıdır. Şu anda {publishedCities.length} şehir hesaplamaya açıktır; diğer şehirler güvenilir güncel kaynak bulunana kadar ücret üretmez.</p><section><h2>Yayımlanmış şehir rehberleri</h2><div className="article-grid">{cityPosts.map((post)=><BlogCard key={post.path} {...post}/>)}</div></section><section><h2>81 il kaynak durumu</h2><div className="cards">{cities.map((city)=>city.status==='published'?<Link className="city-card" key={city.slug} href={city.path}><strong>{city.name}</strong><p>Tarife doğrulandı</p><span>Hesaplayıcıyı aç →</span></Link>:<div className="city-card" key={city.slug}><strong>{city.name}</strong><p>Güncel tarife doğrulanıyor</p><span>Henüz hesaplanamaz</span></div>)}</div></section></ContentShell>}
