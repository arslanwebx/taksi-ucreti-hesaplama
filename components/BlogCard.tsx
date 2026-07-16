import Link from 'next/link';
import type { PostSummary } from '@/src/data/posts';
import { formatDate } from '@/src/data/cities';
import { site } from '@/src/data/site';

export function BlogCard({ title, summary, path, category, modified, cta }: PostSummary) {
  return <article className="article-card"><div className="article-card-meta"><span>{category}</span><time dateTime={modified}>{formatDate(modified)}</time></div><h2><Link href={path}>{title}</Link></h2><p>{summary}</p><div className="article-card-author"><span className="mini-avatar" aria-hidden="true">OA</span><span>{site.author.name}</span></div><Link className="card-link" href={path}>{cta} →</Link></article>;
}
