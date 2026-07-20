import Link from 'next/link';
import { formatDate } from '@/src/data/cities';
import { site } from '@/src/data/site';

export function ArticleMeta({ modified, category, readingMinutes }: { modified: string; category: string; readingMinutes: number }) {
  return <div className="article-meta"><span>Yazan: <Link className="article-meta-author" href={site.author.url}>{site.author.name}</Link></span><span>•</span><time dateTime={modified}>Güncellendi: {formatDate(modified)}</time><span>•</span><span>{category}</span><span>•</span><span>{readingMinutes} dk okuma</span></div>;
}
