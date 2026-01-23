/**
 * @fileoverview Payment method selector component for the checkout flow.
 * Displays available payment options including card, Mercado Pago, OXXO, SPEI, and PayPal.
 * Shows processing times, security notices, and method-specific information panels.
 * @module components/cart/checkout/PaymentMethod
 */

'use client';

import { PaymentMethod, PaymentMethodInfo } from '@/lib/types/checkout';
import {
  CreditCard,
  Wallet,
  Store,
  Building2,
  CircleDollarSign,
  Clock,
  AlertCircle,
} from 'lucide-react';
import RadioGroup from '@/components/common/RadioGroup';

/**
 * Props for the PaymentMethodSelector component
 * @interface PaymentMethodSelectorProps
 */
interface PaymentMethodSelectorProps {
  /** Currently selected payment method */
  value: PaymentMethod | null;
  /** Callback when payment method selection changes */
  onChange: (method: PaymentMethod) => void;
  /** Validation error message */
  error?: string;
}

const PAYMENT_METHODS: PaymentMethodInfo[] = [
  {
    id: 'card',
    name: 'Tarjeta de crédito o débito',
    description: 'Visa, Mastercard, American Express',
    icon: 'card',
    processingTime: 'Inmediato',
    available: true,
  },
  {
    id: 'mercadopago',
    name: 'Mercado Pago',
    description: 'Paga con tu cuenta de Mercado Pago',
    icon: 'mercadopago',
    processingTime: 'Inmediato',
    available: true,
  },
  {
    id: 'oxxo',
    name: 'Pago en OXXO',
    description: 'Genera tu ficha y paga en efectivo',
    icon: 'oxxo',
    processingTime: '1-3 días hábiles',
    available: true,
  },
  {
    id: 'spei',
    name: 'Transferencia SPEI',
    description: 'Transferencia bancaria interbancaria',
    icon: 'spei',
    processingTime: '1-24 horas',
    available: true,
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Paga con tu cuenta PayPal',
    icon: 'paypal',
    processingTime: 'Inmediato',
    available: false, // Coming soon
  },
];

function PaymentIcon({ type, className }: { type: string; className?: string }) {
  switch (type) {
    case 'card':
      return <CreditCard className={className} />;
    case 'mercadopago':
      return <Wallet className={className} />;
    case 'oxxo':
      return <Store className={className} />;
    case 'spei':
      return <Building2 className={className} />;
    case 'paypal':
      return <CircleDollarSign className={className} />;
    default:
      return <CreditCard className={className} />;
  }
}

export default function PaymentMethodSelector({
  value,
  onChange,
  error,
}: PaymentMethodSelectorProps) {
  const options = PAYMENT_METHODS.map((method) => ({
    value: method.id,
    label: (
      <div className="flex items-center gap-2">
        <span>{method.name}</span>
        {!method.available && (
          <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-sm">
            Próximamente
          </span>
        )}
      </div>
    ),
    description: (
      <div>
        <p>{method.description}</p>
        <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
          <Clock className="w-3 h-3" />
          <span>{method.processingTime}</span>
        </div>
      </div>
    ),
    icon: <PaymentIcon type={method.icon} className="w-6 h-6" />,
    disabled: !method.available,
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <CreditCard className="w-5 h-5 text-primary-600" />
        Método de pago
      </h3>

      <RadioGroup
        value={value || ''}
        onChange={(val) => onChange(val as PaymentMethod)}
        options={options}
        variant="cards"
        error={error}
      />

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-lg">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Payment Security Notice */}
      <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="font-medium text-green-800">Pago 100% seguro</p>
            <p className="text-sm text-green-700 mt-1">
              Tu información de pago está protegida con encriptación SSL de 256 bits. Nunca
              almacenamos los datos completos de tu tarjeta.
            </p>
          </div>
        </div>
      </div>

      {/* Selected method specific info */}
      {value === 'oxxo' && (
        <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Store className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-amber-800">Pago en OXXO</p>
              <p className="text-sm text-amber-700 mt-1">
                Al confirmar, recibirás una ficha de pago con un código de barras. Tendrás 72 horas
                para pagar en cualquier tienda OXXO. Tu pedido se procesará una vez confirmado el
                pago.
              </p>
            </div>
          </div>
        </div>
      )}

      {value === 'spei' && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-blue-800">Transferencia SPEI</p>
              <p className="text-sm text-blue-700 mt-1">
                Recibirás los datos de la cuenta CLABE para realizar la transferencia desde tu banca
                en línea. El pago se confirma automáticamente en minutos.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
