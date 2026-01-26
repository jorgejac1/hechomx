# Papalote Market Documentation

> Technical documentation for the Papalote Market (Hecho en México) artisan marketplace.

## Quick Links

| Document                                   | Description                        |
| ------------------------------------------ | ---------------------------------- |
| [Architecture](./architecture/OVERVIEW.md) | System architecture and tech stack |
| [User Flows](./FLOWS.md)                   | Key user journeys with diagrams    |
| [Data Models](./DATA-MODELS.md)            | TypeScript interfaces and schemas  |
| [Components](./COMPONENTS.md)              | Component library reference        |

## Features Documentation

| Feature                                                          | Description                                 |
| ---------------------------------------------------------------- | ------------------------------------------- |
| [Authentication](./features/authentication.md)                   | Auth system and user roles                  |
| [Cart & Checkout](./features/cart-checkout.md)                   | Shopping cart and checkout flow             |
| [Seller Dashboard](./features/seller-dashboard.md)               | Seller tools and analytics                  |
| [Verification](./features/verification.md)                       | 4-tier seller verification system           |
| [Search & Recommendations](./features/search-recommendations.md) | Fuzzy search, autocomplete, recommendations |

## Guides

| Guide                                            | Description                                |
| ------------------------------------------------ | ------------------------------------------ |
| [Contributing](./guides/CONTRIBUTING.md)         | How to contribute to the project           |
| [Folder Structure](./guides/FOLDER-STRUCTURE.md) | Project organization                       |
| [API Routes](./guides/API-ROUTES.md)             | API endpoint reference                     |
| [Testing](./guides/TESTING.md)                   | Testing strategies and patterns            |
| [Accessibility](./guides/ACCESSIBILITY.md)       | WCAG 2.1 AA compliance guide               |
| [Performance](./guides/PERFORMANCE.md)           | Optimization, caching, and bundle analysis |
| [SEO](./guides/SEO.md)                           | Search engine optimization                 |
| [App Deployment](./guides/DEPLOYMENT-APP.md)     | Production deployment                      |
| [Docs Deployment](./guides/DEPLOYMENT.md)        | Documentation deployment                   |

## Interactive Documentation

| Tool          | Command             | Description                                      |
| ------------- | ------------------- | ------------------------------------------------ |
| **Storybook** | `npm run storybook` | Interactive component explorer at localhost:6006 |
| **TypeDoc**   | `npm run docs`      | Generate API documentation in docs/api/          |
| **Build All** | `npm run docs:all`  | Build both Storybook and TypeDoc                 |

### Storybook

Component library with live examples:

```bash
npm run storybook        # Start Storybook dev server
npm run build-storybook  # Build static Storybook to storybook-static/
```

Available story categories:

| Category         | Components                                                                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Buttons**      | Button, LoadingButton                                                                                                                 |
| **Data Display** | Avatar, Badge, Card, DataList, Table, Timeline, VerificationBadge, VirtualList, VirtualTable                                          |
| **Feedback**     | Alert, EmptyState, FeedbackWidget, Progress                                                                                           |
| **Inputs**       | Autocomplete, Checkbox, DatePicker, FileUpload, Radio, RadioGroup, RangeSlider, Select, StarRating, Textarea, TextInput, ToggleSwitch |
| **Layout**       | Accordion, Divider, LazyLoad                                                                                                          |
| **Navigation**   | Breadcrumbs, Pagination, ScrollToTop, Stepper, Tabs                                                                                   |
| **Overlays**     | ConfirmActionModal, Drawer, Dropdown, Modal, Popover, ShareModal, Tooltip                                                             |
| **Product**      | ProductCard, SizeSelector                                                                                                             |
| **Utilities**    | ThemeToggle                                                                                                                           |

### TypeDoc

Auto-generated API documentation:

```bash
npm run docs        # Generate docs to docs/api/
npm run docs:watch  # Watch mode for development
```

---

## Tech Stack Overview

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **Validation:** Zod schemas
- **Icons:** Lucide React
- **State:** React Context + localStorage
- **Hosting:** Vercel

## Performance Tools

| Script                | Command                | Description                                 |
| --------------------- | ---------------------- | ------------------------------------------- |
| **Bundle Analyzer**   | `npm run analyze`      | Visual bundle treemap (opens in browser)    |
| **Bundle Check**      | `npm run bundle:check` | Check bundle sizes against budgets          |
| **Performance Audit** | `npm run perf:audit`   | Run performance audit with score (0-100)    |
| **Size Check**        | `npm run size`         | Build and check bundle sizes in one command |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Check performance
npm run size
```

---

_Last updated: January 26, 2026_
