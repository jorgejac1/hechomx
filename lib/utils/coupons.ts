/**
 * @fileoverview Coupon validation and discount calculation utilities.
 * Provides functions for validating coupon codes, calculating discounts
 * (percentage, fixed, free shipping), and applying coupons to orders.
 * @module lib/utils/coupons
 */

export interface Coupon {
  code: string;
  type: 'percentage' | 'free_shipping' | 'fixed';
  value: number; // percentage (0-100) or fixed amount
  description: string;
  minPurchase?: number;
  maxDiscount?: number;
  expiresAt?: string;
}

export interface AppliedCoupon extends Coupon {
  discountAmount: number;
}

// Mock coupon database
const AVAILABLE_COUPONS: Coupon[] = [
  {
    code: 'PRIMERA10',
    type: 'percentage',
    value: 10,
    description: '10% de descuento en tu primera compra',
    minPurchase: 500,
    maxDiscount: 500,
  },
  {
    code: 'ENVIOGRATIS',
    type: 'free_shipping',
    value: 0,
    description: 'Envío gratis en tu pedido',
    minPurchase: 300,
  },
  {
    code: 'ARTESANO20',
    type: 'percentage',
    value: 20,
    description: '20% de descuento',
    minPurchase: 1000,
    maxDiscount: 1000,
  },
  {
    code: 'DESCUENTO50',
    type: 'fixed',
    value: 50,
    description: '$50 MXN de descuento',
    minPurchase: 400,
  },
  {
    code: 'EXPIRED2023',
    type: 'percentage',
    value: 15,
    description: 'Cupón expirado',
    expiresAt: '2023-01-01',
  },
];

export interface CouponValidationResult {
  valid: boolean;
  coupon?: Coupon;
  error?: string;
}

/**
 * Validate a coupon code
 */
export function validateCoupon(code: string, subtotal: number): CouponValidationResult {
  const normalizedCode = code.trim().toUpperCase();

  if (!normalizedCode) {
    return { valid: false, error: 'Ingresa un código de cupón' };
  }

  const coupon = AVAILABLE_COUPONS.find((c) => c.code === normalizedCode);

  if (!coupon) {
    return { valid: false, error: 'Cupón no válido o expirado' };
  }

  if (coupon.expiresAt && new Date(coupon.expiresAt) < new Date()) {
    return { valid: false, error: 'Este cupón ha expirado' };
  }

  if (coupon.minPurchase && subtotal < coupon.minPurchase) {
    return {
      valid: false,
      error: `Este cupón requiere una compra mínima de $${coupon.minPurchase} MXN`,
    };
  }

  return { valid: true, coupon };
}

/**
 * Calculate discount amount from a coupon
 */
export function calculateCouponDiscount(
  coupon: Coupon,
  subtotal: number,
  shippingCost: number
): number {
  switch (coupon.type) {
    case 'percentage': {
      let discount = (subtotal * coupon.value) / 100;
      if (coupon.maxDiscount) {
        discount = Math.min(discount, coupon.maxDiscount);
      }
      return Math.round(discount * 100) / 100;
    }
    case 'free_shipping':
      return shippingCost;
    case 'fixed':
      return Math.min(coupon.value, subtotal);
    default:
      return 0;
  }
}

/**
 * Apply coupon and return applied coupon with discount amount
 */
export function applyCoupon(
  code: string,
  subtotal: number,
  shippingCost: number
): { success: boolean; appliedCoupon?: AppliedCoupon; error?: string } {
  const validation = validateCoupon(code, subtotal);

  if (!validation.valid || !validation.coupon) {
    return { success: false, error: validation.error };
  }

  const discountAmount = calculateCouponDiscount(validation.coupon, subtotal, shippingCost);

  return {
    success: true,
    appliedCoupon: {
      ...validation.coupon,
      discountAmount,
    },
  };
}

/**
 * Get coupon display text
 */
export function getCouponDisplayText(coupon: Coupon): string {
  switch (coupon.type) {
    case 'percentage':
      return `${coupon.value}% de descuento`;
    case 'free_shipping':
      return 'Envío gratis';
    case 'fixed':
      return `$${coupon.value} MXN de descuento`;
    default:
      return coupon.description;
  }
}
