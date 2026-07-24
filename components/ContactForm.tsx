'use client';

import { useState } from 'react';

const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || 'https://formsubmit.co/iletisim@taksiucreti-hesaplama.blog';

export function ContactForm() {
  const [subject, setSubject] = useState('');
  const tariff = subject === 'Tarife hatası bildir';

  return <form className="contact-form" action={formEndpoint} method="post">
    <input type="hidden" name="_subject" value="Taksi Ücreti Hesaplama - Yeni iletişim formu mesajı"/>
    <label>Adınız<input name="name" autoComplete="name" required maxLength={100}/></label>
    <label>E-posta adresiniz<input name="email" type="email" autoComplete="email" required maxLength={200}/></label>
    <label>Konu<select name="subject" required value={subject} onChange={(event) => setSubject(event.target.value)}><option value="">Seçin</option><option>Tarife hatası bildir</option><option>Hesaplama sorunu</option><option>İçerik düzeltme talebi</option><option>Genel iletişim</option></select></label>
    {tariff && <fieldset><legend>Tarife bildirimi ayrıntıları</legend><label>Şehir<input name="city" required maxLength={100}/></label><label>Bildirilen tarife<input name="reportedTariff" required maxLength={300} placeholder="Açılış, kilometre ve minimum tutar"/></label><label>Yürürlük tarihi<input name="effectiveDate" required type="date"/></label><label>Resmî kaynak bağlantısı<input name="source" required type="url" maxLength={500} placeholder="https://"/></label></fieldset>}
    <label>Mesajınız<textarea name="message" required minLength={10} maxLength={4000}/></label>
    <label className="hp" aria-hidden="true">Web sitesi<input name="website" tabIndex={-1} autoComplete="off"/></label>
    <label className="privacy-check"><input name="privacy" type="checkbox" required/><span>Gizlilik politikasını okudum ve form verilerimin talebim için işlenmesini kabul ediyorum.</span></label>
    <button className="button" type="submit">Mesajı gönder</button>
  </form>;
}
