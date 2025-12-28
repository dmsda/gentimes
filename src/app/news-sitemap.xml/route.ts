import { getArticles } from '@/lib/data';
import { NextResponse } from 'next/server';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://gentimes.com';

/**
 * Google News Sitemap
 * 
 * Only includes articles from the last 48 hours (Google News requirement)
 */
export async function GET() {
  const articles = await getArticles();

  // Filter articles from last 48 hours
  const recentArticles = articles.filter((article) => {
    const publishedDate = new Date(article.publishedAt);
    const hoursSincePublished = (Date.now() - publishedDate.getTime()) / (1000 * 60 * 60);
    return hoursSincePublished <= 48;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${recentArticles
  .map((article) => {
    const category = article.categories?.[0]?.name || 'Technology';
    return `  <url>
    <loc>${SITE_URL}/article/${article.slug}</loc>
    <news:news>
      <news:publication>
        <news:name>GenTimes</news:name>
        <news:language>id</news:language>
      </news:publication>
      <news:publication_date>${new Date(article.publishedAt).toISOString()}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
      <news:keywords>${escapeXml(category)}</news:keywords>
    </news:news>
  </url>`;
  })
  .join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=300', // 5 minutes
    },
  });
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
