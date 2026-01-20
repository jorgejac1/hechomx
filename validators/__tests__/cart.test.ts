import { describe, it, expect } from 'vitest';
import {
  addToCartSchema,
  updateCartItemSchema,
  shippingAddressSchema,
  paymentMethodSchema,
  checkoutSchema,
} from '../cart';

describe('Cart Validators', () => {
  describe('addToCartSchema', () => {
    it('should accept valid add to cart data', () => {
      const result = addToCartSchema.safeParse({
        productId: 'prod-123',
        quantity: 1,
      });
      expect(result.success).toBe(true);
    });

    it('should accept maximum quantity (99)', () => {
      const result = addToCartSchema.safeParse({
        productId: 'prod-123',
        quantity: 99,
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty productId', () => {
      const result = addToCartSchema.safeParse({
        productId: '',
        quantity: 1,
      });
      expect(result.success).toBe(false);
    });

    it('should reject zero quantity', () => {
      const result = addToCartSchema.safeParse({
        productId: 'prod-123',
        quantity: 0,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('La cantidad debe ser mayor a 0');
      }
    });

    it('should reject negative quantity', () => {
      const result = addToCartSchema.safeParse({
        productId: 'prod-123',
        quantity: -1,
      });
      expect(result.success).toBe(false);
    });

    it('should reject quantity over 99', () => {
      const result = addToCartSchema.safeParse({
        productId: 'prod-123',
        quantity: 100,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Cantidad máxima es 99');
      }
    });

    it('should reject non-integer quantity', () => {
      const result = addToCartSchema.safeParse({
        productId: 'prod-123',
        quantity: 1.5,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('updateCartItemSchema', () => {
    it('should accept valid update data', () => {
      const result = updateCartItemSchema.safeParse({
        productId: 'prod-123',
        quantity: 5,
      });
      expect(result.success).toBe(true);
    });

    it('should accept zero quantity (for removal)', () => {
      const result = updateCartItemSchema.safeParse({
        productId: 'prod-123',
        quantity: 0,
      });
      expect(result.success).toBe(true);
    });

    it('should reject negative quantity', () => {
      const result = updateCartItemSchema.safeParse({
        productId: 'prod-123',
        quantity: -1,
      });
      expect(result.success).toBe(false);
    });

    it('should reject quantity over 99', () => {
      const result = updateCartItemSchema.safeParse({
        productId: 'prod-123',
        quantity: 100,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('shippingAddressSchema (cart)', () => {
    const validAddress = {
      fullName: 'Juan Pérez',
      street: 'Av. Reforma 123',
      city: 'Ciudad de México',
      state: 'CDMX',
      postalCode: '06600',
      phone: '+52 5512345678',
    };

    it('should accept valid shipping address', () => {
      const result = shippingAddressSchema.safeParse(validAddress);
      expect(result.success).toBe(true);
    });

    it('should accept address with isDefault flag', () => {
      const result = shippingAddressSchema.safeParse({
        ...validAddress,
        isDefault: true,
      });
      expect(result.success).toBe(true);
    });

    it('should default country to México', () => {
      const result = shippingAddressSchema.safeParse(validAddress);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.country).toBe('México');
      }
    });

    it('should reject short full name', () => {
      const result = shippingAddressSchema.safeParse({
        ...validAddress,
        fullName: 'AB',
      });
      expect(result.success).toBe(false);
    });

    it('should reject short street', () => {
      const result = shippingAddressSchema.safeParse({
        ...validAddress,
        street: '123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid postal code', () => {
      const result = shippingAddressSchema.safeParse({
        ...validAddress,
        postalCode: '1234',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid phone format', () => {
      const result = shippingAddressSchema.safeParse({
        ...validAddress,
        phone: '123456',
      });
      expect(result.success).toBe(false);
    });

    it('should accept valid Mexican phone formats', () => {
      // Regex: /^\+?52?\s?\d{10}$/ - optional +, optional 52, optional space, then 10 digits
      const validPhones = ['+52 5512345678', '+525512345678'];
      validPhones.forEach((phone) => {
        const result = shippingAddressSchema.safeParse({
          ...validAddress,
          phone,
        });
        expect(result.success).toBe(true);
      });
    });
  });

  describe('paymentMethodSchema (cart)', () => {
    it('should accept card payment with complete details', () => {
      const result = paymentMethodSchema.safeParse({
        type: 'card',
        cardNumber: '4111111111111111',
        cardholderName: 'Juan Pérez',
        expiryMonth: 12,
        expiryYear: 2026,
        cvv: '123',
      });
      expect(result.success).toBe(true);
    });

    it('should accept paypal without card details', () => {
      const result = paymentMethodSchema.safeParse({
        type: 'paypal',
      });
      expect(result.success).toBe(true);
    });

    it('should accept oxxo without card details', () => {
      const result = paymentMethodSchema.safeParse({
        type: 'oxxo',
      });
      expect(result.success).toBe(true);
    });

    it('should accept transfer without card details', () => {
      const result = paymentMethodSchema.safeParse({
        type: 'transfer',
      });
      expect(result.success).toBe(true);
    });

    it('should reject card payment without card details', () => {
      const result = paymentMethodSchema.safeParse({
        type: 'card',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Información de tarjeta incompleta');
      }
    });

    it('should reject card with partial details', () => {
      const result = paymentMethodSchema.safeParse({
        type: 'card',
        cardNumber: '4111111111111111',
        cardholderName: 'Juan Pérez',
        // missing expiry and cvv
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid payment type', () => {
      const result = paymentMethodSchema.safeParse({
        type: 'bitcoin',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid expiry month', () => {
      const result = paymentMethodSchema.safeParse({
        type: 'card',
        cardNumber: '4111111111111111',
        cardholderName: 'Juan Pérez',
        expiryMonth: 13,
        expiryYear: 2026,
        cvv: '123',
      });
      expect(result.success).toBe(false);
    });

    it('should accept 3 or 4 digit CVV', () => {
      const result3 = paymentMethodSchema.safeParse({
        type: 'card',
        cardNumber: '4111111111111111',
        cardholderName: 'Juan Pérez',
        expiryMonth: 12,
        expiryYear: 2026,
        cvv: '123',
      });
      expect(result3.success).toBe(true);

      const result4 = paymentMethodSchema.safeParse({
        type: 'card',
        cardNumber: '4111111111111111',
        cardholderName: 'Juan Pérez',
        expiryMonth: 12,
        expiryYear: 2026,
        cvv: '1234',
      });
      expect(result4.success).toBe(true);
    });
  });

  describe('checkoutSchema (cart)', () => {
    const validAddress = {
      fullName: 'Juan Pérez',
      street: 'Av. Reforma 123',
      city: 'Ciudad de México',
      state: 'CDMX',
      postalCode: '06600',
      phone: '+52 5512345678',
    };

    const validPayment = {
      type: 'oxxo' as const,
    };

    it('should accept valid checkout data', () => {
      const result = checkoutSchema.safeParse({
        shippingAddress: validAddress,
        paymentMethod: validPayment,
        terms: true,
      });
      expect(result.success).toBe(true);
    });

    it('should accept checkout with notes', () => {
      const result = checkoutSchema.safeParse({
        shippingAddress: validAddress,
        paymentMethod: validPayment,
        notes: 'Entregar en horario de oficina',
        terms: true,
      });
      expect(result.success).toBe(true);
    });

    it('should reject if terms not accepted', () => {
      const result = checkoutSchema.safeParse({
        shippingAddress: validAddress,
        paymentMethod: validPayment,
        terms: false,
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(
          result.error.issues.some((i) => i.message === 'Debes aceptar los términos y condiciones')
        ).toBe(true);
      }
    });

    it('should reject notes exceeding 500 characters', () => {
      const result = checkoutSchema.safeParse({
        shippingAddress: validAddress,
        paymentMethod: validPayment,
        notes: 'A'.repeat(501),
        terms: true,
      });
      expect(result.success).toBe(false);
    });
  });
});
