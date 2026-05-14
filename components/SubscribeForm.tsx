'use client'

import { useState } from 'react'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (res.ok) {
        setStatus('success')
        setMessage(data.message)
        setEmail('')
      } else {
        setStatus('error')
        setMessage(data.error || 'Something went wrong.')
      }
    } catch {
      setStatus('error')
      setMessage('Failed to subscribe. Please try again.')
    }
  }

  return (
    <div className="bg-green-50 border border-green-100 rounded-lg p-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-1">Stay Connected</h2>
      <p className="text-gray-500 text-sm mb-5">
        Subscribe to receive OHA District 2 newsletters directly in your inbox.
      </p>

      {status === 'success' ? (
        <div className="bg-green-100 text-green-800 rounded-md px-4 py-3 text-sm font-medium">
          {message}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="px-5 py-2 bg-green-700 text-white text-sm font-medium rounded-md hover:bg-green-800 transition-colors disabled:opacity-50 whitespace-nowrap"
          >
            {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
          </button>
        </form>
      )}

      {status === 'error' && (
        <p className="mt-3 text-red-600 text-sm">{message}</p>
      )}
    </div>
  )
}
