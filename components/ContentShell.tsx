import type { ReactNode } from 'react';
import { Breadcrumbs } from './Breadcrumbs';

export function ContentShell({ title, description, path, meta, featuredImage, children }: { title: string; description: string; path: string; meta?: ReactNode; featuredImage?: string; children: ReactNode }) {
  return (
    <div className="container content-shell">
      <Breadcrumbs items={[{ name: 'Ana Sayfa', href: '/' }, { name: title, href: path }]} />
      <article className="article-content"><header className="page-header"><h1>{title}</h1>{meta}<p className="lead">{description}</p>{featuredImage && <img className="article-featured-image" src={featuredImage} alt={`${title} için öne çıkan görsel`} width="1536" height="1024" fetchPriority="high"/>}</header>{children}</article>
    </div>
  );
}
