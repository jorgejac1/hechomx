/**
 * @fileoverview Search utilities with fuzzy matching and search history.
 * Provides intelligent product search with:
 * - Fuzzy matching for typo tolerance
 * - Search history management in localStorage
 * - Relevance scoring for search results
 * @module lib/utils/search
 */

import { Product } from '@/types';

// ==================== Search History ====================

const SEARCH_HISTORY_KEY = 'papalote-search-history';
const MAX_HISTORY_ITEMS = 10;

export interface SearchHistoryItem {
  query: string;
  timestamp: string;
}

/**
 * Get search history from localStorage
 */
export function getSearchHistory(): SearchHistoryItem[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('[search] Error loading search history:', error);
    return [];
  }
}

/**
 * Add a search query to history
 */
export function addToSearchHistory(query: string): void {
  if (typeof window === 'undefined' || !query.trim()) {
    return;
  }

  try {
    const history = getSearchHistory();
    const normalizedQuery = query.trim().toLowerCase();

    // Remove if already exists (to move to front)
    const filtered = history.filter((item) => item.query.toLowerCase() !== normalizedQuery);

    // Add to beginning
    const updated: SearchHistoryItem[] = [
      { query: query.trim(), timestamp: new Date().toISOString() },
      ...filtered,
    ].slice(0, MAX_HISTORY_ITEMS);

    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('[search] Error saving search history:', error);
  }
}

/**
 * Remove a specific item from search history
 */
export function removeFromSearchHistory(query: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const history = getSearchHistory();
    const filtered = history.filter((item) => item.query.toLowerCase() !== query.toLowerCase());
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('[search] Error removing from search history:', error);
  }
}

/**
 * Clear all search history
 */
export function clearSearchHistory(): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(SEARCH_HISTORY_KEY);
}

// ==================== Fuzzy Matching ====================

/**
 * Calculate Levenshtein distance between two strings
 * Used for fuzzy matching to handle typos
 */
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;

  // Create a 2D array for dynamic programming
  const dp: number[][] = Array(m + 1)
    .fill(null)
    .map(() => Array(n + 1).fill(0));

  // Initialize first row and column
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  // Fill the matrix
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(
          dp[i - 1][j - 1] + 1, // substitution
          dp[i - 1][j] + 1, // deletion
          dp[i][j - 1] + 1 // insertion
        );
      }
    }
  }

  return dp[m][n];
}

/**
 * Check if a string fuzzy matches another
 * Returns a score (0-1) where 1 is perfect match
 */
function fuzzyMatch(text: string, query: string): number {
  const textLower = text.toLowerCase();
  const queryLower = query.toLowerCase();

  // Exact match
  if (textLower === queryLower) return 1;

  // Contains match
  if (textLower.includes(queryLower)) {
    // Boost score based on position (earlier matches rank higher)
    const position = textLower.indexOf(queryLower);
    const positionBonus = Math.max(0, 1 - position / textLower.length);
    return 0.8 + positionBonus * 0.1;
  }

  // Word start match (each word starts with query)
  const words = textLower.split(/\s+/);
  const queryWords = queryLower.split(/\s+/);
  const startsWithMatch = queryWords.every((qw) => words.some((w) => w.startsWith(qw)));
  if (startsWithMatch) return 0.7;

  // Fuzzy match using Levenshtein distance
  // Only use for short queries to avoid false positives
  if (queryLower.length >= 3 && queryLower.length <= 15) {
    const distance = levenshteinDistance(textLower, queryLower);
    const maxLen = Math.max(textLower.length, queryLower.length);
    const similarity = 1 - distance / maxLen;

    // Only return if similarity is above threshold (40%)
    if (similarity > 0.4) {
      return similarity * 0.5; // Scale down fuzzy matches
    }

    // Check individual words for fuzzy match
    for (const word of words) {
      if (word.length >= 3) {
        const wordDistance = levenshteinDistance(word, queryLower);
        const wordSimilarity = 1 - wordDistance / Math.max(word.length, queryLower.length);
        if (wordSimilarity > 0.6) {
          return wordSimilarity * 0.4;
        }
      }
    }
  }

  return 0;
}

// ==================== Product Search ====================

interface SearchResult {
  product: Product;
  score: number;
  matchedFields: string[];
}

