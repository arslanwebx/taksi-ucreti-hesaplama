import type { Metadata } from 'next';
import { ContactForm } from '@/components/ContactForm';
import { ContentShell } from '@/components/ContentShell';
import { site } from '@/src/data/site';
import { pageMetadata } from '@/lib/seo';

const title='İletişim';
const description='Tarife hatası, hesaplama sorunu veya içerik düzeltme talebinizi Taksi Ücreti Hesaplama ekibine güvenli form üzerinden iletin.';
export const metadata:Metadata=pageMetadata(title,description,'/iletisim/');
export default function ContactPage(){return <ContentShell title={title} description={description} path="/iletisim/"><p>Tarife bildirimlerinde mümkünse resmî karar veya kurum bağlantısını paylaşın. Form verileri yalnızca talebinizi incelemek ve size yanıt vermek için kullanılır.</p><ContactForm/><p>Alternatif iletişim: <a href={`mailto:${site.contactEmail}`}>{site.contactEmail}</a></p></ContentShell>}
