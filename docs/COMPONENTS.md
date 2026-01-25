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

Full-screen slide-out drawer with comprehensive filtering options.

```tsx
import FiltersDrawer from '@/components/product/FiltersDrawer';

<FiltersDrawer
  isOpen={isFilterOpen}
  onClose={() => setIsFilterOpen(false)}
  filters={filters}
  filterOptions={filterOptions}
  priceRange={priceRange}
  onToggleCategory={toggleCategory}
  onToggleState={toggleState}
  onToggleMaterial={toggleMaterial}
  onUpdatePriceRange={updatePriceRange}
  onUpdateMinRating={updateMinRating}
  onToggleInStock={toggleInStock}
  onToggleVerified={toggleVerified}
  onToggleFeatured={toggleFeatured}
  onResetFilters={resetFilters}
  activeFilterCount={activeFilterCount}
/>;
```

| Prop                 | Type                         | Description                                             |
| -------------------- | ---------------------------- | ------------------------------------------------------- |
| `isOpen`             | `boolean`                    | Controls drawer visibility                              |
| `onClose`            | `() => void`                 | Close handler                                           |
| `filters`            | `ProductFilters`             | Current filter state                                    |
| `filterOptions`      | `FilterOptions`              | Available filter values (categories, states, materials) |
| `priceRange`         | `{min, max}`                 | Price bounds from products                              |
| `onToggleCategory`   | `(cat: string) => void`      | Toggle category filter                                  |
| `onToggleState`      | `(state: string) => void`    | Toggle state filter                                     |
| `onToggleMaterial`   | `(material: string) => void` | Toggle material filter (multi-select)                   |
| `onUpdatePriceRange` | `(range) => void`            | Update price range                                      |
| `onUpdateMinRating`  | `(rating: number) => void`   | Set minimum rating                                      |
| `onToggleInStock`    | `() => void`                 | Toggle in-stock filter                                  |
| `onToggleVerified`   | `() => void`                 | Toggle verified sellers                                 |
| `onToggleFeatured`   | `() => void`                 | Toggle featured products                                |
| `onResetFilters`     | `() => void`                 | Clear all filters                                       |
| `activeFilterCount`  | `number`                     | Number of active filters                                |

**Features:**

- Categories, States, Materials sections with "show more" expansion
- Price range slider
- Rating filter (star-based)
- Boolean toggles (in stock, verified, featured)
- Filter state syncs to URL for shareable links

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

### ConversionFunnel (De Visita a Compra)

Visual funnel showing customer journey from visit to purchase. Title: "De Visita a Compra".

**Location:** `components/charts/ConversionFunnel.tsx`

```tsx
import ConversionFunnel from '@/components/charts/ConversionFunnel';
import { Eye, ShoppingCart, CreditCard, Package } from 'lucide-react';

<ConversionFunnel
  steps={[
    { label: 'Visitas', value: 1250, icon: <Eye className="w-full h-full" />, variant: 'blue' },
    {
      label: 'Al carrito',
      value: 180,
      icon: <ShoppingCart className="w-full h-full" />,
      variant: 'purple',
    },
    {
      label: 'Checkout',
      value: 85,
      icon: <CreditCard className="w-full h-full" />,
      variant: 'amber',
    },
    { label: 'Compras', value: 62, icon: <Package className="w-full h-full" />, variant: 'green' },
  ]}
  showPercentage={true}
  showConversionRate={true}
/>;
```

| Prop                 | Type                        | Default            | Description                            |
| -------------------- | --------------------------- | ------------------ | -------------------------------------- |
| `steps`              | `FunnelStep[]`              | -                  | Array of funnel steps                  |
| `showPercentage`     | `boolean`                   | `true`             | Show percentage relative to first step |
| `showConversionRate` | `boolean`                   | `false`            | Show conversion rate between steps     |
| `formatValue`        | `(value: number) => string` | `toLocaleString()` | Format function for values             |
| `className`          | `string`                    | `''`               | Additional CSS classes                 |

**FunnelStep Interface:**

```typescript
interface FunnelStep {
  label: string;
  value: number;
  icon?: React.ReactNode;
  variant?: 'gray' | 'blue' | 'purple' | 'green' | 'amber' | 'red';
}
```

**Features:**

- 4-step visual funnel with icons
- Percentage display relative to first step
- Optional conversion rates between steps
- Color-coded variants (gray, blue, purple, green, amber, red)
- Responsive grid layout (2 cols mobile, 4 cols desktop)
- Dark mode support

---

### ProductConversions

Per-product conversion metrics table.

