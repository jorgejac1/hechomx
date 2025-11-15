# Papalote Market - E-commerce Platform

A modern e-commerce platform dedicated to promoting authentic Mexican-made products and supporting local artisans across all 32 states of Mexico.

## Features

- 🇲🇽 **100% Mexican Products** - Verified authentic products made in Mexico
- 🎨 **Multiple Categories** - From traditional crafts to contemporary designs
- 🗺️ **All States Represented** - Products from all regions of Mexico
- ✅ **Verified Sellers** - Badge system for authenticated artisans
- 📱 **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- 🎯 **Smart Filtering** - Filter by category, state, and search functionality

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Data Storage**: Local JSON files (can be migrated to database)
- **Images**: Next.js Image optimization

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Navigate to the project directory:

```bash
cd hecho-en-mexico
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open your browser and visit:

```
http://localhost:3000
```

## Project Structure

```
hecho-en-mexico/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   └── products/        # Products API endpoint
│   ├── productos/           # Products pages
│   │   └── [id]/           # Individual product page
│   ├── categorias/          # Categories page
│   ├── estados/             # States page
│   ├── vendedores/          # Sellers page
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── layout/             # Layout components (Header, Footer)
│   ├── product/            # Product-related components
│   └── ui/                 # Reusable UI components
├── lib/                     # Utility functions
│   └── products.ts         # Product data fetching functions
├── public/                  # Static assets
│   └── data/               # JSON data files
│       └── products.json   # Sample product data
├── types/                   # TypeScript type definitions
│   └── index.ts            # Shared types
└── package.json            # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Data Management

Currently, the application uses local JSON files for data storage located in `public/data/products.json`.

### Adding New Products

Edit the `public/data/products.json` file and add new product objects with the following structure:

```json
{
  "id": "unique-id",
  "name": "Product Name",
  "description": "Product description",
  "price": 1000,
  "currency": "MXN",
  "category": "Category Name",
  "state": "State Name",
  "maker": "Artisan/Maker Name",
  "images": ["image-url"],
  "inStock": true,
  "featured": false,
  "verified": true
}
```

### Future Database Migration

The application is structured to easily migrate to a database. Key migration points:

- Replace functions in `lib/products.ts` with database queries
- Add database connection (PostgreSQL, MongoDB, etc.)
- Implement proper API endpoints for CRUD operations

## Features Roadmap

### Phase 1 (Current - MVP)

- ✅ Product listing and filtering
- ✅ Product detail pages
- ✅ Category filtering
- ✅ State filtering
- ✅ Responsive design

### Phase 2 (Next Steps)

- [ ] Shopping cart functionality
- [ ] User authentication
- [ ] Seller registration and dashboard
- [ ] Product search functionality
- [ ] Order management
- [ ] Payment integration (Mercado Pago, OXXO, etc.)

### Phase 3 (Future)

- [ ] Reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced product recommendations
- [ ] Interactive Mexico map for browsing by state
- [ ] Seller analytics dashboard
- [ ] Multi-language support (Spanish/English)

## Customization

### Colors

The application uses a custom color palette based on warm Mexican-inspired tones. To customize, edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    50: '#fff7ed',
    100: '#ffedd5',
    // ... etc
  },
}
```

### Adding New Categories

Categories are automatically generated from the products data. Add products with new category values to expand available categories.

## Contributing

This is an MVP version. Future contributions should focus on:

- Adding more sample products
- Improving UI/UX
- Adding new features from the roadmap
- Performance optimizations
- SEO improvements

## License

MIT License - feel free to use this project for your own marketplace.

## Support

For questions or support, please open an issue in the repository.

---

**Hecho con ❤️ en México**
