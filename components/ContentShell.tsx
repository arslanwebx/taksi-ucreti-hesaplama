import type { ReactNode } from 'react';
import { Breadcrumbs } from './Breadcrumbs';

export function ContentShell({ title, description, path, meta, children }: { title: string; description: string; path: string; meta?: ReactNode; children: ReactNode }) {
  return (
    <div className="container content-shell">
      <Breadcrumbs items={[{ name: 'Ana Sayfa', href: '/' }, { name: title, href: path }]} />
      <article className="article-content"><header className="page-header"><h1>{title}</h1>{meta}<p className="lead">{description}</p></header>{children}</article>
    </div>
  );
}
