export interface TaxiCategory {
  id: string;
  name: string;
  opening: number;
  perKm: number;
  minimum: number;
  waitingPerHour?: number;
}

export interface NightTariff {
  enabled: boolean;
  multiplier: number;
  sourceUrl: string | null;
  note: string;
}

interface CityBase {
  code: number;
  name: string;
  slug: string;
  path: string;
  sourceTier: 'official' | 'secondary' | 'unverified';
  nightTariff: NightTariff;
  extras: string[];
  local: string[];
  airport?: { name: string; path: string };
  districts: string[];
  routes: { name: string; km: number }[];
}

export interface PublishedCity extends CityBase {
  status: 'published';
  opening: number;
  perKm: number;
  minimum: number;
  waitingPerHour?: number;
  effectiveDate: string;
  verifiedDate: string;
  sourceName: string;
  sourceUrl: string;
  categories: TaxiCategory[];
}

export interface DraftCity extends CityBase {
  status: 'draft';
  opening: null;
  perKm: null;
  minimum: null;
  waitingPerHour?: undefined;
  effectiveDate: null;
  verifiedDate: null;
  sourceName: null;
  sourceUrl: null;
  sourceTier: 'unverified';
  categories: [];
}

export type City = PublishedCity | DraftCity;

const provinceRegistry = [
  [1, 'Adana', 'adana'], [2, 'Adıyaman', 'adiyaman'], [3, 'Afyonkarahisar', 'afyonkarahisar'], [4, 'Ağrı', 'agri'],
  [5, 'Amasya', 'amasya'], [6, 'Ankara', 'ankara'], [7, 'Antalya', 'antalya'], [8, 'Artvin', 'artvin'],
  [9, 'Aydın', 'aydin'], [10, 'Balıkesir', 'balikesir'], [11, 'Bilecik', 'bilecik'], [12, 'Bingöl', 'bingol'],
  [13, 'Bitlis', 'bitlis'], [14, 'Bolu', 'bolu'], [15, 'Burdur', 'burdur'], [16, 'Bursa', 'bursa'],
  [17, 'Çanakkale', 'canakkale'], [18, 'Çankırı', 'cankiri'], [19, 'Çorum', 'corum'], [20, 'Denizli', 'denizli'],
  [21, 'Diyarbakır', 'diyarbakir'], [22, 'Edirne', 'edirne'], [23, 'Elazığ', 'elazig'], [24, 'Erzincan', 'erzincan'],
  [25, 'Erzurum', 'erzurum'], [26, 'Eskişehir', 'eskisehir'], [27, 'Gaziantep', 'gaziantep'], [28, 'Giresun', 'giresun'],
  [29, 'Gümüşhane', 'gumushane'], [30, 'Hakkâri', 'hakkari'], [31, 'Hatay', 'hatay'], [32, 'Isparta', 'isparta'],
  [33, 'Mersin', 'mersin'], [34, 'İstanbul', 'istanbul'], [35, 'İzmir', 'izmir'], [36, 'Kars', 'kars'],
  [37, 'Kastamonu', 'kastamonu'], [38, 'Kayseri', 'kayseri'], [39, 'Kırklareli', 'kirklareli'], [40, 'Kırşehir', 'kirsehir'],
  [41, 'Kocaeli', 'kocaeli'], [42, 'Konya', 'konya'], [43, 'Kütahya', 'kutahya'], [44, 'Malatya', 'malatya'],
  [45, 'Manisa', 'manisa'], [46, 'Kahramanmaraş', 'kahramanmaras'], [47, 'Mardin', 'mardin'], [48, 'Muğla', 'mugla'],
  [49, 'Muş', 'mus'], [50, 'Nevşehir', 'nevsehir'], [51, 'Niğde', 'nigde'], [52, 'Ordu', 'ordu'],
  [53, 'Rize', 'rize'], [54, 'Sakarya', 'sakarya'], [55, 'Samsun', 'samsun'], [56, 'Siirt', 'siirt'],
  [57, 'Sinop', 'sinop'], [58, 'Sivas', 'sivas'], [59, 'Tekirdağ', 'tekirdag'], [60, 'Tokat', 'tokat'],
  [61, 'Trabzon', 'trabzon'], [62, 'Tunceli', 'tunceli'], [63, 'Şanlıurfa', 'sanliurfa'], [64, 'Uşak', 'usak'],
  [65, 'Van', 'van'], [66, 'Yozgat', 'yozgat'], [67, 'Zonguldak', 'zonguldak'], [68, 'Aksaray', 'aksaray'],
  [69, 'Bayburt', 'bayburt'], [70, 'Karaman', 'karaman'], [71, 'Kırıkkale', 'kirikkale'], [72, 'Batman', 'batman'],
  [73, 'Şırnak', 'sirnak'], [74, 'Bartın', 'bartin'], [75, 'Ardahan', 'ardahan'], [76, 'Iğdır', 'igdir'],
  [77, 'Yalova', 'yalova'], [78, 'Karabük', 'karabuk'], [79, 'Kilis', 'kilis'], [80, 'Osmaniye', 'osmaniye'],
  [81, 'Düzce', 'duzce'],
] as const;

