/**
 * @fileoverview Achievement definitions for buyers and sellers.
 * Contains all achievement configurations, categories, and helper functions.
 * @module lib/constants/achievements
 */

import type {
  AchievementDefinition,
  AchievementCategory,
  CategoryInfo,
  BuyerAchievementCategory,
  SellerAchievementCategory,
  AchievementRarity,
} from '@/lib/types/achievements';

// ============================================================================
// CATEGORY DEFINITIONS
// ============================================================================

export const BUYER_CATEGORIES: Record<BuyerAchievementCategory, CategoryInfo> = {
  getting_started: {
    id: 'getting_started',
    label: 'Primeros Pasos',
    icon: 'Sprout',
    description: 'Comienza tu viaje apoyando artesanos mexicanos',
  },
  cultural_explorer: {
    id: 'cultural_explorer',
    label: 'Explorador Cultural',
    icon: 'Map',
    description: 'Descubre la riqueza artesanal de México',
  },
  artisan_support: {
    id: 'artisan_support',
    label: 'Apoyo Artesanal',
    icon: 'Users',
    description: 'Impacta la vida de familias artesanas',
  },
  environmental: {
    id: 'environmental',
    label: 'Impacto Ambiental',
    icon: 'Leaf',
    description: 'Contribuye a un futuro más sostenible',
  },
  shopping: {
    id: 'shopping',
    label: 'Compras',
    icon: 'ShoppingBag',
    description: 'Celebra tus hitos de compra',
  },
  categories: {
    id: 'categories',
    label: 'Categorías',
    icon: 'Palette',
    description: 'Explora la diversidad artesanal',
  },
  reviews: {
    id: 'reviews',
    label: 'Campeón de Reseñas',
    icon: 'MessageSquarePlus',
    description: 'Comparte tu opinión y ayuda a otros compradores',
  },
  social: {
    id: 'social',
    label: 'Social',
    icon: 'Share2',
    description: 'Conecta y comparte con la comunidad',
  },
  special: {
    id: 'special',
    label: 'Especiales',
    icon: 'Star',
    description: 'Logros únicos y temporales',
  },
};

export const SELLER_CATEGORIES: Record<SellerAchievementCategory, CategoryInfo> = {
  getting_started: {
    id: 'getting_started',
    label: 'Primeros Pasos',
    icon: 'Rocket',
    description: 'Inicia tu camino como vendedor',
  },
  sales: {
    id: 'sales',
    label: 'Ventas',
    icon: 'Package',
    description: 'Celebra tus hitos de ventas',
  },
  revenue: {
    id: 'revenue',
    label: 'Ingresos',
    icon: 'TrendingUp',
    description: 'Alcanza metas de ingresos',
  },
  quality: {
    id: 'quality',
    label: 'Calidad',
    icon: 'Star',
    description: 'Mantén la excelencia en tu servicio',
  },
  service: {
    id: 'service',
    label: 'Servicio al Cliente',
    icon: 'MessageCircle',
    description: 'Destaca por tu atención',
  },
  speed: {
    id: 'speed',
    label: 'Velocidad',
    icon: 'Zap',
    description: 'Destaca por tu rapidez de envío',
  },
  catalog: {
    id: 'catalog',
    label: 'Catálogo',
    icon: 'Grid3X3',
    description: 'Expande tu oferta de productos',
  },
  community: {
    id: 'community',
    label: 'Comunidad',
    icon: 'Users',
    description: 'Forma parte de nuestra comunidad',
  },
  growth: {
    id: 'growth',
    label: 'Crecimiento',
    icon: 'Sparkles',
    description: 'Crece y evoluciona tu negocio',
  },
};

// ============================================================================
// BUYER ACHIEVEMENTS
// ============================================================================

