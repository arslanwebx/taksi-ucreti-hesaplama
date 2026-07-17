import type { Metadata } from 'next';
import { AnkaraFareArticle, ankaraPageDescription } from '@/components/AnkaraFareArticle';
import { pageMetadata } from '@/lib/seo';

const seoTitle = 'Ankara Taksi Ücretleri 2026: Güncel Tarife ve Hesaplama';
export const metadata: Metadata = pageMetadata(seoTitle, ankaraPageDescription, '/ankara-taksi-ucreti/', 'article');

export default function Page() {
  return <AnkaraFareArticle/>;
}
