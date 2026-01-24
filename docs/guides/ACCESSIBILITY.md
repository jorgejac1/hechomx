# Accessibility Guide

> WCAG 2.1 AA compliance guidelines and patterns for Papalote Market.

## Table of Contents

1. [Overview](#overview)
2. [WCAG 2.1 Guidelines](#wcag-21-guidelines)
3. [Keyboard Navigation](#keyboard-navigation)
4. [Screen Reader Support](#screen-reader-support)
5. [Color & Contrast](#color--contrast)
6. [Focus Management](#focus-management)
7. [Forms & Validation](#forms--validation)
8. [Component Patterns](#component-patterns)
9. [Testing Accessibility](#testing-accessibility)
10. [Common Issues & Fixes](#common-issues--fixes)

---

## Overview

Papalote Market is committed to WCAG 2.1 Level AA compliance, ensuring the platform is accessible to users with disabilities including:

- Visual impairments (blindness, low vision, color blindness)
- Motor impairments (limited mobility, tremors)
- Cognitive impairments (learning disabilities, attention disorders)
- Hearing impairments (deafness, hard of hearing)

---

## WCAG 2.1 Guidelines

### Four Principles (POUR)

| Principle          | Description                              | Examples                     |
| ------------------ | ---------------------------------------- | ---------------------------- |
| **Perceivable**    | Information must be presentable to users | Alt text, captions, contrast |
| **Operable**       | Interface must be navigable              | Keyboard access, skip links  |
| **Understandable** | Content must be comprehensible           | Clear labels, error messages |
| **Robust**         | Content works with assistive tech        | Semantic HTML, ARIA          |

### Level AA Requirements

| Criterion | Requirement                     | Our Implementation                 |
| --------- | ------------------------------- | ---------------------------------- |
| 1.1.1     | Non-text content has alt text   | All images have descriptive alt    |
| 1.3.1     | Info and relationships conveyed | Semantic HTML structure            |
| 1.4.3     | Contrast ratio 4.5:1            | Custom color palette tested        |
| 2.1.1     | Keyboard accessible             | All interactive elements focusable |
| 2.4.4     | Link purpose clear              | Descriptive link text              |
| 3.3.1     | Error identification            | Form validation messages           |
| 4.1.2     | Name, role, value               | ARIA attributes on components      |

---

## Keyboard Navigation

### Tab Order

All interactive elements must be reachable via Tab key in logical order:

```tsx
// Good: Natural tab order with semantic HTML
<nav>
  <a href="/">Inicio</a>
  <a href="/productos">Productos</a>
  <button onClick={openMenu}>Menú</button>
</nav>

// Bad: Custom tab order that breaks flow
<div tabIndex={3}>Third</div>
<div tabIndex={1}>First</div>
<div tabIndex={2}>Second</div>
```

### Skip Links

Allow keyboard users to skip navigation:

```tsx
// components/common/SkipLink.tsx
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4
                 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:rounded"
    >
      Saltar al contenido principal
    </a>
  );
}

// In layout
<body>
  <SkipLink />
  <Header />
  <main id="main-content" tabIndex={-1}>
    {children}
  </main>
</body>;
```

### Keyboard Shortcuts

Document keyboard interactions for custom components:

| Component | Key                | Action           |
| --------- | ------------------ | ---------------- |
| Modal     | `Escape`           | Close modal      |
| Dropdown  | `Enter/Space`      | Open dropdown    |
| Dropdown  | `Arrow Up/Down`    | Navigate options |
| Dropdown  | `Escape`           | Close dropdown   |
| Tabs      | `Arrow Left/Right` | Switch tabs      |
| Accordion | `Enter/Space`      | Toggle section   |
| Carousel  | `Arrow Left/Right` | Navigate slides  |

### Implementation Example

```tsx
// components/common/Dropdown.tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  switch (e.key) {
    case 'Escape':
      setIsOpen(false);
      triggerRef.current?.focus();
      break;
    case 'ArrowDown':
      e.preventDefault();
      focusNextItem();
      break;
    case 'ArrowUp':
      e.preventDefault();
      focusPreviousItem();
      break;
    case 'Home':
      e.preventDefault();
      focusFirstItem();
      break;
    case 'End':
      e.preventDefault();
      focusLastItem();
      break;
  }
};
```

---

## Screen Reader Support

### Semantic HTML

Use correct HTML elements for their intended purpose:

```tsx
// Good: Semantic structure
<article>
  <header>
    <h1>Alebrije de Madera</h1>
    <p>Por María García, Oaxaca</p>
  </header>
  <section aria-label="Descripción del producto">
    <p>Hermosa figura tallada a mano...</p>
  </section>
  <footer>
    <button>Agregar al carrito</button>
  </footer>
</article>

// Bad: Div soup
<div className="product">
  <div className="product-title">Alebrije de Madera</div>
  <div className="product-desc">Hermosa figura...</div>
  <div className="product-button" onClick={addToCart}>Agregar</div>
</div>
```

### ARIA Labels

Provide context for screen readers:

```tsx
// Icon-only buttons need labels
<button aria-label="Cerrar modal">
  <X className="h-5 w-5" />
</button>

// Descriptive labels for complex widgets
<div role="tablist" aria-label="Información del producto">
  <button role="tab" aria-selected={activeTab === 0}>
    Descripción
  </button>
  <button role="tab" aria-selected={activeTab === 1}>
    Especificaciones
  </button>
</div>

// Live regions for dynamic content
<div aria-live="polite" aria-atomic="true">
  {cartItemCount} productos en el carrito
</div>
```

### Announcing Changes

Use live regions for dynamic updates:

```tsx
// Toast notifications
<div
  role="alert"
  aria-live="assertive"
  className="toast"
>
  Producto agregado al carrito
</div>

// Loading states
<div aria-live="polite">
  {isLoading ? 'Cargando productos...' : `${products.length} productos encontrados`}
</div>

// Form validation
<span id="email-error" role="alert">
  Por favor ingresa un email válido
</span>
<input aria-describedby="email-error" aria-invalid="true" />
```

### Hidden Content

Hide decorative or redundant content from screen readers:

```tsx
// Decorative images
<img src="/decoration.svg" alt="" aria-hidden="true" />

// Redundant icons
<button>
  <Heart className="h-5 w-5" aria-hidden="true" />
  <span>Agregar a favoritos</span>
</button>

// Visually hidden but announced
<span className="sr-only">
  (Abre en nueva ventana)
</span>
```

---

## Color & Contrast

### Minimum Contrast Ratios

| Text Size                        | Ratio Required | Our Colors |
| -------------------------------- | -------------- | ---------- |
| Normal text (< 18px)             | 4.5:1          | ✅ 7.2:1   |
| Large text (≥ 18px bold or 24px) | 3:1            | ✅ 4.8:1   |
| UI components                    | 3:1            | ✅ 3.5:1   |

### Color Palette Accessibility

```css
/* Primary colors with sufficient contrast */
--color-primary-600: #d9534f; /* On white: 4.6:1 */
--color-primary-700: #b94440; /* On white: 5.8:1 */

/* Text colors */
--color-gray-900: #111827; /* On white: 16:1 */
--color-gray-700: #374151; /* On white: 9.5:1 */
--color-gray-500: #6b7280; /* On white: 4.6:1 - use only for large text */

/* Error states */
--color-red-600: #dc2626; /* On white: 4.8:1 */
```

### Don't Rely on Color Alone

Always provide additional indicators:

```tsx
// Good: Color + icon + text
<div className="text-red-600 flex items-center gap-2">
  <AlertCircle className="h-4 w-4" />
  <span>Error: Campo requerido</span>
</div>

// Good: Color + pattern for charts
<div className="bg-primary-500" style={{ backgroundImage: 'url(pattern.svg)' }}>
  Ventas Q1
</div>

// Bad: Color only
<span className="text-red-600">*</span> {/* Not accessible */}
```

### Dark Mode Considerations

```tsx
// Ensure contrast in both modes
<p className="text-gray-900 dark:text-gray-100">
  Este texto es legible en ambos modos
</p>

// Test focus states in dark mode
<button className="
  focus:ring-2
  focus:ring-primary-500
  dark:focus:ring-primary-400
">
  Acción
</button>
```

---

## Focus Management

### Visible Focus Indicators

Never remove focus outlines without alternatives:

```css
/* Global focus styles */
:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: 2px;
}

/* Button focus */
.button:focus-visible {
  ring: 2px;
  ring-color: var(--color-primary-500);
  ring-offset: 2px;
}
```

### Focus Trap in Modals

Keep focus within modal dialogs:

```tsx
// hooks/common/useFocusTrap.ts
export function useFocusTrap(ref: RefObject<HTMLElement>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const focusableElements = ref.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [ref, isActive]);
}
```

### Restoring Focus

Return focus to trigger element when closing dialogs:

```tsx
function Modal({ isOpen, onClose, trigger }) {
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      previousFocus.current = document.activeElement as HTMLElement;
    } else {
      previousFocus.current?.focus();
    }
  }, [isOpen]);

  // ...
}
```

---

## Forms & Validation

### Label Association

Always associate labels with inputs:

```tsx
// Good: Using htmlFor
<label htmlFor="email">Correo electrónico</label>
<input id="email" type="email" />

// Good: Wrapping label
<label>
  Correo electrónico
  <input type="email" />
</label>

// Good: aria-label for icon inputs
<input
  type="search"
  aria-label="Buscar productos"
  placeholder="Buscar..."
/>
```

### Error Messages

Connect errors to inputs with aria-describedby:

```tsx
<div>
  <label htmlFor="phone">Teléfono</label>
  <input
    id="phone"
    type="tel"
    aria-invalid={!!error}
    aria-describedby={error ? 'phone-error' : undefined}
  />
  {error && (
    <p id="phone-error" role="alert" className="text-red-600">
      {error}
    </p>
  )}
</div>
```

### Required Fields

Indicate required fields clearly:

```tsx
<label htmlFor="name">
  Nombre completo
  <span className="text-red-600" aria-hidden="true">*</span>
  <span className="sr-only">(requerido)</span>
</label>
<input id="name" required aria-required="true" />
```

### Form Instructions

Provide clear instructions:

```tsx
<form aria-describedby="form-instructions">
  <p id="form-instructions" className="text-gray-600 mb-4">
    Los campos marcados con * son obligatorios. El teléfono debe tener 10 dígitos.
  </p>
  {/* form fields */}
</form>
```

---

## Component Patterns

### Accessible Button

```tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  loadingText?: string;
}

export function Button({
  children,
  isLoading,
  loadingText = 'Cargando...',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || isLoading}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner className="animate-spin" aria-hidden="true" />
          <span className="sr-only">{loadingText}</span>
          <span aria-hidden="true">{loadingText}</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
```

### Accessible Modal

```tsx
export function Modal({ isOpen, onClose, title, children }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <h2 id="modal-title">{title}</h2>
      <div id="modal-description">{children}</div>
      <button onClick={onClose} aria-label="Cerrar modal">
        <X aria-hidden="true" />
      </button>
    </div>
  );
}
```

### Accessible Tabs

```tsx
export function Tabs({ tabs, activeTab, onChange }) {
  return (
    <div>
      <div role="tablist" aria-label="Secciones del producto">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            role="tab"
            id={`tab-${tab.id}`}
            aria-selected={activeTab === index}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === index ? 0 : -1}
            onClick={() => onChange(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`panel-${tab.id}`}
          aria-labelledby={`tab-${tab.id}`}
          hidden={activeTab !== index}
          tabIndex={0}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
```

---

## Testing Accessibility

### Automated Testing

```bash
# Install axe-core
npm install --save-dev @axe-core/react

# Run in tests
npm test -- --grep "accessibility"
```

```tsx
// In component tests
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

it('has no accessibility violations', async () => {
  const { container } = render(<Component />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

### Manual Testing Checklist

- [ ] **Keyboard only**: Navigate entire flow without mouse
- [ ] **Screen reader**: Test with VoiceOver (Mac) or NVDA (Windows)
- [ ] **Zoom**: Content readable at 200% zoom
- [ ] **Color contrast**: Use browser dev tools checker
- [ ] **Reduced motion**: Test with `prefers-reduced-motion`
- [ ] **Focus visible**: All interactive elements have focus indicator

### Browser Tools

| Tool                          | Purpose                       |
| ----------------------------- | ----------------------------- |
| Chrome DevTools Accessibility | Inspect ARIA tree             |
| axe DevTools                  | Automated violation detection |
| WAVE                          | Visual accessibility feedback |
| Lighthouse                    | Accessibility score           |

### Screen Reader Testing

```bash
# macOS VoiceOver
# Enable: Cmd + F5
# Navigate: VO + Arrow keys (VO = Ctrl + Option)

# Windows NVDA (free)
# Download from nvaccess.org
# Navigate: Arrow keys, Tab
```

---

## Common Issues & Fixes

### Missing Alt Text

```tsx
// Bad
<img src="/product.jpg" />

// Good
<img src="/product.jpg" alt="Alebrije de madera pintado a mano en colores brillantes" />

// Decorative
<img src="/decoration.svg" alt="" role="presentation" />
```

### Non-Focusable Interactive Elements

```tsx
// Bad
<div onClick={handleClick}>Click me</div>

// Good
<button onClick={handleClick}>Click me</button>

// If div is required
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  Click me
</div>
```

### Missing Form Labels

```tsx
// Bad
<input placeholder="Email" />

// Good
<label>
  Email
  <input type="email" />
</label>

// Or with aria-label
<input type="email" aria-label="Email" placeholder="Email" />
```

### Low Contrast Text

```tsx
// Bad: 2.5:1 contrast ratio
<p className="text-gray-400">Light text on white</p>

// Good: 4.5:1+ contrast ratio
<p className="text-gray-600">Readable text on white</p>
```

### Motion Sensitivity

```tsx
// Respect user preferences
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

// In CSS
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [Inclusive Components](https://inclusive-components.design/)

---

_See also: [Components](../COMPONENTS.md) | [Contributing](./CONTRIBUTING.md)_
