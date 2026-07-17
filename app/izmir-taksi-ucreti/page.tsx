import type { Metadata } from 'next';
import { RegionalCityFareArticle } from '@/components/RegionalCityFareArticle';
import { pageMetadata } from '@/lib/seo';

const title = 'İzmir Taksi Ücretleri 2026: Hemen Hesaplama';
const description = 'İzmir taksi ücretini 2026 güncel tarifesiyle hesaplayın. Açılış, kilometre, indi-bindi ücretleri ve popüler İzmir rota tahminlerini inceleyin.';
export const metadata: Metadata = pageMetadata(title, description, '/izmir-taksi-ucreti/', 'article');
export default function Page() { return <RegionalCityFareArticle slug="izmir"/>; }
