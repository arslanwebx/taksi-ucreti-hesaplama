import type { Metadata } from 'next';
import { KonyaFareArticle } from '@/components/KonyaFareArticle';
import { pageMetadata } from '@/lib/seo';

const title = 'Konya Taksi Ücreti Hesaplama 2026';
const description = 'Konya taksi ücreti hesaplama aracıyla mesafeye göre tahmini fiyatı öğrenin. 2026 açılış, kilometre ve indi-bindi tarifesini inceleyin.';

export const metadata: Metadata = pageMetadata(title, description, '/konya-taksi-ucreti/', 'article');

export default function Page() {
  return <KonyaFareArticle />;
}
