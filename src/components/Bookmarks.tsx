'use client';

import { useState, useEffect } from 'react';

interface BookmarkButtonProps {
  articleId: string;
  title: string;
  slug: string;
}

interface Bookmark {
  id: string;
  title: string;
  slug: string;
  savedAt: string;
}

const STORAGE_KEY = 'gentimes_bookmarks';

/**
 * Get bookmarks from localStorage
 */
function getBookmarks(): Bookmark[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

/**
 * Save bookmarks to localStorage
 */
function saveBookmarks(bookmarks: Bookmark[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
}

/**
 * Bookmark Button Component
 */
export function BookmarkButton({ articleId, title, slug }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarks = getBookmarks();
    setIsBookmarked(bookmarks.some(b => b.id === articleId));
  }, [articleId]);

  const toggleBookmark = () => {
    const bookmarks = getBookmarks();
    
    if (isBookmarked) {
      // Remove bookmark
      const updated = bookmarks.filter(b => b.id !== articleId);
      saveBookmarks(updated);
      setIsBookmarked(false);
    } else {
      // Add bookmark
      const newBookmark: Bookmark = {
        id: articleId,
        title,
        slug,
        savedAt: new Date().toISOString(),
      };
      saveBookmarks([newBookmark, ...bookmarks]);
      setIsBookmarked(true);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all ${
        isBookmarked
          ? 'border-yellow-500 bg-yellow-500/20 text-yellow-400'
          : 'border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white'
      }`}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
      title={isBookmarked ? 'Saved' : 'Save article'}
    >
      <svg className="h-5 w-5" fill={isBookmarked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    </button>
  );
}

/**
 * Bookmarks List Component
 */
export function BookmarksList() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  const removeBookmark = (id: string) => {
    const updated = bookmarks.filter(b => b.id !== id);
    saveBookmarks(updated);
    setBookmarks(updated);
  };

  if (bookmarks.length === 0) {
    return (
      <div className="text-center text-neutral-500 py-8">
        <svg className="mx-auto h-12 w-12 mb-4 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        <p>Belum ada artikel yang disimpan</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark) => (
        <div key={bookmark.id} className="flex items-center gap-4 rounded-lg bg-neutral-900/50 p-4">
          <a
            href={`/article/${bookmark.slug}`}
            className="flex-1 font-medium text-white hover:text-blue-400"
          >
            {bookmark.title}
          </a>
          <button
            onClick={() => removeBookmark(bookmark.id)}
            className="text-neutral-500 hover:text-red-400"
            aria-label="Remove bookmark"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

/**
 * Hook to get bookmark count
 */
export function useBookmarkCount(): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const updateCount = () => {
      setCount(getBookmarks().length);
    };

    updateCount();
    window.addEventListener('storage', updateCount);
    return () => window.removeEventListener('storage', updateCount);
  }, []);

  return count;
}
