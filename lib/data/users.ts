/**
 * @fileoverview Mock user data for admin dashboard and testing.
 * Provides sample buyer, seller, and admin user records
 * for development, demos, and admin user management views.
 * @module lib/data/users
 */

export interface MockUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'buyer' | 'seller' | 'admin';
  status: 'active' | 'suspended' | 'pending';
  joinedAt: string;
  lastActive: string;
  orders?: number;
  sales?: number;
  shopName?: string;
  verified?: boolean;
}

export const mockUsers: MockUser[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@ejemplo.com',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'buyer',
    status: 'active',
    joinedAt: '2024-01-15',
    lastActive: '2025-01-18',
    orders: 12,
  },
  {
    id: '2',
    name: 'María González',
    email: 'maria@ejemplo.com',
    avatar: 'https://i.pravatar.cc/150?img=45',
    role: 'buyer',
    status: 'active',
    joinedAt: '2024-02-20',
    lastActive: '2025-01-17',
    orders: 8,
  },
  {
    id: '3',
    name: 'Sofía Martínez',
    email: 'sofia@ejemplo.com',
    avatar: 'https://i.pravatar.cc/150?img=32',
    role: 'seller',
    status: 'active',
    joinedAt: '2024-03-10',
    lastActive: '2025-01-18',
    sales: 156,
    shopName: 'Tejidos Sofía',
    verified: true,
  },
  {
    id: '4',
    name: 'Pedro Ramírez',
    email: 'pedro@ejemplo.com',
    avatar: 'https://i.pravatar.cc/150?img=53',
    role: 'seller',
    status: 'active',
    joinedAt: '2024-04-05',
    lastActive: '2025-01-16',
    sales: 234,
    shopName: 'Alebrijes Don Pedro',
    verified: true,
  },
  {
    id: '5',
    name: 'Carmen Ruiz',
    email: 'carmen@ceramica.com',
    avatar: 'https://i.pravatar.cc/150?img=25',
    role: 'seller',
    status: 'pending',
    joinedAt: '2025-01-10',
    lastActive: '2025-01-18',
    sales: 0,
    shopName: 'Cerámica Tradicional Carmen',
    verified: false,
  },
  {
    id: '6',
    name: 'Roberto López',
    email: 'roberto@ejemplo.com',
    avatar: 'https://i.pravatar.cc/150?img=60',
    role: 'buyer',
    status: 'suspended',
    joinedAt: '2024-06-15',
    lastActive: '2024-12-01',
    orders: 3,
  },
  {
    id: '7',
    name: 'Admin Principal',
    email: 'admin@papalote.com',
    avatar: 'https://i.pravatar.cc/150?img=68',
    role: 'admin',
    status: 'active',
    joinedAt: '2024-01-01',
    lastActive: '2025-01-18',
  },
];