export const BUYER_ACHIEVEMENTS: AchievementDefinition[] = [
  // === Getting Started ===
  {
    id: 'b-first-purchase',
    name: 'Primera Compra',
    description: 'Tu primera compra artesanal',
    icon: 'ShoppingBag',
    tier: 'bronze',
    category: 'getting_started',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'orders_count', targetValue: 1 },
    order: 1,
  },
  {
    id: 'b-first-review',
    name: 'Tu Voz Importa',
    description: 'Dejaste tu primera reseña',
    icon: 'MessageSquare',
    tier: 'bronze',
    category: 'getting_started',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'reviews_count', targetValue: 1 },
    order: 2,
  },
  {
    id: 'b-first-favorite',
    name: 'Coleccionista',
    description: 'Agregaste tu primer favorito',
    icon: 'Heart',
    tier: 'bronze',
    category: 'getting_started',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'favorites_count', targetValue: 1 },
    order: 3,
  },

  // === Cultural Explorer ===
  {
    id: 'b-states-3',
    name: 'Explorador de Estados',
    description: 'Compraste de 3 estados diferentes',
    icon: 'MapPin',
    tier: 'bronze',
    category: 'cultural_explorer',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'states_count', targetValue: 3 },
    order: 1,
  },
  {
    id: 'b-states-10',
    name: 'Viajero Cultural',
    description: 'Compraste de 10 estados diferentes',
    icon: 'Compass',
    tier: 'silver',
    category: 'cultural_explorer',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'states_count', targetValue: 10 },
    order: 2,
  },
  {
    id: 'b-states-20',
    name: 'Embajador de México',
    description: 'Compraste de 20+ estados',
    icon: 'Flag',
    tier: 'gold',
    category: 'cultural_explorer',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'states_count', targetValue: 20 },
    order: 3,
  },
  {
    id: 'b-all-states',
    name: 'Conocedor Nacional',
    description: 'Compraste de todos los estados',
    icon: 'Crown',
    tier: 'platinum',
    category: 'cultural_explorer',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'states_count', targetValue: 32 },
    order: 4,
  },

  // === Artisan Support ===
  {
    id: 'b-artisans-5',
    name: 'Mecenas Principiante',
    description: 'Apoyaste a 5 artesanos',
    icon: 'Users',
    tier: 'bronze',
    category: 'artisan_support',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'artisans_count', targetValue: 5 },
    order: 1,
  },
  {
    id: 'b-artisans-15',
    name: 'Mecenas Dedicado',
    description: 'Apoyaste a 15 artesanos',
    icon: 'Users',
    tier: 'silver',
    category: 'artisan_support',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'artisans_count', targetValue: 15 },
    order: 2,
  },
  {
    id: 'b-artisans-50',
    name: 'Mecenas Legendario',
    description: 'Apoyaste a 50 artesanos',
    icon: 'Crown',
    tier: 'gold',
    category: 'artisan_support',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'artisans_count', targetValue: 50 },
    order: 3,
  },
  {
    id: 'b-repeat-buyer',
    name: 'Cliente Fiel',
    description: 'Compraste 3+ veces al mismo artesano',
    icon: 'Heart',
    tier: 'silver',
    category: 'artisan_support',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'repeat_purchases', targetValue: 3 },
    order: 4,
  },

  // === Environmental Impact ===
  {
    id: 'b-eco-10kg',
    name: 'Guardián Verde',
    description: 'Ahorraste 10kg de CO₂',
    icon: 'Leaf',
    tier: 'bronze',
    category: 'environmental',
    userType: 'buyer',
    criteria: { type: 'threshold', metric: 'co2_saved', targetValue: 10 },
    order: 1,
  },
  {
    id: 'b-eco-50kg',
    name: 'Eco Héroe',
    description: 'Ahorraste 50kg de CO₂',
    icon: 'TreePine',
    tier: 'silver',
    category: 'environmental',
    userType: 'buyer',
    criteria: { type: 'threshold', metric: 'co2_saved', targetValue: 50 },
    order: 2,
  },
  {
    id: 'b-eco-100kg',
    name: 'Protector del Planeta',
    description: 'Ahorraste 100kg de CO₂',
    icon: 'Globe',
    tier: 'gold',
    category: 'environmental',
    userType: 'buyer',
    criteria: { type: 'threshold', metric: 'co2_saved', targetValue: 100 },
    order: 3,
  },

  // === Shopping Milestones ===
  {
    id: 'b-orders-10',
    name: 'Comprador Activo',
    description: '10 compras realizadas',
    icon: 'Package',
    tier: 'bronze',
    category: 'shopping',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'orders_count', targetValue: 10 },
    order: 1,
  },
  {
    id: 'b-orders-25',
    name: 'Comprador Frecuente',
    description: '25 compras realizadas',
    icon: 'Package',
    tier: 'silver',
    category: 'shopping',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'orders_count', targetValue: 25 },
    order: 2,
  },
  {
    id: 'b-orders-50',
    name: 'Comprador Experto',
    description: '50 compras realizadas',
    icon: 'Award',
    tier: 'gold',
    category: 'shopping',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'orders_count', targetValue: 50 },
    order: 3,
  },
  {
    id: 'b-orders-100',
    name: 'Comprador Leyenda',
    description: '100 compras realizadas',
    icon: 'Trophy',
    tier: 'platinum',
    category: 'shopping',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'orders_count', targetValue: 100 },
    order: 4,
  },

  // === Categories ===
  {
    id: 'b-cat-3',
    name: 'Gustos Variados',
    description: 'Compraste de 3 categorías diferentes',
    icon: 'Palette',
    tier: 'bronze',
    category: 'categories',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'categories_count', targetValue: 3 },
    order: 1,
  },
  {
    id: 'b-cat-all',
    name: 'Coleccionista Total',
    description: 'Compraste de todas las categorías',
    icon: 'Sparkles',
    tier: 'gold',
    category: 'categories',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'categories_count', targetValue: 10 },
    order: 2,
  },

  // === Review Champion ===
  {
    id: 'b-reviews-5',
    name: 'Opinador',
    description: 'Escribiste 5 reseñas',
    icon: 'MessageSquare',
    tier: 'bronze',
    category: 'reviews',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'reviews_count', targetValue: 5 },
    order: 1,
  },
  {
    id: 'b-reviews-15',
    name: 'Crítico Dedicado',
    description: 'Escribiste 15 reseñas',
    icon: 'MessageSquarePlus',
    tier: 'silver',
    category: 'reviews',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'reviews_count', targetValue: 15 },
    order: 2,
  },
  {
    id: 'b-reviews-50',
    name: 'Campeón de Reseñas',
    description: 'Escribiste 50 reseñas',
    icon: 'Award',
    tier: 'gold',
    category: 'reviews',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'reviews_count', targetValue: 50 },
    order: 3,
    reward: {
      type: 'badge',
      value: 'review_champion',
      description: 'Distintivo de Campeón de Reseñas en tu perfil',
    },
  },
  {
    id: 'b-photo-reviews-10',
    name: 'Fotógrafo de Compras',
    description: '10 reseñas con fotos',
    icon: 'Camera',
    tier: 'silver',
    category: 'reviews',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'reviews_with_photos', targetValue: 10 },
    order: 4,
  },
  {
    id: 'b-helpful-reviews',
    name: 'Reseñas Útiles',
    description: '20 reseñas marcadas como útiles',
    icon: 'ThumbsUp',
    tier: 'gold',
    category: 'reviews',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'helpful_reviews', targetValue: 20 },
    order: 5,
    hidden: true,
    hint: 'Escribe reseñas detalladas y útiles',
  },

  // === Social ===
  {
    id: 'b-referral-1',
    name: 'Embajador',
    description: 'Referiste a tu primer amigo',
    icon: 'UserPlus',
    tier: 'bronze',
    category: 'social',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'referrals_count', targetValue: 1 },
    order: 1,
  },
  {
    id: 'b-referral-5',
    name: 'Super Embajador',
    description: 'Referiste a 5 amigos',
    icon: 'Users',
    tier: 'silver',
    category: 'social',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'referrals_count', targetValue: 5 },
    order: 2,
    reward: {
      type: 'credit',
      value: 100,
      description: '$100 MXN de crédito en tu próxima compra',
    },
  },
  {
    id: 'b-referral-10',
    name: 'Influencer Artesanal',
    description: 'Referiste a 10 amigos',
    icon: 'Megaphone',
    tier: 'gold',
    category: 'social',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'referrals_count', targetValue: 10 },
    order: 3,
    reward: {
      type: 'discount',
      value: 15,
      description: '15% de descuento en tu próxima compra',
      expiresInDays: 30,
    },
  },
  {
    id: 'b-gift-giver',
    name: 'Espíritu Generoso',
    description: 'Enviaste tu primer regalo',
    icon: 'Gift',
    tier: 'bronze',
    category: 'social',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'gifts_sent', targetValue: 1 },
    order: 4,
  },
  {
    id: 'b-gift-master',
    name: 'Maestro de Regalos',
    description: 'Enviaste 10 regalos',
    icon: 'Gift',
    tier: 'gold',
    category: 'social',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'gifts_sent', targetValue: 10 },
    order: 5,
    hidden: true,
    hint: 'Comparte el amor artesanal con regalos',
  },
  {
    id: 'b-wishlist-shared',
    name: 'Lista de Deseos Completa',
    description: '10 productos en tu lista de deseos',
    icon: 'ListHeart',
    tier: 'bronze',
    category: 'social',
    userType: 'buyer',
    criteria: { type: 'count', metric: 'wishlist_count', targetValue: 10 },
    order: 6,
  },

  // === Special ===
  {
    id: 'b-dia-muertos',
    name: 'Tradición Viva',
    description: 'Compraste en Día de Muertos',
    icon: 'Skull',
    tier: 'silver',
    category: 'special',
    userType: 'buyer',
    criteria: {
      type: 'date',
      metric: 'order_date',
      targetValue: 'dia_muertos',
      conditions: { months: [11], days: [1, 2] },
    },
    order: 1,
  },
  {
    id: 'b-navidad',
    name: 'Navidad Artesanal',
    description: 'Compraste en época navideña',
    icon: 'Gift',
    tier: 'silver',
    category: 'special',
    userType: 'buyer',
    criteria: {
      type: 'date',
      metric: 'order_date',
      targetValue: 'navidad',
      conditions: { months: [12] },
    },
    order: 2,
  },
  {
    id: 'b-buen-fin',
    name: 'Cazador del Buen Fin',
    description: 'Compraste durante el Buen Fin',
    icon: 'Tag',
    tier: 'silver',
    category: 'special',
    userType: 'buyer',
    criteria: {
      type: 'date',
      metric: 'order_date',
      targetValue: 'buen_fin',
      conditions: { months: [11], weeks: [3] },
    },
    order: 3,
    reward: {
      type: 'discount',
      value: 10,
      description: '10% de descuento adicional',
      expiresInDays: 7,
    },
  },
  {
    id: 'b-early-adopter',
    name: 'Early Adopter',
    description: 'Te uniste en el primer año',
    icon: 'Zap',
    tier: 'gold',
    category: 'special',
    userType: 'buyer',
    criteria: { type: 'date', metric: 'join_date', targetValue: 'first_year' },
    order: 4,
    rarity: 'legendary' as AchievementRarity,
  },
  {
    id: 'b-night-owl',
    name: 'Búho Nocturno',
    description: 'Compraste a las 3am',
    icon: 'Moon',
    tier: 'bronze',
    category: 'special',
    userType: 'buyer',
    criteria: {
      type: 'date',
      metric: 'order_date',
      targetValue: 'night_owl',
      conditions: { hours: [3] },
    },
    order: 5,
    hidden: true,
    hint: 'Los artesanos no duermen...',
  },
  {
    id: 'b-big-spender',
    name: 'Gran Mecenas',
    description: 'Una compra de más de $5,000 MXN',
    icon: 'Gem',
    tier: 'gold',
    category: 'special',
    userType: 'buyer',
    criteria: {
      type: 'threshold',
      metric: 'total_spent',
      targetValue: 5000,
      conditions: { singleOrder: true },
    },
    order: 6,
    hidden: true,
    hint: 'Apoya en grande',
  },
];

