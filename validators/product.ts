/**
 * Product validation schemas
 */

import { z } from 'zod';
import type { SortOption } from '@/types/filters';

export const productSchema = z.object({
  id: z.string().min(1, 'ID es requerido'),
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  description: z.string().min(10, 'La descripción debe tener al menos 10 caracteres'),
  price: z.number().positive('El precio debe ser mayor a 0'),
  currency: z.string().default('MXN'),
  category: z.string().min(1, 'La categoría es requerida'),
  subcategory: z.string().optional(),
  subSubcategory: z.string().optional(),
  state: z.string().min(1, 'El estado es requerido'),
  maker: z.string().min(1, 'El artesano es requerido'),
  images: z
    .array(z.string().url('URL de imagen inválida'))
    .min(1, 'Al menos una imagen es requerida'),
  videos: z.array(z.string().url('URL de video inválida')).optional(),
  inStock: z.boolean().default(true),
  featured: z.boolean().optional(),
  verified: z.boolean().optional(),
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().nonnegative().optional(),
});

export const productQuerySchema = z.object({
  categoria: z.string().optional(),
  estado: z.string().optional(),
  q: z.string().optional(),
  ordenar: z
    .enum(['relevance', 'price-asc', 'price-desc', 'rating-desc', 'newest', 'popular'])
    .optional(),
  pagina: z.string().regex(/^\d+$/).transform(Number).optional(),
  subcategoria: z.string().optional(),
  subsubcategoria: z.string().optional(),
  precio: z.string().regex(/^\d+$/).transform(Number).optional(),
  destacado: z.enum(['si', 'no']).optional(),
  verificado: z.enum(['si', 'no']).optional(),
});

export const productReviewSchema = z.object({
  rating: z.number().min(1, 'Calificación mínima es 1').max(5, 'Calificación máxima es 5'),
  title: z.string().max(100, 'El título no puede exceder 100 caracteres').optional(),
  comment: z
    .string()
    .min(10, 'El comentario debe tener al menos 10 caracteres')
    .max(1000, 'El comentario no puede exceder 1000 caracteres'),
  photos: z.array(z.instanceof(File)).max(5, 'Máximo 5 fotos permitidas').optional(),
});

/**
 * Validates and sanitizes price parameter from URL
 */
export const validatePriceParam = (price: string | null): number | null => {
  if (!price) return null;
  const parsed = parseInt(price, 10);
  if (isNaN(parsed) || parsed < 0 || parsed > 1000000) return null;
  return parsed;
};

/**
 * Validates sort parameter from URL
 */
export const validateSortParam = (sort: string | null): SortOption => {
  const validSorts: SortOption[] = [
    'relevance',
    'price-asc',
    'price-desc',
    'rating-desc',
    'newest',
    'popular',
  ];
  return validSorts.includes(sort as SortOption) ? (sort as SortOption) : 'relevance';
};

/**
 * Validates boolean parameter from URL (si/no)
 */
export const validateBooleanParam = (param: string | null): boolean | null => {
  if (!param) return null;
  return param === 'si';
};

export type ProductInput = z.infer<typeof productSchema>;
export type ProductQuery = z.infer<typeof productQuerySchema>;
export type ProductReviewInput = z.infer<typeof productReviewSchema>;
