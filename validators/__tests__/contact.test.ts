import { describe, it, expect } from 'vitest';
import {
  contactFormSchema,
  newsletterSchema,
  reportProblemSchema,
  makerContactSchema,
} from '../contact';

describe('Contact Validators', () => {
  describe('contactFormSchema', () => {
    const validContact = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      subject: 'Consulta sobre productos',
      message: 'Me gustaría saber más sobre los productos artesanales de Oaxaca.',
    };

    it('should accept valid contact form', () => {
      const result = contactFormSchema.safeParse(validContact);
      expect(result.success).toBe(true);
    });

    it('should accept contact with optional phone', () => {
      const result = contactFormSchema.safeParse({
        ...validContact,
        phone: '+52 5512345678',
      });
      expect(result.success).toBe(true);
    });

    it('should reject short name', () => {
      const result = contactFormSchema.safeParse({
        ...validContact,
        name: 'AB',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid email', () => {
      const result = contactFormSchema.safeParse({
        ...validContact,
        email: 'invalid-email',
      });
      expect(result.success).toBe(false);
    });

    it('should reject short subject', () => {
      const result = contactFormSchema.safeParse({
        ...validContact,
        subject: 'Hola',
      });
      expect(result.success).toBe(false);
    });

    it('should reject message shorter than 20 characters', () => {
      const result = contactFormSchema.safeParse({
        ...validContact,
        message: 'Mensaje corto',
      });
      expect(result.success).toBe(false);
    });

    it('should reject message exceeding 1000 characters', () => {
      const result = contactFormSchema.safeParse({
        ...validContact,
        message: 'A'.repeat(1001),
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid phone format', () => {
      const result = contactFormSchema.safeParse({
        ...validContact,
        phone: '12345',
      });
      expect(result.success).toBe(false);
    });

    it('should accept valid Mexican phone formats', () => {
      // Regex: /^\+?52?\s?\d{10}$/ - optional +, optional 52, optional space, then 10 digits
      const validPhones = ['+52 5512345678', '+525512345678'];
      validPhones.forEach((phone) => {
        const result = contactFormSchema.safeParse({
          ...validContact,
          phone,
        });
        expect(result.success).toBe(true);
      });
    });
  });

  describe('newsletterSchema', () => {
    it('should accept valid email', () => {
      const result = newsletterSchema.safeParse({
        email: 'test@example.com',
      });
      expect(result.success).toBe(true);
    });

    it('should accept email with preferences', () => {
      const result = newsletterSchema.safeParse({
        email: 'test@example.com',
        preferences: ['products', 'promotions'],
      });
      expect(result.success).toBe(true);
    });

    it('should accept all valid preference options', () => {
      const result = newsletterSchema.safeParse({
        email: 'test@example.com',
        preferences: ['products', 'promotions', 'news', 'artisans'],
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid email', () => {
      const result = newsletterSchema.safeParse({
        email: 'invalid',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid preference', () => {
      const result = newsletterSchema.safeParse({
        email: 'test@example.com',
        preferences: ['invalid-preference'],
      });
      expect(result.success).toBe(false);
    });
  });

  describe('reportProblemSchema', () => {
    const validReport = {
      type: 'product' as const,
      description: 'El producto llegó dañado y necesito un reemplazo urgente.',
    };

    it('should accept valid problem report', () => {
      const result = reportProblemSchema.safeParse(validReport);
      expect(result.success).toBe(true);
    });

    it('should accept all valid problem types', () => {
      const types = ['product', 'order', 'payment', 'shipping', 'other'] as const;
      types.forEach((type) => {
        const result = reportProblemSchema.safeParse({
          ...validReport,
          type,
        });
        expect(result.success).toBe(true);
      });
    });

    it('should accept report with orderId', () => {
      const result = reportProblemSchema.safeParse({
        ...validReport,
        type: 'order',
        orderId: 'ORD-12345',
      });
      expect(result.success).toBe(true);
    });

    it('should accept report with productId', () => {
      const result = reportProblemSchema.safeParse({
        ...validReport,
        productId: 'PROD-12345',
      });
      expect(result.success).toBe(true);
    });

    it('should reject invalid problem type', () => {
      const result = reportProblemSchema.safeParse({
        ...validReport,
        type: 'invalid-type',
      });
      expect(result.success).toBe(false);
    });

    it('should reject short description', () => {
      const result = reportProblemSchema.safeParse({
        ...validReport,
        description: 'Corto',
      });
      expect(result.success).toBe(false);
    });

    it('should reject description exceeding 1000 characters', () => {
      const result = reportProblemSchema.safeParse({
        ...validReport,
        description: 'A'.repeat(1001),
      });
      expect(result.success).toBe(false);
    });
  });

  describe('makerContactSchema', () => {
    const validMakerContact = {
      makerId: 'maker-123',
      name: 'Juan Pérez',
      email: 'juan@example.com',
      message: 'Me gustaría hacer un pedido personalizado de sus productos.',
    };

    it('should accept valid maker contact', () => {
      const result = makerContactSchema.safeParse(validMakerContact);
      expect(result.success).toBe(true);
    });

    it('should accept contact with productId', () => {
      const result = makerContactSchema.safeParse({
        ...validMakerContact,
        productId: 'prod-456',
      });
      expect(result.success).toBe(true);
    });

    it('should reject empty makerId', () => {
      const result = makerContactSchema.safeParse({
        ...validMakerContact,
        makerId: '',
      });
      expect(result.success).toBe(false);
    });

    it('should reject short name', () => {
      const result = makerContactSchema.safeParse({
        ...validMakerContact,
        name: 'AB',
      });
      expect(result.success).toBe(false);
    });

    it('should reject invalid email', () => {
      const result = makerContactSchema.safeParse({
        ...validMakerContact,
        email: 'invalid',
      });
      expect(result.success).toBe(false);
    });

    it('should reject message shorter than 20 characters', () => {
      const result = makerContactSchema.safeParse({
        ...validMakerContact,
        message: 'Hola',
      });
      expect(result.success).toBe(false);
    });

    it('should reject message exceeding 500 characters', () => {
      const result = makerContactSchema.safeParse({
        ...validMakerContact,
        message: 'A'.repeat(501),
      });
      expect(result.success).toBe(false);
    });
  });
});
