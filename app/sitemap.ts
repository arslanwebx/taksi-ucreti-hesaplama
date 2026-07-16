import type { MetadataRoute } from 'next';
import { pages } from '@/src/data/pages';
import { posts } from '@/src/data/posts';
import { canonical } from '@/src/data/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = [
    { path: '/', modified: '2026-07-16', priority: 1 },
    { path: '/blog/', priority: 0.7 },
    { path: '/sehirler/', priority: 0.7 },
    { path: '/havalimani-taksi-ucretleri/', priority: 0.7 },
    { path: '/yazar/oguzhan-arslan/', priority: 0.7 },
    { path: '/iletisim/', priority: 0.7 },
    { path: '/sitemap/', priority: 0.7 },
  ];
  const entries=[...staticEntries,...posts.map((post)=>({path:post.path,modified:post.modified,priority:0.8})),...pages.map((page)=>({path:`/${page.slug}/`,modified:page.updated,priority:0.5}))];
  const unique=[...new Map(entries.map((entry)=>[entry.path,entry])).values()];
  return unique.map((entry)=>({
    url:canonical(entry.path),
    ...(entry.modified ? { lastModified:new Date(`${entry.modified}T00:00:00Z`) } : {}),
    changeFrequency:entry.path==='/'?'weekly':'monthly',
    priority:entry.priority,
  }));
}