// ============================================================================
// SELLER ACHIEVEMENTS
// ============================================================================

export const SELLER_ACHIEVEMENTS: AchievementDefinition[] = [
  // === Getting Started ===
  {
    id: 's-first-sale',
    name: 'Primera Venta',
    description: '¡Tu primera venta!',
    icon: 'DollarSign',
    tier: 'bronze',
    category: 'getting_started',
    userType: 'seller',
    criteria: { type: 'count', metric: 'sales_count', targetValue: 1 },
    order: 1,
  },
  {
    id: 's-first-review',
    name: 'Primer Aplauso',
    description: 'Recibiste tu primera reseña',
    icon: 'Star',
    tier: 'bronze',
    category: 'getting_started',
    userType: 'seller',
    criteria: { type: 'count', metric: 'reviews_count', targetValue: 1 },
    order: 2,
  },
  {
    id: 's-profile-complete',
    name: 'Perfil Completo',
    description: 'Completaste tu perfil al 100%',
    icon: 'CheckCircle',
    tier: 'bronze',
    category: 'getting_started',
    userType: 'seller',
    criteria: { type: 'percentage', metric: 'profile_completion', targetValue: 100 },
    order: 3,
  },

  // === Sales Milestones ===
  {
    id: 's-sales-10',
    name: 'Vendedor Activo',
    description: '10 ventas realizadas',
    icon: 'Package',
    tier: 'bronze',
    category: 'sales',
    userType: 'seller',
    criteria: { type: 'count', metric: 'sales_count', targetValue: 10 },
    order: 1,
  },
  {
    id: 's-sales-50',
    name: 'Vendedor Experimentado',
    description: '50 ventas realizadas',
    icon: 'Package',
    tier: 'silver',
    category: 'sales',
    userType: 'seller',
    criteria: { type: 'count', metric: 'sales_count', targetValue: 50 },
    order: 2,
  },
  {
    id: 's-sales-100',
    name: 'Vendedor Estrella',
    description: '100 ventas realizadas',
    icon: 'Star',
    tier: 'gold',
    category: 'sales',
    userType: 'seller',
    criteria: { type: 'count', metric: 'sales_count', targetValue: 100 },
    order: 3,
  },
  {
    id: 's-sales-500',
    name: 'Vendedor Leyenda',
    description: '500 ventas realizadas',
    icon: 'Trophy',
    tier: 'platinum',
    category: 'sales',
    userType: 'seller',
    criteria: { type: 'count', metric: 'sales_count', targetValue: 500 },
    order: 4,
  },
  {
    id: 's-sales-1000',
    name: 'Mil Ventas',
    description: '¡1,000 ventas realizadas!',
    icon: 'Crown',
    tier: 'platinum',
    category: 'sales',
    userType: 'seller',
    criteria: { type: 'count', metric: 'sales_count', targetValue: 1000 },
    order: 5,
    rarity: 'legendary' as AchievementRarity,
    reward: {
      type: 'badge',
      value: 'elite_seller',
      description: 'Distintivo de Vendedor Élite en tu tienda',
    },
  },

  // === Revenue Milestones ===
  {
    id: 's-revenue-5k',
    name: 'Umbral de $5,000',
    description: 'Alcanzaste $5,000 en ventas',
    icon: 'TrendingUp',
    tier: 'bronze',
    category: 'revenue',
    userType: 'seller',
    criteria: { type: 'threshold', metric: 'revenue_total', targetValue: 5000 },
    order: 1,
  },
  {
    id: 's-revenue-25k',
    name: 'Club de $25,000',
    description: 'Alcanzaste $25,000 en ventas',
    icon: 'TrendingUp',
    tier: 'silver',
    category: 'revenue',
    userType: 'seller',
    criteria: { type: 'threshold', metric: 'revenue_total', targetValue: 25000 },
    order: 2,
  },
  {
    id: 's-revenue-100k',
    name: 'Élite de $100,000',
    description: 'Alcanzaste $100,000 en ventas',
    icon: 'Gem',
    tier: 'gold',
    category: 'revenue',
    userType: 'seller',
    criteria: { type: 'threshold', metric: 'revenue_total', targetValue: 100000 },
    order: 3,
  },
  {
    id: 's-revenue-500k',
    name: 'Millonario Artesanal',
    description: 'Alcanzaste $500,000 en ventas',
    icon: 'Crown',
    tier: 'platinum',
    category: 'revenue',
    userType: 'seller',
    criteria: { type: 'threshold', metric: 'revenue_total', targetValue: 500000 },
    order: 4,
  },

  // === Quality & Reviews ===
  {
    id: 's-rating-4.5',
    name: 'Alta Calidad',
    description: 'Mantén 4.5+ estrellas',
    icon: 'Star',
    tier: 'silver',
    category: 'quality',
    userType: 'seller',
    criteria: { type: 'threshold', metric: 'rating_average', targetValue: 4.5 },
    order: 1,
  },
  {
    id: 's-rating-perfect',
    name: 'Perfección',
    description: '5.0 estrellas con 10+ reseñas',
    icon: 'Sparkles',
    tier: 'gold',
    category: 'quality',
    userType: 'seller',
    criteria: {
      type: 'threshold',
      metric: 'rating_average',
      targetValue: 5.0,
      conditions: { minReviews: 10 },
    },
    order: 2,
  },
  {
    id: 's-reviews-25',
    name: '25 Aplausos',
    description: 'Recibiste 25 reseñas',
    icon: 'ThumbsUp',
    tier: 'silver',
    category: 'quality',
    userType: 'seller',
    criteria: { type: 'count', metric: 'reviews_count', targetValue: 25 },
    order: 3,
  },
  {
    id: 's-reviews-100',
    name: '100 Aplausos',
    description: 'Recibiste 100 reseñas',
    icon: 'Award',
    tier: 'gold',
    category: 'quality',
    userType: 'seller',
    criteria: { type: 'count', metric: 'reviews_count', targetValue: 100 },
    order: 4,
  },

  // === Customer Service ===
  {
    id: 's-response-90',
    name: 'Respuesta Rápida',
    description: '90%+ tasa de respuesta',
    icon: 'Clock',
    tier: 'bronze',
    category: 'service',
    userType: 'seller',
    criteria: { type: 'percentage', metric: 'response_rate', targetValue: 90 },
    order: 1,
  },
  {
    id: 's-response-100',
    name: 'Siempre Presente',
    description: '100% tasa de respuesta',
    icon: 'Zap',
    tier: 'silver',
    category: 'service',
    userType: 'seller',
    criteria: { type: 'percentage', metric: 'response_rate', targetValue: 100 },
    order: 2,
  },
  {
    id: 's-repeat-customers',
    name: 'Clientes Fieles',
    description: '10+ clientes recurrentes',
    icon: 'Heart',
    tier: 'gold',
    category: 'service',
    userType: 'seller',
    criteria: { type: 'count', metric: 'repeat_customers', targetValue: 10 },
    order: 3,
  },

  // === Speed ===
  {
    id: 's-fast-responder',
    name: 'Respuesta Relámpago',
    description: 'Responde en menos de 1 hora (promedio)',
    icon: 'MessageCircle',
    tier: 'silver',
    category: 'speed',
    userType: 'seller',
    criteria: { type: 'threshold', metric: 'response_time_hours', targetValue: 1 },
    order: 1,
  },
  {
    id: 's-same-day-ship-10',
    name: 'Envío Express',
    description: '10 pedidos enviados el mismo día',
    icon: 'Truck',
    tier: 'bronze',
    category: 'speed',
    userType: 'seller',
    criteria: { type: 'count', metric: 'orders_same_day_shipped', targetValue: 10 },
    order: 2,
  },
  {
    id: 's-same-day-ship-50',
    name: 'Maestro del Envío Rápido',
    description: '50 pedidos enviados el mismo día',
    icon: 'Rocket',
    tier: 'silver',
    category: 'speed',
    userType: 'seller',
    criteria: { type: 'count', metric: 'orders_same_day_shipped', targetValue: 50 },
    order: 3,
  },
  {
    id: 's-speed-demon',
    name: 'Velocista Artesanal',
    description: 'Promedio de envío menor a 24 horas',
    icon: 'Zap',
    tier: 'gold',
    category: 'speed',
    userType: 'seller',
    criteria: { type: 'threshold', metric: 'shipping_time_hours', targetValue: 24 },
    order: 4,
    reward: {
      type: 'feature',
      value: 'speed_badge',
      description: 'Distintivo de "Envío Rápido" en tus productos',
    },
  },
  {
    id: 's-zero-returns',
    name: 'Perfección Total',
    description: '0% devoluciones con 50+ ventas',
    icon: 'ShieldCheck',
    tier: 'gold',
    category: 'speed',
    userType: 'seller',
    criteria: {
      type: 'percentage',
      metric: 'return_rate',
      targetValue: 0,
      conditions: { minSales: 50 },
    },
    order: 5,
    hidden: true,
    hint: 'La calidad habla por sí misma',
  },

  // === Product Catalog ===
  {
    id: 's-products-10',
    name: 'Catálogo Inicial',
    description: '10 productos publicados',
    icon: 'Grid3X3',
    tier: 'bronze',
    category: 'catalog',
    userType: 'seller',
    criteria: { type: 'count', metric: 'products_count', targetValue: 10 },
    order: 1,
  },
  {
    id: 's-products-50',
    name: 'Catálogo Extenso',
    description: '50 productos publicados',
    icon: 'Grid3X3',
    tier: 'silver',
    category: 'catalog',
    userType: 'seller',
    criteria: { type: 'count', metric: 'products_count', targetValue: 50 },
    order: 2,
  },
  {
    id: 's-bestseller',
    name: 'Bestseller',
    description: 'Un producto con 25+ ventas',
    icon: 'Flame',
    tier: 'gold',
    category: 'catalog',
    userType: 'seller',
    criteria: { type: 'count', metric: 'bestseller_count', targetValue: 1 },
    order: 3,
  },
  {
    id: 's-video-1',
    name: 'Primer Video',
    description: 'Agregaste un video a tu producto',
    icon: 'Video',
    tier: 'bronze',
    category: 'catalog',
    userType: 'seller',
    criteria: { type: 'count', metric: 'products_with_video', targetValue: 1 },
    order: 4,
  },
  {
    id: 's-video-5',
    name: 'Creador de Contenido',
    description: '5 productos con video',
    icon: 'Film',
    tier: 'silver',
    category: 'catalog',
    userType: 'seller',
    criteria: { type: 'count', metric: 'products_with_video', targetValue: 5 },
    order: 5,
    reward: {
      type: 'feature',
      value: 'video_boost',
      description: 'Tus productos con video aparecen primero en búsquedas',
    },
  },
  {
    id: 's-video-20',
    name: 'Maestro Audiovisual',
    description: '20 productos con video',
    icon: 'Clapperboard',
    tier: 'gold',
    category: 'catalog',
    userType: 'seller',
    criteria: { type: 'count', metric: 'products_with_video', targetValue: 20 },
    order: 6,
    hidden: true,
    hint: 'Muestra tu arte en movimiento',
  },

  // === Community ===
  {
    id: 's-verified',
    name: 'Artesano Verificado',
    description: 'Obtuviste verificación',
    icon: 'ShieldCheck',
    tier: 'silver',
    category: 'community',
    userType: 'seller',
    criteria: { type: 'status', metric: 'verification_status', targetValue: 'verified' },
    order: 1,
  },
  {
    id: 's-master',
    name: 'Maestro Artesano',
    description: 'Nivel Maestro Artesano',
    icon: 'Crown',
    tier: 'gold',
    category: 'community',
    userType: 'seller',
    criteria: { type: 'status', metric: 'verification_status', targetValue: 'master' },
    order: 2,
  },
  {
    id: 's-story',
    name: 'Cuenta Tu Historia',
    description: 'Publicaste tu historia de artesano',
    icon: 'BookOpen',
    tier: 'bronze',
    category: 'community',
    userType: 'seller',
    criteria: { type: 'status', metric: 'story_published', targetValue: true },
    order: 3,
  },

  // === Growth ===
  {
    id: 's-month-growth',
    name: 'Mes en Crecimiento',
    description: 'Ventas +20% vs mes anterior',
    icon: 'ArrowUp',
    tier: 'silver',
    category: 'growth',
    userType: 'seller',
    criteria: { type: 'percentage', metric: 'month_growth', targetValue: 20, period: 'monthly' },
    order: 1,
  },
  {
    id: 's-year-active',
    name: 'Un Año Activo',
    description: 'Un año vendiendo activamente',
    icon: 'Calendar',
    tier: 'gold',
    category: 'growth',
    userType: 'seller',
    criteria: { type: 'threshold', metric: 'days_active', targetValue: 365 },
    order: 2,
  },
  {
    id: 's-consecutive-30',
    name: 'Racha de 30 Días',
    description: 'Ventas en 30 días consecutivos',
    icon: 'Flame',
    tier: 'gold',
    category: 'growth',
    userType: 'seller',
    criteria: { type: 'streak', metric: 'consecutive_sales_days', targetValue: 30 },
    order: 3,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all achievements for a user type
 */
export function getAchievementsByUserType(userType: 'buyer' | 'seller'): AchievementDefinition[] {
  return userType === 'buyer' ? BUYER_ACHIEVEMENTS : SELLER_ACHIEVEMENTS;
}

/**
 * Get category info for a given category ID
 */
export function getCategoryInfo(
  category: AchievementCategory,
  userType: 'buyer' | 'seller'
): CategoryInfo | undefined {
  const categories = userType === 'buyer' ? BUYER_CATEGORIES : SELLER_CATEGORIES;
  return categories[category as keyof typeof categories];
}

/**
 * Get achievements grouped by category
 */
export function getAchievementsByCategory(
  userType: 'buyer' | 'seller'
): Record<string, AchievementDefinition[]> {
  const achievements = getAchievementsByUserType(userType);
  return achievements.reduce(
    (acc, achievement) => {
      const category = achievement.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(achievement);
      return acc;
    },
    {} as Record<string, AchievementDefinition[]>
  );
}

/**
 * Get achievements by tier
 */
export function getAchievementsByTier(
  userType: 'buyer' | 'seller',
  tier: 'bronze' | 'silver' | 'gold' | 'platinum'
): AchievementDefinition[] {
  return getAchievementsByUserType(userType).filter((a) => a.tier === tier);
}

/**
 * Get a single achievement by ID
 */
export function getAchievementById(id: string): AchievementDefinition | undefined {
  return [...BUYER_ACHIEVEMENTS, ...SELLER_ACHIEVEMENTS].find((a) => a.id === id);
}

/**
 * Get total achievements count by user type
 */
export function getTotalAchievementsCount(userType: 'buyer' | 'seller'): number {
  return getAchievementsByUserType(userType).length;
}
