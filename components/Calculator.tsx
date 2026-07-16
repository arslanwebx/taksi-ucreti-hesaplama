'use client';

import Link from 'next/link';
import { useEffect, useId, useMemo, useRef, useState } from 'react';
import {
  calculateFare,
  fareQualityLabel,
  formatCurrency,
  normalizeCitySearch,
  parseDecimal,
  readCalculatorQuery,
} from '@/lib/taxi-calculator';
import { cityGuidePaths, formatDate } from '@/src/data/cities';
import { taxiFareBySlug, taxiFares, type TaxiFare } from '@/src/data/taxi-fares';

const decimal = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });
const citySlugs = new Set(taxiFares.map((city) => city.slug));
const quickDistances = [3, 5, 10, 15, 20, 30] as const;
const popularCitySlugs = ['istanbul', 'ankara', 'izmir', 'antalya', 'bursa', 'adana', 'konya', 'gaziantep', 'kocaeli', 'mersin'];
const popularCityOrder = new Map(popularCitySlugs.map((slug, index) => [slug, index]));

type Result = ReturnType<typeof calculateFare> & { city: TaxiFare; km: number; waitingMinutes: number };

function sourceName(sourceUrl: string) {
  try {
    return new URL(sourceUrl).hostname.replace(/^www\./, '');
  } catch {
    return 'Tarife kaynağı';
  }
}

