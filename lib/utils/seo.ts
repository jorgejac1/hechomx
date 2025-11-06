/**
 * SEO metadata generation utilities
 */

import type { Metadata } from 'next';
import { SITE_NAME } from '@/config/site';

interface FilterState {
  categories: string[];
  states: string[];
  priceMax?: number;
  featured?: boolean;
  verified?: boolean;
  inStock?: boolean;
  query?: string;
}

/**
 * Generates page title from filters
 */
export const buildTitleFromFilters = (filters: FilterState): string => {
  const parts: string[] = [];

  if (filters.query) {
    parts.push(`Resultados para "${filters.query}"`);
  }

  if (filters.categories.length > 0) {
    parts.push(filters.categories.join(', '));
  }

  if (filters.states.length > 0) {
    parts.push(`de ${filters.states.join(', ')}`);
  }

  if (filters.featured) {
    parts.push('Destacados');
  }

  if (filters.verified) {
    parts.push('Verificados');
  }

  if (parts.length === 0) {
    return `Productos Artesanales Mexicanos | ${SITE_NAME}`;
  }

  return `${parts.join(' - ')} | ${SITE_NAME}`;
};

/**
 * Generates page description from filters
 */
export const buildDescriptionFromFilters = (filters: FilterState): string => {
  const parts: string[] = ['Descubre'];

  if (filters.verified) {
    parts.push('productos verificados');
  } else if (filters.featured) {
    parts.push('productos destacados');
  } else {
    parts.push('productos artesanales');
  }

  if (filters.categories.length > 0) {
    parts.push(`en ${filters.categories.join(', ')}`);
  }

  if (filters.states.length > 0) {
    parts.push(`de ${filters.states.join(', ')}`);
  }

  parts.push('hechos en México.');

  if (filters.priceMax) {
    parts.push(`Con precios desde $${filters.priceMax}.`);
  }

  return parts.join(' ');
};

/**
 * Generates product listing metadata
 */
export const generateProductsMetadata = (filters: FilterState, productsCount: number): Metadata => {
  const title = buildTitleFromFilters(filters);
  const description = buildDescriptionFromFilters(filters);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'es_MX',
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: '/productos',
    },
    other: {
      'product:count': String(productsCount),
    },
  };
};

/**
 * Generates structured data for product listing
 */
export const generateProductListingStructuredData = (
  filters: FilterState,
  productsCount: number
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: buildTitleFromFilters(filters),
    description: buildDescriptionFromFilters(filters),
    numberOfItems: productsCount,
  };
};
