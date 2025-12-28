/**
 * SEO Analysis Controller
 * 
 * Provides Yoast-like SEO analysis for articles.
 */
import { Context } from 'koa';

interface SEOCheck {
  id: string;
  category: 'seo' | 'readability' | 'ai';
  status: 'good' | 'warning' | 'bad';
  message: string;
}

interface SEOAnalysis {
  seoScore: number;
  readabilityScore: number;
  aiReadinessScore: number;
  checks: SEOCheck[];
}

/**
 * Analyze SEO quality of an article
 */
function analyzeArticle(article: {
  title: string;
  seoTitle?: string;
  excerpt: string;
  seoDescription?: string;
  body: string;
  focusKeyphrase?: string;
}): SEOAnalysis {
  const checks: SEOCheck[] = [];
  let seoPoints = 0;
  let readabilityPoints = 0;
  let aiPoints = 0;

  const title = article.seoTitle || article.title || '';
  const description = article.seoDescription || article.excerpt || '';
  const keyphrase = (article.focusKeyphrase || '').toLowerCase();
  const body = article.body || '';

  // ========================================
  // SEO CHECKS (40 points max)
  // ========================================

  // Title length (10 points)
  if (title.length >= 50 && title.length <= 60) {
    seoPoints += 10;
    checks.push({ id: 'title-length', category: 'seo', status: 'good', message: `Title length is optimal (${title.length} chars)` });
  } else if (title.length >= 30 && title.length <= 70) {
    seoPoints += 5;
    checks.push({ id: 'title-length', category: 'seo', status: 'warning', message: `Title could be improved (${title.length} chars, ideal: 50-60)` });
  } else {
    checks.push({ id: 'title-length', category: 'seo', status: 'bad', message: `Title is ${title.length < 30 ? 'too short' : 'too long'} (${title.length} chars)` });
  }

  // Meta description length (10 points)
  if (description.length >= 150 && description.length <= 160) {
    seoPoints += 10;
    checks.push({ id: 'meta-length', category: 'seo', status: 'good', message: `Meta description is optimal (${description.length} chars)` });
  } else if (description.length >= 120 && description.length <= 200) {
    seoPoints += 5;
    checks.push({ id: 'meta-length', category: 'seo', status: 'warning', message: `Meta description could be improved (${description.length} chars)` });
  } else {
    checks.push({ id: 'meta-length', category: 'seo', status: 'bad', message: `Meta description is ${description.length < 120 ? 'too short' : 'too long'}` });
  }

  // Focus keyphrase checks
  if (keyphrase) {
    // In title
    if (title.toLowerCase().includes(keyphrase)) {
      seoPoints += 10;
      checks.push({ id: 'keyphrase-title', category: 'seo', status: 'good', message: 'Focus keyphrase in title ✓' });
    } else {
      checks.push({ id: 'keyphrase-title', category: 'seo', status: 'warning', message: 'Add focus keyphrase to title' });
    }

    // In meta description
    if (description.toLowerCase().includes(keyphrase)) {
      seoPoints += 10;
      checks.push({ id: 'keyphrase-meta', category: 'seo', status: 'good', message: 'Focus keyphrase in meta ✓' });
    } else {
      checks.push({ id: 'keyphrase-meta', category: 'seo', status: 'warning', message: 'Add focus keyphrase to meta description' });
    }
  } else {
    checks.push({ id: 'keyphrase-missing', category: 'seo', status: 'warning', message: 'No focus keyphrase set' });
  }

  // ========================================
  // READABILITY CHECKS (30 points max)
  // ========================================

  const sentences = body.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const paragraphs = body.split(/\n\n+/).filter(p => p.trim().length > 0);
  const words = body.split(/\s+/).filter(w => w.length > 0);

  // Average sentence length
  const avgSentenceLength = words.length / Math.max(sentences.length, 1);
  if (avgSentenceLength <= 20) {
    readabilityPoints += 15;
    checks.push({ id: 'sentence-length', category: 'readability', status: 'good', message: `Sentence length good (${avgSentenceLength.toFixed(0)} words avg)` });
  } else if (avgSentenceLength <= 25) {
    readabilityPoints += 8;
    checks.push({ id: 'sentence-length', category: 'readability', status: 'warning', message: `Sentences slightly long (${avgSentenceLength.toFixed(0)} words)` });
  } else {
    checks.push({ id: 'sentence-length', category: 'readability', status: 'bad', message: 'Sentences too long, consider breaking up' });
  }

  // Paragraph length
  const avgParagraphLength = words.length / Math.max(paragraphs.length, 1);
  if (avgParagraphLength <= 100) {
    readabilityPoints += 15;
    checks.push({ id: 'paragraph-length', category: 'readability', status: 'good', message: 'Paragraphs well-structured' });
  } else if (avgParagraphLength <= 150) {
    readabilityPoints += 8;
    checks.push({ id: 'paragraph-length', category: 'readability', status: 'warning', message: 'Some paragraphs could be shorter' });
  } else {
    checks.push({ id: 'paragraph-length', category: 'readability', status: 'bad', message: 'Paragraphs too long' });
  }

  // ========================================
  // AI READINESS CHECKS (30 points max)
  // ========================================

  // Subheadings present
  const hasH2 = /##\s/.test(body) || /<h2/i.test(body);
  if (hasH2) {
    aiPoints += 10;
    checks.push({ id: 'subheadings', category: 'ai', status: 'good', message: 'Subheadings present ✓' });
  } else {
    checks.push({ id: 'subheadings', category: 'ai', status: 'warning', message: 'Add H2 subheadings for better structure' });
  }

  // Clear intro
  const firstParagraph = paragraphs[0] || '';
  const firstParagraphWords = firstParagraph.split(/\s+/).length;
  if (firstParagraphWords > 0 && firstParagraphWords <= 100) {
    aiPoints += 10;
    checks.push({ id: 'clear-intro', category: 'ai', status: 'good', message: 'Intro is concise ✓' });
  } else if (firstParagraphWords > 100) {
    checks.push({ id: 'clear-intro', category: 'ai', status: 'warning', message: 'Intro too long (keep under 100 words)' });
  }

  // Bullet points
  const hasBullets = /^[-*]\s/m.test(body) || /<li/i.test(body);
  if (hasBullets) {
    aiPoints += 10;
    checks.push({ id: 'bullet-points', category: 'ai', status: 'good', message: 'Bullet points found ✓' });
  } else {
    checks.push({ id: 'bullet-points', category: 'ai', status: 'warning', message: 'Consider adding bullet points' });
  }

  // Calculate final scores
  const seoScore = Math.min(100, Math.round((seoPoints / 40) * 100));
  const readabilityScore = Math.min(100, Math.round((readabilityPoints / 30) * 100));
  const aiReadinessScore = Math.min(100, Math.round((aiPoints / 30) * 100));

  return { seoScore, readabilityScore, aiReadinessScore, checks };
}

