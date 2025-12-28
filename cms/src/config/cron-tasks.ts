/**
 * Trending Score Calculator
 * 
 * Cron job that runs daily to calculate trending scores for articles.
 * Formula: (views24h × 2) + (views48h × 0.5) - (ageInDays × 0.1)
 */

export default {
  /**
   * Cron tasks configuration
   */
  'calculate-trending-scores': {
    task: async ({ strapi }: { strapi: any }) => {
      strapi.log.info('Starting trending score calculation...');

      try {
        const now = new Date();
        const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        const last48h = new Date(now.getTime() - 48 * 60 * 60 * 1000);
        const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

        // Get all published articles from the last 7 days
        const articles = await strapi.db.query('api::article.article').findMany({
          where: {
            publishedAt: { $gte: last7d },
          },
        });

        strapi.log.info(`Processing ${articles.length} articles for trending...`);

        for (const article of articles) {
          // Count views in last 24h
          const views24h = await strapi.db.query('api::page-view.page-view').count({
            where: {
              article: article.id,
              timestamp: { $gte: last24h },
            },
          });

          // Count views in last 48h (but not 24h) - for growth calculation
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

          // Calculate trending score
          // Formula: (views24h × 2) + (views48h × 0.5) - (ageInDays × 0.1)
          const trendingScore = Math.max(0, (views24h * 2) + (views48h * 0.5) - (ageInDays * 0.1));

          // Determine if trending (score > 5 or manual override)
          const isTrending = trendingScore > 5 || article.isManuallyFeatured;

          // Update article
          await strapi.db.query('api::article.article').update({
            where: { id: article.id },
            data: {
              viewsLast24h: views24h,
              viewsLast7d: views7d,
              trendingScore: Math.round(trendingScore * 100) / 100,
              isTrending,
            },
          });
        }

        strapi.log.info(`Trending scores updated for ${articles.length} articles`);
      } catch (error) {
        strapi.log.error('Error calculating trending scores:', error);
      }
    },
    options: {
      // Run every hour
      rule: '0 * * * *',
    },
  },
};
