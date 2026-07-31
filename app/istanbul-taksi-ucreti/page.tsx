import type { Metadata } from 'next';
import { IstanbulFareArticle, istanbulMetaDescription } from '@/components/IstanbulFareArticle';
import { pageMetadata } from '@/lib/seo';

const seoTitle = 'İstanbul Taksi Ücreti [2026] – Hesaplama Aracı';
export const metadata: Metadata = pageMetadata(seoTitle, istanbulMetaDescription, '/istanbul-taksi-ucreti/', 'article');

export default function Page() {
  return <IstanbulFareArticle/>;
}
