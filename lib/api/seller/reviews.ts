/**
 * @fileoverview Seller reviews API client functions.
 * Provides async functions for fetching seller reviews
 * and submitting responses to customer reviews.
 * @module lib/api/seller/reviews
 */

import type { SellerReview } from '@/lib/types/seller-types';

export async function getSellerReviews(userEmail: string): Promise<SellerReview[]> {
  try {
    const response = await fetch('/api/seller/reviews');
    const data = await response.json();
    return data[userEmail] || [];
  } catch (error) {
    console.error('[seller/reviews] Error loading seller reviews:', error);
    return [];
  }
}

export async function respondToReview(reviewId: string, response: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log('Responding to review:', reviewId, 'response:', response);
  return true;
}
