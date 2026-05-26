import { createHmac, timingSafeEqual } from 'crypto'
import { CourseKey } from '@/lib/stripe-course-config'

type AccessTokenPayload = {
  sessionId: string
  email: string
  courseKey: CourseKey
  exp: number
}

type CreateTokenInput = {
  sessionId: string
  email: string
  courseKey: CourseKey
  ttlHours?: number
}

function getTokenSecret(): string {
  const secret = process.env.COURSE_ACCESS_TOKEN_SECRET
  if (!secret) {
    throw new Error('COURSE_ACCESS_TOKEN_SECRET is not configured')
  }
  return secret
}

function base64UrlEncode(input: string): string {
  return Buffer.from(input, 'utf8').toString('base64url')
}

function base64UrlDecode(input: string): string {
  return Buffer.from(input, 'base64url').toString('utf8')
}

function sign(payloadBase64: string): string {
  return createHmac('sha256', getTokenSecret()).update(payloadBase64).digest('base64url')
}

function parseTtlHours(): number {
  const raw = process.env.COURSE_ACCESS_LINK_TTL_HOURS
  const fallback = 72

  if (!raw) {
    return fallback
  }

  const parsed = Number(raw)
  if (!Number.isFinite(parsed) || parsed <= 0 || parsed > 720) {
    return fallback
  }

  return parsed
}

export function createCourseAccessToken(input: CreateTokenInput): string {
  const ttlHours = input.ttlHours ?? parseTtlHours()
  const exp = Math.floor(Date.now() / 1000) + Math.floor(ttlHours * 3600)

  const payload: AccessTokenPayload = {
    sessionId: input.sessionId,
    email: input.email,
    courseKey: input.courseKey,
    exp,
  }

  const payloadBase64 = base64UrlEncode(JSON.stringify(payload))
  const signature = sign(payloadBase64)
  return `${payloadBase64}.${signature}`
}

export function verifyCourseAccessToken(token: string): AccessTokenPayload {
  const [payloadBase64, signature] = token.split('.')

  if (!payloadBase64 || !signature) {
    throw new Error('Malformed access token')
  }

  const expected = sign(payloadBase64)
  const sigBuffer = Buffer.from(signature, 'base64url')
  const expBuffer = Buffer.from(expected, 'base64url')

  if (sigBuffer.length !== expBuffer.length || !timingSafeEqual(sigBuffer, expBuffer)) {
    throw new Error('Invalid access token signature')
  }

  let payload: AccessTokenPayload
  try {
    payload = JSON.parse(base64UrlDecode(payloadBase64)) as AccessTokenPayload
  } catch {
    throw new Error('Invalid access token payload')
  }

  if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
    throw new Error('Access token expired')
  }

  if (!payload.courseKey || !payload.sessionId || !payload.email) {
    throw new Error('Access token payload is missing required fields')
  }

  return payload
}

export function createCourseAccessLink(params: {
  appUrl: string
  token: string
  courseKey: CourseKey
}): string {
  const baseUrl = params.appUrl.replace(/\/$/, '')
  const url = new URL('/api/cursuri/access', baseUrl)
  url.searchParams.set('token', params.token)
  url.searchParams.set('course', params.courseKey)
  return url.toString()
}
