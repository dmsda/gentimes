import Link from 'next/link';
import Image from 'next/image';
import { Article, CardVariant } from '@/lib/types';
import { formatRelativeDate } from '@/lib/seo';

interface BentoCardProps {
  article: Article;
  variant?: CardVariant;
  priority?: boolean;
}

export function BentoCard({
  article,
  variant = 'standard',
  priority = false,
}: BentoCardProps) {
  const variantStyles = {
    hero: 'sm:col-span-2 row-span-2 min-h-[400px] lg:min-h-[500px]',
    standard: 'min-h-[280px]',
    wide: 'sm:col-span-2 min-h-[240px]',
    tall: 'row-span-2 min-h-[400px]',
  };

  const isHero = variant === 'hero';

  return (
    <Link
      href={`/article/${article.slug}`}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/50 transition-all duration-300 hover:border-white/20 hover:bg-neutral-900/80 ${variantStyles[variant]}`}
    >
      {/* Image Container */}
      <div
        className={`relative overflow-hidden ${isHero ? 'h-2/3' : 'h-40'} w-full`}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent z-10" />
        <Image
          src={article.featuredImage}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes={
            isHero
              ? '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw'
              : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
          }
          priority={priority}
        />

        {/* Category Badge */}
        <div className="absolute left-3 top-3 z-20">
          <span
            className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur-md"
            style={{
              backgroundColor: `${article.category.color}20`,
              color: article.category.color,
            }}
          >
            {article.category.name}
          </span>
        </div>

        {/* Sponsored Badge */}
        {article.isSponsored && (
          <div className="absolute right-3 top-3 z-20">
            <span className="inline-flex items-center rounded-full bg-amber-500/20 px-2.5 py-1 text-xs font-medium text-amber-400 backdrop-blur-md">
              Sponsored
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3
            className={`font-semibold leading-snug text-white transition-colors group-hover:text-blue-400 ${
              isHero ? 'text-xl lg:text-2xl' : 'text-base'
            }`}
          >
            {article.title}
          </h3>
          <p
            className={`mt-2 text-neutral-400 ${
              isHero ? 'line-clamp-3 text-sm' : 'line-clamp-2 text-sm'
            }`}
          >
            {article.excerpt}
          </p>
        </div>

        {/* Meta */}
        <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <span>{article.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>{formatRelativeDate(article.publishedAt)}</span>
            <span className="text-neutral-600">·</span>
            <span>{article.readingTime} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
