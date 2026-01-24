# Testing Guide

> Comprehensive testing strategies and patterns for Papalote Market.

## Table of Contents

1. [Overview](#overview)
2. [Test Stack](#test-stack)
3. [Running Tests](#running-tests)
4. [Test Organization](#test-organization)
5. [Testing Patterns](#testing-patterns)
6. [Component Testing](#component-testing)
7. [Hook Testing](#hook-testing)
8. [Validator Testing](#validator-testing)
9. [Integration Testing](#integration-testing)
10. [Mocking Strategies](#mocking-strategies)
11. [Coverage Goals](#coverage-goals)
12. [Best Practices](#best-practices)

---

## Overview

Papalote Market uses a comprehensive testing strategy with **~1,400+ tests** covering:

- **Validators** - Zod schema validation (critical for data integrity)
- **Utilities** - Business logic functions
- **Hooks** - React hooks with state management
- **Components** - UI components with interactions
- **Contexts** - React context providers
- **Integration** - Multi-component flows

---

## Test Stack

| Tool                            | Purpose                                |
| ------------------------------- | -------------------------------------- |
| **Vitest**                      | Test runner (fast, native ESM support) |
| **React Testing Library**       | Component testing                      |
| **@testing-library/user-event** | User interaction simulation            |
| **jsdom**                       | Browser environment simulation         |
| **v8**                          | Code coverage provider                 |

### Configuration

**`vitest.config.ts`**:

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    exclude: ['node_modules', '.next'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

**`vitest.setup.ts`**:

```typescript
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock as unknown as Storage;
```

---

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm run test:coverage

# Run specific file
npm test -- validators/__tests__/checkout.test.ts

# Run tests matching pattern
npm test -- --grep "validates email"

# Run with UI
npm run test:ui
```

### npm Scripts

```json
{
  "test": "vitest run",
  "test:watch": "vitest",
  "test:coverage": "vitest run --coverage",
  "test:ui": "vitest --ui"
}
```

---

## Test Organization

```
project/
├── __tests__/
│   └── integration/           # Cross-component integration tests
│       ├── auth-flow.test.tsx
│       ├── cart-flow.test.tsx
│       └── comparison-flow.test.tsx
│
├── components/
│   └── common/
│       └── __tests__/         # Component tests alongside components
│           ├── Button.test.tsx
│           ├── Modal.test.tsx
│           └── ...
│
├── contexts/
│   └── __tests__/             # Context provider tests
│       ├── AuthContext.test.tsx
│       ├── CartContext.test.tsx
│       └── ToastContext.test.tsx
│
├── hooks/
│   └── product/
│       └── __tests__/         # Hook tests
│           └── useProductComparison.test.ts
│
├── lib/
│   ├── utils/
│   │   └── __tests__/         # Utility function tests
│   │       ├── currency.test.ts
│   │       ├── date.test.ts
│   │       └── ...
│   └── constants/
│       └── __tests__/         # Constants tests
│           └── routes.test.ts
│
└── validators/
    └── __tests__/             # Zod schema tests
        ├── checkout.test.ts
        ├── product.test.ts
        └── user.test.ts
```

---

## Testing Patterns

### 1. AAA Pattern (Arrange, Act, Assert)

```typescript
describe('formatCurrency', () => {
  it('formats amount as MXN currency', () => {
    // Arrange
    const amount = 1234.56;

    // Act
    const result = formatCurrency(amount);

    // Assert
    expect(result).toBe('$1,234.56');
  });
});
```

### 2. Describe/It Structure

```typescript
describe('Button', () => {
  describe('variants', () => {
    it('renders primary variant', () => { ... });
    it('renders secondary variant', () => { ... });
    it('renders ghost variant', () => { ... });
  });

  describe('sizes', () => {
    it('renders small size', () => { ... });
    it('renders medium size', () => { ... });
    it('renders large size', () => { ... });
  });

  describe('interactions', () => {
    it('calls onClick when clicked', () => { ... });
    it('does not call onClick when disabled', () => { ... });
  });
});
```

### 3. Test Data Factories

```typescript
// test-utils/factories.ts
export const createProduct = (overrides = {}) => ({
  id: 'prod-001',
  name: 'Test Product',
  price: 1000,
  category: 'textiles',
  ...overrides,
});

export const createUser = (overrides = {}) => ({
  id: 'user-001',
  email: 'test@example.com',
  role: 'buyer',
  ...overrides,
});
```

---

## Component Testing

### Basic Component Test

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from '../Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
```

### Component with Context

```typescript
import { render, screen } from '@testing-library/react';
import { CartProvider } from '@/contexts/CartContext';
import CartSummary from '../CartSummary';

const renderWithCart = (ui: React.ReactElement) => {
  return render(
    <CartProvider>
      {ui}
    </CartProvider>
  );
};

describe('CartSummary', () => {
  it('shows empty cart message when no items', () => {
    renderWithCart(<CartSummary />);
    expect(screen.getByText(/carrito vacío/i)).toBeInTheDocument();
  });
});
```

### Form Component Testing

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from '../TextInput';

describe('TextInput', () => {
  it('shows error state with error message', () => {
    render(<TextInput error="Este campo es requerido" />);

    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Este campo es requerido')).toBeInTheDocument();
  });

  it('calls onChange with new value', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<TextInput onChange={onChange} />);
    await user.type(screen.getByRole('textbox'), 'hello');

    expect(onChange).toHaveBeenCalled();
  });
});
```

---

## Hook Testing

### Basic Hook Test

```typescript
import { renderHook, act } from '@testing-library/react';
import useLocalStorage from '../useLocalStorage';

describe('useLocalStorage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('returns initial value when no stored value', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));

    expect(result.current[0]).toBe('initial');
  });

  it('updates value and persists to localStorage', () => {
    const { result } = renderHook(() => useLocalStorage('key', 'initial'));

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorage.setItem).toHaveBeenCalledWith('key', JSON.stringify('updated'));
  });
});
```

### Hook with Dependencies

```typescript
import { renderHook, waitFor } from '@testing-library/react';
import useDebounce from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('debounces value changes', async () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 500), {
      initialProps: { value: 'initial' },
    });

    expect(result.current).toBe('initial');

    rerender({ value: 'updated' });
    expect(result.current).toBe('initial'); // Still old value

    vi.advanceTimersByTime(500);
    expect(result.current).toBe('updated'); // Now updated
  });
});
```

---

## Validator Testing

### Zod Schema Tests

```typescript
import { checkoutSchema } from '../checkout';

describe('checkoutSchema', () => {
  const validData = {
    firstName: 'María',
    lastName: 'García',
    email: 'maria@ejemplo.com',
    phone: '5512345678',
    address: 'Calle Principal 123',
    city: 'Ciudad de México',
    state: 'CDMX',
    postalCode: '06600',
  };

  describe('valid inputs', () => {
    it('accepts valid checkout data', () => {
      const result = checkoutSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });
  });

  describe('email validation', () => {
    it('rejects invalid email format', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        email: 'invalid-email',
      });

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].path).toContain('email');
      }
    });
  });

  describe('phone validation', () => {
    it('rejects non-Mexican phone format', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        phone: '123', // Too short
      });

      expect(result.success).toBe(false);
    });

    it('accepts 10-digit Mexican phone', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        phone: '5512345678',
      });

      expect(result.success).toBe(true);
    });
  });

  describe('cross-field validation', () => {
    it('requires gift message when gift wrap is selected', () => {
      const result = checkoutSchema.safeParse({
        ...validData,
        giftWrap: true,
        giftMessage: '', // Empty message
      });

      expect(result.success).toBe(false);
    });
  });
});
```

---

## Integration Testing

### Multi-Component Flow

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider } from '@/contexts/AuthContext';
import { CartProvider } from '@/contexts/CartContext';
import { ToastProvider } from '@/contexts/ToastContext';
import CartPage from '@/app/carrito/page';

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>
    <CartProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </CartProvider>
  </AuthProvider>
);

describe('Cart Flow', () => {
  it('allows user to update quantity and see total change', async () => {
    const user = userEvent.setup();

    render(<CartPage />, { wrapper: AllProviders });

    // Find quantity input
    const quantityInput = screen.getByRole('spinbutton');

    // Clear and type new quantity
    await user.clear(quantityInput);
    await user.type(quantityInput, '3');

    // Verify total updated
    await waitFor(() => {
      expect(screen.getByText(/\$7,500/)).toBeInTheDocument();
    });
  });
});
```

