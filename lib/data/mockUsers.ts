/**
 * @fileoverview Mock seller user data for development and demos.
 * Contains complete mock profiles for individual sellers, artisans, and companies
 * with products, reviews, orders, stats, and business configurations.
 * @module lib/data/mockUsers
 */

import { User } from '@/contexts/AuthContext';
import type { SellerProduct, Order, Review } from '@/lib/types';
import type { SellerVerification } from '@/lib/types/verification';
import { getAllProducts } from '@/lib/data/products';
import type { Product } from '@/types/product';

export type SellerType = 'individual' | 'artisan' | 'company';

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface ExtendedMakerProfile {
  // Basic Info
  shopName: string;
  sellerType: SellerType;
  location: string;
  description: string;
  story: string;
  verified: boolean;
  verificationBadge?: 'verified' | 'top_seller' | 'artisan_certified' | 'eco_friendly';
  verification?: SellerVerification;

  // Stats
  stats: {
    productsCount: number;
    rating: number;
    reviewsCount: number;
    salesCount: number;
    responseTime: string;
    responseRate: number;
  };

  // Business Details
  businessHours?: BusinessHours[];
  acceptsCustomOrders: boolean;
  acceptsWholesale: boolean;
  minWholesaleOrder?: number;

  // Shipping & Payments
  shippingOptions: {
    national: boolean;
    international: boolean;
    freeShippingOver?: number;
    averageProcessingTime: string;
  };
  paymentMethods: string[];

  // Policies
  returnPolicy: string;
  cancellationPolicy: string;

  // Certifications & Specialties
  certifications: string[];
  specialties: string[];

  // Social & Contact
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };

  // Store Features
  features: {
    customDesigns: boolean;
    bulkOrders: boolean;
    giftWrapping: boolean;
    expressShipping: boolean;
  };

  // Products & Performance
  products: SellerProduct[];
  reviews: Review[];
  recentOrders: Order[];

  // Membership
  memberSince: string;
  lastActive: string;
}

// ============================================================================
// HELPER FUNCTIONS TO DERIVE PRODUCTS FROM products.json
// ============================================================================

/**
 * Convert a Product from products.json to SellerProduct format for dashboard
 */
function productToSellerProduct(product: Product, index: number): SellerProduct {
  // Generate consistent mock stats based on product id for reproducibility
  const seed = parseInt(product.id) || index;
  const sold = 10 + ((seed * 7) % 90);
  const views = 100 + ((seed * 37) % 900);
  const favorites = 5 + ((seed * 3) % 45);

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    stock: product.stock ?? (product.inStock ? 10 : 0),
    sold,
    image: product.images[0],
    status: product.inStock ? 'active' : 'out_of_stock',
    views,
    favorites,
  };
}

/**
 * Get all products for a seller by their shop name (matches maker field in products.json)
 */
function getSellerProducts(shopName: string): SellerProduct[] {
  const allProducts = getAllProducts();
  return allProducts
    .filter((p) => p.maker === shopName)
    .map((p, i) => productToSellerProduct(p, i));
}

/**
 * Calculate stats based on actual products
 */
function calculateSellerStats(
  products: SellerProduct[],
  baseStats: { rating: number; reviewsCount: number; responseTime: string; responseRate: number }
) {
  const totalSales = products.reduce((sum, p) => sum + p.sold, 0);
  return {
    productsCount: products.length,
    rating: baseStats.rating,
    reviewsCount: baseStats.reviewsCount,
    salesCount: totalSales,
    responseTime: baseStats.responseTime,
    responseRate: baseStats.responseRate,
  };
}

// ============================================================================
// MOCK SELLER DATA
// ============================================================================

// Get products for each seller from products.json
const sofiaProducts = getSellerProducts('Tejidos Sofía');
const pedroProducts = getSellerProducts('Alebrijes Don Pedro');
const artesaniasProducts = getSellerProducts('Artesanías de México');

