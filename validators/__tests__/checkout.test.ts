import { describe, it, expect } from 'vitest';
import {
  shippingAddressSchema,
  paymentMethodSchema,
  checkoutFormSchema,
  giftOptionsSchema,
  validateShippingAddress,
  validatePaymentMethod,
  validateCheckoutForm,
  getFieldError,
} from '../checkout';

describe('Checkout Validators', () => {
  describe('shippingAddressSchema', () => {
    const validAddress = {
      firstName: 'Juan',
      lastName: 'Pérez García',
      email: 'juan@example.com',
      phone: '5512345678',
      street: 'Av. Reforma',
      streetNumber: '123',
      neighborhood: 'Centro',
      city: 'Ciudad de México',
      state: 'Ciudad de México',
      postalCode: '06600',
    };

    it('should accept valid shipping address', () => {
      const result = shippingAddressSchema.safeParse(validAddress);
      expect(result.success).toBe(true);
    });

    it('should accept address with optional fields', () => {
      const result = shippingAddressSchema.safeParse({
        ...validAddress,
        apartment: '4B',
        references: 'Edificio azul, junto a la farmacia',
      });
      expect(result.success).toBe(true);
    });

    it('should accept Mexican phone formats', () => {
      // Schema has min(10) and max(15) constraints
      const phoneFormats = [
        '5512345678', // 10 chars
        '55-1234-5678', // 12 chars
        '55.1234.5678', // 12 chars
      ];

      phoneFormats.forEach((phone) => {
        const result = shippingAddressSchema.safeParse({
          ...validAddress,
          phone,
        });
        expect(result.success).toBe(true);
      });
    });

    it('should reject short first name', () => {
      const result = shippingAddressSchema.safeParse({
        ...validAddress,
        firstName: 'A',
      });
      expect(result.success).toBe(false);
    });

    it('should reject first name with numbers', () => {
      const result = shippingAddressSchema.safeParse({
        ...validAddress,
        firstName: 'Juan123',
      });
      expect(result.success).toBe(false);
    });

    it('should accept names with Spanish accents', () => {
      const result = shippingAddressSchema.safeParse({
        ...validAddress,
        firstName: 'María',
        lastName: 'Núñez Güérreno',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = shippingAddressSchema.safeParse({
        ...validAddress,
        email: 'invalid-email',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid phone', () => {
      const result = shippingAddressSchema.safeParse({
        ...validAddress,
        phone: '123',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid postal code (not 5 digits)', () => {
      const result = shippingAddressSchema.safeParse({
        ...validAddress,
        postalCode: '1234',
      });
      expect(result.success).toBe(false);
    });

    it('should reject postal code with letters', () => {
      const result = shippingAddressSchema.safeParse({
        ...validAddress,
        postalCode: '0660A',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid state', () => {
      const result = shippingAddressSchema.safeParse({
        ...validAddress,
        state: 'Invalid State',
      });
      expect(result.success).toBe(false);
    });

    it('should accept all valid Mexican states', () => {
      const states = ['Oaxaca', 'Chiapas', 'Jalisco', 'Nuevo León', 'Ciudad de México'];
      states.forEach((state) => {
        const result = shippingAddressSchema.safeParse({
          ...validAddress,
          state,
        });
        expect(result.success).toBe(true);
      });
    });
  });

  describe('paymentMethodSchema', () => {
    it('should accept valid payment methods', () => {
      const methods = ['card', 'mercadopago', 'oxxo', 'spei', 'paypal'];
      methods.forEach((method) => {
        const result = paymentMethodSchema.safeParse(method);
        expect(result.success).toBe(true);
      });
    });

    it('should reject invalid payment method', () => {
      const result = paymentMethodSchema.safeParse('bitcoin');
      expect(result.success).toBe(false);
    });
  });

  describe('checkoutFormSchema', () => {
    const validAddress = {
      firstName: 'Juan',
      lastName: 'Pérez García',
      email: 'juan@example.com',
      phone: '5512345678',
      street: 'Av. Reforma',
      streetNumber: '123',
      neighborhood: 'Centro',
      city: 'Ciudad de México',
      state: 'Ciudad de México',
      postalCode: '06600',
    };

    const validCheckout = {
      shippingAddress: validAddress,
      paymentMethod: 'card',
      saveAddress: false,
      acceptTerms: true,
    };

    it('should accept valid checkout form', () => {
      const result = checkoutFormSchema.safeParse(validCheckout);
      expect(result.success).toBe(true);
    });

    it('should reject if terms not accepted', () => {
      const result = checkoutFormSchema.safeParse({
        ...validCheckout,
        acceptTerms: false,
      });
      expect(result.success).toBe(false);
    });

    it('should accept checkout with gift options', () => {
      const result = checkoutFormSchema.safeParse({
        ...validCheckout,
        giftWrap: true,
        giftMessage: 'Feliz cumpleaños!',
      });
      expect(result.success).toBe(true);
    });

    it('should accept checkout with notes', () => {
      const result = checkoutFormSchema.safeParse({
        ...validCheckout,
        notes: 'Favor de entregar en la puerta principal',
      });
      expect(result.success).toBe(true);
    });

    it('should reject notes exceeding 500 characters', () => {
      const result = checkoutFormSchema.safeParse({
        ...validCheckout,
        notes: 'A'.repeat(501),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('giftOptionsSchema', () => {
    it('should accept gift wrap without message when giftWrap is false', () => {
      const result = giftOptionsSchema.safeParse({
        giftWrap: false,
      });
      expect(result.success).toBe(true);
    });

    it('should accept gift wrap with message', () => {
      const result = giftOptionsSchema.safeParse({
        giftWrap: true,
        giftMessage: 'Feliz cumpleaños!',
      });
      expect(result.success).toBe(true);
    });

    it('should reject gift wrap without message', () => {
      const result = giftOptionsSchema.safeParse({
        giftWrap: true,
        giftMessage: '',
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe('Incluye un mensaje para tu regalo');
      }
    });

    it('should reject gift message exceeding 500 characters', () => {
      const result = giftOptionsSchema.safeParse({
        giftWrap: true,
        giftMessage: 'A'.repeat(501),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('Validation functions', () => {
    const validAddress = {
      firstName: 'Juan',
      lastName: 'Pérez',
      email: 'juan@example.com',
      phone: '5512345678',
      street: 'Av. Reforma',
      streetNumber: '123',
      neighborhood: 'Centro',
      city: 'CDMX',
      state: 'Ciudad de México',
      postalCode: '06600',
    };

    it('validateShippingAddress should return success for valid data', () => {
      const result = validateShippingAddress(validAddress);
      expect(result.success).toBe(true);
    });

    it('validatePaymentMethod should return success for valid method', () => {
      const result = validatePaymentMethod('card');
      expect(result.success).toBe(true);
    });

    it('validateCheckoutForm should return success for valid form', () => {
      const result = validateCheckoutForm({
        shippingAddress: validAddress,
        paymentMethod: 'card',
        acceptTerms: true,
      });
      expect(result.success).toBe(true);
    });

    it('getFieldError should return error message for invalid field', () => {
      const result = shippingAddressSchema.safeParse({
        ...validAddress,
        email: 'invalid',
      });
      if (!result.success) {
        const error = getFieldError(result.error, 'email');
        expect(error).toBe('Ingresa un correo electrónico válido');
      }
    });

    it('getFieldError should return undefined for valid field', () => {
      const result = shippingAddressSchema.safeParse(validAddress);
      if (!result.success) {
        const error = getFieldError(result.error, 'email');
        expect(error).toBeUndefined();
      }
    });

    it('getFieldError should return undefined when no error', () => {
      const error = getFieldError(null, 'email');
      expect(error).toBeUndefined();
    });
  });
});
