import type { SellerTask } from '@/lib/types/seller-types';

export async function getSellerTasks(userEmail: string): Promise<SellerTask[]> {
  try {
    const response = await fetch('/api/seller/tasks');
    const data = await response.json();
    return data[userEmail] || [];
  } catch (error) {
    console.error('Error loading seller tasks:', error);
    return [];
  }
}
