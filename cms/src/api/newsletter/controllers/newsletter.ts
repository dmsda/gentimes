/**
 * Newsletter Controller
 */
import { Context } from 'koa';

export default {
  /**
   * Subscribe to newsletter
   */
  async subscribe(ctx: Context) {
    try {
      const { email } = ctx.request.body as { email?: string };

      if (!email) {
        return ctx.badRequest('Email is required');
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return ctx.badRequest('Invalid email format');
      }

      // Check if already subscribed
      const existing = await strapi.db.query('api::subscriber.subscriber').findOne({
        where: { email: email.toLowerCase() },
      });

      if (existing) {
        if (existing.status === 'active') {
          return ctx.send({ success: true, message: 'Already subscribed' });
        }

        // Reactivate subscription
        await strapi.db.query('api::subscriber.subscriber').update({
          where: { id: existing.id },
          data: { status: 'active', subscribedAt: new Date() },
        });

        return ctx.send({ success: true, message: 'Subscription reactivated' });
      }

      // Create new subscriber
      await strapi.db.query('api::subscriber.subscriber').create({
        data: {
          email: email.toLowerCase(),
          subscribedAt: new Date(),
          status: 'active',
        },
      });

      return ctx.send({ success: true, message: 'Successfully subscribed' });
    } catch (error: any) {
      if (error.code === 'SQLITE_CONSTRAINT') {
        return ctx.send({ success: true, message: 'Already subscribed' });
      }
      strapi.log.error('Newsletter subscribe error:', error);
      return ctx.internalServerError('Subscription failed');
    }
  },

  /**
   * Unsubscribe from newsletter
   */
  async unsubscribe(ctx: Context) {
    try {
      const { email } = ctx.request.body as { email?: string };

      if (!email) {
        return ctx.badRequest('Email is required');
      }

      const subscriber = await strapi.db.query('api::subscriber.subscriber').findOne({
        where: { email: email.toLowerCase() },
      });

      if (!subscriber) {
        return ctx.notFound('Email not found');
      }

      await strapi.db.query('api::subscriber.subscriber').update({
        where: { id: subscriber.id },
        data: { status: 'unsubscribed' },
      });

      return ctx.send({ success: true, message: 'Successfully unsubscribed' });
    } catch (error) {
      strapi.log.error('Newsletter unsubscribe error:', error);
      return ctx.internalServerError('Unsubscription failed');
    }
  },

  /**
   * Get newsletter stats
   */
  async stats(ctx: Context) {
    try {
      const totalActive = await strapi.db.query('api::subscriber.subscriber').count({
        where: { status: 'active' },
      });

      const totalUnsubscribed = await strapi.db.query('api::subscriber.subscriber').count({
        where: { status: 'unsubscribed' },
      });

      // New subscribers in last 7 days
      const last7d = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const newLast7d = await strapi.db.query('api::subscriber.subscriber').count({
        where: { 
          status: 'active',
          subscribedAt: { $gte: last7d },
        },
      });

      return ctx.send({
        totalActive,
        totalUnsubscribed,
        newLast7d,
        total: totalActive + totalUnsubscribed,
      });
    } catch (error) {
      strapi.log.error('Newsletter stats error:', error);
      return ctx.internalServerError('Failed to get stats');
    }
  },
};
