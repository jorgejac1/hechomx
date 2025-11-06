/**
 * Filter constants and configurations
 */

export const FILTER_PARAM_NAMES = {
  CATEGORY: 'categoria',
  STATE: 'estado',
  QUERY: 'q',
  SORT: 'ordenar',
  PRICE: 'precio',
  FEATURED: 'destacado',
  VERIFIED: 'verificado',
  IN_STOCK: 'enstock',
  PAGE: 'pagina',
  SUBCATEGORY: 'subcategoria',
  SUBSUBCATEGORY: 'subsubcategoria',
} as const;

export const FILTER_PARAM_VALUES = {
  YES: 'si',
  NO: 'no',
} as const;

export const ITEMS_PER_PAGE = 20;

export const SORT_OPTIONS = [
  { value: 'relevance' as const, label: 'Relevancia' },
  { value: 'price-asc' as const, label: 'Precio: Menor a Mayor' },
  { value: 'price-desc' as const, label: 'Precio: Mayor a Menor' },
  { value: 'rating-desc' as const, label: 'Mejor Calificados' },
  { value: 'newest' as const, label: 'Más Recientes' },
  { value: 'popular' as const, label: 'Más Populares' },
] as const;

export type FilterParamName = (typeof FILTER_PARAM_NAMES)[keyof typeof FILTER_PARAM_NAMES];
export type FilterParamValue = (typeof FILTER_PARAM_VALUES)[keyof typeof FILTER_PARAM_VALUES];
