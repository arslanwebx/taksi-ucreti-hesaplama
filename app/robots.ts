import type { MetadataRoute } from 'next';
import { canonical, site } from '@/src/data/site';

export const dynamic = 'force-static';

export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/',disallow:['/api/']},sitemap:[canonical('/sitemap.xml'),canonical('/feed.xml')],host:site.url};}
