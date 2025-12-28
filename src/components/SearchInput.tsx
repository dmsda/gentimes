'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

/**
 * SearchInput - Simple search input for search page
 */
export function SearchInput({ 
  placeholder = 'Search articles...',
  className = ''
}: { 
  placeholder?: string;
  className?: string;
}) {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className} role="search">
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-lg border border-neutral-700 bg-neutral-800 py-3 pl-11 pr-4 text-base text-white placeholder-neutral-500 outline-none focus:border-blue-500"
        />
        <svg 
          className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
    </form>
  );
}

/**
 * SearchModal - Simple search modal
 */
export function SearchModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      router.push(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      setIsOpen(false);
      setQuery('');
    }
  };

  return (
    <>
      {/* Search Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-10 w-10 items-center justify-center text-neutral-400 transition-colors hover:text-white"
        aria-label="Search"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>

      {/* Search Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-neutral-900/95 p-4 pt-20">
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-white"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Search Form */}
          <div className="mx-auto max-w-xl">
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                autoFocus
                className="w-full rounded-xl border border-neutral-700 bg-neutral-800 px-5 py-4 text-lg text-white placeholder-neutral-500 outline-none focus:border-blue-500"
              />
            </form>
            <p className="mt-4 text-center text-sm text-neutral-500">
              Press Enter to search
            </p>
          </div>
        </div>
      )}
    </>
  );
}
