export interface TaxiCategory { id: string; name: string; opening: number; perKm: number; minimum: number; waitingPerHour?: number }
export interface City {
  name: string; slug: string; path: string; opening: number; perKm: number; minimum: number;
  waitingPerHour?: number; effectiveDate: string; verifiedDate: string; sourceName: string; sourceUrl: string;
  sourceTier: 'resmî' | 'ikincil'; categories: TaxiCategory[]; nightRule: string; extras: string[]; local: string[];
  airport?: { name: string; path: string }; districts: string[]; routes: { name: string; km: number }[];
}

export const cities: City[] = [
  {
    name: 'İstanbul', slug: 'istanbul', path: '/istanbul-taksi-ucreti/', opening: 65.40, perKm: 43.56, minimum: 210, waitingPerHour: 544.45,
    effectiveDate: '2026-02-16', verifiedDate: '2026-07-16', sourceName: 'İBB TUHİM – Taksi Taşımacılığı Ücret Tarifesi',
    sourceUrl: 'https://tuhim.ibb.gov.tr/media/27431/taksi-ta%C5%9F%C4%B1mac%C4%B1l%C4%B1%C4%9F%C4%B1-%C3%BCcret-tarifesi.pdf', sourceTier: 'resmî',
    categories: [
      { id: 'sari', name: 'Sarı taksi', opening: 65.40, perKm: 43.56, minimum: 210, waitingPerHour: 544.45 },
      { id: 'turkuaz', name: 'Turkuaz taksi', opening: 75.21, perKm: 50.09, minimum: 240, waitingPerHour: 626.11 },
      { id: 'sekiz', name: '8+1 sarı taksi', opening: 85.02, perKm: 56.63, minimum: 270, waitingPerHour: 707.78 },
      { id: 'siyah', name: 'Siyah taksi', opening: 111.18, perKm: 74.05, minimum: 360, waitingPerHour: 771.30 }
    ],
    nightRule: 'Resmî tarifede ayrı bir gece tarifesi belirtilmiyor.',
    extras: ['Köprü, Avrasya Tüneli ve ücretli otoyol bedelleri tahmine ayrıca eklenmelidir.'],
    local: ['İki yaka arasındaki yolculuklarda rota ve geçiş tercihi toplamı değiştirir.', 'Yoğun trafikte zaman tarifesi devreye girebilir.'],
    airport: { name: 'İstanbul Havalimanı', path: '/istanbul-havalimani-taksi-ucreti/' }, districts: ['Taksim', 'Kadıköy', 'Beşiktaş', 'Üsküdar', 'Bakırköy'],
    routes: [{ name: 'Taksim – Beşiktaş', km: 4.5 }, { name: 'Kadıköy – Üsküdar', km: 7 }, { name: 'Bakırköy – Taksim', km: 17 }]
  },
  {
    name: 'Ankara', slug: 'ankara', path: '/ankara-taksi-ucreti/', opening: 65, perKm: 40, minimum: 200,
    effectiveDate: '2026-03-01', verifiedDate: '2026-07-16', sourceName: 'Ankara 2026 tarife duyurularının basın aktarımı',
    sourceUrl: 'https://www.yeniankara.com.tr/ankara/ankarada-taksiye-binmeden-once-bilmeniz-gerekenler-taksi-ucreti-nasil-hesaplaniyor-174178', sourceTier: 'ikincil',
    categories: [{ id: 'standart', name: 'Standart taksi', opening: 65, perKm: 40, minimum: 200 }],
    nightRule: 'Doğrulanmış ayrı bir gece tarifesi bulunmadığından gece zammı hesaplanmaz.', extras: ['Otoyol ve diğer ücretli geçişler dahil değildir.'],
    local: ['AŞTİ çevresinde yalnızca resmî taksi sırasını kullanın.', 'Esenboğa yolculuklarında mesafeyi haritadan teyit edin.'],
    airport: { name: 'Esenboğa Havalimanı', path: '/havalimani-taksi-ucretleri/' }, districts: ['Kızılay', 'AŞTİ', 'Çankaya', 'Keçiören', 'Batıkent', 'Sincan'],
    routes: [{ name: 'Kızılay – AŞTİ', km: 6 }, { name: 'Kızılay – Keçiören', km: 9 }, { name: 'Kızılay – Batıkent', km: 18 }]
  },
  {
    name: 'İzmir', slug: 'izmir', path: '/izmir-taksi-ucreti/', opening: 34.50, perKm: 49.50, minimum: 180, waitingPerHour: 207,
    effectiveDate: '2026-04-01', verifiedDate: '2026-07-16', sourceName: 'İzmir Büyükşehir Belediyesi – 13 Mart 2026 Meclis haberi',
    sourceUrl: 'https://www.izmir.bel.tr/tr/Haberler/toplu-ulasimda-ramazan-bayrami-indirimi/58150/156', sourceTier: 'resmî',
    categories: [{ id: 'merkez', name: 'Merkez taksi', opening: 34.50, perKm: 49.50, minimum: 180, waitingPerHour: 207 }],
    nightRule: 'Resmî kaynakta ayrı bir gece tarifesi belirtilmiyor.', extras: ['İlçe tarifeleri merkez tarifesinden farklı olabilir.'],
    local: ['Bu hesap merkez taksi tarifesini kullanır; çevre ilçelerde araca binmeden tarifeyi kontrol edin.', 'Konak, Bornova ve Karşıyaka arasında körfez çevresindeki rota mesafeyi etkiler.'],
    airport: { name: 'Adnan Menderes Havalimanı', path: '/havalimani-taksi-ucretleri/' }, districts: ['Konak', 'Bornova', 'Karşıyaka', 'Gaziemir'],
    routes: [{ name: 'Konak – Bornova', km: 12 }, { name: 'Konak – Karşıyaka', km: 14 }, { name: 'Konak – Gaziemir', km: 16 }]
  },
  {
    name: 'Antalya', slug: 'antalya', path: '/antalya-taksi-ucreti/', opening: 40, perKm: 50, minimum: 200,
    effectiveDate: '2026-03-23', verifiedDate: '2026-07-16', sourceName: 'Antalya Şoförler Odası açıklamasının yerel basın aktarımı',
    sourceUrl: 'https://www.antalyakorfez.com/taksimetreye-zam-yeni-tarifeler-bu-gece-yururluge-giriyor', sourceTier: 'ikincil',
    categories: [{ id: 'merkez', name: 'Merkez taksi', opening: 40, perKm: 50, minimum: 200 }],
    nightRule: 'Doğrulanmış ayrı bir gece tarifesi bulunmadığından gece zammı hesaplanmaz.', extras: ['Merkez dışındaki ilçelerde farklı tarife uygulanabilir.'],
    local: ['Bu hesap merkez ilçeler içindir; Alanya ve Gazipaşa gibi dış ilçelerde kullanmayın.', 'Yaz sezonunda Lara, Kundu ve Belek yönünde trafik yolculuk süresini artırabilir.'],
    airport: { name: 'Antalya Havalimanı', path: '/havalimani-taksi-ucretleri/' }, districts: ['Lara', 'Konyaaltı', 'Kundu', 'Belek'],
    routes: [{ name: 'Kaleiçi – Konyaaltı', km: 8 }, { name: 'Kaleiçi – Lara', km: 12 }, { name: 'Antalya Havalimanı – Kaleiçi', km: 15 }]
  }
];

export const cityBySlug = Object.fromEntries(cities.map((city) => [city.slug, city]));
export const money = (value: number) => new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value);
export function fare(city: City, km: number, minutes = 0, extra = 0, categoryId?: string) {
  const category = city.categories.find((item) => item.id === categoryId) ?? city.categories[0]!;
  const distance = category.opening + km * category.perKm;
  const waiting = (category.waitingPerHour ?? 0) * minutes / 60;
  const beforeMinimum = distance + waiting;
  const total = Math.max(beforeMinimum, category.minimum) + extra;
  return { category, distance, waiting, adjustment: Math.max(0, category.minimum - beforeMinimum), extra, total };
}
