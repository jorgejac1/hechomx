import type { SellerMessage } from '@/lib/types/seller-types';

export async function getSellerMessages(userEmail: string): Promise<SellerMessage[]> {
  try {
    const response = await fetch('/api/seller/messages');
    const data = await response.json();
    return data[userEmail] || [];
  } catch (error) {
    console.error('Error loading seller messages:', error);
    return [];
  }
}
