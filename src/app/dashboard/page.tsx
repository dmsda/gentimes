import { Metadata } from 'next';
import Link from 'next/link';
import { getAnalyticsOverview, getTrendingArticles } from '@/lib/analytics';
import { TrendingBadge } from '@/components/Trending';
import { SEOStatusDot } from '@/components/SEOPanel';
import { LogoutButton } from '@/components/LogoutButton';

export const metadata: Metadata = {
  title: 'Dashboard | GenTimes',
  description: 'Analytics dashboard for GenTimes',
  robots: { index: false, follow: false },
};

export const revalidate = 60;

interface MetricCardProps {
  label: string;
  value: number | string;
  subtext?: string;
  trend?: 'up' | 'down' | 'neutral';
}

function MetricCard({ label, value, subtext, trend }: MetricCardProps) {
  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-neutral-500',
  };

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
      <p className="mb-1 text-sm text-neutral-500">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
      {subtext && (
        <p className={`mt-1 text-sm ${trendColors[trend || 'neutral']}`}>
          {trend === 'up' && '↑'} {trend === 'down' && '↓'} {subtext}
        </p>
      )}
    </div>
  );
}

interface TrendingItemProps {
  rank: number;
  title: string;
  slug: string;
  views24h: number;
  growthPercent: number;
}

function TrendingItem({ rank, title, slug, views24h, growthPercent }: TrendingItemProps) {
  const isPositive = growthPercent > 0;

  return (
    <Link 
      href={`/article/${slug}`}
      className="flex items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-colors hover:border-neutral-700"
    >
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 text-sm font-bold text-white">
        {rank}
      </span>
      <div className="flex-1 min-w-0">
        <p className="truncate font-medium text-white">{title}</p>
        <p className="text-sm text-neutral-500">{views24h} views today</p>
      </div>
      <span className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '+' : ''}{growthPercent}%
      </span>
    </Link>
  );
}

export default async function DashboardPage() {
  const [overview, trending] = await Promise.all([
    getAnalyticsOverview(),
    getTrendingArticles(),
  ]);

  return (
    <div className="min-h-screen bg-neutral-950 py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-neutral-500">Analytics & Performance Overview</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="rounded-lg border border-neutral-700 px-4 py-2 text-sm text-neutral-300 hover:border-neutral-500 hover:text-white"
            >
              ← Back to Site
            </Link>
            <LogoutButton />
          </div>
        </div>

        {/* Key Metrics */}
        <section className="mb-8">
          <h2 className="mb-4 text-lg font-semibold text-white">Key Metrics</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              label="Page Views (24h)"
              value={overview?.views.last24h || 0}
              subtext="last 24 hours"
            />
            <MetricCard
              label="Page Views (7d)"
              value={overview?.views.last7d || 0}
              subtext="last 7 days"
            />
            <MetricCard
              label="Total Articles"
              value={overview?.totalArticles || 0}
              subtext="published"
            />
            <MetricCard
              label="Subscribers"
              value={overview?.totalSubscribers || 0}
              subtext="active"
            />
          </div>
        </section>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Trending Articles */}
          <section>
            <div className="mb-4 flex items-center gap-3">
              <TrendingBadge size="sm" />
              <h2 className="text-lg font-semibold text-white">Trending Now</h2>
            </div>
            <div className="space-y-3">
              {trending.length > 0 ? (
                trending.slice(0, 5).map((article: any, index: number) => (
                  <TrendingItem
                    key={article.id}
                    rank={index + 1}
                    title={article.title}
                    slug={article.slug}
                    views24h={article.views24h || 0}
                    growthPercent={article.growthPercent || 0}
                  />
                ))
              ) : (
                <div className="rounded-lg border border-neutral-800 bg-neutral-900/50 p-8 text-center">
                  <p className="text-neutral-500">No trending articles yet</p>
                  <p className="mt-1 text-sm text-neutral-600">
                    Articles become trending based on view growth
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-white">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                href="http://localhost:1337/admin"
                target="_blank"
                className="flex items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-900 p-4 transition-colors hover:border-blue-500"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/20 text-blue-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">CMS Admin</p>
                  <p className="text-sm text-neutral-500">Manage content in Strapi</p>
                </div>
              </Link>

              <Link
                href="/category/technology"
                className="flex items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-900 p-4 transition-colors hover:border-green-500"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-500/20 text-green-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">View Articles</p>
                  <p className="text-sm text-neutral-500">Browse content by category</p>
                </div>
              </Link>

              <Link
                href="/search"
                className="flex items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-900 p-4 transition-colors hover:border-purple-500"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/20 text-purple-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-white">Search</p>
                  <p className="text-sm text-neutral-500">Find articles quickly</p>
                </div>
              </Link>
            </div>
          </section>
        </div>

        {/* SEO Overview */}
        <section className="mt-8">
          <h2 className="mb-4 text-lg font-semibold text-white">SEO Health</h2>
          <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div className="text-center">
                <div className="mb-2 flex items-center justify-center gap-2">
                  <SEOStatusDot score={0} />
                  <span className="text-2xl font-bold text-white">0%</span>
                </div>
                <p className="text-sm text-neutral-500">Articles Optimized</p>
              </div>
              <div className="text-center">
                <div className="mb-2">
                  <span className="text-2xl font-bold text-yellow-500">0</span>
                </div>
                <p className="text-sm text-neutral-500">Need Improvement</p>
              </div>
              <div className="text-center">
                <div className="mb-2">
                  <span className="text-2xl font-bold text-red-500">{overview?.totalArticles || 0}</span>
                </div>
                <p className="text-sm text-neutral-500">Require Attention</p>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-400">
                Run SEO analysis on articles to improve search visibility
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 border-t border-neutral-800 pt-6 text-center text-sm text-neutral-500">
          <p>GenTimes Analytics Dashboard • Data refreshes every minute</p>
        </footer>
      </div>
    </div>
  );
}
