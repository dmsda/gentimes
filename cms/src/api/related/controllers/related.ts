/**
 * Related Articles Controller
 * 
 * Uses category and tag similarity to find related articles
 */
import { Context } from 'koa';

export default {
  /**
   * Get related articles based on category and tags
   */
  async getRelated(ctx: Context) {
    try {
      const { articleId } = ctx.params;
      const { limit = 4 } = ctx.query;

      // Get the source article
      const article = await strapi.db.query('api::article.article').findOne({
        where: { id: articleId },
        populate: ['categories'],
      });

      if (!article) {
        return ctx.notFound('Article not found');
      }

      // Get category IDs
      const categoryIds = (article.categories || []).map((c: any) => c.id);
      const articleTags = article.tags || [];

      // Find articles in same categories
      let relatedArticles: any[] = [];

      if (categoryIds.length > 0) {
        relatedArticles = await strapi.db.query('api::article.article').findMany({
          where: {
            id: { $ne: articleId },
            publishedAt: { $ne: null },
            categories: { id: { $in: categoryIds } },
          },
          populate: ['categories', 'featuredImage'],
          orderBy: { publishedAt: 'desc' },
          limit: Number(limit) * 2, // Get more to score and rank
        });
      }

      // Score articles by similarity
      const scoredArticles = relatedArticles.map((relatedArticle: any) => {
        let score = 0;

        // Category match (2 points each)
        const relatedCategoryIds = (relatedArticle.categories || []).map((c: any) => c.id);
        const categoryMatches = categoryIds.filter((id: number) => relatedCategoryIds.includes(id)).length;
        score += categoryMatches * 2;

        // Tag match (1 point each)
        const relatedTags = relatedArticle.tags || [];
        const tagMatches = articleTags.filter((tag: string) =>
          relatedTags.some((t: string) => t.toLowerCase() === tag.toLowerCase())
        ).length;
        score += tagMatches;

        // Recency bonus (newer articles get slight boost)
        const daysSincePublished = (Date.now() - new Date(relatedArticle.publishedAt).getTime()) / (1000 * 60 * 60 * 24);
        if (daysSincePublished < 7) score += 1;

        return { ...relatedArticle, similarityScore: score };
      });

      // Sort by score and take top N
      const topRelated = scoredArticles
        .sort((a, b) => b.similarityScore - a.similarityScore)
        .slice(0, Number(limit));

      // Format response
      const response = topRelated.map((article: any) => ({
        id: article.id,
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        category: article.categories?.[0]?.name || 'Uncategorized',
        categorySlug: article.categories?.[0]?.slug || 'uncategorized',
        featuredImage: article.featuredImage?.url || null,
        publishedAt: article.publishedAt,
        similarityScore: article.similarityScore,
      }));

      return ctx.send({ data: response });
    } catch (error) {
      strapi.log.error('Related articles error:', error);
      return ctx.internalServerError('Failed to get related articles');
    }
  },
};
