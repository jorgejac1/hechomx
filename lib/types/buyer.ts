/**
 * @fileoverview Type definitions for buyer-related functionality.
 * Includes interfaces for buyer impact data (environmental metrics, supported artisans),
 * buyer orders, order timelines, and shipping address information.
 * @module lib/types/buyer
 */

// ============================================================================
// BUYER IMPACT TYPES
// ============================================================================

export interface BuyerImpactData {
  totalSpent: number;
  totalOrders: number;
  artisansSupported: number;
  statesRepresented: number;
  joinDate: string;
  impactMetrics: {
    co2Saved: number;
    treesEquivalent: number;
    traditionalTechniquesPreserved: number;
    artisanFamiliesSupported: number;
  };
  supportedArtisans: Array<{
    id: string;
    name: string;
    shopName: string;
    state: string;
    avatar?: string;
    specialty: string;
    purchaseCount: number;
    totalSpent: number;
    firstPurchase: string;
  }>;
  topCategories: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  milestones: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    achieved: boolean;
    date?: string;
  }>;
  recentPurchases: Array<{
    id: string;
    productName: string;
    artisan: string;
    date: string;
    amount: number;
    image: string;
  }>;
}

// ============================================================================
// BUYER ORDERS TYPES
// ============================================================================

export interface BuyerOrder {
  id: string;
  date: string;
  status: 'processing' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  itemsCount: number;
  tracking?: string;
  estimatedDelivery?: string;
  actualDelivery?: string;
  items: Array<{
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    artisan: {
      id: string;
      name: string;
      shopName: string;
    };
  }>;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  timeline: Array<{
    status: string;
    date: string;
    description: string;
    carrier?: string;
    reason?: string;
  }>;
  reviewed?: boolean;
  canReview: boolean;
  canReorder: boolean;
}
