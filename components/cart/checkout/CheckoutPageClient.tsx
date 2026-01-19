'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import { ShippingAddress, PaymentMethod, CompleteOrder } from '@/lib/types/checkout';
import { shippingAddressSchema } from '@/validators/checkout';
import { AppliedCoupon, applyCoupon } from '@/lib/utils/coupons';
import { AlertTriangle } from 'lucide-react';
import {
  generateOrderId,
  generateOrderNumber,
  calculateEstimatedDelivery,
  calculateShippingCost,
  saveOrder,
  saveAddress,
  generateAddressId,
} from '@/lib/utils/orders';
import ShippingForm from './ShippingForm';
import PaymentMethodSelector from './PaymentMethod';
import CheckoutSummary from './CheckoutSummary';
import { ROUTES } from '@/lib/constants/routes';
import { ArrowLeft, ShieldCheck, Truck, RefreshCcw, ChevronRight, AlertCircle } from 'lucide-react';

type CheckoutStep = 'shipping' | 'payment' | 'review';

interface FormErrors {
  [key: string]: string;
}

const GIFT_WRAP_COST = 50;

export default function CheckoutPageClient() {
  const router = useRouter();
  const { cartItems, cartTotal, cartCount, clearCart, removeFromCart } = useCart();
  const { success, error: toastError } = useToast();

  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [shippingAddress, setShippingAddress] = useState<Partial<ShippingAddress>>({});
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null);
  const [saveAddressChecked, setSaveAddressChecked] = useState(true);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  // Gift options state
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMessage, setGiftMessage] = useState('');

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);

  // Load coupon from sessionStorage (passed from cart)
  useEffect(() => {
    const storedCoupon = sessionStorage.getItem('checkout-coupon');
    if (storedCoupon) {
      try {
        const coupon = JSON.parse(storedCoupon) as AppliedCoupon;
        // Re-validate coupon with current cart total
        const baseShipping = calculateShippingCost(cartTotal, shippingAddress.state);
        const result = applyCoupon(coupon.code, cartTotal, baseShipping);
        if (result.success && result.appliedCoupon) {
          setAppliedCoupon(result.appliedCoupon);
        }
      } catch (e) {
        console.error('Error loading coupon:', e);
      }
    }
  }, [cartTotal, shippingAddress.state]);

  // Check for out of stock items
  const outOfStockItems = cartItems.filter((item) => !item.inStock);
  const hasStockIssues = outOfStockItems.length > 0;

  // Handle remove coupon
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    sessionStorage.removeItem('checkout-coupon');
  };

  // Redirect if cart is empty
  if (cartCount === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Agrega algunos productos a tu carrito para continuar con la compra.
        </p>
        <Link
          href={ROUTES.PRODUCTS}
          className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Explorar productos
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
    );
  }

  // Show warning if items are out of stock
  if (hasStockIssues && currentStep === 'shipping') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
          <AlertTriangle className="w-10 h-10 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Algunos productos no están disponibles
        </h2>
        <p className="text-gray-600 mb-6 max-w-md">
          Los siguientes productos en tu carrito ya no están en stock:
        </p>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 max-w-md w-full">
          <ul className="space-y-2">
            {outOfStockItems.map((item) => (
              <li key={item.id} className="flex items-center gap-3 text-left">
                <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <Image src={item.images[0]} alt={item.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-amber-700">No disponible</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href={ROUTES.CART}
            className="inline-flex items-center justify-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            Actualizar carrito
          </Link>
          <button
            onClick={() => {
              outOfStockItems.forEach((item) => {
                removeFromCart(item.id);
              });
            }}
            className="inline-flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Eliminar productos agotados
          </button>
        </div>
      </div>
    );
  }

  const validateShippingAddress = (): boolean => {
    const result = shippingAddressSchema.safeParse(shippingAddress);

    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const path = issue.path.join('.');
        newErrors[path] = issue.message;
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  const validatePaymentMethod = (): boolean => {
    if (!paymentMethod) {
      setErrors({ paymentMethod: 'Selecciona un método de pago' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateTerms = (): boolean => {
    if (!acceptTerms) {
      setErrors({ acceptTerms: 'Debes aceptar los términos y condiciones' });
      return false;
    }
    setErrors({});
    return true;
  };

  const handleContinueToPayment = () => {
    if (validateShippingAddress()) {
      setCurrentStep('payment');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleContinueToReview = () => {
    if (validatePaymentMethod()) {
      setCurrentStep('review');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePlaceOrder = async () => {
    if (!validateTerms()) return;

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Save address if checked
      if (saveAddressChecked && shippingAddress.firstName) {
        saveAddress({
          id: generateAddressId(),
          ...(shippingAddress as ShippingAddress),
          isDefault: true,
          label: 'Casa',
        });
      }

      // Calculate costs
      const baseShippingCost = calculateShippingCost(cartTotal, shippingAddress.state);
      const isFreeShippingCoupon = appliedCoupon?.type === 'free_shipping';
      const shippingCost = isFreeShippingCoupon ? 0 : baseShippingCost;
      const couponDiscount = appliedCoupon?.discountAmount || 0;
      const productDiscount = appliedCoupon && !isFreeShippingCoupon ? couponDiscount : 0;
      const giftWrapFee = giftWrap ? GIFT_WRAP_COST : 0;

      // Create order
      const order: CompleteOrder = {
        id: generateOrderId(),
        orderNumber: generateOrderNumber(),
        status: paymentMethod === 'oxxo' || paymentMethod === 'spei' ? 'pending' : 'confirmed',
        items: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          images: item.images,
          maker: item.maker,
          state: item.state,
        })),
        subtotal: cartTotal,
        shippingCost,
        discount: productDiscount,
        giftWrapFee,
        total: cartTotal + shippingCost + giftWrapFee - productDiscount,
        shippingAddress: shippingAddress as ShippingAddress,
        paymentMethod: paymentMethod!,
        paymentStatus:
          paymentMethod === 'oxxo' || paymentMethod === 'spei' ? 'pending' : 'completed',
        giftWrap,
        giftMessage: giftMessage || undefined,
        coupon: appliedCoupon
          ? {
              code: appliedCoupon.code,
              type: appliedCoupon.type,
              value: appliedCoupon.value,
              discountAmount: couponDiscount,
            }
          : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        estimatedDelivery: calculateEstimatedDelivery(shippingAddress.state || 'Ciudad de México'),
      };

      saveOrder(order);
      clearCart();
      sessionStorage.removeItem('checkout-coupon');

      // Track purchase event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'purchase', {
          transaction_id: order.id,
          value: order.total,
          currency: 'MXN',
          items: order.items.map((item) => ({
            item_id: item.id,
            item_name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
        });
      }

      success('¡Pedido realizado con éxito!');
      router.push(`/pedido-confirmado?orderId=${order.id}`);
    } catch (err) {
      console.error('Error placing order:', err);
      toastError('Hubo un error al procesar tu pedido. Inténtalo de nuevo.');
      setIsProcessing(false);
    }
  };

  const steps = [
    { id: 'shipping', label: 'Envío', number: 1 },
    { id: 'payment', label: 'Pago', number: 2 },
    { id: 'review', label: 'Confirmar', number: 3 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === currentStep);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                if (currentStep === 'shipping') {
                  router.push(ROUTES.CART);
                } else if (currentStep === 'payment') {
                  setCurrentStep('shipping');
                } else {
                  setCurrentStep('payment');
                }
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="hidden sm:inline">
                {currentStep === 'shipping' ? 'Volver al carrito' : 'Volver'}
              </span>
            </button>
            {/* Progress Steps */}
            <div className="flex items-center gap-2 sm:gap-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => {
                      if (index < currentStepIndex) {
                        setCurrentStep(step.id as CheckoutStep);
                      }
                    }}
                    disabled={index > currentStepIndex}
                    className={`
                      flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-colors
                      ${
                        index === currentStepIndex
                          ? 'bg-primary-600 text-white'
                          : index < currentStepIndex
                            ? 'bg-green-100 text-green-700 hover:bg-green-200 cursor-pointer'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-xs">
                      {index < currentStepIndex ? '✓' : step.number}
                    </span>
                    <span className="hidden sm:inline">{step.label}</span>
                  </button>
                  {index < steps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-gray-300 mx-1 hidden sm:block" />
                  )}
                </div>
              ))}
            </div>
            <div className="w-24" /> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-md p-6 sm:p-8">
              {/* Shipping Step */}
              {currentStep === 'shipping' && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Dirección de envío</h1>
                  <ShippingForm
                    value={shippingAddress}
                    onChange={setShippingAddress}
                    errors={errors}
                  />

                  {/* Save Address Checkbox */}
                  <div className="mt-6 pt-6 border-t">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveAddressChecked}
                        onChange={(e) => setSaveAddressChecked(e.target.checked)}
                        className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-600">
                        Guardar esta dirección para futuras compras
                      </span>
                    </label>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={handleContinueToPayment}
                      className="flex-1 bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                    >
                      Continuar al pago
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Método de pago</h1>
                  <PaymentMethodSelector
                    value={paymentMethod}
                    onChange={setPaymentMethod}
                    error={errors.paymentMethod}
                  />

                  <div className="mt-8 flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={handleContinueToReview}
                      className="flex-1 bg-primary-600 text-white py-4 rounded-xl font-bold hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                    >
                      Revisar pedido
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </>
              )}

              {/* Review Step */}
              {currentStep === 'review' && (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-6">Confirmar pedido</h1>

                  {/* Order Review */}
                  <div className="space-y-6">
                    {/* Shipping Summary */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">Enviar a:</h3>
                        <button
                          type="button"
                          onClick={() => setCurrentStep('shipping')}
                          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Cambiar
                        </button>
                      </div>
                      <p className="text-gray-600">
                        {shippingAddress.firstName} {shippingAddress.lastName}
                      </p>
                      <p className="text-gray-600">
                        {shippingAddress.street} {shippingAddress.streetNumber}
                        {shippingAddress.apartment && `, Int. ${shippingAddress.apartment}`}
                      </p>
                      <p className="text-gray-600">
                        {shippingAddress.neighborhood}, {shippingAddress.city},{' '}
                        {shippingAddress.state} {shippingAddress.postalCode}
                      </p>
                      <p className="text-gray-600">{shippingAddress.phone}</p>
                    </div>

                    {/* Payment Summary */}
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900">Método de pago:</h3>
                        <button
                          type="button"
                          onClick={() => setCurrentStep('payment')}
                          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                        >
                          Cambiar
                        </button>
                      </div>
                      <p className="text-gray-600 capitalize">
                        {paymentMethod === 'card' && 'Tarjeta de crédito o débito'}
                        {paymentMethod === 'mercadopago' && 'Mercado Pago'}
                        {paymentMethod === 'oxxo' && 'Pago en OXXO'}
                        {paymentMethod === 'spei' && 'Transferencia SPEI'}
                        {paymentMethod === 'paypal' && 'PayPal'}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Trust Badges */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg">
                <ShieldCheck className="w-8 h-8 text-green-600 mb-2" />
                <p className="text-xs sm:text-sm font-medium text-gray-700">Compra segura</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg">
                <Truck className="w-8 h-8 text-blue-600 mb-2" />
                <p className="text-xs sm:text-sm font-medium text-gray-700">Envío rastreable</p>
              </div>
              <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg">
                <RefreshCcw className="w-8 h-8 text-amber-600 mb-2" />
                <p className="text-xs sm:text-sm font-medium text-gray-700">Devolución fácil</p>
              </div>
            </div>
          </div>

          {/* Summary Sidebar */}
          <div className="lg:col-span-1">
            <CheckoutSummary
              shippingAddress={shippingAddress}
              isProcessing={isProcessing}
              onSubmit={currentStep === 'review' ? handlePlaceOrder : undefined}
              acceptTerms={acceptTerms}
              onAcceptTermsChange={setAcceptTerms}
              termsError={errors.acceptTerms}
              giftWrap={giftWrap}
              onGiftWrapChange={setGiftWrap}
              giftMessage={giftMessage}
              onGiftMessageChange={setGiftMessage}
              appliedCoupon={appliedCoupon}
              onRemoveCoupon={handleRemoveCoupon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
