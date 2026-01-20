import { useRouter } from 'next/navigation';
import { DollarSign } from 'lucide-react';
import { ROUTES } from '@/lib/constants/routes';
import TextInput from '@/components/common/TextInput';

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
        <TextInput
          type="number"
          label="Precio (MXN)"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          min={0}
          step={0.01}
          placeholder="0.00"
          leftIcon={<DollarSign className="w-5 h-5" />}
          required
        />
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

      <TextInput
        type="number"
        label="Stock Disponible"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        min={0}
        placeholder="1"
        required
      />
    </div>
  );
}
