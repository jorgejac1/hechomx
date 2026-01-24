# User Flows

> Key user journeys through Papalote Market.

## Table of Contents

1. [Authentication Flow](#1-authentication-flow)
2. [Buyer Journey](#2-buyer-journey)
3. [Seller Onboarding](#3-seller-onboarding)
4. [Checkout Flow](#4-checkout-flow)
5. [Seller Dashboard](#5-seller-dashboard)
6. [Admin Workflows](#6-admin-workflows)

---

## 1. Authentication Flow

### Login Flow

```mermaid
flowchart TD
    A["User visits protected page"] --> B{"Is authenticated?"}
    B -->|Yes| C["Show page content"]
    B -->|No| D["Redirect to login"]
    D --> E["User enters credentials"]
    E --> F{"Valid credentials?"}
    F -->|Yes| G["Set auth state"]
    G --> H["Redirect to original page"]
    F -->|No| I["Show error message"]
    I --> E
```

**Key Files:**

- [AuthContext.tsx](../contexts/AuthContext.tsx) - Auth state management
- [AuthPageWrapper.tsx](../components/auth/AuthPageWrapper.tsx) - Route protection
- [/iniciar-sesion](../app/iniciar-sesion/page.tsx) - Login page

### Registration Flow

```mermaid
flowchart TD
    A["User clicks 'Registrarse'"] --> B["Registration page"]
    B --> C["Fill registration form"]
    C --> D{"Form valid?"}
    D -->|No| E["Show validation errors"]
    E --> C
    D -->|Yes| F["Create account"]
    F --> G["Auto-login user"]
    G --> H["Redirect to profile"]
    H --> I{"Want to sell?"}
    I -->|Yes| J["Show seller setup modal"]
    I -->|No| K["Continue as buyer"]
```

**Key Files:**

- [/registro](../app/registro/page.tsx) - Registration page
- [validators/user.ts](../validators/user.ts) - Registration schema

### User Roles

| Role     | Access Level | Key Features                |
| -------- | ------------ | --------------------------- |
| `buyer`  | Basic        | Browse, purchase, reviews   |
| `seller` | Extended     | Dashboard, products, orders |
| `admin`  | Full         | User management, settings   |

---

## 2. Buyer Journey

### Browse to Purchase

```mermaid
flowchart TD
    A[Homepage] --> B[Browse Products]
    B --> C{Filter/Search}
    C --> D[View Product Detail]
    D --> E{Add to Cart?}
    E -->|Yes| F[Add to Cart]
    F --> G{Continue Shopping?}
    G -->|Yes| B
    G -->|No| H[View Cart]
    E -->|No| B
    H --> I[Proceed to Checkout]
    I --> J[Complete Purchase]
```

### Product Discovery

```mermaid
flowchart LR
    subgraph Discovery["Product Discovery"]
        A[Homepage] --> B[Categories]
        A --> C[Search]
        A --> D[Gifts Page]
        A --> E[Recently Viewed]
    end

    subgraph Filtering["Filtering"]
        B --> F[Category Page]
        F --> G[Price Filter]
        F --> H[State Filter]
        F --> I[Sort Options]
    end

    subgraph Detail["Product Detail"]
        G --> J[Product Page]
        H --> J
        I --> J
        C --> J
    end
```

**Key Pages:**

- [/productos](../app/productos/page.tsx) - Product listing
- [/productos/[id]](../app/productos/[id]/page.tsx) - Product detail
- [/regalos](../app/regalos/page.tsx) - Gift finder
- [/categorias](../app/categorias/page.tsx) - Categories

---

## 3. Seller Onboarding

### Becoming a Seller

```mermaid
flowchart TD
    A["Registered User"] --> B["Visit profile page"]
    B --> C["Click 'Activar Tienda'"]
    C --> D["Seller Setup Modal"]
    D --> E["Enter shop details"]
    E --> F{"Valid input?"}
    F -->|No| G["Show errors"]
    G --> E
    F -->|Yes| H["Create seller profile"]
    H --> I["Redirect to dashboard"]
    I --> J["Complete artisan story"]
    J --> K["Add first product"]
    K --> L["Ready to sell!"]
```

### Seller Setup Form

| Field       | Validation        | Required |
| ----------- | ----------------- | -------- |
| Shop Name   | Min 3 characters  | Yes      |
| Location    | Min 3 characters  | Yes      |
| Description | 20-300 characters | Yes      |

**Key Files:**

- [SellerSetupForm.tsx](../components/profile/SellerSetupForm.tsx) - Setup modal
- [/mi-historia](../app/mi-historia/page.tsx) - Artisan story editor

---

## 4. Checkout Flow

### Complete Checkout Process

```mermaid
flowchart TD
    A["Cart Page"] --> B{"User logged in?"}
    B -->|No| C["Show AuthRequiredModal"]
    C --> D["Login or Register"]
    D --> E["Return to cart"]
    B -->|Yes| E
    E --> F["Click 'Proceder al pago'"]
    F --> G["Checkout page"]

    subgraph Checkout["Checkout Steps"]
        G --> H["Shipping Address"]
        H --> I["Payment Method"]
        I --> J["Review Order"]
        J --> K["Apply Coupon - Optional"]
        K --> L["Confirm Order"]
    end

    L --> M["Order Confirmation"]
    M --> N["Email Confirmation"]
```

### Checkout Components

```mermaid
flowchart LR
    subgraph CheckoutPage["Checkout Page"]
        A[CheckoutPageClient]
        A --> B[ShippingForm]
        A --> C[PaymentMethod]
        A --> D[CheckoutSummary]
    end

    subgraph CartSummary["Order Summary"]
        D --> E[Cart Items]
        D --> F[Subtotal]
        D --> G[Shipping]
        D --> H[Coupon Discount]
        D --> I[Total]
    end
```

**Key Files:**

- [/carrito](../app/carrito/page.tsx) - Cart page
- [/checkout](../app/checkout/page.tsx) - Checkout page
- [CheckoutPageClient.tsx](../components/cart/checkout/CheckoutPageClient.tsx)
- [CartContext.tsx](../contexts/CartContext.tsx) - Cart state

---

## 5. Seller Dashboard

### Dashboard Overview

```mermaid
flowchart TD
    A["Dashboard Page"] --> B["DashboardHeader"]
    A --> C["TabNavigation"]

    C --> D["Overview Tab"]
    C --> E["Products Tab"]
    C --> F["Orders Tab"]
    C --> G["Reviews Tab"]
    C --> H["Achievements Tab"]

    D --> I["StatsGrid"]
    D --> J["QuickActions"]
    D --> K["AlertsSection"]
    D --> L["CustomerInsights"]

    E --> M["Product List"]
    E --> N["Add Product"]
    E --> O["Bulk Actions"]

    F --> P["Order Management"]
    F --> Q["Status Updates"]
```

### Product Management Flow

```mermaid
flowchart TD
    A[Products Tab] --> B{Action}
    B -->|Add| C[Product Form]
    B -->|Edit| D[Load Product Data]
    D --> C
    B -->|Delete| E[Confirm Delete]
    B -->|Bulk| F[Select Multiple]

    C --> G{Valid?}
    G -->|Yes| H[Save Product]
    G -->|No| I[Show Errors]
    I --> C

    H --> J{Published?}
    J -->|Draft| K[Save as Draft]
    J -->|Publish| L[Live on Site]

    F --> M[Bulk Action Menu]
    M --> N[Delete Selected]
    M --> O[Toggle Published]
```

**Key Files:**

- [/dashboard](../app/dashboard/page.tsx) - Dashboard page
- [ProductsTab.tsx](../components/dashboard/tabs/ProductsTab.tsx)
- [OrdersTab.tsx](../components/dashboard/tabs/OrdersTab.tsx)

---

## 6. Admin Workflows

### User Management

```mermaid
flowchart TD
    A["Admin Users Page"] --> B["User List Table"]
    B --> C{"Action"}

    C -->|View| D["User Profile Modal"]
    C -->|Suspend| E["Confirm Suspension"]
    C -->|Reactivate| F["Reactivate Account"]
    C -->|Filter| G["Filter by Role/Status"]

    D --> H["User Details"]
    D --> I["Activity Stats"]
    D --> J["Admin Actions"]

    E --> K["Update User Status"]
    F --> K
    K --> L["Refresh List"]
```

### Verification Workflow

```mermaid
flowchart TD
    A[Seller applies for verification] --> B[Submit documents]
    B --> C[Admin reviews]
    C --> D{Decision}
    D -->|Approve| E[Update verification tier]
    D -->|Reject| F[Send feedback]
    F --> G[Seller resubmits]
    G --> C
    E --> H[Lower commission rate]
    E --> I[Verification badge displayed]
```

### Verification Tiers

| Tier                 | Commission | Requirements           |
| -------------------- | ---------- | ---------------------- |
| `basic_seller`       | 10%        | Email verified         |
| `verified_artisan`   | 8%         | ID + craft photos      |
| `master_artisan`     | 5%         | Awards, certifications |
| `certified_workshop` | 7%         | Business docs, team    |

**Key Files:**

- [/admin/usuarios](../app/admin/usuarios/page.tsx) - User management
- [UserProfileModal.tsx](../components/admin/UserProfileModal.tsx)
- [verification.ts](../lib/constants/verification.ts) - Tier constants

---

## Flow Diagrams Legend

| Symbol            | Meaning          |
| ----------------- | ---------------- |
| Rectangle         | Action/Process   |
| Diamond           | Decision         |
| Parallelogram     | Input/Output     |
| Cylinder          | Database/Storage |
| Rounded Rectangle | Start/End        |

---

_See also: [Architecture Overview](./architecture/OVERVIEW.md) | [Components](./COMPONENTS.md)_
