# GenTimes CMS

Strapi CMS backend for GenTimes news portal.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run develop
```

## Content Types

| Type | Description |
|------|-------------|
| Article | News articles with rich content |
| Category | Article categories |
| Subscriber | Newsletter subscribers |
| Comment | Article comments |
| PageView | Analytics page views |

## Custom API Endpoints

### Analytics
- `POST /api/analytics/track` - Track page view
- `GET /api/analytics/overview` - Dashboard overview
- `GET /api/analytics/article/:id` - Article stats

### Trending
- `GET /api/trending/list` - List trending articles
- `POST /api/trending/calculate` - Recalculate scores

### SEO
- `GET /api/seo/analyze/:id` - Analyze article SEO
- `GET /api/seo/overview` - Site-wide SEO health

### Newsletter
- `POST /api/newsletter/subscribe` - Subscribe email
- `POST /api/newsletter/unsubscribe` - Unsubscribe

### Comments
- `POST /api/comments/create` - Create comment
- `GET /api/comments/article/:id` - Get article comments

### Related
- `GET /api/related/:id` - Get related articles

## Permissions Setup

After first run, configure public permissions:

1. Go to Settings → Users & Permissions → Roles → Public
2. Enable:
   - Article: find, findOne
   - Category: find, findOne
   - Analytics: track
   - Newsletter: subscribe
   - Comments: create, byArticle
   - Related: getRelated
   - SEO: analyze
   - Trending: list

## Environment Variables

```env
HOST=0.0.0.0
PORT=1337
APP_KEYS=key1,key2,key3,key4
API_TOKEN_SALT=your_salt
ADMIN_JWT_SECRET=your_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_salt
JWT_SECRET=your_jwt_secret
```

## Database

Default: SQLite (stored in `.tmp/data.db`)

For production, configure PostgreSQL or MySQL in `config/database.ts`.
