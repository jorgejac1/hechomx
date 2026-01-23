/**
 * @fileoverview Order and address management utilities.
 * Provides functions for order creation, storage, status updates, shipping calculations,
 * saved addresses management, and seller order notifications using localStorage.
 * @module lib/utils/orders
 */

import { CompleteOrder, SavedAddress } from '@/lib/types/checkout';

const ORDERS_KEY = 'papalote-orders';
const ADDRESSES_KEY = 'papalote-addresses';

/**
 * Generate unique order ID
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `ORD-${timestamp}-${random}`.toUpperCase();
}

/**
 * Generate order number (human-readable)
 */
export function generateOrderNumber(): string {
  const date = new Date();
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `PM${year}${month}-${random}`;
}

/**
 * Calculate estimated delivery date
 */
export function calculateEstimatedDelivery(state: string): string {
  // Remote states take longer
  const remoteStates = [
    'Baja California',
    'Baja California Sur',
    'Chiapas',
    'Quintana Roo',
    'Yucatán',
    'Sonora',
    'Chihuahua',
  ];

  const baseDays = remoteStates.includes(state) ? 7 : 5;
  const maxDays = baseDays + 3;

  const startDate = new Date();
  startDate.setDate(startDate.getDate() + baseDays);

  const endDate = new Date();
  endDate.setDate(endDate.getDate() + maxDays);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-MX', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    });
  };

  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

/**
 * Save order to localStorage
 */
export function saveOrder(order: CompleteOrder): void {
  try {
    const orders = getOrders();
    orders.unshift(order); // Add to beginning (newest first)
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  } catch (error) {
    console.error('[orders] Error saving order:', error);
    throw new Error('No se pudo guardar el pedido');
  }
}

/**
 * Get all orders from localStorage
 */
