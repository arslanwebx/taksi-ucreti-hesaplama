export type IstanbulRoute = {
  name: string;
  distanceKm: number;
  paidCrossingNote: string;
};

export const istanbulRoutes: readonly IstanbulRoute[] = [
  { name: 'Taksim – Beşiktaş', distanceKm: 4.5, paidCrossingNote: 'Ücretli geçiş gerekmez' },
  { name: 'Taksim – Kadıköy', distanceKm: 17, paidCrossingNote: 'Köprü veya tünel bedeli hariç' },
  { name: 'Taksim – Sultanahmet', distanceKm: 7, paidCrossingNote: 'Ücretli geçiş genellikle gerekmez' },
  { name: 'Taksim – Bakırköy', distanceKm: 17, paidCrossingNote: 'Ücretli geçiş genellikle gerekmez' },
  { name: 'Kadıköy – Üsküdar', distanceKm: 7, paidCrossingNote: 'Ücretli geçiş gerekmez' },
  { name: 'Kadıköy – Pendik', distanceKm: 30, paidCrossingNote: 'Otoyol tercihine göre eklenebilir' },
  { name: 'Kadıköy – Taksim', distanceKm: 17, paidCrossingNote: 'Köprü veya tünel bedeli hariç' },
  { name: 'Üsküdar – Mecidiyeköy', distanceKm: 14, paidCrossingNote: 'Köprü bedeli hariç' },
  { name: 'Bakırköy – Taksim', distanceKm: 17, paidCrossingNote: 'Ücretli geçiş genellikle gerekmez' },
  { name: 'Bakırköy – Üsküdar', distanceKm: 25, paidCrossingNote: 'Köprü veya tünel bedeli hariç' },
  { name: 'Avcılar – Taksim', distanceKm: 31, paidCrossingNote: 'Otoyol tercihine göre eklenebilir' },
  { name: 'Beylikdüzü – Taksim', distanceKm: 40, paidCrossingNote: 'Otoyol tercihine göre eklenebilir' },
  { name: 'Levent – Bakırköy', distanceKm: 24, paidCrossingNote: 'Ücretli geçiş genellikle gerekmez' },
  { name: 'Zincirlikuyu – Kadıköy', distanceKm: 14, paidCrossingNote: 'Köprü bedeli hariç' },
  { name: 'Söğütlüçeşme – Taksim', distanceKm: 16, paidCrossingNote: 'Köprü veya tünel bedeli hariç' },
  { name: 'Yenikapı – Kadıköy', distanceKm: 15, paidCrossingNote: 'Tünel bedeli hariç' },
  { name: 'Esenler Otogarı – Taksim', distanceKm: 13, paidCrossingNote: 'Ücretli geçiş genellikle gerekmez' },
  { name: 'Sabiha Gökçen – Kadıköy', distanceKm: 35, paidCrossingNote: 'Otoyol ücretleri hariç' },
] as const;
