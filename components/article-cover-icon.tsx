import type { ArticleCoverIcon } from '@/lib/articles-data'

interface ArticleCoverIconProps {
  icon: ArticleCoverIcon
  className?: string
}

const STROKE = '#b4a35d'
const FILL = '#eee5c8'
const RED = '#c94c4c'

export default function ArticleCoverIconGraphic({ icon, className }: ArticleCoverIconProps) {
  switch (icon) {
    case 'podcast':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <rect x="35" y="45" width="150" height="105" rx="14" stroke={FILL} strokeWidth="2" opacity="0.9" />
          <path d="M75 150 L75 180 L100 150 Z" stroke={FILL} strokeWidth="2" strokeLinejoin="round" opacity="0.9" />
          <line x1="65" y1="80" x2="65" y2="115" stroke={FILL} strokeWidth="6" strokeLinecap="round" opacity="0.9" />
          <line x1="95" y1="70" x2="95" y2="125" stroke={FILL} strokeWidth="6" strokeLinecap="round" opacity="0.9" />
          <line x1="125" y1="62" x2="125" y2="133" stroke={RED} strokeWidth="6" strokeLinecap="round" opacity="0.95" />
          <line x1="155" y1="80" x2="155" y2="115" stroke={FILL} strokeWidth="6" strokeLinecap="round" opacity="0.9" />
        </svg>
      )

    case 'shapes':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <rect x="35" y="35" width="65" height="65" rx="10" fill={STROKE} opacity="0.85" />
          <rect x="120" y="35" width="65" height="65" rx="10" stroke={STROKE} strokeWidth="2" opacity="0.85" />
          <rect x="35" y="120" width="65" height="65" rx="10" stroke={STROKE} strokeWidth="2" opacity="0.85" />
          <circle cx="152" cy="152" r="33" fill={RED} opacity="0.95" />
        </svg>
      )

    case 'cycle':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <path d="M110 28 A82 82 0 0 0 110 192" stroke={RED} strokeWidth="2.5" opacity="0.9" />
          <path d="M110 28 A82 82 0 0 1 110 192" stroke={STROKE} strokeWidth="2.5" opacity="0.9" />
          <path d="M95 15 L110 28 L91 36" stroke={RED} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
          <path d="M125 205 L110 192 L129 184" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        </svg>
      )

    case 'curve':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <path d="M45 155 Q110 55 175 130" stroke={STROKE} strokeWidth="2" opacity="0.85" />
          <circle cx="45" cy="155" r="7" stroke={STROKE} strokeWidth="2" opacity="0.85" />
          <circle cx="110" cy="83" r="7" stroke={STROKE} strokeWidth="2" opacity="0.85" />
          <circle cx="175" cy="130" r="9" fill={RED} opacity="0.95" />
        </svg>
      )

    case 'ring':
      return (
        <svg viewBox="0 0 220 260" fill="none" className={className} aria-hidden="true">
          <circle cx="110" cy="42" r="36" stroke={FILL} strokeWidth="2.5" opacity="0.9" />
          <rect x="42" y="170" width="26" height="50" stroke={RED} strokeWidth="2.5" opacity="0.9" />
          <rect x="82" y="140" width="26" height="80" stroke={RED} strokeWidth="2.5" opacity="0.9" />
          <rect x="122" y="110" width="26" height="110" stroke={RED} strokeWidth="2.5" opacity="0.9" />
          <rect x="162" y="90" width="26" height="130" stroke={RED} strokeWidth="2.5" opacity="0.9" />
        </svg>
      )

    case 'growth':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <rect x="45" y="140" width="24" height="40" stroke={RED} strokeWidth="2" opacity="0.9" />
          <rect x="85" y="115" width="24" height="65" stroke={RED} strokeWidth="2" opacity="0.9" />
          <rect x="125" y="90" width="24" height="90" stroke={RED} strokeWidth="2" opacity="0.9" />
          <rect x="165" y="65" width="24" height="115" stroke={RED} strokeWidth="2" opacity="0.9" />
          <path d="M42 90 L183 32" stroke={FILL} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
          <path d="M153 32 L183 32 L183 62" stroke={FILL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        </svg>
      )

    case 'converge':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <circle cx="159" cy="104" r="45" stroke={FILL} strokeWidth="3" opacity="0.9" />
          <line x1="9" y1="29" x2="159" y2="104" stroke={RED} strokeWidth="3" strokeLinecap="round" opacity="0.9" />
          <line x1="9" y1="104" x2="159" y2="104" stroke={RED} strokeWidth="3" strokeLinecap="round" opacity="0.9" />
          <line x1="9" y1="179" x2="159" y2="104" stroke={RED} strokeWidth="3" strokeLinecap="round" opacity="0.9" />
          <circle cx="9" cy="29" r="9" fill={RED} opacity="0.9" />
          <circle cx="9" cy="104" r="9" fill={RED} opacity="0.9" />
          <circle cx="9" cy="179" r="9" fill={RED} opacity="0.9" />
        </svg>
      )

    case 'funnel':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <path d="M20 40 L200 40 L137 85 L83 85 Z" stroke={RED} strokeWidth="2.5" strokeLinejoin="round" opacity="0.9" />
          <path d="M83 93 L137 93 L123 123 L97 123 Z" stroke={RED} strokeWidth="2.5" strokeLinejoin="round" opacity="0.9" />
          <path d="M97 131 L123 131 L116 150 L104 150 Z" stroke={RED} strokeWidth="2.5" strokeLinejoin="round" opacity="0.9" />
          <line x1="110" y1="158" x2="110" y2="178" stroke={FILL} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
          <path d="M99 169 L110 180 L121 169" stroke={FILL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        </svg>
      )

    case 'retarget':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <path d="M85 42 A72 72 0 1 1 48 74" stroke={RED} strokeWidth="3" strokeLinecap="round" opacity="0.9" />
          <path d="M68 46 L122 16 L98 66 Z" fill={RED} opacity="0.95" />
          <circle cx="110" cy="110" r="16" fill={FILL} opacity="0.95" />
        </svg>
      )

    case 'gauge':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <path d="M15 130 A95 95 0 0 1 177 63" stroke={RED} strokeWidth="5.5" strokeLinecap="round" opacity="0.9" />
          <path d="M177 63 A95 95 0 0 1 205 130" stroke={STROKE} strokeWidth="5.5" strokeLinecap="round" opacity="0.9" />
          <line x1="110" y1="130" x2="174.9" y2="65.1" stroke={FILL} strokeWidth="3" strokeLinecap="round" opacity="0.9" />
          <circle cx="110" cy="130" r="12" fill={FILL} opacity="0.95" />
        </svg>
      )

    case 'calendar':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <rect x="12" y="35" width="196" height="161" rx="10" stroke={FILL} strokeWidth="2.5" opacity="0.9" />
          <line x1="12" y1="84" x2="208" y2="84" stroke={FILL} strokeWidth="2.5" opacity="0.9" />
          <line x1="61" y1="12" x2="61" y2="49" stroke={FILL} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
          <line x1="159" y1="12" x2="159" y2="49" stroke={FILL} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
          <circle cx="61" cy="126" r="10" stroke={FILL} strokeWidth="2.5" opacity="0.9" />
          <circle cx="110" cy="126" r="10" fill={RED} opacity="0.95" />
          <circle cx="159" cy="126" r="10" stroke={FILL} strokeWidth="2.5" opacity="0.9" />
          <circle cx="61" cy="161" r="10" stroke={FILL} strokeWidth="2.5" opacity="0.9" />
          <circle cx="110" cy="161" r="10" stroke={FILL} strokeWidth="2.5" opacity="0.9" />
        </svg>
      )

    case 'bars':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <rect x="42" y="150" width="16" height="45" fill={FILL} opacity="0.9" />
          <rect x="76" y="90" width="16" height="105" fill={FILL} opacity="0.9" />
          <rect x="110" y="125" width="16" height="70" fill={FILL} opacity="0.9" />
          <rect x="144" y="65" width="16" height="130" fill={RED} opacity="0.95" />
          <rect x="190" y="115" width="16" height="80" fill={FILL} opacity="0.9" />
          <line x1="30" y1="195" x2="210" y2="195" stroke={FILL} strokeWidth="3" opacity="0.9" />
        </svg>
      )

    case 'play-growth':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <rect x="45" y="115" width="24" height="30" stroke={FILL} strokeWidth="2" opacity="0.9" />
          <rect x="85" y="95" width="24" height="50" stroke={FILL} strokeWidth="2" opacity="0.9" />
          <rect x="125" y="70" width="24" height="75" stroke={FILL} strokeWidth="2" opacity="0.9" />
          <rect x="165" y="45" width="24" height="100" stroke={FILL} strokeWidth="2" opacity="0.9" />
          <circle cx="160" cy="60" r="60" stroke={RED} strokeWidth="5" opacity="0.95" />
          <path d="M144 36 L190 60 L144 84 Z" fill={RED} opacity="0.95" />
        </svg>
      )

    case 'chat':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <path d="M45 45 H140 A10 10 0 0 1 150 55 V90 A10 10 0 0 1 140 100 H90 L65 118 V100 H55 A10 10 0 0 1 45 90 Z" stroke={FILL} strokeWidth="2" strokeLinejoin="round" opacity="0.9" />
          <path d="M100 115 H165 A10 10 0 0 1 175 125 V135 L193 145 L175 155 A10 10 0 0 1 165 165 H100 A10 10 0 0 1 90 155 V125 A10 10 0 0 1 100 115 Z" stroke={RED} strokeWidth="2" strokeLinejoin="round" opacity="0.9" />
        </svg>
      )

    case 'hashtag':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <line x1="40" y1="-20" x2="0" y2="240" stroke={FILL} strokeWidth="4" strokeLinecap="round" opacity="0.9" />
          <line x1="200" y1="-20" x2="160" y2="240" stroke={FILL} strokeWidth="4" strokeLinecap="round" opacity="0.9" />
          <line x1="-30" y1="60" x2="270" y2="60" stroke={RED} strokeWidth="6" strokeLinecap="round" opacity="0.95" />
          <line x1="-50" y1="160" x2="250" y2="160" stroke={FILL} strokeWidth="4" strokeLinecap="round" opacity="0.9" />
        </svg>
      )

    case 'checklist':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <rect x="32" y="40" width="48" height="48" rx="10" stroke={STROKE} strokeWidth="2.5" opacity="0.9" />
          <path d="M45 64 L55 75 L70 55" stroke={RED} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
          <line x1="100" y1="64" x2="190" y2="64" stroke={STROKE} strokeWidth="9" strokeLinecap="round" opacity="0.6" />
          <rect x="32" y="104" width="48" height="48" rx="10" stroke={STROKE} strokeWidth="2.5" opacity="0.9" />
          <path d="M45 128 L55 139 L70 119" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
          <line x1="100" y1="128" x2="190" y2="128" stroke={STROKE} strokeWidth="9" strokeLinecap="round" opacity="0.6" />
          <rect x="32" y="168" width="48" height="48" rx="10" stroke={STROKE} strokeWidth="2.5" opacity="0.9" />
          <path d="M45 192 L55 203 L70 183" stroke={STROKE} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
          <line x1="100" y1="192" x2="190" y2="192" stroke={STROKE} strokeWidth="9" strokeLinecap="round" opacity="0.6" />
        </svg>
      )

    case 'network':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <line x1="110" y1="15" x2="20" y2="90" stroke={FILL} strokeWidth="2.5" opacity="0.8" />
          <line x1="110" y1="15" x2="200" y2="90" stroke={FILL} strokeWidth="2.5" opacity="0.8" />
          <line x1="110" y1="15" x2="110" y2="205" stroke={FILL} strokeWidth="2.5" opacity="0.8" />
          <line x1="20" y1="90" x2="110" y2="205" stroke={FILL} strokeWidth="2.5" opacity="0.8" />
          <line x1="200" y1="90" x2="110" y2="205" stroke={FILL} strokeWidth="2.5" opacity="0.8" />
          <circle cx="110" cy="15" r="16" stroke={FILL} strokeWidth="2.5" fill="#1b2c1a" opacity="0.95" />
          <circle cx="20" cy="90" r="16" stroke={FILL} strokeWidth="2.5" fill="#1b2c1a" opacity="0.95" />
          <circle cx="200" cy="90" r="16" stroke={FILL} strokeWidth="2.5" fill="#1b2c1a" opacity="0.95" />
          <circle cx="110" cy="205" r="16" stroke={RED} strokeWidth="3" fill="#1b2c1a" opacity="0.95" />
        </svg>
      )

    case 'chart-axis':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <polyline points="25,20 25,195 200,195" stroke={STROKE} strokeWidth="2.5" opacity="0.7" />
          <polyline
            points="37,161 83,121 118,148 159,67 188,27"
            stroke={STROKE}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.85"
          />
          <circle cx="37" cy="161" r="8" fill={STROKE} opacity="0.85" />
          <circle cx="83" cy="121" r="8" fill={STROKE} opacity="0.85" />
          <circle cx="118" cy="148" r="8" fill={STROKE} opacity="0.85" />
          <circle cx="159" cy="67" r="8" fill={STROKE} opacity="0.85" />
          <circle cx="188" cy="27" r="9" fill={RED} opacity="0.95" />
        </svg>
      )

    case 'format-compare':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <rect x="32" y="45" width="44" height="100" rx="14" stroke={FILL} strokeWidth="2" opacity="0.9" />
          <rect x="88" y="45" width="44" height="100" rx="14" stroke={FILL} strokeWidth="2" opacity="0.9" />
          <path d="M100 70 L100 120 L126 95 Z" fill={RED} opacity="0.95" />
          <rect x="144" y="45" width="44" height="100" rx="14" stroke={FILL} strokeWidth="2" opacity="0.9" />
        </svg>
      )

    case 'video-play':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <rect x="20" y="55" width="180" height="110" rx="14" stroke={FILL} strokeWidth="2" opacity="0.9" />
          <path d="M92 82 L92 138 L142 110 Z" fill={RED} opacity="0.95" />
        </svg>
      )

    case 'clapperboard':
      return (
        <svg viewBox="0 0 220 220" fill="none" className={className} aria-hidden="true">
          <rect x="50" y="90" width="120" height="85" rx="8" stroke={FILL} strokeWidth="2" opacity="0.9" />
          <path d="M50 90 L60 55 L180 65 L170 90 Z" stroke={FILL} strokeWidth="2" strokeLinejoin="round" opacity="0.9" />
          <line x1="80" y1="58" x2="70" y2="90" stroke={FILL} strokeWidth="2" opacity="0.9" />
          <line x1="110" y1="60" x2="100" y2="90" stroke={FILL} strokeWidth="2" opacity="0.9" />
          <line x1="140" y1="63" x2="130" y2="90" stroke={FILL} strokeWidth="2" opacity="0.9" />
          <path d="M92 115 L92 155 L128 135 Z" fill={RED} opacity="0.95" />
        </svg>
      )

    case 'orbit':
    default:
      return (
        <svg
          viewBox="0 0 220 220"
          fill="none"
          className={className}
          aria-hidden="true"
        >
          <circle cx="110" cy="110" r="105" stroke={STROKE} strokeWidth="2" opacity="0.85" />
          <circle cx="110" cy="110" r="65" stroke={STROKE} strokeWidth="2" opacity="0.85" />
          <circle cx="110" cy="110" r="22" stroke={STROKE} strokeWidth="2" opacity="0.85" />
          <circle cx="187" cy="74" r="13" fill={RED} opacity="0.95" />
        </svg>
      )
  }
}
