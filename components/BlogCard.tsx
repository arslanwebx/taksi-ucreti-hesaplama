import Link from 'next/link';
import type { PostSummary } from '@/src/data/posts';
import { formatDate } from '@/src/data/cities';
import { site } from '@/src/data/site';

type BlogCardProps = PostSummary & {
  headingLevel?: 'h2' | 'h3';
  showDate?: boolean;
};

function responsiveImage(image: string) {
  return {
    small: image.replace(/\.jpg$/, '-480.jpg'),
    medium: image.replace(/\.jpg$/, '-960.jpg'),
  };
}

export function BlogCard({ title, summary, path, category, modified, image, headingLevel = 'h2', showDate = true }: BlogCardProps) {
  const Heading = headingLevel;
  const sources = image ? responsiveImage(image) : null;
  return <article className="article-card">{image && sources && <Link className="article-card-image" href={path} aria-label={title}><img src={sources.medium} srcSet={`${sources.small} 480w, ${sources.medium} 960w`} sizes="(max-width: 720px) calc(100vw - 48px), (max-width: 1100px) 45vw, 360px" alt="" width="960" height="640" loading="lazy" decoding="async"/></Link>}<div className="article-card-body"><div className="article-card-meta"><span>{category}</span>{showDate && <time dateTime={modified}>{formatDate(modified)}</time>}</div><Heading><Link href={path}>{title}</Link></Heading><p>{summary}</p><div className="article-card-author"><img className="mini-avatar" src={site.author.image} alt="" width="54" height="54" loading="lazy" decoding="async"/><Link href={site.author.url}>{site.author.name}</Link></div></div></article>;
}
