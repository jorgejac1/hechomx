/**
 * @fileoverview Seller tasks API client functions.
 * Provides async functions for fetching seller task lists
 * (orders to ship, reviews to respond, inventory alerts) by user email.
 * @module lib/api/seller/tasks
 */

import type { SellerTask } from '@/lib/types/seller-types';

export async function getSellerTasks(userEmail: string): Promise<SellerTask[]> {
  try {
    const response = await fetch('/api/seller/tasks');
    const data = await response.json();
    return data[userEmail] || [];
  } catch (error) {
    console.error('[seller/tasks] Error loading seller tasks:', error);
    return [];
  }
}
