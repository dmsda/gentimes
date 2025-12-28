import Link from 'next/link';
import { categories } from '@/lib/articles';
import { MobileNav } from './MobileNav';
import { SearchModal } from './SearchInput';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-800 bg-neutral-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600">
            <span className="text-lg font-bold text-white">G</span>
          </div>
          <span className="text-xl font-bold text-white">GenTimes</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden gap-1 md:flex">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="px-3 py-2 text-sm font-medium text-neutral-400 transition-colors hover:text-white"
            >
              {category.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <SearchModal />
          <MobileNav />
          <Link
            href="/subscribe"
            className="hidden rounded-lg bg-white px-4 py-2 text-sm font-semibold text-neutral-900 hover:bg-neutral-200 sm:block"
          >
            Subscribe
          </Link>
        </div>
      </div>
    </header>
  );
}
