/**
 * @fileoverview Navigation configuration for the Papalote Market application.
 * Defines the structure for main navigation, footer links, user account menu,
 * and mobile navigation with support for nested items and category filtering.
 * @module config/navigation
 */

import { ROUTES } from '@/lib/constants/routes';

export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  badge?: string;
  children?: NavItem[];
  featured?: boolean;
}

export const mainNavigation: NavItem[] = [
  {
    label: 'Inicio',
    href: ROUTES.HOME,
  },
  {
    label: 'Productos',
    href: ROUTES.PRODUCTS,
    children: [
      {
        label: 'Todas las Categorías',
        href: ROUTES.PRODUCTS,
        featured: true,
      },
      {
        label: 'Textiles y Ropa',
        href: `${ROUTES.PRODUCTS}?categoria=Textiles y Ropa`,
      },
      {
        label: 'Cerámica y Alfarería',
        href: `${ROUTES.PRODUCTS}?categoria=Cerámica y Alfarería`,
      },
      {
        label: 'Joyería',
        href: `${ROUTES.PRODUCTS}?categoria=Joyería`,
      },
      {
        label: 'Madera y Tallado',
        href: `${ROUTES.PRODUCTS}?categoria=Madera y Tallado`,
      },
      {
        label: 'Cuero y Piel',
        href: `${ROUTES.PRODUCTS}?categoria=Cuero y Piel`,
      },
      {
        label: 'Ver todas →',
        href: ROUTES.PRODUCTS,
        featured: true,
      },
    ],
  },
  {
    label: 'Estados',
    href: ROUTES.PRODUCTS,
    children: [
      {
        label: 'Oaxaca',
        href: `${ROUTES.PRODUCTS}?estado=Oaxaca`,
      },
      {
        label: 'Chiapas',
        href: `${ROUTES.PRODUCTS}?estado=Chiapas`,
      },
      {
        label: 'Michoacán',
        href: `${ROUTES.PRODUCTS}?estado=Michoacán`,
      },
      {
        label: 'Puebla',
        href: `${ROUTES.PRODUCTS}?estado=Puebla`,
      },
      {
        label: 'Guanajuato',
        href: `${ROUTES.PRODUCTS}?estado=Guanajuato`,
      },
      {
        label: 'Ver todos →',
        href: ROUTES.PRODUCTS,
        featured: true,
      },
    ],
  },
  {
    label: 'Nosotros',
    href: ROUTES.ABOUT,
  },
  {
    label: 'Contacto',
    href: ROUTES.CONTACT,
  },
];

export const footerNavigation = {
  shop: {
    title: 'Comprar',
    items: [
      { label: 'Todos los Productos', href: ROUTES.PRODUCTS },
      { label: 'Destacados', href: `${ROUTES.PRODUCTS}?destacado=si` },
      { label: 'Nuevos Productos', href: `${ROUTES.PRODUCTS}?ordenar=newest` },
      { label: 'Ofertas', href: `${ROUTES.PRODUCTS}?ordenar=price-asc` },
    ],
  },
  about: {
    title: 'Acerca de',
    items: [
      { label: 'Nuestra Historia', href: ROUTES.ABOUT },
      { label: 'Tiendas Artesanales', href: ROUTES.SHOPS },
      { label: 'Blog', href: ROUTES.BLOG },
      { label: 'Contacto', href: ROUTES.CONTACT },
    ],
  },
  help: {
    title: 'Ayuda',
    items: [
      { label: 'Preguntas Frecuentes', href: ROUTES.FAQ },
      { label: 'Envíos', href: ROUTES.SHIPPING_INFO },
      { label: 'Devoluciones', href: ROUTES.RETURNS_POLICY },
      { label: 'Métodos de Pago', href: ROUTES.PAYMENT_INFO },
    ],
  },
  legal: {
    title: 'Legal',
    items: [
      { label: 'Términos y Condiciones', href: ROUTES.TERMS },
      { label: 'Política de Privacidad', href: ROUTES.PRIVACY },
      { label: 'Política de Cookies', href: ROUTES.COOKIES },
      { label: 'Aviso Legal', href: ROUTES.LEGAL_NOTICE },
    ],
  },
};

export const userNavigation: NavItem[] = [
  {
    label: 'Mi Cuenta',
    href: ROUTES.ACCOUNT,
    icon: 'user',
  },
  {
    label: 'Mis Pedidos',
    href: ROUTES.ORDERS,
    icon: 'package',
  },
  {
    label: 'Lista de Deseos',
    href: ROUTES.WISHLIST,
    icon: 'heart',
  },
  {
    label: 'Comparar',
    href: ROUTES.COMPARISON,
    icon: 'compare',
  },
  {
    label: 'Cerrar Sesión',
    href: '/logout',
    icon: 'logout',
  },
];

export const mobileNavigation: NavItem[] = [
  {
    label: 'Inicio',
    href: ROUTES.HOME,
    icon: 'home',
  },
  {
    label: 'Productos',
    href: ROUTES.PRODUCTS,
    icon: 'grid',
  },
  {
    label: 'Comparar',
    href: ROUTES.COMPARISON,
    icon: 'compare',
  },
  {
    label: 'Carrito',
    href: ROUTES.CART,
    icon: 'cart',
    badge: 'cartCount',
  },
  {
    label: 'Cuenta',
    href: ROUTES.ACCOUNT,
    icon: 'user',
  },
];
