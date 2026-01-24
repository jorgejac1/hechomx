/**
 * @fileoverview Site-wide configuration for the Papalote Market e-commerce platform.
 * Contains core settings including site identity, contact information, social media links,
 * business details, feature flags, pagination settings, image optimization, and shipping configuration.
 * @module config/site
 */

export const siteConfig = {
  name: 'Papalote Market',
  description:
    'Descubre productos artesanales auténticos hechos en México. Conecta directamente con artesanos mexicanos y apoya el arte tradicional.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  locale: 'es-MX',
  currency: 'MXN',

  // Contact information
  contact: {
    email: 'contacto@papalotemarket.com',
    phone: '+52 55 1234 5678',
    whatsapp: '+52 55 1234 5678',
  },

  // Social media links
  social: {
    facebook: 'https://facebook.com/papalotemarket',
    instagram: 'https://instagram.com/papalotemarket',
    twitter: 'https://twitter.com/papalotemarket',
    pinterest: 'https://pinterest.com/papalotemarket',
    youtube: 'https://youtube.com/@papalotemarket',
  },

  // Business information
  business: {
    legalName: 'Papalote Market S.A. de C.V.',
    rfc: 'HEM123456789',
    address: {
      street: 'Av. Reforma 123',
      city: 'Ciudad de México',
      state: 'Ciudad de México',
      postalCode: '06600',
      country: 'México',
    },
  },

  // Features flags
  features: {
    enableComparison: true,
    enableWishlist: true,
    enableReviews: true,
    enableChat: true,
    enableNewsletter: true,
    maxComparisonProducts: 4,
  },

  // Pagination
  pagination: {
    productsPerPage: 20,
    reviewsPerPage: 10,
    ordersPerPage: 10,
  },

  // Image optimization (mirrors next.config.js - that file is source of truth)
  images: {
    domains: ['images.unsplash.com', 'placeholder.com', 'i.pravatar.cc'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Shipping
  shipping: {
    freeShippingMinimum: 500, // MXN
    estimatedDaysMin: 3,
    estimatedDaysMax: 7,
  },

  // Analytics
  analytics: {
    googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID,
    facebookPixelId: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
  },
} as const;

export type SiteConfig = typeof siteConfig;

// Export commonly used constants for convenience
export const SITE_NAME = siteConfig.name;
export const SITE_DESCRIPTION = siteConfig.description;
export const SITE_URL = siteConfig.url;
export const SITE_LOCALE = siteConfig.locale;
