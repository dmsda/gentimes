'use client';

import Link from 'next/link';

export function OfflineContent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-4 text-center">
      {/* Icon */}
      <div className="mb-6 rounded-full bg-neutral-800 p-6">
        <svg className="h-16 w-16 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
        </svg>
      </div>

      {/* Message */}
      <h1 className="mb-2 text-3xl font-bold text-white">Anda Offline</h1>
      <p className="mb-8 max-w-md text-neutral-400">
        Sepertinya Anda tidak terhubung ke internet. Silakan periksa koneksi Anda dan coba lagi.
      </p>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-500"
        >
          Coba Lagi
        </button>
        <Link
          href="/"
          className="rounded-lg border border-neutral-700 px-6 py-3 font-medium text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
        >
          Kembali ke Beranda
        </Link>
      </div>

      {/* Tip */}
      <p className="mt-12 text-sm text-neutral-600">
        Tip: Halaman yang sudah dikunjungi sebelumnya mungkin tersedia offline
      </p>
    </div>
  );
}
