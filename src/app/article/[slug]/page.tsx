import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getArticle, getArticles } from '@/lib/data';
import { generateArticleSchema, formatDate } from '@/lib/seo';
import { trackPageView } from '@/lib/analytics';
import { ShareButtons } from '@/components/ShareButtons';
import { AdSlot, ResponsiveAdSlot } from '@/components/AdSlot';
import { ReadingProgress } from '@/components/ReadingProgress';
import { TableOfContents } from '@/components/TableOfContents';

export const revalidate = 60;

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: 'Article Not Found' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gentimes.com';

  return {
    title: article.title,
    description: article.excerpt,
    keywords: article.tags,
    authors: [{ name: article.author.name }],
    openGraph: {
      type: 'article',
      title: article.title,
      description: article.excerpt,
      url: `${siteUrl}/article/${article.slug}`,
      images: [{ url: article.featuredImage, width: 1200, height: 630, alt: article.title }],
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt || article.publishedAt,
      authors: [article.author.name],
      section: article.category.name,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.featuredImage],
    },
  };
}

// Simple markdown to HTML parser
function parseContent(content: string): string {
  if (!content) return '';
  return content
    .replace(/^### (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h3 id="${id}">${text}</h3>`;
    })
    .replace(/^## (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h2 id="${id}">${text}</h2>`;
    })
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[holu])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '')
    .replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
    .replace(/<\/ul>\s*<ul>/g, '');
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  // Track page view (non-blocking)
  trackPageView(article.id, new Headers()).catch(() => {});

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gentimes.com';
  const articleSchema = generateArticleSchema(article, siteUrl);
  const articleUrl = `${siteUrl}/article/${article.slug}`;

  // Related articles (same category, excluding current)
  const allArticles = await getArticles();
  const relatedArticles = allArticles
    .filter((a) => a.category.slug === article.category.slug && a.id !== article.id)
    .slice(0, 3);

  const parsedContent = parseContent(article.content);

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Reading Progress Indicator */}
      <ReadingProgress />

      <article className="min-h-screen bg-neutral-950 pt-1">
        {/* Article Header */}
        <header className="border-b border-neutral-800 bg-neutral-900/50">
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
            {/* Breadcrumb */}
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm text-neutral-500">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link
                    href={`/category/${article.category.slug}`}
                    className="hover:text-white transition-colors"
                    style={{ color: article.category.color }}
                  >
                    {article.category.name}
                  </Link>
                </li>
              </ol>
            </nav>

            {/* Sponsored Label */}
            {article.isSponsored && (
              <div className="mb-4">
                <span className="inline-flex items-center rounded bg-amber-500/20 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-amber-400">
                  Sponsored Content
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="mb-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="mb-6 text-lg leading-relaxed text-neutral-400 sm:text-xl">
              {article.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm">
              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold text-white">
                  {article.author.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-white">{article.author.name}</p>
                  <p className="text-neutral-500">{article.author.role}</p>
                </div>
              </div>

              <span className="hidden text-neutral-700 sm:inline" aria-hidden="true">|</span>

              {/* Date & Reading Time */}
              <div className="flex items-center gap-3 text-neutral-500">
                <time dateTime={article.publishedAt}>
                  {formatDate(article.publishedAt)}
                </time>
                <span aria-hidden="true">·</span>
                <span>{article.readingTime} min read</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <figure className="bg-neutral-900">
          <div className="mx-auto max-w-5xl">
            <div className="relative aspect-video w-full">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
                priority
              />
            </div>
          </div>
        </figure>

        {/* Article Body with TOC */}
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="grid gap-12 lg:grid-cols-[1fr_250px]">
            {/* Main Content */}
            <div>
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: parsedContent }}
              />

              {/* AD SLOT: After Article Content */}
              <ResponsiveAdSlot id="article-bottom" className="my-8" />

              {/* Tags */}
              <footer className="mt-12 border-t border-neutral-800 pt-8">
                <div className="mb-6">
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                    Topics
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Link
                        key={tag}
                        href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                        className="rounded-full border border-neutral-700 px-3 py-1 text-sm text-neutral-400 transition-colors hover:border-blue-500 hover:text-blue-400"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Share Buttons */}
                <div>
                  <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
                    Share
                  </h2>
                  <ShareButtons url={articleUrl} title={article.title} />
                </div>
              </footer>
            </div>

            {/* Table of Contents Sidebar */}
            <TableOfContents content={article.content} />
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section className="border-t border-neutral-800 bg-neutral-900/30">
            <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
              <h2 className="mb-8 text-xl font-bold text-white">Related Articles</h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedArticles.map((related) => (
                  <Link
                    key={related.id}
                    href={`/article/${related.slug}`}
                    className="group"
                  >
                    <article>
                      <div className="relative mb-4 aspect-video overflow-hidden rounded-lg bg-neutral-800">
                        <Image
                          src={related.featuredImage}
                          alt={related.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      </div>
                      <span
                        className="mb-2 inline-block text-xs font-semibold uppercase tracking-wide"
                        style={{ color: related.category.color }}
                      >
                        {related.category.name}
                      </span>
                      <h3 className="mb-2 font-semibold leading-snug text-white transition-colors group-hover:text-blue-400 line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-neutral-500">
                        {related.readingTime} min read
                      </p>
                    </article>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Space for future ads/comments */}
        {/* <section className="border-t border-neutral-800">
          <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
            Comments or Ads can be added here
          </div>
        </section> */}
      </article>
    </>
  );
}
