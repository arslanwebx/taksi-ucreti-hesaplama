'use client';

import { useState } from 'react';

export function TableOfContents({ items }: { items: { id: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  return <nav className="toc" aria-label="İçindekiler"><button type="button" aria-expanded={open} onClick={() => setOpen((value) => !value)}><span>İçindekiler</span><span aria-hidden="true">{open ? '−' : '+'}</span></button>{open && <ol>{items.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}</ol>}</nav>;
}
