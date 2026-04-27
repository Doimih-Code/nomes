'use client'

import { useState } from 'react'
import ContactForm from '@/components/contact-form'
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

export default function ContactCtaDialog({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
        className="w-[calc(100vw-1rem)] max-w-md max-h-[88vh] overflow-y-auto border-0 p-4 sm:max-w-xl md:max-w-2xl md:p-6 lg:max-w-3xl lg:p-7"
        style={{ backgroundColor: '#eee5c8' }}
      >
        <DialogTitle className="sr-only">Formular de contact</DialogTitle>
        <DialogDescription className="sr-only">
          Completeaza formularul pentru a discuta despre proiectul tau.
        </DialogDescription>
        <ContactForm variant="dialog" />
      </DialogContent>
    </Dialog>
  )
}
