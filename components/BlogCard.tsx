import Link from 'next/link';
import type { PostSummary } from '@/src/data/posts';
import { formatDate } from '@/src/data/cities';
import { site } from '@/src/data/site';

type BlogCardProps = PostSummary & {
  headingLevel?: 'h2' | 'h3';
  showDate?: boolean;
};

export function BlogCard({ title, summary, path, category, modified, image, headingLevel = 'h2', showDate = true }: BlogCardProps) {
  const Heading = headingLevel;
  return <article className="article-card">{image && <Link className="article-card-image" href={path} aria-label={title}><img src={image} alt="" width="1536" height="1024" loading="lazy"/></Link>}<div className="article-card-body"><div className="article-card-meta"><span>{category}</span>{showDate && <time dateTime={modified}>{formatDate(modified)}</time>}</div><Heading><Link href={path}>{title}</Link></Heading><p>{summary}</p><div className="article-card-author"><span className="mini-avatar" aria-hidden="true">OA</span><Link href={site.author.url}>{site.author.name}</Link></div></div></article>;
}
