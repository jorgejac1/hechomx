# API Routes Documentation

> Complete reference for all API endpoints in Papalote Market.

## Table of Contents

1. [Overview](#overview)
2. [Response Format](#response-format)
3. [Public Endpoints](#public-endpoints)
4. [Buyer Endpoints](#buyer-endpoints)
5. [Seller Endpoints](#seller-endpoints)
6. [Future Endpoints](#future-endpoints-supabase-migration)

---

## Overview

All API routes are located in `app/api/` and follow Next.js App Router conventions. Currently, endpoints return mock data from JSON files in `lib/data/`. When migrating to Supabase, only the data source will change - the API contracts remain stable.

### Base URL

```
Development: http://localhost:3000/api
Production:  https://hechomx.vercel.app/api
Future:      https://papalotemarket.com/api
```

### Authentication

Currently using mock authentication. Future implementation will use JWT tokens:

```http
Authorization: Bearer <token>
```

---

## Response Format

All endpoints return a consistent JSON structure:

### Success Response

```json
{
  "success": true,
  "data": { ... },
  "count": 10  // Optional: for list endpoints
}
```

### Error Response

```json
{
  "success": false,
  "error": "Error message description"
}
```

### HTTP Status Codes

| Code | Description                                 |
| ---- | ------------------------------------------- |
| 200  | Success                                     |
| 400  | Bad Request - Missing or invalid parameters |
| 401  | Unauthorized - Authentication required      |
| 404  | Not Found - Resource doesn't exist          |
| 500  | Internal Server Error                       |

---

## Public Endpoints

### Products

#### GET `/api/products`

Retrieves product listings with optional filtering.

**Query Parameters:**

| Parameter  | Type   | Description               |
| ---------- | ------ | ------------------------- |
| `category` | string | Filter by category slug   |
| `state`    | string | Filter by Mexican state   |
| `search`   | string | Search query for products |

**Example Request:**

```bash
# Get all products
curl /api/products

# Filter by category
curl /api/products?category=textiles

# Search products
curl /api/products?search=alebrije
```

**Response:**

```json
{
  "success": true,
  "count": 25,
  "data": [
    {
      "id": "prod-001",
      "name": "Alebrije Dragón",
      "price": 2500,
      "category": "alebrijes",
      "state": "Oaxaca",
      "maker": { ... },
      "images": [ ... ]
    }
  ]
}
```

**Source:** [`app/api/products/route.ts`](../../app/api/products/route.ts)

---

### Artisan Stories

#### GET `/api/artisan-stories`

Retrieves artisan profiles and their craft stories.

**Example Request:**

```bash
curl /api/artisan-stories
```

**Response:**

```json
{
  "stories": [
    {
      "id": "artisan-001",
      "name": "María García",
      "craft": "Textiles",
      "state": "Oaxaca",
      "bio": "...",
      "techniques": ["backstrap loom", "natural dyes"],
      "awards": [ ... ]
    }
  ]
}
```

**Source:** [`app/api/artisan-stories/route.ts`](../../app/api/artisan-stories/route.ts)

---

### Shops

#### GET `/api/shops`

Retrieves all artisan shops.

**Example Request:**

```bash
curl /api/shops
```

**Source:** [`app/api/shops/route.ts`](../../app/api/shops/route.ts)

---

### Pricing

#### GET `/api/pricing/fair-trade-rates`

Retrieves fair trade commission rates by verification tier.

**Response:**

```json
{
  "success": true,
  "data": {
    "basic_seller": { "commission": 0.1, "label": "Vendedor Básico" },
    "verified_artisan": { "commission": 0.08, "label": "Artesano Verificado" },
    "master_artisan": { "commission": 0.05, "label": "Maestro Artesano" },
    "certified_workshop": { "commission": 0.07, "label": "Taller Certificado" }
  }
}
```

**Source:** [`app/api/pricing/fair-trade-rates/route.ts`](../../app/api/pricing/fair-trade-rates/route.ts)

---

## Buyer Endpoints

### Favorites

#### GET `/api/favorites`

Retrieves user's favorite products with enriched data.

**Query Parameters:**

| Parameter | Type   | Required | Description          |
| --------- | ------ | -------- | -------------------- |
| `email`   | string | Yes      | User's email address |

**Example Request:**

```bash
curl /api/favorites?email=comprador@ejemplo.com
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": "prod-001",
      "name": "Alebrije Dragón",
      "price": 2500,
      "addedAt": "2024-01-15T10:30:00Z",
      "notes": "For mom's birthday"
    }
  ]
}
```

**Source:** [`app/api/favorites/route.ts`](../../app/api/favorites/route.ts)

---

### Buyer Orders

#### GET `/api/buyer/orders`

Retrieves order history for a buyer.

**Source:** [`app/api/buyer/orders/route.ts`](../../app/api/buyer/orders/route.ts)

---

### Buyer Impact

#### GET `/api/buyer/impact`

Retrieves impact metrics showing how purchases support artisans.

**Response:**

```json
{
  "success": true,
  "data": {
    "totalPurchases": 15,
    "artisansSupported": 8,
    "communitiesImpacted": 5,
    "totalSpent": 45000,
    "fairTradeContribution": 3600
  }
}
```

**Source:** [`app/api/buyer/impact/route.ts`](../../app/api/buyer/impact/route.ts)

---

### Buyer Achievements

#### GET `/api/buyer/achievements`

Retrieves buyer achievement badges and progress.

**Source:** [`app/api/buyer/achievements/route.ts`](../../app/api/buyer/achievements/route.ts)

---

## Seller Endpoints

### Seller Analytics

#### GET `/api/seller/analytics`

Retrieves sales analytics and performance metrics.

**Query Parameters:**

| Parameter | Type   | Required | Description            |
| --------- | ------ | -------- | ---------------------- |
| `email`   | string | Yes      | Seller's email address |

**Example Request:**

```bash
curl /api/seller/analytics?email=sofia@tejidos.com
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalSales": 125000,
    "ordersCount": 48,
    "averageOrderValue": 2604,
    "topProducts": [ ... ],
    "salesByMonth": [ ... ],
    "conversionRate": 3.2
  }
}
```

**Source:** [`app/api/seller/analytics/route.ts`](../../app/api/seller/analytics/route.ts)

---

### Seller Orders

#### GET `/api/seller/orders`

Retrieves orders received by the seller.

**Response:**

```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "order-001",
        "status": "pending",
        "items": [ ... ],
        "customer": { ... },
        "shippingAddress": { ... }
      }
    ]
  }
}
```

**Source:** [`app/api/seller/orders/route.ts`](../../app/api/seller/orders/route.ts)

---

### Seller Products

#### GET `/api/seller/products`

Retrieves products listed by a seller.

**Source:** [`app/api/seller/products/route.ts`](../../app/api/seller/products/route.ts)

---

### Seller Reviews

#### GET `/api/seller/reviews`

Retrieves reviews received by the seller.

**Source:** [`app/api/seller/reviews/route.ts`](../../app/api/seller/reviews/route.ts)

---

### Seller Messages

#### GET `/api/seller/messages`

Retrieves customer messages and inquiries.

**Source:** [`app/api/seller/messages/route.ts`](../../app/api/seller/messages/route.ts)

---

### Seller Tasks

#### GET `/api/seller/tasks`

Retrieves pending tasks and to-dos for the seller.

**Source:** [`app/api/seller/tasks/route.ts`](../../app/api/seller/tasks/route.ts)

---

### Customer Insights

#### GET `/api/seller/customer-insights`

Retrieves customer analytics and demographics.

**Source:** [`app/api/seller/customer-insights/route.ts`](../../app/api/seller/customer-insights/route.ts)

---

### Seller Verification

#### GET `/api/seller/verification`

Retrieves seller's verification status and requirements.

**Source:** [`app/api/seller/verification/route.ts`](../../app/api/seller/verification/route.ts)

---

### Seller Achievements

#### GET `/api/seller/achievements`

Retrieves seller achievement badges and milestones.

**Source:** [`app/api/seller/achievements/route.ts`](../../app/api/seller/achievements/route.ts)

---

## Admin Endpoints

### Pending Actions

#### GET `/api/pending-actions`

Retrieves pending admin actions (verifications, reports, etc.).

**Source:** [`app/api/pending-actions/route.ts`](../../app/api/pending-actions/route.ts)

---

### Maintenance

#### GET `/api/maintenance`

Retrieves system maintenance status.

**Source:** [`app/api/maintenance/route.ts`](../../app/api/maintenance/route.ts)

---

## Future Endpoints (Supabase Migration)

When migrating to Supabase, these endpoints will be added:

### Authentication

```
POST /api/auth/register     - Create new user account
POST /api/auth/login        - Authenticate user
POST /api/auth/logout       - End user session
POST /api/auth/refresh      - Refresh access token
GET  /api/auth/me           - Get current user
```

### Products (Full CRUD)

```
POST   /api/products        - Create new product
PUT    /api/products/:id    - Update product
DELETE /api/products/:id    - Delete product
PATCH  /api/products/:id/publish - Toggle publish status
```

### Orders

```
POST /api/orders            - Create new order
PUT  /api/orders/:id/status - Update order status
POST /api/orders/:id/refund - Process refund
```

### Reviews

```
POST /api/reviews           - Submit product review
PUT  /api/reviews/:id       - Update review
DELETE /api/reviews/:id     - Delete review
```

### Verification

```
POST /api/seller/verification/apply - Submit verification application
POST /api/seller/verification/upload - Upload verification documents
```

---

## Error Handling

All endpoints follow consistent error handling:

```typescript
try {
  // Business logic
  return NextResponse.json({ success: true, data });
} catch (error) {
  console.error('[api/endpoint] Error:', error);
  return NextResponse.json({ success: false, error: 'Error message' }, { status: 500 });
}
```

---

## Testing API Endpoints

### Using cURL

```bash
# Get all products
curl http://localhost:3000/api/products | jq

# Get seller analytics
curl "http://localhost:3000/api/seller/analytics?email=sofia@tejidos.com" | jq
```

### Using fetch

```typescript
const response = await fetch('/api/products?category=textiles');
const data = await response.json();

if (data.success) {
  console.log(data.data);
} else {
  console.error(data.error);
}
```

---

_See also: [Architecture Overview](../architecture/OVERVIEW.md) | [Data Models](../DATA-MODELS.md)_
