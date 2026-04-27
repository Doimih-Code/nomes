"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface ContactFormProps {
  id?: string
  variant?: 'section' | 'dialog'
}

export default function ContactForm({ id = 'contact', variant = 'section' }: ContactFormProps) {
  const isDialog = variant === 'dialog'

  return (
    <section
      id={id}
      className={isDialog ? 'w-full' : 'w-full px-6 md:px-12 py-16 md:py-24'}
      style={isDialog ? undefined : { backgroundColor: '#eee5c8' }}
    >
      <div className={isDialog ? 'max-w-3xl mx-auto' : 'max-w-4xl mx-auto'}>
        <div className="mb-10 text-center">
          <p
            className="text-xs uppercase tracking-widest mb-3"
            style={{ color: '#5a5a4a' }}
          >
            CONTACT
          </p>
          <h3
            className="text-3xl md:text-4xl"
            style={{ color: '#1b2c1a', fontWeight: 300 }}
          >
            Hai sa vorbim despre proiectul tau.
          </h3>
        </div>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-5" action="#" method="post">
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
              placeholder="Introdu numele complet"
              className="h-12 bg-white/60 border-[#d4ccae]"
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
              placeholder="exemplu@email.com"
              className="h-12 bg-white/60 border-[#d4ccae]"
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
              placeholder="07xx xxx xxx"
              className="h-12 bg-white/60 border-[#d4ccae]"
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
              placeholder="Scrie cateva detalii despre proiectul tau"
              className="min-h-36 bg-white/60 border-[#d4ccae]"
            />
          </div>

          <div className="md:col-span-2 flex justify-center md:justify-end pt-2">
            <Button
              type="submit"
              className="h-12 px-8 text-xs uppercase tracking-widest rounded-[3px]"
              style={{ backgroundColor: '#1b2c1a', color: '#eee5c8' }}
            >
              Trimite mesajul
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
