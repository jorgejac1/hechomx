/**
 * Application routes
 */

export const ROUTES = {
  HOME: '/',
  PRODUCTS: '/productos',
  PRODUCT_DETAIL: (id: string) => `/productos/${id}`,
  CART: '/carrito',
  COMPARISON: '/comparar',
  CHECKOUT: '/checkout',
  ABOUT: '/nosotros',
  CONTACT: '/contacto',
} as const;

export const API_ROUTES = {
  PRODUCTS: '/api/products',
  PRODUCT: (id: string) => `/api/products/${id}`,
} as const;
