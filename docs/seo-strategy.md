# SEO Strategy 2026: AI Overview Optimized

## Philosophy

Search in 2026 is dominated by **AI Overviews** (SGE) and Direct Answers. Traditional "10 blue links" are secondary. Our strategy focuses on becoming the **primary citation source** for LLMs (Large Language Models).

## 1. Information Density & Structure

AI models prioritize content that is structurally clear and fact-dense.

- **Semantic HTML**: We use strict `<article>`, `<main>`, `<aside>`, `<header>` tags.
- **Direct Answers**: Every article starts with a direct, concise summary ("Key Takeaways") that directly answers the user's intent.
- **Table of Contents**: Auto-generated to help bots understand document structure.

## 2. Technical SEO

### Core Web Vitals
- **LCP < 1.2s**: Critical for mobile ranking.
- **CLS 0**: Stability prevents reading disruption.
- **INP < 200ms**: Responsiveness for user retention.

### Meta Tags Strategy
- **Titles**: Front-loaded with keywords, max 60 chars.
- **Descriptions**: Natural language summaries, max 160 chars.
- **Open Graph**: Optimized images (1200x630) with overlay text for social visibility.

### Structured Data (JSON-LD)
We implement a rich graph of connected entities:

```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Article Title",
  "author": { "@type": "Organization", "name": "GenTimes" },
  "publisher": { "@type": "Organization", "name": "GenTimes" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "URL" },
  "datePublished": "ISO-8601",
  "dateModified": "ISO-8601"
}
```

## 3. The "AI Readiness" Score

Our custom CMS plugin analyzes content against "AI Readiness" criteria:
1. **Reading Level**: Flesch-Kincaid Grade 8-10 (Optimal for broad understanding).
2. **Entity Density**: Presence of recognized named entities (People, Places, Technologies).
3. **Citation Quality**: External links to authoritative sources (Scientific papers, Official documentation).
4. **Sentiment Analysis**: Neutral, objective tone (Favored by news algorithms).

## 4. Discovery Channels

- **Google News**: Specialized Sitemap (`news-sitemap.xml`) for articles < 48h old.
- **Discover**: High-quality (1200px+) images to qualify for Google Discover feeds.
- **Social**: Twitter Cards and OG Tags for viral loops.
