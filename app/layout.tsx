import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';
import { site } from '@/src/data/site';
import './globals.css';

const poppins = Poppins({ subsets: ['latin', 'latin-ext'], weight: ['400', '700', '800'], display: 'swap', variable: '--font-poppins' });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr" className={poppins.variable}><body><a className="skip-link" href="#main">İçeriğe geç</a><Header/><main id="main">{children}</main><Footer/><GoogleAnalytics/><Script src="https://pl30626339.effectivecpmnetwork.com/3e/ca/bf/3ecabf4c4eb5a33bf9402323077afa1b.js" strategy="afterInteractive"/></body></html>;
}
