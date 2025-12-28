/**
 * SEO Analyzer
 * 
 * Analyzes article content for SEO quality, readability, and AI readiness.
 * Similar to Yoast SEO Premium but open-source.
 */

export interface SEOAnalysis {
  seoScore: number;
  readabilityScore: number;
  aiReadinessScore: number;
  checks: SEOCheck[];
}

export interface SEOCheck {
  id: string;
  category: 'seo' | 'readability' | 'ai';
  status: 'good' | 'warning' | 'bad';
  message: string;
}

/**
 * Analyze SEO quality of an article
 */
export function analyzeSEO(article: {
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

  const title = article.seoTitle || article.title;
  const description = article.seoDescription || article.excerpt;
  const keyphrase = article.focusKeyphrase?.toLowerCase() || '';
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
    checks.push({ id: 'title-length', category: 'seo', status: 'warning', message: `Title length could be improved (${title.length} chars, ideal: 50-60)` });
  } else {
    checks.push({ id: 'title-length', category: 'seo', status: 'bad', message: `Title length is ${title.length < 30 ? 'too short' : 'too long'} (${title.length} chars)` });
  }

  // Meta description length (10 points)
  if (description.length >= 150 && description.length <= 160) {
    seoPoints += 10;
    checks.push({ id: 'meta-length', category: 'seo', status: 'good', message: `Meta description is optimal (${description.length} chars)` });
  } else if (description.length >= 120 && description.length <= 200) {
    seoPoints += 5;
    checks.push({ id: 'meta-length', category: 'seo', status: 'warning', message: `Meta description could be improved (${description.length} chars, ideal: 150-160)` });
  } else {
    checks.push({ id: 'meta-length', category: 'seo', status: 'bad', message: `Meta description is ${description.length < 120 ? 'too short' : 'too long'}` });
  }

  // Focus keyphrase in title (10 points)
  if (keyphrase && title.toLowerCase().includes(keyphrase)) {
    seoPoints += 10;
    checks.push({ id: 'keyphrase-title', category: 'seo', status: 'good', message: 'Focus keyphrase appears in title' });
  } else if (keyphrase) {
    checks.push({ id: 'keyphrase-title', category: 'seo', status: 'warning', message: 'Focus keyphrase not found in title' });
  }

  // Keyphrase in meta description (10 points)
  if (keyphrase && description.toLowerCase().includes(keyphrase)) {
    seoPoints += 10;
    checks.push({ id: 'keyphrase-meta', category: 'seo', status: 'good', message: 'Focus keyphrase appears in meta description' });
  } else if (keyphrase) {
    checks.push({ id: 'keyphrase-meta', category: 'seo', status: 'warning', message: 'Focus keyphrase not found in meta description' });
  }

  // ========================================
  // READABILITY CHECKS (30 points max)
  // ========================================

  const sentences = body.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const paragraphs = body.split(/\n\n+/).filter(p => p.trim().length > 0);
  const words = body.split(/\s+/).filter(w => w.length > 0);

  // Average sentence length (15 points)
  const avgSentenceLength = words.length / Math.max(sentences.length, 1);
  if (avgSentenceLength <= 20) {
    readabilityPoints += 15;
    checks.push({ id: 'sentence-length', category: 'readability', status: 'good', message: `Average sentence length is good (${avgSentenceLength.toFixed(1)} words)` });
  } else if (avgSentenceLength <= 25) {
    readabilityPoints += 8;
    checks.push({ id: 'sentence-length', category: 'readability', status: 'warning', message: `Sentences are slightly long (${avgSentenceLength.toFixed(1)} words, ideal: <20)` });
  } else {
    checks.push({ id: 'sentence-length', category: 'readability', status: 'bad', message: `Sentences are too long (${avgSentenceLength.toFixed(1)} words)` });
  }

  // Paragraph length (15 points)
  const avgParagraphLength = words.length / Math.max(paragraphs.length, 1);
  if (avgParagraphLength <= 100) {
    readabilityPoints += 15;
    checks.push({ id: 'paragraph-length', category: 'readability', status: 'good', message: 'Paragraphs are well-structured' });
  } else if (avgParagraphLength <= 150) {
    readabilityPoints += 8;
    checks.push({ id: 'paragraph-length', category: 'readability', status: 'warning', message: 'Some paragraphs could be shorter for better readability' });
  } else {
    checks.push({ id: 'paragraph-length', category: 'readability', status: 'bad', message: 'Paragraphs are too long, consider breaking them up' });
  }

  // ========================================
  // AI READINESS CHECKS (30 points max)
  // ========================================

  // Subheadings present (10 points)
  const hasH2 = /##\s/.test(body) || /<h2/i.test(body);
  if (hasH2) {
    aiPoints += 10;
    checks.push({ id: 'subheadings', category: 'ai', status: 'good', message: 'Subheadings present for better structure' });
  } else {
    checks.push({ id: 'subheadings', category: 'ai', status: 'warning', message: 'Add subheadings (H2) to improve content structure' });
  }

  // Clear intro (first paragraph under 100 words) (10 points)
  const firstParagraph = paragraphs[0] || '';
  const firstParagraphWords = firstParagraph.split(/\s+/).length;
  if (firstParagraphWords > 0 && firstParagraphWords <= 100) {
    aiPoints += 10;
    checks.push({ id: 'clear-intro', category: 'ai', status: 'good', message: 'Introduction is concise and scannable' });
  } else if (firstParagraphWords > 100) {
    checks.push({ id: 'clear-intro', category: 'ai', status: 'warning', message: 'First paragraph is too long, keep it under 100 words' });
  }

  // Bullet points present (10 points)
  const hasBullets = /^[-*]\s/m.test(body) || /<li/i.test(body);
  if (hasBullets) {
    aiPoints += 10;
    checks.push({ id: 'bullet-points', category: 'ai', status: 'good', message: 'Bullet points found for easy scanning' });
  } else {
    checks.push({ id: 'bullet-points', category: 'ai', status: 'warning', message: 'Consider adding bullet points for key information' });
  }

  // ========================================
  // CALCULATE FINAL SCORES
  // ========================================

  const seoScore = Math.min(100, Math.round((seoPoints / 40) * 100));
  const readabilityScore = Math.min(100, Math.round((readabilityPoints / 30) * 100));
  const aiReadinessScore = Math.min(100, Math.round((aiPoints / 30) * 100));

  return {
    seoScore,
    readabilityScore,
    aiReadinessScore,
    checks,
  };
}

/**
 * Get overall score color
 */
export function getScoreColor(score: number): 'green' | 'yellow' | 'red' {
  if (score >= 70) return 'green';
  if (score >= 40) return 'yellow';
  return 'red';
}

/**
 * Get score label
 */
export function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent';
  if (score >= 60) return 'Good';
  if (score >= 40) return 'Needs improvement';
  return 'Poor';
}
