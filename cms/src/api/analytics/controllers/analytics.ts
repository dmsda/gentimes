/**
 * Analytics Controller
 * 
 * Handles page view tracking and analytics data retrieval
 */
import { Context } from 'koa';
import crypto from 'crypto';

export default {
  /**
   * Track a page view
   */
  async track(ctx: Context) {
    try {
      const { articleId, referrer, device } = ctx.request.body as {
        articleId: string;
        referrer?: string;
        device?: string;
      };

      if (!articleId) {
        return ctx.badRequest('articleId is required');
      }

      // Generate anonymous session hash (no cookies needed)
      const ip = ctx.request.ip || 'unknown';
      const userAgent = ctx.request.headers['user-agent'] || 'unknown';
      const date = new Date().toISOString().split('T')[0];
      const sessionHash = crypto
        .createHash('sha256')
        .update(`${ip}-${userAgent}-${date}`)
        .digest('hex')
        .substring(0, 16);

      // Check for duplicate within last hour (rate limiting)
      const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
      const existingView = await strapi.db.query('api::page-view.page-view').findOne({
        where: {
          article: articleId,
          sessionHash,
          timestamp: { $gte: oneHourAgo },
        },
      });

      if (existingView) {
        return ctx.send({ success: true, message: 'Already tracked' });
      }

      // Create page view record
      await strapi.db.query('api::page-view.page-view').create({
        data: {
          article: articleId,
          timestamp: new Date(),
          referrer: referrer || 'direct',
          device: device || 'desktop',
          sessionHash,
        },
      });

      // Increment view count on article
      const article = await strapi.db.query('api::article.article').findOne({
        where: { id: articleId },
      });

      if (article) {
        await strapi.db.query('api::article.article').update({
          where: { id: articleId },
          data: {
            viewCount: (article.viewCount || 0) + 1,
          },
        });
      }

      return ctx.send({ success: true });
    } catch (error) {
      strapi.log.error('Analytics track error:', error);
      return ctx.internalServerError('Failed to track');
    }
  },

  /**
   * Get analytics overview
   */
  async overview(ctx: Context) {
    try {
      const now = new Date();
      const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const last30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Total views
      const views24h = await strapi.db.query('api::page-view.page-view').count({
        where: { timestamp: { $gte: last24h } },
      });

      const views7d = await strapi.db.query('api::page-view.page-view').count({
        where: { timestamp: { $gte: last7d } },
      });

      const views30d = await strapi.db.query('api::page-view.page-view').count({
        where: { timestamp: { $gte: last30d } },
      });

      // Total articles
      const totalArticles = await strapi.db.query('api::article.article').count({
        where: { publishedAt: { $ne: null } },
      });

      // Total subscribers
      let totalSubscribers = 0;
      try {
        totalSubscribers = await strapi.db.query('api::subscriber.subscriber').count({
          where: { status: 'active' },
        });
      } catch {
        // Subscriber collection may not exist
      }

      return ctx.send({
        views: { last24h: views24h, last7d: views7d, last30d: views30d },
        uniqueVisitors: { last24h: views24h }, // Simplified
        totalArticles,
        totalSubscribers,
        referrerBreakdown: [],
        deviceBreakdown: [],
      });
    } catch (error) {
      strapi.log.error('Analytics overview error:', error);
      return ctx.internalServerError('Failed to get overview');
    }
  },

  /**
   * Get trending articles
   */
  async trending(ctx: Context) {
    try {
      const articles = await strapi.db.query('api::article.article').findMany({
        where: {
          publishedAt: { $ne: null },
        },
        orderBy: { trendingScore: 'desc' },
        limit: 10,
        populate: ['categories'],
      });

      return ctx.send({ data: articles });
    } catch (error) {
      strapi.log.error('Analytics trending error:', error);
      return ctx.internalServerError('Failed to get trending');
    }
  },

  /**
   * Get stats for a specific article
   */
  async articleStats(ctx: Context) {
    try {
      const { id } = ctx.params;
      const now = new Date();
      const last24h = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const last7d = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

      const article = await strapi.db.query('api::article.article').findOne({
        where: { id },
      });

      if (!article) {
        return ctx.notFound('Article not found');
      }

      const views24h = await strapi.db.query('api::page-view.page-view').count({
        where: { article: id, timestamp: { $gte: last24h } },
      });

      const views7d = await strapi.db.query('api::page-view.page-view').count({
        where: { article: id, timestamp: { $gte: last7d } },
      });

      const totalViews = article.viewCount || 0;

      return ctx.send({
        articleId: id,
        totalViews,
        views24h,
        views7d,
        trendingScore: article.trendingScore || 0,
      });
    } catch (error) {
      strapi.log.error('Analytics articleStats error:', error);
      return ctx.internalServerError('Failed to get article stats');
    }
  },
};
