'use client'

import Navigation from '@/components/navigation'
import PortfolioSlider from '@/components/portfolio-slider'
import PartnersLogoLoop from '@/components/partners-logo-loop'
import ContactCtaDialog from '@/components/contact-cta-dialog'
import { motion } from 'motion/react'

export default function PortofoliuPage() {
  return (
    <main className="min-h-screen" style={{ backgroundColor: '#1b2c1a' }}>
      <section className="w-full min-h-screen px-6 md:px-12 pt-[104px] md:pt-[120px] pb-16 md:pb-20" style={{ backgroundColor: '#1b2c1a' }}>
        <div className="max-w-6xl mx-auto">
          <Navigation activePage="Portofoliu" variant="transparent" />

          {/* Hero + Showreel */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-210px)]">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-xs uppercase tracking-[0.45em] mb-6"
                style={{ color: 'rgba(180, 163, 93, 0.7)' }}
              >
                Portofoliu
              </p>
              <h1
                className="text-6xl md:text-8xl leading-[0.9] font-bold max-w-xl"
                style={{ color: '#eee5c8' }}
              >
                Munca
                <br />
                noastră.
              </h1>
            </motion.div>

            <motion.div
              className="border border-dashed rounded-[3px] h-[420px] md:h-[460px] px-6 text-center flex items-center justify-center"
              style={{ borderColor: 'rgba(180, 163, 93, 0.24)' }}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <div className="w-full flex flex-col items-center justify-center">
                <div className="mb-5 flex justify-center">
                  <div className="w-0 h-0 border-t-[12px] border-b-[12px] border-l-[20px] border-t-transparent border-b-transparent" style={{ borderLeftColor: 'rgba(238, 229, 200, 0.55)' }} />
                </div>
                <p
                  className="text-sm uppercase tracking-[0.35em] mb-2"
                  style={{ color: 'rgba(180, 163, 93, 0.55)' }}
                >
                  Video reel / showreel
                </p>
                <p className="text-sm" style={{ color: 'rgba(238, 229, 200, 0.35)' }}>
                  Inlocuiti acest tag cu video-ul vostru sau cu un frame din portofoliu.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Clienți & Campanii section — light */}
      <motion.section
        className="w-full px-6 md:px-12 py-16 md:py-24"
        style={{ backgroundColor: '#eee5c8' }}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto">

          {/* Header row */}
          <div className="flex items-end justify-between mb-10 md:mb-14">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: '#b4a35d' }}>
                Proiecte selectate
              </p>
              <h2 className="text-5xl md:text-7xl font-bold leading-[0.9]" style={{ color: '#1b2c1a' }}>
                Clienți<br /> Campanii.
              </h2>
            </motion.div>
            <motion.p
              className="text-xs uppercase tracking-[0.35em] hidden md:block"
              style={{ color: '#bfbea2' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              40+ clienți recurenți
            </motion.p>
          </div>

          {/* Slider */}
          <PortfolioSlider />
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="w-full px-6 md:px-12 py-16 md:py-24"
        style={{ backgroundColor: '#eee5c8' }}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-start gap-12 mb-16">
            <div className="flex-1">
              <p className="text-xs uppercase tracking-[0.4em] mb-4" style={{ color: '#b4a35d' }}>
                Parteneri &amp; Colaboratori
              </p>
              <h2 className="text-5xl md:text-6xl font-bold leading-[0.9]" style={{ color: '#1b2c1a' }}>
                Oamenii<br />care ne<br />recomandă.
              </h2>
            </div>
            <div className="flex-1">
              <p className="text-base md:text-lg leading-relaxed" style={{ color: '#1b2c1a' }}>
                Clienții nostri sunt cei mai buni ambasadori. Mai jos, câteva cuvinte de la ei, și o secțiune dedicată video-testimonialelor pe care le vom încărcă împreună.
              </p>
            </div>
          </div>

          {/* Videos Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {/* Main Video */}
            <div className="md:col-span-2 rounded-[3px] overflow-hidden" style={{ backgroundColor: '#1b2c1a' }}>
              <div
                className="aspect-[16/6] w-full flex flex-col items-center justify-between relative p-6"
                style={{ backgroundColor: '#1b2c1a' }}
              >
                <div />
                <button className="w-16 h-16 rounded-full flex items-center justify-center transition-opacity hover:opacity-70" style={{ border: '1.5px solid rgba(238, 229, 200, 0.4)', backgroundColor: 'transparent' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ color: '#eee5c8' }}>
                    <path
                      d="M5 3L19 12L5 21V3Z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
                <div className="w-full">
                  <p
                    className="text-xs uppercase tracking-widest mb-2"
                    style={{ color: '#bfbea2' }}
                  >
                    Video testimonial principal
                  </p>
                  <p className="text-xs" style={{ color: '#bfbea2' }}>
                    Ianuarie 15, 2026 · Industria media
                  </p>
                </div>
              </div>
            </div>

            {/* Side Videos */}
            <div className="flex flex-col gap-4">
              {['TESTIMONIAL 02', 'TESTIMONIAL 03', 'TESTIMONIAL 04'].map((title, idx) => (
                <div key={idx} className="rounded-[3px] overflow-hidden" style={{ backgroundColor: '#1b2c1a' }}>
                  <div
                    className="aspect-[16/5] w-full flex flex-col items-center justify-between relative p-4"
                    style={{ backgroundColor: '#1b2c1a' }}
                  >
                    <div />
                    <button className="w-12 h-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-70" style={{ border: '1.5px solid rgba(238, 229, 200, 0.4)', backgroundColor: 'transparent' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" style={{ color: '#eee5c8' }}>
                        <path
                          d="M5 3L19 12L5 21V3Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                    <p className="text-xs uppercase tracking-widest w-full text-center" style={{ color: '#eee5c8' }}>
                      {title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partners Section */}
          <div className="border-t pt-12" style={{ borderColor: 'rgba(27, 44, 26, 0.15)' }}>
            <p className="text-xs uppercase tracking-[0.4em] mb-8" style={{ color: '#b4a35d' }}>
              Parteneri &amp; Colaboratori
            </p>
            <PartnersLogoLoop />
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="w-full px-6 md:px-12 py-24 md:py-32 relative overflow-hidden"
        style={{ backgroundColor: '#1b2c1a' }}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Watermark LUCRAM */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.p
            className="text-[8rem] md:text-[12rem] font-bold leading-none"
            style={{ color: 'rgba(238, 229, 200, 0.05)', letterSpacing: '-0.02em' }}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            LUCRAM
          </motion.p>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center justify-center text-center">
          <motion.h2
            className="text-5xl md:text-7xl font-bold mb-8 leading-[1.1]"
            style={{ color: '#eee5c8' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            Vrei să fii<br />următorul?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          >
            <ContactCtaDialog variant="light" />
          </motion.div>
        </div>
      </motion.section>
    </main>
  )
}
