import { NextRequest, NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'

const FILE = path.join(process.cwd(), 'data', 'subscribers.json')

async function read(): Promise<string[]> {
  try {
    return JSON.parse(await fs.readFile(FILE, 'utf-8'))
  } catch {
    return []
  }
}

async function write(emails: string[]): Promise<void> {
  await fs.writeFile(FILE, JSON.stringify(emails, null, 2))
}

export async function POST(req: NextRequest) {
  const { email } = await req.json()

  if (!email || typeof email !== 'string' || !email.includes('@')) {
    return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 })
  }

  const normalized = email.trim().toLowerCase()
  const subscribers = await read()

  if (subscribers.includes(normalized)) {
    return NextResponse.json({ message: "You're already subscribed!" })
  }

  subscribers.push(normalized)
  await write(subscribers)

  return NextResponse.json({ message: "Thanks for subscribing! We'll be in touch." })
}
