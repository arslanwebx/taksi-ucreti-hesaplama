import assert from 'node:assert/strict';
import test from 'node:test';
import {
  calculateFare,
  calculateCategoryFares,
  categoryTariff,
  fareQualityLabel,
  formatCurrency,
  normalizeCitySearch,
  parseDecimal,
  readCalculatorQuery,
  tariffSourceNeedsCaution,
} from '../lib/taxi-calculator.ts';

const standard = { openingFare: 65, perKmFare: 40, minimumFare: 200 };

test('ordinary fare calculation', () => {
  assert.deepEqual(calculateFare(standard, 10), {
    opening: 65, distance: 400, waiting: 0, additional: 0, subtotal: 465, adjustment: 0, total: 465,
  });
});

test('minimum fare is a threshold rather than an added fee', () => {
  const result = calculateFare(standard, 1);
  assert.equal(result.subtotal, 105);
  assert.equal(result.adjustment, 95);
  assert.equal(result.total, 200);
});

test('all three Turkish taxi categories are calculated from the shared tariff', () => {
  const categories = calculateCategoryFares({ openingFare: 65.4, perKmFare: 43.56, minimumFare: 210 }, 10);
  assert.deepEqual(categories.map(({ id, label, total }) => ({ id, label, total })), [
    { id: 'yellow', label: 'Sarı Taksi Ücreti', total: 501 },
    { id: 'turquoise', label: 'Turkuaz Taksi Ücreti', total: 576.11 },
    { id: 'black', label: 'Siyah VIP Taksi Ücreti', total: 851.68 },
  ]);
});

test('category multipliers reproduce the published Istanbul 2026 tariff components', () => {
  const istanbul = { openingFare: 65.4, perKmFare: 43.56, minimumFare: 210 };
  assert.deepEqual(categoryTariff(istanbul, 'turquoise'), {
    openingFare: 75.21, perKmFare: 50.09, minimumFare: 240, waitingFarePerMinute: undefined,
  });
  assert.deepEqual(categoryTariff(istanbul, 'black'), {
    openingFare: 111.18, perKmFare: 74.05, minimumFare: 360, waitingFarePerMinute: undefined,
  });
});

test('documented waiting charge and additional toll are calculated', () => {
  const result = calculateFare({ ...standard, waitingFarePerMinute: 5 }, 2, 10, 50);
  assert.equal(result.waiting, 50);
  assert.equal(result.additional, 50);
  assert.equal(result.total, 245);
});

test('missing waiting tariff does not invent a waiting charge', () => {
  assert.equal(calculateFare(standard, 5, 30).waiting, 0);
});

test('comma and point decimals are accepted', () => {
  assert.equal(parseDecimal('7,5'), 7.5);
  assert.equal(parseDecimal('7.5'), 7.5);
});

test('zero, negative, infinity and malformed numbers are rejected', () => {
  assert.equal(Number.isNaN(parseDecimal('')), true);
  assert.equal(Number.isNaN(parseDecimal('-1')), true);
  assert.equal(Number.isNaN(parseDecimal('Infinity')), true);
});

test('Turkish city matching ignores Turkish diacritics', () => {
  assert.equal(normalizeCitySearch('Istanbul'), normalizeCitySearch('İstanbul'));
  assert.equal(normalizeCitySearch('Izmir'), normalizeCitySearch('İzmir'));
  assert.equal(normalizeCitySearch('Sanliurfa'), normalizeCitySearch('Şanlıurfa'));
  assert.equal(normalizeCitySearch('Afyon'), 'afyon');
});

test('valid calculator query is restored and malformed values are ignored', () => {
  const result = readCalculatorQuery('?city=istanbul&distance=10,5&extra=25&waiting=4', new Set(['istanbul']));
  assert.deepEqual(result, { city: 'istanbul', distance: 10.5, waiting: 4, extra: 25 });
  assert.deepEqual(readCalculatorQuery('?city=unknown&distance=-1&extra=Infinity', new Set(['istanbul'])), {
    city: undefined, distance: undefined, waiting: undefined, extra: undefined,
  });
});

test('unreasonably large query values are ignored', () => {
  assert.deepEqual(readCalculatorQuery('?city=istanbul&distance=501&waiting=601&extra=100001', new Set(['istanbul'])), {
    city: 'istanbul', distance: undefined, waiting: undefined, extra: undefined,
  });
});

test('Turkish lira formatting is stable', () => {
  const formatted = formatCurrency(1234.5);
  assert.match(formatted, /1\.234,50/);
  assert.match(formatted, /₺|TL/);
});

test('estimated and verified records remain distinguishable', () => {
  assert.equal(fareQualityLabel(true, 'Tahmini - resmî teyit gerekli'), 'Tahmini tarife');
  assert.equal(fareQualityLabel(false, 'Resmî UKOME arşivi - tarife kartı kontrolü önerilir'), 'Tarife kartı kontrolü önerilir');
  assert.equal(fareQualityLabel(false, 'İkincil tarife kaydı - resmî UKOME arşivi bağlantısı'), 'İkincil kaynak kaydı');
  assert.equal(fareQualityLabel(false, 'Resmî belediye meclis kararı'), 'Resmî / yetkili kaynak kaydı');
  assert.equal(fareQualityLabel(false, 'Güncel güçlü kaynak'), 'Güçlü kaynak kaydı');
  assert.equal(fareQualityLabel(false, 'İkincil 2026 tarife'), 'İkincil kaynak kaydı');
  assert.equal(tariffSourceNeedsCaution('İkincil tarife kaydı - resmî UKOME arşivi bağlantısı'), true);
  assert.equal(tariffSourceNeedsCaution('Resmî belediye meclis kararı'), false);
});
