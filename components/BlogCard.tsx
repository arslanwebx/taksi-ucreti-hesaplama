import Link from 'next/link';
import type { PostSummary } from '@/src/data/posts';
import { formatDate } from '@/src/data/cities';
import { site } from '@/src/data/site';

type BlogCardProps = PostSummary & {
  headingLevel?: 'h2' | 'h3';
  showDate?: boolean;
  showCta?: boolean;
};

export function BlogCard({ title, summary, path, category, modified, cta, headingLevel = 'h2', showDate = true, showCta = true }: BlogCardProps) {
  const Heading = headingLevel;
  return <article className="article-card"><div className="article-card-meta"><span>{category}</span>{showDate && <time dateTime={modified}>{formatDate(modified)}</time>}</div><Heading><Link href={path}>{title}</Link></Heading><p>{summary}</p><div className="article-card-author"><span className="mini-avatar" aria-hidden="true">OA</span><Link href={site.author.url}>{site.author.name}</Link></div>{showCta && <Link className="card-link" href={path}>{cta} →</Link>}</article>;
}
