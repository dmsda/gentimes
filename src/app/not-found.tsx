import Link from 'next/link';
import { categories } from '@/lib/articles';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-md text-center">
        {/* 404 Number */}
        <p className="mb-2 text-7xl font-bold text-neutral-700 sm:text-8xl">
          404
        </p>

        {/* Title */}
        <h1 className="mb-3 text-2xl font-bold text-white sm:text-3xl">
          Page Not Found
        </h1>

        {/* Description */}
        <p className="mb-8 text-neutral-400">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Primary Button */}
        <Link
          href="/"
          className="inline-block rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-500"
        >
          Go to Homepage
        </Link>

        {/* Divider */}
        <div className="my-8 flex items-center gap-4">
          <div className="h-px flex-1 bg-neutral-800" />
          <span className="text-sm text-neutral-600">or browse</span>
          <div className="h-px flex-1 bg-neutral-800" />
        </div>

        {/* Category Links */}
        <div className="flex flex-wrap justify-center gap-2">
          {categories.slice(0, 4).map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              className="rounded-lg bg-neutral-800 px-4 py-2 text-sm text-neutral-300 hover:bg-neutral-700 hover:text-white"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
