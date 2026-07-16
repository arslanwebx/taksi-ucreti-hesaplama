import type { Metadata } from 'next';
import { ContentShell } from './ContentShell';
import { pages } from '@/src/data/pages';
import { pageMetadata } from '@/lib/seo';

export function policyMetadata(slug: string): Metadata {
  const page = pages.find((item) => item.slug === slug)!;
  return pageMetadata(page.title, page.description, `/${page.slug}/`);
}

export function PolicyContent({ slug }: { slug: string }) {
  const page = pages.find((item) => item.slug === slug)!;
  return <ContentShell title={page.title} description={page.description} path={`/${page.slug}/`}>{page.sections.map(([heading, content]) => <section key={heading}><h2>{heading}</h2><p>{content}</p></section>)}</ContentShell>;
}
