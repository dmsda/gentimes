import { getArticles, getCategories } from '@/lib/data';
import { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gentimes.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all articles and categories
  const [articles, categories] = await Promise.all([
    getArticles(),
    getCategories(),
  ]);

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/subscribe`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  // Category pages
  const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${SITE_URL}/category/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }));

  // Article pages with dynamic priority
  const articlePages: MetadataRoute.Sitemap = articles.map((article) => {
    // Priority: featured > trending > regular
    let priority = 0.7;
    if (article.isFeatured) priority = 1.0;
    else if (article.isTrending) priority = 0.9;
    else if (article.isSponsored) priority = 0.6;

    // Recency affects changeFrequency
    const daysSinceUpdate = (Date.now() - new Date(article.updatedAt || article.publishedAt).getTime()) / (1000 * 60 * 60 * 24);
    const changeFrequency: 'daily' | 'weekly' | 'monthly' = 
      daysSinceUpdate < 7 ? 'daily' : 
      daysSinceUpdate < 30 ? 'weekly' : 'monthly';

    return {
      url: `${SITE_URL}/article/${article.slug}`,
      lastModified: new Date(article.updatedAt || article.publishedAt),
      changeFrequency,
      priority,
    };
  });

  return [...staticPages, ...categoryPages, ...articlePages];
}
