import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import VirtualTable, { TableColumn } from '@/components/common/VirtualTable';
import Badge from '@/components/common/Badge';
import Avatar from '@/components/common/Avatar';

/**
 * VirtualTable component for efficiently rendering large data tables.
 * Combines TanStack Virtual for row virtualization with Table features like
 * sorting, row selection, sticky headers, and responsive column hiding.
 */
const meta: Meta<typeof VirtualTable> = {
  title: 'Data Display/VirtualTable',
  component: VirtualTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A virtualized table component optimized for large datasets. Only renders visible rows for excellent performance with thousands of items.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    variant: {
      control: 'select',
      options: ['default', 'striped', 'bordered'],
      description: 'Visual variant',
    },
    hoverable: {
      control: 'boolean',
      description: 'Enable hover effect',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Keep header visible when scrolling',
    },
    selectable: {
      control: 'boolean',
      description: 'Enable row selection',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
    height: {
      control: 'number',
      description: 'Height of the virtualized container',
    },
  },
};

export default meta;
type Story = StoryObj<typeof VirtualTable>;

// Sample data types
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  seller: string;
  status: 'active' | 'draft' | 'sold_out';
}

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  total: number;
  items: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
}

// Generate sample products
const generateProducts = (count: number): Product[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `product-${i + 1}`,
    name: `Producto artesanal #${i + 1}`,
    category: ['Textiles', 'Cerámica', 'Joyería', 'Madera', 'Vidrio'][i % 5],
    price: 500 + (i % 20) * 100,
    stock: (i % 50) + 1,
    seller: ['María García', 'Pedro Hernández', 'Juana Martínez', 'Carlos López'][i % 4],
    status: (['active', 'draft', 'sold_out'] as const)[i % 3],
  }));

// Generate sample orders
const generateOrders = (count: number): Order[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `order-${i + 1}`,
    orderNumber: `ORD-2024-${String(i + 1).padStart(5, '0')}`,
    customer: ['María García', 'Pedro López', 'Ana Martínez', 'Carlos Ruiz', 'Sofía Hernández'][
      i % 5
    ],
    total: 500 + (i % 30) * 150,
    items: (i % 5) + 1,
    status: (['pending', 'processing', 'shipped', 'delivered', 'cancelled'] as const)[i % 5],
    date: `${(i % 28) + 1}/${(i % 12) + 1}/2024`,
  }));

const products = generateProducts(1000);
const orders = generateOrders(500);

// Product columns
const productColumns: TableColumn<Product>[] = [
  { key: 'name', header: 'Producto', cell: 'name', sortable: true },
  { key: 'category', header: 'Categoría', cell: 'category', sortable: true, hideOnMobile: true },
  {
    key: 'price',
    header: 'Precio',
    cell: (row) => `$${row.price.toLocaleString()}`,
    sortable: true,
    align: 'right',
  },
  {
    key: 'stock',
    header: 'Stock',
    cell: 'stock',
    sortable: true,
    align: 'center',
    hideOnMobile: true,
  },
  {
    key: 'status',
    header: 'Estado',
    cell: (row) => {
      const variants = { active: 'success', draft: 'warning', sold_out: 'danger' } as const;
      const labels = { active: 'Activo', draft: 'Borrador', sold_out: 'Agotado' };
      return (
        <Badge variant={variants[row.status]} size="sm">
          {labels[row.status]}
        </Badge>
      );
    },
    align: 'center',
  },
];

// Default
export const Default: Story = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <VirtualTable
        columns={productColumns}
        data={products.slice(0, 100)}
        keyAccessor="id"
        height={400}
      />
    </div>
  ),
};

// Large dataset (1000 rows)
export const LargeDataset: Story = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h3 className="font-semibold text-gray-900">1,000 productos</h3>
        <p className="text-sm text-gray-500">Solo se renderizan las filas visibles</p>
      </div>
      <VirtualTable columns={productColumns} data={products} keyAccessor="id" height={450} />
    </div>
  ),
};

