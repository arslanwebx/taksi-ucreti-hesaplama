import Link from 'next/link';

export function Logo({ footer = false }: { footer?: boolean }) {
  return (
    <Link className="site-logo" href="/" aria-label="Taksi Ücreti Hesaplama ana sayfa">
      <span className="logo-mark" aria-hidden="true">
        <svg viewBox="0 0 52 42"><path d="M9 23h34l-3-9H15z"/><path d="M5 22h42v12H5z"/><circle cx="15" cy="35" r="5"/><circle cx="37" cy="35" r="5"/><path d="M18 9h16v6H18z"/></svg>
      </span>
      <span><strong>Taksi Ücreti</strong><small>{footer ? 'Güncel tarife rehberi' : 'Hesaplama'}</small></span>
    </Link>
  );
}
