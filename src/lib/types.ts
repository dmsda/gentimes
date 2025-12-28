// Types for GenTimes Tech News Website

export interface Author {
  id: string;
  name: string;
  avatar: string;
  role: string;
  bio?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: Category;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  tags: string[];
  isFeatured?: boolean;
  isSponsored?: boolean;
}

export type CardVariant = 'hero' | 'standard' | 'wide' | 'tall';
