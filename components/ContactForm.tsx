'use client';

import { useRef, useState } from 'react';
import { canonical, site } from '@/src/data/site';

const formEndpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || `https://formsubmit.co/ajax/${site.contactEmail}`;
const contactPageUrl = canonical('/iletisim/');
const genericError = `Mesaj gönderilemedi. Lütfen biraz sonra tekrar deneyin veya ${site.contactEmail} adresine e-posta gönderin.`;

type FieldName = 'name' | 'email' | 'subject' | 'message';
type FormValues = Record<FieldName | 'honey', string>;
type FormSubmitResponse = { success?: boolean | string };

const initialValues: FormValues = { name: '', email: '', subject: '', message: '', honey: '' };

function validate(values: FormValues) {
  const errors: Partial<Record<FieldName, string>> = {};
  if (values.name.length < 2) errors.name = 'Ad soyad en az 2 karakter olmalıdır.';
  if (!/^\S+@\S+\.\S+$/.test(values.email)) errors.email = 'Geçerli bir e-posta adresi girin.';
  if (values.subject.length < 3) errors.subject = 'Konu en az 3 karakter olmalıdır.';
  if (values.message.length < 10) errors.message = 'Mesaj en az 10 karakter olmalıdır.';
  return errors;
}

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState('');
  const [sending, setSending] = useState(false);
  const inFlight = useRef(false);

  function updateField(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (field !== 'honey') setErrors((current) => ({ ...current, [field]: undefined }));
    setStatus('');
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending || inFlight.current) return;

    const trimmed = Object.fromEntries(
      Object.entries(values).map(([key, value]) => [key, value.trim()]),
    ) as FormValues;
    const validationErrors = validate(trimmed);
    setErrors(validationErrors);
    setStatus('');

    if (trimmed.honey || Object.keys(validationErrors).length > 0) {
      if (trimmed.honey) setStatus(genericError);
      return;
    }

    inFlight.current = true;
    setSending(true);
    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: trimmed.name,
          email: trimmed.email,
          subject: trimmed.subject,
          message: trimmed.message,
          _subject: 'Taksi Ücreti Hesaplama - Yeni İletişim Mesajı',
          _template: 'table',
          _honey: trimmed.honey,
          _url: contactPageUrl,
        }),
      });
      const data = await response.json().catch(() => null) as FormSubmitResponse | null;
      const wasSuccessful = data?.success === true || data?.success === 'true';

      if (!response.ok || !wasSuccessful) throw new Error('FormSubmit submission failed');

      setValues(initialValues);
      setErrors({});
      setStatus('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.');
    } catch {
      setStatus(genericError);
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }

  return <form className="contact-form" noValidate onSubmit={submit}>
    <label htmlFor="contact-name">Ad Soyad
      <input id="contact-name" name="name" value={values.name} onChange={(event) => updateField('name', event.target.value)} autoComplete="name" required minLength={2} maxLength={100} aria-describedby={errors.name ? 'contact-name-error' : undefined} aria-invalid={Boolean(errors.name)} />
    </label>
    {errors.name && <p className="field-error" id="contact-name-error" role="alert">{errors.name}</p>}

    <label htmlFor="contact-email">E-posta
      <input id="contact-email" name="email" type="email" value={values.email} onChange={(event) => updateField('email', event.target.value)} autoComplete="email" required maxLength={200} aria-describedby={errors.email ? 'contact-email-error' : undefined} aria-invalid={Boolean(errors.email)} />
    </label>
    {errors.email && <p className="field-error" id="contact-email-error" role="alert">{errors.email}</p>}

    <label htmlFor="contact-subject">Konu
      <select id="contact-subject" name="subject" value={values.subject} onChange={(event) => updateField('subject', event.target.value)} required aria-describedby={errors.subject ? 'contact-subject-error' : undefined} aria-invalid={Boolean(errors.subject)}>
        <option value="">Seçin</option><option value="Tarife hatası bildir">Tarife hatası bildir</option><option value="Hesaplama sorunu">Hesaplama sorunu</option><option value="İçerik düzeltme talebi">İçerik düzeltme talebi</option><option value="Genel iletişim">Genel iletişim</option>
      </select>
    </label>
    {errors.subject && <p className="field-error" id="contact-subject-error" role="alert">{errors.subject}</p>}

    <label htmlFor="contact-message">Mesaj
      <textarea id="contact-message" name="message" value={values.message} onChange={(event) => updateField('message', event.target.value)} required minLength={10} maxLength={4000} aria-describedby={errors.message ? 'contact-message-error' : undefined} aria-invalid={Boolean(errors.message)} />
    </label>
    {errors.message && <p className="field-error" id="contact-message-error" role="alert">{errors.message}</p>}

    <label className="hp" htmlFor="contact-honey" aria-hidden="true">Web sitesi
      <input id="contact-honey" name="_honey" value={values.honey} onChange={(event) => updateField('honey', event.target.value)} tabIndex={-1} autoComplete="off" />
    </label>

    <button className="button" type="submit" disabled={sending}>{sending ? 'Gönderiliyor...' : 'Mesajı gönder'}</button>
    <p className="status" role="status" aria-live="polite">{status}</p>
  </form>;
}
