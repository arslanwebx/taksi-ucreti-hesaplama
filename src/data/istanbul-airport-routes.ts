export type IstanbulAirportRoute = {
  name: string;
  distanceKm: number;
  paidRoadNote: string;
};

export const istanbulAirportRoutes: readonly IstanbulAirportRoute[] = [
  { name: 'Taksim', distanceKm: 42, paidRoadNote: 'Ücretli geçiş genellikle gerekmez' },
  { name: 'Sultanahmet', distanceKm: 47, paidRoadNote: 'Rota seçimine göre otoyol ücreti eklenebilir' },
  { name: 'Beşiktaş', distanceKm: 44, paidRoadNote: 'Ücretli geçiş genellikle gerekmez' },
  { name: 'Şişli', distanceKm: 40, paidRoadNote: 'Ücretli geçiş genellikle gerekmez' },
  { name: 'Nişantaşı', distanceKm: 42, paidRoadNote: 'Ücretli geçiş genellikle gerekmez' },
  { name: 'Fatih', distanceKm: 45, paidRoadNote: 'Rota seçimine göre otoyol ücreti eklenebilir' },
  { name: 'Eminönü', distanceKm: 46, paidRoadNote: 'Rota seçimine göre otoyol ücreti eklenebilir' },
  { name: 'Kağıthane', distanceKm: 35, paidRoadNote: 'Ücretli geçiş genellikle gerekmez' },
  { name: 'Eyüpsultan', distanceKm: 38, paidRoadNote: 'Rota seçimine göre otoyol ücreti eklenebilir' },
  { name: 'Başakşehir', distanceKm: 33, paidRoadNote: 'Rota seçimine göre otoyol ücreti eklenebilir' },
  { name: 'Bakırköy', distanceKm: 47, paidRoadNote: 'Rota seçimine göre otoyol ücreti eklenebilir' },
  { name: 'Bahçelievler', distanceKm: 43, paidRoadNote: 'Rota seçimine göre otoyol ücreti eklenebilir' },
  { name: 'Esenler Otogarı', distanceKm: 39, paidRoadNote: 'Rota seçimine göre otoyol ücreti eklenebilir' },
  { name: 'Beylikdüzü', distanceKm: 54, paidRoadNote: 'Otoyol tercihi ek ücrete yol açabilir' },
  { name: 'Avcılar', distanceKm: 50, paidRoadNote: 'Otoyol tercihi ek ücrete yol açabilir' },
  { name: 'Üsküdar', distanceKm: 52, paidRoadNote: 'Köprü veya tünel ücreti hariç' },
  { name: 'Kadıköy', distanceKm: 60, paidRoadNote: 'Köprü veya tünel ücreti hariç' },
  { name: 'Ataşehir', distanceKm: 58, paidRoadNote: 'Köprü veya tünel ücreti hariç' },
  { name: 'Pendik', distanceKm: 78, paidRoadNote: 'Köprü ve otoyol ücretleri hariç' },
  { name: 'Sabiha Gökçen Havalimanı', distanceKm: 80, paidRoadNote: 'Köprü ve otoyol ücretleri hariç' },
  { name: 'Sarıyer', distanceKm: 41, paidRoadNote: 'Rota seçimine göre otoyol ücreti eklenebilir' },
  { name: 'Levent', distanceKm: 39, paidRoadNote: 'Ücretli geçiş genellikle gerekmez' },
] as const;

export const istanbulAirportQuickRouteNames = [
  'Taksim',
  'Sultanahmet',
  'Beşiktaş',
  'Şişli',
  'Kadıköy',
] as const;
