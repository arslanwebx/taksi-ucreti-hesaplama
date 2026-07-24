interface AssetBinding { fetch(request: Request): Promise<Response> }
interface Env { ASSETS: AssetBinding; CONTACT_WEBHOOK_URL?: string }
const allowedSubjects = new Set(['Tarife hatası bildir','Hesaplama sorunu','İçerik düzeltme talebi','Genel iletişim']);
const SITE_VERSION = 'next-2026-07-16.1';
const CONTACT_EMAIL = 'merhaba@taksiucreti-hesaplama.blog';
const rateLimits = new Map<string,{ count:number; resetAt:number }>();
const json=(body:object,status=200,extraHeaders:Record<string,string>={})=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-site-version':SITE_VERSION,...extraHeaders}});
export default {
 async fetch(request:Request,env:Env):Promise<Response>{
  const url=new URL(request.url);
  if(url.hostname==='www.taksiucreti-hesaplama.blog'||(url.hostname==='taksiucreti-hesaplama.blog'&&url.protocol!=='https:')){
   url.protocol='https:'; url.hostname='taksiucreti-hesaplama.blog'; return Response.redirect(url.href,301);
  }
  const obsoleteWordPressPath = /^\/(?:wp-admin|wp-content|wp-includes|wp-json)(?:\/|$)|^\/(?:wp-login\.php|xmlrpc\.php|feed\/?)$/i.test(url.pathname);
  if(obsoleteWordPressPath) return new Response('Bu WordPress uç noktası kalıcı olarak kaldırıldı.',{status:410,headers:{'content-type':'text/plain; charset=utf-8','cache-control':'public, max-age=86400','x-site-version':SITE_VERSION}});
  if((request.method==='GET'||request.method==='HEAD')&&url.search&&url.pathname!=='/api/contact'){
   const calculatorKeys=new Set(['city','distance','waiting','extra']);
   const isShareableCalculatorUrl=url.pathname==='/'&&[...url.searchParams.keys()].every((key)=>calculatorKeys.has(key));
   if(!isShareableCalculatorUrl){url.search=''; return Response.redirect(url.href,301);}
  }
  if(url.pathname!=='/api/contact'){
   const assetResponse=await env.ASSETS.fetch(request);
   const headers=new Headers(assetResponse.headers);
   headers.set('x-site-version',SITE_VERSION);
   if((headers.get('content-type')??'').includes('text/html')){
    headers.set('cache-control','public, max-age=0, must-revalidate');
    headers.set('cdn-cache-control','public, max-age=300, stale-while-revalidate=30');
   }
   return new Response(assetResponse.body,{status:assetResponse.status,statusText:assetResponse.statusText,headers});
  }
  if(request.method!=='POST') return json({message:'Yalnızca POST isteği kabul edilir.'},405);
  const now=Date.now();
  if(rateLimits.size>1000) for(const [key,value] of rateLimits) if(value.resetAt<=now) rateLimits.delete(key);
  const client=request.headers.get('cf-connecting-ip')??'local'; const current=rateLimits.get(client);
  if(current&&current.resetAt>now&&current.count>=5) return json({message:'Çok fazla istek gönderildi. Lütfen birkaç dakika sonra yeniden deneyin.'},429,{'retry-after':String(Math.ceil((current.resetAt-now)/1000))});
  rateLimits.set(client,current&&current.resetAt>now?{...current,count:current.count+1}:{count:1,resetAt:now+10*60*1000});
  const type=request.headers.get('content-type')??''; if(!type.includes('application/json')) return json({message:'Geçersiz istek biçimi.'},415);
  const contentLength=Number(request.headers.get('content-length')??0); if(contentLength>16_384) return json({message:'Form verisi izin verilen boyutu aşıyor.'},413);
  let data:Record<string,unknown>; try{data=await request.json();}catch{return json({message:'Geçersiz form verisi.'},400);}
  const text=(key:string,max:number)=>typeof data[key]==='string'?(data[key] as string).trim().slice(0,max):'';
  const name=text('name',100),email=text('email',200),subject=text('subject',100),message=text('message',4000),website=text('website',200);
  if(website) return json({message:'Form doğrulanamadı.'},400);
  if(!name||!/^\S+@\S+\.\S+$/.test(email)||!allowedSubjects.has(subject)||message.length<10||data.privacy!=='on') return json({message:'Zorunlu alanları geçerli biçimde doldurun.'},400);
  const city=text('city',100),reportedTariff=text('reportedTariff',300),effectiveDate=text('effectiveDate',10),source=text('source',500);
  if(subject==='Tarife hatası bildir'&&(!city||!reportedTariff||!/^\d{4}-\d{2}-\d{2}$/.test(effectiveDate)||!/^https:\/\//i.test(source))) return json({message:'Tarife bildirimi için şehir, tutarlar, geçerli tarih ve HTTPS resmî kaynak bağlantısı gereklidir.'},400);
  if(!env.CONTACT_WEBHOOK_URL) return json({message:'İletişim hizmeti henüz yapılandırılmadı. Lütfen e-posta bağlantısını kullanın.'},503);
  const payload={destination:CONTACT_EMAIL,name,email,subject,message,city,reportedTariff,effectiveDate,source,receivedAt:new Date().toISOString()};
  let response:Response;
  try{response=await fetch(env.CONTACT_WEBHOOK_URL,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(10_000)});}catch{return json({message:'İletişim hizmeti zamanında yanıt vermedi. Lütfen e-posta bağlantısını kullanın.'},504);}
  if(!response.ok) return json({message:'Mesaj şu anda iletilemedi. Lütfen daha sonra deneyin.'},502);
  return json({message:'Mesajınız başarıyla iletildi.'});
 }
};
