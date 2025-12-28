import { Article } from './types';
import { articles } from './articles';

/**
 * Search articles by query
 * 
 * Performs case-insensitive matching on:
 * - Article title
 * - Article excerpt
 * - Tags
 * 
 * @param query - Search query string
 * @returns Array of matching articles
 */
export function searchArticles(query: string): Article[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const searchTerms = normalizedQuery.split(/\s+/).filter(term => term.length > 0);

  return articles.filter((article) => {
    const title = article.title.toLowerCase();
    const excerpt = article.excerpt.toLowerCase();
    const tags = article.tags.map((tag) => tag.toLowerCase());

    // Check if all search terms are found in title, excerpt, or tags
    return searchTerms.every((term) => 
      title.includes(term) || 
      excerpt.includes(term) || 
      tags.some((tag) => tag.includes(term))
    );
  });
}

/**
 * Get search suggestions based on partial query
 * Returns article titles that match the query
 */
export function getSearchSuggestions(query: string, limit: number = 5): string[] {
  if (!query || query.trim().length < 2) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  
  return articles
    .filter((article) => article.title.toLowerCase().includes(normalizedQuery))
    .slice(0, limit)
    .map((article) => article.title);
}
