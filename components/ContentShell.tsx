import type { ReactNode } from 'react';
import { Breadcrumbs } from './Breadcrumbs';

export function ContentShell({ title, titleClassName, description, path, meta, featuredImage, children }: { title: string; titleClassName?: string; description: string; path: string; meta?: ReactNode; featuredImage?: string; children: ReactNode }) {
  const smallImage = featuredImage?.replace(/\.jpg$/, '-480.jpg');
  const mediumImage = featuredImage?.replace(/\.jpg$/, '-960.jpg');
  return (
    <div className="container content-shell">
      <Breadcrumbs items={[{ name: 'Ana Sayfa', href: '/' }, { name: title, href: path }]} />
      <article className="article-content"><header className="page-header"><h1 className={titleClassName}>{title}</h1>{meta}<p className="lead">{description}</p>{featuredImage && smallImage && mediumImage && <img className="article-featured-image" src={mediumImage} srcSet={`${smallImage} 480w, ${mediumImage} 960w`} sizes="(max-width: 908px) calc(100vw - 48px), 860px" alt={`${title} için öne çıkan görsel`} width="960" height="640" fetchPriority="high" decoding="async"/>}</header>{children}</article>
    </div>
  );
}
