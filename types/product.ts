/**
 * Product-related types
 */

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
  featured?: boolean;
  verified?: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
  updatedAt?: string;
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
