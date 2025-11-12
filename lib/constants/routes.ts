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
  LOGIN: '/iniciar-sesion',
  REGISTER: '/registro',
  FORGOT_PASSWORD: '/recuperar-password',
  PROFILE: '/perfil',
  MI_IMPACTO: '/mi-impacto',
  MY_IMPACT: '/mi-impacto', // Alias for MI_IMPACTO
  DASHBOARD: '/dashboard',
  ORDERS: '/pedidos',
  WISHLIST: '/favoritos',
  TASKS_CENTER: '/centro-tareas',

  MY_STORY: '/mi-historia',

  SHOP: '/tienda',
  SHOPS: '/tiendas', // New shops listing page
  SHOP_DETAIL: (shopId: string) => `/tiendas/${shopId}`,

  PRODUCT_CREATE: '/productos/crear',
  PRODUCT_MANAGE: '/productos/gestionar',

  ARTISAN: '/artesano',
  ARTISAN_STORY: (artisanId: string) => `/artesano/${artisanId}`,

  PRICING_CALCULATOR: '/calculadora-precios',

  MESSAGES: '/mensajes',
  REVIEWS_MANAGEMENT: '/resenas-gestion',
  ORDERS_MANAGEMENT: '/pedidos-gestion',

  IMPACT: '/impacto',
  HELP: '/ayuda',
  SELL: '/vender',

  // Help & Support pages
  FAQ: '/ayuda/faq',
  SHIPPING_INFO: '/ayuda/envios',
  RETURNS_INFO: '/ayuda/devoluciones',
  PAYMENT_INFO: '/ayuda/pagos',

  // Legal & Policy pages
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

  // Seller routes (aliases for existing routes)
  ACCOUNT: '/perfil',
  SELLER_ORDERS: '/pedidos-gestion',
  CREATE_PRODUCT: '/productos/crear',
  EDIT_PRODUCT: (productId: string) => `/productos/${productId}/editar`,
  ORDER_DETAIL: (orderId: string) => `/pedidos/${orderId}`,
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
