# Application Deployment Guide

> How to build and deploy Papalote Market to production.

## Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Environment Variables](#environment-variables)
4. [Local Build](#local-build)
5. [Vercel Deployment](#vercel-deployment)
6. [CI/CD Pipeline](#cicd-pipeline)
7. [Database Migration](#database-migration-future)
8. [Monitoring](#monitoring)
9. [Troubleshooting](#troubleshooting)

---

## Overview

Papalote Market is deployed to **Vercel** with automatic deployments on push to `main`. The application uses Next.js 16 App Router with server-side rendering.

### Current Infrastructure

| Service    | URL                                  | Purpose     |
| ---------- | ------------------------------------ | ----------- |
| Production | https://papalotemarket.vercel.app    | Main site   |
| Preview    | https://papalotemarket-\*.vercel.app | PR previews |

---

## Prerequisites

- **Node.js** 20+ (check with `node -v`)
- **npm** 10+ (check with `npm -v`)
- **Vercel CLI** (optional): `npm i -g vercel`
- **Git** configured with GitHub access

---

## Environment Variables

### Required Variables

Create `.env.local` for local development:

```bash
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Papalote Market"

# Analytics (optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Feature Flags
NEXT_PUBLIC_ENABLE_DARK_MODE=true
NEXT_PUBLIC_ENABLE_COMPARISON=true
```

### Vercel Environment Variables

Set in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable               | Production                 | Preview      | Development           |
| ---------------------- | -------------------------- | ------------ | --------------------- |
| `NEXT_PUBLIC_SITE_URL` | https://papalotemarket.com | Auto         | http://localhost:3000 |
| `NEXT_PUBLIC_GA_ID`    | G-PROD123                  | G-PREVIEW456 | -                     |

### Future Variables (Supabase)

```bash
# Database
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJxx...
SUPABASE_SERVICE_ROLE_KEY=eyJxx...

# Authentication
NEXTAUTH_URL=https://papalotemarket.com
NEXTAUTH_SECRET=your-secret-key

# Payments (Stripe)
STRIPE_PUBLIC_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Storage
CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx
```

---

## Local Build

### Development Server

```bash
# Install dependencies
npm install

# Run development server
npm run dev
# Opens at http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server locally
npm start

# Or preview with Vercel CLI
vercel dev
```

### Build Output

```
.next/
├── cache/           # Build cache
├── server/          # Server-side code
├── static/          # Static assets
└── standalone/      # Standalone deployment (if enabled)
```

### Build Checks

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Run tests
npm test

# Full pre-deploy check
npm run build && npm test && npm run lint
```

---

## Vercel Deployment

### Automatic Deployment

1. Push to `main` branch → Production deployment
2. Push to any branch → Preview deployment
3. Create PR → Preview URL in PR comments

### Manual Deployment

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Vercel Configuration

**`vercel.json`**:

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "installCommand": "npm ci",
  "regions": ["iad1"],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/api/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "no-store, max-age=0" }]
    }
  ],
  "redirects": [
    {
      "source": "/productos/:id",
      "destination": "/producto/:id",
      "permanent": true
    }
  ]
}
```

### Custom Domain Setup

1. Go to Vercel Dashboard → Project → Settings → Domains
2. Add `papalotemarket.com` and `www.papalotemarket.com`
3. Configure DNS:

```
Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com
```

4. Enable HTTPS (automatic)

---

## CI/CD Pipeline

### GitHub Actions Workflow

**`.github/workflows/ci.yml`**:

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run linter
        run: npm run lint

  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run type-check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info

  build:
    runs-on: ubuntu-latest
    needs: [lint, type-check, test]
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
```

### Pre-commit Hooks (Optional)

**`.husky/pre-commit`**:

```bash
#!/bin/sh
npm run lint-staged
```

**`package.json`**:

```json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{json,md}": ["prettier --write"]
  }
}
```

---

## Database Migration (Future)

When migrating to Supabase:

### 1. Create Supabase Project

```bash
# Install Supabase CLI
npm install -g supabase

# Initialize
supabase init

# Link to project
supabase link --project-ref your-project-ref
```

### 2. Create Schema

```sql
-- supabase/migrations/001_initial_schema.sql

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  state TEXT NOT NULL,
  maker_id UUID REFERENCES makers(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Products are viewable by everyone"
  ON products FOR SELECT
  USING (true);
```

### 3. Run Migrations

```bash
# Apply migrations
supabase db push

# Generate types
supabase gen types typescript --local > types/supabase.ts
```

### 4. Update API Routes

```typescript
// Before (JSON data)
import productsData from '@/lib/data/products.json';

// After (Supabase)
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);

export async function GET() {
  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, data });
}
```

---

## Monitoring

### Vercel Analytics

Enable in `next.config.js`:

```javascript
module.exports = {
  experimental: {
    instrumentationHook: true,
  },
};
```

### Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
npx @sentry/wizard@latest -i nextjs
```

**`sentry.client.config.ts`**:

```typescript
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  environment: process.env.NODE_ENV,
});
```

### Performance Monitoring

```typescript
// app/layout.tsx
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
```

---

## Troubleshooting

### Build Failures

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript Errors

```bash
# Check types
npm run type-check

# Common fix: regenerate types
rm -rf node_modules/.cache
npm run build
```

### Environment Variable Issues

```bash
# Verify variables are set
vercel env ls

# Pull variables locally
vercel env pull .env.local
```

### Deployment Stuck

1. Check Vercel Dashboard → Deployments → View logs
2. Look for build errors or timeout issues
3. Check function logs for runtime errors

### Cache Issues

```bash
# Clear Vercel cache
vercel --force

# Or in Dashboard: Settings → Advanced → Clear Cache
```

### Memory Issues

Add to `next.config.js`:

```javascript
module.exports = {
  experimental: {
    workerThreads: false,
    cpus: 1,
  },
};
```

---

## Deployment Checklist

Before deploying to production:

- [ ] All tests pass (`npm test`)
- [ ] No lint errors (`npm run lint`)
- [ ] No type errors (`npm run type-check`)
- [ ] Build succeeds (`npm run build`)
- [ ] Environment variables configured in Vercel
- [ ] Database migrations applied (if applicable)
- [ ] Verify preview deployment works
- [ ] Check Core Web Vitals in preview
- [ ] Confirm analytics tracking works

---

_See also: [Documentation Deployment](./DEPLOYMENT.md) | [Contributing](./CONTRIBUTING.md)_
