import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Breadcrumbs from '@/components/common/Breadcrumbs';

/**
 * Breadcrumbs component for displaying hierarchical navigation path.
 * Renders a list of links with chevron separators.
 */
const meta: Meta<typeof Breadcrumbs> = {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A breadcrumb navigation component that displays the current page location within a hierarchical structure.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Productos', href: '/productos' },
      { label: 'Textiles' },
    ],
  },
};

// Two levels
export const TwoLevels: Story = {
  args: {
    items: [{ label: 'Inicio', href: '/' }, { label: 'Mi cuenta' }],
  },
};

// Deep navigation
export const DeepNavigation: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Productos', href: '/productos' },
      { label: 'Textiles', href: '/productos?categoria=textiles' },
      { label: 'Rebozos', href: '/productos?categoria=textiles&subcategoria=rebozos' },
      { label: 'Rebozo de Seda Oaxaqueño' },
    ],
  },
};

// Product page
export const ProductPage: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Productos', href: '/productos' },
      { label: 'Cerámica', href: '/productos?categoria=ceramica' },
      { label: 'Vasija de Barro Negro' },
    ],
  },
};

// Dashboard
export const Dashboard: Story = {
  args: {
    items: [
      { label: 'Dashboard', href: '/dashboard' },
      { label: 'Mis productos', href: '/dashboard/productos' },
      { label: 'Editar producto' },
    ],
  },
};

// Admin panel
export const AdminPanel: Story = {
  args: {
    items: [
      { label: 'Admin', href: '/admin' },
      { label: 'Usuarios', href: '/admin/usuarios' },
      { label: 'Detalle de usuario' },
    ],
  },
};

// Orders
export const Orders: Story = {
  args: {
    items: [
      { label: 'Mi cuenta', href: '/cuenta' },
      { label: 'Mis pedidos', href: '/pedidos' },
      { label: 'Pedido #12345' },
    ],
  },
};

// Artisan profile
export const ArtisanProfile: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Artesanos', href: '/artesanos' },
      { label: 'María García' },
    ],
  },
};

// Shop page
export const ShopPage: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Tiendas', href: '/tiendas' },
      { label: 'Artesanías Oaxaqueñas' },
    ],
  },
};

// Checkout
export const Checkout: Story = {
  args: {
    items: [{ label: 'Carrito', href: '/carrito' }, { label: 'Checkout' }],
  },
};

// Help section
export const HelpSection: Story = {
  args: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Centro de ayuda', href: '/ayuda' },
      { label: 'Envíos y devoluciones' },
    ],
  },
};

// Single item (just current page)
export const SingleItem: Story = {
  args: {
    items: [{ label: 'Inicio' }],
  },
};
