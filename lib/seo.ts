import type { Metadata } from 'next';
import { canonical, site } from '@/src/data/site';

export function pageMetadata(title: string, description: string, path: string, type: 'website' | 'article' = 'website'): Metadata {
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: canonical(path) },
    openGraph: {
      type,
      locale: 'tr_TR',
      siteName: site.name,
      title: fullTitle,
      description,
      url: canonical(path),
      images: [canonical('/og-brand.svg')],
    },
    twitter: { card: 'summary_large_image', title: fullTitle, description, images: [canonical('/og-brand.svg')] },
  };
}

export function webPageSchema(title: string, description: string, path: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: canonical(path),
    inLanguage: 'tr-TR',
    isPartOf: { '@type': 'WebSite', name: site.name, url: site.url },
  };
}
