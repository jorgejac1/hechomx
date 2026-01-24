# Contributing Guide

> Guidelines for contributing to Papalote Market.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Standards](#code-standards)
4. [Component Guidelines](#component-guidelines)
5. [Testing](#testing)
6. [Pull Request Process](#pull-request-process)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Git

### Setup

```bash
# Clone the repository
git clone https://github.com/your-org/papalote-market.git
cd papalote-market

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment

Create a `.env.local` file (not committed to git):

```env
# Future Supabase integration
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

---

## Development Workflow

### Branch Naming

```
feature/description    # New features
fix/description        # Bug fixes
refactor/description   # Code refactoring
docs/description       # Documentation
```

### Commit Messages

Follow conventional commits:

```
feat: add size selector to product page
fix: resolve cart quantity update issue
refactor: extract gallery hooks
docs: update component API reference
chore: update dependencies
```

### Development Commands

```bash
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript checking
```

---

## Code Standards

### TypeScript

- **Strict mode** enabled - no `any` types
- Define interfaces in `types/` or `lib/types/`
- Use proper generics for reusable hooks

```typescript
// Good
interface ProductCardProps {
  product: Product;
  showActions?: boolean;
}

// Avoid
interface ProductCardProps {
  product: any;
  showActions?: boolean;
}
```

### Imports

Use path aliases:

```typescript
// Good
import { Button } from '@/components/common';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types/product';

// Avoid
import { Button } from '../../../components/common';
```

### File Naming

| Type       | Convention                  | Example                |
| ---------- | --------------------------- | ---------------------- |
| Components | PascalCase                  | `ProductCard.tsx`      |
| Hooks      | camelCase with `use` prefix | `useProductGallery.ts` |
| Utilities  | camelCase                   | `formatPrice.ts`       |
| Types      | PascalCase                  | `Product.ts`           |
| Constants  | UPPER_SNAKE_CASE            | `ROUTES.ts`            |

---

## Component Guidelines

### Structure

```tsx
'use client'; // Only if needed

import { useState } from 'react';
import { SomeIcon } from 'lucide-react';
import { Button } from '@/components/common';
import type { Product } from '@/types/product';

interface ComponentProps {
  // Props with JSDoc comments
  /** The product to display */
  product: Product;
  /** Called when user clicks buy */
  onBuy?: (id: string) => void;
}

/**
 * Brief description of component purpose.
 */
export default function Component({ product, onBuy }: ComponentProps) {
  // 1. Hooks first
  const [loading, setLoading] = useState(false);

  // 2. Derived state
  const isAvailable = product.inStock && product.stock > 0;

  // 3. Event handlers
  const handleBuy = () => {
    onBuy?.(product.id);
  };

  // 4. Render
  return <div className="...">{/* JSX */}</div>;
}
```

### Size Limits

- **Components**: Max 300 lines
- If larger, extract logic to custom hooks or sub-components

### Styling

- **Tailwind CSS only** - no custom CSS files
- Mobile-first responsive design
- Use design system colors

```tsx
// Good - Tailwind classes
<div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">

// Avoid - inline styles
<div style={{ padding: '16px', backgroundColor: 'white' }}>
```

### Dark Mode

Support dark mode with Tailwind's `dark:` prefix:

```tsx
<div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
```

### Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus visible states

```tsx
<button
  aria-label="Agregar al carrito"
  className="focus:ring-2 focus:ring-primary-500 focus:outline-none"
  onClick={handleAdd}
>
  <ShoppingCart className="w-5 h-5" />
</button>
```

---

## Patterns to Follow

### Protected Pages

Use `AuthPageWrapper` for authentication:

```tsx
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';

export default function ProtectedPage() {
  return (
    <AuthPageWrapper requireSeller={false}>
      {(user) => (
        <div>
          <h1>Bienvenido, {user.name}</h1>
        </div>
      )}
    </AuthPageWrapper>
  );
}
```

### Form Validation

Use Zod schemas:

```tsx
import { z } from 'zod';
import { validate } from '@/validators/utils';

const formSchema = z.object({
  email: z.string().email('Correo inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres'),
});

// In component
const result = validate(formSchema, formData);
if (!result.success) {
  setErrors(result.errors);
  return;
}
```

### Service Layer

Use services for data operations (enables DB migration):

```tsx
// services/productService.ts
export const productService = {
  getAll: () => {
    // Currently localStorage, future Supabase
    return JSON.parse(localStorage.getItem('products') || '[]');
  },

  save: (product: Product) => {
    const products = productService.getAll();
    products.push(product);
    localStorage.setItem('products', JSON.stringify(products));
  },
};
```

### Toast Notifications

Use toast context instead of browser alerts:

```tsx
import { useToast } from '@/contexts/ToastContext';

function Component() {
  const { showToast } = useToast();

  const handleSave = () => {
    // ... save logic
    showToast({
      type: 'success',
      message: 'Producto guardado exitosamente',
    });
  };
}
```

---

## Testing

### Running Tests

```bash
npm run test           # Run all tests
npm run test:watch     # Watch mode
npm run test:coverage  # Coverage report
```

### Test File Location

Place tests next to the files they test:

```
components/
  product/
    ProductCard.tsx
    ProductCard.test.tsx
    __tests__/
      ProductCard.integration.test.tsx
```

### Testing Patterns

```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  const mockProduct = {
    id: '1',
    name: 'Test Product',
    price: 100,
    // ... other required fields
  };

  it('renders product name', () => {
    render(<ProductCard product={mockProduct} />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
  });

  it('calls onAddToCart when button clicked', () => {
    const mockAdd = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAdd} />);

    fireEvent.click(screen.getByRole('button', { name: /agregar/i }));
    expect(mockAdd).toHaveBeenCalledWith(mockProduct.id);
  });
});
```

---

## Pull Request Process

### Before Submitting

1. **Run linting**: `npm run lint`
2. **Run type check**: `npm run type-check`
3. **Run tests**: `npm run test`
4. **Test manually** on mobile and desktop
5. **Check dark mode** compatibility

### PR Template

```markdown
## Description

Brief description of changes.

## Type of Change

- [ ] Bug fix
- [ ] New feature
- [ ] Refactoring
- [ ] Documentation

## Testing

How was this tested?

## Screenshots

If UI changes, include before/after screenshots.

## Checklist

- [ ] Code follows project style guidelines
- [ ] Self-reviewed my code
- [ ] Added JSDoc comments for new functions
- [ ] Updated documentation if needed
- [ ] No new TypeScript errors
- [ ] Mobile responsive
- [ ] Dark mode compatible
```

### Review Process

1. Create PR against `main` branch
2. Request review from maintainer
3. Address feedback
4. Squash and merge when approved

---

## Language Guidelines

### UI Text

All user-facing text should be in **Spanish**:

```tsx
// Good
<Button>Agregar al carrito</Button>
<span>Producto guardado</span>

// Avoid
<Button>Add to cart</Button>
```

### Code & Comments

Code, comments, and documentation in **English**:

```tsx
// Good
// Calculate total with shipping
const calculateTotal = (items: CartItem[]) => {
  // ...
};

// Avoid
// Calcular el total con envío
const calcularTotal = (items: CartItem[]) => {
  // ...
};
```

---

## Getting Help

- Check existing documentation in `docs/`
- Review similar implementations in codebase
- Open an issue for questions

---

_See also: [Folder Structure](./FOLDER-STRUCTURE.md) | [Architecture](../architecture/OVERVIEW.md)_
