import type { Metadata } from 'next';
import { IstanbulFareArticle, istanbulPageDescription } from '@/components/IstanbulFareArticle';
import { pageMetadata } from '@/lib/seo';

const seoTitle = 'İstanbul Taksi Ücreti [2026] – Hesaplama Aracı';
export const metadata: Metadata = pageMetadata(seoTitle, istanbulPageDescription, '/istanbul-taksi-ucreti/', 'article');

export default function Page() {
  return <IstanbulFareArticle/>;
}
