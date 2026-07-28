export type SabihaGokcenRoute = {
  name: string;
  distanceKm: number;
  paidRoadNote: string;
};

export const sabihaGokcenRoutes: readonly SabihaGokcenRoute[] = [
  { name: 'Pendik', distanceKm: 12, paidRoadNote: 'Ücretli geçiş gerekmez' },
  { name: 'Maltepe', distanceKm: 18, paidRoadNote: 'Ücretli geçiş gerekmez' },
  { name: 'Bostancı', distanceKm: 20, paidRoadNote: 'Ücretli geçiş gerekmez' },
  { name: 'Ataşehir', distanceKm: 25, paidRoadNote: 'Ücretli geçiş genellikle gerekmez' },
  { name: 'Kadıköy', distanceKm: 35, paidRoadNote: 'Ücretli geçiş genellikle gerekmez' },
  { name: 'Üsküdar', distanceKm: 37, paidRoadNote: 'Köprü veya tünel bedeli hariç' },
  { name: 'Taksim', distanceKm: 42, paidRoadNote: 'Köprü veya tünel bedeli hariç' },
  { name: 'Beşiktaş', distanceKm: 45, paidRoadNote: 'Köprü veya tünel bedeli hariç' },
  { name: 'Sultanahmet', distanceKm: 50, paidRoadNote: 'Rota seçimine göre otoyol ücreti eklenebilir' },
  { name: 'İstanbul Havalimanı', distanceKm: 80, paidRoadNote: 'Otoyol tercihi ve geçiş ücretleri hariç' },
] as const;

export const sabihaGokcenQuickRouteNames = [
  'Pendik', 'Kadıköy', 'Üsküdar', 'Taksim', 'Beşiktaş',
] as const;
