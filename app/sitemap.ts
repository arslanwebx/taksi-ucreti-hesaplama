import type { MetadataRoute } from 'next';
import { pages } from '@/src/data/pages';
import { posts } from '@/src/data/posts';
import { canonical } from '@/src/data/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = [
    { path: '/', modified: '2026-08-11', changeFrequency: 'weekly' as const, priority: 1 },
    { path: '/blog/', modified: '2026-08-11', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/sehirler/', modified: '2026-08-11', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/havalimani-taksi-ucretleri/', modified: '2026-08-11', changeFrequency: 'weekly' as const, priority: 0.8 },
    { path: '/yazar/oguzhan-arslan/', modified: '2026-08-11', changeFrequency: 'monthly' as const, priority: 0.5 },
    { path: '/iletisim/', modified: '2026-07-24', changeFrequency: 'yearly' as const, priority: 0.3 },
    { path: '/sitemap/', modified: '2026-08-12', changeFrequency: 'monthly' as const, priority: 0.2 },
  ];
  const entries=[
    ...staticEntries,
    ...posts.map((post)=>({path:post.path,modified:post.modified,changeFrequency:'monthly' as const,priority:0.8})),
    ...pages.map((page)=>({path:`/${page.slug}/`,modified:page.updated,changeFrequency:'yearly' as const,priority:0.3})),
  ];
  const unique=[...new Map(entries.map((entry)=>[entry.path,entry])).values()];
  return unique.map((entry)=>({
    url:canonical(entry.path),
    ...(entry.modified ? { lastModified:new Date(`${entry.modified}T00:00:00Z`) } : {}),
    changeFrequency:entry.changeFrequency,
    priority:entry.priority,
  }));
}
