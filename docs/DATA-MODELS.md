# Data Models

> TypeScript interfaces and types used throughout Papalote Market.

## Table of Contents

1. [User & Authentication](#user--authentication)
2. [Product Types](#product-types)
3. [Cart & Shopping](#cart--shopping)
4. [Order Types](#order-types)
5. [Seller Types](#seller-types)
6. [Verification System](#verification-system)
7. [Artisan Story](#artisan-story)
8. [Common UI Types](#common-ui-types)

---

## User & Authentication

**Location:** `contexts/AuthContext.tsx`

### User

Main user object for authentication:

```typescript
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  createdAt: string;
  makerProfile?: MakerProfile; // Present if user is a seller
  isAdmin?: boolean;
}

interface MakerProfile {
  shopName: string;
  location: string;
  description: string;
  verified?: boolean;
  verificationLevel?: VerificationLevel;
}
```

### AuthContextType

```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterInput) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: UpdateProfileInput) => Promise<void>;
}
```

---

## Product Types

**Location:** `types/product.ts`

### Product

Main product interface:

```typescript
interface Product {
  // Basic Info
  id: string;
  name: string;
  description: string;
  price: number;
  currency: 'MXN' | 'USD';
  category: string;
  subcategory?: string;
  state: string; // Mexican state of origin

  // Media
  images: string[];
  videos?: string[];

  // Status
  inStock: boolean;
  stock?: number;
  status: 'draft' | 'published';
  featured?: boolean;
  verified?: boolean;

  // Metrics
  rating: number;
  reviewCount: number;

  // Dates
  createdAt: string;
  updatedAt?: string;

  // Extended Info
  materials?: string[];
  dimensions?: ProductDimensions;
  careInstructions?: string;
  features?: string[];
  tags?: string[];

  // Sizing
  availableSizes?: string[];
  sizeType?: 'clothing' | 'shoes' | 'rings' | 'one-size';

  // Seller Info
  maker: string;
  makerProfile?: {
    shopName: string;
    verificationLevel?: VerificationLevel;
    verified?: boolean;
  };
}
```

### ProductDimensions

Flexible dimensions supporting various product types:

```typescript
interface ProductDimensions {
  unit: 'cm' | 'in';
  length?: number;
  width?: number;
  height?: number;
  diameter?: number;
  capacity?: string; // e.g., "500ml"
  weight?: number;
  // Clothing-specific
  waist?: number;
  chest?: number;
  inseam?: number;
}
```

### ProductReview

```typescript
interface ProductReview {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  verified: boolean; // Verified purchase
  helpful: number; // Helpful votes
  photos?: string[];
  date: string;
}
```

### DraftProduct

Incomplete product being created:

```typescript
interface DraftProduct extends ProductFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
  sellerId: string;
  sellerName: string;
}
```

---

## Cart & Shopping

**Location:** `types/cart.ts`, `contexts/CartContext.tsx`

### CartItem

```typescript
interface CartItem extends Product {
  quantity: number;
  addedAt: string;
  selectedSize?: string;
}
```

### CartSummary

```typescript
interface CartSummary {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  itemCount: number;
}
```

### ShippingAddress

```typescript
interface ShippingAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}
```

### PaymentMethod

```typescript
interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'oxxo' | 'transfer';
  last4?: string;
  brand?: string; // visa, mastercard, amex
  expiryMonth?: number;
  expiryYear?: number;
  isDefault?: boolean;
}
```

---

## Order Types

**Location:** `lib/types/order.ts`, `lib/types/checkout.ts`

### OrderStatus

```typescript
type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';
```

### Order

```typescript
interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  summary: CartSummary;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  trackingNumber?: string;
  createdAt: string;
  updatedAt: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  images: string[];
  maker: string;
  state?: string;
  selectedSize?: string;
}
```

### CompleteOrder

Full order with checkout details:

```typescript
interface CompleteOrder extends Order {
  orderNumber: string;
  userEmail: string;
  paymentStatus: 'pending' | 'paid' | 'failed';
  giftWrap?: boolean;
  giftMessage?: string;
  coupon?: AppliedCoupon;
  estimatedDelivery: string;
}
```

### CheckoutFormData

```typescript
interface CheckoutFormData {
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  saveAddress?: boolean;
  acceptTerms: boolean;
  giftWrap?: boolean;
  giftMessage?: string;
  notes?: string;
  couponCode?: string;
}
```

---

## Seller Types

**Location:** `lib/types/seller.ts`, `lib/types/seller-types.ts`

### Analytics Types

#### FunnelStage

Single stage in the conversion funnel:

```typescript
interface FunnelStage {
  /** Stage identifier */
  id: string;
  /** Display label for the stage */
  label: string;
  /** Total count at this stage */
  count: number;
  /** Conversion rate from previous stage (percentage) */
  conversionFromPrevious: number;
}
```

#### ProductConversion

Per-product conversion metrics:

```typescript
interface ProductConversion {
  /** Product ID */
  productId: string;
  /** Product name */
  productName: string;
  /** Number of product page views */
  views: number;
  /** Number of times added to cart */
  addToCart: number;
  /** Number of purchases */
  purchases: number;
  /** View to cart conversion rate */
  viewToCartRate: number;
  /** Cart to purchase conversion rate */
  cartToPurchaseRate: number;
}
```

#### AnalyticsData (extended)

```typescript
interface AnalyticsData {
  // ... existing fields (revenue, orders, traffic, etc.)

  /** Conversion funnel data showing customer journey stages */
  conversionFunnel?: {
    week: FunnelStage[];
    month: FunnelStage[];
  };
  /** Per-product conversion metrics */
  productConversions?: ProductConversion[];
}
```

---

### SellerType

```typescript
type SellerType =
  | 'hobby_maker' // Casual crafter
  | 'artisan_individual' // Professional artisan
  | 'workshop' // Team of artisans
  | 'company'; // Business entity
```

### CraftCategory

```typescript
type CraftCategory =
  | 'textiles' // Fabrics, weaving
  | 'jewelry' // Jewelry making
  | 'pottery' // Ceramics
  | 'woodwork' // Wood crafts
  | 'metalwork' // Metal crafts
  | 'leather' // Leather goods
  | 'paper' // Paper crafts
  | 'candles' // Candles, soaps
  | 'food' // Artisanal food
  | 'crafts' // Mixed crafts
  | 'other';
```

### IndigenousConnection

```typescript
type IndigenousConnection =
  | 'native' // Indigenous person
  | 'descendant' // Indigenous heritage
  | 'learned' // Learned from community
  | 'none'; // No connection
```

### ExtendedMakerProfile

Full seller profile:

```typescript
interface ExtendedMakerProfile {
  // Basic
  shopName: string;
  sellerType: SellerType;
  location: string;
  description: string;
  story?: string;
  verified: boolean;

  // Stats
  productsCount: number;
  rating: number;
  reviewsCount: number;
  salesCount: number;
  responseTime: string; // e.g., "< 1 hour"
  responseRate: number; // 0-100

  // Business
  businessHours?: string;
  acceptsCustomOrders: boolean;
  acceptsWholesale: boolean;
  shippingOptions: ShippingOption[];

  // Features
  features: {
    customDesigns: boolean;
    bulkOrders: boolean;
    giftWrapping: boolean;
    expressShipping: boolean;
  };

  // Data
  products: Product[];
  reviews: SellerReview[];
  recentOrders: SellerOrder[];
  socialMedia?: SocialMediaLinks;
}
```

### SellerOrder

Seller's view of an order:

```typescript
interface SellerOrder {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  status: OrderStatus;
  paymentStatus: 'pending' | 'paid' | 'failed';
  date: string;
  total: number;
  tracking?: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  timeline: OrderTimelineEvent[];
  urgent?: boolean;
}
```

---

## Verification System

**Location:** `lib/types/verification.ts`

### VerificationLevel

```typescript
type VerificationLevel =
  | 'basic_seller' // 10% commission
  | 'verified_artisan' // 8% commission
  | 'master_artisan' // 5% commission
  | 'certified_workshop'; // 7% commission
```

### VerificationRequest

```typescript
interface VerificationRequest {
  id: string;
  sellerId: string;
  sellerName: string;
  requestedLevel: VerificationLevel;
  status: 'pending' | 'in_review' | 'approved' | 'rejected';

  // Documents
  documents: {
    governmentId?: string;
    proofOfAddress?: string;
    curp?: string;
    rfc?: string;
    businessRegistration?: string;
  };

  // Craft Evidence
  craftPhotos: string[];
  craftVideos?: string[];
  workshopPhotos?: string[];
  certifications?: string[];

  // Review
  reviewedBy?: string;
  reviewNotes?: string;
  approvedLevel?: VerificationLevel;
  rejectionReason?: string;
  createdAt: string;
  updatedAt: string;
}
```

### SellerVerification

Current verification state:

```typescript
interface SellerVerification {
  status: 'unverified' | 'pending' | 'verified';
  level: VerificationLevel;
  badges: Badge[];
  verifiedAt?: string;
  expiresAt?: string;

  // Permissions
  canSell: boolean;
  canCreateListings: boolean;
  maxListings: number;
  canAccessAnalytics: boolean;

  // Metrics
  trustScore: number; // 0-100
  commissionRate: number; // 5-10%
}
```

### Badge

```typescript
interface Badge {
  id: string;
  name: string;
  type: 'verification' | 'achievement' | 'certification';
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  earnedAt: string;
  expiresAt?: string;
}
```

---

## Artisan Story

**Location:** `lib/types/artisan-story.ts`

### ArtisanStory

"Behind the Craft" profile:

```typescript
interface ArtisanStory {
  // Identity
  id: string;
  artisanId: string;
  artisanName: string;
  shopName: string;
  avatar: string;
  coverImage?: string;

  // Classification
  sellerType: SellerType;
  craftCategory: CraftCategory;
  craftStyle: 'traditional' | 'contemporary' | 'mixed';
  indigenousConnection: IndigenousConnection;

  // Experience
  specialty: string;
  yearsOfExperience: number;
  generationsOfCraft?: number;

  // Stories
  personalStory: string;
  heritageStory?: string;
  craftTechnique: string;
  productionProcess: string;

  // Media
  videoIntro?: string;
  processVideo?: string;
  workshopPhotos: string[];
  processPhotos: string[];

  // Recognition
  awards?: Award[];
  certifications?: Certification[];
  communityProjects?: string[];

  // Craft Details
  materials: Material[];
  tools: Tool[];
  processSteps: ProcessStep[];
  traditionalTechniques?: string[];

  // Metadata
  lastUpdated: string;
  isPublished: boolean;
}
```

### ProcessStep

```typescript
interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration?: string; // e.g., "2 hours"
  image?: string;
}
```

### Material

```typescript
interface Material {
  name: string;
  source: string; // Where it comes from
  description?: string;
  image?: string;
}
```

---

## Common UI Types

**Location:** `types/common.ts`

### ToastMessage

```typescript
interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  duration?: number; // ms, default 5000
  action?: {
    label: string;
    onClick: () => void;
  };
}
```

### BreadcrumbItem

```typescript
interface BreadcrumbItem {
  label: string;
  href?: string; // Omit for current page
}
```

### LoadingState

```typescript
type LoadingState = 'idle' | 'loading' | 'success' | 'error';
```

### ProductFilters

```typescript
interface ProductFilters {
  categories?: string[];
  subcategories?: string[];
  states?: string[];
  priceRange?: {
    min?: number;
    max?: number;
  };
  inStock?: boolean;
  verified?: boolean;
  featured?: boolean;
  minRating?: number;
  searchQuery?: string;
  sortBy?: SortOption;
}

type SortOption = 'relevance' | 'price-asc' | 'price-desc' | 'rating-desc' | 'newest' | 'popular';
```

---

## Type Locations Summary

| Category      | Location                     | Key Types                            |
| ------------- | ---------------------------- | ------------------------------------ |
| User/Auth     | `contexts/AuthContext.tsx`   | User, AuthContextType                |
| Products      | `types/product.ts`           | Product, ProductReview, DraftProduct |
| Cart          | `types/cart.ts`              | CartItem, CartSummary                |
| Orders        | `lib/types/order.ts`         | Order, OrderStatus, CompleteOrder    |
| Checkout      | `lib/types/checkout.ts`      | CheckoutFormData, CheckoutState      |
| Buyer         | `lib/types/buyer.ts`         | BuyerOrder, BuyerImpactData          |
| Seller        | `lib/types/seller-types.ts`  | SellerType, ExtendedMakerProfile     |
| Verification  | `lib/types/verification.ts`  | VerificationLevel, Badge             |
| Artisan Story | `lib/types/artisan-story.ts` | ArtisanStory, ProcessStep            |
| Common        | `types/common.ts`            | ToastMessage, LoadingState           |
| Filters       | `types/filters.ts`           | ProductFilters, SortOption           |

---

_See also: [Architecture Overview](./architecture/OVERVIEW.md) | [User Flows](./FLOWS.md)_
