'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Logo } from './Logo';
import { site } from '@/src/data/site';

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />
        <button className="menu-button" type="button" aria-expanded={open} aria-controls="primary-navigation" onClick={() => setOpen((value) => !value)}>
          <span aria-hidden="true">☰</span><span>Menü</span>
        </button>
        <nav id="primary-navigation" className={open ? 'primary-nav is-open' : 'primary-nav'} aria-label="Ana menü">
          {site.navigation.map(([name, href]) => <Link key={href} href={href} onClick={() => setOpen(false)}>{name}</Link>)}
          <Link className="nav-cta" href="/#hesaplayici" onClick={() => setOpen(false)}>Ücreti hesapla</Link>
        </nav>
      </div>
    </header>
  );
}
