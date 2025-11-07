/**
 * Server-only exports
 * Only import in Server Components, API Routes, or server actions
 */

// Server-only data fetching (uses fs)
export * from './data/products';
export * from './data/subcategories';

// Re-export everything from main index (utilities and constants)
export * from './index';
