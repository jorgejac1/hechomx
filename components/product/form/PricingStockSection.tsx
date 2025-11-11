import { useRouter } from 'next/navigation';
import { DollarSign } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';

interface PricingStockSectionProps {
  price: number;
  setPrice: (value: number) => void;
  stock: number;
  setStock: (value: number) => void;
}

export default function PricingStockSection({
  price,
  setPrice,
  stock,
  setStock,
}: PricingStockSectionProps) {
  const router = useRouter();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Precio (MXN) *</label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            min="0"
            step="0.01"
            placeholder="0.00"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            required
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Usa la{' '}
          <button
            type="button"
            onClick={() => router.push(ROUTES.PRICING_CALCULATOR)}
            className="text-primary-600 hover:underline"
          >
            calculadora de precios
          </button>{' '}
          para precios justos
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-900 mb-2">Stock Disponible *</label>
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          min="0"
          placeholder="1"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          required
        />
      </div>
    </div>
  );
}
