import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentShell } from '@/components/ContentShell';
import { BlogCard } from '@/components/BlogCard';
import { airportPosts } from '@/src/data/posts';
import { pageMetadata } from '@/lib/seo';

const title='Havalimanı Taksi Ücretleri 2026';
const description='Yayımlanmış havalimanı taksi yazılarını inceleyin; terminal, mesafe, trafik, taksi kategorisi ve ücretli geçişlerin tahmini ücrete etkisini görün.';
export const metadata:Metadata=pageMetadata(title,description,'/havalimani-taksi-ucretleri/');
export default function AirportIndex(){return <ContentShell title={title} description={description} path="/havalimani-taksi-ucretleri/"><p className="notice">Havalimanı rotaları sabit fiyat garantisi değildir. Güncel karayolu mesafesini, araç kategorisini ve gerçekten kullanılacak geçişleri hesaba katın.</p><div className="article-grid">{airportPosts.map((post)=><BlogCard key={post.path} {...post}/>)}</div><section><h2>Doğru havalimanı tahmini</h2><ol><li>Terminal ile tam varış adresi arasındaki araç yolunu bulun.</li><li>Şehir için geçerli taksi kategorisini seçin.</li><li>Yalnızca doğrulanmış bekleme tarifesi varsa süre ekleyin.</li><li>Köprü, tünel ve otoyol bedelini ayrıca yazın.</li></ol><p><Link href="/">Ana hesaplayıcıyı kullanın</Link> veya tüm <Link href="/blog/">taksi rehberlerini okuyun</Link>.</p></section></ContentShell>}
