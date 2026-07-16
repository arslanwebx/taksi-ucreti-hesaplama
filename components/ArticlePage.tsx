import type { ReactNode } from 'react';
import { ContentShell } from './ContentShell';
import { ArticleMeta } from './ArticleMeta';
import { AuthorBox } from './AuthorBox';
import { JsonLd } from './JsonLd';
import { ArticleFaq, type ArticleFaqItem } from './ArticleFaq';
import { canonical, site } from '@/src/data/site';

export function ArticlePage({ title, description, path, modified, category, readingMinutes, faqs = [], children }: { title: string; description: string; path: string; modified: string; category: string; readingMinutes: number; faqs?: ArticleFaqItem[]; children: ReactNode }) {
  const schema: object[]=[{'@context':'https://schema.org','@type':'BlogPosting',headline:title,description,datePublished:modified,dateModified:modified,mainEntityOfPage:canonical(path),author:{'@type':'Person',name:site.author.name,url:canonical(site.author.url)},publisher:{'@type':'Organization',name:site.publisher,url:site.url}},{'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Ana Sayfa',item:canonical('/')},{'@type':'ListItem',position:2,name:'Blog',item:canonical('/blog/')},{'@type':'ListItem',position:3,name:title,item:canonical(path)}]}];
  if (faqs.length) schema.push({'@context':'https://schema.org','@type':'FAQPage',mainEntity:faqs.map((item)=>({'@type':'Question',name:item.question,acceptedAnswer:{'@type':'Answer',text:item.answer}}))});
  return <><JsonLd data={schema}/><ContentShell title={title} description={description} path={path} meta={<ArticleMeta modified={modified} category={category} readingMinutes={readingMinutes}/>}>{children}{faqs.length>0&&<ArticleFaq items={faqs}/>}<AuthorBox/></ContentShell></>;
}
