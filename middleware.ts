import { NextRequest, NextResponse } from 'next/server'

const PROTECTED_PATHS = (process.env.PROTECTED_PATHS ?? '/admin')
  .split(',')
  .map((p) => p.trim())

const AUTH_SECRET = process.env.AUTH_SECRET ?? 'change-me'
const SITE_PASSWORD = process.env.SITE_PASSWORD ?? ''

async function computeToken(password: string): Promise<string> {
  const enc = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(AUTH_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(password))
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p))

  if (!isProtected || !SITE_PASSWORD) return NextResponse.next()

  const token = request.cookies.get('auth_token')?.value
  const expected = await computeToken(SITE_PASSWORD)

  if (token === expected) return NextResponse.next()

  const loginUrl = new URL('/login', request.url)
  loginUrl.searchParams.set('redirect', pathname)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
