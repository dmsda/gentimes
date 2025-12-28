# CMS Overview & Workflow

## Strapi Configuration

GenTimes uses **Strapi v5** as the core content engine. It is configured to be **Headless**, **Stateless** (for easy containerization), and **Extensible**.

## Content Schema

### 1. User Facing Types

| Collection | Description | Key Fields |
|------------|-------------|------------|
| **Article** | Main content unit | `title`, `slug`, `content` (Blocks), `seoScore`, `trendingScore` |
| **Category** | Topic classification | `name`, `slug`, `color` (Hex) |
| **Comment** | User engagement | `content`, `authorName`, `isApproved`, `threadId` |

### 2. Internal / System Types

| Collection | Description | Purpose |
|------------|-------------|---------|
| **PageView** | Analytics data | Tracks views per article/day for trending calculation |
| **Subscriber** | Email list | Stores active/unsubbed newsletter users |

## Custom Functionality

### 🚀 Trending Engine
- **Location**: `/src/api/trending`
- **Logic**: A simplified gravity algorithm runs hourly via Cron.
- **Formula**: `Score = (Views * RecencyWeight) + (Comments * 2)`
- **Output**: Updates `isTrending` boolean on Article.

### 📊 Analytics
- **Location**: `/src/api/analytics`
- **Privacy**: Does **not** store IP addresses. Stores a daily-rotated hash of User-Agent + IP for unique visitor counting without PII retention.

### 🖼️ Image Pipeline
- **Upload**: Triggered on media upload.
- **Processing**: Uses `sharp` to detect PNG/JPG.
- **Conversion**: Automatically converts to WebP.
- **Resizing**: Generates `thumbnail`, `small`, `medium`, `large` breakpoints.

## Editorial Workflow

1. **Drafting**: Writers create content in "Draft" state.
2. **SEO Check**: "AI Readiness" score updates in real-time.
3. **Review**: Editor reviews content and SEO score.
4. **Publish**: State changed to "Published".
   - Webhook fires to revalidate Next.js cache.
   - Article appears in "Latest" immediately.
   - Sitemap updates automatically.
