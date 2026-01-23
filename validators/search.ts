/**
 * @fileoverview Search validation schemas
 * Provides Zod schemas for validating search queries and filter inputs with price range refinement
 * @module validators/search
 */

import { z } from 'zod';

export const searchQuerySchema = z
  .object({
    q: z.string().min(1, 'Búsqueda no puede estar vacía').max(100, 'Búsqueda muy larga'),
    category: z.string().optional(),
    state: z.string().optional(),
    minPrice: z.number().nonnegative().optional(),
    maxPrice: z.number().positive().optional(),
    sortBy: z.enum(['relevance', 'price-asc', 'price-desc', 'rating-desc', 'newest']).optional(),
    page: z.number().int().positive().default(1),
    limit: z.number().int().positive().max(100).default(20),
  })
  .refine(
    (data) => {
      if (data.minPrice !== undefined && data.maxPrice !== undefined) {
        return data.minPrice <= data.maxPrice;
      }
      return true;
    },
    {
      message: 'El precio mínimo debe ser menor que el máximo',
      path: ['minPrice'],
    }
  );

export const filterSchema = z.object({
  categories: z.array(z.string()).optional(),
  states: z.array(z.string()).optional(),
  priceRange: z.tuple([z.number().nonnegative(), z.number().positive()]).optional(),
  minRating: z.number().min(0).max(5).optional(),
  inStock: z.boolean().optional(),
  verified: z.boolean().optional(),
  featured: z.boolean().optional(),
});

export type SearchQueryInput = z.infer<typeof searchQuerySchema>;
export type FilterInput = z.infer<typeof filterSchema>;
