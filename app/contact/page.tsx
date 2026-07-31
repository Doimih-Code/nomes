'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import Navigation from '@/components/navigation'
import FallingDotIndicator from '@/components/falling-dot-indicator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { motion } from 'motion/react'
import { Cormorant_Garamond } from 'next/font/google'

const cormorantGaramondItalic = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300'],
  style: ['italic'],
})

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

export default function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    message: '',
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
        ? prev.filter(id => id !== serviceId)
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

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
      if (!siteKey) {
        throw new Error('reCAPTCHA not configured')
      }

      const recaptchaToken = await window.grecaptcha.execute(siteKey, { action: 'submit' })

      const commentParts = []
      if (formData.company.trim()) commentParts.push(`Denumire firmă: ${formData.company.trim()}`)
      if (formData.website.trim()) commentParts.push(`Website: ${formData.website.trim()}`)
      commentParts.push(formData.message.trim())
      const comment = commentParts.join('\n')

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name,
          email: formData.email,
          phone: formData.phone,
          comment,
          services: selectedServices,
          recaptchaToken,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message)
        setFormData({ name: '', email: '', phone: '', company: '', website: '', message: '' })
        setSelectedServices([])
      } else {
        toast.error(data.error || 'Eroare la trimitere')
      }
    } catch (error) {
      toast.error('Eroare la conectare. Încearcă din nou.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
    <main className="min-h-screen">
      <Navigation activePage="Contact" variant="dark" noOffset />

      {/* Hero Section */}
      <section
        className="w-full min-h-screen px-6 md:px-12 pt-26 md:pt-30 pb-12 md:pb-16"
        style={{ backgroundColor: '#1b2c1a' }}
      >
        <div className="max-w-6xl mx-auto min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-210px)] flex flex-col justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end">
            {/* Left side */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="flex items-center gap-2 text-xs uppercase tracking-widest mb-6"
                style={{ color: '#b4a35d', letterSpacing: '0.2em' }}
              >
                <span>—</span>
                <span>CONTACT</span>
              </div>
              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8"
                style={{ color: '#eee5c8' }}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Hai să<br />
                vorbim.
              </motion.h1>
            </motion.div>

            {/* Right side */}
            <motion.div
              className="flex flex-col items-start md:items-end"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.p
                className={`${cormorantGaramondItalic.className} text-lg md:text-xl max-w-2xl mb-10 md:mb-12 italic tracking-wide`}
                style={{ color: '#bfbea2', fontWeight: 300, fontStyle: 'italic' }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Spune-ne pe scurt de ce ai nevoie, iar noi revenim cu o direcție clară și o propunere potrivită pentru business-ul tău.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <motion.section
        className="w-full px-6 md:px-12 py-16 md:py-24"
        style={{ backgroundColor: '#eee5c8' }}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Left Column - Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="text-xs uppercase tracking-widest mb-6"
                style={{ color: '#5a5a4a', letterSpacing: '0.2em' }}
              >
                — DATE DE CONTACT
              </div>

              <div>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: '#3a3a3a', marginBottom: '20px' }}
                >
                  Ne poți scrie direct sau poți completa formularul alăturat.
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <p
                    className="text-xs uppercase tracking-widest mb-2"
                    style={{ color: '#5a5a4a' }}
                  >
                    Telefon
                  </p>
                  <p
                    className="text-lg md:text-xl"
                    style={{ color: '#1b2c1a' }}
                  >
                    +40 757 087 748
                  </p>
                </div>

                <div>
                  <p
                    className="text-xs uppercase tracking-widest mb-2"
                    style={{ color: '#5a5a4a' }}
                  >
                    Email
                  </p>
                  <p
                    className="text-lg md:text-xl"
                    style={{ color: '#1b2c1a' }}
                  >
                    contact@nomes.ro
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <form className="space-y-5" onSubmit={handleSubmit}>
                {/* Nume */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <label
                    htmlFor="name"
                    className="block text-xs uppercase tracking-widest mb-2"
                    style={{ color: '#5a5a4a' }}
                  >
                    Nume *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Numele tău"
                    className="h-11 md:h-12 bg-white/60 border-[#d4ccae] text-sm"
                  />
                </motion.div>

                {/* Email + Telefon */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs uppercase tracking-widest mb-2"
                      style={{ color: '#5a5a4a' }}
                    >
                      Adresă email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                      className="h-11 md:h-12 bg-white/60 border-[#d4ccae] text-sm"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs uppercase tracking-widest mb-2"
                      style={{ color: '#5a5a4a' }}
                    >
                      Telefon *
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
                </motion.div>

                {/* Denumire firmă */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <label
                    htmlFor="company"
                    className="block text-xs uppercase tracking-widest mb-2"
                    style={{ color: '#5a5a4a' }}
                  >
                    Denumire firmă
                  </label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="Denumirea companiei"
                    className="h-11 md:h-12 bg-white/60 border-[#d4ccae] text-sm"
                  />
                </motion.div>

                {/* Website */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <label
                    htmlFor="website"
                    className="block text-xs uppercase tracking-widest mb-2"
                    style={{ color: '#5a5a4a' }}
                  >
                    Link website
                  </label>
                  <Input
                    id="website"
                    name="website"
                    type="url"
                    value={formData.website}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    className="h-11 md:h-12 bg-white/60 border-[#d4ccae] text-sm"
                  />
                </motion.div>

                {/* Services Checkboxes */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <label
                    className="block text-xs uppercase tracking-widest mb-3"
                    style={{ color: '#5a5a4a' }}
                  >
                    Servicii
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className="flex items-start gap-3 cursor-pointer group"
                      >
                        <div className="relative mt-0.5">
                          <input
                            type="checkbox"
                            name="services"
                            value={service.id}
                            checked={selectedServices.includes(service.id)}
                            onChange={() => toggleService(service.id)}
                            className="sr-only"
                          />
                          <div
                            className="w-5 h-5 border-2 rounded-[3px] flex items-center justify-center transition-all"
                            style={{
                              borderColor: selectedServices.includes(service.id) ? '#1b2c1a' : '#d4ccae',
                              backgroundColor: selectedServices.includes(service.id) ? '#1b2c1a' : 'transparent',
                            }}
                          >
                            {selectedServices.includes(service.id) && (
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="#eee5c8"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span
                          className="text-sm leading-tight"
                          style={{ color: '#1b2c1a' }}
                        >
                          {service.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </motion.div>

                {/* Comentarii */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-widest mb-2"
                    style={{ color: '#5a5a4a' }}
                  >
                    Comentarii *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Spune-ne mai mult despre ceea ce ai în minte…"
                    className="min-h-32 md:min-h-40 bg-white/60 border-[#d4ccae] text-sm"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.div
                  className="pt-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 w-full text-xs uppercase tracking-[0.2em] md:tracking-widest font-bold rounded-[3px] transition-all hover:opacity-80 disabled:opacity-60"
                    style={{ backgroundColor: '#1b2c1a', color: '#eee5c8' }}
                  >
                    {isSubmitting ? 'SE TRIMITE...' : 'TRIMITE MESAJUL'}
                  </Button>
                </motion.div>
              </form>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer spacer */}
      <div className="h-16" style={{ backgroundColor: '#eee5c8' }} />
    </main>
    <FallingDotIndicator />
    </>
  )
}
