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

/**
 * Verify reCAPTCHA token on server side
 * @param token - reCAPTCHA token from frontend
 * @returns { success: boolean, score: number }
 */
export async function verifyRecaptcha(token: string): Promise<{ success: boolean; score: number }> {
  if (!recaptchaConfig.secretKey) {
    console.warn('reCAPTCHA secret key not configured')
    return { success: false, score: 0 }
  }

  try {
    const response = await fetch(recaptchaConfig.verifyUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `secret=${recaptchaConfig.secretKey}&response=${token}`,
    })

    const data = await response.json()

    if (!data.success) {
      console.error('reCAPTCHA verification failed:', data['error-codes'])
      return { success: false, score: 0 }
    }

    // Check if score meets threshold
    const isValid = data.score >= recaptchaConfig.threshold

    return {
      success: isValid,
      score: data.score,
    }
  } catch (error) {
    console.error('reCAPTCHA verification error:', error)
    return { success: false, score: 0 }
  }
}
