/**
 * @fileoverview Product recommendation algorithm utilities.
 * Provides smart product recommendations based on multiple factors:
 * - Same category (similar products)
 * - Similar price range
 * - Same materials
 * - Same maker/artisan
 * - Same region/state
 * @module lib/utils/recommendations
 */

import { Product } from '@/types';
import { getRecentlyViewedIdsExcluding } from './recently-viewed';

/**
 * Configuration for recommendation scoring
 */
const SCORE_WEIGHTS = {
  sameCategory: 10,
  sameMaker: 8,
  sameState: 5,
  sameMaterial: 4,
  similarPrice: 3,
  featured: 2,
  verified: 1,
};

/**
 * Price range tolerance for "similar price" matching (percentage)
 */
const PRICE_TOLERANCE = 0.3; // 30%

/**
 * Calculate a recommendation score for a product relative to a reference product
 */
function calculateScore(candidate: Product, reference: Product): number {
  let score = 0;

  // Same category is highest priority
  if (candidate.category === reference.category) {
    score += SCORE_WEIGHTS.sameCategory;
  }

  // Same maker suggests similar style/quality
  if (candidate.maker === reference.maker) {
    score += SCORE_WEIGHTS.sameMaker;
  }

  // Same region/state for regional authenticity
  if (candidate.state === reference.state) {
    score += SCORE_WEIGHTS.sameState;
  }

  // Shared materials
  if (candidate.materials && reference.materials) {
    const sharedMaterials = candidate.materials.filter((m) => reference.materials?.includes(m));
    score += sharedMaterials.length * SCORE_WEIGHTS.sameMaterial;
  }

  // Similar price range
  const priceLow = reference.price * (1 - PRICE_TOLERANCE);
  const priceHigh = reference.price * (1 + PRICE_TOLERANCE);
  if (candidate.price >= priceLow && candidate.price <= priceHigh) {
    score += SCORE_WEIGHTS.similarPrice;
  }

  // Bonus for featured products
  if (candidate.featured) {
    score += SCORE_WEIGHTS.featured;
  }

  // Bonus for verified products
  if (candidate.verified) {
    score += SCORE_WEIGHTS.verified;
  }

  return score;
}

/**
 * Get recommended products for a given product
 * @param currentProduct - The product to find recommendations for
 * @param allProducts - All available products to choose from
 * @param limit - Maximum number of recommendations to return
 * @returns Array of recommended products, sorted by relevance
 */
export function getRecommendedProducts(
  currentProduct: Product,
  allProducts: Product[],
  limit: number = 4
): Product[] {
  // Exclude the current product and out-of-stock items
  const candidates = allProducts.filter((p) => p.id !== currentProduct.id && p.inStock);

  // Score each candidate
  const scored = candidates.map((product) => ({
    product,
    score: calculateScore(product, currentProduct),
  }));

  // Sort by score descending, then by rating as tiebreaker
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return (b.product.rating || 0) - (a.product.rating || 0);
  });

  return scored.slice(0, limit).map((item) => item.product);
}

/**
 * Get recently viewed products (excluding current)
 * @param currentProductId - ID of current product to exclude
 * @param allProducts - All available products
 * @param limit - Maximum number of products to return
 */
export function getRecentlyViewedProducts(
  currentProductId: string,
  allProducts: Product[],
  limit: number = 4
): Product[] {
  const recentIds = getRecentlyViewedIdsExcluding(currentProductId);

  return recentIds
    .map((id) => allProducts.find((p) => p.id === id))
    .filter((p): p is Product => p !== undefined && p.inStock)
    .slice(0, limit);
}

/**
 * Get cross-category recommendations (products user might like from other categories)
 * @param currentProduct - The product to base recommendations on
 * @param allProducts - All available products
 * @param limit - Maximum number of recommendations
 */
export function getCrossCategoryRecommendations(
  currentProduct: Product,
  allProducts: Product[],
  limit: number = 4
): Product[] {
  // Only consider products from different categories
  const candidates = allProducts.filter(
    (p) => p.id !== currentProduct.id && p.category !== currentProduct.category && p.inStock
  );

  // Score based on shared attributes (excluding category bonus)
  const scored = candidates.map((product) => {
    let score = 0;

    // Same maker is strong indicator
    if (product.maker === currentProduct.maker) {
      score += 10;
    }

    // Same state/region
    if (product.state === currentProduct.state) {
      score += 5;
    }

    // Shared materials
    if (product.materials && currentProduct.materials) {
      const shared = product.materials.filter((m) => currentProduct.materials?.includes(m));
      score += shared.length * 3;
    }

    // Similar price
    const priceLow = currentProduct.price * (1 - PRICE_TOLERANCE);
    const priceHigh = currentProduct.price * (1 + PRICE_TOLERANCE);
    if (product.price >= priceLow && product.price <= priceHigh) {
      score += 2;
    }

    // Boost featured and verified
    if (product.featured) score += 2;
    if (product.verified) score += 1;

    return { product, score };
  });

  // Only return products with some relevance
  return scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || (b.product.rating || 0) - (a.product.rating || 0))
    .slice(0, limit)
    .map((item) => item.product);
}

/**
 * Get combined recommendations from multiple strategies
 * Returns a mix of similar products, cross-category, and recently viewed
 */
export function getCombinedRecommendations(
  currentProduct: Product,
  allProducts: Product[],
  options: {
    similarLimit?: number;
    crossCategoryLimit?: number;
    recentlyViewedLimit?: number;
  } = {}
): {
  similar: Product[];
  crossCategory: Product[];
  recentlyViewed: Product[];
} {
  const { similarLimit = 4, crossCategoryLimit = 4, recentlyViewedLimit = 4 } = options;

  const similar = getRecommendedProducts(currentProduct, allProducts, similarLimit);
  const crossCategory = getCrossCategoryRecommendations(
    currentProduct,
    allProducts,
    crossCategoryLimit
  );
  const recentlyViewed = getRecentlyViewedProducts(
    currentProduct.id,
    allProducts,
    recentlyViewedLimit
  );

  return {
    similar,
    crossCategory,
    recentlyViewed,
  };
}
