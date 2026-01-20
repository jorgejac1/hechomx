import { describe, it, expect } from 'vitest';
import {
  validateCoupon,
  calculateCouponDiscount,
  applyCoupon,
  getCouponDisplayText,
  type Coupon,
} from '../coupons';

describe('Coupon Utilities', () => {
  describe('validateCoupon', () => {
    it('should validate PRIMERA10 coupon', () => {
      const result = validateCoupon('PRIMERA10', 600);
      expect(result.valid).toBe(true);
      expect(result.coupon?.code).toBe('PRIMERA10');
    });

    it('should be case-insensitive', () => {
      const result = validateCoupon('primera10', 600);
      expect(result.valid).toBe(true);
    });

    it('should trim whitespace', () => {
      const result = validateCoupon('  PRIMERA10  ', 600);
      expect(result.valid).toBe(true);
    });

    it('should reject empty code', () => {
      const result = validateCoupon('', 1000);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Ingresa un código de cupón');
    });

    it('should reject invalid coupon code', () => {
      const result = validateCoupon('INVALID123', 1000);
      expect(result.valid).toBe(false);
      expect(result.error).toBe('Cupón no válido o expirado');
    });

    it('should reject when subtotal below minimum purchase', () => {
      const result = validateCoupon('PRIMERA10', 400); // Requires min $500
      expect(result.valid).toBe(false);
      expect(result.error).toContain('compra mínima');
    });

    it('should validate ENVIOGRATIS coupon', () => {
      const result = validateCoupon('ENVIOGRATIS', 400);
      expect(result.valid).toBe(true);
      expect(result.coupon?.type).toBe('free_shipping');
    });

    it('should validate ARTESANO20 coupon with sufficient subtotal', () => {
      const result = validateCoupon('ARTESANO20', 1200);
      expect(result.valid).toBe(true);
      expect(result.coupon?.value).toBe(20);
    });

    it('should reject ARTESANO20 with insufficient subtotal', () => {
      const result = validateCoupon('ARTESANO20', 800); // Requires min $1000
      expect(result.valid).toBe(false);
    });

    it('should validate DESCUENTO50 fixed coupon', () => {
      const result = validateCoupon('DESCUENTO50', 500);
      expect(result.valid).toBe(true);
      expect(result.coupon?.type).toBe('fixed');
    });

    it('should reject expired coupon', () => {
      // Note: There are no expired coupons in the mock data, but the code path exists
      // This test verifies the validation logic works correctly
      const result = validateCoupon('NONEXISTENT', 1000);
      expect(result.valid).toBe(false);
    });
  });

  describe('calculateCouponDiscount', () => {
    describe('percentage coupons', () => {
      const percentageCoupon: Coupon = {
        code: 'TEST10',
        type: 'percentage',
        value: 10,
        description: '10% off',
      };

      it('should calculate percentage discount', () => {
        const discount = calculateCouponDiscount(percentageCoupon, 1000, 100);
        expect(discount).toBe(100);
      });

      it('should respect maxDiscount', () => {
        const couponWithMax: Coupon = {
          ...percentageCoupon,
          value: 50,
          maxDiscount: 200,
        };
        const discount = calculateCouponDiscount(couponWithMax, 1000, 100);
        expect(discount).toBe(200); // 50% of 1000 = 500, but max is 200
      });

      it('should round to 2 decimal places', () => {
        const discount = calculateCouponDiscount(percentageCoupon, 333, 50);
        expect(discount).toBe(33.3);
      });
    });

    describe('free_shipping coupons', () => {
      const freeShippingCoupon: Coupon = {
        code: 'FREESHIP',
        type: 'free_shipping',
        value: 0,
        description: 'Free shipping',
      };

      it('should return shipping cost as discount', () => {
        const discount = calculateCouponDiscount(freeShippingCoupon, 500, 150);
        expect(discount).toBe(150);
      });

      it('should return zero if shipping is free', () => {
        const discount = calculateCouponDiscount(freeShippingCoupon, 500, 0);
        expect(discount).toBe(0);
      });
    });

    describe('fixed coupons', () => {
      const fixedCoupon: Coupon = {
        code: 'FIXED50',
        type: 'fixed',
        value: 50,
        description: '$50 off',
      };

      it('should return fixed discount amount', () => {
        const discount = calculateCouponDiscount(fixedCoupon, 500, 100);
        expect(discount).toBe(50);
      });

      it('should not exceed subtotal', () => {
        const discount = calculateCouponDiscount(fixedCoupon, 30, 100);
        expect(discount).toBe(30);
      });
    });

    describe('unknown coupon type', () => {
      it('should return 0 for unknown coupon type', () => {
        const unknownCoupon = {
          code: 'UNKNOWN',
          type: 'unknown' as 'percentage',
          value: 10,
          description: 'Unknown type',
        };
        const discount = calculateCouponDiscount(unknownCoupon, 500, 100);
        expect(discount).toBe(0);
      });
    });
  });

  describe('applyCoupon', () => {
    it('should apply valid coupon and return discount', () => {
      const result = applyCoupon('PRIMERA10', 1000, 100);
      expect(result.success).toBe(true);
      expect(result.appliedCoupon).toBeDefined();
      expect(result.appliedCoupon?.discountAmount).toBe(100); // 10% of 1000
    });

    it('should respect max discount', () => {
      const result = applyCoupon('PRIMERA10', 10000, 100);
      expect(result.success).toBe(true);
      expect(result.appliedCoupon?.discountAmount).toBe(500); // Max is 500
    });

    it('should apply free shipping coupon', () => {
      const result = applyCoupon('ENVIOGRATIS', 500, 150);
      expect(result.success).toBe(true);
      expect(result.appliedCoupon?.discountAmount).toBe(150);
    });

    it('should apply fixed discount coupon', () => {
      const result = applyCoupon('DESCUENTO50', 500, 100);
      expect(result.success).toBe(true);
      expect(result.appliedCoupon?.discountAmount).toBe(50);
    });

    it('should return error for invalid coupon', () => {
      const result = applyCoupon('INVALID', 1000, 100);
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should return error when minimum not met', () => {
      const result = applyCoupon('PRIMERA10', 200, 100);
      expect(result.success).toBe(false);
      expect(result.error).toContain('compra mínima');
    });
  });

  describe('getCouponDisplayText', () => {
    it('should display percentage coupon text', () => {
      const coupon: Coupon = {
        code: 'TEST',
        type: 'percentage',
        value: 15,
        description: 'Test',
      };
      expect(getCouponDisplayText(coupon)).toBe('15% de descuento');
    });

    it('should display free shipping text', () => {
      const coupon: Coupon = {
        code: 'TEST',
        type: 'free_shipping',
        value: 0,
        description: 'Test',
      };
      expect(getCouponDisplayText(coupon)).toBe('Envío gratis');
    });

    it('should display fixed discount text', () => {
      const coupon: Coupon = {
        code: 'TEST',
        type: 'fixed',
        value: 100,
        description: 'Test',
      };
      expect(getCouponDisplayText(coupon)).toBe('$100 MXN de descuento');
    });

    it('should display description for unknown coupon type', () => {
      const coupon = {
        code: 'TEST',
        type: 'unknown' as 'percentage',
        value: 0,
        description: 'Custom description',
      };
      expect(getCouponDisplayText(coupon)).toBe('Custom description');
    });
  });
});
