import type { BuyerOrder } from '@/lib/types/buyer';
import type { CompleteOrder } from '@/lib/types/checkout';
import { getOrders } from '@/lib/utils/orders';

/**
 * Convert a CompleteOrder (from localStorage) to BuyerOrder format
 */
function convertToBuyerOrder(order: CompleteOrder): BuyerOrder {
  return {
    id: order.orderNumber,
    date: order.createdAt,
    status: order.status === 'pending' ? 'processing' : order.status,
    total: order.total,
    itemsCount: order.items.reduce((sum, item) => sum + item.quantity, 0),
    tracking: order.tracking,
    estimatedDelivery: order.estimatedDelivery,
    actualDelivery: order.status === 'delivered' ? order.updatedAt : undefined,
    items: order.items.map((item) => {
      const makerName = item.maker || 'Artesano Mexicano';
      return {
        id: item.id,
        name: item.name,
        image: item.images[0] || '/placeholder.jpg',
        price: item.price,
        quantity: item.quantity,
        artisan: {
          id: makerName.toLowerCase().replace(/\s+/g, '-'),
          name: makerName,
          shopName: makerName,
        },
      };
    }),
    shippingAddress: {
      name: `${order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
      street: `${order.shippingAddress.street} ${order.shippingAddress.streetNumber}${order.shippingAddress.apartment ? `, Int. ${order.shippingAddress.apartment}` : ''}`,
      city: order.shippingAddress.city,
      state: order.shippingAddress.state,
      zipCode: order.shippingAddress.postalCode,
      phone: order.shippingAddress.phone,
    },
    timeline: generateTimeline(order),
    reviewed: false,
    canReview: order.status === 'delivered',
    canReorder: order.status === 'delivered' || order.status === 'cancelled',
  };
}

/**
 * Generate order timeline based on status
 */
function generateTimeline(order: CompleteOrder): BuyerOrder['timeline'] {
  const timeline: BuyerOrder['timeline'] = [
    {
      status: 'created',
      date: order.createdAt,
      description: 'Pedido realizado',
    },
  ];

  if (order.paymentStatus === 'completed' || order.status !== 'pending') {
    timeline.push({
      status: 'confirmed',
      date: order.createdAt,
      description: 'Pago confirmado',
    });
  }

  if (order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered') {
    timeline.push({
      status: 'processing',
      date: order.updatedAt,
      description: 'Pedido en preparación',
    });
  }

  if (order.status === 'shipped' || order.status === 'delivered') {
    timeline.push({
      status: 'shipped',
      date: order.updatedAt,
      description: 'Pedido enviado',
      carrier: 'Estafeta',
    });
  }

  if (order.status === 'delivered') {
    timeline.push({
      status: 'delivered',
      date: order.updatedAt,
      description: 'Pedido entregado',
    });
  }

  if (order.status === 'cancelled') {
    timeline.push({
      status: 'cancelled',
      date: order.updatedAt,
      description: 'Pedido cancelado',
      reason: 'Cancelado por el cliente',
    });
  }

  return timeline;
}

/**
 * Get orders from localStorage
 */
function getLocalStorageOrders(): BuyerOrder[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const localOrders = getOrders();
    return localOrders.map(convertToBuyerOrder);
  } catch (error) {
    console.error('Error loading localStorage orders:', error);
    return [];
  }
}

/**
 * Fetch buyer orders - combines localStorage orders with mock API data
 */
export async function getBuyerOrders(userEmail: string): Promise<BuyerOrder[]> {
  // Get real orders from localStorage first
  const localOrders = getLocalStorageOrders();

  try {
    // Also fetch mock data from API (for demo purposes)
    const response = await fetch(`/api/buyer/orders?email=${encodeURIComponent(userEmail)}`);
    const result = await response.json();

    if (!result.success) {
      console.error('Failed to fetch buyer orders:', result.error);
      return localOrders;
    }

    const mockOrders: BuyerOrder[] = result.data;

    // Merge: real orders first, then mock orders
    const localOrderIds = new Set(localOrders.map((o) => o.id));
    const filteredMockOrders = mockOrders.filter((o) => !localOrderIds.has(o.id));

    return [...localOrders, ...filteredMockOrders];
  } catch (error) {
    console.error('Error loading buyer orders:', error);
    return localOrders;
  }
}
