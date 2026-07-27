import Link from 'next/link';
import { site } from '@/src/data/site';

export function AuthorBox() {
  return (
    <aside className="author-box" aria-label="Yazar hakkında">
      <img className="author-avatar" src={site.author.image} alt="Oğuzhan Arslan" width="164" height="164" />
      <div><h2>Oğuzhan Arslan</h2><p>Tarife kaynaklarını, kontrol tarihlerini ve hesaplama anlatımlarını inceler. Resmî teyidi bulunmayan veya ilçe genellemesi içeren kayıtların tahmini olarak etiketlenmesini sağlar.</p><Link href={site.author.url}>Yazar profilini ve inceleme yaklaşımını aç →</Link></div>
    </aside>
  );
}
