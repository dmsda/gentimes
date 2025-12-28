/**
 * Trending Controller
 * 
 * Handles trending article management and manual calculation trigger.
 */
import { Context } from 'koa';

export default {
  /**
   * Manually trigger trending score calculation
   */
  async calculate(ctx: Context) {
    try {
      const now = new Date();
      const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const last48h = new Date(now.getTime() - 48 * 60 * 60 * 1000);
      const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      // Get all published articles
      const articles = await strapi.db.query('api::article.article').findMany({
        where: {
          publishedAt: { $ne: null },
        },
      });

      let updated = 0;

      for (const article of articles) {
        // Count views in last 24h
        const views24h = await strapi.db.query('api::page-view.page-view').count({
          where: {
            article: article.id,
            timestamp: { $gte: last24h },
          },
        });

        // Count views in 24-48h range
        const views48h = await strapi.db.query('api::page-view.page-view').count({
          where: {
            article: article.id,
            timestamp: { $gte: last48h, $lt: last24h },
          },
        });

        // Count total views in last 7d
        const views7d = await strapi.db.query('api::page-view.page-view').count({
          where: {
            article: article.id,
            timestamp: { $gte: last7d },
          },
        });

        // Calculate age in days
        const publishedAt = new Date(article.publishedAt);
        const ageInDays = (now.getTime() - publishedAt.getTime()) / (24 * 60 * 60 * 1000);

        // Trending score formula
        const trendingScore = Math.max(0, (views24h * 2) + (views48h * 0.5) - (ageInDays * 0.1));

        // Auto-flag as trending if score > 5
        const isTrending = trendingScore > 5;

        // Update article
        await strapi.db.query('api::article.article').update({
          where: { id: article.id },
          data: {
            viewsLast24h: views24h,
            viewsLast7d: views7d,
            trendingScore: Math.round(trendingScore * 100) / 100,
            isTrending: isTrending || article.isTrending, // Keep manual override
          },
        });

        updated++;
      }

      return ctx.send({ success: true, message: `Updated ${updated} articles` });
    } catch (error) {
      strapi.log.error('Trending calculate error:', error);
      return ctx.internalServerError('Failed to calculate trending');
    }
  },

  /**
   * Get trending articles list
   */
  async list(ctx: Context) {
    try {
      const { limit = 10 } = ctx.query;

      const articles = await strapi.db.query('api::article.article').findMany({
        where: {
          publishedAt: { $ne: null },
          isTrending: true,
        },
        orderBy: { trendingScore: 'desc' },
        limit: Number(limit),
        populate: ['categories', 'featuredImage'],
      });

      // Calculate growth percentage for each
      const articlesWithGrowth = articles.map((article: any) => {
        const views24h = article.viewsLast24h || 0;
        const views7d = article.viewsLast7d || 1;
        const avgDaily = views7d / 7;
        const growthPercent = avgDaily > 0 ? Math.round(((views24h - avgDaily) / avgDaily) * 100) : 0;

        return {
          id: article.id,
          title: article.title,
          slug: article.slug,
          excerpt: article.excerpt,
          category: article.categories?.[0]?.name || 'Uncategorized',
          views24h,
          trendingScore: article.trendingScore,
          growthPercent,
          publishedAt: article.publishedAt,
        };
      });

      return ctx.send({ data: articlesWithGrowth });
    } catch (error) {
      strapi.log.error('Trending list error:', error);
      return ctx.internalServerError('Failed to get trending');
    }
  },

  /**
   * Toggle manual trending status
   */
  async toggleManual(ctx: Context) {
    try {
      const { id } = ctx.params;

      const article = await strapi.db.query('api::article.article').findOne({
        where: { id },
      });

      if (!article) {
        return ctx.notFound('Article not found');
      }

      const updated = await strapi.db.query('api::article.article').update({
        where: { id },
        data: {
          isTrending: !article.isTrending,
        },
      });

      return ctx.send({ 
        success: true, 
        isTrending: updated.isTrending,
        message: updated.isTrending ? 'Article marked as trending' : 'Article removed from trending',
      });
    } catch (error) {
      strapi.log.error('Trending toggle error:', error);
      return ctx.internalServerError('Failed to toggle trending');
    }
  },
};
