'use client';

import { useState } from 'react';
import Link from 'next/link';
import { categories } from '@/lib/articles';

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center text-neutral-400 transition-colors hover:text-white md:hidden"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        )}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-50 bg-neutral-900 md:hidden">
          <nav className="p-4">
            <ul className="space-y-1">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.slug}`}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-neutral-400 transition-colors hover:text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-3">
              <Link
                href="/search"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg border border-neutral-700 py-3 text-center font-medium text-white"
              >
                Search
              </Link>
              <Link
                href="/subscribe"
                onClick={() => setIsOpen(false)}
                className="block rounded-lg bg-blue-600 py-3 text-center font-medium text-white hover:bg-blue-500"
              >
                Subscribe
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
