# Folder Structure Guide

> Detailed explanation of the project organization.

## Root Directory

```
papalotemarket/
├── app/                    # Next.js App Router pages
├── components/             # React components
├── contexts/               # React Context providers
├── hooks/                  # Custom React hooks
├── lib/                    # Utilities, types, data
├── public/                 # Static assets
├── services/               # Data abstraction layer
├── types/                  # Global TypeScript types
├── validators/             # Zod validation schemas
├── docs/                   # Documentation
├── __tests__/              # Test files
├── .next/                  # Next.js build output
├── node_modules/           # Dependencies
├── package.json            # Project config
├── tailwind.config.js      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
├── next.config.js          # Next.js config
└── CLAUDE.md               # AI assistant context
```

---

## App Directory (Pages)

Next.js App Router structure with file-based routing.

```
app/
├── layout.tsx              # Root layout (providers, header, footer)
├── page.tsx                # Homepage (/)
├── globals.css             # Global styles
├── not-found.tsx           # 404 page
│
├── productos/              # Product pages
│   ├── page.tsx            # Product listing (/productos)
│   └── [id]/
│       └── page.tsx        # Product detail (/productos/123)
│
├── categorias/             # Category pages
│   ├── page.tsx            # All categories
│   └── [slug]/
│       └── page.tsx        # Category detail
│
├── tienda/                 # Shop pages
│   └── [shopName]/
│       └── page.tsx        # Public shop page
│
├── artesano/               # Artisan profiles
│   └── [id]/
│       └── page.tsx        # Public artisan story
│
├── carrito/                # Shopping cart
│   └── page.tsx
│
├── checkout/               # Checkout flow
│   └── page.tsx
│
├── pedidos/                # Order pages
│   ├── page.tsx            # Order history
│   └── [id]/
│       ├── page.tsx        # Order detail
│       └── confirmacion/
│           └── page.tsx    # Order confirmation
│
├── iniciar-sesion/         # Login
│   └── page.tsx
│
├── registro/               # Registration
│   └── page.tsx
│
├── perfil/                 # User profile
│   └── page.tsx
│
├── configuracion/          # User settings
│   └── page.tsx
│
├── favoritos/              # Wishlist
│   └── page.tsx
│
├── regalos/                # Gift finder
│   └── page.tsx
│
├── comparar/               # Product comparison
│   └── page.tsx
│
├── dashboard/              # Seller dashboard (protected)
│   └── page.tsx
│
├── mi-historia/            # Artisan story editor
│   └── page.tsx
│
├── vender/                 # Seller landing page
│   └── page.tsx
│
├── calculadora-precios/    # Pricing calculator
│   └── page.tsx
│
├── contacto/               # Contact page
│   └── page.tsx
│
├── admin/                  # Admin panel (protected)
│   ├── page.tsx            # Admin dashboard
│   ├── usuarios/           # User management
│   │   └── page.tsx
│   ├── verificaciones/     # Verification requests
│   │   └── page.tsx
│   └── configuracion/      # Platform settings
│       └── page.tsx
│
└── api/                    # API routes (future)
    └── ...
```

### Naming Conventions

| Convention    | Example                  | Purpose        |
| ------------- | ------------------------ | -------------- |
| `page.tsx`    | `app/productos/page.tsx` | Page component |
| `layout.tsx`  | `app/layout.tsx`         | Shared layout  |
| `loading.tsx` | `app/loading.tsx`        | Loading UI     |
| `error.tsx`   | `app/error.tsx`          | Error boundary |
| `[param]`     | `app/productos/[id]`     | Dynamic route  |
| `(group)`     | `app/(auth)`             | Route group    |

---

## Components Directory

Organized by feature/domain with shared components in `common/`.

