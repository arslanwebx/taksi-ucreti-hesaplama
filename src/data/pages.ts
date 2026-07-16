export type PolicySection = {
  heading: string;
  paragraphs: readonly string[];
  bullets?: readonly string[];
  links?: readonly { label: string; href: string }[];
};

export type PolicyPage = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  sections: readonly PolicySection[];
};

export const pages: readonly PolicyPage[] = [
 {slug:'hakkimizda',title:'Hakkımızda',description:'Taksi Ücreti Hesaplama sitesinin amacı, yayın yaklaşımı, tarife kaynakları, insan incelemesi, gelir modeli ve hesaplama sınırları hakkında bilgi alın.',updated:'2026-07-16',sections:[
  {heading:'Sitenin amacı',paragraphs:[
    'Taksi Ücreti Hesaplama, Türkiye’de bir taksi yolculuğunun yaklaşık maliyetini yolculuk öncesinde daha anlaşılır biçimde değerlendirmeye yardımcı olmak için hazırlanmıştır. Kullanıcı şehir ve araçla gidilecek mesafeyi seçer; hesaplayıcı açılış, kilometre ve minimum yolculuk ücretini tek bir dökümde gösterir.',
    'Hizmetin temel amacı kesin fiyat vermek değil, tarife kalemlerini görünür kılarak planlama yapmayı kolaylaştırmaktır. Gerçek tutarı aracın taksimetresi, izlenen rota, yerel uygulama ve yolculuk sırasında geçerli tarife belirler.'
  ]},
  {heading:'Kim hazırlıyor?',paragraphs:[
    'Site içeriği ve tarife incelemeleri Oğuzhan Arslan tarafından gözden geçirilir. Yazar bilgisi, inceleme yaklaşımı ve yayımlanan içeriklerle ilişkisi ayrı profil sayfasında açıklanır.',
    'Site herhangi bir belediye, UKOME, taksi odası, taksi durağı veya kamu kurumu tarafından işletilmez. Kurum bağlantıları kaynak göstermek amacıyla verilir; bu bağlantılar resmî ortaklık veya onay anlamına gelmez.'
  ],links:[{label:'Oğuzhan Arslan yazar profili',href:'/yazar/oguzhan-arslan/'}]},
  {heading:'Tarife verileri nasıl hazırlanıyor?',paragraphs:[
    'Tarife kayıtlarında mümkün olduğunda belediye, UKOME, yetkili meslek odası veya yayımlanmış tarife kararı gibi birincil kaynaklar aranır. Bunlara erişilemediğinde güvenilir ikincil aktarımlar kullanılabilir ve kaynak niteliği sonuç ekranında belirtilir.',
    'Her şehir kaydında açılış ücreti, kilometre ücreti, minimum ücret, referans bilgisi, kaynak adresi ve son kontrol tarihi tutulur. Tahmini veya ilçe bazlı genelleme riski taşıyan kayıtlar doğrulanmış gibi sunulmaz; kullanıcıya görünür uyarı gösterilir.'
  ],links:[{label:'Veri kaynakları ve hesaplama yöntemi',href:'/veri-kaynaklari-ve-hesaplama-yontemi/'},{label:'Editoryal politika',href:'/editoryal-politika/'}]},
  {heading:'Hesaplayıcı ne yapar, ne yapmaz?',paragraphs:[
    'Temel hesap açılış ücreti ile kilometre bedelini toplar ve sonuç minimum ücretin altında kalıyorsa minimum tutarı uygular. Kullanıcı bilinen köprü, tünel veya otoyol bedelini ayrıca girebilir. Yoğun trafik seçeneği, yolculuk planlamasına yardımcı olmak amacıyla tahmini toplamı ayarlar.',
    'Belgelenmiş bir bekleme tarifesi bulunmayan şehirler için site otomatik bekleme bedeli uydurmaz. Başlangıç ve varış adresinden rota üretmek için ücretli veya anahtar gerektiren bir harita hizmeti kullanılmaz; kullanıcıdan harita uygulamasındaki araç mesafesini girmesi istenir.'
  ]},
  {heading:'Güncelleme ve düzeltme yaklaşımı',paragraphs:[
    'Tarifeler dönemsel kontroller, yeni karar duyuruları ve kullanıcı bildirimleri üzerine yeniden incelenir. Son kontrol tarihi yalnızca anlamlı bir inceleme yapıldığında değiştirilir.',
    'Bir tarife hatası bildirirken şehir, doğru olduğu düşünülen tutarlar, yürürlük tarihi ve mümkünse yetkili kurum bağlantısı paylaşılmalıdır. Bildirim doğrudan rakam değişikliği oluşturmaz; kaynak karşılaştırmasından sonra merkezî veri kaydı güncellenir.'
  ],links:[{label:'Tarife değişikliği bildirin',href:'/iletisim/'},{label:'Düzeltme politikası',href:'/duzeltme-politikasi/'}]},
  {heading:'Gelir modeli ve bağımsızlık',paragraphs:[
    'Site şu anda hesaplama için kullanıcıdan ücret istemez. Sayfalarda bir kaynak bağlantısının bulunması, bağlantı verilen kurum veya yayınla ticari ilişki olduğu anlamına gelmez.',
    'Gelecekte reklam veya ticari iş birliği kullanılırsa, bunun editoryal içerikten ayırt edilebilir olması ve tarife sonucunu etkilememesi esastır. Sponsorlu içerik varsa açıkça etiketlenir.'
  ]},
  {heading:'İletişim',paragraphs:[
    'İçerik, tarife, erişilebilirlik veya teknik sorun bildirimleri iletişim sayfasından gönderilebilir. Kişisel verilerin nasıl işlendiği gizlilik politikasında; siteyi kullanırken geçerli temel kurallar kullanım koşullarında açıklanır.'
  ],links:[{label:'İletişim',href:'/iletisim/'},{label:'Gizlilik politikası',href:'/gizlilik-politikasi/'},{label:'Kullanım koşulları',href:'/kullanim-kosullari/'}]}
 ]},

 {slug:'gizlilik-politikasi',title:'Gizlilik Politikası',description:'Taksi Ücreti Hesaplama sitesinde analitik, iletişim formu, yerel depolama, teknik güvenlik verileri, üçüncü taraf hizmetler ve kullanıcı taleplerinin nasıl ele alındığını öğrenin.',updated:'2026-07-16',sections:[
  {heading:'Politikanın kapsamı',paragraphs:[
    'Bu politika, taksiucreti-hesaplama.blog alan adını ziyaret ettiğinizde veya iletişim formunu kullandığınızda hangi bilgilerin işlenebileceğini açıklar. Site, taksi yolculuğu rezervasyonu almaz; ödeme, kimlik belgesi, konum izni veya banka kartı bilgisi istemez.',
    'Hesaplayıcıya girilen şehir, mesafe ve ek ücret bilgileri temel hesaplama için tarayıcınızda işlenir. Hesaplama sonucu sunucuya bir sipariş ya da rezervasyon olarak gönderilmez.'
  ]},
  {heading:'Hesaplayıcı ve tarayıcıda saklanan bilgiler',paragraphs:[
    'Son seçilen şehir, sonraki ziyarette kolaylık sağlamak amacıyla tarayıcının yerel depolama alanında saklanabilir. Paylaşılabilir hesaplama bağlantılarında şehir, mesafe, bekleme, ek ücret ve trafik seçimi URL parametresi olarak yer alabilir.',
    'Bu parametreler bağlantıyı paylaştığınız kişiler tarafından görülebilir. Bu nedenle hesaplayıcı alanlarına kişisel bilgi, açık adres, plaka, telefon numarası veya başka hassas veri yazmamalısınız. Tarayıcı verilerini site ayarlarından veya tarayıcı geçmişinden silebilirsiniz.'
  ]},
  {heading:'Google Analytics',paragraphs:[
    'Site kullanımını toplu olarak değerlendirmek için Google Analytics ölçüm kimliği G-9DE2SY0711 kullanılır. Analitik etiketi sayfa etkileşiminden sonra yüklenir ve ziyaret edilen sayfalar, yaklaşık konum, cihaz ve tarayıcı türü, yönlendiren sayfa ve etkileşim bilgileri gibi teknik verileri işleyebilir.',
    'Analitik veriler tek bir kullanıcıya taksi hizmeti sunmak veya hesaplama sonucunu kişiselleştirmek için kullanılmaz. Google’ın verileri nasıl işlediği ve saklama süresi Google Analytics yapılandırması ile Google politikalarına bağlıdır.'
  ],links:[{label:'Çerez politikası',href:'/cerez-politikasi/'}]},
  {heading:'İletişim formu verileri',paragraphs:[
    'İletişim formunu gönderdiğinizde ad, e-posta adresi, konu ve mesaj işlenir. Tarife hatası bildiriminde şehir, bildirilen tarife, yürürlük tarihi ve kaynak bağlantısı da istenebilir.',
    'Bu bilgiler talebi incelemek, gerektiğinde yanıt vermek, kötüye kullanımı önlemek ve doğrulanmış bir hatayı düzeltmek amacıyla kullanılır. Formda açıkça istenmeyen kimlik, ödeme, sağlık veya başka hassas bilgileri göndermeyin.'
  ]},
  {heading:'Teknik kayıtlar ve güvenlik',paragraphs:[
    'Cloudflare, sitenin güvenli ve hızlı sunulması için IP adresi, istek zamanı, tarayıcı bilgisi ve güvenlik sinyalleri gibi teknik kayıtları işleyebilir. İletişim uç noktası kötüye kullanımı azaltmak için istek sayısını sınırlayan teknik kontroller kullanır.',
    'Hiçbir internet hizmeti mutlak güvenlik garanti edemez. Buna rağmen aktarım HTTPS üzerinden yapılır, gereksiz form alanları toplanmaz ve iletişim yanıtları önbelleğe alınmaz.'
  ]},
  {heading:'Hizmet sağlayıcılar ve veri aktarımı',paragraphs:[
    'Barındırma ve güvenlik için Cloudflare, ziyaret ölçümü için Google Analytics ve iletişim iletimi için yapılandırılan form hizmeti kullanılabilir. Bu hizmetler kendi gizlilik koşulları kapsamında farklı ülkelerde veri işleyebilir.',
    'Site, kişisel verileri veri komisyoncusu olarak satmaz. Bir hizmet sağlayıcı yalnızca ilgili işlevi sunmak için gerekli teknik kapsamda kullanılır.'
  ]},
  {heading:'Saklama ve silme',paragraphs:[
    'Tarayıcıdaki yerel şehir tercihi siz silene kadar cihazınızda kalabilir. Analitik saklama süresi Google Analytics ayarlarına; iletişim kayıtlarının süresi ise talebi sonuçlandırma, güvenlik ve olası hukuki yükümlülükler için gerekli süreye bağlıdır.',
    'Artık gerekli olmayan iletişim verilerinin silinmesi hedeflenir. Ancak güvenlik kaydı, uyuşmazlık veya yasal yükümlülük gerektiren bilgiler ilgili süre boyunca korunabilir.'
  ]},
  {heading:'Talepleriniz ve iletişim',paragraphs:[
    'Hakkınızda gönderdiğiniz iletişim verilerine erişme, yanlış bilgiyi düzeltme veya uygun koşullarda silme talebinizi iletebilirsiniz. Talebin size ait olduğunu doğrulamak için makul ek bilgi istenebilir.',
    'Analitik ölçümü tarayıcı ayarları, içerik engelleyici veya Google Analytics devre dışı bırakma araçlarıyla sınırlandırabilirsiniz. Gizlilik soruları için iletişim sayfasını ya da iletisim@taksiucreti-hesaplama.blog adresini kullanın.'
  ],links:[{label:'İletişim sayfası',href:'/iletisim/'}]}
 ]},

 {slug:'cerez-politikasi',title:'Çerez Politikası',description:'Sitedeki yerel depolama ve Google Analytics çerezlerinin amaçlarını, hesaplayıcının çerez olmadan nasıl çalıştığını ve tarayıcıdan yönetim seçeneklerini inceleyin.',updated:'2026-07-16',sections:[
  {heading:'Çerez ve benzer teknolojiler nedir?',paragraphs:[
    'Çerezler, bir siteyi ziyaret ettiğinizde tarayıcıda saklanabilen küçük metin kayıtlarıdır. Yerel depolama da benzer biçimde tarayıcıda tercih saklamaya yarar; ancak teknik olarak çerez değildir.',
    'Bu site temel hesaplama işlevi, son şehir tercihi ve toplu ziyaret ölçümü için sınırlı sayıda tarayıcı teknolojisi kullanabilir.'
  ]},
  {heading:'Zorunlu ve işlevsel kullanım',paragraphs:[
    'Hesaplayıcının temel matematik işlemi tarayıcıda çalışır ve zorunlu bir reklam çerezi gerektirmez. Son seçilen şehir, sonraki ziyarette kolaylık sağlamak için yerel depolamada saklanabilir.',
    'Yerel şehir tercihini silerseniz hesaplayıcı çalışmaya devam eder; yalnızca önceki seçim otomatik hatırlanmaz. Paylaşılabilir hesaplama durumu çerez yerine URL parametreleriyle taşınabilir.'
  ]},
  {heading:'Analitik çerezleri',paragraphs:[
    'Google Analytics, ziyaretlerin ve sayfa etkileşimlerinin toplu olarak ölçülmesi için _ga gibi tanımlayıcılar yerleştirebilir. Bu ölçüm hangi sayfaların yararlı olduğunu, teknik sorunları ve genel kullanım eğilimlerini anlamaya yardımcı olur.',
    'Sitede ayrıca bir reklam kişiselleştirme etiketi veya kullanıcı hesabına bağlı taksi profili bulunmaz. Google Analytics’in kullandığı çerez adları ve süreleri hizmet yapılandırmasına göre değişebilir.'
  ]},
  {heading:'Çerez tercihlerini yönetme',paragraphs:[
    'Tarayıcınızın gizlilik veya site verileri bölümünden çerezleri görüntüleyebilir, silebilir ya da engelleyebilirsiniz. Tüm çerezleri engellemek bazı sitelerde oturum özelliklerini etkileyebilir; bu sitedeki temel ücret hesaplama işlevi analitik çerez olmadan da kullanılabilir.',
    'Google Analytics ölçümünü tarayıcı eklentisi, izleme koruması veya içerik engelleyici aracılığıyla sınırlandırabilirsiniz. Tercih değişiklikleri yalnızca kullandığınız tarayıcı ve cihaz için geçerli olabilir.'
  ]},
  {heading:'Politika değişiklikleri',paragraphs:[
    'Yeni bir analitik, reklam veya işlevsel hizmet eklenirse bu politika kullanılan teknoloji ve amaç açıklanacak şekilde güncellenir. Değişiklik tarihi sayfanın üst bölümünde gösterilir.',
    'Çerezlerle ilişkili kişisel veri işleme hakkında daha geniş bilgi için gizlilik politikasını inceleyebilirsiniz.'
  ],links:[{label:'Gizlilik politikası',href:'/gizlilik-politikasi/'},{label:'İletişim',href:'/iletisim/'}]}
 ]},

 {slug:'kullanim-kosullari',title:'Kullanım Koşulları',description:'Taksi Ücreti Hesaplama hizmetinin bilgilendirme amacı, kullanıcı sorumlulukları, kabul edilebilir kullanım, fikrî haklar, dış bağlantılar ve hizmet değişiklikleri hakkında koşullar.',updated:'2026-07-16',sections:[
  {heading:'Koşulların kabulü',paragraphs:[
    'Siteyi kullanarak bu koşulları ve ilgili gizlilik açıklamalarını okuduğunuzu kabul etmiş olursunuz. Koşulları kabul etmiyorsanız hesaplayıcıyı ve iletişim formunu kullanmamalısınız.',
    'Site taksi çağırma, rezervasyon, ödeme veya sürücü ile yolcu arasında sözleşme kurma hizmeti sunmaz.'
  ]},
  {heading:'Hizmetin niteliği',paragraphs:[
    'Hesaplayıcı, seçilen tarife kaydı ve kullanıcının girdiği mesafe üzerinden bilgilendirme amaçlı tahmin üretir. Ekrandaki sonuç bağlayıcı fiyat teklifi, taksimetre belgesi veya resmî ücret kararı değildir.',
    'Tarife kaynakları mümkün olduğunca görünür sunulur. Bununla birlikte yerel kararlar, ilçe uygulamaları ve yolculuk koşulları site güncellenmeden değişebilir.'
  ]},
  {heading:'Kullanıcının sorumlulukları',paragraphs:[
    'Araçla gidilecek mesafeyi doğru girmek, bilinen ücretli geçişleri eklemek ve sonucu yolculuk öncesinde yerel kaynaklarla değerlendirmek kullanıcının sorumluluğundadır.',
    'İletişim formuna doğru ve hukuka uygun bilgi girilmelidir. Başkasına ait kişisel veri, yanıltıcı kaynak, zararlı bağlantı veya istenmeyen toplu mesaj gönderilmemelidir.'
  ],bullets:[
    'Siteye veya hesaplayıcıya zarar vermeye yönelik otomatik istek gönderilmemelidir.',
    'Güvenlik kontrolleri aşılmaya veya iletişim formu kötüye kullanılmaya çalışılmamalıdır.',
    'Site içeriği yanıltıcı biçimde resmî kurum içeriği gibi yeniden yayımlanmamalıdır.'
  ]},
  {heading:'Fikrî mülkiyet ve izin verilen kullanım',paragraphs:[
    'Özgün metinler, kullanıcı arayüzü, hesaplama sunumu ve marka unsurları ilgili hak sahiplerine aittir. Kişisel kullanım için sayfalara bağlantı verebilir ve makul kısa alıntıları kaynak göstererek kullanabilirsiniz.',
    'İçeriğin büyük bölümünü kopyalamak, otomatik olarak yeniden yayımlamak, marka izlenimi oluşturmak veya tarife veri setini izinsiz ticari bir ürünün tamamı hâline getirmek için ayrıca izin gerekebilir. Kamuya ait kaynak belgelerin hakları kendi kurumlarında kalır.'
  ]},
  {heading:'Dış bağlantılar',paragraphs:[
    'Tarife belgesi, belediye, haber yayını veya diğer kaynak bağlantıları üçüncü taraf sitelere yönlendirebilir. Bu sitelerin içeriği, erişilebilirliği, güvenliği ve gizlilik uygulamaları kendi sorumluluklarındadır.',
    'Bir bağlantının verilmesi, o kurumun siteyi onayladığı veya siteyle ticari ilişki kurduğu anlamına gelmez.'
  ]},
  {heading:'Hizmetin kullanılabilirliği',paragraphs:[
    'Siteyi güvenli ve erişilebilir tutmak için makul çaba gösterilir; ancak kesintisiz, hatasız veya her cihazla sürekli uyumlu çalışma garanti edilmez. Bakım, güvenlik, veri düzeltmesi veya altyapı değişikliği nedeniyle hizmet geçici olarak sınırlandırılabilir.',
    'Kötüye kullanım oluşturan istekler teknik olarak sınırlandırılabilir veya engellenebilir.'
  ]},
  {heading:'Koşulların güncellenmesi ve iletişim',paragraphs:[
    'Hizmet kapsamı veya mevzuat gereksinimleri değiştiğinde bu koşullar güncellenebilir. Güncel metin yayımlandığı andan itibaren site kullanımına uygulanır; önemli değişikliklerde sayfadaki güncelleme tarihi yenilenir.',
    'Koşullarla ilgili sorularınızı iletişim sayfasından gönderebilirsiniz.'
  ],links:[{label:'Sorumluluk reddi',href:'/sorumluluk-reddi/'},{label:'Gizlilik politikası',href:'/gizlilik-politikasi/'},{label:'İletişim',href:'/iletisim/'}]}
 ]},

 {slug:'sorumluluk-reddi',title:'Sorumluluk Reddi',description:'Taksi ücreti sonuçlarının tahmin niteliğini, taksimetrenin esas olduğunu, trafik seçeneğini, yerel tarife farklarını ve kaynak güncelliği sınırlarını ayrıntılı inceleyin.',updated:'2026-07-16',sections:[
  {heading:'Sonuç fiyat garantisi değildir',paragraphs:[
    'Sitede gösterilen taksi ücreti, yolculuk planlamasına yardımcı olan matematiksel bir tahmindir. Bağlayıcı fiyat teklifi, rezervasyon bedeli, fatura veya resmî taksimetre sonucu değildir.',
    'Yolculuk sonunda ödenecek tutarı araçtaki geçerli taksimetre ve yolculuk sırasında uygulanan yerel kurallar belirler.'
  ]},
  {heading:'Hesaplamada kullanılan bilgiler',paragraphs:[
    'Temel sonuç seçilen şehir kaydındaki açılış, kilometre ve minimum ücret ile kullanıcının girdiği yol mesafesine dayanır. Bilinen köprü, tünel, otoyol veya başka geçiş tutarları kullanıcı tarafından ayrıca eklenebilir.',
    'Yoğun trafik seçeneği yalnızca planlama payı oluşturur; resmî veya şehir bazında belgelenmiş bir bekleme tarifesinin yerine geçmez. Belgelenmiş bekleme oranı bulunmayan şehirlerde otomatik dakika ücreti uygulanmaz.'
  ]},
  {heading:'Gerçek tutarı değiştirebilecek koşullar',paragraphs:[
    'Harita uygulamasında görülen rota ile sürücünün izlediği rota farklı olabilir. Tek yönler, yol çalışması, kapanan yollar, trafik yoğunluğu, yolcu alma ve bırakma noktaları gerçek kilometreyi etkiler.'
  ],bullets:[
    'Yerel tarifenin site güncellenmeden değişmesi',
    'İlçe veya belgelenmiş araç türüne göre farklı tarife uygulanması',
    'Köprü, tünel, otoyol ve terminal gibi ek bedeller',
    'Taksimetrenin ölçüm ve yuvarlama adımları',
    'Kullanıcının yanlış şehir, mesafe veya ek ücret girmesi'
  ]},
  {heading:'Kaynakların sınırı',paragraphs:[
    'Kaynak bağlantısı ve son kontrol tarihi her kaydın hangi bilgiye dayandığını gösterir; ancak kaynağın daha sonra değişmeyeceği garanti edilemez. Tahmini veya ikincil kaynağa dayanan kayıtlar buna uygun etiketlenir.',
    'Kaynak sayfasının kaldırılması, taşınması veya erişilemez olması tarife bilgisinin otomatik olarak güncelliğini kanıtlamaz. Önemli bir yolculuk öncesinde yetkili yerel kurumdan güncel tarifeyi kontrol edin.'
  ]},
  {heading:'Taksi hizmetiyle ilişki',paragraphs:[
    'Site taksi işletmesi, çağrı merkezi, rezervasyon platformu veya uyuşmazlık çözüm kurumu değildir. Sürücü davranışı, araç güvenliği, hizmet kalitesi, ödeme yöntemi veya taksimetre uygulaması üzerinde kontrolü bulunmaz.',
    'Bir hizmet sorunu yaşarsanız fiş, plaka ve yolculuk bilgilerini saklayarak ilgili belediye, zabıta, meslek odası veya yetkili başvuru kanalına müracaat edin.'
  ]},
  {heading:'Hata bildirimi',paragraphs:[
    'Güncel bir yetkili kurum belgesiyle farklı tarife tespit ederseniz iletişim formundan düzeltme bildirebilirsiniz. Bildirimler kaynak karşılaştırmasından sonra değerlendirilir.',
    'Bu sorumluluk reddi, yürürlükteki mevzuattan doğan ve sözleşmeyle kaldırılamayan hakları sınırlandırmayı amaçlamaz.'
  ],links:[{label:'Tarife hatası bildirin',href:'/iletisim/'},{label:'Düzeltme politikası',href:'/duzeltme-politikasi/'}]}
 ]},

 {slug:'veri-kaynaklari-ve-hesaplama-yontemi',title:'Veri Kaynakları ve Hesaplama Yöntemi',description:'81 il tarife verisinin kaynak hiyerarşisini, Excel doğrulamasını, minimum ücret formülünü, trafik seçeneğini, tahmini kayıtları ve güncelleme sürecini inceleyin.',updated:'2026-07-16',sections:[
  {heading:'Tek merkezî tarife kaynağı',paragraphs:[
    'Hesaplayıcı ve şehir sayfaları aynı tipli merkezî veri setini kullanır. Böylece bir tarife güncellendiğinde hesap sonucu, tarife özeti ve örnek mesafeler aynı değerlerden üretilir; sayfalarda ayrı rakam kopyaları tutulmaz.',
    '81 il kaydı çalışma kitabından içe aktarılır. İçe aktarma işlemi satır sayısını, zorunlu sütunları, plaka kodlarını, tekrar eden şehir ve slug kayıtlarını, pozitif ücretleri, HTTPS kaynaklarını ve örnek 5 km ile 10 km toplamlarını kontrol eder.'
  ]},
  {heading:'Kaynak hiyerarşisi',paragraphs:[
    'Birinci tercih belediye, UKOME, yetkili meslek odası, resmî tarife kararı veya görevli kurumun doğrudan yayımladığı belgedir. Bu kaynak erişilebilir değilse yerel basın aktarımı veya tarife derlemesi gibi ikincil kaynak kullanılabilir.',
    'Kaynak niteliği sonuç ekranında gösterilir. Bir kaydın ikincil olması onu otomatik olarak yanlış yapmaz; ancak kullanıcıya resmî kaynakla doğrulanmış gibi sunulmaz.'
  ],bullets:[
    'Güçlü kaynak kaydı: daha doğrudan veya güçlü kaynak desteği bulunan kayıt',
    'İkincil kaynak kaydı: güvenilir kabul edilen fakat birincil kurum belgesi olmayan kayıt',
    'Tahmini tarife: mevcut bilgilerden oluşturulmuş ve ayrıca teyit gerektiren kayıt'
  ]},
  {heading:'Temel hesaplama formülü',paragraphs:[
    'Temel tutar açılış ücreti ile girilen kilometrenin kilometre tarifesiyle çarpımından oluşur. Belgelenmiş dakika başına bekleme oranı ve kullanıcının girdiği ek geçiş bedeli varsa bunlar da hesaba katılır.',
    'Hesaplanan ara toplam minimum yolculuk ücretinin altındaysa yalnızca aradaki fark uygulanır. Minimum ücret normal tutarın üzerine ikinci kez eklenmez. Para değerleri ekranda Türk lirası ve kuruş hassasiyetinde gösterilir.'
  ],bullets:[
    'Mesafe bedeli = kilometre × kilometre ücreti',
    'Ara toplam = açılış + mesafe + belgelenmiş bekleme + ek geçiş',
    'Tarife toplamı = ara toplam ile minimum ücretin büyük olanı'
  ]},
  {heading:'Yoğun trafik seçeneği',paragraphs:[
    'Ana sayfadaki yoğun trafik seçeneği, kullanıcının yoğun saatler için daha temkinli bir bütçe tahmini almasını sağlar. Bu ayar resmî taksimetre kalemi, belediye kararı veya bütün şehirlerde geçerli bir bekleme tarifesi olarak sunulmaz.',
    'Gerçek trafikte oluşabilecek fark şehir, taksimetre sistemi, süre ve rota koşullarına bağlıdır. Bu nedenle trafik ayarlı sonuç da kesin fiyat değil, planlama tahminidir.'
  ]},
  {heading:'Bekleme, araç türü ve ilçe farkları',paragraphs:[
    'Bekleme alanı yalnızca veri kaydında belgelenmiş dakika başına ücret varsa gösterilecek biçimde tasarlanmıştır. Mevcut veri setinde bu alanı destekleyen kayıt bulunmadığından otomatik bekleme ücreti eklenmez.',
    'Araç türü seçimi de yalnızca aynı şehir için birden fazla belgelenmiş kategori bulunduğunda sunulmalıdır. İlçe bazında farklı tarife olabileceği bilinen kayıtlarda kullanıcıya genelleme riski açıklanır.'
  ]},
  {heading:'Tahmini kayıtların işaretlenmesi',paragraphs:[
    'Veri durumu veya not alanında tahmini, teyit gerekli, ilçe bazlı ya da genelleme riski ifadesi bulunan kayıtlar tahmini olarak işaretlenir. Bu işaret kullanıcı sonucuna yakın görünür ve yalnızca iç sistemde tutulmaz.',
    'Şu anda Bingöl, Bitlis, Iğdır, Muğla, Muş ve Şırnak kayıtları tahmini veya ek teyit gerektiren gruptadır. Bu durum sunumu iyileştirmek amacıyla gizlenmez.'
  ]},
  {heading:'Güncelleme ve kalite kontrolleri',paragraphs:[
    'Her şehirde referans bilgisi, kaynak URL’si ve son kontrol tarihi bulunur. Tarife değişikliği tespit edildiğinde önce kapsam, tarih ve şehir eşleşmesi incelenir; ardından merkezî veri dosyası yeniden üretilir.',
    'Üretim derlemesi 81 seçenek, kontrol şehirleri, tahmini kayıt sayısı, kaynak görünürlüğü, tek H1, canonical, metadata, JSON-LD, sitemap ve iç bağlantılar için otomatik kontroller çalıştırır.'
  ],links:[{label:'Editoryal politika',href:'/editoryal-politika/'},{label:'Düzeltme politikası',href:'/duzeltme-politikasi/'},{label:'Tarife değişikliği bildirin',href:'/iletisim/'}]}
 ]},

 {slug:'editoryal-politika',title:'Editoryal Politika',description:'Tarife ve rehber içeriklerinin kaynak seçimi, insan incelemesi, yazarlık, tahmini veri etiketleri, yapay zekâ desteği, bağımsızlık ve güncelleme standartlarını öğrenin.',updated:'2026-07-16',sections:[
  {heading:'Yayın amacı ve kapsam',paragraphs:[
    'İçerikler, taksi tarifelerini ve ücret hesaplama yöntemini kullanıcıların yolculuk planlamasına yardımcı olacak açık Türkçeyle anlatmak için hazırlanır. Site yalnızca taksi tarifeleri, yolculuk maliyetini etkileyen unsurlar ve bunlarla doğrudan ilişkili rehberlere odaklanır.',
    'Sırf arama trafiği çekmek için konuyla ilgisiz sayfalar veya her şehir için birbirini tekrar eden ince içerikler üretilmez. Ayrı şehir rehberi yalnızca anlamlı yerel açıklama ve kaynak sunulabildiğinde yayımlanır.'
  ]},
  {heading:'Yazarlık ve insan incelemesi',paragraphs:[
    'Yayımlanan rehberlerde gerçek yazar kimliği gösterilir ve yazar profiline bağlantı verilir. Tarife iddiaları, hesap örnekleri ve kaynak bağlantıları yayımdan önce insan tarafından gözden geçirilir.',
    'Otomasyon; Excel verisini tipli koda dönüştürme, tekrarları kontrol etme ve örnek hesapları üretme gibi tutarlılık görevlerinde kullanılabilir. Otomatik çıktı, kaynak doğrulamasının veya editoryal kararın yerine geçmez.'
  ],links:[{label:'Yazar profili',href:'/yazar/oguzhan-arslan/'}]},
  {heading:'Kaynak standardı',paragraphs:[
    'Tarife değerlerinde birincil yetkili kurum kaynakları tercih edilir. Kaynak erişilebilir değilse kullanılan ikincil aktarım ve bunun sınırlılığı görünür biçimde açıklanır.',
    'Kaynağı bulunmayan bir rakam yalnızca sayfayı tamamlamak için uydurulmaz. Çelişkili değerlerde daha yeni tarih, karar kapsamı, şehir veya ilçe ayrımı ve kaynağın yetkisi karşılaştırılır.'
  ]},
  {heading:'Doğruluk ve güncelleme',paragraphs:[
    'Yeni bir tarife kararı bulunduğunda açılış, kilometre, minimum ücret, yürürlük tarihi ve kapsanan araç veya ilçe bilgileri birlikte kontrol edilir. Yalnızca tek bir rakamı bağlamından kopararak güncelleme yapılmaz.',
    'Son kontrol tarihi otomatik olarak her derlemede değiştirilmez. Tarih, kaydın veya içeriğin gerçekten yeniden incelendiği anlamlı güncellemeyi yansıtmalıdır.'
  ]},
  {heading:'Tahmini ve belirsiz veriler',paragraphs:[
    'Tahmini veri, doğrulanmış veriyle aynı dilde sunulmaz. Sonuç ekranında tahmini etiket ve taksimetre tutarının farklı olabileceğini açıklayan uyarı bulunur.',
    'Belirsizlik giderilene kadar kayıt hesaplayıcıda kullanılabilir; ancak kullanıcı, karar verirken kaynak niteliğini ve son kontrol tarihini görebilmelidir.'
  ]},
  {heading:'Bağımsızlık ve çıkar çatışmaları',paragraphs:[
    'Bir kurum, taksi işletmesi, sürücü platformu veya haber kaynağı içeriğin sonucunu satın alamaz. Kaynak bağlantısı, kurumsal onay veya reklam ilişkisi anlamına gelmez.',
    'Sponsorlu veya ticari içerik kullanılırsa açık biçimde etiketlenir ve hesaplama verisinden ayrılır. Sahte değerlendirme, uydurma uzmanlık, kullanıcı sayısı veya başarı iddiası yayımlanmaz.'
  ]},
  {heading:'Düzeltmeler ve kullanıcı katkısı',paragraphs:[
    'Okuyucular tarife veya içerik hatasını kaynak bağlantısıyla bildirebilir. Bildirimler yararlı bir araştırma girdisidir; ancak doğrulama yapılmadan doğrudan yayıma alınmaz.',
    'Doğrulanan hata merkezî veri ve etkilenen içeriklerde düzeltilir. Düzeltmenin niteliğine göre son kontrol tarihi ve açıklamalar güncellenir.'
  ],links:[{label:'Düzeltme politikası',href:'/duzeltme-politikasi/'},{label:'Hata bildirin',href:'/iletisim/'}]}
 ]},

 {slug:'duzeltme-politikasi',title:'Düzeltme Politikası',description:'Tarife veya içerik hatasını hangi bilgilerle bildireceğinizi, kaynakların nasıl incelendiğini, düzeltmenin merkezî veriye nasıl uygulandığını ve güncelleme tarihinin nasıl değiştiğini öğrenin.',updated:'2026-07-16',sections:[
  {heading:'Neler bildirilebilir?',paragraphs:[
    'Açılış, kilometre, minimum ücret, yürürlük tarihi, kaynak bağlantısı, şehir veya ilçe kapsamı gibi tarife hataları bildirilebilir. Kırık bağlantı, yanlış yönlendirme, yazım hatası, erişilebilirlik sorunu ve hesaplama davranışı da düzeltme kapsamındadır.',
    'Taksi hizmetine ilişkin sürücü veya araç şikâyetleri bu sitenin doğrudan çözüm alanında değildir; bunlar ilgili yerel yetkili kuruma iletilmelidir.'
  ]},
  {heading:'Bildirimde bulunması yararlı bilgiler',paragraphs:[
    'İletişim formunda sorunun açık açıklaması ve etkilenen sayfa paylaşılmalıdır. Tarife düzeltmesi için mümkün olduğunda şehir, mevcut görünen tutar, doğru olduğu düşünülen tutar, yürürlük tarihi ve kaynak adresi eklenmelidir.'
  ],bullets:[
    'Belediye, UKOME veya yetkili oda kararı bağlantısı',
    'Belgenin tarihi ve kapsadığı şehir, ilçe ya da araç türü',
    'Hatalı olduğu düşünülen sayfanın URL’si',
    'Kaynakta ilgili bilginin bulunduğu bölüm veya tablo'
  ]},
  {heading:'İnceleme süreci',paragraphs:[
    'Bildirim önce mevcut veri kaydı ve kaynakla karşılaştırılır. Daha sonra yeni kaynağın tarihi, yetkili kurum niteliği, tarifenin kapsamı ve önceki kararı değiştirip değiştirmediği değerlendirilir.',
    'Tek bir sosyal medya paylaşımı, tarih içermeyen görsel veya kaynağı belirsiz fiyat listesi tek başına yeterli kabul edilmeyebilir. Belirsizlik varsa rakam hemen değiştirilmez ve ek teyit aranır.'
  ]},
  {heading:'Düzeltmenin uygulanması',paragraphs:[
    'Doğrulanmış tarife hatası merkezî veri kaynağında düzeltilir. Hesaplayıcı, şehir tarife özeti ve örnek mesafeler aynı merkezî kaydı kullandığı için değişiklik etkilenen alanlara birlikte yansır.',
    'Metin hataları ilgili sayfada düzeltilir. Değişiklik başka sayfaları da etkiliyorsa iç bağlantılar, açıklamalar, metadata veya yapılandırılmış veri ayrıca kontrol edilir.'
  ]},
  {heading:'Güncelleme tarihi ve şeffaflık',paragraphs:[
    'Son kontrol veya güncelleme tarihi yalnızca anlamlı bir inceleme ya da içerik değişikliği yapıldığında yenilenir. Yazım işareti gibi küçük değişiklikler her zaman tarife kontrol tarihi anlamına gelmez.',
    'Tahmini bir kayıt için daha güçlü kaynak bulunursa etiket kaynak niteliğine göre güncellenebilir. Tersi durumda güçlü görünen bir kayıtta belirsizlik tespit edilirse tahmini veya inceleme gerekli olarak işaretlenebilir.'
  ]},
  {heading:'Yanıt ve itiraz',paragraphs:[
    'Bildirim sayısına ve araştırma gereksinimine göre yanıt süresi değişebilir; belirli bir süre garanti edilmez. İletişim bilgisi verilmişse ek belge istemek veya inceleme sonucunu paylaşmak için dönüş yapılabilir.',
    'Bir düzeltme talebinin kabul edilmemesi, yeni veya daha güçlü bir kaynakla tekrar bildirim yapılmasına engel değildir.'
  ],links:[{label:'Tarife veya içerik hatası bildirin',href:'/iletisim/'},{label:'Veri kaynakları ve hesaplama yöntemi',href:'/veri-kaynaklari-ve-hesaplama-yontemi/'}]}
 ]}
] as const;
