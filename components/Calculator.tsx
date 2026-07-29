'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { calculateFare, formatCurrency, parseDecimal, readCalculatorQuery } from '@/lib/taxi-calculator';
import { taxiFareBySlug, taxiFares, type TaxiFare } from '@/src/data/taxi-fares';
import { istanbulTaxiSegments } from '@/src/data/istanbul-taxi-segments';

const quickDistances = [3, 5, 10, 15, 20, 30] as const;
const decimal = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });

type DistancePreset = { name: string; distanceKm: number };
type FareResult = ReturnType<typeof calculateFare> & { city: TaxiFare; km: number };

export function Calculator({ fixedCity, distancePresets = [] }: { fixedCity?: string; distancePresets?: readonly DistancePreset[]; allowWaitingInput?: boolean }) {
  const id = useId().replace(/:/g, '');
  const initialCity = fixedCity ? taxiFareBySlug[fixedCity] : taxiFareBySlug.istanbul;
  const [selected, setSelected] = useState<TaxiFare | undefined>(initialCity);
  const [km, setKm] = useState('');
  const [result, setResult] = useState<FareResult | null>(null);
  const [error, setError] = useState('');
  const validCitySlugs = useMemo(() => new Set(taxiFares.map((city) => city.slug)), []);

  useEffect(() => {
    if (fixedCity) return;
    const restored = readCalculatorQuery(window.location.search, validCitySlugs);
    const city = restored.city ? taxiFareBySlug[restored.city] : undefined;
    if (!city || !restored.distance) return;
    setSelected(city);
    setKm(String(restored.distance).replace('.', ','));
    setResult({ city, km: restored.distance, ...calculateFare(city, restored.distance) });
  }, [fixedCity, validCitySlugs]);

  useEffect(() => {
    if (fixedCity) return;
    const selectCity = (event: Event) => {
      const slug = (event as CustomEvent<{ slug?: string }>).detail?.slug;
      const city = slug ? taxiFareBySlug[slug] : undefined;
      if (!city) return;
      setSelected(city);
      setResult(null);
      setError('');
    };
    window.addEventListener('taxi-city-select', selectCity);
    return () => window.removeEventListener('taxi-city-select', selectCity);
  }, [fixedCity]);

  function selectDistance(distanceKm: number) {
    setKm(String(distanceKm));
    setResult(null);
    setError('');
  }

  function calculate(event: React.FormEvent) {
    event.preventDefault();
    const distanceKm = parseDecimal(km);
    if (!selected) {
      setError('Lütfen bir şehir seçin.');
      return;
    }
    if (!Number.isFinite(distanceKm) || distanceKm < 0.1 || distanceKm > 500) {
      setError('Mesafeyi 0,1 ile 500 km arasında girin.');
      return;
    }
    setError('');
    setResult({ city: selected, km: distanceKm, ...calculateFare(selected, distanceKm) });
    if (!fixedCity) window.history.replaceState(null, '', `/?city=${selected.slug}&distance=${distanceKm}#hesaplayici`);
  }

  const istanbulResults = result?.city.slug === 'istanbul'
    ? istanbulTaxiSegments.map((segment) => ({ ...segment, total: calculateFare(segment, result.km).total }))
    : [];

  return (
    <section className="calculator calculator-simple" id={fixedCity ? undefined : 'hesaplayici'} aria-label="Taksi ücreti hesaplayıcı">
      <form onSubmit={calculate} noValidate>
        <div className="calc-fields">
          {!fixedCity && <label className="field city-field" htmlFor={`${id}-city`}><span>Şehir</span><select id={`${id}-city`} value={selected?.slug ?? ''} onChange={(event) => { setSelected(taxiFareBySlug[event.target.value]); setResult(null); setError(''); }}><option value="">Şehir seçin</option>{taxiFares.map((city) => <option key={city.slug} value={city.slug}>{city.city}</option>)}</select></label>}
          <label className="field distance-field" htmlFor={`${id}-km`}><span>Mesafe</span><span className="input-suffix"><input id={`${id}-km`} value={km} onChange={(event) => { setKm(event.target.value); setResult(null); }} inputMode="decimal" placeholder="Örn. 7,5" /><b>km</b></span></label>
          {distancePresets.length > 0 && <label className="field destination-field" htmlFor={`${id}-destination`}><span>Popüler rota</span><select id={`${id}-destination`} defaultValue="" onChange={(event) => { const route = distancePresets.find((item) => item.name === event.target.value); if (route) selectDistance(route.distanceKm); }}><option value="">Rota seçin</option>{distancePresets.map((route) => <option key={route.name} value={route.name}>{route.name} · {route.distanceKm} km</option>)}</select></label>}
          <fieldset className="quick-distance"><legend>Hızlı mesafe</legend><div>{quickDistances.map((value) => <button key={value} type="button" aria-pressed={km === String(value)} onClick={() => selectDistance(value)}>{value} km</button>)}</div></fieldset>
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="calculate-button" type="submit">Ücreti hesapla</button>
      </form>

      <section className="result" aria-live="polite">
        {!result ? <div className="result-empty"><div><h2>Tahmini ücret</h2><p>Şehir ve mesafe seçtiğinizde sonuç burada görünür.</p></div></div> : (
          <div className="fare-result">
            <header><div><span>{result.city.city} · {decimal.format(result.km)} km</span><h2>{formatCurrency(result.total)}</h2><p>Sarı taksi tahmini</p></div></header>
            {istanbulResults.length > 0 ? <div className="istanbul-fares">{istanbulResults.map((segment) => <article key={segment.name}><span>{segment.name}</span><strong>{formatCurrency(segment.total)}</strong><small>Açılış {formatCurrency(segment.openingFare)} · {formatCurrency(segment.perKmFare)}/km</small></article>)}</div> : <p className="result-note">Güncel sarı taksi tarifesine göre tahmini toplam ücret.</p>}
          </div>
        )}
      </section>
      <p className="calculator-disclaimer">Uyarı: Bekleme süresi, trafik nedeniyle düşük hız, yolcu talebiyle verilen molalar, bagaj işlemleri ve benzeri durumlarda taksimetre ücreti artabilir. Köprü, tünel ve otoyol geçiş ücretleri hesaplamaya dahil değildir; bu güzergâhlar kullanılırsa ödenen geçiş bedelleri toplam ücrete eklenir.</p>
    </section>
  );
}
