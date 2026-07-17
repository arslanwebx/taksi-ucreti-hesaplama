import type { Metadata } from 'next';
import { AnkaraFareArticle, ankaraPageDescription } from '@/components/AnkaraFareArticle';
import { pageMetadata } from '@/lib/seo';

const seoTitle = 'Ankara Taksi Ücreti Hesaplama (2026) – Güncel Tarife';
export const metadata: Metadata = pageMetadata(seoTitle, ankaraPageDescription, '/ankara-taksi-ucreti/', 'article');

export default function Page() {
  return <AnkaraFareArticle/>;
}
