/**
 * @fileoverview Checkout validation schemas
 * Provides Zod schemas for validating shipping addresses, payment methods, checkout forms, and gift options for Mexican e-commerce
 * @module validators/checkout
 */

import { z } from 'zod';
import { MEXICAN_STATES } from '@/lib/constants/states';

/**
 * Phone validation - Mexican format
 */
const phoneRegex = /^(\+52)?[\s.-]?(\d{2,3})[\s.-]?(\d{3,4})[\s.-]?(\d{4})$/;

/**
 * Postal code validation - Mexican format (5 digits)
 */
const postalCodeRegex = /^\d{5}$/;

/**
 * Shipping address schema
 */
export const shippingAddressSchema = z.object({
  firstName: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
    .regex(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, 'El nombre solo puede contener letras'),

  lastName: z
    .string()
    .min(2, 'Los apellidos deben tener al menos 2 caracteres')
    .max(100, 'Los apellidos no pueden exceder 100 caracteres')
    .regex(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/, 'Los apellidos solo pueden contener letras'),

  email: z
    .string()
    .email('Ingresa un correo electrónico válido')
    .max(100, 'El correo no puede exceder 100 caracteres'),

  phone: z
    .string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15, 'El teléfono no puede exceder 15 caracteres')
    .regex(phoneRegex, 'Ingresa un número de teléfono válido'),

  street: z
    .string()
    .min(3, 'La calle debe tener al menos 3 caracteres')
    .max(200, 'La calle no puede exceder 200 caracteres'),

  streetNumber: z
    .string()
    .min(1, 'El número es requerido')
    .max(20, 'El número no puede exceder 20 caracteres'),

  apartment: z.string().max(50, 'El número interior no puede exceder 50 caracteres').optional(),

  neighborhood: z
    .string()
    .min(2, 'La colonia debe tener al menos 2 caracteres')
    .max(100, 'La colonia no puede exceder 100 caracteres'),

  city: z
    .string()
    .min(2, 'La ciudad debe tener al menos 2 caracteres')
    .max(100, 'La ciudad no puede exceder 100 caracteres'),

  state: z.enum(MEXICAN_STATES, {
    error: 'Selecciona un estado válido',
  }),

  postalCode: z
    .string()
    .length(5, 'El código postal debe tener 5 dígitos')
    .regex(postalCodeRegex, 'El código postal debe contener solo números'),

  references: z.string().max(500, 'Las referencias no pueden exceder 500 caracteres').optional(),
});

/**
 * Payment method schema
 */
export const paymentMethodSchema = z.enum(['card', 'mercadopago', 'oxxo', 'spei', 'paypal'], {
  error: 'Selecciona un método de pago válido',
});

/**
 * Complete checkout form schema
 */
export const checkoutFormSchema = z.object({
  shippingAddress: shippingAddressSchema,
  paymentMethod: paymentMethodSchema,
  saveAddress: z.boolean().default(false),
  acceptTerms: z.literal(true, {
    error: 'Debes aceptar los términos y condiciones',
  }),
  giftWrap: z.boolean().optional().default(false),
  giftMessage: z.string().max(500, 'El mensaje no puede exceder 500 caracteres').optional(),
  notes: z.string().max(500, 'Las notas no pueden exceder 500 caracteres').optional(),
});

/**
 * Gift options schema (for gift wrap step)
 */
export const giftOptionsSchema = z
  .object({
    giftWrap: z.boolean().default(false),
    giftMessage: z.string().max(500, 'El mensaje no puede exceder 500 caracteres').optional(),
  })
  .refine((data) => !data.giftWrap || (data.giftMessage && data.giftMessage.length > 0), {
    message: 'Incluye un mensaje para tu regalo',
    path: ['giftMessage'],
  });

// Type exports
export type ShippingAddressInput = z.infer<typeof shippingAddressSchema>;
export type PaymentMethodInput = z.infer<typeof paymentMethodSchema>;
export type CheckoutFormInput = z.infer<typeof checkoutFormSchema>;
export type GiftOptionsInput = z.infer<typeof giftOptionsSchema>;

/**
 * Validate shipping address
 */
export function validateShippingAddress(data: unknown) {
  return shippingAddressSchema.safeParse(data);
}

/**
 * Validate payment method
 */
export function validatePaymentMethod(data: unknown) {
  return paymentMethodSchema.safeParse(data);
}

/**
 * Validate complete checkout form
 */
export function validateCheckoutForm(data: unknown) {
  return checkoutFormSchema.safeParse(data);
}

/**
 * Get field error message
 */
export function getFieldError(zodError: z.ZodError | null, field: string): string | undefined {
  if (!zodError) return undefined;
  const issue = zodError.issues.find((e) => e.path.join('.') === field);
  return issue?.message;
}
