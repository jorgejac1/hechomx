import { Product } from '@/types';
import fs from 'fs';
import path from 'path';

// Helper to generate random date within last N days
function getRandomDate(daysAgo: number): string {
  const now = new Date();
  const randomDays = Math.floor(Math.random() * daysAgo);
  const date = new Date(now.getTime() - randomDays * 24 * 60 * 60 * 1000);
  return date.toISOString();
}

export function getAllProducts(): Product[] {
  const filePath = path.join(process.cwd(), 'public', 'data', 'products.json');
  const jsonData = fs.readFileSync(filePath, 'utf-8');
  const products = JSON.parse(jsonData) as Product[];

  // Add random createdAt dates to products (for demo)
  return products.map((product) => ({
    ...product,
    createdAt: product.createdAt || getRandomDate(90), // Random date within last 90 days
    updatedAt: product.updatedAt || getRandomDate(30), // Random date within last 30 days
  }));
}

export function getProductById(id: string): Product | undefined {
  const products = getAllProducts();
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  const products = getAllProducts();
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase());
}

export function getProductsByState(state: string): Product[] {
  const products = getAllProducts();
  return products.filter((product) => product.state.toLowerCase() === state.toLowerCase());
}

export function getFeaturedProducts(): Product[] {
  const products = getAllProducts();
  return products.filter((product) => product.featured);
}

export function searchProducts(query: string): Product[] {
  const products = getAllProducts();
  const lowerQuery = query.toLowerCase();

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.state.toLowerCase().includes(lowerQuery)
  );
}

export function getCategories(): string[] {
  const products = getAllProducts();
  return [...new Set(products.map((p) => p.category))];
}

export function getStates(): string[] {
  const products = getAllProducts();
  return [...new Set(products.map((p) => p.state))];
}
