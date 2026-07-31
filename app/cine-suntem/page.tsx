'use client'

import Navigation from '@/components/navigation'
import ContactCtaDialog from '@/components/contact-cta-dialog'
import FallingDotIndicator from '@/components/falling-dot-indicator'
import ValueIconGraphic from '@/components/value-icon'
import { Cormorant_Garamond } from 'next/font/google'
import { motion } from 'motion/react'

const cormorantGaramondItalic = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300'],
  style: ['italic'],
})

const stats = [
  { number: '6+', label: 'Ani Experiență' },
  { number: '50+', label: 'Proiecte Livrate' },
]

const values = [
  {
    id: '01',
    title: 'Autenticitate',
    icon: 'target' as const,
  },
  {
    id: '02',
    title: 'Excelență',
    icon: 'medal' as const,
  },
  {
    id: '03',
    title: 'Inovație',
    icon: 'lightbulb' as const,
  },
  {
    id: '04',
    title: 'Parteneriat',
    icon: 'rings' as const,
  },
]

const team = [
  { initials: 'RE', name: 'Radu Enache', role: 'Ads specialist' },
  { initials: 'AI', name: 'Drey', role: 'Creative & Partnership Lead' },
  { initials: 'MO', name: 'Romina Neagu', role: 'Social Media Specialist & Creative' },
]

function TeamMemberCard({ member }: { member: (typeof team)[number] }) {
  return (
    <div className="w-[140px] md:w-[168px] text-center">
      <div
        className="w-[140px] h-[170px] md:w-[168px] md:h-[192px] flex items-center justify-center text-3xl md:text-5xl font-bold mb-4 rounded-[3px]"
        style={{ backgroundColor: '#1b2c1a', color: '#3a4a3a' }}
      >
        {member.initials}
      </div>
      <div className="font-bold text-sm" style={{ color: '#1b2c1a' }}>
        {member.name}
      </div>
      <div className="text-xs uppercase tracking-wider" style={{ color: '#5a5a4a' }}>
        {member.role}
      </div>
    </div>
  )
}

const timeline = [
  {
    year: '2017',
    title: 'Început în freelancing',
  },
  {
    year: '2018',
    title: 'Primul client',
  },
  {
    year: '2020',
    title: 'Începerea expansiunii',
  },
  {
    year: 'Azi',
    title: 'Astăzi',
  },
]

