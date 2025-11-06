import { Product } from '@/types';
import fs from 'fs';
import path from 'path';

export function getAllProducts(): Product[] {
  const filePath = path.join(process.cwd(), 'public', 'data', 'products.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(jsonData);
}

export function getProductById(id: string): Product | undefined {
  const products = getAllProducts();
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  const products = getAllProducts();
  return products.filter(product => product.category.toLowerCase() === category.toLowerCase());
}

export function getProductsByState(state: string): Product[] {
  const products = getAllProducts();
  return products.filter(product => product.state.toLowerCase() === state.toLowerCase());
}

export function getFeaturedProducts(): Product[] {
  const products = getAllProducts();
  return products.filter(product => product.featured);
}

export function searchProducts(query: string): Product[] {
  const products = getAllProducts();
  const lowerQuery = query.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description.toLowerCase().includes(lowerQuery) ||
    product.category.toLowerCase().includes(lowerQuery) ||
    product.state.toLowerCase().includes(lowerQuery)
  );
}

export function getCategories(): string[] {
  const products = getAllProducts();
  return [...new Set(products.map(p => p.category))];
}

export function getStates(): string[] {
  const products = getAllProducts();
  return [...new Set(products.map(p => p.state))];
}
