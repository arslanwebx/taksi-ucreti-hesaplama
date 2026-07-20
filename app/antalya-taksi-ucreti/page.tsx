import type { Metadata } from 'next';
import { RegionalCityFareArticle } from '@/components/RegionalCityFareArticle';
import { pageMetadata } from '@/lib/seo';

const title = 'Antalya Taksi Ücreti 2026: Güncel Fiyatlar ve Hesaplama';
const description = 'Antalya taksi ücretini 2026 güncel tarifesiyle hesaplayın. Açılış, kilometre, kısa mesafe ücretleri ve popüler Antalya rota tahminlerini görün.';
export const metadata: Metadata = pageMetadata(title, description, '/antalya-taksi-ucreti/', 'article');
export default function Page() { return <RegionalCityFareArticle slug="antalya"/>; }