```
components/
├── common/                 # Shared/reusable components
│   ├── index.ts            # Barrel export
│   ├── Button.tsx
│   ├── Modal.tsx
│   ├── Card.tsx
│   ├── Tabs.tsx
│   ├── Table.tsx
│   ├── Alert.tsx
│   ├── Badge.tsx
│   ├── Avatar.tsx
│   ├── Pagination.tsx
│   ├── Breadcrumbs.tsx
│   ├── Dropdown.tsx
│   ├── Tooltip.tsx
│   ├── Popover.tsx
│   ├── Accordion.tsx
│   ├── EmptyState.tsx
│   ├── VerificationBadge.tsx
│   │
│   ├── feedback/           # Feedback components
│   │   ├── Toast.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── ErrorState.tsx
│   │   └── ErrorBoundary.tsx
│   │
│   ├── loading/            # Skeleton components
│   │   ├── Skeleton.tsx
│   │   ├── CardSkeleton.tsx
│   │   └── ImageSkeleton.tsx
│   │
│   └── media/              # Media components
│       ├── Carousel.tsx
│       ├── MediaViewer.tsx
│       ├── ThumbnailStrip.tsx
│       └── ZoomControls.tsx
│
├── layout/                 # Layout components
│   ├── header/
│   │   ├── Header.tsx
│   │   ├── MobileMenu.tsx
│   │   ├── UserDropdown.tsx
│   │   └── AdminBanner.tsx
│   └── Footer.tsx
│
├── product/                # Product components
│   ├── ProductCard.tsx
│   ├── ProductCardList.tsx
│   ├── ProductsGrid.tsx
│   ├── ProductInfo.tsx
│   ├── ProductDescription.tsx
│   ├── ProductDetailClient.tsx
│   ├── ProductsPageClient.tsx
│   ├── ProductListWithFilters.tsx
│   ├── SizeSelector.tsx
│   ├── FiltersDrawer.tsx
│   ├── FilterBadge.tsx
│   ├── QuickFilters.tsx
│   ├── SortDropdown.tsx
│   ├── ViewToggle.tsx
│   ├── ReviewsSection.tsx
│   ├── RatingBreakdown.tsx
│   ├── SimilarProducts.tsx
│   ├── DeliveryEstimate.tsx
│   ├── TrustIndicators.tsx
│   ├── SellerProfile.tsx
│   ├── SellerBadge.tsx
│   ├── ShippingReturns.tsx
│   ├── AddToCartButton.tsx
│   ├── StickyCartBar.tsx
│   ├── FavoriteCard.tsx
│   ├── ArtisanCard.tsx
│   │
│   ├── ProductGallery/     # Gallery sub-components
│   │   ├── index.ts
│   │   ├── ProductGallery.tsx
│   │   ├── ProductGalleryDesktop.tsx
│   │   ├── ProductGalleryMobile.tsx
│   │   ├── ProductGalleryModal.tsx
│   │   ├── ProductGalleryBadges.tsx
│   │   └── ProductGalleryActions.tsx
│   │
│   ├── Comparison/         # Comparison feature
│   │   ├── index.ts
│   │   ├── ComparisonBar.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── ComparisonPageClient.tsx
│   │   └── ...
│   │
│   ├── form/               # Product form components
│   │   ├── index.ts
│   │   ├── BasicInfoSection.tsx
│   │   ├── PricingStockSection.tsx
│   │   ├── ImagesSection.tsx
│   │   ├── MaterialsSection.tsx
│   │   └── ...
│   │
│   └── __tests__/          # Product component tests
│       └── SizeSelector.test.tsx
│
├── cart/                   # Cart components
│   ├── CartPageClient.tsx
│   ├── CartItemCard.tsx
│   ├── CartSummary.tsx
│   ├── EmptyCart.tsx
│   ├── RecommendedProducts.tsx
│   │
│   └── checkout/           # Checkout components
│       ├── index.ts
│       ├── CheckoutPageClient.tsx
│       ├── ShippingForm.tsx
│       ├── PaymentMethod.tsx
│       ├── CheckoutSummary.tsx
│       └── OrderConfirmation.tsx
│
├── dashboard/              # Seller dashboard
│   ├── DashboardHeader.tsx
│   ├── TabNavigation.tsx
│   ├── StatsGrid.tsx
│   ├── QuickActions.tsx
│   ├── AlertsSection.tsx
│   ├── CustomerInsights.tsx
│   ├── AnalyticsDashboard.tsx
│   │
│   └── tabs/               # Dashboard tab content
│       ├── OverviewTab.tsx
│       ├── ProductsTab.tsx
│       ├── OrdersTab.tsx
│       ├── ReviewsTab.tsx
│       └── AchievementsTab.tsx
│
├── charts/                 # Data visualization
│   ├── index.ts
│   ├── MetricCard.tsx
│   ├── DonutChart.tsx
│   ├── HorizontalBarChart.tsx
│   ├── ProgressStat.tsx
│   ├── RankedList.tsx
│   ├── DataTable.tsx
│   └── ConversionFunnel.tsx
│
├── home/                   # Homepage sections
│   ├── HeroSlider.tsx
│   ├── CategoriesSection.tsx
│   ├── DealsSection.tsx
│   ├── SeasonalSection.tsx
│   ├── StatesSection.tsx
│   ├── LocalShopsSection.tsx
│   ├── RecentlyViewedSection.tsx
│   └── AboutSection.tsx
│
├── shop/                   # Public shop page
│   ├── ShopPageClient.tsx
│   ├── ShopHeader.tsx
│   ├── ShopCard.tsx
│   ├── ShopStats.tsx
│   ├── ShopProducts.tsx
│   ├── ShopReviews.tsx
│   ├── ShopAbout.tsx
│   └── ShopPolicies.tsx
│
├── artisan-story/          # Artisan story editor
│   ├── index.ts
│   ├── StoryFormSelector.tsx
│   ├── BasicInfoSection.tsx
│   ├── HobbyMakerStorySection.tsx
│   ├── ArtisanStorySection.tsx
│   ├── WorkshopStorySection.tsx
│   ├── CompanyStorySection.tsx
│   ├── MediaSection.tsx
│   ├── RecognitionSection.tsx
│   ├── SocialMediaSection.tsx
│   └── ProcessSection.tsx
│
├── profile/                # User profile
│   ├── SellerSetupForm.tsx
│   ├── ImpactDashboard.tsx
│   └── BuyerAchievements.tsx
│
├── achievements/           # Achievement system
│   ├── index.ts
│   ├── AchievementGrid.tsx
│   ├── AchievementCard.tsx
│   ├── AchievementBadge.tsx
│   ├── AchievementProgress.tsx
│   ├── AchievementToast.tsx
│   ├── AchievementUnlockModal.tsx
│   └── RewardsPanel.tsx
│
├── admin/                  # Admin components
│   ├── UserProfileModal.tsx
│   └── UserExpandedDetails.tsx
│
├── auth/                   # Auth components
│   └── AuthPageWrapper.tsx
│
├── pricing/                # Pricing calculator
│   ├── ProductInfo.tsx
│   ├── MaterialsList.tsx
│   ├── LaborTasksList.tsx
│   ├── OverheadCostsList.tsx
│   ├── FairTradeRatesSelector.tsx
│   └── PricingSummary.tsx
│
├── vender/                 # Seller landing page
│   ├── index.ts
│   ├── BenefitCard.tsx
│   ├── StepCard.tsx
│   ├── FeatureCard.tsx
│   ├── TestimonialCard.tsx
│   └── TrustIndicator.tsx
│
├── cookies/                # Cookie consent
│   ├── index.ts
│   ├── CookieConsentBanner.tsx
│   ├── CookiePreferencesModal.tsx
│   └── CookiePreferencesButton.tsx
│
├── contact/                # Contact components
│   ├── ContactForm.tsx
│   └── ContactModal.tsx
│
├── messages/               # Messaging
│   └── MessageListItem.tsx
│
├── modals/                 # Modal dialogs
│   └── AuthRequiredModal.tsx
│
├── orders/                 # Order components
│   └── ReviewModal.tsx
│
├── providers/              # Context providers
│   ├── ThemeProvider.tsx
│   └── MaintenanceProvider.tsx
│
└── ui/                     # UI components
    └── SearchModal.tsx
```

