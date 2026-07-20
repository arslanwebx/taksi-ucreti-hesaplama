import { taxiFareBySlug, type TaxiFare } from './taxi-fares';
import { calculateFare } from '@/lib/taxi-calculator';

type ArticleDetails = {
  path: string;
  extras: string[];
  local: string[];
  airport?: { name: string; path: string };
  districts: string[];
  routes: { name: string; km: number }[];
};

export type PublishedCity = TaxiFare & ArticleDetails;

const articleDetails: Record<string, ArticleDetails> = {
  istanbul: {
    path: '/istanbul-taksi-ucreti/',
    extras: ['Köprü, Avrasya Tüneli ve ücretli otoyol bedelleri tahmine ayrıca eklenmelidir.'],
    local: [
      'İki yaka arasındaki yolculuklarda rota ve ücretli geçiş tercihi toplamı değiştirir.',
      'Trafik, yol çalışması ve bırakma noktası gerçek taksimetre mesafesini etkileyebilir.',
    ],
    airport: { name: 'İstanbul Havalimanı', path: '/istanbul-havalimani-taksi-ucreti/' },
    districts: ['Taksim', 'Kadıköy', 'Beşiktaş', 'Üsküdar', 'Bakırköy'],
    routes: [
      { name: 'Taksim – Beşiktaş', km: 4.5 },
      { name: 'Kadıköy – Üsküdar', km: 7 },
      { name: 'Bakırköy – Taksim', km: 17 },
    ],
  },
  ankara: {
    path: '/ankara-taksi-ucreti/',
    extras: ['Otoyol ve diğer ücretli geçişler temel tahmine dahil değildir.'],
    local: [
      'AŞTİ çevresinde yalnızca resmî taksi sırasını kullanın.',
      'Esenboğa yolculuklarında güncel araç rotası mesafesini haritadan teyit edin.',
    ],
    airport: { name: 'Esenboğa Havalimanı', path: '/havalimani-taksi-ucretleri/#esenboga' },
    districts: ['Kızılay', 'AŞTİ', 'Çankaya', 'Keçiören', 'Batıkent', 'Sincan'],
    routes: [
      { name: 'Kızılay – AŞTİ', km: 6 },
      { name: 'Kızılay – Keçiören', km: 9 },
      { name: 'Kızılay – Batıkent', km: 18 },
    ],
  },
  izmir: {
    path: '/izmir-taksi-ucreti/',
    extras: ['İlçe tarifeleri merkez tarifesinden farklı olabilir.'],
    local: [
      'Çevre ilçelerde araca binmeden önce yerel tarifenin geçerli olup olmadığını kontrol edin.',
      'Konak, Bornova ve Karşıyaka arasındaki rota seçimi gerçek mesafeyi etkiler.',
    ],
    airport: { name: 'Adnan Menderes Havalimanı', path: '/havalimani-taksi-ucretleri/#adnan-menderes' },
    districts: ['Konak', 'Bornova', 'Karşıyaka', 'Gaziemir'],
    routes: [
      { name: 'Konak – Bornova', km: 12 },
      { name: 'Konak – Karşıyaka', km: 14 },
      { name: 'Konak – Gaziemir', km: 16 },
    ],
  },
  antalya: {
    path: '/antalya-taksi-ucreti/',
    extras: ['Merkez dışındaki ilçelerde farklı tarife uygulanabilir.'],
    local: [
      'Alanya ve Gazipaşa gibi dış ilçelerde yerel tarifeyi ayrıca doğrulayın.',
      'Lara, Kundu ve Belek yönünde güncel navigasyon mesafesini kullanın.',
    ],
    airport: { name: 'Antalya Havalimanı', path: '/havalimani-taksi-ucretleri/#antalya-havalimani' },
    districts: ['Lara', 'Konyaaltı', 'Kundu', 'Belek'],
    routes: [
      { name: 'Kaleiçi – Konyaaltı', km: 8 },
      { name: 'Kaleiçi – Lara', km: 12 },
      { name: 'Antalya Havalimanı – Kaleiçi', km: 15 },
    ],
  },
};

export const cityGuidePaths = Object.fromEntries(
  Object.entries(articleDetails).map(([slug, details]) => [slug, details.path]),
) as Record<string, string>;

export const publishedCities = Object.entries(articleDetails).map(([slug, details]) => {
  const tariff = taxiFareBySlug[slug];
  if (!tariff) throw new Error(`${slug} için merkezî taksi tarifesi bulunamadı.`);
  return { ...tariff, ...details };
});

export const money = (value: number) => new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
}).format(value);

export const formatDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return new Intl.DateTimeFormat('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
};

export function fare(city: Pick<TaxiFare, 'openingFare' | 'perKmFare' | 'minimumFare'>, km: number, extra = 0) {
  const result = calculateFare(city, km, 0, extra);
  return { opening: result.opening, distance: result.distance, adjustment: result.adjustment, extra: result.additional, total: result.total };
}