const verifiedCities: PublishedCity[] = [
  {
    code: 34, name: 'İstanbul', slug: 'istanbul', path: '/istanbul-taksi-ucreti/', opening: 65.40, perKm: 43.56, minimum: 210, waitingPerHour: 544.45,
    effectiveDate: '2026-02-16', verifiedDate: '2026-07-16', sourceName: 'İBB TUHİM – Taksi Taşımacılığı Ücret Tarifesi',
    sourceUrl: 'https://tuhim.ibb.gov.tr/media/27431/taksi-ta%C5%9F%C4%B1mac%C4%B1l%C4%B1%C4%9F%C4%B1-%C3%BCcret-tarifesi.pdf', sourceTier: 'official', status: 'published',
    categories: [
      { id: 'sari', name: 'Sarı taksi', opening: 65.40, perKm: 43.56, minimum: 210, waitingPerHour: 544.45 },
      { id: 'turkuaz', name: 'Turkuaz taksi', opening: 75.21, perKm: 50.09, minimum: 240, waitingPerHour: 626.11 },
      { id: 'sekiz', name: '8+1 sarı taksi', opening: 85.02, perKm: 56.63, minimum: 270, waitingPerHour: 707.78 },
      { id: 'siyah', name: 'Siyah taksi', opening: 111.18, perKm: 74.05, minimum: 360, waitingPerHour: 771.30 },
    ],
    nightTariff: { enabled: false, multiplier: 1, sourceUrl: null, note: 'İstanbul için doğrulanmış ayrı bir gece tarifesi bulunmamaktadır.' },
    extras: ['Köprü, Avrasya Tüneli ve ücretli otoyol bedelleri tahmine ayrıca eklenmelidir.'],
    local: ['İki yaka arasındaki yolculuklarda rota ve geçiş tercihi toplamı değiştirir.', 'Yoğun trafikte zaman tarifesi devreye girebilir.'],
    airport: { name: 'İstanbul Havalimanı', path: '/istanbul-havalimani-taksi-ucreti/' }, districts: ['Taksim', 'Kadıköy', 'Beşiktaş', 'Üsküdar', 'Bakırköy'],
    routes: [{ name: 'Taksim – Beşiktaş', km: 4.5 }, { name: 'Kadıköy – Üsküdar', km: 7 }, { name: 'Bakırköy – Taksim', km: 17 }],
  },
  {
    code: 6, name: 'Ankara', slug: 'ankara', path: '/ankara-taksi-ucreti/', opening: 65, perKm: 40, minimum: 200, waitingPerHour: 420,
    effectiveDate: '2026-03-01', verifiedDate: '2026-07-16', sourceName: 'Ankara 2026 tarife duyurularının basın aktarımı',
    sourceUrl: 'https://www.yeniankara.com.tr/ankara/ankarada-taksiye-binmeden-once-bilmeniz-gerekenler-taksi-ucreti-nasil-hesaplaniyor-174178', sourceTier: 'secondary', status: 'published',
    categories: [{ id: 'standart', name: 'Standart taksi', opening: 65, perKm: 40, minimum: 200, waitingPerHour: 420 }],
    nightTariff: { enabled: false, multiplier: 1, sourceUrl: null, note: 'Ankara için doğrulanmış ayrı bir gece tarifesi bulunmamaktadır.' }, extras: ['Otoyol ve diğer ücretli geçişler dahil değildir.'],
    local: ['AŞTİ çevresinde yalnızca resmî taksi sırasını kullanın.', 'Esenboğa yolculuklarında mesafeyi haritadan teyit edin.'],
    airport: { name: 'Esenboğa Havalimanı', path: '/havalimani-taksi-ucretleri/' }, districts: ['Kızılay', 'AŞTİ', 'Çankaya', 'Keçiören', 'Batıkent', 'Sincan'],
    routes: [{ name: 'Kızılay – AŞTİ', km: 6 }, { name: 'Kızılay – Keçiören', km: 9 }, { name: 'Kızılay – Batıkent', km: 18 }],
  },
  {
    code: 35, name: 'İzmir', slug: 'izmir', path: '/izmir-taksi-ucreti/', opening: 34.50, perKm: 49.50, minimum: 180, waitingPerHour: 207,
    effectiveDate: '2026-04-01', verifiedDate: '2026-07-16', sourceName: 'İzmir Büyükşehir Belediyesi – 13 Mart 2026 Meclis haberi',
    sourceUrl: 'https://www.izmir.bel.tr/tr/Haberler/toplu-ulasimda-ramazan-bayrami-indirimi/58150/156', sourceTier: 'official', status: 'published',
    categories: [{ id: 'merkez', name: 'Merkez taksi', opening: 34.50, perKm: 49.50, minimum: 180, waitingPerHour: 207 }],
    nightTariff: { enabled: false, multiplier: 1, sourceUrl: null, note: 'İzmir merkez taksileri için doğrulanmış ayrı bir gece tarifesi bulunmamaktadır.' }, extras: ['İlçe tarifeleri merkez tarifesinden farklı olabilir.'],
    local: ['Bu hesap merkez taksi tarifesini kullanır; çevre ilçelerde araca binmeden tarifeyi kontrol edin.', 'Konak, Bornova ve Karşıyaka arasında körfez çevresindeki rota mesafeyi etkiler.'],
    airport: { name: 'Adnan Menderes Havalimanı', path: '/havalimani-taksi-ucretleri/' }, districts: ['Konak', 'Bornova', 'Karşıyaka', 'Gaziemir'],
    routes: [{ name: 'Konak – Bornova', km: 12 }, { name: 'Konak – Karşıyaka', km: 14 }, { name: 'Konak – Gaziemir', km: 16 }],
  },
  {
    code: 7, name: 'Antalya', slug: 'antalya', path: '/antalya-taksi-ucreti/', opening: 40, perKm: 50, minimum: 200,
    effectiveDate: '2026-03-23', verifiedDate: '2026-07-16', sourceName: 'Antalya Şoförler Odası açıklamasının yerel basın aktarımı',
    sourceUrl: 'https://www.antalyakorfez.com/taksimetreye-zam-yeni-tarifeler-bu-gece-yururluge-giriyor', sourceTier: 'secondary', status: 'published',
    categories: [{ id: 'merkez', name: 'Merkez taksi', opening: 40, perKm: 50, minimum: 200 }],
    nightTariff: { enabled: false, multiplier: 1, sourceUrl: null, note: 'Antalya merkez tarifesi için doğrulanmış ayrı bir gece tarifesi bulunmamaktadır.' }, extras: ['Merkez dışındaki ilçelerde farklı tarife uygulanabilir.'],
    local: ['Bu hesap merkez ilçeler içindir; Alanya ve Gazipaşa gibi dış ilçelerde kullanmayın.', 'Yaz sezonunda Lara, Kundu ve Belek yönünde trafik yolculuk süresini artırabilir.'],
    airport: { name: 'Antalya Havalimanı', path: '/havalimani-taksi-ucretleri/' }, districts: ['Lara', 'Konyaaltı', 'Kundu', 'Belek'],
    routes: [{ name: 'Kaleiçi – Konyaaltı', km: 8 }, { name: 'Kaleiçi – Lara', km: 12 }, { name: 'Antalya Havalimanı – Kaleiçi', km: 15 }],
  },
];

