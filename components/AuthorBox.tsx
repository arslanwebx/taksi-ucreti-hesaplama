import Link from 'next/link';
import { site } from '@/src/data/site';

export function AuthorBox() {
  return (
    <aside className="author-box" aria-label="Yazar hakkında">
      <div className="author-avatar" aria-hidden="true">OA</div>
      <div><h2>Oğuzhan Arslan</h2><p>Taksi tarifelerini belediye, UKOME ve yetkili kurum kaynaklarından inceleyerek hesapları sade Türkçeyle anlatır. Doğrulanamayan ücretleri yayımlamaz.</p><Link href={site.author.url}>Yazar ve inceleme yöntemi →</Link></div>
    </aside>
  );
}
