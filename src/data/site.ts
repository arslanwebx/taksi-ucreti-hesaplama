export const site = {
  name: 'Taksi Ücreti Hesaplama',
  url: 'https://taksiucreti-hesaplama.blog',
  titlePattern: '%s | Taksi Ücreti Hesaplama',
  description: 'Şehrinizi ve mesafeyi seçerek güncel taksi ücretini hesaplayın. Açılış, kilometre, indi bindi ve bekleme tarifelerini inceleyin.',
  contactEmail: 'iletisim@taksiucreti-hesaplama.blog',
  author: { name: 'Oğuzhan Arslan', url: '/taksi-rehberi/' },
  publisher: 'Taksi Ücreti Hesaplama',
  analyticsId: null as string | null,
  socialLinks: [] as string[],
  navigation: [
    ['Ana Sayfa', '/'], ['Şehir Hesaplayıcıları', '/#sehir-hesaplayicilari'], ['Blog', '/blog/'], ['Hakkımızda', '/hakkimizda/']
  ] as const,
  disclaimer: 'Bu sitedeki hesaplamalar bilgilendirme amaçlı tahminlerdir. Trafik, bekleme süresi, güzergâh, köprü, tünel, otoyol ve yerel tarife değişiklikleri nedeniyle gerçek taksimetre tutarı farklı olabilir.'
};

export const canonical = (path: string) => new URL(path, site.url).href;
