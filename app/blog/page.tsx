import type { Metadata } from 'next';
import { BlogCard } from '@/components/BlogCard';
import { ContentShell } from '@/components/ContentShell';
import { JsonLd } from '@/components/JsonLd';
import { posts } from '@/src/data/posts';
import { canonical } from '@/src/data/site';
import { pageMetadata } from '@/lib/seo';

const title = 'Taksi Rehberleri ve Güncel Ücret Yazıları';
const description = 'Şehir taksi ücretleri, havalimanı rotaları, minimum ücret ve taksimetre hesabı hakkında güncel, kaynak kontrollü rehberleri okuyun.';
export const metadata: Metadata = pageMetadata(title, description, '/blog/');

export default function BlogPage() {
  const schema = [{ '@context':'https://schema.org','@type':'CollectionPage',name:title,url:canonical('/blog/'),inLanguage:'tr-TR' }, { '@context':'https://schema.org','@type':'ItemList',itemListElement:posts.map((post,index)=>({ '@type':'ListItem',position:index+1,name:post.title,url:canonical(post.path) })) }];
  return <><JsonLd data={schema}/><ContentShell title={title} description={description} path="/blog/"><div className="article-grid">{posts.map((post)=><BlogCard key={post.path} {...post} showCta={false}/>)}</div></ContentShell></>;
}
