import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentShell } from '@/components/ContentShell';
import { pages } from '@/src/data/pages';
import { posts } from '@/src/data/posts';
import { pageMetadata } from '@/lib/seo';

const title='Site Haritası';const description='Taksi Ücreti Hesaplama sitesindeki hesaplayıcı, şehir, havalimanı, rehber ve kurumsal sayfalara tek yerden ulaşın.';
export const metadata:Metadata=pageMetadata(title,description,'/sitemap/');
const main=[['Ana sayfa','/'],['Şehirler','/sehirler/'],['Blog','/blog/'],['Havalimanı ücretleri','/havalimani-taksi-ucretleri/'],['Yazar','/taksi-rehberi/'],['İletişim','/iletisim/']] as const;
export default function HtmlSitemap(){return <ContentShell title={title} description={description} path="/sitemap/"><div className="sitemap-grid"><section><h2>Ana bölümler</h2><ul>{main.map(([name,path])=><li key={path}><Link href={path}>{name}</Link></li>)}</ul></section><section><h2>Yazılar</h2><ul>{posts.map((post)=><li key={post.path}><Link href={post.path}>{post.title}</Link></li>)}</ul></section><section><h2>Politikalar ve yöntem</h2><ul>{pages.map((page)=><li key={page.slug}><Link href={`/${page.slug}/`}>{page.title}</Link></li>)}</ul></section></div><p>Google Search Console için makine tarafından okunabilen sürüm: <a href="/sitemap.xml">sitemap.xml</a></p></ContentShell>}
