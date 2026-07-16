import Link from 'next/link';
import { Logo } from './Logo';
import { site } from '@/src/data/site';

const guides = [['Şehirler', '/sehirler/'], ['Havalimanı ücretleri', '/havalimani-taksi-ucretleri/'], ['Blog', '/blog/'], ['Site haritası', '/sitemap/']] as const;
const policies = [['Hakkımızda', '/hakkimizda/'], ['İletişim', '/iletisim/'], ['Gizlilik', '/gizlilik-politikasi/'], ['Çerezler', '/cerez-politikasi/'], ['Kullanım koşulları', '/kullanim-kosullari/'], ['Sorumluluk reddi', '/sorumluluk-reddi/']] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><Logo footer /><p>Türkiye’de şehir bazlı taksi tarifelerini anlaşılır hesaplara dönüştüren bağımsız yolculuk rehberi.</p></div>
        <div><h2>Hızlı bağlantılar</h2>{guides.map(([name, href]) => <Link key={href} href={href}>{name}</Link>)}</div>
        <div><h2>Şeffaflık</h2>{policies.map(([name, href]) => <Link key={href} href={href}>{name}</Link>)}</div>
        <div><h2>İletişim</h2><a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a><p>Tarife bildirirken mümkünse resmî kaynak bağlantısını ekleyin.</p></div>
      </div>
      <div className="container footer-bottom"><p>© 2026 {site.name}</p><p>{site.disclaimer}</p></div>
    </footer>
  );
}
