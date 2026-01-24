# SEO Guide

> Search Engine Optimization strategies for Papalote Market.

## Table of Contents

1. [Overview](#overview)
2. [Metadata Configuration](#metadata-configuration)
3. [Structured Data (JSON-LD)](#structured-data-json-ld)
4. [Sitemap & Robots](#sitemap--robots)
5. [Open Graph & Social](#open-graph--social)
6. [Best Practices](#best-practices)

---

## Overview

Papalote Market implements comprehensive SEO features including:

- **Dynamic metadata** for all pages
- **JSON-LD structured data** for products, organization, and breadcrumbs
- **Automatic sitemap** generation
- **Robots.txt** with proper crawling rules
- **Open Graph** and **Twitter Card** support

### Configuration Files

| File             | Purpose                                 |
| ---------------- | --------------------------------------- |
| `config/seo.ts`  | SEO utilities and JSON-LD generators    |
| `config/site.ts` | Site configuration (name, URL, contact) |
| `app/sitemap.ts` | Dynamic sitemap generator               |
| `app/robots.ts`  | Robots.txt configuration                |

---

## Metadata Configuration

### Default Metadata

The default metadata is configured in `config/seo.ts` and applied in `app/layout.tsx`:

```typescript
// config/seo.ts
export const defaultMetadata: Metadata = {
  title: {
    default: 'Papalote Market',
    template: '%s | Papalote Market',
  },
  description: 'Descubre productos artesanales auténticos hechos en México...',
  keywords: ['artesanías mexicanas', 'productos mexicanos', ...],
  openGraph: { ... },
  twitter: { ... },
  robots: { index: true, follow: true },
};

// app/layout.tsx
import { defaultMetadata } from '@/config/seo';
export const metadata = defaultMetadata;
```

### Page-Specific Metadata

Generate metadata dynamically for specific pages:

```typescript
// app/productos/[id]/page.tsx
import { generateProductMetadata } from '@/config/seo';

export async function generateMetadata({ params }) {
  const product = await getProduct(params.id);

  return {
    title: `${product.name} - Papalote Market`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  };
}
```

---

## Structured Data (JSON-LD)

### Available Generators

| Function                        | Schema Type    | Usage                  |
| ------------------------------- | -------------- | ---------------------- |
| `generateProductJsonLd()`       | Product        | Product detail pages   |
| `generateOrganizationJsonLd()`  | Organization   | Site-wide (layout)     |
| `generateLocalBusinessJsonLd()` | OnlineStore    | Site-wide (layout)     |
| `generateWebsiteJsonLd()`       | WebSite        | Site-wide (layout)     |
| `generateBreadcrumbJsonLd()`    | BreadcrumbList | Pages with breadcrumbs |
| `generateFAQJsonLd()`           | FAQPage        | FAQ pages              |

### Site-Wide Structured Data

Added to the root layout for all pages:

```typescript
// app/layout.tsx
import Script from 'next/script';
import {
  generateOrganizationJsonLd,
  generateLocalBusinessJsonLd,
  generateWebsiteJsonLd,
} from '@/config/seo';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}

        {/* Organization Schema */}
        <Script
          id="organization-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateOrganizationJsonLd()),
          }}
        />

        {/* OnlineStore Schema */}
        <Script
          id="local-business-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateLocalBusinessJsonLd()),
          }}
        />

        {/* WebSite Schema (enables sitelinks searchbox) */}
        <Script
          id="website-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateWebsiteJsonLd()),
          }}
        />
      </body>
    </html>
  );
}
```

### Product Structured Data

```typescript
// app/productos/[id]/page.tsx
import { generateProductJsonLd, generateBreadcrumbJsonLd } from '@/config/seo';

export default async function ProductPage({ params }) {
  const product = await getProduct(params.id);

  const productJsonLd = generateProductJsonLd({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    currency: 'MXN',
    images: product.images,
    rating: product.rating,
    reviewCount: product.reviewCount,
    inStock: product.stock > 0,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { label: 'Inicio', href: '/' },
    { label: 'Productos', href: '/productos' },
    { label: product.category, href: `/productos?category=${product.category}` },
    { label: product.name },
  ]);

  return (
    <>
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ProductDetail product={product} />
    </>
  );
}
```

### FAQ Structured Data

```typescript
import { generateFAQJsonLd } from '@/config/seo';

const faqs = [
  { question: '¿Cómo puedo comprar?', answer: 'Agrega productos al carrito...' },
  { question: '¿Cuánto tarda el envío?', answer: '3-7 días hábiles...' },
];

<Script
  id="faq-jsonld"
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQJsonLd(faqs)) }}
/>
```

---

## Sitemap & Robots

### Dynamic Sitemap

The sitemap is automatically generated at `/sitemap.xml`:

```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';
import { getAllProducts } from '@/lib/server';

export default function sitemap(): MetadataRoute.Sitemap {
  const products = getAllProducts();

  return [
    // Static pages
    { url: 'https://papalotemarket.com', changeFrequency: 'daily', priority: 1 },
    { url: 'https://papalotemarket.com/productos', changeFrequency: 'daily', priority: 0.9 },

    // Dynamic product pages
    ...products.map((product) => ({
      url: `https://papalotemarket.com/productos/${product.id}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ];
}
```

**Included in sitemap:**

- Homepage and main sections
- All product pages
- All shop pages
- Help and legal pages

### Robots.txt

```typescript
// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/dashboard/',
          '/checkout/',
          '/carrito/',
          // ... other private routes
        ],
      },
    ],
    sitemap: 'https://papalotemarket.com/sitemap.xml',
  };
}
```

---

## Open Graph & Social

### Open Graph Configuration

```typescript
// config/seo.ts
openGraph: {
  type: 'website',
  locale: 'es_MX',
  url: siteConfig.url,
  title: siteConfig.name,
  description: siteConfig.description,
  siteName: siteConfig.name,
  images: [
    {
      url: '/images/og-image.jpg',
      width: 1200,
      height: 630,
      alt: siteConfig.name,
    },
  ],
},
```

### Twitter Card Configuration

```typescript
twitter: {
  card: 'summary_large_image',
  title: siteConfig.name,
  description: siteConfig.description,
  images: ['/images/twitter-image.jpg'],
  creator: '@papalotemarket',
},
```

### Required Images

| Image         | Dimensions | Location                           |
| ------------- | ---------- | ---------------------------------- |
| OG Image      | 1200x630   | `/public/images/og-image.jpg`      |
| Twitter Image | 1200x630   | `/public/images/twitter-image.jpg` |
| Logo          | Variable   | `/public/images/logo.png`          |

---

## Best Practices

### Page Titles

- Use unique, descriptive titles for each page
- Include primary keyword near the beginning
- Keep under 60 characters
- Use the template: `Page Name | Papalote Market`

```typescript
// Good
title: 'Alebrijes de Oaxaca - Artesanías Tradicionales';

// Bad
title: 'Productos'; // Too generic
```

### Meta Descriptions

- Write compelling descriptions (150-160 characters)
- Include call-to-action when appropriate
- Use primary keywords naturally

```typescript
// Good
description: 'Descubre alebrijes auténticos tallados a mano por artesanos de Oaxaca. Envío gratis en pedidos +$500 MXN.';

// Bad
description: 'Productos de México'; // Too short
```

### Image Optimization

- Use descriptive `alt` text for all images
- Include product names in image alt text
- Use proper `sizes` attribute for responsive images

```typescript
<Image
  src={product.image}
  alt={`${product.name} - Artesanía de ${product.state}`}
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

### URL Structure

- Use clean, descriptive URLs
- Include relevant keywords
- Use hyphens for word separation

```
✓ /productos/alebrije-oaxaca-tradicional
✗ /productos?id=123
✗ /productos/123
```

### Canonical URLs

Prevent duplicate content issues:

```typescript
alternates: {
  canonical: '/productos',
},
```

### Testing Tools

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

---

_See also: [Performance Guide](./PERFORMANCE.md) | [Deployment Guide](./DEPLOYMENT-APP.md)_
