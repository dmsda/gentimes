'use client';

import { useState, useEffect } from 'react';

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

// Status color classes
const statusColors = {
  good: 'text-green-500',
  warning: 'text-yellow-500',
  bad: 'text-red-500',
};

const statusIcons = {
  good: '✓',
  warning: '!',
  bad: '✕',
};

const scoreBgColors = {
  good: 'bg-green-500',
  warning: 'bg-yellow-500',
  bad: 'bg-red-500',
};

function getScoreStatus(score: number): 'good' | 'warning' | 'bad' {
  if (score >= 70) return 'good';
  if (score >= 40) return 'warning';
  return 'bad';
}

interface SEOScoreCircleProps {
  score: number;
  label: string;
  size?: 'sm' | 'md';
}

/**
 * Circular score indicator
 */
export function SEOScoreCircle({ score, label, size = 'md' }: SEOScoreCircleProps) {
  const status = getScoreStatus(score);
  const sizeClasses = size === 'sm' ? 'h-16 w-16 text-lg' : 'h-20 w-20 text-xl';

  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`relative flex items-center justify-center rounded-full ${sizeClasses} ${scoreBgColors[status]}`}>
        <span className="font-bold text-white">{score}</span>
      </div>
      <span className="text-xs text-neutral-400">{label}</span>
    </div>
  );
}

interface SEOChecklistProps {
  checks: SEOCheck[];
  category: 'seo' | 'readability' | 'ai';
  title: string;
}

/**
 * Checklist section for a category
 */
export function SEOChecklist({ checks, category, title }: SEOChecklistProps) {
  const categoryChecks = checks.filter(c => c.category === category);

  return (
    <div className="mb-4">
      <h4 className="mb-2 text-sm font-semibold uppercase tracking-wider text-neutral-500">
        {title}
      </h4>
      <ul className="space-y-1">
        {categoryChecks.map(check => (
          <li key={check.id} className="flex items-start gap-2 text-sm">
            <span className={`mt-0.5 ${statusColors[check.status]}`}>
              {statusIcons[check.status]}
            </span>
            <span className={check.status === 'good' ? 'text-neutral-300' : 'text-neutral-400'}>
              {check.message}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SEOSnippetPreviewProps {
  title: string;
  description: string;
  url: string;
}

/**
 * Google-style snippet preview
 */
export function SEOSnippetPreview({ title, description, url }: SEOSnippetPreviewProps) {
  const truncatedTitle = title.length > 60 ? title.substring(0, 57) + '...' : title;
  const truncatedDesc = description.length > 160 ? description.substring(0, 157) + '...' : description;

  return (
    <div className="rounded-lg border border-neutral-700 bg-white p-4">
      <p className="mb-1 text-sm text-green-700 truncate">{url}</p>
      <h3 className="mb-1 text-lg font-medium text-blue-700 hover:underline cursor-pointer">
        {truncatedTitle}
      </h3>
      <p className="text-sm text-neutral-600 line-clamp-2">{truncatedDesc}</p>
    </div>
  );
}

interface SEOPanelProps {
  articleId: string;
  title: string;
  seoTitle?: string;
  description: string;
  slug: string;
  siteUrl?: string;
}

/**
 * Full SEO Panel component
 */
export function SEOPanel({ 
  articleId, 
  title, 
  seoTitle, 
  description, 
  slug,
  siteUrl = 'https://gentimes.com'
}: SEOPanelProps) {
  const [analysis, setAnalysis] = useState<SEOAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const response = await fetch(`/api/seo/${articleId}`);
        if (response.ok) {
          const data = await response.json();
          setAnalysis(data);
        }
      } catch (error) {
        console.error('Failed to fetch SEO analysis:', error);
      } finally {
        setLoading(false);
      }
    }

    if (articleId) {
      fetchAnalysis();
    }
  }, [articleId]);

  if (loading) {
    return (
      <div className="rounded-lg border border-neutral-800 bg-neutral-900 p-4">
        <div className="animate-pulse">
          <div className="h-4 w-24 bg-neutral-800 rounded mb-4"></div>
          <div className="flex gap-4 justify-center">
            <div className="h-20 w-20 bg-neutral-800 rounded-full"></div>
            <div className="h-20 w-20 bg-neutral-800 rounded-full"></div>
            <div className="h-20 w-20 bg-neutral-800 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  const displayTitle = seoTitle || title;
  const articleUrl = `${siteUrl}/article/${slug}`;

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900">
      {/* Header */}
      <div className="border-b border-neutral-800 px-4 py-3">
        <h3 className="font-semibold text-white">SEO Analysis</h3>
      </div>

      {/* Scores */}
      <div className="border-b border-neutral-800 p-4">
        <div className="flex justify-center gap-6">
          <SEOScoreCircle score={analysis?.seoScore || 0} label="SEO" />
          <SEOScoreCircle score={analysis?.readabilityScore || 0} label="Readability" />
          <SEOScoreCircle score={analysis?.aiReadinessScore || 0} label="AI Ready" />
        </div>
      </div>

      {/* Snippet Preview */}
      <div className="border-b border-neutral-800 p-4">
        <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-neutral-500">
          Google Preview
        </h4>
        <SEOSnippetPreview 
          title={displayTitle} 
          description={description} 
          url={articleUrl} 
        />
      </div>

      {/* Checklists */}
      {analysis && (
        <div className="p-4">
          <SEOChecklist checks={analysis.checks} category="seo" title="SEO" />
          <SEOChecklist checks={analysis.checks} category="readability" title="Readability" />
          <SEOChecklist checks={analysis.checks} category="ai" title="AI Overview Ready" />
        </div>
      )}
    </div>
  );
}

interface SEOBadgeProps {
  score: number;
}

/**
 * Compact SEO badge for article lists
 */
export function SEOBadge({ score }: SEOBadgeProps) {
  const status = getScoreStatus(score);

  return (
    <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${scoreBgColors[status]} text-white`}>
      SEO: {score}
    </span>
  );
}

interface SEOStatusDotProps {
  score: number;
}

/**
 * Minimal status dot
 */
export function SEOStatusDot({ score }: SEOStatusDotProps) {
  const status = getScoreStatus(score);
  const colors = {
    good: 'bg-green-500',
    warning: 'bg-yellow-500',
    bad: 'bg-red-500',
  };

  return (
    <span className={`inline-block h-2 w-2 rounded-full ${colors[status]}`} title={`SEO Score: ${score}`} />
  );
}
