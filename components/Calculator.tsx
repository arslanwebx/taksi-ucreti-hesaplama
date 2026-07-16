'use client';

import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { cities, type City, type PublishedCity } from '@/src/data/cities';

const currency = new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' });
const decimal = new Intl.NumberFormat('tr-TR', { maximumFractionDigits: 2 });
const normalize = (value: string) => value.trim().toLocaleLowerCase('tr-TR');
const parseNumber = (value: string) => Number(value.replace(',', '.'));

export function Calculator({ fixedCity }: { fixedCity?: string }) {
  const id = useId().replace(/:/g, '');
  const listRef = useRef<HTMLDivElement>(null);
  const available = useMemo(() => fixedCity ? cities.filter((city) => city.slug === fixedCity) : cities, [fixedCity]);
  const preset = fixedCity ? available[0] : undefined;
  const [query, setQuery] = useState(preset?.name ?? '');
  const [selected, setSelected] = useState<City | undefined>(preset);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [km, setKm] = useState('');
  const [showExtras, setShowExtras] = useState(false);
  const [minutes, setMinutes] = useState('0');
  const [extra, setExtra] = useState('0');
  const [categoryId, setCategoryId] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<null | { city: PublishedCity; category: PublishedCity['categories'][number]; distance: number; waiting: number; adjustment: number; extra: number; total: number; km: number }>(null);

  const filtered = useMemo(() => {
    const needle = normalize(query);
    if (!needle || selected?.name === query) return available;
    return available.filter((city) => normalize(city.name).includes(needle) || String(city.code).padStart(2, '0').includes(needle));
  }, [available, query, selected]);

  useEffect(() => {
    if (fixedCity) return;
    try {
      const saved = localStorage.getItem('taksi-son-sehir');
      const city = available.find((item) => item.slug === saved);
      if (city) { setSelected(city); setQuery(city.name); }
    } catch {}
  }, [available, fixedCity]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${active}"]`)?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  function choose(city: City) {
    setSelected(city);
    setQuery(city.name);
    setOpen(false);
    setActive(0);
    setCategoryId(city.status === 'published' ? city.categories[0]?.id ?? '' : '');
    setResult(null);
    setError('');
    if (!fixedCity) try { localStorage.setItem('taksi-son-sehir', city.slug); } catch {}
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'ArrowDown') { event.preventDefault(); setOpen(true); setActive((value) => Math.min(value + 1, filtered.length - 1)); }
    else if (event.key === 'ArrowUp') { event.preventDefault(); setOpen(true); setActive((value) => Math.max(value - 1, 0)); }
    else if (event.key === 'Enter' && open && filtered[active]) { event.preventDefault(); choose(filtered[active]); }
    else if (event.key === 'Escape') { setOpen(false); }
  }

  function calculate(event: React.FormEvent) {
    event.preventDefault();
    setResult(null);
    if (!selected) { setError('Lütfen listeden bir şehir seçin.'); return; }
    if (selected.status !== 'published') { setError(`${selected.name} için güncel tarife doğrulanıyor. Yanlış sonuç vermemek için hesaplama henüz kapalıdır.`); return; }
    const distanceKm = parseNumber(km);
    const waitingMinutes = showExtras ? parseNumber(minutes || '0') : 0;
    const extraAmount = showExtras ? parseNumber(extra || '0') : 0;
    if (!Number.isFinite(distanceKm) || distanceKm < 0.1 || distanceKm > 500) { setError('Mesafeyi 0,1 ile 500 km arasında girin.'); return; }
    if (!Number.isFinite(waitingMinutes) || waitingMinutes < 0 || waitingMinutes > 600 || !Number.isFinite(extraAmount) || extraAmount < 0 || extraAmount > 100000) { setError('Bekleme süresi veya ek ücret geçerli değil.'); return; }
    const category = selected.categories.find((item) => item.id === categoryId) ?? selected.categories[0]!;
    const distance = category.opening + distanceKm * category.perKm;
    const waiting = (category.waitingPerHour ?? 0) * waitingMinutes / 60;
    const adjustment = Math.max(0, category.minimum - distance - waiting);
    const total = distance + waiting + adjustment + extraAmount;
    setError('');
    setResult({ city: selected, category, distance, waiting, adjustment, extra: extraAmount, total, km: distanceKm });
  }

  const hasWaiting = selected?.status === 'published' && selected.categories.some((category) => category.waitingPerHour);

  return (
    <section className="calculator" aria-labelledby={`${id}-title`} id={fixedCity ? undefined : 'hesaplayici'}>
      <div className="calc-heading"><div><h2 id={`${id}-title`}>{fixedCity ? `${preset?.name} taksi ücreti hesaplama` : 'Yolculuğunuzu hesaplayın'}</h2><p>81 il arasından arayın; yalnızca kaynağı doğrulanmış tarifeler hesaplanır.</p></div><span className="calc-badge">2026 tarifeleri</span></div>
      <form onSubmit={calculate} noValidate>
        <div className="calc-fields">
          <div className="field city-field">
            <label htmlFor={`${id}-city`}>Şehir</label>
            <div className="combobox-wrap">
              <span className="field-icon" aria-hidden="true">⌖</span>
              <input id={`${id}-city`} value={query} readOnly={Boolean(fixedCity)} autoComplete="off" placeholder="Şehir adı veya plaka kodu" role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={`${id}-listbox`} aria-activedescendant={open && filtered[active] ? `${id}-option-${filtered[active].slug}` : undefined} onFocus={() => !fixedCity && setOpen(true)} onChange={(event) => { setQuery(event.target.value); setSelected(undefined); setOpen(true); setActive(0); setResult(null); }} onKeyDown={onKeyDown} />
              {!fixedCity && <button className="combo-toggle" type="button" aria-label="Şehir listesini aç veya kapat" onClick={() => setOpen((value) => !value)}>⌄</button>}
              {!fixedCity && <div ref={listRef} id={`${id}-listbox`} className="city-listbox" role="listbox" aria-label="Türkiye illeri" hidden={!open}>
                <div className="listbox-summary">{filtered.length} şehir gösteriliyor</div>
                {filtered.length ? filtered.map((city, index) => <button key={city.slug} id={`${id}-option-${city.slug}`} data-index={index} type="button" role="option" aria-selected={selected?.slug === city.slug} className={active === index ? 'is-active' : ''} onMouseDown={(event) => event.preventDefault()} onMouseEnter={() => setActive(index)} onClick={() => choose(city)}><span><strong>{city.name}</strong><small>{String(city.code).padStart(2, '0')} plaka</small></span><span className={city.status === 'published' ? 'status-ready' : 'status-pending'}>{city.status === 'published' ? 'Tarife hazır' : 'Doğrulanıyor'}</span></button>) : <p className="no-city">Aramanızla eşleşen şehir bulunamadı.</p>}
              </div>}
            </div>
            <small>{selected ? (selected.status === 'published' ? `${selected.name} tarifesi hesaplamaya hazır.` : `${selected.name} tarifesi doğrulanıyor.`) : 'Yazarak filtreleyin veya ok tuşlarıyla seçim yapın.'}</small>
          </div>

          <div className="field distance-field"><label htmlFor={`${id}-km`}>Mesafe</label><div className="input-suffix"><input id={`${id}-km`} value={km} onChange={(event) => { setKm(event.target.value); setResult(null); }} inputMode="decimal" placeholder="Örn. 12,5" /><span>km</span></div></div>

          {selected?.status === 'published' && selected.categories.length > 1 && <div className="field category-field"><label htmlFor={`${id}-category`}>Araç türü</label><select id={`${id}-category`} value={categoryId || selected.categories[0]?.id} onChange={(event) => { setCategoryId(event.target.value); setResult(null); }}>{selected.categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></div>}

          <fieldset className="quick-distance"><legend>Hızlı mesafe</legend><div>{[3, 5, 10, 15, 20, 30].map((value) => <button key={value} type="button" aria-pressed={km === String(value)} onClick={() => { setKm(String(value)); setResult(null); }}>{value} km</button>)}</div></fieldset>

          <label className="extras-toggle"><input type="checkbox" checked={showExtras} onChange={(event) => { setShowExtras(event.target.checked); setResult(null); }} /><span className="switch" aria-hidden="true"/><span><strong>Bekleme veya yol ücreti ekle</strong><small>Trafik süresi, köprü, tünel ya da otoyol</small></span></label>

          {showExtras && <div className="optional-fields">{hasWaiting && <div className="field"><label htmlFor={`${id}-minutes`}>Bekleme süresi</label><div className="input-suffix"><input id={`${id}-minutes`} type="number" min="0" max="600" value={minutes} onChange={(event) => { setMinutes(event.target.value); setResult(null); }} /><span>dk</span></div></div>}<div className="field"><label htmlFor={`${id}-extra`}>Ek yol ücreti</label><div className="input-suffix"><input id={`${id}-extra`} value={extra} onChange={(event) => { setExtra(event.target.value); setResult(null); }} inputMode="decimal" /><span>TL</span></div></div></div>}
        </div>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="calculate-button" type="submit"><span aria-hidden="true">↗</span> Tahmini ücreti hesapla</button>
        <p className="calc-disclaimer">Sonuç tahminidir; kesin tutarı taksimetre, rota, trafik ve geçişler belirler.</p>
      </form>
      <section className={result ? 'result has-result' : 'result'} aria-live="polite" aria-atomic="true">
        {!result ? <div className="result-empty"><span aria-hidden="true">₺</span><div><h3>Tahmini ücretiniz burada görünür</h3><p>Şehir ve mesafe seçerek ayrıntılı ücret dökümünü alın.</p></div></div> : <div className="fare-result"><header><div><span>{result.city.name} · {result.category.name}</span><h3>{currency.format(result.total)}</h3></div><strong>{decimal.format(result.km)} km</strong></header><dl><div><dt>Açılış + mesafe</dt><dd>{currency.format(result.distance)}</dd></div>{result.waiting > 0 && <div><dt>Bekleme</dt><dd>{currency.format(result.waiting)}</dd></div>}{result.adjustment > 0 && <div><dt>Minimum ücret farkı</dt><dd>{currency.format(result.adjustment)}</dd></div>}{result.extra > 0 && <div><dt>Köprü / otoyol / ek</dt><dd>{currency.format(result.extra)}</dd></div>}<div className="total-row"><dt>Tahmini toplam</dt><dd>{currency.format(result.total)}</dd></div></dl><p>{result.city.name} tarifesi son kez {new Intl.DateTimeFormat('tr-TR', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(`${result.city.verifiedDate}T00:00:00Z`))} tarihinde kontrol edildi.</p></div>}
      </section>
    </section>
  );
}
