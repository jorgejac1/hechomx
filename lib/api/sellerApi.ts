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

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getSellerAnalytics(email: string): Promise<AnalyticsData | null> {
  await delay(300); // Simulate network delay

  try {
    const response = await fetch('/data/seller-analytics.json');
    const data = await response.json();
    return data[email] || null;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }
}

export async function getPendingActions(email: string): Promise<PendingActionsData | null> {
  await delay(200);

  try {
    const response = await fetch('/data/pending-actions.json');
    const data = await response.json();
    return data[email] || null;
  } catch (error) {
    console.error('Error fetching pending actions:', error);
    return null;
  }
}

export async function getCustomerInsights(email: string): Promise<CustomerInsightsData | null> {
  await delay(250);

  try {
    const response = await fetch('/data/customer-insights.json');
    const data = await response.json();
    return data[email] || null;
  } catch (error) {
    console.error('Error fetching customer insights:', error);
    return null;
  }
}

// Action handlers (these would call real APIs later)
export async function markOrderAsShipped(orderId: string): Promise<boolean> {
  await delay(500);
  console.log('Marking order as shipped:', orderId);
  // In real app: POST /api/orders/${orderId}/ship
  return true;
}

export async function restockProduct(productId: string, quantity: number): Promise<boolean> {
  await delay(500);
  console.log('Restocking product:', productId, 'quantity:', quantity);
  // In real app: PATCH /api/products/${productId}/stock
  return true;
}

export async function respondToReview(reviewId: string, response: string): Promise<boolean> {
  await delay(500);
  console.log('Responding to review:', reviewId, 'response:', response);
  // In real app: POST /api/reviews/${reviewId}/respond
  return true;
}

// ============================================================================
// BUYER IMPACT DATA
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

export async function getBuyerImpact(userEmail: string): Promise<BuyerImpactData | null> {
  try {
    const response = await fetch('/data/buyer-impact.json');
    const data = await response.json();
    return data[userEmail] || null;
  } catch (error) {
    console.error('Error loading buyer impact:', error);
    return null;
  }
}

// ============================================================================
// BUYER ORDERS DATA
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

export async function getBuyerOrders(userEmail: string): Promise<BuyerOrder[]> {
  try {
    const response = await fetch('/data/buyer-orders.json');
    const data = await response.json();
    return data[userEmail] || [];
  } catch (error) {
    console.error('Error loading buyer orders:', error);
    return [];
  }
}
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

export async function getSellerMessages(userEmail: string): Promise<SellerMessage[]> {
  try {
    const response = await fetch('/data/seller-messages.json');
    const data = await response.json();
    return data[userEmail] || [];
  } catch (error) {
    console.error('Error loading seller messages:', error);
    return [];
  }
}

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

export async function getSellerReviews(userEmail: string): Promise<SellerReview[]> {
  try {
    const response = await fetch('/data/seller-reviews.json');
    const data = await response.json();
    return data[userEmail] || [];
  } catch (error) {
    console.error('Error loading seller reviews:', error);
    return [];
  }
}
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

export async function getSellerOrders(userEmail: string): Promise<SellerOrder[]> {
  try {
    const response = await fetch('/data/seller-orders.json');
    const data = await response.json();
    return data[userEmail] || [];
  } catch (error) {
    console.error('Error loading seller orders:', error);
    return [];
  }
}
