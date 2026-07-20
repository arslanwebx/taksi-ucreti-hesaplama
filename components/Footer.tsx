import Link from 'next/link';
import { Logo } from './Logo';
import { site } from '@/src/data/site';

const guides = [['Şehirler', '/sehirler/'], ['Havalimanı ücretleri', '/havalimani-taksi-ucretleri/'], ['Blog', '/blog/'], ['Site haritası', '/sitemap/']] as const;
const policies = [['Veri Kaynakları', '/veri-kaynaklari-ve-hesaplama-yontemi/'], ['Hakkımızda', '/hakkimizda/'], ['İletişim', '/iletisim/'], ['Gizlilik', '/gizlilik-politikasi/'], ['Çerezler', '/cerez-politikasi/'], ['Kullanım koşulları', '/kullanim-kosullari/'], ['Sorumluluk reddi', '/sorumluluk-reddi/']] as const;
const socialLinks = [
  ['Pinterest', 'https://www.pinterest.com/taksiucreti/', <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12.04 2C6.5 2 3 5.9 3 10.19c0 2.74 1.04 5.18 3.28 6.08.37.14.7.01.81-.4l.3-1.17c.1-.4.06-.53-.22-.86-.62-.73-1.02-1.67-1.02-3.01 0-3.88 2.9-7.36 7.55-7.36 4.12 0 6.38 2.52 6.38 5.89 0 4.43-1.96 8.17-4.87 8.17-1.61 0-2.82-1.33-2.43-2.97.46-1.95 1.35-4.05 1.35-5.46 0-1.26-.68-2.31-2.07-2.31-1.64 0-2.95 1.7-2.95 3.98 0 1.45.49 2.43.49 2.43l-1.98 8.39c-.59 2.5-.09 5.56-.05 5.87.02.18.25.22.35.09.14-.18 1.95-2.41 2.57-4.65.18-.63 1.01-3.95 1.01-3.95.5.95 1.95 1.79 3.49 1.79 4.59 0 7.7-4.18 7.7-9.78C21.1 5.94 17.35 2 12.04 2Z" /></svg>],
  ['LinkedIn', 'https://www.linkedin.com/in/taksiucretihesaplama/', <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3C4.17 3 3.3 3.87 3.3 4.95s.87 1.95 1.95 1.95 1.95-.87 1.95-1.95S6.33 3 5.25 3ZM20.7 13.4c0-3.47-1.85-5.08-4.32-5.08-1.99 0-2.88 1.09-3.38 1.86V8.5H9.62V20H13v-5.7c0-1.5.28-2.95 2.14-2.95 1.83 0 1.85 1.71 1.85 3.05V20h3.38l.33-6.6Z" /></svg>],
  ['X', 'https://x.com/taksi_ucreti', <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.9 2H22l-6.78 7.75L23.2 22h-6.25l-4.9-7.14L5.8 22H2.7l7.25-8.28L2.3 2h6.4l4.43 6.52L18.9 2Zm-1.09 18h1.72L7.77 3.9H5.92L17.81 20Z" /></svg>],
  ['Medium', 'https://medium.com/@taksiucreti', <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6.5a1.5 1.5 0 0 0-.5-1.25L1 3.45V3h6.1l4.72 10.35L15.98 3H21v.45l-1.27 1.21a.38.38 0 0 0-.14.36v13.96a.38.38 0 0 0 .14.36L21 20.55V21h-6.37v-.45l1.32-1.24c.13-.13.13-.17.13-.36V7.67L11.02 21h-.68L4.45 8.02v9.2c-.04.25.05.5.23.67l1.72 2.09V20H1.5v-.45l1.72-2.09a.78.78 0 0 0 .22-.67V6.5H3Z" /></svg>],
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand"><Logo footer /><p>Türkiye’de şehir bazlı taksi tarifelerini anlaşılır hesaplara dönüştüren bağımsız yolculuk rehberi.</p><ul className="footer-social-links" aria-label="Sosyal medya">{socialLinks.map(([name, href, icon]) => <li key={name}>{href ? <a href={href} target="_blank" rel="noreferrer" aria-label={name}>{icon}</a> : <span aria-label={`${name} yakında`}>{icon}</span>}</li>)}</ul></div>
        <div><h2>Hızlı bağlantılar</h2><ul className="footer-links">{guides.map(([name, href]) => <li key={href}><Link href={href}>{name}</Link></li>)}</ul></div>
        <div><h2>Şeffaflık</h2><ul className="footer-links">{policies.map(([name, href]) => <li key={href}><Link href={href}>{name}</Link></li>)}</ul></div>
        <div><h2>İletişim</h2><ul className="footer-links footer-contact-links"><li><a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></li></ul><p className="footer-contact-note">Tarife bildirirken mümkünse resmî kaynak bağlantısını ekleyin.</p></div>
      </div>
      <div className="container footer-bottom"><p>© 2026 {site.name}</p><p>{site.disclaimer}</p></div>
    </footer>
  );
}
