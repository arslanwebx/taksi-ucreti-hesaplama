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

export const taxiCategories = [
  { id: 'yellow', label: 'Sarı Taksi Ücreti', shortLabel: 'Sarı Taksi', meterMultiplier: 1, minimumMultiplier: 1 },
  { id: 'turquoise', label: 'Turkuaz Taksi Ücreti', shortLabel: 'Turkuaz Taksi', meterMultiplier: 1.15, minimumMultiplier: 8 / 7 },
  { id: 'black', label: 'Siyah VIP Taksi Ücreti', shortLabel: 'Siyah VIP Taksi', meterMultiplier: 1.7, minimumMultiplier: 12 / 7 },
] as const;

export type TaxiCategory = typeof taxiCategories[number]['id'];

export type CategoryFareCalculation = FareCalculation & {
  id: TaxiCategory;
  label: string;
  shortLabel: string;
  tariff: FareInput;
};

export type CalculatorQuery = {
  city?: string;
  distance?: number;
  waiting?: number;
  extra?: number;
};

const roundMoney = (value: number) => Math.round((value + Number.EPSILON) * 100) / 100;

export function categoryTariff(tariff: FareInput, category: TaxiCategory): FareInput {
  const definition = taxiCategories.find((item) => item.id === category) ?? taxiCategories[0];
  return {
    openingFare: roundMoney(tariff.openingFare * definition.meterMultiplier),
    perKmFare: roundMoney(tariff.perKmFare * definition.meterMultiplier),
    minimumFare: roundMoney(tariff.minimumFare * definition.minimumMultiplier),
    waitingFarePerMinute: tariff.waitingFarePerMinute === undefined
      ? undefined
      : roundMoney(tariff.waitingFarePerMinute * definition.meterMultiplier),
  };
}

export function calculateCategoryFares(
  tariff: FareInput,
  distanceKm: number,
  waitingMinutes = 0,
  additionalCharges = 0,
): CategoryFareCalculation[] {
  return taxiCategories.map((category) => {
    const adjustedTariff = categoryTariff(tariff, category.id);
    return {
      id: category.id,
      label: category.label,
      shortLabel: category.shortLabel,
      tariff: adjustedTariff,
      ...calculateFare(adjustedTariff, distanceKm, waitingMinutes, additionalCharges),
    };
  });
}

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
  if (/[İi]kincil/.test(dataStatus)) return 'İkincil kaynak kaydı';
  if (/kontrolü önerilir/i.test(dataStatus)) return 'Tarife kartı kontrolü önerilir';
  if (/resmî|yetkili/i.test(dataStatus)) return 'Resmî / yetkili kaynak kaydı';
  if (/güçlü kaynak/i.test(dataStatus)) return 'Güçlü kaynak kaydı';
  return 'İkincil kaynak kaydı';
}

export function tariffSourceNeedsCaution(dataStatus: string): boolean {
  return /[İi]kincil|kontrolü önerilir|teyidi bekliyor/i.test(dataStatus);
}
