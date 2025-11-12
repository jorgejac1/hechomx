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
  MY_IMPACT: '/mi-impacto',
  DASHBOARD: '/dashboard',
  ORDERS: '/pedidos',
  WISHLIST: '/favoritos',
  TASKS_CENTER: '/centro-tareas',

  MY_STORY: '/mi-historia',

  SHOP: '/tienda',
  PRODUCT_CREATE: '/productos/crear',
  PRODUCT_MANAGE: '/productos/gestionar',

  ARTISAN: '/artesano',

  PRICING_CALCULATOR: '/calculadora-precios',

  MESSAGES: '/mensajes',
  REVIEWS_MANAGEMENT: '/resenas-gestion',
  ORDERS_MANAGEMENT: '/pedidos-gestion',

  IMPACT: '/impacto',
  HELP: '/ayuda',
  SELL: '/vender',
  GIFTS: '/regalos',
} as const;
