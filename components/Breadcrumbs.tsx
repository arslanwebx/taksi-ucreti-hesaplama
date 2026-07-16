import Link from 'next/link';

export function Breadcrumbs({ items }: { items: { name: string; href: string }[] }) {
  return <nav className="breadcrumbs" aria-label="İçerik yolu"><ol>{items.map((item, index) => <li key={item.href}>{index < items.length - 1 ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}</li>)}</ol></nav>;
}
