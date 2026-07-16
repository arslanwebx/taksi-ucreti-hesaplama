import type { APIRoute } from 'astro';
export const GET: APIRoute=()=>new Response('User-agent: *\nAllow: /\nDisallow: /api/\nSitemap: https://taksiucreti-hesaplama.blog/sitemap-index.xml\n',{headers:{'content-type':'text/plain; charset=utf-8'}});
