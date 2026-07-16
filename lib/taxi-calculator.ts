export type FareInput = {
  openingFare: number;
  perKmFare: number;
  minimumFare: number;
  waitingFarePerMinute?: number;
};

export type FareCalculation = {
  opening: number;
  distance: number;
  waiting: number;
  additional: number;
  subtotal: number;
  adjustment: number;
  total: number;
};

export type CalculatorQuery = {
  city?: string;
  distance?: number;
  waiting?: number;
  extra?: number;
};

const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function parseDecimal(value: string): number {
  const normalized = value.trim().replace(',', '.');
  if (!normalized || !/^\d+(?:\.\d+)?$/.test(normalized)) return Number.NaN;
  return Number(normalized);
}

export function calculateFare(
  tariff: FareInput,
  distanceKm: number,
  waitingMinutes = 0,
  additionalCharges = 0,
): FareCalculation {
  const opening = roundMoney(tariff.openingFare);
  const distance = roundMoney(distanceKm * tariff.perKmFare);
  const waiting = roundMoney(waitingMinutes * (tariff.waitingFarePerMinute ?? 0));
  const additional = roundMoney(additionalCharges);
  const subtotal = roundMoney(opening + distance + waiting + additional);
  const adjustment = roundMoney(Math.max(0, tariff.minimumFare - subtotal));
  return { opening, distance, waiting, additional, subtotal, adjustment, total: roundMoney(subtotal + adjustment) };
}

export function normalizeCitySearch(value: string): string {
  return value
    .trim()
    .toLocaleLowerCase('tr-TR')
    .replaceAll('ı', 'i')
    .replaceAll('ğ', 'g')
    .replaceAll('ü', 'u')
    .replaceAll('ş', 's')
    .replaceAll('ö', 'o')
    .replaceAll('ç', 'c')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const boundedNumber = (params: URLSearchParams, key: string, minimum: number, maximum: number) => {
  const raw = params.get(key);
  if (raw === null) return undefined;
  const value = parseDecimal(raw);
  return Number.isFinite(value) && value >= minimum && value <= maximum ? value : undefined;
};

export function readCalculatorQuery(search: string, validCitySlugs: ReadonlySet<string>): CalculatorQuery {
  const params = new URLSearchParams(search);
  const city = params.get('city')?.trim().toLocaleLowerCase('tr-TR');
  return {
    city: city && validCitySlugs.has(city) ? city : undefined,
    distance: boundedNumber(params, 'distance', 0.1, 500),
    waiting: boundedNumber(params, 'waiting', 0, 600),
    extra: boundedNumber(params, 'extra', 0, 100000),
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(value);
}

export function fareQualityLabel(isEstimated: boolean, dataStatus: string): string {
  if (isEstimated) return 'Tahmini tarife';
  if (/güçlü kaynak/i.test(dataStatus)) return 'Güçlü kaynak kaydı';
  return 'İkincil kaynak kaydı';
}
