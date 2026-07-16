import Link from 'next/link';
import { ArticlePage } from './ArticlePage';
import { Calculator } from './Calculator';
import { TableOfContents } from './TableOfContents';
import { fare, formatDate, money, sourceTierLabel, type PublishedCity } from '@/src/data/cities';
import { pageMetadata } from '@/lib/seo';
import type { Metadata } from 'next';

export function cityFareMetadata(city: PublishedCity): Metadata {
  return pageMetadata(`${city.name} Taksi Ücreti Hesaplama 2026`, `${city.name} güncel taksi ücretini hesaplayın. Açılış, kilometre, minimum ücret, bekleme, yerel güzergâh ve kaynak tarihlerini inceleyin.`, city.path, 'article');
}

export function CityFareArticle({ city }: { city: PublishedCity }) {
  const title=`${city.name} Taksi Ücreti Hesaplama 2026`;const description=`${city.name} güncel taksi ücretini hesaplayın. Açılış, kilometre, minimum ücret, bekleme, yerel güzergâh ve kaynak tarihlerini inceleyin.`;
  return <ArticlePage title={title} description={description} path={city.path} modified={city.verifiedDate} category="Şehirler" readingMinutes={6}>
    <p className="notice">{city.name} için bu sayfadaki hesap ve örneklerin tamamı aynı merkezî tarife kaydını kullanır. Kesin yolculuk tutarını taksimetre belirler.</p>
    <TableOfContents items={[{id:'hesaplama',label:`${city.name} taksi ücreti hesaplama`},{id:'tarife',label:'Güncel tarife kalemleri'},{id:'rotalar',label:'Örnek rotalar'},{id:'yerel',label:'Yerel yolculuk notları'},{id:'kaynak',label:'Kaynak ve doğrulama'}]}/>
    <section id="hesaplama"><h2>{city.name} taksi ücreti hesaplama</h2><Calculator fixedCity={city.slug}/></section>
    <section id="tarife"><h2>Güncel tarife kalemleri</h2><div className="table-wrap"><table><thead><tr><th>Araç türü</th><th>Açılış</th><th>Kilometre</th><th>Minimum</th><th>Bekleme / saat</th></tr></thead><tbody>{city.categories.map((category)=><tr key={category.id}><th scope="row">{category.name}</th><td>{money(category.opening)}</td><td>{money(category.perKm)}</td><td>{money(category.minimum)}</td><td>{category.waitingPerHour?money(category.waitingPerHour):'Yayımlanmamış'}</td></tr>)}</tbody></table></div><p>{city.nightTariff.note}</p></section>
    <section id="rotalar"><h2>Örnek rotalar</h2><div className="table-wrap"><table><thead><tr><th>Rota</th><th>Örnek mesafe</th><th>Beklemesiz standart tahmin</th></tr></thead><tbody>{city.routes.map((route)=><tr key={route.name}><th scope="row">{route.name}</th><td>{route.km} km</td><td>{money(fare(city,route.km).total)}</td></tr>)}</tbody></table></div><p>Mesafeler planlama örneğidir; seçilen yol ve başlangıç noktası gerçek uzunluğu değiştirebilir.</p></section>
    <section id="yerel"><h2>Yerel yolculuk notları</h2><ul>{city.local.map((note)=><li key={note}>{note}</li>)}{city.extras.map((note)=><li key={note}>{note}</li>)}</ul>{city.airport&&<p><Link href={city.airport.path}>{city.airport.name} taksi rehberini inceleyin</Link>.</p>}</section>
    <section className="source-box" id="kaynak"><h2>Kaynak ve doğrulama</h2><p><strong>{sourceTierLabel[city.sourceTier]}:</strong> {city.sourceName}. Tarife <time dateTime={city.effectiveDate}>{formatDate(city.effectiveDate)}</time> tarihinde yürürlüğe girdi ve <time dateTime={city.verifiedDate}>{formatDate(city.verifiedDate)}</time> tarihinde yeniden kontrol edildi.</p><a href={city.sourceUrl} rel="external">Tarife kaynağını aç</a></section>
  </ArticlePage>;
}
