/**
 * Analytics Tracking Client
 * 
 * Privacy-friendly, no-cookie analytics tracking.
 * Tracks page views server-side for accurate analytics.
 */

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';

type ReferrerType = 'search' | 'social' | 'direct' | 'referral';
type DeviceType = 'mobile' | 'desktop' | 'tablet';

/**
 * Parse referrer URL to determine traffic source
 */
function parseReferrer(referer: string | null): ReferrerType {
  if (!referer) return 'direct';
  
  const url = referer.toLowerCase();
  
  // Search engines
  if (url.includes('google.') || url.includes('bing.') || 
      url.includes('yahoo.') || url.includes('duckduckgo.') ||
      url.includes('baidu.') || url.includes('yandex.')) {
    return 'search';
  }
  
  // Social media
  if (url.includes('facebook.') || url.includes('twitter.') || 
      url.includes('instagram.') || url.includes('linkedin.') ||
      url.includes('tiktok.') || url.includes('youtube.') ||
      url.includes('reddit.') || url.includes('t.co')) {
    return 'social';
  }
  
  // Check if it's the same domain (direct)
  if (url.includes('localhost') || url.includes('gentimes')) {
    return 'direct';
  }
  
  return 'referral';
}

/**
 * Parse user agent to determine device type
 */
function parseDevice(userAgent: string | null): DeviceType {
  if (!userAgent) return 'desktop';
  
  const ua = userAgent.toLowerCase();
  
  if (/mobile|android|iphone|ipad|ipod|blackberry|windows phone/i.test(ua)) {
    if (/ipad|tablet/i.test(ua)) {
      return 'tablet';
    }
    return 'mobile';
  }
  
  return 'desktop';
}

/**
 * Track a page view for an article
 * Call this from server components or API routes
 */
export async function trackPageView(
  articleId: string,
  headers: Headers
): Promise<boolean> {
  try {
    const referer = headers.get('referer');
    const userAgent = headers.get('user-agent');

    // Fire and forget - don't await response body to keep it fast
    await fetch(`${STRAPI_URL}/api/analytics/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        articleId,
        referrer: parseReferrer(referer),
        device: parseDevice(userAgent),
      }),
      cache: 'no-store',
    });

    return true;
  } catch (error) {
    // Analytics failures should never crash the app
    // console.warn('Analytics tracking skipped');
    return false;
  }
}

/**
 * Get analytics overview
 */
export async function getAnalyticsOverview(): Promise<{
  views: { last24h: number; last7d: number; last30d: number };
  uniqueVisitors: { last24h: number };
  totalArticles: number;
  totalSubscribers: number;
} | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/analytics/overview`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Failed to get analytics overview:', error);
    return null;
  }
}

/**
 * Get trending articles
 */
export async function getTrendingArticles(): Promise<any[]> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/analytics/trending`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) return [];
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Failed to get trending articles:', error);
    return [];
  }
}

/**
 * Get stats for a specific article
 */
export async function getArticleStats(articleId: string): Promise<{
  totalViews: number;
  views24h: number;
  views7d: number;
  trendingScore: number;
} | null> {
  try {
    const response = await fetch(`${STRAPI_URL}/api/analytics/article/${articleId}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error('Failed to get article stats:', error);
    return null;
  }
}
