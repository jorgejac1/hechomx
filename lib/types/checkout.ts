/**
 * @fileoverview Type definitions for the checkout process.
 * Includes interfaces for shipping addresses, payment methods, gift options,
 * coupons, checkout form data, complete orders, and order summaries.
 * @module lib/types/checkout
 */

import { MexicanState } from '@/lib/constants/states';
import { OrderItem, OrderStatus } from './order';

/**
 * Shipping address for checkout
 */
export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  street: string;
  streetNumber: string;
  apartment?: string;
  neighborhood: string; // Colonia
  city: string;
  state: MexicanState;
  postalCode: string;
  references?: string; // Delivery references
}

/**
 * Payment method options
 */
export type PaymentMethod =
  | 'card' // Credit/Debit card
  | 'mercadopago' // Mercado Pago
  | 'oxxo' // OXXO cash payment
  | 'spei' // Bank transfer
  | 'paypal'; // PayPal

/**
 * Payment method display info
 */
export interface PaymentMethodInfo {
  id: PaymentMethod;
  name: string;
  description: string;
  icon: string;
  processingTime: string;
  available: boolean;
}

/**
 * Gift options
 */
export interface GiftOptions {
  isGift: boolean;
  giftWrap: boolean;
  giftMessage?: string;
}

/**
 * Applied coupon info saved with order
 */
export interface OrderCoupon {
  code: string;
  type: 'percentage' | 'free_shipping' | 'fixed';
  value: number;
  discountAmount: number;
}

/**
 * Checkout form data
 */
export interface CheckoutFormData {
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  saveAddress: boolean;
  acceptTerms: boolean;
  giftWrap?: boolean;
  giftMessage?: string;
  notes?: string;
  couponCode?: string;
}

/**
 * Complete order with all checkout info
 */
export interface CompleteOrder {
  id: string;
  orderNumber: string;
  userId?: string;
  userEmail?: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  giftWrapFee: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'processing' | 'completed' | 'failed';
  giftWrap: boolean;
  giftMessage?: string;
  coupon?: OrderCoupon;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery: string;
  tracking?: string;
}

/**
 * Checkout step
 */
export type CheckoutStep = 'shipping' | 'payment' | 'review';

/**
 * Checkout context state
 */
export interface CheckoutState {
  currentStep: CheckoutStep;
  shippingAddress: Partial<ShippingAddress>;
  paymentMethod: PaymentMethod | null;
  isProcessing: boolean;
  errors: Record<string, string>;
}

/**
 * Shipping cost calculation
 */
export interface ShippingOption {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  isFree: boolean;
}

/**
 * Order summary for display
 */
export interface OrderSummary {
  subtotal: number;
  shippingCost: number;
  discount: number;
  giftWrapFee: number;
  total: number;
  itemCount: number;
  freeShippingThreshold: number;
  amountToFreeShipping: number;
}

/**
 * Saved address from localStorage
 */
export interface SavedAddress extends ShippingAddress {
  id: string;
  isDefault: boolean;
  label?: string; // e.g., "Casa", "Oficina"
}
