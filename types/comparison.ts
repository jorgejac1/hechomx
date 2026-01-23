/**
 * @fileoverview Product comparison type definitions
 * Defines interfaces for comparing products including comparison attributes, rows, and settings
 * @module types/comparison
 */

import { Product } from './product';

export interface ComparisonProduct extends Product {
  comparedAt?: string;
}

export interface ComparisonAttribute {
  key: string;
  label: string;
  type: 'text' | 'number' | 'boolean' | 'rating' | 'price' | 'badge';
  getValue: (product: Product) => string | number | boolean;
  format?: (value: string | number | boolean) => string;
  highlight?: 'best' | 'worst';
}

export interface ComparisonRow {
  attribute: ComparisonAttribute;
  values: (string | number | boolean)[];
  hasDifference: boolean;
}

export interface ComparisonSettings {
  showOnlyDifferences: boolean;
  maxProducts: number;
  highlightBest: boolean;
}
