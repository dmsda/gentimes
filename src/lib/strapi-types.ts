/**
 * Strapi CMS Types
 * 
 * TypeScript interfaces for Strapi API responses.
 * These map to the content types defined in Strapi.
 */

// Strapi response wrapper
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: object;
}

// Strapi data wrapper
export interface StrapiData<T> {
  id: number;
  attributes: T;
}

// Media type
export interface StrapiMedia {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText: string | null;
      width: number;
      height: number;
      formats?: {
        thumbnail?: { url: string };
        small?: { url: string };
        medium?: { url: string };
        large?: { url: string };
      };
    };
  } | null;
}

// Category from Strapi
export interface StrapiCategoryAttributes {
  name: string;
  slug: string;
  description: string | null;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiCategory {
  data: StrapiData<StrapiCategoryAttributes> | null;
}

// Article from Strapi
export interface StrapiArticleAttributes {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  author: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  isFeatured: boolean;
  isTrending: boolean;
  isSponsored: boolean;
  seoTitle: string | null;
  seoDescription: string | null;
  featuredImage: StrapiMedia;
  category: StrapiCategory;
}

// Subscriber from Strapi
export interface StrapiSubscriberAttributes {
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}

// Transformed types (for frontend use)
export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  updatedAt: string;
  featuredImage: string;
  /** Primary category (first in list) for display */
  category: Category;
  /** All categories this article belongs to */
  categories: Category[];
  tags: string[];
  readingTime: number;
  isFeatured: boolean;
  isTrending: boolean;
  isSponsored: boolean;
  seoTitle?: string;
  seoDescription?: string;
  keyTakeaway?: string;
  keyPoints?: string[];
}

export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: string;
  status: 'active' | 'unsubscribed';
}
