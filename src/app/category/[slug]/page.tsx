import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategories, getArticlesByCategory } from '@/lib/data';
import { fetchCategoryBySlug } from '@/lib/strapi';
import { formatRelativeDate, generateCategorySchema, generateBreadcrumbSchema } from '@/lib/seo';
import { ResponsiveAdSlot } from '@/components/AdSlot';

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gentimes.com';
const ITEMS_PER_PAGE = 10;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await fetchCategoryBySlug(slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.name} News`,
    description: `Latest ${category.name.toLowerCase()} news, reviews, and insights from GenTimes.`,
    alternates: {
      canonical: `${siteUrl}/category/${slug}`,
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug } = await params;
  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam || '1', 10));
  
  const category = await fetchCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const allArticles = await getArticlesByCategory(slug);
  
  // Pagination
  const totalArticles = allArticles.length;
  const totalPages = Math.ceil(totalArticles / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const categoryArticles = allArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Generate structured data
  const categorySchema = generateCategorySchema(category, categoryArticles, siteUrl);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: category.name, url: `/category/${category.slug}` },
  ], siteUrl);

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([categorySchema, breadcrumbSchema]),
        }}
      />
      <div className="min-h-screen bg-neutral-950">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        
        {/* Category Header */}
        <header className="mb-8 border-b border-neutral-800 pb-6">
          <nav className="mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-neutral-500">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>/</li>
              <li className="text-neutral-300">{category.name}</li>
            </ol>
          </nav>
          <h1 
            className="text-3xl font-bold text-white sm:text-4xl"
            style={{ color: category.color }}
          >
            {category.name}
          </h1>
          <p className="mt-2 text-neutral-400">
            Latest news and updates in {category.name.toLowerCase()} ({totalArticles} artikel)
          </p>
        </header>

        {/* Articles List */}
        <section aria-label={`${category.name} articles`}>
          {categoryArticles.length === 0 ? (
            <p className="text-neutral-500">No articles found in this category.</p>
          ) : (
            <div className="space-y-0 divide-y divide-neutral-800">
              {categoryArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="group flex gap-4 py-6 first:pt-0 sm:gap-6"
                >
                  {/* Thumbnail */}
                  <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg bg-neutral-800 sm:h-32 sm:w-48">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(max-width: 640px) 128px, 192px"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-center">
                    {article.isSponsored && (
                      <span className="mb-1 text-xs font-bold uppercase tracking-wider text-amber-500">
                        Sponsored
                      </span>
                    )}
                    <h2 className="mb-2 text-lg font-semibold leading-snug text-white transition-colors group-hover:text-blue-400 sm:text-xl line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="mb-2 hidden text-sm text-neutral-400 sm:block line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-neutral-500 sm:text-sm">
                      <span className="font-medium text-neutral-400">{article.author.name}</span>
                      <span>·</span>
                      <time>{formatRelativeDate(article.publishedAt)}</time>
                      <span>·</span>
                      <span>{article.readingTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-8 flex items-center justify-center gap-2">
            {page > 1 && (
              <Link
                href={`/category/${slug}?page=${page - 1}`}
                className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-400 hover:border-neutral-500 hover:text-white"
              >
                ← Sebelumnya
              </Link>
            )}
            
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
                    href={`/category/${slug}?page=${pageNum}`}
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
            
            {page < totalPages && (
              <Link
                href={`/category/${slug}?page=${page + 1}`}
                className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-400 hover:border-neutral-500 hover:text-white"
              >
                Selanjutnya →
              </Link>
            )}
          </nav>
        )}

        {/* AD SLOT: After Article List */}
        <ResponsiveAdSlot id="category-bottom" className="my-8" />

        {/* Back to Home */}
        <div className="mt-8 border-t border-neutral-800 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
    </>
  );
}

