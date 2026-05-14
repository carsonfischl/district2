import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

const AUTH_SECRET = process.env.AUTH_SECRET ?? 'change-me'
const SITE_PASSWORD = process.env.SITE_PASSWORD ?? ''

function computeToken(password: string): string {
  return createHmac('sha256', AUTH_SECRET).update(password).digest('hex')
}

export async function POST(req: NextRequest) {
  if (!SITE_PASSWORD) {
    return NextResponse.json({ error: 'No password configured on server.' }, { status: 500 })
  }

  const { password } = await req.json()

  if (password !== SITE_PASSWORD) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 })
  }

  const token = computeToken(password)
  const res = NextResponse.json({ success: true })

  res.cookies.set('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/',
  })

  return res
}
