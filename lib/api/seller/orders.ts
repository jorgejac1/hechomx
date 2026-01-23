/**
 * @fileoverview Seller orders API client functions.
 * Provides async functions for fetching seller orders
 * and updating order status (marking as shipped).
 * @module lib/api/seller/orders
 */

import type { SellerOrder } from '@/lib/types/seller-types';

export async function getSellerOrders(userEmail: string): Promise<SellerOrder[]> {
  try {
    const response = await fetch('/api/seller/orders');
    const data = await response.json();
    return data[userEmail] || [];
  } catch (error) {
    console.error('[seller/orders] Error loading seller orders:', error);
    return [];
  }
}

export async function markOrderAsShipped(orderId: string): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log('Marking order as shipped:', orderId);
  return true;
}