// With sorting
export const WithSorting: Story = {
  render: function SortableTable() {
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<'asc' | 'desc' | null>(null);

    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="p-3 bg-gray-50 border-b text-sm text-gray-600">
          {sortKey
            ? `Ordenado por: ${sortKey} (${sortDir})`
            : 'Haz clic en una columna para ordenar'}
        </div>
        <VirtualTable
          columns={productColumns}
          data={products.slice(0, 200)}
          keyAccessor="id"
          height={400}
          onSortChange={(key, direction) => {
            setSortKey(direction ? key : null);
            setSortDir(direction);
          }}
        />
      </div>
    );
  },
};

// With selection
export const WithSelection: Story = {
  render: function SelectableTable() {
    const [selected, setSelected] = useState<Set<string | number>>(new Set());

    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="p-3 bg-gray-50 border-b flex justify-between items-center">
          <span className="text-sm text-gray-600">
            {selected.size} de {products.slice(0, 100).length} seleccionados
          </span>
          {selected.size > 0 && (
            <button
              onClick={() => setSelected(new Set())}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              Limpiar selección
            </button>
          )}
        </div>
        <VirtualTable
          columns={productColumns}
          data={products.slice(0, 100)}
          keyAccessor="id"
          height={400}
          selectable
          selectedKeys={selected}
          onSelectionChange={setSelected}
        />
      </div>
    );
  },
};

// Striped variant
export const Striped: Story = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <VirtualTable
        columns={productColumns}
        data={products.slice(0, 100)}
        keyAccessor="id"
        variant="striped"
        height={400}
      />
    </div>
  ),
};

// Bordered variant
export const Bordered: Story = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <VirtualTable
        columns={productColumns}
        data={products.slice(0, 100)}
        keyAccessor="id"
        variant="bordered"
        height={400}
      />
    </div>
  ),
};

// Sizes
export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Small</h3>
        <div className="border rounded-lg overflow-hidden">
          <VirtualTable
            columns={productColumns.slice(0, 3)}
            data={products.slice(0, 20)}
            keyAccessor="id"
            size="sm"
            height={200}
          />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Medium (default)</h3>
        <div className="border rounded-lg overflow-hidden">
          <VirtualTable
            columns={productColumns.slice(0, 3)}
            data={products.slice(0, 20)}
            keyAccessor="id"
            size="md"
            height={200}
          />
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-500 mb-2">Large</h3>
        <div className="border rounded-lg overflow-hidden">
          <VirtualTable
            columns={productColumns.slice(0, 3)}
            data={products.slice(0, 20)}
            keyAccessor="id"
            size="lg"
            height={200}
          />
        </div>
      </div>
    </div>
  ),
};

// Loading state
export const Loading: Story = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <VirtualTable columns={productColumns} data={[]} keyAccessor="id" loading height={400} />
    </div>
  ),
};

// Empty state
export const Empty: Story = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <VirtualTable
        columns={productColumns}
        data={[]}
        keyAccessor="id"
        height={300}
        emptyMessage="No se encontraron productos"
      />
    </div>
  ),
};

// Without sticky header
export const NonStickyHeader: Story = {
  render: () => (
    <div className="border rounded-lg overflow-hidden">
      <VirtualTable
        columns={productColumns}
        data={products.slice(0, 100)}
        keyAccessor="id"
        stickyHeader={false}
        height={400}
      />
    </div>
  ),
};

// Row click handler
export const WithRowClick: Story = {
  render: function ClickableTable() {
    const [clicked, setClicked] = useState<string | null>(null);

    return (
      <div className="border rounded-lg overflow-hidden">
        {clicked && (
          <div className="p-3 bg-primary-50 border-b text-sm text-primary-700">
            Fila seleccionada: {clicked}
          </div>
        )}
        <VirtualTable
          columns={productColumns}
          data={products.slice(0, 100)}
          keyAccessor="id"
          height={400}
          onRowClick={(row) => setClicked(row.id)}
        />
      </div>
    );
  },
};

