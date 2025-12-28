import Link from 'next/link';
import Image from 'next/image';
import { formatRelativeDate } from '@/lib/seo';

interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  featuredImage: string | null;
  publishedAt: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticle[];
}

/**
 * Related Articles Component
 */
export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 border-t border-neutral-800 pt-8">
      <h2 className="mb-6 text-2xl font-bold text-white">Artikel Terkait</h2>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className="group rounded-lg border border-neutral-800 bg-neutral-900/50 overflow-hidden transition-all hover:border-neutral-700 hover:shadow-lg"
          >
            {/* Image */}
            <div className="relative aspect-video bg-neutral-800">
              {article.featuredImage ? (
                <Image
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337'}${article.featuredImage}`}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-neutral-600">
                  <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4">
              <Link
                href={`/category/${article.categorySlug}`}
                className="mb-2 inline-block text-xs font-medium text-blue-400 hover:text-blue-300"
              >
                {article.category}
              </Link>
              
              <h3 className="mb-2 line-clamp-2 font-semibold text-white group-hover:text-blue-400 transition-colors">
                {article.title}
              </h3>
              
              <p className="line-clamp-2 text-sm text-neutral-400">
                {article.excerpt}
              </p>
              
              <p className="mt-3 text-xs text-neutral-500">
                {formatRelativeDate(article.publishedAt)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * Fetch related articles from API
 */
export async function getRelatedArticles(articleId: string): Promise<RelatedArticle[]> {
  try {
    const strapiUrl = process.env.STRAPI_URL || 'http://localhost:1337';
    const response = await fetch(`${strapiUrl}/api/related/${articleId}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) return [];

    const data = await response.json();
    return data.data || [];
  } catch {
    return [];
  }
}
