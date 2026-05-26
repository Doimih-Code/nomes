import { NextRequest, NextResponse } from 'next/server'
import { verifyCourseAccessToken } from '@/lib/course-access'
import { getCourseMaterialsUrl, isCourseKey } from '@/lib/stripe-course-config'

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token')
  const course = request.nextUrl.searchParams.get('course')

  if (!token || !course || !isCourseKey(course)) {
    return NextResponse.json({ error: 'Link de acces invalid' }, { status: 400 })
  }

  let payload
  try {
    payload = verifyCourseAccessToken(token)
  } catch (error) {
    console.error('Course access token validation failed', error)
    return NextResponse.json({ error: 'Link de acces expirat sau invalid' }, { status: 400 })
  }

  if (payload.courseKey !== course) {
    return NextResponse.json({ error: 'Linkul nu corespunde cursului' }, { status: 400 })
  }

  const materialsUrl = getCourseMaterialsUrl(course)
  if (!materialsUrl) {
    return NextResponse.json({ error: 'Materialele nu sunt configurate momentan' }, { status: 503 })
  }

  return NextResponse.redirect(materialsUrl, 302)
}