export function getOrders(): CompleteOrder[] {
  try {
    const stored = localStorage.getItem(ORDERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('[orders] Error loading orders:', error);
    return [];
  }
}

/**
 * Get single order by ID
 */
export function getOrderById(orderId: string): CompleteOrder | null {
  const orders = getOrders();
  return orders.find((order) => order.id === orderId) || null;
}

/**
 * Get order by order number
 */
export function getOrderByNumber(orderNumber: string): CompleteOrder | null {
  const orders = getOrders();
  return orders.find((order) => order.orderNumber === orderNumber) || null;
}

/**
 * Update order status
 */
export function updateOrderStatus(
  orderId: string,
  status: CompleteOrder['status'],
  tracking?: string
): CompleteOrder | null {
  try {
    const orders = getOrders();
    const index = orders.findIndex((order) => order.id === orderId);

    if (index === -1) return null;

    orders[index] = {
      ...orders[index],
      status,
      tracking: tracking || orders[index].tracking,
      updatedAt: new Date().toISOString(),
    };

    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    return orders[index];
  } catch (error) {
    console.error('[orders] Error updating order:', error);
    return null;
  }
}

/**
 * Save address to localStorage
 */
export function saveAddress(address: SavedAddress): void {
  try {
    const addresses = getSavedAddresses();

    // If this is set as default, unset others
    if (address.isDefault) {
      addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    // Check if updating existing
    const existingIndex = addresses.findIndex((addr) => addr.id === address.id);
    if (existingIndex !== -1) {
      addresses[existingIndex] = address;
    } else {
      addresses.push(address);
    }

    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
  } catch (error) {
    console.error('[orders] Error saving address:', error);
    throw new Error('No se pudo guardar la dirección');
  }
}

/**
 * Get saved addresses from localStorage
 */
export function getSavedAddresses(): SavedAddress[] {
  try {
    const stored = localStorage.getItem(ADDRESSES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('[orders] Error loading addresses:', error);
    return [];
  }
}

/**
 * Get default address
 */
export function getDefaultAddress(): SavedAddress | null {
  const addresses = getSavedAddresses();
  return addresses.find((addr) => addr.isDefault) || addresses[0] || null;
}

/**
 * Delete saved address
 */
export function deleteAddress(addressId: string): void {
  try {
    const addresses = getSavedAddresses().filter((addr) => addr.id !== addressId);
    localStorage.setItem(ADDRESSES_KEY, JSON.stringify(addresses));
  } catch (error) {
    console.error('[orders] Error deleting address:', error);
    throw new Error('No se pudo eliminar la dirección');
  }
}

/**
 * Generate address ID
 */
export function generateAddressId(): string {
  return `addr-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
}

/**
 * Calculate shipping cost
 */
export function calculateShippingCost(subtotal: number, state?: string): number {
  const FREE_SHIPPING_THRESHOLD = 1000;
  const BASE_SHIPPING = 150;

  // Free shipping for orders over threshold
  if (subtotal >= FREE_SHIPPING_THRESHOLD) {
    return 0;
  }

  // Remote states have higher shipping
  const remoteStates = [
    'Baja California',
    'Baja California Sur',
    'Chiapas',
    'Quintana Roo',
    'Yucatán',
    'Sonora',
    'Chihuahua',
  ];

  if (state && remoteStates.includes(state)) {
    return BASE_SHIPPING + 50;
  }

  return BASE_SHIPPING;
}

// ============================================
// SELLER ORDER NOTIFICATIONS
// ============================================

const SEEN_ORDERS_KEY = 'papalote-seen-orders';

/**
 * Get orders that contain items from a specific seller
 */
export function getOrdersForSeller(sellerName: string): CompleteOrder[] {
  const orders = getOrders();
  return orders.filter((order) =>
    order.items.some((item) => item.maker.toLowerCase() === sellerName.toLowerCase())
  );
}

/**
 * Get seen order IDs for a seller
 */
export function getSeenOrderIds(sellerName: string): string[] {
  try {
    const stored = localStorage.getItem(SEEN_ORDERS_KEY);
    const seenMap: Record<string, string[]> = stored ? JSON.parse(stored) : {};
    return seenMap[sellerName.toLowerCase()] || [];
  } catch (error) {
    console.error('[orders] Error loading seen orders:', error);
    return [];
  }
}

/**
 * Get new (unseen) orders for a seller
 */
export function getNewOrdersForSeller(sellerName: string): CompleteOrder[] {
  const sellerOrders = getOrdersForSeller(sellerName);
  const seenIds = getSeenOrderIds(sellerName);
  return sellerOrders.filter((order) => !seenIds.includes(order.id));
}

/**
 * Mark orders as seen for a seller
 */
export function markOrdersAsSeen(sellerName: string, orderIds: string[]): void {
  try {
    const stored = localStorage.getItem(SEEN_ORDERS_KEY);
    const seenMap: Record<string, string[]> = stored ? JSON.parse(stored) : {};
    const key = sellerName.toLowerCase();
    const existingIds = seenMap[key] || [];

    // Merge and deduplicate
    seenMap[key] = [...new Set([...existingIds, ...orderIds])];

    localStorage.setItem(SEEN_ORDERS_KEY, JSON.stringify(seenMap));
  } catch (error) {
    console.error('[orders] Error marking orders as seen:', error);
  }
}

/**
 * Mark all current orders as seen for a seller
 */
export function markAllOrdersAsSeen(sellerName: string): void {
  const sellerOrders = getOrdersForSeller(sellerName);
  const orderIds = sellerOrders.map((order) => order.id);
  markOrdersAsSeen(sellerName, orderIds);
}

/**
 * Get order items for a specific seller from an order
 */
export function getSellerItemsFromOrder(
  order: CompleteOrder,
  sellerName: string
): CompleteOrder['items'] {
  return order.items.filter((item) => item.maker.toLowerCase() === sellerName.toLowerCase());
}

/**
 * Calculate seller's portion of an order
 */
export function calculateSellerOrderTotal(order: CompleteOrder, sellerName: string): number {
  const sellerItems = getSellerItemsFromOrder(order, sellerName);
  return sellerItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
