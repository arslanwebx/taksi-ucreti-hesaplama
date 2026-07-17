export type AnkaraRoute = {
  name: string;
  distanceKm: number;
};

export const ankaraRoutes: readonly AnkaraRoute[] = [
  { name: 'Kızılay – AŞTİ', distanceKm: 6 },
  { name: 'Kızılay – Esenboğa Havalimanı', distanceKm: 30 },
  { name: 'Kızılay – Keçiören', distanceKm: 9 },
  { name: 'Kızılay – Batıkent', distanceKm: 18 },
  { name: 'Kızılay – Eryaman', distanceKm: 24 },
  { name: 'Kızılay – Sincan', distanceKm: 28 },
  { name: 'Kızılay – Gölbaşı', distanceKm: 21 },
  { name: 'Kızılay – Bilkent', distanceKm: 13 },
  { name: 'Kızılay – ODTÜ', distanceKm: 9 },
  { name: 'Kızılay – Ankara Garı', distanceKm: 4 },
  { name: 'AŞTİ – Esenboğa Havalimanı', distanceKm: 37 },
  { name: 'Çankaya – Esenboğa Havalimanı', distanceKm: 33 },
] as const;