/**
 * Search products with fuzzy matching and relevance scoring
 */
export function searchProducts(
  products: Product[],
  query: string,
  options: {
    limit?: number;
    minScore?: number;
  } = {}
): SearchResult[] {
  const { limit = 10, minScore = 0.2 } = options;

  if (!query.trim()) {
    return [];
  }

  const queryNormalized = query.trim().toLowerCase();
  const results: SearchResult[] = [];

  for (const product of products) {
    let totalScore = 0;
    const matchedFields: string[] = [];

    // Search in name (highest weight)
    const nameScore = fuzzyMatch(product.name, queryNormalized);
    if (nameScore > 0) {
      totalScore += nameScore * 3;
      matchedFields.push('name');
    }

    // Search in category
    const categoryScore = fuzzyMatch(product.category, queryNormalized);
    if (categoryScore > 0) {
      totalScore += categoryScore * 2;
      matchedFields.push('category');
    }

    // Search in maker/artisan name
    const makerScore = fuzzyMatch(product.maker, queryNormalized);
    if (makerScore > 0) {
      totalScore += makerScore * 1.5;
      matchedFields.push('maker');
    }

    // Search in state/region
    const stateScore = fuzzyMatch(product.state, queryNormalized);
    if (stateScore > 0) {
      totalScore += stateScore * 1.5;
      matchedFields.push('state');
    }

    // Search in description (lower weight)
    const descScore = fuzzyMatch(product.description, queryNormalized);
    if (descScore > 0) {
      totalScore += descScore * 0.5;
      matchedFields.push('description');
    }

    // Search in materials
    if (product.materials) {
      for (const material of product.materials) {
        const materialScore = fuzzyMatch(material, queryNormalized);
        if (materialScore > 0) {
          totalScore += materialScore * 1;
          if (!matchedFields.includes('materials')) {
            matchedFields.push('materials');
          }
          break;
        }
      }
    }

    // Search in tags
    if (product.tags) {
      for (const tag of product.tags) {
        const tagScore = fuzzyMatch(tag, queryNormalized);
        if (tagScore > 0) {
          totalScore += tagScore * 1;
          if (!matchedFields.includes('tags')) {
            matchedFields.push('tags');
          }
          break;
        }
      }
    }

    // Normalize score
    const normalizedScore = totalScore / 10; // Normalize to roughly 0-1 range

    // Boost for verified and featured products
    let finalScore = normalizedScore;
    if (product.verified) finalScore *= 1.1;
    if (product.featured) finalScore *= 1.1;
    if (product.inStock) finalScore *= 1.05;

    if (finalScore >= minScore && matchedFields.length > 0) {
      results.push({
        product,
        score: finalScore,
        matchedFields,
      });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit);
}

/**
 * Get search suggestions based on partial query
 * Returns suggested completions from product data
 */
export function getSearchSuggestions(
  products: Product[],
  query: string,
  limit: number = 5
): string[] {
  if (!query.trim() || query.length < 2) {
    return [];
  }

  const queryLower = query.toLowerCase();
  const suggestions = new Set<string>();

  // Collect matching terms from products
  for (const product of products) {
    // Product names
    if (product.name.toLowerCase().includes(queryLower)) {
      suggestions.add(product.name);
    }

    // Categories
    if (product.category.toLowerCase().includes(queryLower)) {
      suggestions.add(product.category);
    }

    // Makers
    if (product.maker.toLowerCase().includes(queryLower)) {
      suggestions.add(product.maker);
    }

    // States
    if (product.state.toLowerCase().includes(queryLower)) {
      suggestions.add(product.state);
    }

    // Materials
    if (product.materials) {
      for (const material of product.materials) {
        if (material.toLowerCase().includes(queryLower)) {
          suggestions.add(material);
        }
      }
    }

    if (suggestions.size >= limit * 2) break;
  }

  // Sort by relevance (shorter matches first, then alphabetically)
  return Array.from(suggestions)
    .sort((a, b) => {
      const aStartsWith = a.toLowerCase().startsWith(queryLower);
      const bStartsWith = b.toLowerCase().startsWith(queryLower);
      if (aStartsWith && !bStartsWith) return -1;
      if (!aStartsWith && bStartsWith) return 1;
      return a.length - b.length || a.localeCompare(b);
    })
    .slice(0, limit);
}