export default {
  /**
   * Analyze a single article
   */
  async analyze(ctx: Context) {
    try {
      const { id } = ctx.params;

      const article = await strapi.db.query('api::article.article').findOne({
        where: { id },
      });

      if (!article) {
        return ctx.notFound('Article not found');
      }

      const analysis = analyzeArticle(article);

      return ctx.send({
        articleId: id,
        title: article.title,
        ...analysis,
      });
    } catch (error) {
      strapi.log.error('SEO analyze error:', error);
      return ctx.internalServerError('Failed to analyze');
    }
  },

  /**
   * Get SEO overview for all articles
   */
  async overview(ctx: Context) {
    try {
      const articles = await strapi.db.query('api::article.article').findMany({
        where: { publishedAt: { $ne: null } },
      });

      let totalSeoScore = 0;
      let optimizedCount = 0;
      let needsImprovementCount = 0;
      let poorCount = 0;

      for (const article of articles) {
        const score = article.seoScore || 0;
        totalSeoScore += score;

        if (score >= 70) optimizedCount++;
        else if (score >= 40) needsImprovementCount++;
        else poorCount++;
      }

      const avgScore = articles.length > 0 ? Math.round(totalSeoScore / articles.length) : 0;

      return ctx.send({
        totalArticles: articles.length,
        averageSeoScore: avgScore,
        optimizedPercent: Math.round((optimizedCount / Math.max(articles.length, 1)) * 100),
        breakdown: {
          optimized: optimizedCount,
          needsImprovement: needsImprovementCount,
          poor: poorCount,
        },
      });
    } catch (error) {
      strapi.log.error('SEO overview error:', error);
      return ctx.internalServerError('Failed to get overview');
    }
  },

  /**
   * Get articles list with SEO scores
   */
  async articlesList(ctx: Context) {
    try {
      const articles = await strapi.db.query('api::article.article').findMany({
        where: { publishedAt: { $ne: null } },
        orderBy: { seoScore: 'asc' },
        populate: ['categories'],
      });

      const list = articles.map((article: any) => ({
        id: article.id,
        title: article.title,
        slug: article.slug,
        category: article.categories?.[0]?.name || 'Uncategorized',
        seoScore: article.seoScore || 0,
        readabilityScore: article.readabilityScore || 0,
        aiReadinessScore: article.aiReadinessScore || 0,
        publishedAt: article.publishedAt,
      }));

      return ctx.send({ data: list });
    } catch (error) {
      strapi.log.error('SEO articles list error:', error);
      return ctx.internalServerError('Failed to get articles');
    }
  },

  /**
   * Update SEO scores for an article
   */
  async updateScores(ctx: Context) {
    try {
      const { id } = ctx.params;

      const article = await strapi.db.query('api::article.article').findOne({
        where: { id },
      });

      if (!article) {
        return ctx.notFound('Article not found');
      }

      const analysis = analyzeArticle(article);

      await strapi.db.query('api::article.article').update({
        where: { id },
        data: {
          seoScore: analysis.seoScore,
          readabilityScore: analysis.readabilityScore,
          aiReadinessScore: analysis.aiReadinessScore,
        },
      });

      return ctx.send({ success: true, ...analysis });
    } catch (error) {
      strapi.log.error('SEO update scores error:', error);
      return ctx.internalServerError('Failed to update scores');
    }
  },
};
