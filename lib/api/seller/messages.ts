/**
 * @fileoverview Seller messages API client functions.
 * Provides async functions for fetching seller messages
 * from the messages API endpoint by user email.
 * @module lib/api/seller/messages
 */

import type { SellerMessage } from '@/lib/types/seller-types';

export async function getSellerMessages(userEmail: string): Promise<SellerMessage[]> {
  try {
    const response = await fetch('/api/seller/messages');
    const data = await response.json();
    return data[userEmail] || [];
  } catch (error) {
    console.error('[seller/messages] Error loading seller messages:', error);
    return [];
  }
}
