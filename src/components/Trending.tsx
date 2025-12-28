'use client';

import Link from 'next/link';

interface TrendingArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  views24h: number;
  trendingScore: number;
  growthPercent: number;
}

interface TrendingBadgeProps {
  size?: 'sm' | 'md';
}

/**
 * Trending Badge - Visual indicator for trending content
 */
export function TrendingBadge({ size = 'md' }: TrendingBadgeProps) {
  const sizeClasses = size === 'sm' 
    ? 'px-2 py-0.5 text-xs' 
    : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 font-semibold text-white ${sizeClasses}`}>
      <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
      </svg>
      Trending
    </span>
  );
}

interface TrendingCardProps {
  article: TrendingArticle;
  rank: number;
}

/**
 * Trending Card - Display a single trending article
 */
export function TrendingCard({ article, rank }: TrendingCardProps) {
  const isPositiveGrowth = article.growthPercent > 0;

  return (
    <Link 
      href={`/article/${article.slug}`}
      className="group flex items-start gap-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-colors hover:border-neutral-700 hover:bg-neutral-900"
    >
      {/* Rank Number */}
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-sm font-bold text-white">
        {rank}
      </span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3 className="mb-1 line-clamp-2 font-semibold text-white group-hover:text-blue-400 transition-colors">
          {article.title}
        </h3>
        
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <span>{article.category}</span>
          <span>•</span>
          <span>{article.views24h} views today</span>
          <span className={`flex items-center gap-0.5 ${isPositiveGrowth ? 'text-green-500' : 'text-red-500'}`}>
            {isPositiveGrowth ? '↑' : '↓'} {Math.abs(article.growthPercent)}%
          </span>
        </div>
      </div>

      {/* Score Badge */}
      <div className="shrink-0 text-right">
        <div className="text-lg font-bold text-orange-500">{article.trendingScore.toFixed(1)}</div>
        <div className="text-xs text-neutral-500">score</div>
      </div>
    </Link>
  );
}

interface TrendingListProps {
  articles: TrendingArticle[];
}

/**
 * Trending List - Full list of trending articles
 */
export function TrendingList({ articles }: TrendingListProps) {
  if (articles.length === 0) {
    return (
      <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8 text-center">
        <p className="text-neutral-500">No trending articles yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {articles.map((article, index) => (
        <TrendingCard key={article.id} article={article} rank={index + 1} />
      ))}
    </div>
  );
}

interface TrendingSidebarProps {
  articles: TrendingArticle[];
}

/**
 * Trending Sidebar - Compact trending widget for sidebar
 */
export function TrendingSidebar({ articles }: TrendingSidebarProps) {
  return (
    <aside className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-4">
      <div className="mb-4 flex items-center gap-2">
        <TrendingBadge size="sm" />
        <span className="font-semibold text-white">Now</span>
      </div>

      <ul className="space-y-3">
        {articles.slice(0, 5).map((article, index) => (
          <li key={article.id}>
            <Link 
              href={`/article/${article.slug}`}
              className="group flex items-start gap-3"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-neutral-800 text-xs font-bold text-neutral-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                {index + 1}
              </span>
              <span className="line-clamp-2 text-sm text-neutral-300 group-hover:text-white transition-colors">
                {article.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
