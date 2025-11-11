import { User } from '@/contexts/AuthContext';
import type { SellerProduct, Order, Review } from '@/lib/types';

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

// Mock Data for Individual Seller
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

    stats: {
      productsCount: 24,
      rating: 4.9,
      reviewsCount: 87,
      salesCount: 156,
      responseTime: '< 2 horas',
      responseRate: 98,
    },

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
    specialties: ['Tejido a crochet', 'Punto', 'Macramé'],

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

    products: [
      {
        id: 'p1',
        name: 'Manta Tejida Artesanal',
        price: 650,
        stock: 5,
        sold: 23,
        image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400',
        status: 'active',
        views: 342,
        favorites: 28,
      },
      {
        id: 'p2',
        name: 'Cojín Tejido Geometrico',
        price: 350,
        stock: 12,
        sold: 45,
        image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
        status: 'active',
        views: 589,
        favorites: 52,
      },
      {
        id: 'p3',
        name: 'Canasta Macramé',
        price: 280,
        stock: 0,
        sold: 18,
        image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400',
        status: 'out_of_stock',
        views: 234,
        favorites: 19,
      },
    ],

    reviews: [
      {
        id: 'r1',
        buyerId: 'b1',
        buyerName: 'Ana López',
        buyerAvatar: 'https://i.pravatar.cc/150?img=5',
        rating: 5,
        comment:
          '¡Hermosa manta! La calidad es excelente y el tejido está perfecto. Sofia fue muy atenta con mis preguntas. 100% recomendado.',
        date: '2024-10-28T15:30:00Z',
        productId: 'p1',
        productName: 'Manta Tejida Artesanal',
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
          'Compré varios cojines para mi sala y quedé encantado. El trabajo es impecable y Sofia es súper profesional.',
        date: '2024-10-25T10:20:00Z',
        productId: 'p2',
        productName: 'Cojín Tejido Geometrico',
        helpful: 8,
        response: {
          text: '¡Gracias Carlos! Qué alegría saber que te encantaron. Espero verte pronto 😊',
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
          'Bonita canasta, aunque tardó un poco más de lo esperado. Pero la calidad vale la pena.',
        date: '2024-10-20T09:15:00Z',
        productId: 'p3',
        productName: 'Canasta Macramé',
        helpful: 3,
      },
    ],

    recentOrders: [
      {
        id: 'o1',
        createdAt: '2024-11-05T14:30:00Z',
        status: 'processing',
        total: 1300,
        items: [
          {
            id: 'p1',
            name: 'Manta Tejida Artesanal',
            quantity: 2,
            price: 650,
            images: ['https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400'],
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
        total: 700,
        items: [
          {
            id: 'p2',
            name: 'Cojín Tejido Geometrico',
            quantity: 2,
            price: 350,
            images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'],
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

// Mock Data for Artisan
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

    stats: {
      productsCount: 58,
      rating: 5.0,
      reviewsCount: 234,
      salesCount: 487,
      responseTime: '< 6 horas',
      responseRate: 95,
    },

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

    products: [
      {
        id: 'ap1',
        name: 'Alebrije León Grande',
        price: 2800,
        stock: 3,
        sold: 45,
        image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400',
        status: 'active',
        views: 1234,
        favorites: 156,
      },
      {
        id: 'ap2',
        name: 'Alebrije Búho Mediano',
        price: 1200,
        stock: 8,
        sold: 89,
        image: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400',
        status: 'active',
        views: 2341,
        favorites: 287,
      },
    ],

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
        productId: 'ap1',
        productName: 'Alebrije León Grande',
        helpful: 45,
        response: {
          text: '¡Muchas gracias Jennifer! Fue un placer crear esta pieza para ti. Espero que traiga alegría a tu hogar 🦁',
          date: '2024-11-02T08:00:00Z',
        },
      },
    ],

    recentOrders: [
      {
        id: 'ao1',
        createdAt: '2024-11-06T09:15:00Z',
        status: 'processing',
        total: 5600,
        items: [
          {
            id: 'ap1',
            name: 'Alebrije León Grande',
            quantity: 2,
            price: 2800,
            images: ['https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400'],
          },
        ],
        customer: {
          name: 'Hotel Boutique Oaxaca',
          email: 'compras@hotelboutique.com',
        },
      },
    ],

    memberSince: '2023-06-10',
    lastActive: '2024-11-07T07:45:00Z',
  } as ExtendedMakerProfile,
};

// Mock Data for Company
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

    stats: {
      productsCount: 342,
      rating: 4.8,
      reviewsCount: 1523,
      salesCount: 3847,
      responseTime: '< 1 hora',
      responseRate: 99,
    },

    businessHours: [
      { day: 'Lunes', open: '09:00', close: '19:00', closed: false },
      { day: 'Martes', open: '09:00', close: '19:00', closed: false },
      { day: 'Miércoles', open: '09:00', close: '19:00', closed: false },
      { day: 'Juernes', open: '09:00', close: '19:00', closed: false },
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

    products: [
      {
        id: 'cp1',
        name: 'Set Vajilla Talavera 24 piezas',
        price: 4500,
        stock: 45,
        sold: 234,
        image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400',
        status: 'active',
        views: 8934,
        favorites: 892,
      },
    ],

    reviews: [
      {
        id: 'cr1',
        buyerId: 'cb1',
        buyerName: 'Restaurant Los Cabos',
        rating: 5,
        comment:
          'Compramos 20 sets de vajilla para nuestro restaurante. Excelente calidad, llegó todo perfecto y el servicio al cliente fue excepcional. 100% profesionales.',
        date: '2024-11-02T10:30:00Z',
        productId: 'cp1',
        productName: 'Set Vajilla Talavera 24 piezas',
        helpful: 67,
        response: {
          text: '¡Muchísimas gracias! Nos encanta ser parte de su restaurante. Quedamos a sus órdenes para futuras compras 🍽️',
          date: '2024-11-02T11:00:00Z',
        },
      },
    ],

    recentOrders: [
      {
        id: 'co1',
        createdAt: '2024-11-07T08:30:00Z',
        status: 'pending',
        total: 13500,
        items: [
          {
            id: 'cp1',
            name: 'Set Vajilla Talavera 24 piezas',
            quantity: 3,
            price: 4500,
            images: ['https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400'],
          },
        ],
        customer: {
          name: 'Hotel Boutique Centro',
          email: 'compras@hotelcentro.com',
        },
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
