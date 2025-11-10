import type { PricingCalculation, FairTradeRates } from '@/lib/types/pricing-calculator';

export async function getFairTradeRates(region: string): Promise<FairTradeRates | null> {
  try {
    const response = await fetch('/data/fair-trade-rates.json');
    const data: {
      mexico: {
        country: string;
        regions: Record<string, Omit<FairTradeRates, 'country'>>;
      };
    } = await response.json();

    const regionData = data.mexico.regions[region.toLowerCase()];
    if (!regionData) return null;

    return {
      country: data.mexico.country,
      ...regionData,
    };
  } catch (error) {
    console.error('Error loading fair trade rates:', error);
    return null;
  }
}

export async function savePricingCalculation(
  userEmail: string,
  calculation: PricingCalculation
): Promise<boolean> {
  try {
    console.log('Saving pricing calculation for:', userEmail, calculation);
    await new Promise((resolve) => setTimeout(resolve, 500));
    return true;
  } catch (error) {
    console.error('Error saving pricing calculation:', error);
    return false;
  }
}

export function calculatePricing(
  materials: number,
  labor: number,
  overhead: number,
  profitMargin: number
): {
  totalCost: number;
  wholesalePrice: number;
  retailPrice: number;
} {
  const totalCost = materials + labor + overhead;
  const profitAmount = totalCost * (profitMargin / 100);
  const wholesalePrice = totalCost + profitAmount;
  const retailPrice = wholesalePrice * 2;

  return {
    totalCost,
    wholesalePrice,
    retailPrice,
  };
}