---

## Mocking Strategies

### Mocking Next.js Router

```typescript
import { vi } from 'vitest';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
    prefetch: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/productos',
}));
```

### Mocking localStorage

```typescript
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
```

### Mocking API Calls

```typescript
import { vi } from 'vitest';

// Mock fetch
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ success: true, data: [] }),
  })
) as unknown as typeof fetch;

// In test
beforeEach(() => {
  vi.mocked(fetch).mockClear();
});

it('fetches products', async () => {
  vi.mocked(fetch).mockResolvedValueOnce({
    ok: true,
    json: () =>
      Promise.resolve({
        success: true,
        data: [{ id: '1', name: 'Product' }],
      }),
  } as Response);

  // ... test code
});
```

### Mocking Intersection Observer

```typescript
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;
```

---

## Coverage Goals

| Category    | Target   | Current  |
| ----------- | -------- | -------- |
| Validators  | 95%+     | ~95%     |
| Utilities   | 90%+     | ~90%     |
| Hooks       | 85%+     | ~85%     |
| Components  | 80%+     | ~80%     |
| Contexts    | 90%+     | ~90%     |
| **Overall** | **85%+** | **~85%** |

### Generate Coverage Report

```bash
npm run test:coverage
```

Output locations:

- `coverage/` - HTML report (open `coverage/index.html`)
- Terminal - Text summary

