'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { normalizeCitySearch } from '@/lib/taxi-calculator';
import { cityGuidePaths } from '@/src/data/cities';
import { taxiFares } from '@/src/data/taxi-fares';

const popularSlugs = ['istanbul', 'ankara', 'izmir', 'antalya', 'bursa', 'adana', 'konya', 'gaziantep'];

export function CityDirectory() {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => {
    const needle = normalizeCitySearch(query);
    if (!needle) return taxiFares;
    return taxiFares.filter((city) => normalizeCitySearch(city.city).includes(needle)
      || String(city.plateCode).padStart(2, '0').includes(needle));
  }, [query]);
  const popular = popularSlugs.flatMap((slug) => {
    const city = taxiFares.find((item) => item.slug === slug);
    return city ? [city] : [];
  });

  return (
    <div className="city-directory">
      <div className="directory-search">
        <label htmlFor="city-directory-search">Şehir ara</label>
        <input id="city-directory-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="İl adı veya plaka kodu"/>
        <small>{filtered.length} şehir gösteriliyor</small>
      </div>
      {!query && (
        <div className="popular-cities">
          <h3>Popüler şehirler</h3>
          <ul>{popular.map((city) => {
            const guidePath = cityGuidePaths[city.slug];
            return <li key={city.slug}><a href={`/?city=${city.slug}#hesaplayici`}>{city.city}</a>{guidePath && <Link className="guide-link" href={guidePath}>Rehber</Link>}</li>;
          })}</ul>
        </div>
      )}
      <div className="all-cities">
        <h3>{query ? 'Arama sonuçları' : 'Tüm şehirler'}</h3>
        {filtered.length ? <ul>{filtered.map((city) => {
          const guidePath = cityGuidePaths[city.slug];
          return <li key={city.slug}><a href={`/?city=${city.slug}#hesaplayici`}><span>{String(city.plateCode).padStart(2, '0')}</span>{city.city}</a>{guidePath && <Link className="guide-link" href={guidePath}>Şehir rehberi</Link>}</li>;
        })}</ul> : <p>Aramanızla eşleşen şehir bulunamadı.</p>}
      </div>
    </div>
  );
}
