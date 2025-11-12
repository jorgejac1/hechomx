import type { BuyerOrder } from '@/lib/types/buyer';

export async function getBuyerOrders(userEmail: string): Promise<BuyerOrder[]> {
  try {
    const response = await fetch(`/api/buyer/orders?email=${encodeURIComponent(userEmail)}`);
    const result = await response.json();

    if (!result.success) {
      console.error('Failed to fetch buyer orders:', result.error);
      return [];
    }

    return result.data;
  } catch (error) {
    console.error('Error loading buyer orders:', error);
    return [];
  }
}
