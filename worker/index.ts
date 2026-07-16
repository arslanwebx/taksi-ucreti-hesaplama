interface AssetBinding { fetch(request: Request): Promise<Response> }
interface Env { ASSETS: AssetBinding; CONTACT_WEBHOOK_URL?: string }
const allowedSubjects = new Set(['Tarife hatası bildir','Hesaplama sorunu','İçerik düzeltme talebi','Genel iletişim']);
const json=(body:object,status=200)=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store'}});
export default {
 async fetch(request:Request,env:Env):Promise<Response>{
  const url=new URL(request.url);
  if(url.hostname==='www.taksiucreti-hesaplama.blog'||(url.hostname==='taksiucreti-hesaplama.blog'&&url.protocol!=='https:')){
   url.protocol='https:'; url.hostname='taksiucreti-hesaplama.blog'; return Response.redirect(url.href,301);
  }
  if(url.pathname!=='/api/contact') return env.ASSETS.fetch(request);
  if(request.method!=='POST') return json({message:'Yalnızca POST isteği kabul edilir.'},405);
  const type=request.headers.get('content-type')??''; if(!type.includes('application/json')) return json({message:'Geçersiz istek biçimi.'},415);
  let data:Record<string,unknown>; try{data=await request.json();}catch{return json({message:'Geçersiz form verisi.'},400);}
  const text=(key:string,max:number)=>typeof data[key]==='string'?(data[key] as string).trim().slice(0,max):'';
  const name=text('name',100),email=text('email',200),subject=text('subject',100),message=text('message',4000),website=text('website',200);
  if(website) return json({message:'Mesajınız alındı.'});
  if(!name||!/^\S+@\S+\.\S+$/.test(email)||!allowedSubjects.has(subject)||message.length<10||data.privacy!=='on') return json({message:'Zorunlu alanları geçerli biçimde doldurun.'},400);
  if(!env.CONTACT_WEBHOOK_URL) return json({message:'İletişim hizmeti henüz yapılandırılmadı. Lütfen e-posta bağlantısını kullanın.'},503);
  const payload={name,email,subject,message,city:text('city',100),reportedTariff:text('reportedTariff',300),source:text('source',500),receivedAt:new Date().toISOString()};
  const response=await fetch(env.CONTACT_WEBHOOK_URL,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(payload)});
  if(!response.ok) return json({message:'Mesaj şu anda iletilemedi. Lütfen daha sonra deneyin.'},502);
  return json({message:'Mesajınız başarıyla iletildi.'});
 }
};
