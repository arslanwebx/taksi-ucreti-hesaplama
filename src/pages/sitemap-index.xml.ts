import type { APIRoute } from 'astro';
import { publishedCities } from '../data/cities';
import { pages } from '../data/pages';
import { posts } from '../data/posts';
import { site } from '../data/site';
const paths=['/','/blog/','/sehirler/','/taksi-rehberi/','/havalimani-taksi-ucretleri/','/iletisim/','/sitemap/',...publishedCities.map((city)=>city.path),...posts.map((post)=>post.path),...pages.map((page)=>`/${page.slug}/`)];
export const GET:APIRoute=()=>new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${[...new Set(paths)].map((path)=>`<url><loc>${new URL(path,site.url).href}</loc></url>`).join('')}</urlset>`,{headers:{'content-type':'application/xml; charset=utf-8'}});
