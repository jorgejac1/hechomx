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
