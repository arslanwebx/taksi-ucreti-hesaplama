import type { Metadata } from 'next';
import { AnkaraFareArticle, ankaraPageDescription, ankaraSeoTitle } from '@/components/AnkaraFareArticle';
import { pageMetadata } from '@/lib/seo';

export const metadata: Metadata = pageMetadata(ankaraSeoTitle, ankaraPageDescription, '/ankara-taksi-ucreti/', 'article');

export default function Page() {
  return <AnkaraFareArticle/>;
}
