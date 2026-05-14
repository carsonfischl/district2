import { promises as fs } from 'fs'
import path from 'path'
import Link from 'next/link'
import LogoutButton from '@/components/LogoutButton'

async function getSubscribers(): Promise<string[]> {
  try {
    const content = await fs.readFile(
      path.join(process.cwd(), 'data', 'subscribers.json'),
      'utf-8'
    )
    return JSON.parse(content)
  } catch {
    return []
  }
}

export default async function AdminPage() {
  const subscribers = await getSubscribers()

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 py-6">
        <div className="max-w-3xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="text-gray-400 hover:text-gray-600 transition-colors text-sm">
              ← Home
            </Link>
            <span className="text-gray-200">|</span>
            <h1 className="text-lg font-semibold text-gray-900">Admin</h1>
          </div>
          <LogoutButton />
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-12 space-y-12">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-1">
            Subscribers
            <span className="ml-2 text-base font-normal text-gray-400">({subscribers.length})</span>
          </h2>
          <p className="text-sm text-gray-400 mb-5">
            Emails collected via the subscribe form on the home page.
          </p>

          {subscribers.length === 0 ? (
            <p className="text-gray-400 text-sm">No subscribers yet.</p>
          ) : (
            <div className="border border-gray-200 rounded-lg divide-y divide-gray-100 overflow-hidden">
              {subscribers.map((email) => (
                <div key={email} className="px-5 py-3 text-sm text-gray-700 font-mono">
                  {email}
                </div>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Adding Newsletters</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-sm text-gray-600 space-y-3">
            <p>
              1. Place the PDF file in{' '}
              <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">public/newsletters/</code>
            </p>
            <p>
              2. Add an entry to{' '}
              <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">data/newsletters.ts</code>
            </p>
            <p>3. The newest newsletter should be first in the array.</p>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Password Protection</h2>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-sm text-gray-600 space-y-3">
            <p>
              Set <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">SITE_PASSWORD</code> in{' '}
              <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">.env.local</code> to enable
              password protection.
            </p>
            <p>
              Add paths to <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">PROTECTED_PATHS</code>{' '}
              (comma-separated) to protect additional pages. Example:{' '}
              <code className="bg-gray-200 px-1.5 py-0.5 rounded text-xs font-mono">PROTECTED_PATHS=/admin,/members</code>
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
