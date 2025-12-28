/**
 * Custom Comment Controller
 */
import { Context } from 'koa';

export default {
  /**
   * Create a new comment
   */
  async create(ctx: Context) {
    try {
      const { content, authorName, authorEmail, articleId, parentCommentId } = ctx.request.body as {
        content: string;
        authorName: string;
        authorEmail: string;
        articleId: number;
        parentCommentId?: number;
      };

      if (!content || !authorName || !authorEmail || !articleId) {
        return ctx.badRequest('Missing required fields');
      }

      // Validate content length
      if (content.length > 1000) {
        return ctx.badRequest('Comment too long (max 1000 characters)');
      }

      // Basic spam check (simple, can be extended)
      const spamWords = ['spam', 'viagra', 'casino', 'lottery'];
      const hasSpam = spamWords.some(word => content.toLowerCase().includes(word));
      
      const comment = await strapi.db.query('api::comment.comment').create({
        data: {
          content,
          authorName,
          authorEmail,
          article: articleId,
          parentComment: parentCommentId || null,
          status: hasSpam ? 'rejected' : 'pending',
        },
      });

      return ctx.send({
        success: true,
        message: 'Comment submitted for moderation',
        data: {
          id: comment.id,
          content: comment.content,
          authorName: comment.authorName,
          status: comment.status,
        },
      });
    } catch (error) {
      strapi.log.error('Comment create error:', error);
      return ctx.internalServerError('Failed to create comment');
    }
  },

  /**
   * Get approved comments for an article
   */
  async byArticle(ctx: Context) {
    try {
      const { articleId } = ctx.params;
      const { limit = 20, offset = 0 } = ctx.query;

      const comments = await strapi.db.query('api::comment.comment').findMany({
        where: {
          article: articleId,
          status: 'approved',
          parentComment: null, // Top-level comments only
        },
        orderBy: { createdAt: 'desc' },
        limit: Number(limit),
        offset: Number(offset),
      });

      // Get replies for each comment
      const commentsWithReplies = await Promise.all(
        comments.map(async (comment: any) => {
          const replies = await strapi.db.query('api::comment.comment').findMany({
            where: {
              parentComment: comment.id,
              status: 'approved',
            },
            orderBy: { createdAt: 'asc' },
          });

          return {
            id: comment.id,
            content: comment.content,
            authorName: comment.authorName,
            createdAt: comment.createdAt,
            replies: replies.map((reply: any) => ({
              id: reply.id,
              content: reply.content,
              authorName: reply.authorName,
              createdAt: reply.createdAt,
            })),
          };
        })
      );

      const totalCount = await strapi.db.query('api::comment.comment').count({
        where: {
          article: articleId,
          status: 'approved',
          parentComment: null,
        },
      });

      return ctx.send({
        data: commentsWithReplies,
        meta: {
          total: totalCount,
          limit: Number(limit),
          offset: Number(offset),
        },
      });
    } catch (error) {
      strapi.log.error('Comment byArticle error:', error);
      return ctx.internalServerError('Failed to get comments');
    }
  },
};
