import type { SellerMessage } from '@/lib/types/seller';

export async function getSellerMessages(userEmail: string): Promise<SellerMessage[]> {
  try {
    const response = await fetch('/data/seller-messages.json');
    const data = await response.json();
    return data[userEmail] || [];
  } catch (error) {
    console.error('Error loading seller messages:', error);
    return [];
  }
}
