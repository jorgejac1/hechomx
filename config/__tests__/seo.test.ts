import { describe, it, expect } from 'vitest';
import {
  defaultMetadata,
  generateProductMetadata,
  generateProductJsonLd,
  generateOrganizationJsonLd,
} from '../seo';
import { siteConfig } from '../site';

describe('SEO Configuration', () => {
  describe('defaultMetadata', () => {
    it('has correct title configuration', () => {
      expect(defaultMetadata.title).toEqual({
        default: siteConfig.name,
        template: `%s | ${siteConfig.name}`,
      });
    });

    it('has correct description', () => {
      expect(defaultMetadata.description).toBe(siteConfig.description);
    });

    it('has relevant keywords', () => {
      expect(defaultMetadata.keywords).toContain('artesanías mexicanas');
      expect(defaultMetadata.keywords).toContain('Papalote Market');
      expect(defaultMetadata.keywords).toContain('comercio justo');
    });

    it('has correct author information', () => {
      expect(defaultMetadata.authors).toEqual([{ name: siteConfig.name }]);
      expect(defaultMetadata.creator).toBe(siteConfig.name);
      expect(defaultMetadata.publisher).toBe(siteConfig.name);
    });

    it('has correct metadataBase', () => {
      expect(defaultMetadata.metadataBase).toEqual(new URL(siteConfig.url));
    });

    it('has canonical alternates', () => {
      expect(defaultMetadata.alternates).toEqual({ canonical: '/' });
    });

    it('has correct OpenGraph configuration', () => {
      expect(defaultMetadata.openGraph).toMatchObject({
        type: 'website',
        locale: siteConfig.locale,
        url: siteConfig.url,
        title: siteConfig.name,
        description: siteConfig.description,
        siteName: siteConfig.name,
      });
    });

    it('has OpenGraph image configuration', () => {
      expect(defaultMetadata.openGraph?.images).toEqual([
        {
          url: '/images/og-image.jpg',
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ]);
    });

    it('has correct Twitter card configuration', () => {
      expect(defaultMetadata.twitter).toMatchObject({
        card: 'summary_large_image',
        title: siteConfig.name,
        description: siteConfig.description,
        images: ['/images/twitter-image.jpg'],
        creator: '@papalotemarket',
      });
    });

    it('has correct robots configuration', () => {
      expect(defaultMetadata.robots).toEqual({
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      });
    });

    it('has correct icons configuration', () => {
      expect(defaultMetadata.icons).toEqual({
        icon: '/favicon.ico',
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
      });
    });

    it('has manifest path', () => {
      expect(defaultMetadata.manifest).toBe('/site.webmanifest');
    });
  });

  describe('generateProductMetadata', () => {
    const mockProduct = {
      name: 'Alebrije Oaxaqueño',
      description: 'Hermoso alebrije tallado a mano en Oaxaca',
      price: 1500,
      currency: 'MXN',
      images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
      category: 'Alebrijes',
      state: 'Oaxaca',
    };

    it('generates correct title', () => {
      const metadata = generateProductMetadata(mockProduct);
      expect(metadata.title).toBe(mockProduct.name);
    });

    it('generates correct description', () => {
      const metadata = generateProductMetadata(mockProduct);
      expect(metadata.description).toBe(mockProduct.description);
    });

    it('generates correct keywords', () => {
      const metadata = generateProductMetadata(mockProduct);
      expect(metadata.keywords).toContain(mockProduct.name);
      expect(metadata.keywords).toContain(mockProduct.category);
      expect(metadata.keywords).toContain(mockProduct.state);
      expect(metadata.keywords).toContain('artesanía');
      expect(metadata.keywords).toContain('Papalote Market');
    });

    it('generates correct OpenGraph configuration', () => {
      const metadata = generateProductMetadata(mockProduct);
      expect(metadata.openGraph).toMatchObject({
        type: 'website',
        title: mockProduct.name,
        description: mockProduct.description,
      });
    });

    it('generates OpenGraph images with correct dimensions', () => {
      const metadata = generateProductMetadata(mockProduct);
      const images = metadata.openGraph?.images as Array<{
        url: string;
        width: number;
        height: number;
        alt: string;
      }>;

      expect(images).toHaveLength(2);
      expect(images[0]).toEqual({
        url: mockProduct.images[0],
        width: 1200,
        height: 630,
        alt: mockProduct.name,
      });
      expect(images[1]).toEqual({
        url: mockProduct.images[1],
        width: 1200,
        height: 630,
        alt: mockProduct.name,
      });
    });

    it('generates correct Twitter card configuration', () => {
      const metadata = generateProductMetadata(mockProduct);
      expect(metadata.twitter).toMatchObject({
        card: 'summary_large_image',
        title: mockProduct.name,
        description: mockProduct.description,
        images: mockProduct.images,
      });
    });

    it('handles product with single image', () => {
      const singleImageProduct = {
        ...mockProduct,
        images: ['https://example.com/single.jpg'],
      };
      const metadata = generateProductMetadata(singleImageProduct);
      const images = metadata.openGraph?.images as Array<{ url: string }>;

      expect(images).toHaveLength(1);
      expect(images[0].url).toBe('https://example.com/single.jpg');
    });

    it('handles product with empty images array', () => {
      const noImagesProduct = {
        ...mockProduct,
        images: [],
      };
      const metadata = generateProductMetadata(noImagesProduct);
      const images = metadata.openGraph?.images as Array<{ url: string }>;

      expect(images).toHaveLength(0);
    });
  });

  describe('generateProductJsonLd', () => {
    const mockProduct = {
      id: 'prod-123',
      name: 'Rebozo de Seda',
      description: 'Rebozo tradicional tejido a mano',
      price: 2500,
      currency: 'MXN',
      images: ['https://example.com/rebozo1.jpg', 'https://example.com/rebozo2.jpg'],
      inStock: true,
    };

    it('generates correct JSON-LD context and type', () => {
      const jsonLd = generateProductJsonLd(mockProduct);
      expect(jsonLd['@context']).toBe('https://schema.org');
      expect(jsonLd['@type']).toBe('Product');
    });

    it('generates correct product information', () => {
      const jsonLd = generateProductJsonLd(mockProduct);
      expect(jsonLd.name).toBe(mockProduct.name);
      expect(jsonLd.description).toBe(mockProduct.description);
      expect(jsonLd.image).toEqual(mockProduct.images);
      expect(jsonLd.sku).toBe(mockProduct.id);
    });

    it('generates correct offer for in-stock product', () => {
      const jsonLd = generateProductJsonLd(mockProduct);
      expect(jsonLd.offers).toMatchObject({
        '@type': 'Offer',
        price: mockProduct.price,
        priceCurrency: mockProduct.currency,
        availability: 'https://schema.org/InStock',
        url: `${siteConfig.url}/productos/${mockProduct.id}`,
      });
    });

    it('generates correct offer for out-of-stock product', () => {
      const outOfStockProduct = { ...mockProduct, inStock: false };
      const jsonLd = generateProductJsonLd(outOfStockProduct);
      expect(jsonLd.offers.availability).toBe('https://schema.org/OutOfStock');
    });

    it('does not include aggregateRating when no rating provided', () => {
      const jsonLd = generateProductJsonLd(mockProduct);
      expect(jsonLd).not.toHaveProperty('aggregateRating');
    });

    it('includes aggregateRating when rating and reviewCount are provided', () => {
      const ratedProduct = {
        ...mockProduct,
        rating: 4.5,
        reviewCount: 120,
      };
      const jsonLd = generateProductJsonLd(ratedProduct);
      expect(jsonLd.aggregateRating).toEqual({
        '@type': 'AggregateRating',
        ratingValue: 4.5,
        reviewCount: 120,
      });
    });

    it('does not include aggregateRating when only rating is provided (no reviewCount)', () => {
      const partialRatedProduct = {
        ...mockProduct,
        rating: 4.0,
      };
      const jsonLd = generateProductJsonLd(partialRatedProduct);
      expect(jsonLd).not.toHaveProperty('aggregateRating');
    });

    it('does not include aggregateRating when only reviewCount is provided (no rating)', () => {
      const partialRatedProduct = {
        ...mockProduct,
        reviewCount: 50,
      };
      const jsonLd = generateProductJsonLd(partialRatedProduct);
      expect(jsonLd).not.toHaveProperty('aggregateRating');
    });

    it('handles rating of 0 correctly', () => {
      const zeroRatedProduct = {
        ...mockProduct,
        rating: 0,
        reviewCount: 10,
      };
      const jsonLd = generateProductJsonLd(zeroRatedProduct);
      // rating of 0 is falsy, so aggregateRating should not be included
      expect(jsonLd).not.toHaveProperty('aggregateRating');
    });

    it('handles reviewCount of 0 correctly', () => {
      const zeroReviewsProduct = {
        ...mockProduct,
        rating: 4.5,
        reviewCount: 0,
      };
      const jsonLd = generateProductJsonLd(zeroReviewsProduct);
      // reviewCount of 0 is falsy, so aggregateRating should not be included
      expect(jsonLd).not.toHaveProperty('aggregateRating');
    });
  });

  describe('generateOrganizationJsonLd', () => {
    it('generates correct JSON-LD context and type', () => {
      const jsonLd = generateOrganizationJsonLd();
      expect(jsonLd['@context']).toBe('https://schema.org');
      expect(jsonLd['@type']).toBe('Organization');
    });

    it('generates correct organization name and description', () => {
      const jsonLd = generateOrganizationJsonLd();
      expect(jsonLd.name).toBe(siteConfig.name);
      expect(jsonLd.description).toBe(siteConfig.description);
    });

    it('generates correct URL', () => {
      const jsonLd = generateOrganizationJsonLd();
      expect(jsonLd.url).toBe(siteConfig.url);
    });

    it('generates correct logo URL', () => {
      const jsonLd = generateOrganizationJsonLd();
      expect(jsonLd.logo).toBe(`${siteConfig.url}/images/logo.png`);
    });

    it('generates correct sameAs social links', () => {
      const jsonLd = generateOrganizationJsonLd();
      const expectedSocialLinks = Object.values(siteConfig.social);
      expect(jsonLd.sameAs).toEqual(expectedSocialLinks);
    });

    it('generates correct contact point', () => {
      const jsonLd = generateOrganizationJsonLd();
      expect(jsonLd.contactPoint).toEqual({
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phone,
        contactType: 'customer service',
        email: siteConfig.contact.email,
        availableLanguage: ['Spanish'],
      });
    });
  });
});
