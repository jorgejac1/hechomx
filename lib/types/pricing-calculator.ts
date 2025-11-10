export interface MaterialCost {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  total: number;
}

export interface LaborTime {
  id: string;
  taskName: string;
  hours: number;
  hourlyRate: number;
  total: number;
}

export interface OverheadCost {
  id: string;
  category: string;
  amount: number;
  frequency: 'one-time' | 'monthly' | 'annual';
}

export interface PricingCalculation {
  id: string;
  productName: string;
  productDescription: string;
  productImage?: string;
  materials: MaterialCost[];
  labor: LaborTime[];
  overhead: OverheadCost[];
  totalMaterialCost: number;
  totalLaborCost: number;
  totalOverheadCost: number;
  totalDirectCost: number;
  profitMargin: number;
  suggestedWholesalePrice: number;
  suggestedRetailPrice: number;
  fairWageRate: number;
  livingWageComparison: number;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
}

export interface FairTradeRates {
  country: string;
  region: string;
  minimumWage: number;
  livingWage: number;
  recommendedHourlyRate: number;
  currency: string;
}
