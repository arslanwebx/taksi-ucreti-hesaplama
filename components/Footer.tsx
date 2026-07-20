import Link from 'next/link';
import { Logo } from './Logo';
import { site } from '@/src/data/site';

const guides = [['Şehirler', '/sehirler/'], ['Havalimanı ücretleri', '/havalimani-taksi-ucretleri/'], ['Blog', '/blog/'], ['Site haritası', '/sitemap/']] as const;
const policies = [['Veri Kaynakları', '/veri-kaynaklari-ve-hesaplama-yontemi/'], ['Hakkımızda', '/hakkimizda/'], ['İletişim', '/iletisim/'], ['Gizlilik', '/gizlilik-politikasi/'], ['Çerezler', '/cerez-politikasi/'], ['Kullanım koşulları', '/kullanim-kosullari/'], ['Sorumluluk reddi', '/sorumluluk-reddi/']] as const;
const socialLinks = [
  ['Pinterest', 'https://www.pinterest.com/taksiucreti/'],
  ['LinkedIn', ''],
  ['Facebook', ''],
  ['Medium', ''],
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><Logo footer /><p>Türkiye’de şehir bazlı taksi tarifelerini anlaşılır hesaplara dönüştüren bağımsız yolculuk rehberi.</p></div>
        <div><h2>Hızlı bağlantılar</h2><ul className="footer-links">{guides.map(([name, href]) => <li key={href}><Link href={href}>{name}</Link></li>)}</ul></div>
        <div><h2>Şeffaflık</h2><ul className="footer-links">{policies.map(([name, href]) => <li key={href}><Link href={href}>{name}</Link></li>)}</ul></div>
        <div><h2>İletişim</h2><ul className="footer-links footer-contact-links"><li><a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></li></ul><p className="footer-contact-note">Tarife bildirirken mümkünse resmî kaynak bağlantısını ekleyin.</p><h2 className="footer-social-heading">Sosyal medya</h2><ul className="footer-links footer-social-links">{socialLinks.map(([name, href]) => <li key={name}>{href ? <a href={href} target="_blank" rel="noreferrer">{name}</a> : <span>{name}</span>}</li>)}</ul></div>
      </div>
      <div className="container footer-bottom"><p>© 2026 {site.name}</p><p>{site.disclaimer}</p></div>
    </footer>
  );
}
