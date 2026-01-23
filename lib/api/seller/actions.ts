/**
 * @fileoverview Seller product action API client functions.
 * Provides async functions for seller product actions
 * such as restocking inventory quantities.
 * @module lib/api/seller/actions
 */

export async function restockProduct(productId: string, quantity: number): Promise<boolean> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log('Restocking product:', productId, 'quantity:', quantity);
  return true;
}