// Mock Data for Individual Seller - Tejidos Sofía
export const mockIndividualSeller: User = {
  id: '3',
  name: 'Sofia Ramírez',
  email: 'sofia@ejemplo.com',
  avatar: 'https://i.pravatar.cc/150?img=47',
  phone: '+52 55 1234 5678',
  createdAt: '2024-03-15T10:00:00Z',
  makerProfile: {
    shopName: 'Tejidos Sofía',
    sellerType: 'individual',
    location: 'Ciudad de México, CDMX',
    description:
      'Creadora de productos tejidos a mano con amor. Cada pieza es única y hecha especialmente para ti.',
    story:
      'Comencé a tejer hace 5 años como hobby y ahora es mi pasión. Me encanta crear piezas únicas que traigan calidez a tu hogar. Trabajo desde casa y cada pedido lleva un pedacito de mi corazón.',
    verified: true,
    verificationBadge: 'verified',

    stats: calculateSellerStats(sofiaProducts, {
      rating: 4.9,
      reviewsCount: 87,
      responseTime: '< 2 horas',
      responseRate: 98,
    }),

    businessHours: [
      { day: 'Lunes', open: '09:00', close: '18:00', closed: false },
      { day: 'Martes', open: '09:00', close: '18:00', closed: false },
      { day: 'Miércoles', open: '09:00', close: '18:00', closed: false },
      { day: 'Jueves', open: '09:00', close: '18:00', closed: false },
      { day: 'Viernes', open: '09:00', close: '18:00', closed: false },
      { day: 'Sábado', open: '10:00', close: '14:00', closed: false },
      { day: 'Domingo', open: '', close: '', closed: true },
    ],

    acceptsCustomOrders: true,
    acceptsWholesale: false,

    shippingOptions: {
      national: true,
      international: false,
      freeShippingOver: 800,
      averageProcessingTime: '2-4 días',
    },

    paymentMethods: ['card', 'transfer', 'oxxo'],

    returnPolicy:
      'Acepto devoluciones dentro de los primeros 7 días si el producto tiene algún defecto de fabricación.',
    cancellationPolicy:
      'Puedes cancelar tu pedido dentro de las primeras 24 horas sin costo alguno.',

    certifications: ['Vendedor Verificado'],
    specialties: ['Tejido a crochet', 'Punto', 'Macramé', 'Bordados tradicionales'],

    socialMedia: {
      instagram: '@tejidossofia',
      whatsapp: '+52 55 1234 5678',
    },

    features: {
      customDesigns: true,
      bulkOrders: false,
      giftWrapping: true,
      expressShipping: false,
    },

    products: sofiaProducts,

    reviews: [
      {
        id: 'r1',
        buyerId: 'b1',
        buyerName: 'Ana López',
        buyerAvatar: 'https://i.pravatar.cc/150?img=5',
        rating: 5,
        comment:
          '¡Hermoso huipil! La calidad es excelente y el bordado está perfecto. Sofia fue muy atenta con mis preguntas. 100% recomendado.',
        date: '2024-10-28T15:30:00Z',
        productId: '4',
        productName: 'Huipil Bordado de Chiapas',
        helpful: 12,
        response: {
          text: '¡Muchas gracias Ana! Me alegra mucho que te haya gustado. Fue un placer trabajar en tu pedido 💕',
          date: '2024-10-28T18:00:00Z',
        },
      },
      {
        id: 'r2',
        buyerId: 'b2',
        buyerName: 'Carlos Méndez',
        rating: 5,
        comment:
          'Compré el rebozo de seda para mi esposa y quedó encantada. El trabajo es impecable y Sofia es súper profesional.',
        date: '2024-10-25T10:20:00Z',
        productId: '8',
        productName: 'Rebozo de Seda',
        helpful: 8,
        response: {
          text: '¡Gracias Carlos! Qué alegría saber que le encantó a tu esposa. Espero verte pronto 😊',
          date: '2024-10-25T14:00:00Z',
        },
      },
      {
        id: 'r3',
        buyerId: 'b3',
        buyerName: 'María Fernández',
        buyerAvatar: 'https://i.pravatar.cc/150?img=10',
        rating: 4,
        comment:
          'Bonita blusa bordada, aunque tardó un poco más de lo esperado. Pero la calidad vale la pena.',
        date: '2024-10-20T09:15:00Z',
        productId: '11',
        productName: 'Blusa Bordada de Oaxaca',
        helpful: 3,
      },
    ],

    recentOrders: [
      {
        id: 'o1',
        createdAt: '2024-11-05T14:30:00Z',
        status: 'processing',
        total: 4400,
        items: [
          {
            id: '4',
            name: 'Huipil Bordado de Chiapas',
            quantity: 2,
            price: 2200,
            images: ['https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=400'],
          },
        ],
        customer: {
          name: 'Laura Sánchez',
          email: 'laura@ejemplo.com',
        },
      },
      {
        id: 'o2',
        createdAt: '2024-11-04T10:00:00Z',
        status: 'shipped',
        total: 3500,
        items: [
          {
            id: '8',
            name: 'Rebozo de Seda',
            quantity: 1,
            price: 3500,
            images: ['https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400'],
          },
        ],
        customer: {
          name: 'Pedro Rojas',
          email: 'pedro@ejemplo.com',
        },
        tracking: 'MEX123456789',
      },
    ],

    memberSince: '2024-03-15',
    lastActive: '2024-11-07T09:30:00Z',
  } as ExtendedMakerProfile,
};

