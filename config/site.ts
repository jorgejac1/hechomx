/**
 * Site-wide configuration
 */

export const siteConfig = {
  name: 'Hecho en México',
  description:
    'Descubre productos artesanales auténticos hechos en México. Conecta directamente con artesanos mexicanos y apoya el arte tradicional.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  locale: 'es-MX',
  currency: 'MXN',

  // Contact information
  contact: {
    email: 'contacto@hechoenmex.com',
    phone: '+52 55 1234 5678',
    whatsapp: '+52 55 1234 5678',
  },

  // Social media links
  social: {
    facebook: 'https://facebook.com/hechoenmex',
    instagram: 'https://instagram.com/hechoenmex',
    twitter: 'https://twitter.com/hechoenmex',
    pinterest: 'https://pinterest.com/hechoenmex',
    youtube: 'https://youtube.com/@hechoenmex',
  },

  // Business information
  business: {
    legalName: 'Hecho en México S.A. de C.V.',
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

  // Image optimization
  images: {
    domains: ['images.unsplash.com', 'placeholder.com'],
    formats: ['image/webp'],
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
