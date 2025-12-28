'use client';

import { useState, FormEvent } from 'react';

interface NewsletterFormProps {
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
}

export function NewsletterForm({ variant = 'default', className = '' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Berhasil subscribe!');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Gagal subscribe');
      }
    } catch {
      setStatus('error');
      setMessage('Terjadi kesalahan');
    }
  };

  // Compact variant for footer
  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className={`${className}`}>
        <div className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Anda"
            className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2 text-sm text-white placeholder-neutral-500 outline-none focus:border-blue-500"
            required
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            disabled={status === 'loading'}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
          >
            {status === 'loading' ? '...' : 'Subscribe'}
          </button>
        </div>
        {status !== 'idle' && (
          <p className={`mt-2 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
      </form>
    );
  }

  // Inline variant for header/sidebar
  if (variant === 'inline') {
    return (
      <form onSubmit={handleSubmit} className={`flex items-center gap-2 ${className}`}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-40 rounded-lg border border-neutral-700 bg-neutral-800 px-3 py-1.5 text-sm text-white placeholder-neutral-500 outline-none focus:border-blue-500"
          required
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50"
        >
          →
        </button>
      </form>
    );
  }

  // Default variant - full card
  return (
    <div className={`rounded-xl border border-neutral-800 bg-gradient-to-br from-neutral-900 to-neutral-950 p-6 ${className}`}>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600">
          <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-white">Newsletter</h3>
          <p className="text-sm text-neutral-400">Dapatkan artikel terbaru</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukkan email Anda"
          className="mb-3 w-full rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-3 text-white placeholder-neutral-500 outline-none focus:border-blue-500"
          required
          disabled={status === 'loading'}
        />

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-500 disabled:opacity-50"
        >
          {status === 'loading' ? 'Memproses...' : 'Subscribe Gratis'}
        </button>

        {status !== 'idle' && (
          <p className={`mt-3 text-center text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}

        <p className="mt-3 text-center text-xs text-neutral-500">
          Tidak ada spam. Unsubscribe kapan saja.
        </p>
      </form>
    </div>
  );
}

/**
 * Newsletter section for homepage
 */
export function NewsletterSection() {
  return (
    <section className="py-12">
      <div className="mx-auto max-w-xl">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-white">Jangan Ketinggalan</h2>
          <p className="mt-2 text-neutral-400">
            Artikel teknologi terbaru langsung ke inbox Anda
          </p>
        </div>
        <NewsletterForm />
      </div>
    </section>
  );
}