export default function CineSuntemPage() {
  return (
    <>
    <main style={{ backgroundColor: '#eee5c8' }}>
      {/* Navigation */}
      <Navigation activePage="Cine suntem" variant="dark" noOffset />

      {/* Hero Section - Echipa ta de marketing */}
      <section
        className="w-full min-h-screen px-6 md:px-12 pt-26 md:pt-30 pb-12 md:pb-16"
        style={{ backgroundColor: '#1b2c1a' }}
      >
        <div className="max-w-6xl mx-auto min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-210px)] flex flex-col justify-center">
          {/* Label */}
          <motion.div
            className="flex items-center gap-2 text-xs uppercase tracking-widest mb-8"
            style={{ color: '#b4a35d' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>—</span>
            <span>CINE SUNTEM</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8"
            style={{ color: '#eee5c8' }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            Echipa<br />
            ta de<br />
            marketing.
          </motion.h1>

          {/* Description */}
          <motion.p
            className={`${cormorantGaramondItalic.className} text-lg md:text-xl max-w-2xl mb-10 md:mb-12 italic tracking-wide`}
            style={{ color: '#bfbea2', fontWeight: 300, fontStyle: 'italic' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            Google, Meta, TikTok și LinkedIn Ads, social media strategy, content,
            video profesionist și evenimente PR, tot ce ai nevoie, sub un singur
            acoperiș.
          </motion.p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 border-t pt-8 md:pt-10" style={{ borderColor: 'rgba(180, 163, 93, 0.3)' }}>
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.45 + idx * 0.12 }}
              >
                <div
                  className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2"
                  style={{ color: '#eee5c8' }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-[10px] sm:text-xs uppercase tracking-[0.18em] md:tracking-widest leading-tight pr-2"
                  style={{ color: '#b4a35d' }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Misiune + Valori Section */}
      <motion.section
        className="w-full px-6 md:px-12 py-16 md:py-24"
        style={{ backgroundColor: '#eee5c8' }}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto relative">
          <div
            aria-hidden="true"
            className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px"
            style={{
              background: 'linear-gradient(180deg, rgba(27, 44, 26, 0) 0%, rgba(27, 44, 26, 0.35) 14%, rgba(27, 44, 26, 0.35) 86%, rgba(27, 44, 26, 0) 100%)',
            }}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left Content: Misiunea */}
            <div className="md:pr-10 lg:pr-14">
              <div
                className="text-xs uppercase tracking-widest mb-4"
                style={{ color: '#5a5a4a' }}
              >
                MISIUNEA NOASTRĂ
              </div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
                style={{ color: '#1b2c1a' }}
              >
                De ce<br />
                existăm.
              </h2>
              <div className="space-y-6" style={{ color: '#3a3a3a' }}>
                <p>
                  Credem că fiecare brand are o poveste unică de spus. Misiunea noastră este să găsim acea poveste, să o rafinăm și să o transmitem lumii cu claritate și impact.
                </p>
                <p>
                  Nu suntem o agenție obișnuită, suntem partenerii tăi de creștere, investiți în succesul tău pe termen lung.
                </p>
              </div>
            </div>

            {/* Right Content: Valorile */}
            <div className="md:pl-4 lg:pl-6">
              <div
                className="text-xs uppercase tracking-widest mb-4"
                style={{ color: '#5a5a4a' }}
              >
                VALORILE NOASTRE
              </div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12"
                style={{ color: '#1b2c1a' }}
              >
                Ce ne<br />
                definește.
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {values.map((value) => (
                  <div
                    key={value.id}
                    className="p-6 md:p-7 border rounded-[3px]"
                    style={{ borderColor: 'rgba(26, 44, 26, 0.15)', backgroundColor: 'rgba(255,255,255,0.3)' }}
                  >
                    <div className="flex items-start justify-between">
                      <div
                        className="text-xs"
                        style={{ color: '#5a5a4a' }}
                      >
                        {value.id}
                      </div>
                      <div
                        className="w-[48px] h-[48px] md:w-[54px] md:h-[54px] rounded-xl flex items-center justify-center shrink-0"
                        style={{ backgroundColor: '#1b2c1a' }}
                      >
                        <ValueIconGraphic icon={value.icon} className="w-[34px] h-[34px] md:w-[38px] md:h-[38px]" />
                      </div>
                    </div>
                    <h3
                      className="text-base font-bold mt-3"
                      style={{ color: '#1b2c1a' }}
                    >
                      {value.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quote Section */}
      <motion.section
        className="w-full px-6 md:px-12 py-24 md:py-32"
        style={{ backgroundColor: '#1b2c1a' }}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <p
            className="text-2xl md:text-3xl lg:text-4xl italic leading-relaxed"
            style={{ color: '#eee5c8' }}
          >
            {'"Nu construim doar campanii. Construim relații, comunități și branduri care rezistă în timp."'}
          </p>
          <div
            className="mt-8 text-xs uppercase tracking-widest"
            style={{ color: '#5a5a4a' }}
          >
            — ECHIPA NOASTRĂ
          </div>
        </div>
      </motion.section>

      {/* Oamenii din spate Section */}
      <motion.section
        className="w-full px-6 md:px-12 py-16 md:py-24"
        style={{ backgroundColor: '#eee5c8' }}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* Left Content */}
            <div>
              <div
                className="text-xs uppercase tracking-widest mb-4"
                style={{ color: '#5a5a4a' }}
              >
                ECHIPA
              </div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8"
                style={{ color: '#1b2c1a' }}
              >
                Oamenii<br />
                din spate.
              </h2>
              <div className="space-y-6" style={{ color: '#3a3a3a' }}>
                <p>
                  O echipă diversă de profesioniști pasionați, fiecare aducând o perspectivă unică și o expertiză aparte.
                </p>
                <p>
                  Oameni diferiți, cu backgrounduri diferite, uniți pentru a aduce rezultate.
                </p>
                <p>
                  Împreună, formăm mai mult decât o sumă a părților.
                </p>
              </div>
            </div>

            {/* Right Team Cards */}
            <div className="md:max-w-[420px] md:ml-auto">
              <div className="flex justify-center mb-10">
                <TeamMemberCard member={team[0]} />
              </div>
              <div className="grid grid-cols-2 gap-x-6 md:gap-x-8 justify-items-center md:justify-items-end">
                <TeamMemberCard member={team[1]} />
                <TeamMemberCard member={team[2]} />
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Drumul nostru Section */}
      <motion.section
        className="relative overflow-hidden w-full px-6 md:px-12 py-8 md:py-16"
        style={{ backgroundColor: '#1b2c1a' }}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Decorative arcs */}
        <svg
          className="absolute bottom-0 right-0 w-72 h-72 md:w-96 md:h-96 pointer-events-none"
          viewBox="0 0 300 300"
          fill="none"
          aria-hidden="true"
        >
          <path d="M160 300 A140 140 0 0 1 300 160" stroke="#eee5c8" strokeWidth="1.5" opacity="0.2" />
          <path d="M110 300 A190 190 0 0 1 300 110" stroke="#eee5c8" strokeWidth="1.5" opacity="0.15" />
          <path d="M60 300 A240 240 0 0 1 300 60" stroke="#eee5c8" strokeWidth="1.5" opacity="0.1" />
        </svg>

        <div className="relative max-w-6xl mx-auto">
          {/* Timeline graph */}
          <div
            className="relative w-full max-w-3xl mb-16 md:mb-20"
            style={{ aspectRatio: '1000 / 400' }}
          >
            <svg
              viewBox="0 0 1000 400"
              className="w-full h-full"
              fill="none"
              aria-hidden="true"
            >
              <polyline
                points="90,300 410,260 640,230 940,190"
                stroke="#8a8a72"
                strokeWidth="2"
                opacity="0.6"
              />
              <circle cx="90" cy="300" r="13" stroke="#eee5c8" strokeWidth="4" fill="#1b2c1a" />
              <circle cx="410" cy="260" r="13" stroke="#eee5c8" strokeWidth="4" fill="#1b2c1a" />
              <circle cx="640" cy="230" r="13" stroke="#eee5c8" strokeWidth="4" fill="#1b2c1a" />
              <circle cx="940" cy="190" r="16" fill="#c94c4c" />
            </svg>
            <div
              className="absolute text-sm"
              style={{ left: '5%', top: '84%', color: '#8a8a72' }}
            >
              {timeline[0].year}
            </div>
            <div
              className="absolute text-xs font-bold uppercase tracking-widest"
              style={{ left: '87%', top: '4%', color: '#c94c4c' }}
            >
              {timeline[timeline.length - 1].year}
            </div>
          </div>

          <div
            className="h-px w-full mb-8 md:mb-10"
            style={{ backgroundColor: 'rgba(238,229,200,0.15)' }}
          />

          <p
            className={`${cormorantGaramondItalic.className} text-2xl md:text-3xl lg:text-4xl italic leading-snug max-w-xl`}
            style={{ color: '#eee5c8' }}
          >
            „Fiecare an a adăugat un nou capitol<br />
            la povestea noastră.”
          </p>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="w-full px-6 md:px-12 py-24 md:py-32"
        style={{ backgroundColor: '#eee5c8' }}
        initial={{ opacity: 0, y: 48 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative max-w-4xl mx-auto text-center overflow-hidden">
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <motion.span
              className="text-[7rem] md:text-[11rem] font-bold leading-none"
              style={{ color: '#1b2c1a', opacity: 0.07 }}
              initial={{ opacity: 0, scale: 0.94, y: 24 }}
              whileInView={{ opacity: 0.07, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              HAI
            </motion.span>
          </div>

          <div className="relative z-10">
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
            style={{ color: '#1b2c1a' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            Lucrăm<br />
            Împreună?
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <ContactCtaDialog />
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
