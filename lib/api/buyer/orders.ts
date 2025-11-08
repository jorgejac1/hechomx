import type { BuyerOrder } from '@/lib/types/buyer';

export async function getBuyerOrders(userEmail: string): Promise<BuyerOrder[]> {
  try {
    const response = await fetch('/data/buyer-orders.json');
    const data = await response.json();
    return data[userEmail] || [];
  } catch (error) {
    console.error('Error loading buyer orders:', error);
    return [];
  }
}
