'use client';

import { useMemo, useState } from 'react';
import { normalizeCitySearch } from '@/lib/taxi-calculator';
import { taxiFares } from '@/src/data/taxi-fares';

const popularSlugs = ['istanbul', 'ankara', 'izmir', 'antalya', 'bursa', 'adana', 'konya', 'gaziantep', 'kocaeli', 'mersin'];

export function CityDirectory() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const needle = normalizeCitySearch(query);
    if (!needle) return [];
    return taxiFares.filter((city) => normalizeCitySearch(city.city).includes(needle)
      || String(city.plateCode).padStart(2, '0').includes(needle));
  }, [query]);
  const popular = popularSlugs.flatMap((slug) => {
    const city = taxiFares.find((item) => item.slug === slug);
    return city ? [city] : [];
  });
  const selectCity = (slug: string) => {
    window.dispatchEvent(new CustomEvent('taxi-city-select', { detail: { slug } }));
    document.getElementById('hesaplayici')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="city-directory">
      <div className="directory-search">
        <label htmlFor="city-directory-search">Şehir ara</label>
        <input id="city-directory-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="İl adı veya plaka kodu"/>
        <small>{query ? `${filtered.length} eşleşme bulundu` : '81 il arasında arayın'}</small>
      </div>
      {!query && (
        <div className="popular-cities">
          <h3>Popüler şehirler</h3>
          <ul>{popular.map((city) => <li key={city.slug}><button type="button" onClick={() => selectCity(city.slug)}>{city.city}</button></li>)}</ul>
        </div>
      )}
      {query && <div className="all-cities" aria-live="polite">
        <h3>Arama sonuçları</h3>
        {filtered.length ? <ul>{filtered.map((city) => <li key={city.slug}><button type="button" onClick={() => selectCity(city.slug)}><span>{String(city.plateCode).padStart(2, '0')}</span>{city.city}</button></li>)}</ul> : <p>Aramanızla eşleşen şehir bulunamadı.</p>}
      </div>}
    </div>
  );
}
