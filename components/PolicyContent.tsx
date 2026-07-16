import type { Metadata } from 'next';
import Link from 'next/link';
import { ContentShell } from './ContentShell';
import { pages } from '@/src/data/pages';
import { formatDate } from '@/src/data/cities';
import { pageMetadata } from '@/lib/seo';

export function policyMetadata(slug: string): Metadata {
  const page = pages.find((item) => item.slug === slug)!;
  return pageMetadata(page.title, page.description, `/${page.slug}/`);
}

export function PolicyContent({ slug }: { slug: string }) {
  const page = pages.find((item) => item.slug === slug)!;
  return <ContentShell title={page.title} description={page.description} path={`/${page.slug}/`} meta={<p className="policy-updated">Son güncelleme: <time dateTime={page.updated}>{formatDate(page.updated)}</time></p>}>
    <nav className="policy-toc" aria-label={`${page.title} bölüm başlıkları`}>
      <strong>Bu sayfada</strong>
      <ul>{page.sections.map((section) => <li key={section.heading}><a href={`#${section.heading.toLocaleLowerCase('tr-TR').replaceAll(' ', '-').replace(/[^\p{L}\p{N}-]/gu, '')}`}>{section.heading}</a></li>)}</ul>
    </nav>
    {page.sections.map((section) => {
      const id = section.heading.toLocaleLowerCase('tr-TR').replaceAll(' ', '-').replace(/[^\p{L}\p{N}-]/gu, '');
      return <section key={section.heading} id={id}>
        <h2>{section.heading}</h2>
        {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
        {section.links && <p className="policy-links">{section.links.map((link, index) => <span key={link.href}>{index > 0 && ' · '}<Link href={link.href}>{link.label}</Link></span>)}</p>}
      </section>;
    })}
  </ContentShell>;
}
