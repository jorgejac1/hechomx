/**
 * @fileoverview Product-related TypeScript type definitions
 * Defines interfaces for products, categories, states, makers, reviews, and product form data
 * @module types/product
 */

export type ProductStatus = 'draft' | 'published';

export interface ProductDimensions {
  length?: number | string;
  width?: number | string;
  height?: number | string;
  diameter?: string;
  capacity?: string;
  opening?: string;
  size?: string;
  sizes?: string;
  pendant?: string;
  chain?: string;
  thickness?: string;
  stone?: string;
  weight?: string;
  quantity?: string;
  waist?: string;
  holán?: string;
  unit?: 'cm' | 'in';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  subcategory?: string;
  subSubcategory?: string;
  state: string;
  maker: string;
  images: string[];
  videos?: string[];
  inStock: boolean;
  stock?: number;
  status?: ProductStatus;
  featured?: boolean;
  verified?: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
  // Extended fields from products.json
  materials?: string[];
  dimensions?: ProductDimensions;
  careInstructions?: string[];
  features?: string[];
  tags?: string[];
  makerProfile?: {
    verification?: {
      level: 'basic_seller' | 'verified_artisan' | 'master_artisan' | 'certified_workshop';
    };
  };
  /** Available sizes for clothing, shoes, or rings */
  availableSizes?: string[];
  /** Type of size (clothing, shoes, rings) for display purposes */
  sizeType?: 'clothing' | 'shoes' | 'rings' | 'one_size';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
}

export interface State {
  id: string;
  name: string;
  slug: string;
  description: string;
  specialties: string[];
}

export interface Maker {
  id: string;
  name: string;
  bio: string;
  state: string;
  verified: boolean;
  products: string[];
}

// Additional product-related types
export interface ProductReview {
  id: string | number;
  productId: string;
  author: string;
  authorAvatar?: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpful: number;
  photos: string[];
}

export interface ProductImage {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  isPrimary?: boolean;
}

export interface ProductFormData {
  name: string;
  category: string;
  subcategory: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
  status: ProductStatus;
  materials?: string[];
  dimensions?: {
    length: number;
    width: number;
    height: number;
    unit: 'cm' | 'in';
  };
  weight?: {
    value: number;
    unit: 'kg' | 'lb';
  };
  customizable?: boolean;
  productionTime?: number; // days
  careInstructions?: string;
  story?: string;
  tags?: string[];
}

/**
 * Draft product stored in localStorage
 */
export interface DraftProduct extends ProductFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
  sellerId: string;
  sellerName: string;
}
