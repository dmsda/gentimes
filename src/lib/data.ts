/**
 * Data Layer
 * 
 * This module provides a unified interface for fetching content.
 * It supports both mock data (development) and Strapi CMS (production).
 * 
 * Set USE_CMS=true in environment to use Strapi.
 */

import type { Article, Category } from './strapi-types';

// Import mock data
import {
  articles as mockArticles,
  categories as mockCategories,
  getArticleBySlug as getMockArticleBySlug,
  getArticlesByCategory as getMockArticlesByCategory,
} from './articles';

// Import Strapi functions
import {
  fetchArticles as strapiArticles,
  fetchArticleBySlug as strapiArticleBySlug,
  fetchCategories as strapiCategories,
  searchArticles as strapiSearch,
} from './strapi';

// Check if CMS is enabled
const USE_CMS = process.env.USE_CMS === 'true';

/**
 * Get all articles
 */
export async function getArticles(options?: {
  featured?: boolean;
  trending?: boolean;
  limit?: number;
  categorySlug?: string;
}): Promise<Article[]> {
  if (USE_CMS) {
    return strapiArticles(options);
  }
  
  // Filter mock data
  let result = [...mockArticles] as unknown as Article[];
  
  if (options?.featured) {
    result = result.filter(a => a.isFeatured);
  }
  if (options?.trending) {
    result = result.filter(a => a.isTrending);
  }
  if (options?.categorySlug) {
    result = result.filter(a => a.category.slug === options.categorySlug);
  }
  if (options?.limit) {
    result = result.slice(0, options.limit);
  }
  
  return result;
}

/**
 * Get single article by slug
 */
export async function getArticle(slug: string): Promise<Article | null> {
  if (USE_CMS) {
    return strapiArticleBySlug(slug);
  }
  
  const article = getMockArticleBySlug(slug);
  return article as unknown as Article | null;
}

/**
 * Get all categories
 */
export async function getCategories(): Promise<Category[]> {
  if (USE_CMS) {
    return strapiCategories();
  }
  
  return mockCategories as Category[];
}

/**
 * Get articles by category slug
 */
export async function getArticlesByCategory(categorySlug: string): Promise<Article[]> {
  if (USE_CMS) {
    return strapiArticles({ categorySlug });
  }
  
  return getMockArticlesByCategory(categorySlug) as unknown as Article[];
}

/**
 * Search articles
 */
export async function searchArticles(query: string): Promise<Article[]> {
  if (USE_CMS) {
    return strapiSearch(query);
  }
  
  // Mock search
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return [];
  
  return mockArticles.filter(article => 
    article.title.toLowerCase().includes(normalizedQuery) ||
    article.excerpt.toLowerCase().includes(normalizedQuery)
  ) as unknown as Article[];
}

// Re-export types
export type { Article, Category } from './strapi-types';
