'use client';

import { formatDate } from '@/lib/seo';

interface ArticleMetaProps {
  author: {
    name: string;
    role?: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  category: {
    name: string;
    slug: string;
  };
}

/**
 * ArticleMeta - Visible timestamps and author attribution
 * 
 * Freshness signals are critical for AI Overview selection.
 * This component displays clear publish/update dates.
 */
export function ArticleMeta({ 
  author, 
  publishedAt, 
  updatedAt, 
  readingTime,
  category 
}: ArticleMetaProps) {
  const isUpdated = updatedAt && updatedAt !== publishedAt;
  
  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-400">
      {/* Author */}
      <div className="flex items-center gap-2">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span>
          By <span className="text-neutral-200 font-medium">{author.name}</span>
          {author.role && <span className="text-neutral-500">, {author.role}</span>}
        </span>
      </div>

      {/* Separator */}
      <span className="hidden sm:inline text-neutral-600">•</span>

      {/* Published Date */}
      <time 
        dateTime={publishedAt}
        className="flex items-center gap-2"
        itemProp="datePublished"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>Published {formatDate(publishedAt)}</span>
      </time>

      {/* Updated Date (if different) */}
      {isUpdated && (
        <>
          <span className="hidden sm:inline text-neutral-600">•</span>
          <time 
            dateTime={updatedAt}
            className="flex items-center gap-2 text-blue-400"
            itemProp="dateModified"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Updated {formatDate(updatedAt)}</span>
          </time>
        </>
      )}

      {/* Separator */}
      <span className="hidden sm:inline text-neutral-600">•</span>

      {/* Reading Time */}
      <span className="flex items-center gap-2">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>{readingTime} min read</span>
      </span>
    </div>
  );
}

interface ArticleHeaderProps {
  title: string;
  excerpt: string;
  category: {
    name: string;
    color: string;
  };
}

/**
 * ArticleHeader - Semantic article header
 * 
 * Clear, descriptive header that AI can parse.
 * The title should be factual, the excerpt should provide context.
 */
export function ArticleHeader({ title, excerpt, category }: ArticleHeaderProps) {
  return (
    <header className="mb-8">
      {/* Category Label */}
      <span 
        className="mb-4 inline-block text-xs font-bold uppercase tracking-wider"
        style={{ color: category.color }}
      >
        {category.name}
      </span>

      {/* Headline - H1 */}
      <h1 
        className="mb-4 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
        itemProp="headline"
      >
        {title}
      </h1>

      {/* Excerpt/Description */}
      <p 
        className="text-lg text-neutral-400 leading-relaxed"
        itemProp="description"
      >
        {excerpt}
      </p>
    </header>
  );
}

interface RelatedArticleProps {
  title: string;
  slug: string;
  category: string;
}

interface RelatedArticlesProps {
  articles: RelatedArticleProps[];
}

/**
 * RelatedArticles - Internal linking for topical authority
 * 
 * Strong internal linking signals topical expertise to AI.
 */
export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <aside className="my-8 rounded-lg border border-neutral-800 bg-neutral-900/30 p-6">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-400">
        Related Articles
      </h3>
      <ul className="space-y-3">
        {articles.map((article, index) => (
          <li key={index}>
            <a 
              href={`/article/${article.slug}`}
              className="group flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
            >
              <svg 
                className="h-4 w-4 shrink-0 text-blue-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
              <span className="group-hover:underline">{article.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}