const verifiedBySlug = new Map(verifiedCities.map((city) => [city.slug, city]));

export const cities: City[] = provinceRegistry
  .map(([code, name, slug]): City => verifiedBySlug.get(slug) ?? {
    code, name, slug, path: `/${slug}-taksi-ucreti/`, opening: null, perKm: null, minimum: null,
    effectiveDate: null, verifiedDate: null, sourceName: null, sourceUrl: null, sourceTier: 'unverified', status: 'draft', categories: [],
    nightTariff: { enabled: false, multiplier: 1, sourceUrl: null, note: `${name} için güncel tarife doğrulanıyor.` },
    extras: [], local: [], districts: [], routes: [],
  })
  .sort((a, b) => a.name.localeCompare(b.name, 'tr'));

export const isPublishedCity = (city: City): city is PublishedCity => city.status === 'published';
export const publishedCities = cities.filter(isPublishedCity);
export const cityBySlug = Object.fromEntries(cities.map((city) => [city.slug, city])) as Record<string, City>;
export const money = (value: number) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value);
export const sourceTierLabel = { official: 'Resmî kaynak', secondary: 'İkincil kaynak', unverified: 'Doğrulama bekliyor' } as const;
export const formatDate = (value: string) => new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(`${value}T00:00:00Z`));

export function fare(city: PublishedCity, km: number, minutes = 0, extra = 0, categoryId?: string) {
  const category = city.categories.find((item) => item.id === categoryId) ?? city.categories[0]!;
  const distance = category.opening + km * category.perKm;
  const waiting = (category.waitingPerHour ?? 0) * minutes / 60;
  const beforeMinimum = distance + waiting;
  const total = Math.max(beforeMinimum, category.minimum) + extra;
  return { category, distance, waiting, adjustment: Math.max(0, category.minimum - beforeMinimum), extra, total };
}
