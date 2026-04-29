'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

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

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  return (
    <main className="min-h-screen">
      <Navigation activePage="Contact" />

      {/* Hero Section */}
      <section
        className="w-full px-6 md:px-12 pt-26 md:pt-30 pb-12 md:pb-16"
        style={{ backgroundColor: '#1b2c1a' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-end">
            {/* Left side */}
            <div>
              <div
                className="flex items-center gap-2 text-xs uppercase tracking-widest mb-6"
                style={{ color: '#b4a35d', letterSpacing: '0.2em' }}
              >
                <span>—</span>
                <span>CONTACT</span>
              </div>
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95]"
                style={{ color: '#eee5c8' }}
              >
                Hai să<br />
                vorbim.
              </h1>
            </div>

            {/* Right side */}
            <div className="flex flex-col items-start md:items-end">
              <p
                className="text-base md:text-lg max-w-md leading-relaxed"
                style={{ color: '#bfbea2' }}
              >
                Spune-ne pe scurt de ce ai nevoie, iar noi revenim cu o direcție clară și o propunere potrivită pentru business-ul tău.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        className="w-full px-6 md:px-12 py-16 md:py-24"
        style={{ backgroundColor: '#eee5c8' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
            {/* Left Column - Contact Info */}
            <div>
              <div
                className="text-xs uppercase tracking-widest mb-6"
                style={{ color: '#5a5a4a', letterSpacing: '0.2em' }}
              >
                — DATE DE CONTACT
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
                    +40 7XX XXX XXX
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
                    hello@nomes.ro
                  </p>
                </div>

                <div className="pt-6">
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: '#3a3a3a' }}
                  >
                    Ne poți scrie direct sau poți completa formularul alăturat.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <form className="space-y-5" action="#" method="post">
                {/* Nume */}
                <div>
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
                    placeholder="Numele tău"
                    className="h-11 md:h-12 bg-white/60 border-[#d4ccae] text-sm"
                  />
                </div>

                {/* Email */}
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
                    placeholder="email@example.com"
                    className="h-11 md:h-12 bg-white/60 border-[#d4ccae] text-sm"
                  />
                </div>

                {/* Denumire firmă */}
                <div>
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
                    placeholder="Denumirea companiei"
                    className="h-11 md:h-12 bg-white/60 border-[#d4ccae] text-sm"
                  />
                </div>

                {/* Website */}
                <div>
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
                    placeholder="https://example.com"
                    className="h-11 md:h-12 bg-white/60 border-[#d4ccae] text-sm"
                  />
                </div>

                {/* Services Checkboxes */}
                <div>
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
                </div>

                {/* Comentarii */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-widest mb-2"
                    style={{ color: '#5a5a4a' }}
                  >
                    Comentarii
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Spune-ne mai mult despre ceea ce ai în minte…"
                    className="min-h-32 md:min-h-40 bg-white/60 border-[#d4ccae] text-sm"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="h-12 w-full text-xs uppercase tracking-[0.2em] md:tracking-widest font-bold rounded-[3px] transition-all hover:opacity-80"
                    style={{ backgroundColor: '#1b2c1a', color: '#eee5c8' }}
                  >
                    TRIMITE MESAJUL
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-16" style={{ backgroundColor: '#eee5c8' }} />
    </main>
  )
}
