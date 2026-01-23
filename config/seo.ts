/**
 * @fileoverview SEO configuration and metadata for the Papalote Market application.
 * Defines default metadata, Open Graph settings, Twitter cards, and provides
 * utility functions for generating product-specific metadata and JSON-LD structured data.
 * @module config/seo
 */

import { Metadata } from 'next';
import { siteConfig } from './site';

export const defaultMetadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    'artesanías mexicanas',
    'productos mexicanos',
    'Papalote Market',
    'artesanos',
    'artesanías',
    'textiles mexicanos',
    'cerámica mexicana',
    'joyería artesanal',
    'productos artesanales',
    'comercio justo',
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  metadataBase: new URL(siteConfig.url),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: siteConfig.locale,
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
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: ['/images/twitter-image.jpg'],
    creator: '@papalotemarket',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

/**
 * Generate metadata for product pages
 */
export function generateProductMetadata(product: {
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  state: string;
}): Metadata {
  return {
    title: product.name,
    description: product.description,
    keywords: [product.name, product.category, product.state, 'artesanía', 'Papalote Market'],
    openGraph: {
      type: 'website',
      title: product.name,
      description: product.description,
      images: product.images.map((img) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: product.name,
      })),
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: product.images,
    },
  };
}

/**
 * JSON-LD structured data for products
 */
export function generateProductJsonLd(product: {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  rating?: number;
  reviewCount?: number;
  inStock: boolean;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency,
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${siteConfig.url}/productos/${product.id}`,
    },
    ...(product.rating &&
      product.reviewCount && {
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
        },
      }),
  };
}

/**
 * JSON-LD structured data for organization
 */
export function generateOrganizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/logo.png`,
    sameAs: Object.values(siteConfig.social),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.contact.phone,
      contactType: 'customer service',
      email: siteConfig.contact.email,
      availableLanguage: ['Spanish'],
    },
  };
}
