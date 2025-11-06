/**
 * Server-only exports
 * Only import in Server Components, API Routes, or server actions
 */

// Server-only data fetching (uses fs)
export * from './data/products';

// Re-export everything from main index
export * from './index';
