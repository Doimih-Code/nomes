'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import { motion } from 'motion/react'

interface ServiceExample {
  title: string
  description: string
}

interface Service {
  id: string
  number: string
  name: string
  category: string
  description: string
  examples: ServiceExample[]
}

const services: Service[] = [
  {
    id: 'performance',
    number: '01',
    name: 'Performance',
    category: 'ADS MANAGEMENT',
    description: 'Gestionăm campanii plătite pe toate platformele majore, cu focus pe ROI real și scalare profitabilă. Fiecare leu investit are un scop clar.',
    examples: [
      {
        title: 'Google Search & Shopping Ads',
        description: 'Campanii de performanță cu structură granulară, bid strategies avansate și optimizare continuă a ROAS.',
      },
      {
        title: 'Meta Ads — Lead Gen & E-com',
        description: 'Funnel complet pe Facebook & Instagram, de la awareness la conversie, cu testare creativă sistematică',
      },
      {
        title: 'TikTok & LinkedIn Ads',
        description: 'Campanii native pe TikTok pentru reach masiv și LinkedIn pentru B2B targeting precis pe industrie și funcție.',
      },
    ],
  },
  {
    id: 'social-media',
    number: '02',
    name: 'Social Media Management',
    category: 'STRATEGY & EXECUTION',
    description: 'Preluăm complet prezența ta pe social media, de la strategie și calendar editorial la publicare, community management și raportare lunară.',
    examples: [
      {
        title: 'Calendar editorial lunar',
        description: 'Planificare strategică a conținutului pe 30 de zile, aliniată cu obiectivele de business și sezonalitate.',
      },
      {
        title: 'Community Management',
        description: 'Gestionarea comentariilor, DM-urilor și interacțiunilor cu audiența în timp real, 7 zile din 7. Automatizări AI integrate pentru răspunsuri rapide și clare.',
      },
      {
        title: 'Raportare & Analiză',
        description: 'Rapoarte lunare detaliate cu KPIs relevanți, insights acționabile și recomandări de optimizare.',
      },
    ],
  },
  {
    id: 'content-creation',
    number: '03',
    name: 'Content Creation',
    category: 'VISUAL & COPY',
    description: 'Creăm conținut vizual ce generează engagement real, de la imagini statice și reels la copy persuasiv și storytelling de brand.',
    examples: [
      {
        title: 'Grafice & Visual Design',
        description: 'Postări, stories, bannere și materiale vizuale coerente cu identitatea brandului tău pe toate formatele.',
      },
      {
        title: 'Copywriting & Captions',
        description: 'Texte care vând și construiesc comunitate, de la headlines la captions care generează conversații.',
      },
      {
        title: 'Reels & Short-Form',
        description: 'Producție și editare de conținut video scurt optimizat pentru algoritmii TikTok, Instagram și YouTube Shorts.',
      },
    ],
  },
  {
    id: 'brand-strategy',
    number: '04',
    name: 'Brand Strategy',
    category: 'POSITIONING & IDENTITY',
    description: 'Definim esența brandului tău, de la poziționare și mesaj cheie la identitate vizuală și tonul vocii. Construim fundația pe care crește tot restul.',
    examples: [
      {
        title: 'Brand Positioning',
        description: 'Analiză de piață, diferențiere competitivă și definirea propunerii unice de valoare pentru brandul tău.',
      },
      {
        title: 'Verbal Identity',
        description: 'Tonul vocii, mesaje cheie, tagline și ghid de comunicare pentru consistență pe toate canalele.',
      },
      {
        title: 'Visual Identity',
        description: 'Logo, paletă de culori, tipografie și sistem vizual complet pentru prezență memorabilă.',
      },
    ],
  },
  {
    id: 'creative-direction',
    number: '05',
    name: 'Creative Direction',
    category: 'ART & VISION',
    description: 'Oferim direcție creativă pentru campanii, shootings și proiecte speciale. Transformăm brief-uri în concepte vizuale puternice.',
    examples: [
      {
        title: 'Campaign Concepts',
        description: 'Dezvoltăm concepte creative pentru campanii integrate, de la idee la execuție vizuală.',
      },
      {
        title: 'Art Direction',
        description: 'Direcție artistică pentru shootings foto și video, moodboards și ghidare vizuală completă.',
      },
      {
        title: 'Creative Consulting',
        description: 'Consultanță creativă pentru proiecte speciale, lansări de produse și activări de brand.',
      },
    ],
  },
  {
    id: 'sm-consulting',
    number: '06',
    name: 'SM Consulting',
    category: 'TRAINING & ADVISORY',
    description: 'Consultanță și training pentru echipe interne care vor să își îmbunătățească prezența pe social media. Împărtășim ce funcționează.',
    examples: [
      {
        title: 'Social Media Audit',
        description: 'Analiză completă a prezenței tale actuale cu recomandări concrete de îmbunătățire.',
      },
      {
        title: 'Strategy Workshop',
        description: 'Workshop intensiv pentru definirea strategiei de social media aliniată cu obiectivele de business.',
      },
      {
        title: 'Team Training',
        description: 'Training personalizat pentru echipa ta pe platforme specifice, tools și best practices.',
      },
    ],
  },
  {
    id: 'video-production',
    number: '07',
    name: 'Video Production',
    category: 'FILM & EDIT',
    description: 'Producem conținut video de la concept la final, de la reels și TikTok-uri la videoclipuri de brand și testimoniale.',
    examples: [
      {
        title: 'Brand Videos',
        description: 'Videoclipuri de prezentare, manifesto de brand și conținut premium pentru website și campanii.',
      },
      {
        title: 'Social Video Content',
        description: 'Producție de reels, TikTok-uri și stories optimizate pentru engagement pe fiecare platformă.',
      },
      {
        title: 'Testimoniale & Interviuri',
        description: 'Producție profesională de testimoniale clienți și interviuri care construiesc credibilitate.',
      },
    ],
  },
  {
    id: 'pr',
    number: '08',
    name: 'PR',
    category: 'EVENTS & RELATIONS',
    description: 'Organizăm evenimente, construim parteneriate strategice pentru vizibilitate maximă și gestionăm relații cu presa.',
    examples: [
      {
        title: 'Event Management',
        description: 'Organizare de evenimente de brand, lansări de produse și activări.',
      },
      {
        title: 'Influencer Partnerships',
        description: 'Identificare, negociere și management de colaborări cu influenceri și creatori de conținut.',
      },
      {
       title: 'Media Relations',
        description: 'Relații cu presa, comunicate și plasări media în publicații relevante pentru industria ta.',
      },
    ],
  },
]

