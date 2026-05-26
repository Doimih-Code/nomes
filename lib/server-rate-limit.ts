type RateLimitOptions = {
  key: string
  windowMs: number
  maxRequests: number
}

type RateLimitEntry = {
  count: number
  resetAt: number
}

const STORE = new Map<string, RateLimitEntry>()

function now() {
  return Date.now()
}

export function checkRateLimit(options: RateLimitOptions) {
  const currentTime = now()
  const existing = STORE.get(options.key)

  if (!existing || existing.resetAt <= currentTime) {
    const resetAt = currentTime + options.windowMs
    STORE.set(options.key, { count: 1, resetAt })

    return {
      allowed: true,
      remaining: options.maxRequests - 1,
      resetAt,
    }
  }

  if (existing.count >= options.maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: existing.resetAt,
    }
  }

  existing.count += 1
  STORE.set(options.key, existing)

  return {
    allowed: true,
    remaining: options.maxRequests - existing.count,
    resetAt: existing.resetAt,
  }
}
