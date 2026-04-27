'use client'

import ContactForm from '@/components/contact-form'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'

export default function ContactCtaDialog({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className="inline-block px-8 py-4 text-sm uppercase tracking-widest font-bold rounded-[3px] transition-all hover:opacity-80"
          style={{
            backgroundColor: variant === 'light' ? '#eee5c8' : '#1b2c1a',
            color: variant === 'light' ? '#1b2c1a' : '#eee5c8',
          }}
        >
          HAI SA VORBIM
        </button>
      </DialogTrigger>

      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto border-0 p-6 md:p-8"
        style={{ backgroundColor: '#eee5c8' }}
      >
        <ContactForm variant="dialog" />
      </DialogContent>
    </Dialog>
  )
}
