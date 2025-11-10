import type { BuyerImpactData } from '@/lib/types/buyer';

export async function getBuyerImpact(userEmail: string): Promise<BuyerImpactData | null> {
  try {
    const response = await fetch('/api/buyer/impact');
    const data = await response.json();
    return data[userEmail] || null;
  } catch (error) {
    console.error('Error loading buyer impact:', error);
    return null;
  }
}
