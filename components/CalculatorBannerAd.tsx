const adKey = '87459de66f29ba70c8041580c730cd03';

const adDocument = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=300,initial-scale=1"><style>html,body{width:300px;height:250px;margin:0;overflow:hidden;background:transparent}</style></head><body><script>window.atOptions={'key':'${adKey}','format':'iframe','height':250,'width':300,'params':{}};</script><script src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script></body></html>`;

export function CalculatorBannerAd({ lazy = false }: { lazy?: boolean }) {
  return <aside className="calculator-banner-ad" aria-label="Reklam"><iframe srcDoc={adDocument} title="Reklam" width="300" height="250" scrolling="no" loading={lazy ? 'lazy' : 'eager'} sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox" referrerPolicy="strict-origin-when-cross-origin"/></aside>;
}
