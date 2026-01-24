import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Package, Users, Settings, ShoppingCart, Heart, Bell } from 'lucide-react';
import Tabs, { TabItem } from '@/components/common/Tabs';

/**
 * Tabs component system for organizing content into switchable panels.
 * Supports multiple visual variants (underline, pills, boxed), icons, badges, and counts.
 */
const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A compound tabs component with support for underline, pills, and boxed variants. Features icons, badges, counts, and disabled states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['underline', 'pills', 'boxed'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic tabs data
const basicTabs: TabItem[] = [
  { id: 'productos', label: 'Productos' },
  { id: 'descripcion', label: 'Descripción' },
  { id: 'opiniones', label: 'Opiniones' },
];

// Default underline tabs
export const Default: Story = {
  render: () => (
    <Tabs defaultTab="productos">
      <Tabs.List tabs={basicTabs} />
      <Tabs.Panels className="mt-4">
        <Tabs.Panel tabId="productos">
          <p className="text-gray-600">Contenido de productos...</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="descripcion">
          <p className="text-gray-600">Descripción del producto...</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="opiniones">
          <p className="text-gray-600">Opiniones de los clientes...</p>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

// Pills variant
export const Pills: Story = {
  render: () => (
    <Tabs defaultTab="productos" variant="pills">
      <Tabs.List tabs={basicTabs} />
      <Tabs.Panels className="mt-4">
        <Tabs.Panel tabId="productos">
          <p className="text-gray-600">Vista de productos en pills...</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="descripcion">
          <p className="text-gray-600">Descripción del producto...</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="opiniones">
          <p className="text-gray-600">Opiniones de los clientes...</p>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

// Boxed variant
export const Boxed: Story = {
  render: () => (
    <Tabs defaultTab="productos" variant="boxed">
      <Tabs.List tabs={basicTabs} />
      <Tabs.Panels className="mt-4">
        <Tabs.Panel tabId="productos">
          <p className="text-gray-600">Vista de productos en boxed...</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="descripcion">
          <p className="text-gray-600">Descripción del producto...</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="opiniones">
          <p className="text-gray-600">Opiniones de los clientes...</p>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

// With icons
const tabsWithIcons: TabItem[] = [
  { id: 'productos', label: 'Productos', icon: Package },
  { id: 'clientes', label: 'Clientes', icon: Users },
  { id: 'configuracion', label: 'Configuración', icon: Settings },
];

export const WithIcons: Story = {
  render: () => (
    <Tabs defaultTab="productos">
      <Tabs.List tabs={tabsWithIcons} />
      <Tabs.Panels className="mt-4">
        <Tabs.Panel tabId="productos">
          <p className="text-gray-600">Gestión de productos...</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="clientes">
          <p className="text-gray-600">Lista de clientes...</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="configuracion">
          <p className="text-gray-600">Ajustes del sistema...</p>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

// With counts
const tabsWithCounts: TabItem[] = [
  { id: 'todos', label: 'Todos', count: 128 },
  { id: 'activos', label: 'Activos', count: 85 },
  { id: 'pendientes', label: 'Pendientes', count: 23 },
  { id: 'archivados', label: 'Archivados', count: 20 },
];

export const WithCounts: Story = {
  render: () => (
    <Tabs defaultTab="todos">
      <Tabs.List tabs={tabsWithCounts} />
      <Tabs.Panels className="mt-4">
        <Tabs.Panel tabId="todos">
          <p className="text-gray-600">Mostrando 128 productos...</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="activos">
          <p className="text-gray-600">Mostrando 85 productos activos...</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="pendientes">
          <p className="text-gray-600">Mostrando 23 productos pendientes...</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="archivados">
          <p className="text-gray-600">Mostrando 20 productos archivados...</p>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

// With badges (notifications)
const tabsWithBadges: TabItem[] = [
  { id: 'carrito', label: 'Carrito', icon: ShoppingCart, badge: 3 },
  { id: 'favoritos', label: 'Favoritos', icon: Heart, badge: 12 },
  { id: 'notificaciones', label: 'Notificaciones', icon: Bell, badge: 5 },
];

export const WithBadges: Story = {
  render: () => (
    <Tabs defaultTab="carrito" variant="pills">
      <Tabs.List tabs={tabsWithBadges} />
      <Tabs.Panels className="mt-4">
        <Tabs.Panel tabId="carrito">
          <p className="text-gray-600">3 productos en tu carrito...</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="favoritos">
          <p className="text-gray-600">12 productos favoritos...</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="notificaciones">
          <p className="text-gray-600">5 notificaciones nuevas...</p>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

// With disabled tab
const tabsWithDisabled: TabItem[] = [
  { id: 'activo', label: 'Activo' },
  { id: 'proximamente', label: 'Próximamente', disabled: true },
  { id: 'otro', label: 'Otro' },
];

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultTab="activo">
      <Tabs.List tabs={tabsWithDisabled} />
      <Tabs.Panels className="mt-4">
        <Tabs.Panel tabId="activo">
          <p className="text-gray-600">Contenido activo...</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="proximamente">
          <p className="text-gray-600">Próximamente...</p>
        </Tabs.Panel>
        <Tabs.Panel tabId="otro">
          <p className="text-gray-600">Otro contenido...</p>
        </Tabs.Panel>
      </Tabs.Panels>
    </Tabs>
  ),
};

// Sizes
export const SizeSmall: Story = {
  render: () => (
    <Tabs defaultTab="tab1" size="sm">
      <Tabs.List
        tabs={[
          { id: 'tab1', label: 'Tab 1' },
          { id: 'tab2', label: 'Tab 2' },
          { id: 'tab3', label: 'Tab 3' },
        ]}
      />
    </Tabs>
  ),
};

export const SizeMedium: Story = {
  render: () => (
    <Tabs defaultTab="tab1" size="md">
      <Tabs.List
        tabs={[
          { id: 'tab1', label: 'Tab 1' },
          { id: 'tab2', label: 'Tab 2' },
          { id: 'tab3', label: 'Tab 3' },
        ]}
      />
    </Tabs>
  ),
};

export const SizeLarge: Story = {
  render: () => (
    <Tabs defaultTab="tab1" size="lg">
      <Tabs.List
        tabs={[
          { id: 'tab1', label: 'Tab 1' },
          { id: 'tab2', label: 'Tab 2' },
          { id: 'tab3', label: 'Tab 3' },
        ]}
      />
    </Tabs>
  ),
};

// Full width
export const FullWidth: Story = {
  render: () => (
    <Tabs defaultTab="tab1" variant="boxed">
      <Tabs.List
        tabs={[
          { id: 'tab1', label: 'Productos' },
          { id: 'tab2', label: 'Descripción' },
          { id: 'tab3', label: 'Opiniones' },
        ]}
        fullWidth
      />
    </Tabs>
  ),
};

// Controlled example
export const Controlled: Story = {
  render: function ControlledTabs() {
    const [activeTab, setActiveTab] = useState('tab1');

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('tab1')}
            className="px-3 py-1 text-sm bg-gray-100 rounded"
          >
            Go to Tab 1
          </button>
          <button
            onClick={() => setActiveTab('tab2')}
            className="px-3 py-1 text-sm bg-gray-100 rounded"
          >
            Go to Tab 2
          </button>
        </div>

        <Tabs activeTab={activeTab} onTabChange={setActiveTab}>
          <Tabs.List
            tabs={[
              { id: 'tab1', label: 'Tab 1' },
              { id: 'tab2', label: 'Tab 2' },
              { id: 'tab3', label: 'Tab 3' },
            ]}
          />
          <Tabs.Panels className="mt-4">
            <Tabs.Panel tabId="tab1">
              <p className="text-gray-600">Contenido del Tab 1</p>
            </Tabs.Panel>
            <Tabs.Panel tabId="tab2">
              <p className="text-gray-600">Contenido del Tab 2</p>
            </Tabs.Panel>
            <Tabs.Panel tabId="tab3">
              <p className="text-gray-600">Contenido del Tab 3</p>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </div>
    );
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">Underline</p>
        <Tabs defaultTab="tab1" variant="underline">
          <Tabs.List
            tabs={[
              { id: 'tab1', label: 'Tab 1' },
              { id: 'tab2', label: 'Tab 2' },
              { id: 'tab3', label: 'Tab 3' },
            ]}
          />
        </Tabs>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">Pills</p>
        <Tabs defaultTab="tab1" variant="pills">
          <Tabs.List
            tabs={[
              { id: 'tab1', label: 'Tab 1' },
              { id: 'tab2', label: 'Tab 2' },
              { id: 'tab3', label: 'Tab 3' },
            ]}
          />
        </Tabs>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500 mb-2">Boxed</p>
        <Tabs defaultTab="tab1" variant="boxed">
          <Tabs.List
            tabs={[
              { id: 'tab1', label: 'Tab 1' },
              { id: 'tab2', label: 'Tab 2' },
              { id: 'tab3', label: 'Tab 3' },
            ]}
          />
        </Tabs>
      </div>
    </div>
  ),
};

// Dashboard tabs example
export const DashboardTabs: Story = {
  render: () => {
    const dashboardTabs: TabItem[] = [
      { id: 'resumen', label: 'Resumen', icon: Package },
      { id: 'pedidos', label: 'Pedidos', icon: ShoppingCart, count: 24 },
      { id: 'clientes', label: 'Clientes', icon: Users, count: 156 },
      { id: 'ajustes', label: 'Ajustes', icon: Settings },
    ];

    return (
      <Tabs defaultTab="resumen">
        <Tabs.List tabs={dashboardTabs} />
        <Tabs.Panels className="mt-6">
          <Tabs.Panel tabId="resumen">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Resumen de la tienda</h3>
              <p className="text-gray-600">Vista general de tu negocio...</p>
            </div>
          </Tabs.Panel>
          <Tabs.Panel tabId="pedidos">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Pedidos recientes</h3>
              <p className="text-gray-600">24 pedidos pendientes...</p>
            </div>
          </Tabs.Panel>
          <Tabs.Panel tabId="clientes">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Tus clientes</h3>
              <p className="text-gray-600">156 clientes registrados...</p>
            </div>
          </Tabs.Panel>
          <Tabs.Panel tabId="ajustes">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Configuración</h3>
              <p className="text-gray-600">Ajustes de la tienda...</p>
            </div>
          </Tabs.Panel>
        </Tabs.Panels>
      </Tabs>
    );
  },
};