---

## Best Practices

### DO ✅

```typescript
// Use semantic queries
screen.getByRole('button', { name: 'Submit' });
screen.getByLabelText('Email');

// Test behavior, not implementation
expect(screen.getByText('Success!')).toBeInTheDocument();

// Use userEvent for interactions
await userEvent.click(button);
await userEvent.type(input, 'text');

// Clean up between tests
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

// Group related tests
describe('when user is authenticated', () => {
  beforeEach(() => { /* setup auth state */ });
  it('shows dashboard', () => { ... });
  it('shows logout button', () => { ... });
});
```

### DON'T ❌

```typescript
// Don't use implementation details
container.querySelector('.button-class'); // Bad

// Don't test third-party libraries
expect(zodSchema).toBeDefined(); // Testing Zod itself

// Don't write tests that always pass
expect(true).toBe(true);

// Don't use arbitrary waits
await new Promise(r => setTimeout(r, 1000)); // Bad
await waitFor(() => { ... }); // Good

// Don't test internal state
expect(component.state.count).toBe(1); // Bad
expect(screen.getByText('Count: 1')).toBeInTheDocument(); // Good
```

---

## Debugging Tests

### Interactive Mode

```bash
npm run test:ui
```

### Debug Output

```typescript
import { screen } from '@testing-library/react';

// Print current DOM
screen.debug();

// Print specific element
screen.debug(screen.getByRole('button'));

// Log all queries
import { logRoles } from '@testing-library/dom';
logRoles(container);
```

### VS Code Integration

Add to `.vscode/launch.json`:

```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug Vitest",
  "program": "${workspaceFolder}/node_modules/vitest/vitest.mjs",
  "args": ["run", "${relativeFile}"],
  "console": "integratedTerminal"
}
```

---

_See also: [Contributing](./CONTRIBUTING.md) | [Components](../COMPONENTS.md)_
