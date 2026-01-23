/**
 * @fileoverview Comprehensive type definitions for seller dashboard functionality.
 * Includes types for seller profiles, products, reviews, orders, analytics,
 * pending actions, customer insights, messages, and tasks.
 * @module lib/types/seller-types
 */

// Import Order types from order.ts (for internal use only)
import type { Order } from './order';
import type { SellerVerification } from './verification';

// Re-export seller classification types and constants from seller.ts
export type {
  SellerType,
  CraftStyle,
  IndigenousConnection,
  CraftCategory,
  SellerClassification,
} from './seller';

export { SELLER_TYPE_CONFIG, CRAFT_CATEGORIES } from './seller';

// ============================================================================
// BASIC SELLER TYPES FOR DASHBOARD
// ============================================================================

export interface SellerProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  sold: number;
  views: number;
  favorites: number;
  status: 'active' | 'out_of_stock' | 'draft';
}

export interface Review {
  id: string;
  productId: string;
  productName: string;
  buyerId?: string;
  buyerName: string;
  buyerAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  response?: {
    text: string;
    date: string;
  };
}

export interface MakerStats {
  salesCount: number;
  productsCount: number;
  rating: number;
  reviewsCount: number;
  responseRate: number;
}

export interface MakerProfile {
  shopName: string;
  location: string;
  bio?: string;
  specialty?: string;
  memberSince: string;
  verified: boolean;
  verification?: SellerVerification; // ADD VERIFICATION SUPPORT
  products: SellerProduct[];
  reviews: Review[];
  recentOrders: Order[];
  stats: MakerStats;
}

// ============================================================================
// EXTENDED MAKER PROFILE WITH FULL VERIFICATION SUPPORT
// ============================================================================

export type ExtendedSellerType = 'individual' | 'artisan' | 'company';

export interface BusinessHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface ExtendedMakerProfile {
  // Basic Info
  shopName: string;
  sellerType: ExtendedSellerType;
  location: string;
  description: string;
  story: string;
  verified: boolean;
  verificationBadge?: 'verified' | 'top_seller' | 'artisan_certified' | 'eco_friendly';

