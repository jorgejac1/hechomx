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

  // Auth routes
  LOGIN: '/login',
  REGISTER: '/registro',
  FORGOT_PASSWORD: '/recuperar-password',
  PROFILE: '/perfil',
  MI_IMPACTO: '/mi-impacto',
  DASHBOARD: '/dashboard',
  ORDERS: '/pedidos',
  WISHLIST: '/favoritos',

  MESSAGES: '/mensajes',
  REVIEWS_MANAGEMENT: '/resenas-gestion',
  ORDERS_MANAGEMENT: '/pedidos-gestion',
} as const;

export const API_ROUTES = {
  PRODUCTS: '/api/products',
  PRODUCT: (id: string) => `/api/products/${id}`,

  // Auth API routes
  LOGIN: '/api/auth/login',
  REGISTER: '/api/auth/register',
  LOGOUT: '/api/auth/logout',
  PROFILE: '/api/auth/profile',
  DASHBOARD: '/dashboard',
} as const;
