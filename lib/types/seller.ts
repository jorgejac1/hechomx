// ============================================================================
// SELLER ANALYTICS TYPES
// ============================================================================

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
  salesTrend: Array<{
    date: string;
    sales: number;
    revenue: number;
  }>;
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
  conversionRate: number;
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
