# System Architecture

## Overview

GenTimes follows a **Modern Headless CMS Architecture**, decoupling the frontend presentation layer from the backend content management system. This ensures scalability, security, and flexibility for multi-platform delivery.

```mermaid
graph TD
    User[End User] -->|HTTPS| CDN[Edge CDN / Vercel]
    CDN -->|Next.js App Router| Frontend[Frontend (Next.js)]
    
    subgraph Frontend Layer
        Frontend -->|Server Components| DataLayer[Data Abstraction Layer]
        DataLayer -->|REST API| CMS[Strapi CMS]
        Frontend -->|Client Interactions| Comments[Comment System]
        Frontend -->|Form Submission| Newsletter[Newsletter Service]
    end
    
    subgraph Backend Layer
        CMS -->|SQLite/Postgres| DB[(Database)]
        CMS -->|Auth| Admin[Admin Dashboard]
        CMS -->|Cron Jobs| Trending[Trending Engine]
    end
```

## Frontend (Next.js)

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Rendering**: 
  - **Server Components (RSC)**: Used for 95% of content (Articles, Listings).
  - **Client Components**: Used only for interactivity (Search, Forms, Toggles).
- **Caching**: 
  - **Data Cache**: Request deduplication and persistence.
  - **Full Route Cache**: Static page generation at build time.
  - **Router Cache**: Client-side navigation cache.

## Backend (Strapi CMS)

- **Core**: Strapi v5 (Headless CMS)
- **Database**: SQLite (Development), PostgreSQL (Production/Staging).
- **Customization**:
  - Custom API endpoints for specific business logic (Trending, Analytics).
  - Lifecycle hooks for automated tasks (Image optimization).
  - Cron jobs for periodic data processing.

## Key Design Patterns

### 1. The "BFF" Pattern (Backend for Frontend) via Next.js
We don't expose Strapi directly to the public. Next.js APIs (`/src/app/api/*`) act as a proxy/gateway, adding:
- Rate limiting
- Input validation (Zod)
- Type safety
- Error handling
- Caching control

### 2. Privacy-First Analytics
Instead of heavy third-party scripts (GA4), we use a custom, lightweight tracking system:
- **No Cookies**: Uses session hashes.
- **Server-side Processing**: Tracking requests are processed asynchronously.
- **Data Ownership**: All data stays within the self-hosted database.

### 3. Progressive Enhancement
- The site works without JavaScript (content is visible).
- Interactive features (Comments, Search) hydrate only when needed.
- CSS handles all layout and visual states.
