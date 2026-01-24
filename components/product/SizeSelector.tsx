/**
 * @fileoverview Size selector component for products
 * Displays available sizes as selectable buttons for clothing, shoes, and rings.
 * @module components/product/SizeSelector
 */

'use client';

import { useState } from 'react';
import { Ruler } from 'lucide-react';

interface SizeSelectorProps {
  /** Array of available size values */
  availableSizes: string[];
  /** Type of size for display context */
  sizeType: 'clothing' | 'shoes' | 'rings' | 'one_size';
  /** Currently selected size */
  selectedSize: string | null;
  /** Callback when size is selected */
  onSizeSelect: (size: string) => void;
  /** Whether selection is disabled */
  disabled?: boolean;
}

/**
 * Get the label for the size type
 */
function getSizeTypeLabel(sizeType: string): string {
  switch (sizeType) {
    case 'clothing':
      return 'Talla';
    case 'shoes':
      return 'Talla (MX)';
    case 'rings':
      return 'Talla del anillo';
    case 'one_size':
      return 'Talla';
    default:
      return 'Talla';
  }
}

export default function SizeSelector({
  availableSizes,
  sizeType,
  selectedSize,
  onSizeSelect,
  disabled = false,
}: SizeSelectorProps) {
  const [showSizeGuide, setShowSizeGuide] = useState(false);

  if (!availableSizes || availableSizes.length === 0) {
    return null;
  }

  // For one_size products, auto-select and show as info
  if (sizeType === 'one_size') {
    return (
      <div className="mb-4">
        <p className="text-sm font-semibold text-gray-700 mb-2">Talla</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg text-gray-700">
          <span className="font-medium">Talla Única</span>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      {/* Header with size guide link */}
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-semibold text-gray-900">
          {getSizeTypeLabel(sizeType)} <span className="text-red-500">*</span>
        </label>
        <button
          type="button"
          onClick={() => setShowSizeGuide(!showSizeGuide)}
          className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors"
        >
          <Ruler className="w-4 h-4" />
          Guía de tallas
        </button>
      </div>

      {/* Size buttons */}
      <div className="flex flex-wrap gap-2">
        {availableSizes.map((size) => {
          const isSelected = selectedSize === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onSizeSelect(size)}
              disabled={disabled}
              className={`
                min-w-[48px] px-3 py-2 rounded-lg border-2 font-medium text-sm
                transition-all duration-200
                ${
                  isSelected
                    ? 'border-primary-600 bg-primary-50 text-primary-700'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400 hover:bg-gray-50'
                }
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1
              `}
              aria-pressed={isSelected}
              aria-label={`Talla ${size}`}
            >
              {size}
            </button>
          );
        })}
      </div>

      {/* Size guide modal/dropdown */}
      {showSizeGuide && (
        <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h4 className="font-semibold text-gray-900 mb-2">Guía de Tallas</h4>
          {sizeType === 'clothing' && (
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>XCH/XS:</strong> Busto 80-84cm, Cintura 60-64cm
              </p>
              <p>
                <strong>CH/S:</strong> Busto 84-88cm, Cintura 64-68cm
              </p>
              <p>
                <strong>M:</strong> Busto 88-92cm, Cintura 68-72cm
              </p>
              <p>
                <strong>G/L:</strong> Busto 92-96cm, Cintura 72-76cm
              </p>
              <p>
                <strong>XG/XL:</strong> Busto 96-100cm, Cintura 76-80cm
              </p>
              <p>
                <strong>XXG/XXL:</strong> Busto 100-104cm, Cintura 80-84cm
              </p>
            </div>
          )}
          {sizeType === 'shoes' && (
            <div className="text-sm text-gray-600 space-y-1">
              <p className="mb-2">Tallas mexicanas en centímetros:</p>
              <p>
                <strong>22-24:</strong> Generalmente para dama
              </p>
              <p>
                <strong>25-30:</strong> Generalmente para caballero
              </p>
              <p className="mt-2 text-xs">
                Tip: Mide tu pie en cm desde el talón hasta el dedo más largo.
              </p>
            </div>
          )}
          {sizeType === 'rings' && (
            <div className="text-sm text-gray-600 space-y-1">
              <p className="mb-2">Usa un hilo o tira de papel para medir el diámetro de tu dedo:</p>
              <p>
                <strong>Talla 5:</strong> 15.7mm diámetro
              </p>
              <p>
                <strong>Talla 6:</strong> 16.5mm diámetro
              </p>
              <p>
                <strong>Talla 7:</strong> 17.3mm diámetro
              </p>
              <p>
                <strong>Talla 8:</strong> 18.1mm diámetro
              </p>
              <p>
                <strong>Talla 9:</strong> 18.9mm diámetro
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={() => setShowSizeGuide(false)}
            className="mt-3 text-sm text-primary-600 hover:text-primary-700"
          >
            Cerrar
          </button>
        </div>
      )}

      {/* Selection reminder */}
      {!selectedSize && (
        <p className="mt-2 text-sm text-amber-600">Por favor selecciona una talla</p>
      )}
    </div>
  );
}