### Component Patterns

| Pattern          | Example           | When to Use        |
| ---------------- | ----------------- | ------------------ |
| Feature folder   | `product/`        | Related components |
| Barrel export    | `index.ts`        | Clean imports      |
| Sub-components   | `ProductGallery/` | Complex components |
| Client component | `*Client.tsx`     | Interactive pages  |

---

## Contexts Directory

React Context providers for global state.

```
contexts/
├── AuthContext.tsx         # User authentication
├── CartContext.tsx         # Shopping cart
└── ToastContext.tsx        # Toast notifications
```

---

## Hooks Directory

Custom React hooks organized by category.

```
hooks/
├── index.ts                # Re-exports
│
├── common/                 # Shared hooks
│   ├── index.ts
│   ├── useDebounce.ts
│   ├── useLocalStorage.ts
│   ├── useMediaQuery.ts
│   ├── useClickOutside.ts
│   ├── useKeyboardShortcut.ts
│   ├── useCopyToClipboard.ts
│   ├── useIntersectionObserver.ts
│   ├── usePagination.ts
│   ├── useUrlState.ts
│   └── ...
│
├── media/                  # Media-related hooks
│   ├── index.ts
│   ├── useCarousel.ts
│   ├── useZoomControls.ts
│   └── useImagePreload.ts
│
├── product/                # Product hooks
│   ├── index.ts
│   ├── useProductFilters.ts
│   ├── useRecentlyViewed.ts
│   ├── useCompareProducts.ts
│   └── useFavorites.ts
│
├── artisan-story/          # Story editor hooks
│   ├── index.ts
│   └── useArtisanStory.ts
│
└── auth/                   # Auth hooks
    ├── index.ts
    └── useRequireAuth.ts
```