// Mock Data for Artisan - Alebrijes Don Pedro
export const mockArtisan: User = {
  id: '4',
  name: 'Don Pedro Martínez',
  email: 'pedro@ejemplo.com',
  avatar: 'https://i.pravatar.cc/150?img=12',
  phone: '+52 951 234 5678',
  createdAt: '2023-06-10T08:00:00Z',
  makerProfile: {
    shopName: 'Alebrijes Don Pedro',
    sellerType: 'artisan',
    location: 'San Martín Tilcajete, Oaxaca',
    description:
      'Artesano de tercera generación especializado en alebrijes de madera tallada y pintada a mano con técnicas ancestrales zapotecas.',
    story:
      'Mi abuelo me enseñó el arte de tallar madera cuando tenía 8 años. Llevo más de 40 años creando alebrijes que representan nuestra cultura y tradiciones. Cada pieza cuenta una historia y preserva el legado de nuestros antepasados. Trabajo con madera de copal sostenible y pinturas naturales.',
    verified: true,
    verificationBadge: 'artisan_certified',

    stats: calculateSellerStats(pedroProducts, {
      rating: 5.0,
      reviewsCount: 234,
      responseTime: '< 6 horas',
      responseRate: 95,
    }),

    businessHours: [
      { day: 'Lunes', open: '08:00', close: '17:00', closed: false },
      { day: 'Martes', open: '08:00', close: '17:00', closed: false },
      { day: 'Miércoles', open: '08:00', close: '17:00', closed: false },
      { day: 'Jueves', open: '08:00', close: '17:00', closed: false },
      { day: 'Viernes', open: '08:00', close: '17:00', closed: false },
      { day: 'Sábado', open: '08:00', close: '14:00', closed: false },
      { day: 'Domingo', open: '', close: '', closed: true },
    ],

    acceptsCustomOrders: true,
    acceptsWholesale: true,
    minWholesaleOrder: 10,

    shippingOptions: {
      national: true,
      international: true,
      freeShippingOver: 1500,
      averageProcessingTime: '5-7 días',
    },

    paymentMethods: ['card', 'cash', 'transfer', 'oxxo'],

    returnPolicy:
      'Cada pieza es única y hecha a mano. No acepto devoluciones excepto por daños en el envío.',
    cancellationPolicy:
      'Una vez iniciado el trabajo de tallado, no es posible cancelar. Antes de iniciar, puedes cancelar sin costo.',

    certifications: [
      'Artesano Certificado FONART',
      'Denominación de Origen Oaxaca',
      'Maestro Artesano',
      'Premio Nacional de la Cerámica 2022',
    ],
    specialties: [
      'Tallado en madera de copal',
      'Pintura con pigmentos naturales',
      'Técnica zapoteca tradicional',
      'Alebrijes monumentales',
    ],

    socialMedia: {
      facebook: 'AlebrijesDonPedro',
      instagram: '@alebrijesdonpedro',
      whatsapp: '+52 951 234 5678',
    },

    features: {
      customDesigns: true,
      bulkOrders: true,
      giftWrapping: true,
      expressShipping: false,
    },

    products: pedroProducts,

    reviews: [
      {
        id: 'ar1',
        buyerId: 'ab1',
        buyerName: 'Jennifer Smith',
        buyerAvatar: 'https://i.pravatar.cc/150?img=20',
        rating: 5,
        comment:
          '¡Artesanía absolutamente impresionante! El detalle de este alebrije es increíble. Don Pedro fue muy comunicativo durante todo el proceso. ¡Vale cada peso!',
        date: '2024-11-01T16:45:00Z',
        productId: '2',
        productName: 'Alebrije de Madera Tallada',
        helpful: 45,
        response: {
          text: '¡Muchas gracias Jennifer! Fue un placer crear esta pieza para ti. Espero que traiga alegría a tu hogar 🦁',
          date: '2024-11-02T08:00:00Z',
        },
      },
      {
        id: 'ar2',
        buyerId: 'ab2',
        buyerName: 'Roberto García',
        rating: 5,
        comment:
          'La máscara ceremonial es una obra de arte. Los colores y detalles son extraordinarios. Perfecta para mi colección.',
        date: '2024-10-28T11:30:00Z',
        productId: '7',
        productName: 'Máscara Ceremonial de Madera',
        helpful: 23,
      },
    ],

    recentOrders: [
      {
        id: 'ao1',
        createdAt: '2024-11-06T09:15:00Z',
        status: 'processing',
        total: 5000,
        items: [
          {
            id: '2',
            name: 'Alebrije de Madera Tallada',
            quantity: 2,
            price: 2500,
            images: ['https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=400'],
          },
        ],
        customer: {
          name: 'Hotel Boutique Oaxaca',
          email: 'compras@hotelboutique.com',
        },
      },
      {
        id: 'ao2',
        createdAt: '2024-11-03T16:20:00Z',
        status: 'shipped',
        total: 950,
        items: [
          {
            id: '7',
            name: 'Máscara Ceremonial de Madera',
            quantity: 1,
            price: 950,
            images: ['https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=400'],
          },
        ],
        customer: {
          name: 'Museo de Arte Popular',
          email: 'adquisiciones@museo.com',
        },
        tracking: 'MEX987654321',
      },
    ],

    memberSince: '2023-06-10',
    lastActive: '2024-11-07T07:45:00Z',
  } as ExtendedMakerProfile,
};

