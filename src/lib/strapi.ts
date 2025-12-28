/**
 * Strapi CMS Data Layer (v5 Format)
 * 
 * Centralized API client for fetching content from Strapi CMS.
 * Strapi v5 uses flat response format (no 'attributes' wrapper).
 */

import type { Article, Category } from './strapi-types';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

// Default headers for API requests
const headers: HeadersInit = {
  'Content-Type': 'application/json',
  ...(STRAPI_API_TOKEN && { Authorization: `Bearer ${STRAPI_API_TOKEN}` }),
};

// Fallback image when none provided
const FALLBACK_IMAGE = 'https://picsum.photos/seed/fallback/1200/630';

// Default author
const DEFAULT_AUTHOR = {
  name: 'GenTimes Editorial',
  avatar: 'https://picsum.photos/seed/author/100/100',
  role: 'Editor',
};

/**
 * Calculate reading time from content
 */
function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content?.trim().split(/\s+/).length || 0;
  return Math.ceil(words / wordsPerMinute) || 1;
}

/**
 * Strapi v5 Article response (flat format)
 */
interface StrapiV5Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  author: string;
  isFeatured: boolean;
  isTrending: boolean;
  isSponsored: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  keyTakeaway: string | null;
  keyPoints: string[] | null;
  tags: string[] | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featuredImage?: {
    url: string;
    alternativeText: string | null;
  } | null;
  categories?: Array<{
    id: number;
    name: string;
    slug: string;
    description: string | null;
    color: string;
  }> | null;
}

/**
 * Strapi v5 Category response (flat format)
 */
interface StrapiV5Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string | null;
  color: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const DEFAULT_CATEGORY: Category = {
  id: '0',
  name: 'Uncategorized',
  slug: 'uncategorized',
  description: '',
  color: '#3b82f6',
};

/**
 * Transform Strapi v5 article to frontend Article type
 */
function transformArticle(data: StrapiV5Article): Article {
  // Get image URL
  let imageUrl = FALLBACK_IMAGE;
  if (data.featuredImage?.url) {
    const imgPath = data.featuredImage.url;
    imageUrl = imgPath.startsWith('http') ? imgPath : `${STRAPI_URL}${imgPath}`;
  }

  // Transform categories array
  const categories: Category[] = data.categories?.map(cat => ({
    id: String(cat.id),
    name: cat.name,
    slug: cat.slug,
    description: cat.description || '',
    color: cat.color || '#3b82f6',
  })) || [DEFAULT_CATEGORY];

  // Primary category is the first one
  const category = categories[0] || DEFAULT_CATEGORY;

  return {
    id: String(data.id),
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.body,
    author: {
      name: data.author || DEFAULT_AUTHOR.name,
      avatar: DEFAULT_AUTHOR.avatar,
      role: DEFAULT_AUTHOR.role,
    },
    publishedAt: data.publishedAt,
    updatedAt: data.updatedAt,
    featuredImage: imageUrl,
    category,
    categories,
    tags: data.tags || [],
    readingTime: calculateReadingTime(data.body),
    isFeatured: data.isFeatured || false,
    isTrending: data.isTrending || false,
    isSponsored: data.isSponsored || false,
    seoTitle: data.seoTitle || undefined,
    seoDescription: data.seoDescription || undefined,
    keyTakeaway: data.keyTakeaway || undefined,
    keyPoints: data.keyPoints || undefined,
  };
}

/**
 * Transform Strapi v5 category to frontend Category type
 */
function transformCategory(data: StrapiV5Category): Category {
  return {
    id: String(data.id),
    name: data.name,
    slug: data.slug,
    description: data.description || '',
    color: data.color || '#3b82f6',
  };
}

/**
 * Fetch all published articles
 */
export async function fetchArticles(options?: {
  featured?: boolean;
  trending?: boolean;
  limit?: number;
  categorySlug?: string;
}): Promise<Article[]> {
  try {
    const params = new URLSearchParams({
      'populate': '*',
      'sort': 'publishedAt:desc',
      'pagination[pageSize]': String(options?.limit || 100),
    });

    if (options?.featured) {
      params.append('filters[isFeatured][$eq]', 'true');
    }
    if (options?.trending) {
      params.append('filters[isTrending][$eq]', 'true');
    }
    if (options?.categorySlug) {
      params.append('filters[categories][slug][$eq]', options.categorySlug);
    }

    const response = await fetch(`${STRAPI_URL}/api/articles?${params}`, {
      headers,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error('Failed to fetch articles:', response.statusText);
      return [];
    }

    const json = await response.json();
    return (json.data || []).map(transformArticle);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

/**
 * Fetch single article by slug
 */
export async function fetchArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const params = new URLSearchParams({
      'populate': '*',
      'filters[slug][$eq]': slug,
    });

    const response = await fetch(`${STRAPI_URL}/api/articles?${params}`, {
      headers,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      console.error('Failed to fetch article:', response.statusText);
      return null;
    }

    const json = await response.json();
    
    if (!json.data || json.data.length === 0) {
      return null;
    }

    return transformArticle(json.data[0]);
  } catch (error) {
    console.error('Error fetching article:', error);
    return null;
  }
}

/**
 * Fetch all categories
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/categories?sort=name:asc`, {
      headers,
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      console.error('Failed to fetch categories:', response.statusText);
      return [];
    }

    const json = await response.json();
    return (json.data || []).map(transformCategory);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetch category by slug
 */
export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  try {
    const params = new URLSearchParams({
      'filters[slug][$eq]': slug,
    });

    const response = await fetch(`${STRAPI_URL}/api/categories?${params}`, {
      headers,
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      return null;
    }

    const json = await response.json();
    
    if (!json.data || json.data.length === 0) {
      return null;
    }

    return transformCategory(json.data[0]);
  } catch (error) {
    console.error('Error fetching category:', error);
    return null;
  }
}

/**
 * Search articles by query
 */
export async function searchArticles(query: string): Promise<Article[]> {
  try {
    const params = new URLSearchParams({
      'populate': '*',
      'sort': 'publishedAt:desc',
      'filters[$or][0][title][$containsi]': query,
      'filters[$or][1][excerpt][$containsi]': query,
    });

    const response = await fetch(`${STRAPI_URL}/api/articles?${params}`, {
      headers,
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return [];
    }

    const json = await response.json();
    return (json.data || []).map(transformArticle);
  } catch (error) {
    console.error('Error searching articles:', error);
    return [];
  }
}

/**
 * Subscribe email to newsletter
 */
export async function subscribeEmail(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const checkParams = new URLSearchParams({
      'filters[email][$eq]': email,
    });

    const checkResponse = await fetch(`${STRAPI_URL}/api/subscribers?${checkParams}`, {
      headers,
    });

    if (checkResponse.ok) {
      const checkJson = await checkResponse.json();
      if (checkJson.data && checkJson.data.length > 0) {
        return { success: false, message: 'Email already subscribed' };
      }
    }

    const response = await fetch(`${STRAPI_URL}/api/subscribers`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: {
          email,
          subscribedAt: new Date().toISOString(),
          status: 'active',
        },
      }),
    });

    if (!response.ok) {
      return { success: false, message: 'Failed to subscribe' };
    }

    return { success: true, message: 'Successfully subscribed!' };
  } catch (error) {
    console.error('Error subscribing:', error);
    return { success: false, message: 'An error occurred' };
  }
}
