import Navigation from '@/components/navigation'
import ContactCtaDialog from '@/components/contact-cta-dialog'
import { Cormorant_Garamond } from 'next/font/google'

const cormorantGaramondItalic = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300'],
  style: ['italic'],
})

const stats = [
  { number: '9+', label: 'Ani Experiență' },
  { number: '12+', label: 'Clienți Recurenți' },
  { number: '100+', label: 'Proiecte Livrate' },
]

const values = [
  {
    id: '01',
    title: 'Autenticitate',
      },
  {
    id: '02',
    title: 'Excelență',
      },
  {
    id: '03',
    title: 'Inovație',
      },
  {
    id: '04',
    title: 'Parteneriat',
  },
]

const team = [
  { initials: 'MI', name: 'Mihai Iorgulescu', role: 'Ads specialist' },
  { initials: 'RE', name: 'Radu Enache', role: 'Account manager' },
  { initials: 'AI', name: 'Andrei Ionescu', role: 'Creative & Partnership' },
  { initials: 'MO', name: 'Romina Neagu', role: 'Social Media Specialist & Creator' },
]

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
          <div
            className="flex items-center gap-2 text-xs uppercase tracking-widest mb-8"
            style={{ color: '#b4a35d' }}
          >
            <span>—</span>
            <span>CINE SUNTEM</span>
          </div>

          {/* Main Title */}
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8"
            style={{ color: '#eee5c8' }}
          >
            Echipa<br />
            ta de<br />
            marketing.
          </h1>

          {/* Description */}
          <p
            className={`${cormorantGaramondItalic.className} text-lg md:text-xl max-w-2xl mb-10 md:mb-12 italic tracking-wide`}
            style={{ color: '#bfbea2', fontWeight: 300, fontStyle: 'italic' }}
          >
            Google, Meta, TikTok și LinkedIn Ads, social media strategy, content,
            video profesionist și evenimente PR — tot ce ai nevoie, sub un singur
            acoperiș.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 border-t pt-8 md:pt-10" style={{ borderColor: 'rgba(180, 163, 93, 0.3)' }}>
            {stats.map((stat, idx) => (
              <div key={idx}>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Misiune + Valori Section */}
      <section className="w-full px-6 md:px-12 py-16 md:py-24" style={{ backgroundColor: '#eee5c8' }}>
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
                  Nu suntem o agenție obișnuită — suntem partenerii tăi de creștere, investiți în succesul tău pe termen lung.
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
                    <div
                      className="text-xs mb-3"
                      style={{ color: '#5a5a4a' }}
                    >
                      {value.id}
                    </div>
                    <h3
                      className="text-lg font-bold"
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
      </section>

      {/* Quote Section */}
      <section
        className="w-full px-6 md:px-12 py-24 md:py-32"
        style={{ backgroundColor: '#1b2c1a' }}
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
      </section>

      {/* Oamenii din spate Section */}
      <section className="w-full px-6 md:px-12 py-16 md:py-24" style={{ backgroundColor: '#eee5c8' }}>
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
            <div className="grid grid-cols-2 gap-x-6 md:gap-x-8 gap-y-10 justify-items-center md:justify-items-end md:max-w-[420px] md:ml-auto">
              {team.map((member, idx) => (
                <div key={idx} className="w-[140px] md:w-[168px] text-center">
                  <div
                    className="w-[140px] h-[170px] md:w-[168px] md:h-[192px] flex items-center justify-center text-3xl md:text-5xl font-bold mb-4 rounded-[3px]"
                    style={{ backgroundColor: '#1b2c1a', color: '#3a4a3a' }}
                  >
                    {member.initials}
                  </div>
                  <div
                    className="font-bold text-sm"
                    style={{ color: '#1b2c1a' }}
                  >
                    {member.name}
                  </div>
                  <div
                    className="text-xs uppercase tracking-wider"
                    style={{ color: '#5a5a4a' }}
                  >
                    {member.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Drumul nostru Section */}
      <section className="w-full px-6 md:px-12 py-16 md:py-24" style={{ backgroundColor: '#eee5c8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left Dark Panel */}
            <div
              className="relative p-8 md:p-12 min-h-112.5 flex flex-col justify-between rounded-[3px]"
              style={{ backgroundColor: '#1b2c1a' }}
            >
              <div
                className="text-8xl font-bold opacity-20"
                style={{ color: '#eee5c8' }}
              >
                03
              </div>
              <p
                className="text-lg italic"
                style={{ color: '#bfbea2' }}
              >
                {'"Fiecare an a adăugat un nou capitol la povestea noastră."'}
              </p>
            </div>

            {/* Right Timeline */}
            <div>
              <div
                className="text-xs uppercase tracking-widest mb-4"
                style={{ color: '#5a5a4a' }}
              >
                POVESTEA NOASTRĂ
              </div>
              <h2
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12"
                style={{ color: '#1b2c1a' }}
              >
                Drumul<br />
                nostru.
              </h2>

              {/* Timeline */}
              <div className="space-y-4 md:space-y-5">
                {timeline.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 md:gap-3">
                    <div
                      className="text-lg font-bold w-12 md:w-14"
                      style={{ color: '#1b2c1a' }}
                    >
                      {item.year}
                    </div>
                    <div
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: '#1b2c1a' }}
                    />
                    <h3
                      className="font-bold"
                      style={{ color: '#1b2c1a' }}
                    >
                      {item.title}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full px-6 md:px-12 py-24 md:py-32" style={{ backgroundColor: '#eee5c8' }}>
        <div className="relative max-w-4xl mx-auto text-center overflow-hidden">
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden="true"
          >
            <span
              className="text-[7rem] md:text-[11rem] font-bold leading-none"
              style={{ color: '#1b2c1a', opacity: 0.07 }}
            >
              HAI
            </span>
          </div>

          <div className="relative z-10">
          <h2
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8"
            style={{ color: '#1b2c1a' }}
          >
            Lucrăm<br />
            Împreună?
          </h2>
          <ContactCtaDialog />
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <div className="h-16" style={{ backgroundColor: '#eee5c8' }} />
    </main>
  )
}
