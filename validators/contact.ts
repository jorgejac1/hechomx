/**
 * Contact and communication validation schemas
 */

import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  phone: z
    .string()
    .regex(/^\+?52?\s?\d{10}$/, 'Número de teléfono inválido')
    .optional(),
  subject: z.string().min(5, 'El asunto debe tener al menos 5 caracteres'),
  message: z
    .string()
    .min(20, 'El mensaje debe tener al menos 20 caracteres')
    .max(1000, 'El mensaje no puede exceder 1000 caracteres'),
});

export const newsletterSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  preferences: z.array(z.enum(['products', 'promotions', 'news', 'artisans'])).optional(),
});

export const reportProblemSchema = z.object({
  type: z.enum(['product', 'order', 'payment', 'shipping', 'other'], {
    message: 'Tipo de problema inválido',
  }),
  orderId: z.string().optional(),
  productId: z.string().optional(),
  description: z.string().min(20, 'La descripción debe tener al menos 20 caracteres').max(1000),
  attachments: z.array(z.instanceof(File)).max(5, 'Máximo 5 archivos permitidos').optional(),
});

export const makerContactSchema = z.object({
  makerId: z.string().min(1, 'ID del artesano es requerido'),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('Correo electrónico inválido'),
  message: z.string().min(20, 'El mensaje debe tener al menos 20 caracteres').max(500),
  productId: z.string().optional(),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type ReportProblemInput = z.infer<typeof reportProblemSchema>;
export type MakerContactInput = z.infer<typeof makerContactSchema>;