export function Calculator({ fixedCity }: { fixedCity?: string }) {
  const id = useId().replace(/:/g, '');
  const listRef = useRef<HTMLDivElement>(null);
  const available = useMemo(
    () => fixedCity
      ? taxiFares.filter((city) => city.slug === fixedCity)
      : [...taxiFares].sort((first, second) => {
        const firstOrder = popularCityOrder.get(first.slug) ?? Number.MAX_SAFE_INTEGER;
        const secondOrder = popularCityOrder.get(second.slug) ?? Number.MAX_SAFE_INTEGER;
        return firstOrder - secondOrder || first.city.localeCompare(second.city, 'tr');
      }),
    [fixedCity],
  );
  const preset = fixedCity ? available[0] : taxiFareBySlug.istanbul;
  const [query, setQuery] = useState(preset?.city ?? '');
  const [selected, setSelected] = useState<TaxiFare | undefined>(preset);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [km, setKm] = useState('');
  const [showExtras, setShowExtras] = useState(false);
  const [waiting, setWaiting] = useState('0');
  const [extra, setExtra] = useState('0');
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  const filtered = useMemo(() => {
    const needle = normalizeCitySearch(query);
    if (!needle || selected?.city === query) return available;
    return available.filter((item) => normalizeCitySearch(item.city).includes(needle)
      || String(item.plateCode).padStart(2, '0').includes(needle));
  }, [available, query, selected]);

  const popularCalculations = useMemo(
    () => selected ? quickDistances.map((distanceKm) => ({
      distanceKm,
      total: calculateFare(selected, distanceKm).total,
    })) : [],
    [selected],
  );
  const selectedGuidePath = selected ? cityGuidePaths[selected.slug] : undefined;

  useEffect(() => {
    if (fixedCity) return;
    const restored = readCalculatorQuery(window.location.search, citySlugs);
    const restoredCity = restored.city ? taxiFareBySlug[restored.city] : undefined;
    let initialCity = restoredCity;
    if (!initialCity) {
      try { initialCity = taxiFareBySlug[localStorage.getItem('taksi-son-sehir') ?? '']; } catch {}
    }
    initialCity ??= taxiFareBySlug.istanbul;
    if (initialCity) {
      setSelected(initialCity);
      setQuery(initialCity.city);
    }
    if (restored.distance !== undefined && initialCity) {
      const waitingMinutes = initialCity.waitingFarePerMinute ? (restored.waiting ?? 0) : 0;
      const additional = restored.extra ?? 0;
      setKm(String(restored.distance).replace('.', ','));
      setWaiting(String(waitingMinutes).replace('.', ','));
      setExtra(String(additional).replace('.', ','));
      setShowExtras(waitingMinutes > 0 || additional > 0);
      setResult({
        city: initialCity,
        km: restored.distance,
        waitingMinutes,
        ...calculateFare(initialCity, restored.distance, waitingMinutes, additional),
      });
    }
  }, [fixedCity]);

  useEffect(() => {
    if (fixedCity) return;
    const selectCity = (event: Event) => {
      const slug = (event as CustomEvent<{ slug?: string }>).detail?.slug;
      const city = slug ? taxiFareBySlug[slug] : undefined;
      if (!city) return;
      setSelected(city);
      setQuery(city.city);
      setOpen(false);
      setActive(0);
      setResult(null);
      setError('');
      setFeedback(`${city.city} tarifesi hesaplayıcıya yüklendi.`);
      try { localStorage.setItem('taksi-son-sehir', city.slug); } catch {}
    };
    window.addEventListener('taxi-city-select', selectCity);
    return () => window.removeEventListener('taxi-city-select', selectCity);
  }, [fixedCity]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  function choose(city: TaxiFare) {
    setSelected(city);
    setQuery(city.city);
    setOpen(false);
    setActive(0);
    setResult(null);
    setError('');
    setFeedback('');
    if (!fixedCity) {
      try { localStorage.setItem('taksi-son-sehir', city.slug); } catch {}
    }
  }

  function loadDistance(distanceKm: number) {
    setKm(String(distanceKm));
    setResult(null);
    setError('');
    document.getElementById(`${id}-km`)?.focus();
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setOpen(true);
      setActive((value) => Math.min(value + 1, filtered.length - 1));
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      setActive((value) => Math.max(value - 1, 0));
    } else if (event.key === 'Enter' && open && filtered[active]) {
      event.preventDefault();
      choose(filtered[active]);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  function calculate(event: React.FormEvent) {
    event.preventDefault();
    setFeedback('');
    if (!selected) {
      setError('Lütfen listeden bir şehir seçin.');
      return;
    }
    const distanceKm = parseDecimal(km);
    const waitingMinutes = selected.waitingFarePerMinute && showExtras ? parseDecimal(waiting || '0') : 0;
    const additional = showExtras ? parseDecimal(extra || '0') : 0;
    if (!Number.isFinite(distanceKm) || distanceKm < 0.1 || distanceKm > 500) {
      setError('Mesafeyi 0,1 ile 500 km arasında girin.');
      return;
    }
    if (!Number.isFinite(waitingMinutes) || waitingMinutes < 0 || waitingMinutes > 600) {
      setError('Bekleme süresi 0 ile 600 dakika arasında olmalıdır.');
      return;
    }
    if (!Number.isFinite(additional) || additional < 0 || additional > 100000) {
      setError('Ek ücret 0 ile 100.000 TL arasında olmalıdır.');
      return;
    }
    const nextResult = {
      city: selected,
      km: distanceKm,
      waitingMinutes,
      ...calculateFare(selected, distanceKm, waitingMinutes, additional),
    };
    setError('');
    setResult(nextResult);
    if (!fixedCity) {
      const params = new URLSearchParams({ city: selected.slug, distance: String(distanceKm) });
      if (waitingMinutes > 0) params.set('waiting', String(waitingMinutes));
      if (additional > 0) params.set('extra', String(additional));
      window.history.replaceState(null, '', `/?${params.toString()}#hesaplayici`);
    }
  }

  function reset() {
    const city = fixedCity ? preset : taxiFareBySlug.istanbul;
    setSelected(city);
    setQuery(city?.city ?? '');
    setKm('');
    setWaiting('0');
    setExtra('0');
    setShowExtras(false);
    setResult(null);
    setError('');
    setFeedback('Hesaplama sıfırlandı.');
    if (!fixedCity) window.history.replaceState(null, '', '/#hesaplayici');
  }

  function resultText() {
    if (!result) return '';
    const parts = [
      `${result.city.city} için ${decimal.format(result.km)} km taksi tahmini: ${formatCurrency(result.total)}`,
      `Açılış: ${formatCurrency(result.opening)}`,
      `Mesafe: ${decimal.format(result.km)} km × ${formatCurrency(result.city.perKmFare)} = ${formatCurrency(result.distance)}`,
    ];
    if (result.waiting > 0) parts.push(`Bekleme: ${formatCurrency(result.waiting)}`);
    if (result.additional > 0) parts.push(`Ek ücret: ${formatCurrency(result.additional)}`);
    if (result.adjustment > 0) parts.push(`Minimum ücret farkı: ${formatCurrency(result.adjustment)}`);
    parts.push(`Kaynak: ${result.city.sourceUrl}`);
    return parts.join('\n');
  }

  async function copyResult() {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(resultText());
      setFeedback('Sonuç panoya kopyalandı.');
    } catch {
      setFeedback('Sonuç kopyalanamadı.');
    }
  }

  async function shareResult() {
    if (!result) return;
    const shareData = { title: `${result.city.city} taksi ücreti tahmini`, text: resultText(), url: window.location.href };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setFeedback('Paylaşım ekranı açıldı.');
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
        setFeedback('Paylaşım bağlantısı panoya kopyalandı.');
      }
    } catch (shareError) {
      if ((shareError as Error).name !== 'AbortError') setFeedback('Sonuç paylaşılamadı.');
    }
  }

  return (
    <section className="calculator" aria-labelledby={`${id}-title`} id={fixedCity ? undefined : 'hesaplayici'}>
      <div className="calc-heading">
        <div>
          {fixedCity
            ? <h3 id={`${id}-title`}>Yolculuk bilgileri</h3>
            : <h2 id={`${id}-title`}>Taksi ücretini hesaplayın</h2>}
          <p>Şehri seçin, araçla gidilecek mesafeyi yazın ve tarife dökümünü görün.</p>
        </div>
        <span className="calc-badge">81 il</span>
      </div>
      <form onSubmit={calculate} noValidate>
        <div className="calc-fields">
          <div className="field city-field">
            <label htmlFor={`${id}-city`}>Şehir</label>
            <div className="combobox-wrap">
              <span className="field-icon" aria-hidden="true">⌖</span>
              <input
                id={`${id}-city`}
                value={query}
                readOnly={Boolean(fixedCity)}
                autoComplete="off"
                placeholder="Şehir adı veya plaka kodu"
                role="combobox"
                aria-autocomplete="list"
                aria-expanded={open}
                aria-controls={`${id}-listbox`}
                aria-activedescendant={open && filtered[active] ? `${id}-option-${filtered[active].slug}` : undefined}
                onClick={() => !fixedCity && setOpen((value) => !value)}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setSelected(undefined);
                  setOpen(true);
                  setActive(0);
                  setResult(null);
                }}
                onKeyDown={onKeyDown}
              />
              {!fixedCity && <button className="combo-toggle" type="button" aria-label="Şehir listesini aç veya kapat" onClick={() => setOpen((value) => !value)}>⌄</button>}
              {!fixedCity && (
                <div ref={listRef} id={`${id}-listbox`} className="city-listbox" role="listbox" aria-label="Türkiye illeri" hidden={!open}>
                  <div className="listbox-summary">{filtered.length} şehir gösteriliyor</div>
                  {filtered.length ? filtered.map((city, index) => (
                    <button
                      key={city.slug}
                      id={`${id}-option-${city.slug}`}
                      data-index={index}
                      type="button"
                      role="option"
                      aria-selected={selected?.slug === city.slug}
                      className={active === index ? 'is-active' : ''}
                      onMouseDown={(event) => event.preventDefault()}
                      onMouseEnter={() => setActive(index)}
                      onClick={() => choose(city)}
                    >
                      <span><strong>{city.city}</strong><small>{String(city.plateCode).padStart(2, '0')} plaka</small></span>
                    </button>
                  )) : <p className="no-city">Aramanızla eşleşen şehir bulunamadı.</p>}
                </div>
              )}
            </div>
            <small>{selected ? `${selected.city} tarifesi seçildi.` : 'İstanbul, Izmir, Sanliurfa veya plaka koduyla arayabilirsiniz.'}</small>
          </div>

          <div className="field distance-field">
            <label htmlFor={`${id}-km`}>Mesafe</label>
            <div className="input-suffix">
              <input id={`${id}-km`} value={km} onChange={(event) => { setKm(event.target.value); setResult(null); }} inputMode="decimal" placeholder="Örn. 7,5" aria-describedby={`${id}-distance-help`}/>
              <span>km</span>
            </div>
            <small id={`${id}-distance-help`}>Haritadaki araçla gidilecek yol mesafesini kullanın.</small>
          </div>

          <fieldset className="quick-distance">
            <legend>Hızlı mesafe</legend>
            <div>{quickDistances.map((value) => <button key={value} type="button" aria-pressed={km === String(value)} onClick={() => loadDistance(value)}>{value} km</button>)}</div>
          </fieldset>

          <label className="extras-toggle">
            <input type="checkbox" checked={showExtras} onChange={(event) => { setShowExtras(event.target.checked); setResult(null); }}/>
            <span className="switch" aria-hidden="true"/>
            <span><strong>Ek yol ücreti ekle</strong><small>Köprü, tünel, otoyol veya bildiğiniz diğer tutar</small></span>
          </label>

          {showExtras && (
            <div className="optional-fields">
              {selected?.waitingFarePerMinute !== undefined && (
                <div className="field">
                  <label htmlFor={`${id}-waiting`}>Bekleme süresi</label>
                  <div className="input-suffix"><input id={`${id}-waiting`} value={waiting} onChange={(event) => { setWaiting(event.target.value); setResult(null); }} inputMode="decimal"/><span>dk</span></div>
                </div>
              )}
              <div className="field">
                <label htmlFor={`${id}-extra`}>Ek geçiş ücreti</label>
                <div className="input-suffix">
                  <input id={`${id}-extra`} value={extra} onChange={(event) => { setExtra(event.target.value); setResult(null); }} inputMode="decimal"/>
                  <span>TL</span>
                </div>
              </div>
            </div>
          )}
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="calculate-button" type="submit"><span aria-hidden="true">↗</span> Tahmini ücreti hesapla</button>
        <p className="calc-disclaimer">Sonuç tahminidir; kesin tutarı taksimetre, gerçek rota ve yerel uygulama belirler.</p>
      </form>

      <section className={result ? 'result has-result' : 'result'} aria-live="polite">
        {!result ? (
          <div className="result-empty"><span aria-hidden="true">₺</span><div><h3>Tahmini toplam burada görünür</h3><p>Şehir ve mesafe seçerek şeffaf ücret dökümünü alın.</p></div></div>
        ) : (
          <div className="fare-result">
            <header><div><span>{result.city.city} · {fareQualityLabel(result.city.isEstimated, result.city.dataStatus)}</span><h3>{formatCurrency(result.total)}</h3></div><strong>{decimal.format(result.km)} km</strong></header>
            <dl>
              <div><dt>Açılış ücreti</dt><dd>{formatCurrency(result.opening)}</dd></div>
              <div><dt>Mesafe bedeli <small>{decimal.format(result.km)} km × {formatCurrency(result.city.perKmFare)}</small></dt><dd>{formatCurrency(result.distance)}</dd></div>
              {result.waiting > 0 && <div><dt>Bekleme bedeli <small>{decimal.format(result.waitingMinutes)} dk</small></dt><dd>{formatCurrency(result.waiting)}</dd></div>}
              {result.additional > 0 && <div><dt>Ek geçiş ücreti</dt><dd>{formatCurrency(result.additional)}</dd></div>}
              {result.adjustment > 0 && <div><dt>Minimum ücret farkı</dt><dd>{formatCurrency(result.adjustment)}</dd></div>}
              <div className="total-row"><dt>Tahmini toplam</dt><dd>{formatCurrency(result.total)}</dd></div>
            </dl>
            {result.adjustment > 0 && <p className="minimum-note">Hesaplanan tutar şehrin minimum yolculuk ücretinin altında kaldığı için minimum ücret uygulanmıştır.</p>}
            <div className="fare-source">
              <span><strong>Kaynak niteliği:</strong> {fareQualityLabel(result.city.isEstimated, result.city.dataStatus)}</span>
              <span><strong>Tarife referansı:</strong> {result.city.referenceDate}</span>
              <span><strong>Son kontrol:</strong> {formatDate(result.city.lastVerified)}</span>
              <a href={result.city.sourceUrl} target="_blank" rel="noopener noreferrer">{sourceName(result.city.sourceUrl)} kaynağını açın</a>
            </div>
            {result.city.isEstimated && <p className="estimated-warning">Bu şehir için kullanılan tarife mevcut kaynaklara dayalı tahmini bir değerdir. Güncel taksimetre tutarı farklı olabilir.</p>}
            <div className="result-actions">
              <button type="button" onClick={reset}>Hesaplamayı sıfırla</button>
              <button type="button" onClick={copyResult}>Sonucu kopyala</button>
              <button type="button" onClick={shareResult}>Sonucu paylaş</button>
            </div>
            {feedback && <p className="action-feedback" aria-live="polite">{feedback}</p>}
          </div>
        )}
      </section>

      {selected && (
        <div className="calculator-insights">
          <section className="tariff-summary" aria-labelledby={`${id}-tariff-title`}>
            <div className="insight-heading"><div><h3 id={`${id}-tariff-title`}>{selected.city} Taksi Tarifesi</h3><p>{fareQualityLabel(selected.isEstimated, selected.dataStatus)} · Son kontrol {formatDate(selected.lastVerified)}</p></div>{selectedGuidePath && <Link href={selectedGuidePath}>Şehir rehberini aç →</Link>}</div>
            <dl>
              <div><dt>Açılış ücreti</dt><dd>{formatCurrency(selected.openingFare)}</dd></div>
              <div><dt>Kilometre ücreti</dt><dd>{formatCurrency(selected.perKmFare)}</dd></div>
              <div><dt>Minimum / indi bindi</dt><dd>{formatCurrency(selected.minimumFare)}</dd></div>
              <div><dt>Bekleme ücreti</dt><dd>{selected.waitingFarePerMinute === undefined ? 'Belgelenmiş veri yok' : `${formatCurrency(selected.waitingFarePerMinute)} / dk`}</dd></div>
            </dl>
            <p><strong>Referans:</strong> {selected.referenceDate} · <a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer">Kaynağı inceleyin</a></p>
          </section>
          <section className="popular-calculations" aria-labelledby={`${id}-popular-title`}>
            <div className="insight-heading"><div><h3 id={`${id}-popular-title`}>Popüler Taksi Mesafeleri</h3><p>{selected.city} için ek ücret girilmeden hesaplanır.</p></div></div>
            <div>{popularCalculations.map((item) => <button type="button" key={item.distanceKm} onClick={() => loadDistance(item.distanceKm)}><span>{item.distanceKm} km</span><strong>{formatCurrency(item.total)}</strong><small>Hesaba yükle</small></button>)}</div>
          </section>
        </div>
      )}
      <noscript><p className="noscript-note">Hesaplayıcı için JavaScript gerekir. Temel formül: açılış ücreti + kilometre × kilometre tarifesi; sonuç minimum ücretin altındaysa minimum ücret uygulanır. <Link href="/sehirler/">Şehir tarifelerini inceleyin.</Link></p></noscript>
    </section>
  );
}
