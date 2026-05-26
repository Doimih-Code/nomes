/**
 * Google reCAPTCHA v3 Configuration
 * Used for protecting contact form from bots
 */

export const recaptchaConfig = {
  // Public site key (safe to expose in frontend)
  siteKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '',
  
  // Secret key (server-side only, never expose)
  secretKey: process.env.RECAPTCHA_SECRET_KEY || '',
  
  // Score threshold (0.0 = likely bot, 1.0 = likely human)
  threshold: parseFloat(process.env.RECAPTCHA_THRESHOLD || '0.5'),
  
  // Verification endpoint
  verifyUrl: 'https://www.google.com/recaptcha/api/siteverify',
}

function getThreshold(): number {
  const value = Number(process.env.RECAPTCHA_THRESHOLD || '0.5')
  if (!Number.isFinite(value) || value < 0 || value > 1) {
    return 0.5
  }
  return value
}

/**
 * Verify reCAPTCHA token on server side
 * @param token - reCAPTCHA token from frontend
 * @returns { success: boolean, score: number }
 */
export async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  if (!token || !token.trim()) {
    return { success: false, score: 0 }
  }

  if (!recaptchaConfig.secretKey) {
    throw new Error('RECAPTCHA_SECRET_KEY is not configured')
  }

  try {
    const body = new URLSearchParams({
      secret: recaptchaConfig.secretKey,
      response: token,
    })

    const response = await fetch(recaptchaConfig.verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })

    if (!response.ok) {
      console.error('reCAPTCHA verification HTTP error:', response.status)
      return { success: false, score: 0 }
    }

    const data = await response.json()

    if (!data.success) {
      console.error('reCAPTCHA verification failed:', data['error-codes'])
      return { success: false, score: 0 }
    }

    // Check if score meets threshold
    const isValid = Number(data.score) >= getThreshold()

    return {
      success: isValid,
      score: Number(data.score) || 0,
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return { success: false, score: 0 }
  }
}
