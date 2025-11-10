/**
 * Server-only exports
 * Only import in Server Components, API Routes, or server actions
 */

// Direct re-exports from products
export {
  getAllProducts,
  getProductById,
  getProductsByCategory,
  getProductsByState,
  getFeaturedProducts,
  searchProducts,
  getCategories,
  getStates,
} from './data/products';

// Direct re-exports from subcategories
export {
  getSubcategories,
  getSubSubcategories,
  getCategoryConfig,
  getAllSubcategories,
} from './data/subcategories';

// Shop utilities that need products parameter (server-side)
export { getProductsByShop } from './utils/shop';

// Re-export client-safe utilities from main index
export * from './index';
