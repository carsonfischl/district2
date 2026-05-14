import Accordion from '@/components/Accordion'
import SubscribeForm from '@/components/SubscribeForm'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { newsletters, otherDocs } from '@/data/newsletters'

export default function Home() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="py-6">
        <div className="max-w-3xl mx-auto px-6 flex items-center gap-4">
          <div className="w-11 h-11 bg-green-700 rounded-full flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 8z" />
            </svg>
          </div>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-gray-900 leading-tight">District 2 Ontario Horticultural Association</h1>
            <p className="text-sm text-gray-400 leading-tight">Ottawa Valley Gardeners 5a/5b</p>
          </div>
          <Link href="/login" className="text-sm font-medium text-green-700 border border-green-700 px-4 py-1.5 rounded-full hover:bg-green-700 hover:text-white transition-colors">
            Login
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto w-full px-6 pt-12 space-y-14">
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Newsletters</h2>
          <p className="text-gray-500 text-sm mb-6">
            Download past and current editions of the OHA District 2 newsletter.
          </p>
          <Accordion items={newsletters} />
        </section>

        <section>
          <Accordion items={otherDocs} />
        </section>

        <section>
          <SubscribeForm />
        </section>
      </main>

      <Footer />
    </div>
  )
}
