import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getArticles, getCategories } from '@/lib/data';
import { IndexFilters } from '@/components/IndexFilters';

export const metadata: Metadata = {
  title: 'Indeks Berita | GenTimes',
  description: 'Indeks berita teknologi terbaru hari ini. Kumpulan artikel dari berbagai kategori.',
  openGraph: {
    title: 'Indeks Berita | GenTimes',
    description: 'Indeks berita teknologi terbaru hari ini',
  },
};

export const revalidate = 60;

interface PageProps {
  searchParams: Promise<{ page?: string; date?: string; category?: string }>;
}

// Group articles by date
function groupByDate(articles: any[]): Map<string, any[]> {
  const groups = new Map<string, any[]>();
  
  articles.forEach(article => {
    const date = new Date(article.publishedAt);
    const dateKey = date.toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    if (!groups.has(dateKey)) {
      groups.set(dateKey, []);
    }
    groups.get(dateKey)!.push(article);
  });
  
  return groups;
}

// Format time only
function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function IndeksPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Math.max(1, parseInt(params.page || '1', 10));
  const dateFilter = params.date;
  const categoryFilter = params.category;
  const ITEMS_PER_PAGE = 10;

  let [articles, categories] = await Promise.all([
    getArticles(),
    getCategories(),
  ]);

  // Filter by date if provided
  if (dateFilter) {
    const filterDate = new Date(dateFilter);
    articles = articles.filter(article => {
      const articleDate = new Date(article.publishedAt);
      return articleDate.toDateString() === filterDate.toDateString();
    });
  }

  // Filter by category if provided
  if (categoryFilter) {
    articles = articles.filter(article => 
      article.categories?.some((cat: any) => cat.slug === categoryFilter)
    );
  }

  // Sort by published date (newest first)
  articles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Pagination
  const totalArticles = articles.length;
  const totalPages = Math.ceil(totalArticles / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedArticles = articles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Group by date
  const groupedArticles = groupByDate(paginatedArticles);

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="mb-4 flex items-center gap-2">
            <Link href="/" className="text-neutral-500 hover:text-white">
              Beranda
            </Link>
            <span className="text-neutral-600">/</span>
            <span className="text-white">Indeks Berita</span>
          </div>
          
          <h1 className="text-3xl font-bold text-white">Indeks Berita</h1>
          <p className="mt-2 text-neutral-400">
            Kumpulan berita teknologi terbaru dari berbagai kategori
          </p>
        </div>

        {/* Filters - Client Component */}
        <Suspense fallback={<div className="mb-6 h-10 animate-pulse rounded bg-neutral-900" />}>
          <IndexFilters 
            categories={categories}
            dateFilter={dateFilter}
            categoryFilter={categoryFilter}
          />
        </Suspense>

        {/* Article count */}
        <p className="mb-4 text-sm text-neutral-500">
          Menampilkan {paginatedArticles.length} dari {totalArticles} artikel
        </p>

        {/* Article List by Date */}
        {Array.from(groupedArticles.entries()).map(([dateKey, dateArticles]) => (
          <div key={dateKey} className="mb-8">
            {/* Date Header */}
            <h2 className="mb-4 border-b border-neutral-800 pb-2 text-lg font-semibold text-blue-400">
              {dateKey}
            </h2>
            
            {/* Articles */}
            <div className="space-y-4">
              {dateArticles.map((article: any) => (
                <article key={article.id} className="group">
                  <Link
                    href={`/article/${article.slug}`}
                    className="flex gap-4 rounded-lg p-3 transition-colors hover:bg-neutral-900/50"
                  >
                    {/* Time */}
                    <div className="shrink-0 pt-1">
                      <span className="text-sm font-medium text-neutral-500">
                        {formatTime(article.publishedAt)}
                      </span>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="text-xs font-medium text-blue-400">
                          {article.categories?.[0]?.name || 'Uncategorized'}
                        </span>
                        {article.isTrending && (
                          <span className="rounded bg-orange-500/20 px-1.5 py-0.5 text-xs text-orange-400">
                            Trending
                          </span>
                        )}
                      </div>
                      <h3 className="mb-1 font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-neutral-500 line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                    
                    {/* Thumbnail */}
                    {article.featuredImage?.url && (
                      <div className="relative hidden h-20 w-32 shrink-0 overflow-hidden rounded-lg sm:block">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${article.featuredImage.url}`}
                          alt={article.title}
                          fill
                          className="object-cover"
                          sizes="128px"
                        />
                      </div>
                    )}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ))}
        
        {/* No Results */}
        {paginatedArticles.length === 0 && (
          <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-12 text-center">
            <p className="text-neutral-500">Tidak ada artikel ditemukan</p>
            <Link href="/indeks" className="mt-2 inline-block text-sm text-blue-400 hover:text-blue-300">
              Reset filter
            </Link>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-8 flex items-center justify-center gap-2">
            {/* Previous */}
            {page > 1 && (
              <Link
                href={`/indeks?page=${page - 1}${dateFilter ? `&date=${dateFilter}` : ''}${categoryFilter ? `&category=${categoryFilter}` : ''}`}
                className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-400 hover:border-neutral-500 hover:text-white"
              >
                ← Sebelumnya
              </Link>
            )}
            
            {/* Page Numbers */}
            <div className="flex gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (page <= 3) {
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = page - 2 + i;
                }
                
                return (
                  <Link
                    key={pageNum}
                    href={`/indeks?page=${pageNum}${dateFilter ? `&date=${dateFilter}` : ''}${categoryFilter ? `&category=${categoryFilter}` : ''}`}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm ${
                      pageNum === page
                        ? 'bg-blue-600 text-white'
                        : 'border border-neutral-700 text-neutral-400 hover:border-neutral-500 hover:text-white'
                    }`}
                  >
                    {pageNum}
                  </Link>
                );
              })}
            </div>
            
            {/* Next */}
            {page < totalPages && (
              <Link
                href={`/indeks?page=${page + 1}${dateFilter ? `&date=${dateFilter}` : ''}${categoryFilter ? `&category=${categoryFilter}` : ''}`}
                className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-400 hover:border-neutral-500 hover:text-white"
              >
                Selanjutnya →
              </Link>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}
