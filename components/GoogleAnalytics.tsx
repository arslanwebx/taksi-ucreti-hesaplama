import Script from 'next/script';
import { site } from '@/src/data/site';

export function GoogleAnalytics() {
  if (!site.analyticsId) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.analyticsId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${site.analyticsId}');
      `}</Script>
    </>
  );
}
