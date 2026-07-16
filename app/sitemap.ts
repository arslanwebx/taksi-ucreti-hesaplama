import type { MetadataRoute } from 'next';
import { pages } from '@/src/data/pages';
import { posts } from '@/src/data/posts';
import { canonical } from '@/src/data/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths=['/','/blog/','/sehirler/','/havalimani-taksi-ucretleri/','/taksi-rehberi/','/iletisim/','/sitemap/'];
  const entries=[...staticPaths.map((path)=>({path,modified:'2026-07-16',priority:path==='/'?1:0.7})),...posts.map((post)=>({path:post.path,modified:post.modified,priority:0.8})),...pages.map((page)=>({path:`/${page.slug}/`,modified:'2026-07-16',priority:0.5}))];
  const unique=[...new Map(entries.map((entry)=>[entry.path,entry])).values()];
  return unique.map((entry)=>({url:canonical(entry.path),lastModified:new Date(`${entry.modified}T00:00:00Z`),changeFrequency:entry.path==='/'?'weekly':'monthly',priority:entry.priority}));
}