export default function ServiciiPage() {
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const toggleService = (id: string) => {
    setExpandedService(expandedService === id ? null : id)
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#eee5c8' }}>
      <Navigation activePage="Servicii" />

      {/* Hero Section */}
      <section className="px-8 md:px-16 lg:px-24 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            {/* Left side */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                className="text-xs uppercase tracking-widest mb-6"
                style={{ color: '#1b2c1a', letterSpacing: '0.2em' }}
              >
                CE FACEM
              </p>
              <h1
                className="text-6xl md:text-7xl lg:text-8xl font-bold leading-none"
                style={{ color: '#1b2c1a' }}
              >
                Servicii.
              </h1>
            </motion.div>

            {/* Right side */}
            <motion.div
              className="flex flex-col items-start md:items-end"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            >
              <p
                className="text-xs uppercase tracking-widest"
                style={{ color: '#666', letterSpacing: '0.15em' }}
              >
                — 08 SERVICII DISPONIBILE
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="px-8 md:px-16 lg:px-24 pb-24">
        <div className="max-w-7xl mx-auto">
          {/* Divider line */}
          <div className="border-t" style={{ borderColor: '#ccc5a8' }} />

          {services.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: idx * 0.06 }}
            >
              {/* Service Row */}
              <button
                onClick={() => toggleService(service.id)}
                className="w-full py-8 flex items-center justify-between group transition-all duration-300"
              >
                <div className="flex items-center gap-8 md:gap-16">
                  <span
                    className="text-sm font-mono"
                    style={{ color: '#999' }}
                  >
                    {service.number}
                  </span>
                  <h2
                    className="text-2xl md:text-3xl lg:text-4xl font-bold text-left"
                    style={{ color: '#1b2c1a' }}
                  >
                    {service.name}
                  </h2>
                </div>

                <div className="flex items-center gap-6">
                  <span
                    className="text-xs uppercase tracking-widest hidden md:block"
                    style={{ color: '#666', letterSpacing: '0.1em' }}
                  >
                    {service.category}
                  </span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      backgroundColor: expandedService === service.id ? '#1b2c1a' : 'transparent',
                      border: expandedService === service.id ? 'none' : '1px solid #999',
                    }}
                  >
                    {expandedService === service.id ? (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="#eee5c8"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="#1b2c1a"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    )}
                  </div>
                </div>
              </button>

              {/* Expanded Content */}
              <div
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                  maxHeight: expandedService === service.id ? '800px' : '0',
                  opacity: expandedService === service.id ? 1 : 0,
                }}
              >
                <div className="pb-12">
                  {/* Description */}
                  <p
                    className="text-base md:text-lg max-w-3xl mb-8 leading-relaxed"
                    style={{ color: '#1b2c1a' }}
                  >
                    {service.description}
                  </p>

                  {/* Example Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {service.examples.map((example, idx) => (
                      <div
                        key={idx}
                        className="p-6 rounded-[3px]"
                        style={{ backgroundColor: '#1b2c1a' }}
                      >
                        <p
                          className="text-xs uppercase tracking-widest mb-4"
                          style={{ color: '#666', letterSpacing: '0.1em' }}
                        >
                          EXEMPLU 0{idx + 1}
                        </p>
                        <h3
                          className="text-lg font-bold mb-3"
                          style={{ color: '#eee5c8' }}
                        >
                          {example.title}
                        </h3>
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: '#bfbea2' }}
                        >
                          {example.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider line */}
              <div className="border-t" style={{ borderColor: '#ccc5a8' }} />
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}
