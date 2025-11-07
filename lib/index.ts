/**
 * Central export file for CLIENT-SIDE utilities and constants only
 * DO NOT export server functions here (they use Node.js modules like 'fs')
 */

// Re-export constants (safe for client)
export * from './constants/routes';
export * from './constants/filters';
export * from './constants/categories';
export * from './constants/states';
export * from './constants/filterPresets';

// Re-export utilities (safe for client)
export * from './utils/currency';
export * from './utils/string';
export * from './utils/date';
export * from './utils/filters';
export * from './utils/analytics';
export * from './utils/seo';
export * from './utils/season';
export * from './utils/url';

// Re-export types (safe for client - types are removed at runtime)
export type { Subcategory } from './data/subcategories';
