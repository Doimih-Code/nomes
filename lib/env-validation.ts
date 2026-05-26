type ValidationOptions = {
  requireStripe?: boolean
  requireEmail?: boolean
  requireRecaptcha?: boolean
  requireCourseAccess?: boolean
}

type ValidationResult = {
  isProduction: boolean
}

const TRUE_FALSE_VALUES = new Set(['true', 'false'])

function getMissingOrEmpty(value: string | undefined): boolean {
  return !value || value.trim().length === 0
}

function checkBooleanEnv(errors: string[], name: string, value: string | undefined) {
  if (getMissingOrEmpty(value)) {
    return
  }

  const normalized = value.trim().toLowerCase()
  if (!TRUE_FALSE_VALUES.has(normalized)) {
    errors.push(`${name} must be "true" or "false"`)
  }
}

function checkNumberRangeEnv(
  errors: string[],
  name: string,
  value: string | undefined,
  min: number,
  max: number
) {
  if (getMissingOrEmpty(value)) {
    return
  }

  const parsed = Number(value)
  if (!Number.isFinite(parsed) || parsed < min || parsed > max) {
    errors.push(`${name} must be a number between ${min} and ${max}`)
  }
}

function required(errors: string[], name: string, value: string | undefined) {
  if (getMissingOrEmpty(value)) {
    errors.push(`${name} is required`)
  }
}

function requirePrefix(errors: string[], name: string, value: string | undefined, prefix: string) {
  if (getMissingOrEmpty(value)) {
    return
  }

  if (!value!.startsWith(prefix)) {
    errors.push(`${name} must start with ${prefix}`)
  }
}

function requireHttpsUrl(errors: string[], name: string, value: string | undefined) {
  if (getMissingOrEmpty(value)) {
    return
  }

  try {
    const parsed = new URL(value!)
    if (parsed.protocol !== 'https:') {
      errors.push(`${name} must use https in production`)
    }
  } catch {
    errors.push(`${name} must be a valid URL`)
  }
}

export function validateServerEnv(options: ValidationOptions = {}): ValidationResult {
  const isProduction = process.env.NODE_ENV === 'production'

  if (!isProduction) {
    return { isProduction }
  }

  const errors: string[] = []

  required(errors, 'NEXT_PUBLIC_APP_URL', process.env.NEXT_PUBLIC_APP_URL)
  requireHttpsUrl(errors, 'NEXT_PUBLIC_APP_URL', process.env.NEXT_PUBLIC_APP_URL)

  if (options.requireStripe) {
    required(errors, 'STRIPE_SECRET_KEY', process.env.STRIPE_SECRET_KEY)
    required(errors, 'STRIPE_WEBHOOK_SECRET', process.env.STRIPE_WEBHOOK_SECRET)
    required(
      errors,
      'STRIPE_PRICE_ID_MARKETING_DIGITAL_APLICAT',
      process.env.STRIPE_PRICE_ID_MARKETING_DIGITAL_APLICAT
    )
    requirePrefix(errors, 'STRIPE_SECRET_KEY', process.env.STRIPE_SECRET_KEY, 'sk_live_')
    requirePrefix(errors, 'STRIPE_WEBHOOK_SECRET', process.env.STRIPE_WEBHOOK_SECRET, 'whsec_')
    if (process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_TEST_MODE?.trim().toLowerCase() === 'true') {
      errors.push('NEXT_PUBLIC_STRIPE_CHECKOUT_TEST_MODE must be false in production')
    }
  }

  if (options.requireEmail) {
    required(errors, 'SMTP_HOST', process.env.SMTP_HOST)
    required(errors, 'SMTP_PORT', process.env.SMTP_PORT)
    required(errors, 'SMTP_SECURE', process.env.SMTP_SECURE)
    required(errors, 'SMTP_USER', process.env.SMTP_USER)
    required(errors, 'SMTP_PASSWORD', process.env.SMTP_PASSWORD)
    required(errors, 'EMAIL_FROM', process.env.EMAIL_FROM)
    required(errors, 'CONTACT_RECIPIENT_EMAIL', process.env.CONTACT_RECIPIENT_EMAIL)
    checkBooleanEnv(errors, 'SMTP_SECURE', process.env.SMTP_SECURE)
  }

  if (options.requireRecaptcha) {
    required(errors, 'NEXT_PUBLIC_RECAPTCHA_SITE_KEY', process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)
    required(errors, 'RECAPTCHA_SECRET_KEY', process.env.RECAPTCHA_SECRET_KEY)
    checkNumberRangeEnv(errors, 'RECAPTCHA_THRESHOLD', process.env.RECAPTCHA_THRESHOLD, 0, 1)
  }

  if (options.requireCourseAccess) {
    required(errors, 'COURSE_ACCESS_TOKEN_SECRET', process.env.COURSE_ACCESS_TOKEN_SECRET)
    required(
      errors,
      'COURSE_MATERIALS_URL_MARKETING_DIGITAL_APLICAT',
      process.env.COURSE_MATERIALS_URL_MARKETING_DIGITAL_APLICAT
    )
  }

  if (errors.length > 0) {
    throw new Error(`Invalid production env configuration:\n- ${errors.join('\n- ')}`)
  }

  return { isProduction }
}
