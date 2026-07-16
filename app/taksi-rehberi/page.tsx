import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentShell } from '@/components/ContentShell';
import { BlogCard } from '@/components/BlogCard';
import { JsonLd } from '@/components/JsonLd';
import { posts } from '@/src/data/posts';
import { canonical, site } from '@/src/data/site';
import { pageMetadata } from '@/lib/seo';

const title='Oğuzhan Arslan | Yazar ve İçerik Sorumlusu';
const description='Taksi Ücreti Hesaplama yazarı Oğuzhan Arslan’ın rolünü, tarife araştırma yöntemini, içerik kontrol sürecini ve son yazılarını inceleyin.';
export const metadata:Metadata=pageMetadata(title,description,'/taksi-rehberi/');
export default function AuthorPage(){const schema=[{'@context':'https://schema.org','@type':'ProfilePage',name:title,url:canonical('/taksi-rehberi/'),mainEntity:{'@type':'Person',name:site.author.name,url:canonical('/taksi-rehberi/')}},{'@context':'https://schema.org','@type':'Person',name:site.author.name,url:canonical('/taksi-rehberi/')}];return <><JsonLd data={schema}/><ContentShell title={title} description={description} path="/taksi-rehberi/"><div className="profile-intro"><div className="author-avatar large" aria-hidden="true">OA</div><div><h2>Yazar hakkında</h2><p>Oğuzhan Arslan sitenin yöneticisi ve içerik yazarıdır. Şehir bazlı taksi tarifelerini kullanıcıların anlayacağı açık bir dille sunar.</p></div></div><section><h2>Sitedeki rolü</h2><p>Kaynakları inceler, şehir yazılarını hazırlar ve hesaplayıcı ile içeriklerin aynı merkezî veriyi kullandığını kontrol eder. Doğrulanmamış uzmanlık veya kurum üyeliği iddiası kullanılmaz.</p></section><section><h2>Tarife araştırma yöntemi</h2><p>Öncelik belediye, UKOME, resmî meslek odası ve kamu kurumu yayınlarındadır. Birincil belgeye erişilemediğinde ikincil kaynak açıkça etiketlenir; güvenilir güncel kaynak bulunamazsa şehir hesaplamaya açılmaz.</p><p><Link href="/veri-kaynaklari-ve-hesaplama-yontemi/">Veri kaynakları ve hesaplama yöntemini inceleyin</Link>.</p></section><section><h2>Son yazılar</h2><div className="article-grid">{posts.slice(0,4).map((post)=><BlogCard key={post.path} {...post}/>)}</div></section></ContentShell></>}
