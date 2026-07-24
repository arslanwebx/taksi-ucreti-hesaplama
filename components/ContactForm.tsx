'use client';

import { useState } from 'react';

const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type FormSubmitResponse = {
  success?: boolean | string;
  message?: unknown;
  error?: unknown;
  errors?: unknown;
};

function getFormSubmitError(data: FormSubmitResponse) {
  if (typeof data.message === 'string' && data.message.trim()) return data.message;
  if (typeof data.error === 'string' && data.error.trim()) return data.error;
  if (Array.isArray(data.errors)) {
    const messages = data.errors.flatMap((error) => {
      if (typeof error === 'string') return error;
      if (error && typeof error === 'object' && 'message' in error && typeof error.message === 'string') return error.message;
      return [];
    });
    if (messages.length) return messages.join(' ');
  }
  return '';
}

export function ContactForm() {
  const [subject, setSubject] = useState('');
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const tariff = subject === 'Tarife hatası bildir';

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    if (!formEndpoint) {
      const configurationError = 'Form gönderim adresi yapılandırılmamış. Lütfen site yöneticisiyle iletişime geçin.';
      console.error('Contact form configuration error: NEXT_PUBLIC_FORM_ENDPOINT is unavailable.');
      setStatus(configurationError);
      return;
    }
    setSending(true); setStatus('Gönderiliyor…');
    try {
      const formData = new FormData(form);
      formData.set('_subject', 'Yeni İletişim Mesajı - Taksi Ücreti Hesaplama');
      formData.set('_template', 'table');
      const response = await fetch(formEndpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });
      const data = await response.json().catch(() => ({})) as FormSubmitResponse;
      if (!response.ok || data.success === false || data.success === 'false') {
        const error = new Error(getFormSubmitError(data) || `Form gönderilemedi (${response.status}).`);
        error.name = 'FormSubmitError';
        throw error;
      }
      form.reset(); setSubject('');
      setStatus('Mesajınız gönderildi. Teşekkür ederiz.');
    } catch (error) {
      console.error('Contact form submission failed:', error);
      setStatus(
        error instanceof Error && error.name === 'FormSubmitError'
          ? error.message
          : 'Gönderim tamamlanamadı. Lütfen yeniden deneyin veya e-posta gönderin.',
      );
    } finally { setSending(false); }
  }

  return <form className="contact-form" action={formEndpoint} method="post" onSubmit={submit}>
    <input type="hidden" name="_subject" value="Taksi Ücreti Hesaplama - Yeni iletişim formu mesajı"/>
    <label>Adınız<input name="name" autoComplete="name" required maxLength={100}/></label>
    <label>E-posta adresiniz<input name="email" type="email" autoComplete="email" required maxLength={200}/></label>
    <label>Konu<select name="subject" required value={subject} onChange={(event) => setSubject(event.target.value)}><option value="">Seçin</option><option>Tarife hatası bildir</option><option>Hesaplama sorunu</option><option>İçerik düzeltme talebi</option><option>Genel iletişim</option></select></label>
    {tariff && <fieldset><legend>Tarife bildirimi ayrıntıları</legend><label>Şehir<input name="city" required maxLength={100}/></label><label>Bildirilen tarife<input name="reportedTariff" required maxLength={300} placeholder="Açılış, kilometre ve minimum tutar"/></label><label>Yürürlük tarihi<input name="effectiveDate" required type="date"/></label><label>Resmî kaynak bağlantısı<input name="source" required type="url" maxLength={500} placeholder="https://"/></label></fieldset>}
    <label>Mesajınız<textarea name="message" required minLength={10} maxLength={4000}/></label>
    <label className="hp" aria-hidden="true">Web sitesi<input name="website" tabIndex={-1} autoComplete="off"/></label>
    <label className="privacy-check"><input name="privacy" type="checkbox" required/><span>Gizlilik politikasını okudum ve form verilerimin talebim için işlenmesini kabul ediyorum.</span></label>
    <button className="button" type="submit" disabled={sending}>{sending ? 'Gönderiliyor…' : 'Mesajı gönder'}</button><p className="status" role="status" aria-live="polite">{status}</p>
  </form>;
}
