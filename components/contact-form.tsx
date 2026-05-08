"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface ContactFormProps {
  id?: string
  variant?: 'section' | 'dialog'
}

declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
    }
  }
}

const services = [
  { id: 'performance', label: 'Performance (Ads Management)' },
  { id: 'social-media', label: 'Social Media Management' },
  { id: 'content-creation', label: 'Content Creation' },
  { id: 'brand-strategy', label: 'Brand Strategy' },
  { id: 'creative-direction', label: 'Creative Direction' },
  { id: 'sm-consulting', label: 'SM Consulting' },
  { id: 'video-production', label: 'Video Production' },
  { id: 'pr', label: 'PR' },
]

export default function ContactForm({ id = 'contact', variant = 'section' }: ContactFormProps) {
  const isDialog = variant === 'dialog'
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    comment: '',
  })

  // Load reCAPTCHA script on mount
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
    if (!siteKey) {
      console.warn('reCAPTCHA site key not configured')
      return
    }

    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`
    script.async = true
    document.head.appendChild(script)

    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [])

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(s => s !== serviceId)
        : [...prev, serviceId]
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage(null)

    try {
      // Get reCAPTCHA token
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
      if (!siteKey) {
        throw new Error('reCAPTCHA not configured')
      }

      const recaptchaToken = await window.grecaptcha.execute(siteKey, { action: 'submit' })

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          services: selectedServices,
          recaptchaToken,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitMessage({ type: 'success', text: data.message })
        // Reset form
        setFormData({ fullName: '', email: '', phone: '', comment: '' })
        setSelectedServices([])
      } else {
        setSubmitMessage({ type: 'error', text: data.error || 'Eroare la trimitere' })
      }
    } catch (error) {
      setSubmitMessage({ type: 'error', text: 'Eroare la conectare. Încearcă din nou.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id={id}
      className={isDialog ? 'w-full' : 'w-full px-6 md:px-12 py-16 md:py-24'}
      style={isDialog ? undefined : { backgroundColor: '#eee5c8' }}
    >
      <div className={isDialog ? 'max-w-2xl mx-auto' : 'max-w-4xl mx-auto'}>
        <div className="mb-6 md:mb-10 text-center">
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: '#5a5a4a' }}
          >
            CONTACT
          </p>
          <h3
            className="text-2xl md:text-4xl leading-tight"
            style={{ color: '#1b2c1a', fontWeight: 300 }}
          >
            Hai sa vorbim despre proiectul tau.
          </h3>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5" onSubmit={handleSubmit}>
          <div className="md:col-span-2">
            <label
              htmlFor="fullName"
              className="block text-xs uppercase tracking-widest mb-2"
              style={{ color: '#5a5a4a' }}
            >
              Nume prenume
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              required
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Introdu numele complet"
              className="h-11 md:h-12 bg-white/60 border-[#d4ccae] text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs uppercase tracking-widest mb-2"
              style={{ color: '#5a5a4a' }}
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              placeholder="exemplu@email.com"
              className="h-11 md:h-12 bg-white/60 border-[#d4ccae] text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-xs uppercase tracking-widest mb-2"
              style={{ color: '#5a5a4a' }}
            >
              Telefon
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="07xx xxx xxx"
              className="h-11 md:h-12 bg-white/60 border-[#d4ccae] text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="comment"
              className="block text-xs uppercase tracking-widest mb-2"
              style={{ color: '#5a5a4a' }}
            >
              Comentariu
            </label>
            <Textarea
              id="comment"
              name="comment"
              required
              value={formData.comment}
              onChange={handleInputChange}
              placeholder="Scrie cateva detalii despre proiectul tau"
              className="min-h-28 md:min-h-36 bg-white/60 border-[#d4ccae] text-sm"
            />
          </div>

          <div className="md:col-span-2">
            <label
              className="block text-xs uppercase tracking-widest mb-4"
              style={{ color: '#5a5a4a' }}
            >
              Servicii de interes
            </label>
            <div className="grid grid-cols-2 gap-4">
              {services.map((service) => (
                <div key={service.id} className="flex items-center">
                  <input
                    type="checkbox"
                    id={service.id}
                    name="services"
                    value={service.id}
                    checked={selectedServices.includes(service.id)}
                    onChange={() => toggleService(service.id)}
                    className="w-4 h-4 rounded cursor-pointer"
                    style={{
                      borderColor: '#d4ccae',
                      accentColor: '#1b2c1a',
                    }}
                  />
                  <label
                    htmlFor={service.id}
                    className="ml-3 text-sm cursor-pointer"
                    style={{ color: '#1b2c1a' }}
                  >
                    {service.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-2 flex justify-stretch md:justify-end pt-1 md:pt-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="h-11 md:h-12 w-full md:w-auto px-6 md:px-8 text-xs uppercase tracking-[0.2em] md:tracking-widest rounded-[3px] disabled:opacity-60"
              style={{ backgroundColor: '#1b2c1a', color: '#eee5c8' }}
            >
              {isSubmitting ? 'Se trimite...' : 'Trimite mesajul'}
            </Button>
          </div>

          {submitMessage && (
            <div className="md:col-span-2 p-4 rounded-[3px]" style={{
              backgroundColor: submitMessage.type === 'success' ? '#f0fdf4' : '#fef2f2',
              border: `1px solid ${submitMessage.type === 'success' ? '#86efac' : '#fecaca'}`,
            }}>
              <p style={{ color: submitMessage.type === 'success' ? '#166534' : '#991b1b' }}>
                {submitMessage.text}
              </p>
            </div>
          )}
        </form>
      </div>
    </section>
  )
}
