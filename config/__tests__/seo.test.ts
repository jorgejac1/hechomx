import { describe, it, expect } from 'vitest';
import {
  defaultMetadata,
  generateProductMetadata,
  generateProductJsonLd,
  generateOrganizationJsonLd,
  generateBreadcrumbJsonLd,
  generateLocalBusinessJsonLd,
  generateFAQJsonLd,
  generateWebsiteJsonLd,
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

  describe('generateBreadcrumbJsonLd', () => {
    const breadcrumbs = [
      { label: 'Inicio', href: '/' },
      { label: 'Productos', href: '/productos' },
      { label: 'Alebrije de Madera' },
    ];

    it('generates correct JSON-LD context and type', () => {
      const jsonLd = generateBreadcrumbJsonLd(breadcrumbs);
      expect(jsonLd['@context']).toBe('https://schema.org');
      expect(jsonLd['@type']).toBe('BreadcrumbList');
    });

    it('includes all breadcrumb items in itemListElement', () => {
      const jsonLd = generateBreadcrumbJsonLd(breadcrumbs);
      expect(jsonLd.itemListElement).toHaveLength(3);
    });

    it('sets correct position for each item (1-indexed)', () => {
      const jsonLd = generateBreadcrumbJsonLd(breadcrumbs);
      expect(jsonLd.itemListElement[0].position).toBe(1);
      expect(jsonLd.itemListElement[1].position).toBe(2);
      expect(jsonLd.itemListElement[2].position).toBe(3);
    });

    it('sets correct name for each item', () => {
      const jsonLd = generateBreadcrumbJsonLd(breadcrumbs);
      expect(jsonLd.itemListElement[0].name).toBe('Inicio');
      expect(jsonLd.itemListElement[1].name).toBe('Productos');
      expect(jsonLd.itemListElement[2].name).toBe('Alebrije de Madera');
    });

    it('includes item URL when href is provided', () => {
      const jsonLd = generateBreadcrumbJsonLd(breadcrumbs);
      expect(jsonLd.itemListElement[0].item).toBe(`${siteConfig.url}/`);
      expect(jsonLd.itemListElement[1].item).toBe(`${siteConfig.url}/productos`);
    });

    it('does not include item URL when href is not provided', () => {
      const jsonLd = generateBreadcrumbJsonLd(breadcrumbs);
      expect(jsonLd.itemListElement[2]).not.toHaveProperty('item');
    });

    it('handles empty breadcrumbs array', () => {
      const jsonLd = generateBreadcrumbJsonLd([]);
      expect(jsonLd.itemListElement).toHaveLength(0);
    });

    it('handles single breadcrumb', () => {
      const jsonLd = generateBreadcrumbJsonLd([{ label: 'Inicio', href: '/' }]);
      expect(jsonLd.itemListElement).toHaveLength(1);
      expect(jsonLd.itemListElement[0].position).toBe(1);
    });
  });

  describe('generateLocalBusinessJsonLd', () => {
    it('generates correct JSON-LD context and type', () => {
      const jsonLd = generateLocalBusinessJsonLd();
      expect(jsonLd['@context']).toBe('https://schema.org');
      expect(jsonLd['@type']).toBe('OnlineStore');
    });

    it('includes business name and description', () => {
      const jsonLd = generateLocalBusinessJsonLd();
      expect(jsonLd.name).toBe(siteConfig.name);
      expect(jsonLd.description).toBe(siteConfig.description);
    });

    it('includes contact information', () => {
      const jsonLd = generateLocalBusinessJsonLd();
      expect(jsonLd.telephone).toBe(siteConfig.contact.phone);
      expect(jsonLd.email).toBe(siteConfig.contact.email);
    });

    it('includes postal address', () => {
      const jsonLd = generateLocalBusinessJsonLd();
      expect(jsonLd.address['@type']).toBe('PostalAddress');
      expect(jsonLd.address.streetAddress).toBe(siteConfig.business.address.street);
      expect(jsonLd.address.addressLocality).toBe(siteConfig.business.address.city);
      expect(jsonLd.address.addressRegion).toBe(siteConfig.business.address.state);
      expect(jsonLd.address.postalCode).toBe(siteConfig.business.address.postalCode);
      expect(jsonLd.address.addressCountry).toBe('MX');
    });

    it('includes price range and currency', () => {
      const jsonLd = generateLocalBusinessJsonLd();
      expect(jsonLd.priceRange).toBe('$$');
      expect(jsonLd.currenciesAccepted).toBe('MXN');
    });

    it('includes payment methods accepted', () => {
      const jsonLd = generateLocalBusinessJsonLd();
      expect(jsonLd.paymentAccepted).toBe('Credit Card, Debit Card, PayPal');
    });

    it('includes opening hours for all days', () => {
      const jsonLd = generateLocalBusinessJsonLd();
      expect(jsonLd.openingHoursSpecification['@type']).toBe('OpeningHoursSpecification');
      expect(jsonLd.openingHoursSpecification.dayOfWeek).toHaveLength(7);
      expect(jsonLd.openingHoursSpecification.dayOfWeek).toContain('Monday');
      expect(jsonLd.openingHoursSpecification.dayOfWeek).toContain('Sunday');
    });

    it('sets 24/7 hours (online store)', () => {
      const jsonLd = generateLocalBusinessJsonLd();
      expect(jsonLd.openingHoursSpecification.opens).toBe('00:00');
      expect(jsonLd.openingHoursSpecification.closes).toBe('23:59');
    });

    it('includes social media links', () => {
      const jsonLd = generateLocalBusinessJsonLd();
      expect(jsonLd.sameAs).toEqual(Object.values(siteConfig.social));
    });
  });

  describe('generateFAQJsonLd', () => {
    const faqs = [
      {
        question: '¿Cómo puedo comprar?',
        answer: 'Agrega productos al carrito y procede al checkout.',
      },
      {
        question: '¿Cuánto tarda el envío?',
        answer: 'Entre 3 y 7 días hábiles dependiendo tu ubicación.',
      },
    ];

    it('generates correct JSON-LD context and type', () => {
      const jsonLd = generateFAQJsonLd(faqs);
      expect(jsonLd['@context']).toBe('https://schema.org');
      expect(jsonLd['@type']).toBe('FAQPage');
    });

    it('includes all FAQ items in mainEntity', () => {
      const jsonLd = generateFAQJsonLd(faqs);
      expect(jsonLd.mainEntity).toHaveLength(2);
    });

    it('formats questions correctly', () => {
      const jsonLd = generateFAQJsonLd(faqs);
      expect(jsonLd.mainEntity[0]['@type']).toBe('Question');
      expect(jsonLd.mainEntity[0].name).toBe(faqs[0].question);
      expect(jsonLd.mainEntity[1]['@type']).toBe('Question');
      expect(jsonLd.mainEntity[1].name).toBe(faqs[1].question);
    });

    it('formats answers correctly', () => {
      const jsonLd = generateFAQJsonLd(faqs);
      expect(jsonLd.mainEntity[0].acceptedAnswer['@type']).toBe('Answer');
      expect(jsonLd.mainEntity[0].acceptedAnswer.text).toBe(faqs[0].answer);
      expect(jsonLd.mainEntity[1].acceptedAnswer['@type']).toBe('Answer');
      expect(jsonLd.mainEntity[1].acceptedAnswer.text).toBe(faqs[1].answer);
    });

    it('handles empty FAQs array', () => {
      const jsonLd = generateFAQJsonLd([]);
      expect(jsonLd.mainEntity).toHaveLength(0);
    });

    it('handles single FAQ', () => {
      const singleFaq = [{ question: '¿Qué es?', answer: 'Una tienda.' }];
      const jsonLd = generateFAQJsonLd(singleFaq);
      expect(jsonLd.mainEntity).toHaveLength(1);
    });
  });

  describe('generateWebsiteJsonLd', () => {
    it('generates correct JSON-LD context and type', () => {
      const jsonLd = generateWebsiteJsonLd();
      expect(jsonLd['@context']).toBe('https://schema.org');
      expect(jsonLd['@type']).toBe('WebSite');
    });

    it('includes site name and URL', () => {
      const jsonLd = generateWebsiteJsonLd();
      expect(jsonLd.name).toBe(siteConfig.name);
      expect(jsonLd.url).toBe(siteConfig.url);
    });

    it('includes SearchAction for sitelinks searchbox', () => {
      const jsonLd = generateWebsiteJsonLd();
      expect(jsonLd.potentialAction['@type']).toBe('SearchAction');
    });

    it('has correct search target configuration', () => {
      const jsonLd = generateWebsiteJsonLd();
      expect(jsonLd.potentialAction.target['@type']).toBe('EntryPoint');
      expect(jsonLd.potentialAction.target.urlTemplate).toContain('/productos?search=');
      expect(jsonLd.potentialAction.target.urlTemplate).toContain('{search_term_string}');
    });

    it('has correct query-input specification', () => {
      const jsonLd = generateWebsiteJsonLd();
      expect(jsonLd.potentialAction['query-input']).toBe('required name=search_term_string');
    });
  });
});