// Real-world: Order management
export const OrderManagement: Story = {
  render: function OrderTable() {
    const [selected, setSelected] = useState<Set<string | number>>(new Set());

    const orderColumns: TableColumn<Order>[] = [
      { key: 'orderNumber', header: 'Pedido', cell: 'orderNumber', sortable: true, width: 'w-32' },
      {
        key: 'customer',
        header: 'Cliente',
        cell: (row) => (
          <div className="flex items-center gap-2">
            <Avatar name={row.customer} size="sm" />
            <span>{row.customer}</span>
          </div>
        ),
        sortable: true,
      },
      {
        key: 'items',
        header: 'Items',
        cell: (row) => `${row.items} productos`,
        align: 'center',
        hideOnMobile: true,
      },
      {
        key: 'total',
        header: 'Total',
        cell: (row) => `$${row.total.toLocaleString()}`,
        sortable: true,
        align: 'right',
      },
      {
        key: 'status',
        header: 'Estado',
        cell: (row) => {
          const variants = {
            pending: 'warning',
            processing: 'info',
            shipped: 'primary',
            delivered: 'success',
            cancelled: 'danger',
          } as const;
          const labels = {
            pending: 'Pendiente',
            processing: 'Procesando',
            shipped: 'Enviado',
            delivered: 'Entregado',
            cancelled: 'Cancelado',
          };
          return (
            <Badge variant={variants[row.status]} size="sm">
              {labels[row.status]}
            </Badge>
          );
        },
        align: 'center',
      },
      {
        key: 'date',
        header: 'Fecha',
        cell: 'date',
        sortable: true,
        align: 'right',
        hideOnMobile: true,
      },
    ];

    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
          <div>
            <h3 className="font-semibold text-gray-900">Gestión de pedidos</h3>
            <p className="text-sm text-gray-500">{orders.length} pedidos totales</p>
          </div>
          {selected.size > 0 && (
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm bg-primary-600 text-white rounded-lg">
                Procesar ({selected.size})
              </button>
              <button className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg">
                Exportar
              </button>
            </div>
          )}
        </div>
        <VirtualTable
          columns={orderColumns}
          data={orders}
          keyAccessor="id"
          height={450}
          selectable
          selectedKeys={selected}
          onSelectionChange={setSelected}
          variant="striped"
        />
      </div>
    );
  },
};

// Real-world: Inventory
export const InventoryTable: Story = {
  render: () => {
    const inventoryColumns: TableColumn<Product>[] = [
      {
        key: 'product',
        header: 'Producto',
        cell: (row) => (
          <div>
            <p className="font-medium text-gray-900">{row.name}</p>
            <p className="text-xs text-gray-500">{row.seller}</p>
          </div>
        ),
        sortable: true,
        sortKey: 'name',
      },
      { key: 'category', header: 'Categoría', cell: 'category', hideOnMobile: true },
      {
        key: 'stock',
        header: 'Stock',
        cell: (row) => (
          <span className={row.stock < 10 ? 'text-red-600 font-medium' : 'text-gray-900'}>
            {row.stock} unidades
          </span>
        ),
        sortable: true,
        align: 'center',
      },
      {
        key: 'price',
        header: 'Precio',
        cell: (row) => `$${row.price.toLocaleString()}`,
        sortable: true,
        align: 'right',
      },
      {
        key: 'value',
        header: 'Valor total',
        cell: (row) => `$${(row.price * row.stock).toLocaleString()}`,
        align: 'right',
        hideOnMobile: true,
      },
      {
        key: 'status',
        header: 'Estado',
        cell: (row) => {
          if (row.stock === 0)
            return (
              <Badge variant="danger" size="sm">
                Agotado
              </Badge>
            );
          if (row.stock < 10)
            return (
              <Badge variant="warning" size="sm">
                Bajo stock
              </Badge>
            );
          return (
            <Badge variant="success" size="sm">
              Disponible
            </Badge>
          );
        },
        align: 'center',
      },
    ];

    return (
      <div className="border rounded-lg overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="font-semibold text-gray-900">Inventario</h3>
          <p className="text-sm text-gray-500">Control de stock de productos</p>
        </div>
        <VirtualTable
          columns={inventoryColumns}
          data={products}
          keyAccessor="id"
          height={450}
          defaultSortKey="stock"
          defaultSortDirection="asc"
        />
      </div>
    );
  },
};
