/**
 * @fileoverview Core order type definitions shared across the application.
 * Defines order status types, order items, customer information,
 * and the main Order interface used by both buyers and sellers.
 * @module lib/types/order
 */

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  images: string[];
  maker: string;
  state?: string;
}

export interface OrderCustomer {
  name: string;
  email: string;
}

export interface Order {
  id: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
  createdAt: string;
  customer: OrderCustomer;
  tracking?: string;
}
