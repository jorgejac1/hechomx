import { AlertCircle } from 'lucide-react';

interface ProductAlert {
  name: string;
  stock: number;
}

interface AlertsSectionProps {
  lowStockProducts: ProductAlert[];
  outOfStockProducts: ProductAlert[];
}

export default function AlertsSection({
  lowStockProducts,
  outOfStockProducts,
}: AlertsSectionProps) {
  if (lowStockProducts.length === 0 && outOfStockProducts.length === 0) {
    return null;
  }

  return (
    <div className="mb-6 space-y-3">
      {outOfStockProducts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-red-900">
              {outOfStockProducts.length} producto{outOfStockProducts.length > 1 ? 's' : ''} sin
              stock
            </p>
            <p className="text-sm text-red-800">
              {outOfStockProducts.map((p) => p.name).join(', ')}
            </p>
          </div>
        </div>
      )}

      {lowStockProducts.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-yellow-900">
              {lowStockProducts.length} producto{lowStockProducts.length > 1 ? 's' : ''} con poco
              stock
            </p>
            <p className="text-sm text-yellow-800">
              {lowStockProducts.map((p) => `${p.name} (${p.stock})`).join(', ')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
