import { describe, it, expect } from 'vitest';
import { siteConfig, SITE_NAME, SITE_DESCRIPTION, SITE_URL, SITE_LOCALE } from '../site';

describe('Site Configuration', () => {
  describe('siteConfig', () => {
    describe('Basic site info', () => {
      it('has correct site name', () => {
        expect(siteConfig.name).toBe('Papalote Market');
      });

      it('has correct description', () => {
        expect(siteConfig.description).toContain('productos artesanales auténticos');
        expect(siteConfig.description).toContain('México');
      });

      it('has URL configured', () => {
        expect(siteConfig.url).toBeDefined();
        expect(typeof siteConfig.url).toBe('string');
      });

      it('has correct locale', () => {
        expect(siteConfig.locale).toBe('es-MX');
      });

      it('has correct currency', () => {
        expect(siteConfig.currency).toBe('MXN');
      });
    });

    describe('Contact information', () => {
      it('has contact email', () => {
        expect(siteConfig.contact.email).toBe('contacto@papalotemarket.com');
      });

      it('has contact phone', () => {
        expect(siteConfig.contact.phone).toBe('+52 55 1234 5678');
      });

      it('has whatsapp number', () => {
        expect(siteConfig.contact.whatsapp).toBe('+52 55 1234 5678');
      });
    });

    describe('Social media links', () => {
      it('has Facebook link', () => {
        expect(siteConfig.social.facebook).toBe('https://facebook.com/papalotemarket');
      });

      it('has Instagram link', () => {
        expect(siteConfig.social.instagram).toBe('https://instagram.com/papalotemarket');
      });

      it('has Twitter link', () => {
        expect(siteConfig.social.twitter).toBe('https://twitter.com/papalotemarket');
      });

      it('has Pinterest link', () => {
        expect(siteConfig.social.pinterest).toBe('https://pinterest.com/papalotemarket');
      });

      it('has YouTube link', () => {
        expect(siteConfig.social.youtube).toBe('https://youtube.com/@papalotemarket');
      });
    });

    describe('Business information', () => {
      it('has legal name', () => {
        expect(siteConfig.business.legalName).toBe('Papalote Market S.A. de C.V.');
      });

      it('has RFC', () => {
        expect(siteConfig.business.rfc).toBe('HEM123456789');
      });

      it('has complete address', () => {
        expect(siteConfig.business.address).toEqual({
          street: 'Av. Reforma 123',
          city: 'Ciudad de México',
          state: 'Ciudad de México',
          postalCode: '06600',
          country: 'México',
        });
      });
    });

    describe('Feature flags', () => {
      it('has comparison feature enabled', () => {
        expect(siteConfig.features.enableComparison).toBe(true);
      });

      it('has wishlist feature enabled', () => {
        expect(siteConfig.features.enableWishlist).toBe(true);
      });

      it('has reviews feature enabled', () => {
        expect(siteConfig.features.enableReviews).toBe(true);
      });

      it('has chat feature enabled', () => {
        expect(siteConfig.features.enableChat).toBe(true);
      });

      it('has newsletter feature enabled', () => {
        expect(siteConfig.features.enableNewsletter).toBe(true);
      });

      it('has max comparison products set to 4', () => {
        expect(siteConfig.features.maxComparisonProducts).toBe(4);
      });
    });

    describe('Pagination settings', () => {
      it('has products per page setting', () => {
        expect(siteConfig.pagination.productsPerPage).toBe(20);
      });

      it('has reviews per page setting', () => {
        expect(siteConfig.pagination.reviewsPerPage).toBe(10);
      });

      it('has orders per page setting', () => {
        expect(siteConfig.pagination.ordersPerPage).toBe(10);
      });
    });

    describe('Image optimization settings', () => {
      it('has allowed domains', () => {
        expect(siteConfig.images.domains).toContain('images.unsplash.com');
        expect(siteConfig.images.domains).toContain('placeholder.com');
      });

      it('has image formats', () => {
        expect(siteConfig.images.formats).toContain('image/webp');
      });

      it('has device sizes', () => {
        expect(siteConfig.images.deviceSizes).toContain(640);
        expect(siteConfig.images.deviceSizes).toContain(1920);
        expect(siteConfig.images.deviceSizes).toContain(3840);
      });

      it('has image sizes', () => {
        expect(siteConfig.images.imageSizes).toContain(16);
        expect(siteConfig.images.imageSizes).toContain(256);
        expect(siteConfig.images.imageSizes).toContain(384);
      });
    });

    describe('Shipping settings', () => {
      it('has free shipping minimum', () => {
        expect(siteConfig.shipping.freeShippingMinimum).toBe(500);
      });

      it('has minimum estimated days', () => {
        expect(siteConfig.shipping.estimatedDaysMin).toBe(3);
      });

      it('has maximum estimated days', () => {
        expect(siteConfig.shipping.estimatedDaysMax).toBe(7);
      });
    });

    describe('Analytics settings', () => {
      it('has Google Analytics ID field', () => {
        expect(siteConfig.analytics).toHaveProperty('googleAnalyticsId');
      });

      it('has Facebook Pixel ID field', () => {
        expect(siteConfig.analytics).toHaveProperty('facebookPixelId');
      });
    });
  });

  describe('Exported constants', () => {
    it('exports SITE_NAME correctly', () => {
      expect(SITE_NAME).toBe(siteConfig.name);
    });

    it('exports SITE_DESCRIPTION correctly', () => {
      expect(SITE_DESCRIPTION).toBe(siteConfig.description);
    });

    it('exports SITE_URL correctly', () => {
      expect(SITE_URL).toBe(siteConfig.url);
    });

    it('exports SITE_LOCALE correctly', () => {
      expect(SITE_LOCALE).toBe(siteConfig.locale);
    });
  });

  describe('Type safety', () => {
    it('siteConfig structure is complete', () => {
      // This test verifies the config object structure exists at runtime
      // by checking that all expected nested properties exist
      expect(siteConfig.name).toBeDefined();
      expect(siteConfig.contact.email).toBeDefined();
      expect(siteConfig.social.facebook).toBeDefined();
      expect(siteConfig.business.address.city).toBeDefined();
      expect(siteConfig.features.enableComparison).toBeDefined();
      expect(siteConfig.pagination.productsPerPage).toBeDefined();
      expect(siteConfig.images.domains).toBeDefined();
      expect(siteConfig.shipping.freeShippingMinimum).toBeDefined();
      // Analytics IDs come from env vars and may be undefined
      expect(siteConfig.analytics).toHaveProperty('googleAnalyticsId');
      expect(siteConfig.analytics).toHaveProperty('facebookPixelId');
    });
  });
});