---

## Lib Directory

Utilities, constants, and data.

```
lib/
├── index.ts                # Re-exports utilities
│
├── constants/              # Application constants
│   ├── routes.ts           # Route paths
│   ├── verification.ts     # Verification tiers
│   ├── filters.ts          # Filter options
│   ├── sizes.ts            # Size constants
│   └── ...
│
├── data/                   # Mock data (JSON)
│   ├── products.json
│   ├── artisan-stories.json
│   ├── users.ts
│   └── ...
│
├── types/                  # Domain types
│   ├── index.ts
│   ├── order.ts
│   ├── checkout.ts
│   ├── seller.ts
│   ├── seller-types.ts
│   ├── buyer.ts
│   ├── verification.ts
│   ├── artisan-story.ts
│   ├── pricing-calculator.ts
│   └── ...
│
├── utils/                  # Utility functions
│   ├── index.ts
│   ├── format.ts           # Formatters (currency, date)
│   ├── validation.ts       # Validation helpers
│   ├── orders.ts           # Order utilities
│   ├── coupons.ts          # Coupon validation
│   └── ...
│
└── api/                    # API utilities (future)
    └── buyer/
        └── impact.ts
```

---

## Types Directory

Global TypeScript types for UI/frontend.

```
types/
├── index.ts
├── product.ts              # Product types
├── cart.ts                 # Cart types
├── filters.ts              # Filter types
├── comparison.ts           # Comparison types
└── common.ts               # Common UI types
```

### Types Split

| Location     | Purpose               | Example                     |
| ------------ | --------------------- | --------------------------- |
| `types/`     | Frontend/UI types     | Product, Cart, Filters      |
| `lib/types/` | Domain/business types | Order, Seller, Verification |

---

## Validators Directory

Zod schemas for form validation.

```
validators/
├── index.ts                # Re-exports
├── user.ts                 # Auth schemas
├── product.ts              # Product schemas
├── checkout.ts             # Checkout schemas
└── utils.ts                # Validation utilities
```

---

## Services Directory

Data abstraction layer (for easy DB migration).

```
services/
└── settingsService.ts      # Admin settings service
```

### Service Pattern

```typescript
// services/settingsService.ts
export const settingsService = {
  getSettings: () => {
    // Currently: localStorage
    // Future: Supabase API
    return JSON.parse(localStorage.getItem('settings') || '{}');
  },
  saveSettings: (settings) => {
    localStorage.setItem('settings', JSON.stringify(settings));
  },
};
```

---

## Import Aliases

Configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Usage

```typescript
// Preferred - alias imports
import { Button } from '@/components/common';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib';

// Avoid - relative imports for deep paths
import { Button } from '../../../components/common/Button';
```

---

## File Naming Conventions

| Type       | Convention                   | Example               |
| ---------- | ---------------------------- | --------------------- |
| Components | PascalCase                   | `ProductCard.tsx`     |
| Hooks      | camelCase with `use`         | `useLocalStorage.ts`  |
| Utilities  | camelCase                    | `format.ts`           |
| Types      | camelCase                    | `product.ts`          |
| Constants  | camelCase or SCREAMING_SNAKE | `routes.ts`, `ROUTES` |
| Tests      | `*.test.tsx`                 | `Button.test.tsx`     |

---

## Related Documentation

- [Architecture Overview](../architecture/OVERVIEW.md)
- [Components Reference](../COMPONENTS.md)
- [Contributing Guide](./CONTRIBUTING.md)
