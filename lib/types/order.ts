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
