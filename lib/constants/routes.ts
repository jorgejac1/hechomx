/**
 * Application routes configuration
 * Centralized route definitions to avoid hardcoded paths
 */

/**
 * Application routes configuration
 * Centralized route definitions to avoid hardcoded paths
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  ABOUT: '/nosotros',
  CONTACT: '/contacto',

  // Products
  PRODUCTS: '/productos',
  PRODUCT_DETAIL: (id: string) => `/productos/${id}`,

  // Shops (formerly artesanos)
  SHOPS: '/tiendas',
  SHOP_DETAIL: (shopId: string) => `/tiendas/${shopId}`,

  // Artisan Stories
  ARTISAN: '/artesano',
  ARTISAN_STORY: (artisanId: string) => `/artesano/${artisanId}`,

  // Cart & Checkout
  CART: '/carrito',
  CHECKOUT: '/checkout',
  COMPARISON: '/comparar',

  // User account
  LOGIN: '/iniciar-sesion',
  REGISTER: '/registro',
  ACCOUNT: '/cuenta',
  PROFILE: '/cuenta/perfil',
  ORDERS: '/cuenta/pedidos',
  ORDER_DETAIL: (orderId: string) => `/cuenta/pedidos/${orderId}`,
  WISHLIST: '/favoritos',

  // Seller routes
  SELL: '/vender',
  DASHBOARD: '/dashboard',
  CREATE_PRODUCT: '/productos/crear',
  EDIT_PRODUCT: (productId: string) => `/productos/${productId}/editar`,
  SELLER_ORDERS: '/dashboard/pedidos',
  PRICING_CALCULATOR: '/calculadora-precios',

  // Help & Support
  HELP: '/ayuda',
  FAQ: '/ayuda/faq',
  SHIPPING_INFO: '/ayuda/envios',
  RETURNS_INFO: '/ayuda/devoluciones',
  PAYMENT_INFO: '/ayuda/pagos',

  // Legal & Policies
  TERMS: '/politicas/terminos',
  PRIVACY: '/politicas/privacidad',
  COOKIES: '/politicas/cookies',
  LEGAL_NOTICE: '/politicas/aviso',
  RETURNS_POLICY: '/politicas/devoluciones',
  SHIPPING_POLICY: '/politicas/envios',

  // Blog
  BLOG: '/blog',
  BLOG_POST: (slug: string) => `/blog/${slug}`,

  // Other
  SEARCH: '/buscar',
  APP_DOWNLOAD: '/app',
} as const;

export type RouteKey = keyof typeof ROUTES;

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
