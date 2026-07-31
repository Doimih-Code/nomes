export type ValueIconType = 'target' | 'medal' | 'lightbulb' | 'rings'

interface ValueIconProps {
  icon: ValueIconType
  className?: string
}

const FILL = '#eee5c8'
const RED = '#c94c4c'

export default function ValueIconGraphic({ icon, className }: ValueIconProps) {
  switch (icon) {
    case 'target':
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
          <circle cx="50" cy="50" r="36" stroke={FILL} strokeWidth="5" opacity="0.9" />
          <circle cx="50" cy="50" r="23" stroke={RED} strokeWidth="5" opacity="0.95" />
          <circle cx="50" cy="50" r="10" stroke={FILL} strokeWidth="5" opacity="0.9" />
        </svg>
      )

    case 'medal':
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
          <line x1="42" y1="56" x2="30" y2="84" stroke={FILL} strokeWidth="5" strokeLinecap="round" opacity="0.9" />
          <line x1="58" y1="56" x2="70" y2="84" stroke={FILL} strokeWidth="5" strokeLinecap="round" opacity="0.9" />
          <circle cx="50" cy="38" r="22" stroke={FILL} strokeWidth="5" opacity="0.9" />
          <path
            d="M50 27 L53.5 34.5 L61.5 35.6 L55.7 41.2 L57.1 49.2 L50 45.4 L42.9 49.2 L44.3 41.2 L38.5 35.6 L46.5 34.5 Z"
            fill={RED}
            opacity="0.95"
          />
        </svg>
      )

    case 'lightbulb':
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
          <line x1="50" y1="12" x2="50" y2="20" stroke={FILL} strokeWidth="5" strokeLinecap="round" opacity="0.9" />
          <line x1="30" y1="19" x2="35" y2="26" stroke={FILL} strokeWidth="5" strokeLinecap="round" opacity="0.9" />
          <line x1="70" y1="19" x2="65" y2="26" stroke={FILL} strokeWidth="5" strokeLinecap="round" opacity="0.9" />
          <circle cx="50" cy="46" r="21" stroke={FILL} strokeWidth="5" opacity="0.9" />
          <line x1="41" y1="70" x2="59" y2="70" stroke={FILL} strokeWidth="5" strokeLinecap="round" opacity="0.9" />
          <line x1="43" y1="79" x2="57" y2="79" stroke={FILL} strokeWidth="5" strokeLinecap="round" opacity="0.9" />
          <path d="M40 46 L47 54 L61 36" stroke={RED} strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.95" />
        </svg>
      )

    case 'rings':
    default:
      return (
        <svg viewBox="0 0 100 100" fill="none" className={className} aria-hidden="true">
          <circle cx="39" cy="50" r="22" stroke={FILL} strokeWidth="5" opacity="0.9" />
          <circle cx="61" cy="50" r="22" stroke={RED} strokeWidth="5" opacity="0.95" />
        </svg>
      )
  }
}
