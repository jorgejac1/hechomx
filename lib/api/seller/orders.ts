/**
 * @fileoverview Seller orders API client functions.
 * Provides async functions for fetching seller orders
 * and updating order status (marking as shipped).
 * @module lib/api/seller/orders
 */

import type { SellerOrder } from '@/lib/types/seller-types';
import { api, isSuccess } from '@/lib/utils/api-client';

/**
 * Fetch orders for a specific seller
 * @param userEmail - The seller's email address
 * @returns Array of seller orders or empty array on error
 */
export async function getSellerOrders(userEmail: string): Promise<SellerOrder[]> {
  const result = await api.get<Record<string, SellerOrder[]>>('/api/seller/orders', {
    context: 'seller/orders/getSellerOrders',
    errorKey: 'ORDERS_LOAD_FAILED',
  });

  if (isSuccess(result)) {
    return result.data[userEmail] || [];
  }

  return [];
}

/**
 * Get seller orders with error information for UI feedback
 */
export async function getSellerOrdersWithError(userEmail: string) {
  const result = await api.get<Record<string, SellerOrder[]>>('/api/seller/orders', {
    context: 'seller/orders/getSellerOrdersWithError',
    errorKey: 'ORDERS_LOAD_FAILED',
  });

  if (isSuccess(result)) {
    return { success: true as const, data: result.data[userEmail] || [] };
  }

  return result;
}

/**
 * Mark an order as shipped
 * @param orderId - The order ID to mark as shipped
 * @returns Success status
 */
export async function markOrderAsShipped(orderId: string): Promise<boolean> {
  const result = await api.patch<{ success: boolean }>(
    `/api/seller/orders/${orderId}/ship`,
    { status: 'shipped' },
    {
      context: 'seller/orders/markOrderAsShipped',
      errorKey: 'SAVE_FAILED',
    }
  );

  return isSuccess(result);
}
