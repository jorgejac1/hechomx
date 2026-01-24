/**
 * @fileoverview Size constants for clothing, shoes, and accessories.
 * Defines available sizes for different product categories with Mexican market standards.
 * @module lib/constants/sizes
 */

/**
 * Size type categories
 */
export type SizeType = 'clothing' | 'shoes' | 'rings' | 'one_size';

/**
 * Size option with label and value
 */
export interface SizeOption {
  value: string;
  label: string;
  /** Optional description for size (e.g., measurements) */
  description?: string;
}

/**
 * Clothing sizes - Mexican/International standards
 */
export const CLOTHING_SIZES: SizeOption[] = [
  { value: 'XCH', label: 'XCH', description: 'Extra Chica' },
  { value: 'CH', label: 'CH', description: 'Chica' },
  { value: 'M', label: 'M', description: 'Mediana' },
  { value: 'G', label: 'G', description: 'Grande' },
  { value: 'XG', label: 'XG', description: 'Extra Grande' },
  { value: 'XXG', label: 'XXG', description: 'Doble Extra Grande' },
];

/**
 * Alternative clothing sizes using S/M/L format
 */
export const CLOTHING_SIZES_INTERNATIONAL: SizeOption[] = [
  { value: 'XS', label: 'XS', description: 'Extra Small' },
  { value: 'S', label: 'S', description: 'Small' },
  { value: 'M', label: 'M', description: 'Medium' },
  { value: 'L', label: 'L', description: 'Large' },
  { value: 'XL', label: 'XL', description: 'Extra Large' },
  { value: 'XXL', label: 'XXL', description: 'Double Extra Large' },
];

/**
 * Mexican shoe sizes (Huaraches, etc.)
 * Range from 22 to 30 (women typically 22-26, men 25-30)
 */
export const SHOE_SIZES_MX: SizeOption[] = [
  { value: '22', label: '22', description: 'MX 22' },
  { value: '22.5', label: '22.5', description: 'MX 22.5' },
  { value: '23', label: '23', description: 'MX 23' },
  { value: '23.5', label: '23.5', description: 'MX 23.5' },
  { value: '24', label: '24', description: 'MX 24' },
  { value: '24.5', label: '24.5', description: 'MX 24.5' },
  { value: '25', label: '25', description: 'MX 25' },
  { value: '25.5', label: '25.5', description: 'MX 25.5' },
  { value: '26', label: '26', description: 'MX 26' },
  { value: '26.5', label: '26.5', description: 'MX 26.5' },
  { value: '27', label: '27', description: 'MX 27' },
  { value: '27.5', label: '27.5', description: 'MX 27.5' },
  { value: '28', label: '28', description: 'MX 28' },
  { value: '28.5', label: '28.5', description: 'MX 28.5' },
  { value: '29', label: '29', description: 'MX 29' },
  { value: '29.5', label: '29.5', description: 'MX 29.5' },
  { value: '30', label: '30', description: 'MX 30' },
];

/**
 * Ring sizes - Mexican standard (similar to US)
 */
export const RING_SIZES: SizeOption[] = [
  { value: '4', label: '4', description: 'Talla 4' },
  { value: '5', label: '5', description: 'Talla 5' },
  { value: '6', label: '6', description: 'Talla 6' },
  { value: '7', label: '7', description: 'Talla 7' },
  { value: '8', label: '8', description: 'Talla 8' },
  { value: '9', label: '9', description: 'Talla 9' },
  { value: '10', label: '10', description: 'Talla 10' },
  { value: '11', label: '11', description: 'Talla 11' },
  { value: '12', label: '12', description: 'Talla 12' },
];

/**
 * Categories and subcategories that require size selection
 */
export const SIZE_REQUIRED_CATEGORIES: Record<string, SizeType> = {
  // Main category "Ropa" requires clothing sizes
  Ropa: 'clothing',
  // Subcategories under Textiles y Ropa
  'Huipiles y Vestimenta': 'clothing',
  // Main category for products
  huipiles: 'clothing',
  blusas: 'clothing',
  vestidos: 'clothing',
  faldas: 'clothing',
  rebozos: 'one_size', // Rebozos are typically one size
};

/**
 * Subcategories that require shoe sizes
 */
export const SHOE_SIZE_SUBCATEGORIES: string[] = ['Huaraches', 'huaraches'];

/**
 * Subcategories that require ring sizes
 */
export const RING_SIZE_SUBCATEGORIES: string[] = ['Anillos', 'anillos'];

/**
 * Get the size type for a product based on category and subcategory
 */
export function getSizeTypeForProduct(category: string, subcategory?: string): SizeType | null {
  // Check subcategory first (more specific)
  if (subcategory) {
    const subLower = subcategory.toLowerCase();

    // Check for shoe subcategories
    if (SHOE_SIZE_SUBCATEGORIES.some((s) => s.toLowerCase() === subLower)) {
      return 'shoes';
    }

    // Check for ring subcategories
    if (RING_SIZE_SUBCATEGORIES.some((s) => s.toLowerCase() === subLower)) {
      return 'rings';
    }

    // Check in SIZE_REQUIRED_CATEGORIES
    if (SIZE_REQUIRED_CATEGORIES[subcategory]) {
      return SIZE_REQUIRED_CATEGORIES[subcategory];
    }
  }

  // Check main category
  if (SIZE_REQUIRED_CATEGORIES[category]) {
    return SIZE_REQUIRED_CATEGORIES[category];
  }

  return null;
}

/**
 * Get available sizes based on size type
 */
export function getSizesForType(sizeType: SizeType): SizeOption[] {
  switch (sizeType) {
    case 'clothing':
      return CLOTHING_SIZES;
    case 'shoes':
      return SHOE_SIZES_MX;
    case 'rings':
      return RING_SIZES;
    case 'one_size':
      return [{ value: 'unica', label: 'Talla Única', description: 'Un solo tamaño' }];
    default:
      return [];
  }
}

/**
 * Check if a product requires size selection
 */
export function productRequiresSize(category: string, subcategory?: string): boolean {
  return getSizeTypeForProduct(category, subcategory) !== null;
}
