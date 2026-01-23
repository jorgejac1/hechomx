/**
 * @fileoverview Product management utilities for sellers.
 * Provides functions for draft product storage, publishing, unpublishing,
 * product ID generation, and seller product counts using localStorage.
 * @module lib/utils/products
 */

import { DraftProduct, ProductFormData } from '@/types/product';

const DRAFT_PRODUCTS_KEY = 'papalote-draft-products';
const SELLER_PRODUCTS_KEY = 'papalote-seller-products';

/**
 * Generate unique product ID
 */
export function generateProductId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `PROD-${timestamp}-${random}`.toUpperCase();
}

/**
 * Save draft product to localStorage
 */
export function saveDraftProduct(
  product: ProductFormData,
  sellerId: string,
  sellerName: string,
  existingId?: string
): DraftProduct {
  try {
    const drafts = getDraftProducts(sellerId);
    const now = new Date().toISOString();

    const draftProduct: DraftProduct = {
      ...product,
      id: existingId || generateProductId(),
      createdAt: existingId ? drafts.find((d) => d.id === existingId)?.createdAt || now : now,
      updatedAt: now,
      sellerId,
      sellerName,
      status: 'draft',
    };

    // Update or add
    const existingIndex = drafts.findIndex((d) => d.id === draftProduct.id);
    if (existingIndex !== -1) {
      drafts[existingIndex] = draftProduct;
    } else {
      drafts.unshift(draftProduct);
    }

    localStorage.setItem(DRAFT_PRODUCTS_KEY, JSON.stringify(drafts));
    return draftProduct;
  } catch (error) {
    console.error('[products] Error saving draft product:', error);
    throw new Error('No se pudo guardar el borrador');
  }
}

/**
 * Get all draft products for a seller
 */
export function getDraftProducts(sellerId: string): DraftProduct[] {
  try {
    const stored = localStorage.getItem(DRAFT_PRODUCTS_KEY);
    const allDrafts: DraftProduct[] = stored ? JSON.parse(stored) : [];
    return allDrafts.filter((draft) => draft.sellerId === sellerId);
  } catch (error) {
    console.error('[products] Error loading draft products:', error);
    return [];
  }
}

/**
 * Get single draft product by ID
 */
export function getDraftProductById(productId: string): DraftProduct | null {
  try {
    const stored = localStorage.getItem(DRAFT_PRODUCTS_KEY);
    const allDrafts: DraftProduct[] = stored ? JSON.parse(stored) : [];
    return allDrafts.find((draft) => draft.id === productId) || null;
  } catch (error) {
    console.error('[products] Error loading draft product:', error);
    return null;
  }
}

/**
 * Delete draft product
 */
export function deleteDraftProduct(productId: string): void {
  try {
    const stored = localStorage.getItem(DRAFT_PRODUCTS_KEY);
    const allDrafts: DraftProduct[] = stored ? JSON.parse(stored) : [];
    const filtered = allDrafts.filter((draft) => draft.id !== productId);
    localStorage.setItem(DRAFT_PRODUCTS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('[products] Error deleting draft product:', error);
    throw new Error('No se pudo eliminar el borrador');
  }
}

/**
 * Publish a draft (move from drafts to published products)
 */
export function publishDraftProduct(productId: string): DraftProduct | null {
  try {
    const draft = getDraftProductById(productId);
    if (!draft) return null;

    // Update status
    const publishedProduct: DraftProduct = {
      ...draft,
      status: 'published',
      updatedAt: new Date().toISOString(),
    };

    // Save to published products
    savePublishedProduct(publishedProduct);

    // Remove from drafts
    deleteDraftProduct(productId);

    return publishedProduct;
  } catch (error) {
    console.error('[products] Error publishing draft:', error);
    return null;
  }
}

/**
 * Save published product to localStorage
 */
export function savePublishedProduct(product: DraftProduct): void {
  try {
    const products = getPublishedProducts(product.sellerId);
    const existingIndex = products.findIndex((p) => p.id === product.id);

    if (existingIndex !== -1) {
      products[existingIndex] = product;
    } else {
      products.unshift(product);
    }

    localStorage.setItem(SELLER_PRODUCTS_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('[products] Error saving published product:', error);
    throw new Error('No se pudo guardar el producto');
  }
}

/**
 * Get published products for a seller
 */
export function getPublishedProducts(sellerId: string): DraftProduct[] {
  try {
    const stored = localStorage.getItem(SELLER_PRODUCTS_KEY);
    const allProducts: DraftProduct[] = stored ? JSON.parse(stored) : [];
    return allProducts.filter(
      (product) => product.sellerId === sellerId && product.status === 'published'
    );
  } catch (error) {
    console.error('[products] Error loading published products:', error);
    return [];
  }
}

/**
 * Get all seller products (drafts + published)
 */
export function getAllSellerProducts(sellerId: string): DraftProduct[] {
  const drafts = getDraftProducts(sellerId);
  const published = getPublishedProducts(sellerId);
  return [...drafts, ...published].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
}

/**
 * Unpublish a product (move back to draft)
 */
export function unpublishProduct(productId: string, sellerId: string): DraftProduct | null {
  try {
    const products = getPublishedProducts(sellerId);
    const product = products.find((p) => p.id === productId);
    if (!product) return null;

    // Update status to draft
    const draftProduct: DraftProduct = {
      ...product,
      status: 'draft',
      updatedAt: new Date().toISOString(),
    };

    // Save as draft
    saveDraftProduct(draftProduct, sellerId, product.sellerName, productId);

    // Remove from published
    const filtered = products.filter((p) => p.id !== productId);
    localStorage.setItem(SELLER_PRODUCTS_KEY, JSON.stringify(filtered));

    return draftProduct;
  } catch (error) {
    console.error('[products] Error unpublishing product:', error);
    return null;
  }
}

/**
 * Get product counts by status
 */
export function getProductCounts(sellerId: string): { drafts: number; published: number } {
  return {
    drafts: getDraftProducts(sellerId).length,
    published: getPublishedProducts(sellerId).length,
  };
}
