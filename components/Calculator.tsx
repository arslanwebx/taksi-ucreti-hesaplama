'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { fare, formatDate } from '@/src/data/cities';
import { taxiFares, type TaxiFare } from '@/src/data/taxi-fares';

const currency = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' });
const decimal = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });
const normalize = (value: string) => value.trim().toLocaleLowerCase('tr-TR');
const parseNumber = (value: string) => Number(value.replace(',', '.'));

type Result = ReturnType<typeof fare> & { city: TaxiFare; km: number };

export function Calculator({ fixedCity }: { fixedCity?: string }) {
  const id = useId().replace(/:/g, '');
  const listRef = useRef<HTMLDivElement>(null);
  const available = useMemo(
    () => fixedCity ? taxiFares.filter((city) => city.slug === fixedCity) : taxiFares,
    [fixedCity],
  );
  const preset = fixedCity ? available[0] : undefined;
  const [query, setQuery] = useState(preset?.city ?? '');
  const [selected, setSelected] = useState<TaxiFare | undefined>(preset);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [km, setKm] = useState('');
  const [showExtras, setShowExtras] = useState(false);
  const [extra, setExtra] = useState('0');
  const [error, setError] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  const filtered = useMemo(() => {
    const needle = normalize(query);
    if (!needle || selected?.city === query) return available;
    return available.filter((item) => normalize(item.city).includes(needle)
      || String(item.plateCode).padStart(2, '0').includes(needle));
  }, [available, query, selected]);

  useEffect(() => {
    if (fixedCity) return;
    try {
      const saved = localStorage.getItem('taksi-son-sehir');
      const city = available.find((item) => item.slug === saved);
      if (city) {
        setSelected(city);
        setQuery(city.city);
      }
    } catch {}
  }, [available, fixedCity]);

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
    if (!fixedCity) {
      try { localStorage.setItem('taksi-son-sehir', city.slug); } catch {}
    }
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
    setResult(null);
    if (!selected) {
      setError('Lütfen listeden bir şehir seçin.');
      return;
    }
    const distanceKm = parseNumber(km);
    const extraAmount = showExtras ? parseNumber(extra || '0') : 0;
    if (!Number.isFinite(distanceKm) || distanceKm < 0.1 || distanceKm > 500) {
      setError('Mesafeyi 0,1 ile 500 km arasında girin.');
      return;
    }
    if (!Number.isFinite(extraAmount) || extraAmount < 0 || extraAmount > 100000) {
      setError('Ek ücret 0 ile 100.000 TL arasında olmalıdır.');
      return;
    }
    setError('');
    setResult({ city: selected, km: distanceKm, ...fare(selected, distanceKm, extraAmount) });
  }

  return (
    <section className="calculator" aria-labelledby={`${id}-title`} id={fixedCity ? undefined : 'hesaplayici'}>
      <div className="calc-heading">
        <div>
          <h2 id={`${id}-title`}>{fixedCity ? `${preset?.city} taksi ücreti hesaplama` : 'Yolculuğunuzu hesaplayın'}</h2>
          <p>81 il arasından arayın; kaynak ve son kontrol bilgisi sonuçla birlikte gösterilir.</p>
        </div>
        <span className="calc-badge">2026 tarifeleri</span>
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
                onFocus={() => !fixedCity && setOpen(true)}
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
                      <span className="status-ready">Tarife hazır</span>
                    </button>
                  )) : <p className="no-city">Aramanızla eşleşen şehir bulunamadı.</p>}
                </div>
              )}
            </div>
            <small>{selected ? `${selected.city} tarifesi hesaplamaya hazır.` : 'Yazarak filtreleyin veya ok tuşlarıyla seçim yapın.'}</small>
          </div>

          <div className="field distance-field">
            <label htmlFor={`${id}-km`}>Mesafe</label>
            <div className="input-suffix">
              <input id={`${id}-km`} value={km} onChange={(event) => { setKm(event.target.value); setResult(null); }} inputMode="decimal" placeholder="Örn. 12,5"/>
              <span>km</span>
            </div>
          </div>

          <fieldset className="quick-distance">
            <legend>Hızlı mesafe</legend>
            <div>{[3, 5, 10, 15, 20, 30].map((value) => <button key={value} type="button" aria-pressed={km === String(value)} onClick={() => { setKm(String(value)); setResult(null); }}>{value} km</button>)}</div>
          </fieldset>

          <label className="extras-toggle">
            <input type="checkbox" checked={showExtras} onChange={(event) => { setShowExtras(event.target.checked); setResult(null); }}/>
            <span className="switch" aria-hidden="true"/>
            <span><strong>Ek ücret ekle</strong><small>Köprü, tünel, otoyol veya bildiğiniz diğer tutar</small></span>
          </label>

          {showExtras && (
            <div className="optional-fields">
              <div className="field">
                <label htmlFor={`${id}-extra`}>Ek ücret</label>
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
        <p className="calc-disclaimer">Sonuç tahminidir; kesin tutarı taksimetre, rota, trafik ve geçişler belirler.</p>
      </form>
      <section className={result ? 'result has-result' : 'result'} aria-live="polite" aria-atomic="true">
        {!result ? (
          <div className="result-empty"><span aria-hidden="true">₺</span><div><h3>Tahmini ücretiniz burada görünür</h3><p>Şehir ve mesafe seçerek ayrıntılı ücret dökümünü alın.</p></div></div>
        ) : (
          <div className="fare-result">
            <header><div><span>{result.city.city} taksi tarifesi</span><h3>{currency.format(result.total)}</h3></div><strong>{decimal.format(result.km)} km</strong></header>
            <dl>
              <div><dt>Açılış ücreti</dt><dd>{currency.format(result.opening)}</dd></div>
              <div><dt>Mesafe bedeli</dt><dd>{currency.format(result.distance)}</dd></div>
              {result.adjustment > 0 && <div><dt>Minimum ücret uygulaması</dt><dd>{currency.format(result.adjustment)}</dd></div>}
              {result.extra > 0 && <div><dt>Ek ücretler</dt><dd>{currency.format(result.extra)}</dd></div>}
              <div className="total-row"><dt>Tahmini toplam</dt><dd>{currency.format(result.total)}</dd></div>
            </dl>
            <div className="fare-source">
              <span><strong>Tarife referansı:</strong> {result.city.referenceDate}</span>
              <span><strong>Son kontrol:</strong> {formatDate(result.city.lastVerified)}</span>
              <a href={result.city.sourceUrl} target="_blank" rel="noopener noreferrer">Tarife kaynağını inceleyin</a>
            </div>
            {result.city.isEstimated && <p className="estimated-warning">Bu şehir için kullanılan tarife mevcut kaynaklara dayalı tahmini bir değerdir. Güncel taksimetre tutarı farklı olabilir.</p>}
          </div>
        )}
      </section>
    </section>
  );
}
