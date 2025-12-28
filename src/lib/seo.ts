/**
 * SEO Utilities for GenTimes Tech News Website
 * 
 * Optimized for 2026 SEO including:
 * - AI-powered search engines (Google AI Overview, Bing Copilot, Perplexity)
 * - Entity-driven schemas
 * - Rich structured data
 */

import { Article, Category } from './strapi-types';

const SITE_NAME = 'GenTimes';
const SITE_DESCRIPTION = 'Your trusted source for technology news, AI developments, software updates, and digital innovation insights.';

/**
 * Organization Schema - Used site-wide for publisher attribution
 */
export function generateOrganizationSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsMediaOrganization',
    '@id': `${siteUrl}/#organization`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/logo.png`,
      width: 600,
      height: 60,
    },
    sameAs: [
      'https://twitter.com/gentimes',
      'https://linkedin.com/company/gentimes',
      'https://github.com/gentimes',
    ],
    foundingDate: '2024',
    founders: [
      {
        '@type': 'Person',
        name: 'GenTimes Team',
      },
    ],
    publishingPrinciples: `${siteUrl}/editorial`,
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'hello@gentimes.com',
      url: `${siteUrl}/contact`,
    },
  };
}

/**
 * WebSite Schema with SearchAction for sitelinks search box
 */
export function generateWebsiteSchema(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: siteUrl,
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en-US',
  };
}

/**
 * NewsArticle Schema - Enhanced for 2026 AI search
 */
export function generateArticleSchema(article: Article, siteUrl: string) {
  const imageUrl = article.featuredImage.startsWith('http') 
    ? article.featuredImage 
    : `${siteUrl}${article.featuredImage}`;

  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    '@id': `${siteUrl}/article/${article.slug}#article`,
    headline: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    image: {
      '@type': 'ImageObject',
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Person',
      name: article.author.name,
      jobTitle: article.author.role,
      url: `${siteUrl}/author/${article.author.name.toLowerCase().replace(/\s+/g, '-')}`,
    },
    publisher: {
      '@id': `${siteUrl}/#organization`,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${siteUrl}/article/${article.slug}`,
    },
    articleSection: article.category.name,
    keywords: article.tags.length > 0 ? article.tags.join(', ') : article.category.name,
    wordCount: article.content?.split(/\s+/).length || 0,
    isAccessibleForFree: true,
    inLanguage: 'en-US',
    // Speakable for voice search / AI reading
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.prose h2', '.prose p:first-of-type'],
    },
  };
}

/**
 * BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
  siteUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}

/**
 * CollectionPage Schema for Category pages
 */
export function generateCategorySchema(
  category: Category,
  articles: Article[],
  siteUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${siteUrl}/category/${category.slug}#webpage`,
    name: `${category.name} News`,
    description: category.description || `Latest ${category.name.toLowerCase()} news, updates, and analysis from GenTimes.`,
    url: `${siteUrl}/category/${category.slug}`,
    isPartOf: {
      '@id': `${siteUrl}/#website`,
    },
    about: {
      '@type': 'Thing',
      name: category.name,
    },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.slice(0, 10).map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteUrl}/article/${article.slug}`,
        name: article.title,
      })),
    },
  };
}

/**
 * FAQPage Schema - For articles with Q&A format
 */
export function generateFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Format relative date for freshness signals
 */
export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;

  return formatDate(dateString);
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path: string, siteUrl: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${siteUrl}${cleanPath}`;
}
