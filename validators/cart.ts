/**
 * @fileoverview Cart and checkout validation schemas
 * Provides Zod schemas for validating cart operations, shipping addresses, payment methods, and checkout data
 * @module validators/cart
 */

import { z } from 'zod';

export const addToCartSchema = z.object({
  productId: z.string().min(1, 'ID del producto es requerido'),
  quantity: z
    .number()
    .int()
    .positive('La cantidad debe ser mayor a 0')
    .max(99, 'Cantidad máxima es 99'),
});

export const updateCartItemSchema = z.object({
  productId: z.string().min(1, 'ID del producto es requerido'),
  quantity: z
    .number()
    .int()
    .nonnegative('La cantidad debe ser 0 o mayor')
    .max(99, 'Cantidad máxima es 99'),
});

export const shippingAddressSchema = z.object({
  fullName: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  street: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  city: z.string().min(2, 'La ciudad es requerida'),
  state: z.string().min(2, 'El estado es requerido'),
  postalCode: z.string().regex(/^\d{5}$/, 'Código postal inválido (5 dígitos)'),
  country: z.string().default('México'),
  phone: z.string().regex(/^\+?52?\s?\d{10}$/, 'Número de teléfono inválido (10 dígitos)'),
  isDefault: z.boolean().optional(),
});

export const paymentMethodSchema = z
  .object({
    type: z.enum(['card', 'paypal', 'oxxo', 'transfer'], {
      message: 'Método de pago inválido',
    }),
    // Card details
    cardNumber: z.string().optional(),
    cardholderName: z.string().optional(),
    expiryMonth: z.number().int().min(1).max(12).optional(),
    expiryYear: z.number().int().min(new Date().getFullYear()).optional(),
    cvv: z
      .string()
      .regex(/^\d{3,4}$/)
      .optional(),
  })
  .refine(
    (data) => {
      if (data.type === 'card') {
        return (
          data.cardNumber && data.cardholderName && data.expiryMonth && data.expiryYear && data.cvv
        );
      }
      return true;
    },
    {
      message: 'Información de tarjeta incompleta',
      path: ['cardNumber'],
    }
  );

export const checkoutSchema = z.object({
  shippingAddress: shippingAddressSchema,
  paymentMethod: paymentMethodSchema,
  notes: z.string().max(500, 'Las notas no pueden exceder 500 caracteres').optional(),
  terms: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar los términos y condiciones',
  }),
});

export type AddToCartInput = z.infer<typeof addToCartSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export type ShippingAddressInput = z.infer<typeof shippingAddressSchema>;
export type PaymentMethodInput = z.infer<typeof paymentMethodSchema>;
export type CheckoutInput = z.infer<typeof checkoutSchema>;
