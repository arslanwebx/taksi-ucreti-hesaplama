import type { Metadata } from 'next';
import { BursaFareArticle } from '@/components/BursaFareArticle';
import { pageMetadata } from '@/lib/seo';

const title = 'Bursa Taksi Ücreti 2026: Anında Hesaplama';
const description = 'Bursa taksi ücreti için 2026 açılış, kilometre ve indi-bindi tarifesini; Bursa Otogar, Ulucami, Görükle ve Mudanya rota tahminleriyle inceleyin.';

export const metadata: Metadata = pageMetadata(title, description, '/bursa-taksi-ucreti/', 'article');

export default function Page() {
  return <BursaFareArticle/>;
}
