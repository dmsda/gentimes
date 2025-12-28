import Link from 'next/link';
import Image from 'next/image';
import { getArticles, getCategories } from '@/lib/data';
import { formatRelativeDate } from '@/lib/seo';
import { ResponsiveAdSlot, AdSlot } from '@/components/AdSlot';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function HomePage() {
  // Fetch all data from CMS
  const [allArticles, categories] = await Promise.all([
    getArticles(),
    getCategories(),
  ]);
  
  // Featured article
  const featuredArticle = allArticles.find(a => a.isFeatured) || allArticles[0];
  
  // Trending articles
  const trendingArticles = allArticles.filter(a => a.isTrending).slice(0, 5);
  
  // Sponsored article
  const sponsoredArticle = allArticles.find(a => a.isSponsored);
  
  // Latest articles (excluding featured and sponsored)
  const latestArticles = allArticles
    .filter((a) => a.id !== featuredArticle?.id && !a.isSponsored)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // Secondary grid: first 4
  const secondaryArticles = latestArticles.slice(0, 4);
  
  // Latest list: next 5
  const listArticles = latestArticles.slice(4, 9);

  return (
    <div className="min-h-screen bg-neutral-950">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        
        {/* ============================================
            MAIN HEADLINE - Featured Article
        ============================================ */}
        <section className="mb-8" aria-labelledby="featured-heading">
          <h2 id="featured-heading" className="sr-only">Featured Story</h2>
          
          {featuredArticle && (
            <Link href={`/article/${featuredArticle.slug}`} className="group block">
              <article className="overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50">
                <div className="grid lg:grid-cols-2">
                  {/* Image */}
                  <div className="relative aspect-video lg:aspect-[4/3]">
                    <Image
                      src={featuredArticle.featuredImage}
                      alt={featuredArticle.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col justify-center p-6 lg:p-8">
                    <span 
                      className="mb-3 text-xs font-bold uppercase tracking-wider"
                      style={{ color: featuredArticle.category.color }}
                    >
                      {featuredArticle.category.name}
                    </span>
                    <h1 className="mb-4 text-2xl font-bold leading-tight text-white transition-colors group-hover:text-blue-400 sm:text-3xl lg:text-4xl">
                      {featuredArticle.title}
                    </h1>
                    <p className="mb-4 text-neutral-400 leading-relaxed line-clamp-2 lg:line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-neutral-500">
                      <span className="font-medium text-neutral-300">{featuredArticle.author.name}</span>
                      <span>·</span>
                      <time>{formatRelativeDate(featuredArticle.publishedAt)}</time>
                      <span>·</span>
                      <span>{featuredArticle.readingTime} min</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          )}
        </section>

        {/* AD SLOT: After Hero */}
        <ResponsiveAdSlot id="home-hero" className="mb-8" />

        {/* ============================================
            SECONDARY NEWS GRID - 4 Articles
        ============================================ */}
        <section className="mb-10" aria-labelledby="secondary-heading">
          <div className="mb-4 flex items-center gap-4">
            <h2 id="secondary-heading" className="text-lg font-bold text-white">Latest Headlines</h2>
            <div className="h-px flex-1 bg-neutral-800" />
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {secondaryArticles.map((article) => (
              <Link
                key={article.id}
                href={`/article/${article.slug}`}
                className="group block"
              >
                <article className="h-full rounded-lg border border-neutral-800 bg-neutral-900/30 overflow-hidden transition-colors hover:border-neutral-700">
                  <div className="relative aspect-video">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4">
                    <span 
                      className="mb-2 block text-xs font-bold uppercase tracking-wider"
                      style={{ color: article.category.color }}
                    >
                      {article.category.name}
                    </span>
                    <h3 className="mb-2 font-semibold leading-snug text-white transition-colors group-hover:text-blue-400 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {formatRelativeDate(article.publishedAt)}
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* ============================================
            TWO COLUMN: Latest List + Sidebar
        ============================================ */}
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* LATEST NEWS LIST */}
          <section className="lg:col-span-2" aria-labelledby="latest-heading">
            <div className="mb-4 flex items-center gap-4 border-b border-neutral-800 pb-4">
              <h2 id="latest-heading" className="text-lg font-bold text-white">Latest News</h2>
            </div>
            
            <div className="space-y-0 divide-y divide-neutral-800">
              {listArticles.map((article) => (
                <Link
                  key={article.id}
                  href={`/article/${article.slug}`}
                  className="group flex gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div className="relative h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-neutral-800 sm:h-24 sm:w-36">
                    <Image
                      src={article.featuredImage}
                      alt={article.title}
                      fill
                      className="object-cover"
                      sizes="144px"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span 
                      className="mb-1 text-xs font-bold uppercase tracking-wider"
                      style={{ color: article.category.color }}
                    >
                      {article.category.name}
                    </span>
                    <h3 className="mb-1 font-semibold leading-snug text-white transition-colors group-hover:text-blue-400 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-xs text-neutral-500">
                      {formatRelativeDate(article.publishedAt)} · {article.readingTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            {/* AD SLOT: In Latest Feed */}
            <AdSlot id="home-feed" format="inline" className="my-6" />
          </section>

          {/* SIDEBAR */}
          <aside className="lg:col-span-1 space-y-8">
            
            {/* TRENDING */}
            <section aria-labelledby="trending-heading">
              <div className="mb-4 border-b border-neutral-800 pb-4">
                <h2 id="trending-heading" className="text-lg font-bold text-white">Trending</h2>
              </div>
              <ol className="space-y-4">
                {trendingArticles.map((article, index) => (
                  <li key={article.id}>
                    <Link href={`/article/${article.slug}`} className="group flex gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-sm font-bold text-neutral-400">
                        {index + 1}
                      </span>
                      <div>
                        <h3 className="text-sm font-medium leading-snug text-white transition-colors group-hover:text-blue-400 line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="mt-1 text-xs text-neutral-500">
                          {article.readingTime} min read
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>

            {/* SPONSORED */}
            {sponsoredArticle && (
              <section aria-labelledby="sponsored-heading" className="rounded-lg border border-amber-900/50 bg-amber-950/20 p-4">
                <div className="mb-3">
                  <span id="sponsored-heading" className="text-xs font-bold uppercase tracking-wider text-amber-500">
                    Sponsored
                  </span>
                </div>
                <Link href={`/article/${sponsoredArticle.slug}`} className="group block">
                  <div className="relative mb-3 aspect-video overflow-hidden rounded-lg bg-neutral-800">
                    <Image
                      src={sponsoredArticle.featuredImage}
                      alt={sponsoredArticle.title}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  </div>
                  <h3 className="mb-2 text-sm font-semibold leading-snug text-white transition-colors group-hover:text-blue-400">
                    {sponsoredArticle.title}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2">
                    {sponsoredArticle.excerpt}
                  </p>
                </Link>
              </section>
            )}

            {/* AD SLOT: Sidebar Rectangle */}
            <AdSlot id="home-sidebar" format="rectangle" />

            {/* CATEGORIES */}
            <section aria-labelledby="categories-heading">
              <div className="mb-4 border-b border-neutral-800 pb-4">
                <h2 id="categories-heading" className="text-lg font-bold text-white">Categories</h2>
              </div>
              <ul className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/category/${category.slug}`}
                      className="inline-block rounded-full border border-neutral-700 px-3 py-1.5 text-sm text-neutral-300 transition-colors hover:border-neutral-500 hover:text-white"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </aside>
        </div>

        {/* ============================================
            NEWSLETTER CTA
        ============================================ */}
        <section className="mt-12 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 sm:p-8" aria-labelledby="newsletter-heading">
          <div className="mx-auto max-w-xl text-center">
            <h2 id="newsletter-heading" className="mb-2 text-xl font-bold text-white">
              Stay Updated
            </h2>
            <p className="mb-6 text-neutral-400">
              Get the latest tech news in your inbox every morning.
            </p>
            <form className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-lg border border-neutral-700 bg-neutral-800 px-4 py-2.5 text-white placeholder-neutral-500 outline-none focus:border-blue-500 sm:max-w-xs"
                required
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2.5 font-semibold text-white transition-colors hover:bg-blue-500"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