```tsx
import ProductConversions from '@/components/dashboard/ProductConversions';

<ProductConversions
  products={[
    {
      productId: 'p1',
      productName: 'Cojín Tejido',
      views: 890,
      addToCart: 156,
      purchases: 45,
      viewToCartRate: 17.5,
      cartToPurchaseRate: 28.8,
    },
  ]}
/>;
```

| Prop       | Type                  | Description                      |
| ---------- | --------------------- | -------------------------------- |
| `products` | `ProductConversion[]` | Array of product conversion data |

**Features:**

- Desktop table view with sortable columns
- Mobile card layout for responsive design
- Color-coded conversion rates (green/yellow/red thresholds)
- Trend indicators comparing to average
- Average summary at bottom

---

### QuickEditModal

Inline modal for quick product editing from the dashboard.

```tsx
import QuickEditModal from '@/components/dashboard/QuickEditModal';

const [editingProduct, setEditingProduct] = useState<SellerProduct | null>(null);

const handleSave = async (productId: string, data: QuickEditData) => {
  // Update product in localStorage or API
  updateProductQuick(productId, data, user.email);
};

<QuickEditModal
  product={editingProduct}
  isOpen={editingProduct !== null}
  onClose={() => setEditingProduct(null)}
  onSave={handleSave}
/>;
```

| Prop      | Type                                                        | Description                      |
| --------- | ----------------------------------------------------------- | -------------------------------- |
| `product` | `SellerProduct \| null`                                     | Product to edit                  |
| `isOpen`  | `boolean`                                                   | Whether modal is visible         |
| `onClose` | `() => void`                                                | Callback when modal should close |
| `onSave`  | `(productId: string, data: QuickEditData) => Promise<void>` | Callback to save changes         |

**QuickEditData Interface:**

```typescript
interface QuickEditData {
  name: string;
  price: number;
  stock: number;
}
```

**Features:**

- Edit product name, price, and stock without leaving dashboard
- Form validation with error messages
- Disabled save button when no changes detected
- Loading state during save
- Keyboard navigation (Escape to close)
- Dark mode support
- Accessible with proper ARIA attributes

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

### ProgressStat

Progress bar with label and value display. Used for showing goal progress or metrics with targets.

```tsx
import ProgressStat from '@/components/charts/ProgressStat';

<ProgressStat
  label="Meta de ventas"
  value={7500}
  maxValue={10000}
  formatValue={(v) => `$${v.toLocaleString()}`}
  showPercentage={true}
  color="purple"
  size="md"
/>;
```

| Prop             | Type                        | Default            | Description                   |
| ---------------- | --------------------------- | ------------------ | ----------------------------- |
| `label`          | `string`                    | -                  | Stat label                    |
| `value`          | `number`                    | -                  | Current value                 |
| `maxValue`       | `number`                    | -                  | Maximum/target value          |
| `formatValue`    | `(value: number) => string` | `toLocaleString()` | Format function for values    |
| `showPercentage` | `boolean`                   | `true`             | Show percentage next to value |
| `color`          | `string`                    | `'purple'`         | Bar color variant             |
| `size`           | `'sm' \| 'md' \| 'lg'`      | `'md'`             | Bar height variant            |
| `className`      | `string`                    | `''`               | Additional CSS classes        |

**Color Variants:** `purple`, `blue`, `green`, `amber`, `red`, `pink`

**Size Variants:**

- `sm`: 6px height
- `md`: 8px height
- `lg`: 12px height

---

### MultiProgressStat

Multi-segment progress bar for showing multiple values in one bar.

```tsx
import { MultiProgressStat } from '@/components/charts/ProgressStat';

<MultiProgressStat
  label="Distribución de ventas"
  segments={[
    { value: 45, color: 'purple', label: 'Textiles' },
    { value: 30, color: 'blue', label: 'Cerámica' },
    { value: 25, color: 'green', label: 'Otros' },
  ]}
  total={100}
  showLegend={true}
  size="md"
/>;
```

| Prop         | Type                     | Default | Description            |
| ------------ | ------------------------ | ------- | ---------------------- |
| `label`      | `string`                 | -       | Stat label             |
| `segments`   | `MultiProgressSegment[]` | -       | Array of segments      |
| `total`      | `number`                 | -       | Total/max value        |
| `showLegend` | `boolean`                | `true`  | Show legend below bar  |
| `size`       | `'sm' \| 'md' \| 'lg'`   | `'md'`  | Bar height variant     |
| `className`  | `string`                 | `''`    | Additional CSS classes |

**MultiProgressSegment Interface:**

```typescript
interface MultiProgressSegment {
  value: number;
  color: 'purple' | 'blue' | 'green' | 'amber' | 'red' | 'pink' | 'gray';
  label?: string;
}
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
