# Component Reference

> Component library documentation for Papalote Market.

## Table of Contents

1. [Common Components](#common-components)
2. [Layout Components](#layout-components)
3. [Product Components](#product-components)
4. [Cart & Checkout](#cart--checkout)
5. [Dashboard Components](#dashboard-components)
6. [Charts & Data](#charts--data)
7. [Form Components](#form-components)

---

## Common Components

**Location:** `components/common/`

### Button

Primary action button with variants.

```tsx
import { Button } from '@/components/common';

<Button variant="primary" size="md" loading={false}>
  Click me
</Button>;
```

| Prop        | Type                                                           | Default     | Description          |
| ----------- | -------------------------------------------------------------- | ----------- | -------------------- |
| `variant`   | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Visual style         |
| `size`      | `'sm' \| 'md' \| 'lg'`                                         | `'md'`      | Button size          |
| `loading`   | `boolean`                                                      | `false`     | Show loading spinner |
| `disabled`  | `boolean`                                                      | `false`     | Disable interactions |
| `fullWidth` | `boolean`                                                      | `false`     | Full container width |

---

### Modal

Dialog overlay for focused interactions.

```tsx
import { Modal } from '@/components/common';

<Modal
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  title="Confirm Action"
  size="md"
  footer={<Button onClick={handleConfirm}>Confirm</Button>}
>
  <p>Are you sure you want to proceed?</p>
</Modal>;
```

| Prop              | Type                           | Default | Description        |
| ----------------- | ------------------------------ | ------- | ------------------ |
| `isOpen`          | `boolean`                      | -       | Control visibility |
| `onClose`         | `() => void`                   | -       | Close handler      |
| `title`           | `string`                       | -       | Modal title        |
| `size`            | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`  | Modal width        |
| `footer`          | `ReactNode`                    | -       | Footer content     |
| `showCloseButton` | `boolean`                      | `true`  | Show X button      |

---

### Alert

Informational messages with variants.

```tsx
import { Alert } from '@/components/common';

<Alert variant="warning" title="Advertencia" icon={AlertTriangle}>
  This action cannot be undone.
</Alert>;
```

| Prop          | Type                                          | Default     | Description         |
| ------------- | --------------------------------------------- | ----------- | ------------------- |
| `variant`     | `'info' \| 'success' \| 'warning' \| 'error'` | `'info'`    | Alert type          |
| `title`       | `string`                                      | -           | Alert title         |
| `icon`        | `LucideIcon`                                  | -           | Custom icon         |
| `layout`      | `'default' \| 'bordered'`                     | `'default'` | Visual style        |
| `dismissible` | `boolean`                                     | `false`     | Show dismiss button |

---

### Tabs

Tabbed content navigation.

```tsx
import { Tabs } from '@/components/common';

<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="products">Products</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel value="overview">Overview content</Tabs.Panel>
    <Tabs.Panel value="products">Products list</Tabs.Panel>
  </Tabs.Panels>
</Tabs>;
```

---

### Card

Content container with optional header/footer.

```tsx
import { Card } from '@/components/common';

<Card>
  <Card.Header>
    <h3>Card Title</h3>
  </Card.Header>
  <Card.Body>Content here</Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>;
```

---

### Badge

Status indicators and labels.

```tsx
import { Badge } from '@/components/common';

<Badge variant="success" size="sm">
  Active
</Badge>;
```

| Prop      | Type                                                       | Default     | Description   |
| --------- | ---------------------------------------------------------- | ----------- | ------------- |
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Color variant |
| `size`    | `'sm' \| 'md'`                                             | `'md'`      | Badge size    |

---

### EmptyState

Placeholder for empty content areas.

```tsx
import { EmptyState } from '@/components/common';

<EmptyState
  icon={Package}
  title="No products yet"
  description="Add your first product to start selling"
  action={<Button onClick={handleAdd}>Add Product</Button>}
/>;
```

---

## Layout Components

**Location:** `components/layout/`

### Header

Main navigation header with search, cart, and user menu.

```tsx
// Automatically included via layout.tsx
import Header from '@/components/layout/header/Header';
```

**Features:**

- Logo and navigation links
- Search functionality
- Cart icon with item count
- User dropdown (authenticated) or login button
- Mobile menu toggle
- Dark mode toggle

---

### Footer

Site footer with links and newsletter.

```tsx
import Footer from '@/components/layout/Footer';
```

---

### Breadcrumbs

Navigation breadcrumbs.

```tsx
import { Breadcrumbs } from '@/components/common';

<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/productos' },
    { label: 'Textiles' }, // Current page (no href)
  ]}
/>;
```

---

## Product Components

**Location:** `components/product/`

### ProductCard

Product listing card with hover effects.

```tsx
import ProductCard from '@/components/product/ProductCard';

<ProductCard product={product} showQuickActions={true} showCompareButton={true} />;
```

| Prop                | Type      | Default | Description               |
| ------------------- | --------- | ------- | ------------------------- |
| `product`           | `Product` | -       | Product data              |
| `showQuickActions`  | `boolean` | `true`  | Show add to cart/wishlist |
| `showCompareButton` | `boolean` | `false` | Show compare button       |

---

### ProductGallery

Image gallery with zoom and thumbnails.

```tsx
import { ProductGallery } from '@/components/product/ProductGallery';

<ProductGallery images={product.images} videos={product.videos} productName={product.name} />;
```

**Features:**

- Thumbnail navigation
- Zoom on hover
- Fullscreen modal
- Video support
- Mobile swipe gestures

---

### ProductInfo

Product details display.

```tsx
import ProductInfo from '@/components/product/ProductInfo';

<ProductInfo product={product} onAddToCart={handleAddToCart} />;
```

---

### SizeSelector

Size selection with availability.

```tsx
import SizeSelector from '@/components/product/SizeSelector';

<SizeSelector
  sizes={product.availableSizes}
  sizeType={product.sizeType}
  selectedSize={selectedSize}
  onSizeChange={setSelectedSize}
/>;
```

---

### FiltersDrawer

Mobile-friendly filters panel.

```tsx
import FiltersDrawer from '@/components/product/FiltersDrawer';

<FiltersDrawer
  isOpen={showFilters}
  onClose={() => setShowFilters(false)}
  filters={filters}
  onFiltersChange={setFilters}
/>;
```

---

## Cart & Checkout

**Location:** `components/cart/`

### CartItemCard

Individual cart item with quantity controls.

```tsx
import CartItemCard from '@/components/cart/CartItemCard';

<CartItemCard item={cartItem} onUpdateQuantity={handleQuantity} onRemove={handleRemove} />;
```

---

### CartSummary

Order summary with totals.

```tsx
import CartSummary from '@/components/cart/CartSummary';

<CartSummary items={cartItems} showCouponInput={true} onApplyCoupon={handleCoupon} />;
```

---

### CheckoutPageClient

Main checkout flow component.

```tsx
import CheckoutPageClient from '@/components/cart/checkout/CheckoutPageClient';

<CheckoutPageClient />;
```

**Includes:**

- ShippingForm
- PaymentMethod
- CheckoutSummary
- OrderConfirmation

---

## Dashboard Components

**Location:** `components/dashboard/`

### StatsGrid

Key metrics display.

```tsx
import StatsGrid from '@/components/dashboard/StatsGrid';

<StatsGrid
  stats={[
    { label: 'Total Sales', value: '$5,000', change: 12 },
    { label: 'Orders', value: '48', change: -3 },
  ]}
/>;
```

---

### TabNavigation

Dashboard tab switcher.

```tsx
import TabNavigation from '@/components/dashboard/TabNavigation';

<TabNavigation
  activeTab={activeTab}
  onTabChange={setActiveTab}
  tabs={[
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'products', label: 'Products', icon: Package },
  ]}
/>;
```

---

### Dashboard Tabs

Individual tab content components:

- **OverviewTab** - Stats, charts, quick actions
- **ProductsTab** - Product management table
- **OrdersTab** - Order management
- **ReviewsTab** - Review responses
- **AchievementsTab** - Seller achievements

---

## Charts & Data

**Location:** `components/charts/`

### MetricCard

Single KPI display.

```tsx
import { MetricCard } from '@/components/charts';

<MetricCard
  title="Revenue"
  value="$12,500"
  change={15}
  changeLabel="vs last month"
  icon={<DollarSign />}
  variant="success"
/>;
```

---

### DonutChart

Circular chart with segments.

```tsx
import { DonutChart } from '@/components/charts';

<DonutChart
  segments={[
    { label: 'Textiles', value: 45, color: 'purple-500' },
    { label: 'Pottery', value: 30, color: 'blue-500' },
    { label: 'Other', value: 25, color: 'gray-400' },
  ]}
  centerValue="100"
  centerLabel="Total"
  showLegend
/>;
```

---

### HorizontalBarChart

Horizontal bar visualization.

```tsx
import { HorizontalBarChart } from '@/components/charts';

<HorizontalBarChart
  data={[
    { label: 'Product A', value: 150 },
    { label: 'Product B', value: 120 },
  ]}
  color="bg-purple-500"
  showValues
/>;
```

---

### DataTable

Generic data table with sorting.

```tsx
import { DataTable } from '@/components/charts';

<DataTable
  columns={[
    { header: 'Name', accessor: 'name' },
    { header: 'Price', accessor: (row) => `$${row.price}` },
  ]}
  data={products}
  keyAccessor="id"
  hoverable
  striped
/>;
```

---

### RankedList

Leaderboard-style list.

```tsx
import { RankedList } from '@/components/charts';

<RankedList
  items={[
    { name: 'Top Seller', value: '$5,000', trend: 12 },
    { name: 'Runner Up', value: '$3,500', trend: -5 },
  ]}
  showRank
  showTrend
/>;
```

---

## Form Components

**Location:** `components/common/`

### TextInput

Text input with validation.

```tsx
import { TextInput } from '@/components/common';

<TextInput
  label="Email"
  name="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errors.email}
  required
/>;
```

---

### Select

Dropdown selection.

```tsx
import { Select } from '@/components/common';

<Select
  label="Category"
  options={[
    { value: 'textiles', label: 'Textiles' },
    { value: 'pottery', label: 'Pottery' },
  ]}
  value={category}
  onChange={setCategory}
/>;
```

---

### Textarea

Multi-line text input.

```tsx
import { Textarea } from '@/components/common';

<Textarea
  label="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={4}
  maxLength={500}
  showCount
/>;
```

---

### Checkbox

Checkbox with label.

```tsx
import { Checkbox } from '@/components/common';

<Checkbox label="Accept terms and conditions" checked={accepted} onChange={setAccepted} />;
```

---

### FileUpload

File upload with preview.

```tsx
import { FileUpload } from '@/components/common';

<FileUpload accept="image/*" multiple maxFiles={5} onUpload={handleUpload} preview />;
```

---

## Component Patterns

### Import from Barrel Files

```tsx
// Preferred - from barrel exports
import { Button, Modal, Card } from '@/components/common';
import { MetricCard, DonutChart } from '@/components/charts';

// Also works - direct imports
import Button from '@/components/common/Button';
```

### Dark Mode Support

All components support dark mode via Tailwind's `dark:` prefix:

```tsx
<div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">Content</div>
```

### Loading States

Use skeleton components during loading:

```tsx
import { CardSkeleton } from '@/components/common/loading';

{
  isLoading ? (
    <CardSkeleton showImage showTitle showDescription />
  ) : (
    <ProductCard product={product} />
  );
}
```

---

## Component Organization

```
components/
├── common/           # Shared primitives
│   ├── Button.tsx
│   ├── Modal.tsx
│   ├── feedback/     # Toast, ErrorState, Spinner
│   ├── loading/      # Skeletons
│   └── media/        # Carousel, MediaViewer
├── layout/           # Header, Footer
├── product/          # Product-related
├── cart/             # Cart and checkout
│   └── checkout/
├── dashboard/        # Seller dashboard
│   └── tabs/
├── charts/           # Data visualization
├── admin/            # Admin panel
├── artisan-story/    # Story editor sections
└── profile/          # User profile
```

---

_See also: [Architecture Overview](./architecture/OVERVIEW.md) | [Data Models](./DATA-MODELS.md)_