  // Verification System - NEW
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
// SELLER ANALYTICS TYPES
// ============================================================================

/** Single data point for sales trend */
export interface SalesTrendDataPoint {
  date: string;
  sales: number;
  revenue: number;
}

/** Time-period specific stats */
export interface PeriodStats {
  averageOrderValue: number;
  conversionRate: number;
}

export interface AnalyticsData {
  revenue: {
    today: number;
    yesterday: number;
    thisWeek: number;
    lastWeek: number;
    thisMonth: number;
    lastMonth: number;
    thisYear: number;
  };
  /** Sales trend data by time period */
  salesTrend: {
    week: SalesTrendDataPoint[];
    month: SalesTrendDataPoint[];
  };
  /** Time-period specific stats for ticket promedio and conversion */
  stats: {
    week: PeriodStats;
    month: PeriodStats;
  };
  topProducts: Array<{
    id: string;
    name: string;
    sales: number;
    revenue: number;
    trend: 'up' | 'down' | 'stable';
  }>;
  trafficSources: Array<{
    source: string;
    visits: number;
    conversions: number;
    percentage: number;
  }>;
  peakTimes: {
    bestDay: string;
    bestHour: string;
    weekdayVsWeekend: {
      weekday: number;
      weekend: number;
    };
  };
  customerDemographics: {
    topCities: Array<{
      city: string;
      percentage: number;
    }>;
    ageGroups: Array<{
      range: string;
      percentage: number;
    }>;
  };
  /** Legacy - kept for backwards compatibility, use stats.week.conversionRate */
  conversionRate: number;
  /** Legacy - kept for backwards compatibility, use stats.week.averageOrderValue */
  averageOrderValue: number;
  forecast: {
    nextMonth: number;
    confidence: string;
  };
}

// ============================================================================
// SELLER ACTIONS TYPES
// ============================================================================

export interface PendingAction {
  type: 'restock' | 'respond' | 'promote' | 'ship' | 'message';
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
}

export interface PendingActionsData {
  pendingOrders: Array<{
    id: string;
    customerName: string;
    total: number;
    status: string;
    daysWaiting: number;
    urgent: boolean;
  }>;
  lowStockProducts: Array<{
    id: string;
    name: string;
    currentStock: number;
    recommendedStock: number;
    urgency: 'low' | 'medium' | 'high' | 'critical';
  }>;
  unansweredMessages: number;
  pendingReviews: Array<{
    id: string;
    buyerName: string;
    rating: number;
    daysAgo: number;
    needsResponse: boolean;
  }>;
  upcomingPromotions: Array<{
    name: string;
    discount: number;
    startsIn: number;
  }>;
  recommendedActions: PendingAction[];
}

// ============================================================================
// CUSTOMER INSIGHTS TYPES
// ============================================================================

export interface CustomerInsight {
  id: string;
  name: string;
  avatar?: string;
  totalPurchases: number;
  totalSpent: number;
  lastPurchase: string;
  favoriteProducts: string[];
  lifetimeValue: 'low' | 'medium' | 'high' | 'vip';
}

export interface CustomerInsightsData {
  repeatCustomers: CustomerInsight[];
  topCustomers: Array<{
    id: string;
    name: string;
    totalSpent: number;
    purchases: number;
  }>;
  purchasePatterns: {
    averageTimeBetweenPurchases: number;
    mostCommonCombinations: string[][];
    seasonalTrends: Array<{
      season: string;
      increase: number;
    }>;
  };
  upcomingBirthdays: Array<{
    id: string;
    name: string;
    date: string;
    daysUntil: number;
  }>;
}

// ============================================================================
// SELLER MESSAGES TYPES
// ============================================================================

export interface SellerMessage {
  id: string;
  from: {
    id: string;
    name: string;
    avatar?: string;
  };
  subject: string;
  message: string;
  date: string;
  status: 'read' | 'unread';
  orderId?: string | null;
  replies?: Array<{
    from: 'seller' | 'customer';
    message: string;
    date: string;
  }>;
}

// ============================================================================
// SELLER REVIEWS TYPES
// ============================================================================

export interface SellerReview {
  id: string;
  buyer: {
    id: string;
    name: string;
    avatar?: string;
    verified: boolean;
  };
  product: {
    id: string;
    name: string;
    image: string;
  };
  rating: number;
  date: string;
  review: string;
  images?: string[];
  helpful: number;
  status: 'pending' | 'responded';
  response?: {
    text: string;
    date: string;
  };
  daysAgo?: number;
}

// ============================================================================
// SELLER ORDERS TYPES
// ============================================================================

export interface SellerOrder {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
    phone: string;
    avatar?: string;
  };
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  date: string;
  total: number;
  tracking?: string;
  carrier?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  items: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    sku: string;
  }>;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string;
    phone: string;
  };
  timeline: Array<{
    status: string;
    date: string;
    description: string;
  }>;
  notes?: string;
  urgent: boolean;
}

// ============================================================================
// SELLER TASKS TYPES
// ============================================================================

export interface SellerTaskRelatedData {
  customerName?: string;
  orderNumber?: string;
  amount?: number;
  urgent?: boolean;
  daysWaiting?: number;
  buyerName?: string;
  rating?: number;
  daysAgo?: number;
  productName?: string;
  currentStock?: number;
  recommendedStock?: number;
  messageCount?: number;
  promotionName?: string;
  discount?: number;
  startsIn?: number;
}

export interface SellerTask {
  id: string;
  type: 'order' | 'message' | 'review' | 'inventory' | 'promotion';
  priority: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  description: string;
  dueDate?: string;
  status: 'pending' | 'completed' | 'snoozed';
  actionUrl: string;
  relatedId?: string;
  relatedData?: SellerTaskRelatedData;
  createdAt: string;
}
