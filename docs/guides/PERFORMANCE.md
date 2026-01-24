# Performance Guide

> Optimization strategies and best practices for Papalote Market.

## Table of Contents

1. [Overview](#overview)
2. [Core Web Vitals](#core-web-vitals)
3. [Image Optimization](#image-optimization)
4. [Code Splitting](#code-splitting)
5. [Caching Strategies](#caching-strategies)
6. [Bundle Optimization](#bundle-optimization)
7. [Rendering Strategies](#rendering-strategies)
8. [Data Fetching](#data-fetching)
9. [Component Optimization](#component-optimization)
10. [Monitoring & Profiling](#monitoring--profiling)

---

## Overview

Papalote Market performance metrics (measured January 2026 via Lighthouse):

| Metric                         | Target  | Current | Status |
| ------------------------------ | ------- | ------- | ------ |
| Performance Score              | > 90    | 96      | ✅     |
| LCP (Largest Contentful Paint) | < 2.5s  | 2.7s    | ⚠️     |
| FCP (First Contentful Paint)   | < 1.8s  | 1.2s    | ✅     |
| TBT (Total Blocking Time)      | < 200ms | 10ms    | ✅     |
| CLS (Cumulative Layout Shift)  | < 0.1   | 0       | ✅     |
| TTI (Time to Interactive)      | < 3.5s  | 3.3s    | ✅     |
| Speed Index                    | < 3.0s  | ~2.5s   | ✅     |
| Total Page Weight              | < 500KB | 1,233KB | ⚠️     |

### Recent Optimizations (January 2026)

1. **HeroSlider**: Only render current/adjacent slide images (reduced initial load from 4 to 1 image)
2. **Lazy Loading**: Below-fold sections loaded via `next/dynamic` with Suspense
3. **Image Optimization**: Reduced Unsplash image sizes, added proper `sizes` props
4. **Result**: Performance score improved from 71 → 96 (+35%)

### Remaining Improvements

1. **LCP (2.7s → < 2.5s)**: Consider local hero images or CDN with better caching
2. **Page Weight (1.2MB)**: Compress/optimize images further, audit third-party scripts

### What's Working Well

- **TBT (10ms)**: Excellent - minimal JavaScript blocking
- **CLS (0)**: Perfect - no layout shifts
- **FCP (1.2s)**: Fast first paint
- **TTI (3.3s)**: Good time to interactive

---

## Core Web Vitals

### LCP (Largest Contentful Paint)

Optimize the largest visible element (usually hero image or main content):

```tsx
// Preload critical images
<Head>
  <link
    rel="preload"
    href="/hero-image.webp"
    as="image"
    type="image/webp"
  />
</Head>

// Priority loading for above-the-fold images
<Image
  src="/hero.webp"
  alt="Hero"
  priority
  sizes="100vw"
/>
```

### FID (First Input Delay)

Minimize JavaScript blocking time:

```tsx
// Bad: Heavy computation on mount
useEffect(() => {
  const result = expensiveCalculation(data); // Blocks main thread
  setResult(result);
}, []);

// Good: Defer non-critical work
useEffect(() => {
  const id = requestIdleCallback(() => {
    const result = expensiveCalculation(data);
    setResult(result);
  });
  return () => cancelIdleCallback(id);
}, []);

// Good: Use Web Worker for heavy tasks
const worker = new Worker('/workers/calculation.js');
worker.postMessage(data);
worker.onmessage = (e) => setResult(e.data);
```

### CLS (Cumulative Layout Shift)

Prevent layout shifts:

```tsx
// Always set dimensions for images
<Image
  src="/product.jpg"
  width={400}
  height={300}
  alt="Product"
/>

// Reserve space for dynamic content
<div className="min-h-[200px]">
  {isLoading ? <Skeleton /> : <Content />}
</div>

// Use aspect-ratio for responsive images
<div className="aspect-video relative">
  <Image src="/video-thumb.jpg" fill alt="Video" />
</div>
```

---

## Image Optimization

### Next.js Image Component

Always use the Next.js Image component:

```tsx
import Image from 'next/image';

// Local images (automatic optimization)
<Image
  src="/products/alebrije.jpg"
  alt="Alebrije colorido"
  width={800}
  height={600}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Remote images (configure domains)
<Image
  src="https://storage.papalote.com/image.jpg"
  alt="Product"
  fill
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### Configuration

**`next.config.js`**:

```javascript
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.papalote.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

### Responsive Images

```tsx
// Product grid card
<Image
  src={product.image}
  alt={product.name}
  fill
  sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         25vw"
  className="object-cover"
/>

// Hero image
<Image
  src="/hero.webp"
  alt="Hero"
  fill
  priority
  sizes="100vw"
  quality={85}
/>
```

### Lazy Loading

```tsx
// Default: Images lazy load automatically
<Image src="/product.jpg" alt="Product" />

// Explicit lazy loading for below-fold content
<Image
  src="/product.jpg"
  alt="Product"
  loading="lazy"
/>

// Priority for above-the-fold
<Image
  src="/hero.jpg"
  alt="Hero"
  priority // Disables lazy loading
/>
```

---

## Code Splitting

### Dynamic Imports

Split large components that aren't needed immediately:

```tsx
import dynamic from 'next/dynamic';

// Heavy components (charts, maps, rich editors)
const ProductChart = dynamic(() => import('@/components/ProductChart'), {
  loading: () => <Skeleton className="h-64" />,
  ssr: false, // Client-only components
});

// Modal content (only load when needed)
const ShareModal = dynamic(() => import('@/components/ShareModal'));

// Conditional loading
{
  isModalOpen && <ShareModal />;
}
```

### Route-Based Splitting

Next.js automatically splits by route. Organize pages efficiently:

```
app/
├── page.tsx                 # Home (minimal bundle)
├── productos/
│   ├── page.tsx            # Products list
│   └── [id]/
│       └── page.tsx        # Product detail
└── checkout/
    └── page.tsx            # Checkout (heavy, loaded separately)
```

### Lazy Load Below-Fold Content

```tsx
import { LazyLoad } from '@/components/common/LazyLoad';

export default function ProductPage() {
  return (
    <>
      {/* Above the fold - loads immediately */}
      <ProductHero />
      <ProductInfo />

      {/* Below the fold - lazy loaded */}
      <LazyLoad useViewport rootMargin="100px">
        <ReviewsSection />
      </LazyLoad>

      <LazyLoad useViewport rootMargin="100px">
        <SimilarProducts />
      </LazyLoad>
    </>
  );
}
```

---

## Caching Strategies

### Static Generation (SSG)

Pre-render pages at build time:

```tsx
// app/productos/page.tsx
export const revalidate = 3600; // Revalidate every hour

export default async function ProductsPage() {
  const products = await getProducts(); // Cached at build
  return <ProductGrid products={products} />;
}
```

### Incremental Static Regeneration (ISR)

```tsx
// app/productos/[id]/page.tsx
export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((p) => ({ id: p.id }));
}

export const revalidate = 60; // Revalidate every minute

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);
  return <ProductDetail product={product} />;
}
```

### Client-Side Caching

```tsx
// Use SWR for data fetching with caching
import useSWR from 'swr';

function useProducts() {
  const { data, error, isLoading } = useSWR('/api/products', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    dedupingInterval: 60000, // 1 minute
  });

  return { products: data, error, isLoading };
}
```

### HTTP Caching Headers

```typescript
// app/api/products/route.ts
export async function GET() {
  const products = await getProducts();

  return NextResponse.json(products, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  });
}
```

---

## Bundle Optimization

### Analyze Bundle

```bash
# Install analyzer
npm install --save-dev @next/bundle-analyzer

# Add to next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // config
});

# Run analysis
ANALYZE=true npm run build
```

### Tree Shaking

Import only what you need:

```tsx
// Bad: Import entire library
import * as _ from 'lodash';
_.debounce(fn, 300);

// Good: Import specific function
import debounce from 'lodash/debounce';
debounce(fn, 300);

// Better: Use native or lightweight alternative
import { useDebounce } from '@/hooks/useDebounce';
```

### Icon Optimization

```tsx
// Bad: Import all icons
import * as Icons from 'lucide-react';

// Good: Import specific icons
import { Heart, ShoppingCart, User } from 'lucide-react';
```

### External Libraries

Move large libraries to CDN or load dynamically:

```tsx
// Heavy charting library - load on demand
const Chart = dynamic(() => import('recharts').then((mod) => mod.LineChart), {
  ssr: false,
  loading: () => <Skeleton className="h-64" />,
});
```

---

## Rendering Strategies

### Server Components (Default)

Use Server Components for static content:

```tsx
// app/productos/page.tsx (Server Component by default)
export default async function ProductsPage() {
  const products = await getProducts(); // Runs on server

  return (
    <div>
      <h1>Productos</h1>
      <ProductGrid products={products} />
    </div>
  );
}
```

### Client Components

Only use `'use client'` when necessary:

```tsx
'use client';

// Required for:
// - useState, useEffect
// - Event handlers (onClick, onChange)
// - Browser APIs (localStorage, window)
// - Third-party client libraries

export function AddToCartButton({ productId }) {
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = async () => {
    setIsAdding(true);
    await addToCart(productId);
    setIsAdding(false);
  };

  return <button onClick={handleClick}>Agregar</button>;
}
```

### Streaming & Suspense

Stream content progressively:

```tsx
import { Suspense } from 'react';

export default function ProductPage({ params }) {
  return (
    <div>
      {/* Render immediately */}
      <ProductHeader id={params.id} />

      {/* Stream when ready */}
      <Suspense fallback={<ReviewsSkeleton />}>
        <Reviews productId={params.id} />
      </Suspense>

      <Suspense fallback={<SimilarSkeleton />}>
        <SimilarProducts productId={params.id} />
      </Suspense>
    </div>
  );
}
```

---

## Data Fetching

### Parallel Data Fetching

```tsx
// Bad: Sequential fetching
export default async function Page({ params }) {
  const product = await getProduct(params.id); // 200ms
  const reviews = await getReviews(params.id); // 150ms
  const similar = await getSimilarProducts(params.id); // 100ms
  // Total: 450ms

  return <ProductPage product={product} reviews={reviews} similar={similar} />;
}

// Good: Parallel fetching
export default async function Page({ params }) {
  const [product, reviews, similar] = await Promise.all([
    getProduct(params.id),
    getReviews(params.id),
    getSimilarProducts(params.id),
  ]);
  // Total: 200ms (longest request)

  return <ProductPage product={product} reviews={reviews} similar={similar} />;
}
```

### Data Preloading

```tsx
// Preload data for likely navigation
import { preload } from 'react-dom';

function ProductCard({ product }) {
  const handleMouseEnter = () => {
    // Preload product detail data
    preload(`/api/products/${product.id}`, { as: 'fetch' });
  };

  return (
    <Link href={`/productos/${product.id}`} onMouseEnter={handleMouseEnter}>
      {product.name}
    </Link>
  );
}
```

---

## Component Optimization

### Memoization

```tsx
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive renders
const ProductCard = memo(function ProductCard({ product }) {
  return <div>{product.name}</div>;
});

// Memoize expensive calculations
function ProductFilters({ products, filters }) {
  const filteredProducts = useMemo(
    () => products.filter((p) => matchesFilters(p, filters)),
    [products, filters]
  );

  return <ProductGrid products={filteredProducts} />;
}

// Memoize callbacks passed to children
function ProductList({ products }) {
  const handleSelect = useCallback((id) => {
    console.log('Selected:', id);
  }, []);

  return products.map((p) => <ProductCard key={p.id} product={p} onSelect={handleSelect} />);
}
```

### Virtualization

For long lists, render only visible items:

```tsx
import { VirtualList } from '@/components/common/VirtualList';

function ProductList({ products }) {
  return (
    <VirtualList
      items={products}
      height={600}
      itemHeight={80}
      renderItem={(product) => <ProductCard product={product} />}
    />
  );
}
```

### Debounce & Throttle

```tsx
import { useDebounce } from '@/hooks/useDebounce';

function SearchInput() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    if (debouncedQuery) {
      searchProducts(debouncedQuery);
    }
  }, [debouncedQuery]);

  return <input value={query} onChange={(e) => setQuery(e.target.value)} />;
}
```

---

## Monitoring & Profiling

### Vercel Analytics

```tsx
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

### React DevTools Profiler

1. Install React DevTools browser extension
2. Open DevTools → Profiler tab
3. Record interactions
4. Analyze component render times

### Lighthouse

```bash
# Run Lighthouse audit (opens report in browser)
npx lighthouse https://hechomx.vercel.app --view

# Run and save JSON report
npx lighthouse https://hechomx.vercel.app \
  --output=json \
  --output-path=./lighthouse-report.json \
  --chrome-flags="--headless --no-sandbox" \
  --only-categories=performance

# Extract key metrics from JSON
cat lighthouse-report.json | jq '{
  score: (.categories.performance.score * 100),
  LCP: .audits["largest-contentful-paint"].displayValue,
  FCP: .audits["first-contentful-paint"].displayValue,
  TBT: .audits["total-blocking-time"].displayValue,
  CLS: .audits["cumulative-layout-shift"].displayValue,
  TTI: .audits["interactive"].displayValue,
  totalSize: .audits["total-byte-weight"].displayValue
}'

# Categories
# - Performance
# - Accessibility
# - Best Practices
# - SEO
```

> **Note:** Update the metrics table in this document after running audits on the deployed site.

### Web Vitals Reporting

```tsx
// app/layout.tsx
'use client';

import { useReportWebVitals } from 'next/web-vitals';

export function WebVitals() {
  useReportWebVitals((metric) => {
    console.log(metric);

    // Send to analytics
    if (metric.name === 'LCP' && metric.value > 2500) {
      analytics.track('slow_lcp', { value: metric.value });
    }
  });

  return null;
}
```

### Performance Budget

Add to CI/CD:

```yaml
# .github/workflows/lighthouse.yml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v10
  with:
    urls: |
      https://hechomx.vercel.app/
      https://hechomx.vercel.app/productos
    budgetPath: ./budget.json
```

**`budget.json`**:

```json
[
  {
    "path": "/*",
    "resourceSizes": [
      { "resourceType": "script", "budget": 200 },
      { "resourceType": "total", "budget": 500 }
    ],
    "timings": [
      { "metric": "interactive", "budget": 3500 },
      { "metric": "first-contentful-paint", "budget": 1500 }
    ]
  }
]
```

---

## Quick Wins Checklist

- [ ] Use Next.js `<Image>` for all images
- [ ] Add `priority` to above-fold images
- [ ] Set explicit `width` and `height` on images
- [ ] Use dynamic imports for heavy components
- [ ] Enable ISR for product pages
- [ ] Add proper cache headers to API routes
- [ ] Memoize expensive calculations
- [ ] Virtualize long lists
- [ ] Debounce search inputs
- [ ] Analyze bundle size regularly

---

_See also: [Deployment Guide](./DEPLOYMENT-APP.md) | [Architecture Overview](../architecture/OVERVIEW.md)_