// Mock Data for Company - Artesanías de México
export const mockCompany: User = {
  id: '5',
  name: 'Artesanías de México SA',
  email: 'ventas@artesaniasdemexico.com',
  avatar: 'https://images.unsplash.com/photo-1560264280-88b68371db39?w=150',
  phone: '+52 33 1234 5678',
  createdAt: '2022-01-15T08:00:00Z',
  makerProfile: {
    shopName: 'Artesanías de México',
    sellerType: 'company',
    location: 'Guadalajara, Jalisco',
    description:
      'Empresa mexicana dedicada a la comercialización y exportación de artesanías auténticas de todas las regiones de México. Conectamos artesanos locales con el mundo.',
    story:
      'Fundada en 2022, nuestra misión es preservar y promover el arte popular mexicano a nivel mundial. Trabajamos directamente con más de 150 artesanos de 12 estados de la República, garantizando precios justos y condiciones dignas. Cada compra apoya directamente a las comunidades artesanales de México.',
    verified: true,
    verificationBadge: 'top_seller',

    stats: calculateSellerStats(artesaniasProducts, {
      rating: 4.8,
      reviewsCount: 1523,
      responseTime: '< 1 hora',
      responseRate: 99,
    }),

    businessHours: [
      { day: 'Lunes', open: '09:00', close: '19:00', closed: false },
      { day: 'Martes', open: '09:00', close: '19:00', closed: false },
      { day: 'Miércoles', open: '09:00', close: '19:00', closed: false },
      { day: 'Jueves', open: '09:00', close: '19:00', closed: false },
      { day: 'Viernes', open: '09:00', close: '19:00', closed: false },
      { day: 'Sábado', open: '10:00', close: '18:00', closed: false },
      { day: 'Domingo', open: '10:00', close: '15:00', closed: false },
    ],

    acceptsCustomOrders: true,
    acceptsWholesale: true,
    minWholesaleOrder: 50,

    shippingOptions: {
      national: true,
      international: true,
      freeShippingOver: 999,
      averageProcessingTime: '1-2 días',
    },

    paymentMethods: ['card', 'cash', 'transfer', 'oxxo', 'paypal'],

    returnPolicy:
      'Aceptamos devoluciones dentro de los primeros 30 días. Reembolso completo o cambio según prefieras.',
    cancellationPolicy:
      'Puedes cancelar tu pedido en cualquier momento antes del envío sin costo alguno.',

    certifications: [
      'Empresa Socialmente Responsable',
      'Comercio Justo Certificado',
      'ISO 9001:2015',
      'Exportador Confiable',
    ],
    specialties: ['Talavera Poblana', 'Textiles Oaxaqueños', 'Plata de Taxco', 'Barro Negro'],

    socialMedia: {
      facebook: 'ArtesaniasDeMexico',
      instagram: '@artesaniasdemexico',
      whatsapp: '+52 33 1234 5678',
    },

    features: {
      customDesigns: true,
      bulkOrders: true,
      giftWrapping: true,
      expressShipping: true,
    },

    products: artesaniasProducts,

    reviews: [
      {
        id: 'cr1',
        buyerId: 'cb1',
        buyerName: 'Restaurant Los Cabos',
        rating: 5,
        comment:
          'Compramos varios jarrones de Talavera para nuestro restaurante. Excelente calidad, llegó todo perfecto y el servicio al cliente fue excepcional. 100% profesionales.',
        date: '2024-11-02T10:30:00Z',
        productId: '3',
        productName: 'Jarrón de Talavera',
        helpful: 67,
        response: {
          text: '¡Muchísimas gracias! Nos encanta ser parte de su restaurante. Quedamos a sus órdenes para futuras compras 🍽️',
          date: '2024-11-02T11:00:00Z',
        },
      },
      {
        id: 'cr2',
        buyerId: 'cb2',
        buyerName: 'María Elena Torres',
        buyerAvatar: 'https://i.pravatar.cc/150?img=25',
        rating: 5,
        comment:
          'El collar de plata con turquesa es precioso. La calidad de la plata es excelente y la piedra tiene un color hermoso.',
        date: '2024-10-30T14:15:00Z',
        productId: '5',
        productName: 'Collar de Plata con Turquesa',
        helpful: 34,
      },
      {
        id: 'cr3',
        buyerId: 'cb3',
        buyerName: 'Chef Antonio',
        rating: 5,
        comment:
          'El molcajete es auténtico y de excelente calidad. Perfecto para preparar salsas tradicionales.',
        date: '2024-10-25T09:00:00Z',
        productId: '10',
        productName: 'Molcajete de Piedra Volcánica',
        helpful: 28,
      },
    ],

    recentOrders: [
      {
        id: 'co1',
        createdAt: '2024-11-07T08:30:00Z',
        status: 'pending',
        total: 5400,
        items: [
          {
            id: '3',
            name: 'Jarrón de Talavera',
            quantity: 3,
            price: 1800,
            images: ['https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400'],
          },
        ],
        customer: {
          name: 'Hotel Boutique Centro',
          email: 'compras@hotelcentro.com',
        },
      },
      {
        id: 'co2',
        createdAt: '2024-11-06T11:45:00Z',
        status: 'processing',
        total: 3000,
        items: [
          {
            id: '5',
            name: 'Collar de Plata con Turquesa',
            quantity: 2,
            price: 1500,
            images: ['https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400'],
          },
        ],
        customer: {
          name: 'Joyería Tradicional',
          email: 'pedidos@joyeriatradicional.com',
        },
      },
      {
        id: 'co3',
        createdAt: '2024-11-05T15:20:00Z',
        status: 'shipped',
        total: 2250,
        items: [
          {
            id: '10',
            name: 'Molcajete de Piedra Volcánica',
            quantity: 3,
            price: 750,
            images: ['https://images.unsplash.com/photo-1556910096-6f5e72db6803?w=400'],
          },
        ],
        customer: {
          name: 'Escuela de Cocina Mexicana',
          email: 'compras@escuelacocina.com',
        },
        tracking: 'MEX456789123',
      },
    ],

    memberSince: '2022-01-15',
    lastActive: '2024-11-07T10:15:00Z',
  } as ExtendedMakerProfile,
};

// Export all mock users
export const MOCK_SELLER_USERS = {
  individual: mockIndividualSeller,
  artisan: mockArtisan,
  company: mockCompany,
};
