export interface PostSummary {
  title: string;
  summary: string;
  path: string;
  category: 'Şehirler' | 'Havalimanı Taksi Ücretleri' | 'Taksi Rehberleri';
  modified: string;
  cta: string;
  image?: string;
}

export const posts: PostSummary[] = [
  { title: 'Taksi Ücreti Nasıl Hesaplanır?', summary: 'Açılış, mesafe, minimum ücret, bekleme ve ücretli geçişlerin yolculuk tahminini nasıl etkilediğini sade örneklerle öğrenin.', path: '/taksi-ucreti-nasil-hesaplanir/', category: 'Taksi Rehberleri', modified: '2026-07-16', cta: 'Taksi ücreti hesabını adım adım incele' },
  { title: 'İndi Bindi Ücreti Nedir?', summary: 'Kısa yolculuklarda minimum ücretin ne zaman uygulandığını ve neden ayrı bir ek ücret olmadığını öğrenin.', path: '/indi-bindi-ucreti-nedir/', category: 'Taksi Rehberleri', modified: '2026-07-16', cta: 'Minimum ücret uygulamasını öğren' },
  { title: 'İstanbul Taksi Ücreti Hesaplama 2026', summary: 'İstanbul açılış, kilometre ve minimum ücret kaydını; iki yaka rotaları ve ücretli geçiş notlarıyla inceleyin.', path: '/istanbul-taksi-ucreti/', category: 'Şehirler', modified: '2026-07-16', cta: 'İstanbul taksi ücretini hesapla', image: '/blog/istanbul-taksi-ucreti.jpg' },
  { title: 'Ankara Taksi Ücreti Hesaplama 2026', summary: 'Ankara tarife kaydıyla Kızılay, AŞTİ ve çevre ilçeler için araç rotası mesafesine dayalı tahmin yapın.', path: '/ankara-taksi-ucreti/', category: 'Şehirler', modified: '2026-07-16', cta: 'Ankara taksi tarifesini incele', image: '/blog/ankara-taksi-ucreti.jpg' },
  { title: 'İzmir Taksi Ücreti Hesaplama 2026', summary: 'İzmir merkez tarifesini, minimum ücreti ve Konak, Bornova, Karşıyaka bağlantılarını kaynaklarıyla görün.', path: '/izmir-taksi-ucreti/', category: 'Şehirler', modified: '2026-07-16', cta: 'İzmir taksi ücretini hesapla', image: '/blog/izmir-taksi-ucreti.jpg' },
  { title: 'Antalya Taksi Ücreti Hesaplama 2026', summary: 'Antalya merkez tarifesiyle Lara, Konyaaltı ve turizm bölgelerine yönelik yolculuğunuzu planlayın.', path: '/antalya-taksi-ucreti/', category: 'Şehirler', modified: '2026-07-16', cta: 'Antalya taksi tarifesini incele', image: '/blog/antalya-taksi-ucreti.jpg' },
  { title: 'İstanbul Havalimanı Taksi Ücreti – Hesaplama Aracı (2026)', summary: 'İstanbul Havalimanı ile popüler varış noktaları arasındaki araç mesafesini merkezî tarife kaydıyla değerlendirin.', path: '/istanbul-havalimani-taksi-ucreti/', category: 'Havalimanı Taksi Ücretleri', modified: '2026-07-16', cta: 'İstanbul Havalimanı taksi rehberini aç', image: '/blog/istanbul-havalimani-taksi-ucreti.jpg' },
];

export const cityPosts = posts.filter((post) => post.category === 'Şehirler');
export const airportPosts = posts.filter((post) => post.category === 'Havalimanı Taksi Ücretleri');
export const guidePosts = posts.filter((post) => post.category === 'Taksi Rehberleri');
