export type CourseKey = 'marketing-digital-aplicat-workshop'

type CourseCheckoutConfig = {
  displayName: string
  priceEnvVar: string
  materialsUrlEnvVar: string
}

const COURSE_CHECKOUT_CONFIG: Record<CourseKey, CourseCheckoutConfig> = {
  'marketing-digital-aplicat-workshop': {
    displayName: 'Marketing Digital Aplicat',
    priceEnvVar: 'STRIPE_PRICE_ID_MARKETING_DIGITAL_APLICAT',
    materialsUrlEnvVar: 'COURSE_MATERIALS_URL_MARKETING_DIGITAL_APLICAT',
  },
}

export function isCourseKey(value: unknown): value is CourseKey {
  return typeof value === 'string' && value in COURSE_CHECKOUT_CONFIG
}

export function getCourseCheckoutConfig(courseKey: CourseKey): CourseCheckoutConfig {
  return COURSE_CHECKOUT_CONFIG[courseKey]
}

export function getCourseMaterialsUrl(courseKey: CourseKey): string | null {
  const value = process.env[getCourseCheckoutConfig(courseKey).materialsUrlEnvVar]
  return value?.trim() ? value.trim() : null
}
