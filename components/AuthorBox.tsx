import Link from 'next/link';
import { site } from '@/src/data/site';

export function AuthorBox() {
  return (
    <aside className="author-box" aria-label="Yazar hakkında">
      <div className="author-avatar" aria-hidden="true">OA</div>
      <div><h2>Oğuzhan Arslan</h2><p>Tarife kaynaklarını, kontrol tarihlerini ve hesaplama anlatımlarını inceler. Resmî teyidi bulunmayan veya ilçe genellemesi içeren kayıtların tahmini olarak etiketlenmesini sağlar.</p><Link href={site.author.url}>Yazar profilini ve inceleme yaklaşımını aç →</Link></div>
    </aside>
  );
}
