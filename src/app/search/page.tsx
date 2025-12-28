import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { searchArticles } from '@/lib/search';
import { formatRelativeDate } from '@/lib/seo';
import { SearchInput } from '@/components/SearchInput';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `"${q}" - Search` : 'Search',
    description: 'Search for technology news and articles',
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q || '';
  const results = query ? searchArticles(query) : [];

  return (
    <div className="min-h-screen bg-neutral-950 px-4 py-8">
      <div className="mx-auto max-w-3xl">
        
        {/* Search Input */}
        <div className="mb-8">
          <SearchInput placeholder="Search articles..." className="w-full" />
        </div>

        {/* Results Header */}
        {query && (
          <p className="mb-6 text-sm text-neutral-500">
            {results.length} {results.length === 1 ? 'result' : 'results'} for "{query}"
          </p>
        )}

        {/* Results */}
        {query ? (
          results.length > 0 ? (
            <div className="divide-y divide-neutral-800">
              {results.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="group flex gap-4 py-5"
                >
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-neutral-800">
                    <Image
                      src={article.featuredImage}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase" style={{ color: article.category.color }}>
                      {article.category.name}
                    </span>
                    <h2 className="mt-1 font-semibold text-white group-hover:text-blue-400 line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="mt-1 text-xs text-neutral-500">
                      {formatRelativeDate(article.publishedAt)} · {article.readingTime} min
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <p className="text-lg font-semibold text-white">No results found</p>
              <p className="mt-1 text-neutral-500">Try different keywords</p>
            </div>
          )
        ) : (
          <div className="py-12 text-center">
            <p className="text-lg font-semibold text-white">Search articles</p>
            <p className="mt-1 text-neutral-500">Enter keywords to find articles</p>
          </div>
        )}

      </div>
    </div>
  );
}
