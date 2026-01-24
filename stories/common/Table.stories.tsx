import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Package, Eye, Edit, Trash2 } from 'lucide-react';
import Table from '@/components/common/Table';
import Badge from '@/components/common/Badge';

/**
 * Table component for displaying tabular data with advanced features.
 * Includes sorting, row selection, sticky headers, and loading states.
 */
const meta: Meta<typeof Table> = {
  title: 'Data Display/Table',
  component: Table,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A feature-rich table component supporting sorting, selection, sticky headers, responsive column hiding, loading skeletons, and empty states.',
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
      description: 'Enable row hover effect',
    },
    stickyHeader: {
      control: 'boolean',
      description: 'Make header sticky',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'inactive' | 'pending';
}

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Rebozo de Seda',
    category: 'Textiles',
    price: 2500,
    stock: 15,
    status: 'active',
  },
  {
    id: '2',
    name: 'Vasija de Barro Negro',
    category: 'Cerámica',
    price: 1200,
    stock: 8,
    status: 'active',
  },
  {
    id: '3',
    name: 'Collar de Plata',
    category: 'Joyería',
    price: 850,
    stock: 0,
    status: 'inactive',
  },
  {
    id: '4',
    name: 'Alebrije Mediano',
    category: 'Madera',
    price: 650,
    stock: 12,
    status: 'active',
  },
  {
    id: '5',
    name: 'Cinturón Piteado',
    category: 'Cuero',
    price: 1800,
    stock: 3,
    status: 'pending',
  },
];

const columns = [
  { key: 'name', header: 'Producto', cell: 'name' as const, sortable: true },
  { key: 'category', header: 'Categoría', cell: 'category' as const, sortable: true },
  {
    key: 'price',
    header: 'Precio',
    cell: (row: Product) => `$${row.price.toLocaleString()} MXN`,
    sortable: true,
    align: 'right' as const,
  },
  {
    key: 'stock',
    header: 'Stock',
    cell: 'stock' as const,
    sortable: true,
    align: 'center' as const,
  },
  {
    key: 'status',
    header: 'Estado',
    cell: (row: Product) => {
      const variants = {
        active: 'success',
        inactive: 'danger',
        pending: 'warning',
      } as const;
      const labels = {
        active: 'Activo',
        inactive: 'Inactivo',
        pending: 'Pendiente',
      };
      return <Badge variant={variants[row.status]}>{labels[row.status]}</Badge>;
    },
    sortable: true,
  },
];

// Default
export const Default: Story = {
  render: () => <Table columns={columns} data={sampleProducts} keyAccessor="id" />,
};

// Striped variant
export const Striped: Story = {
  render: () => (
    <Table columns={columns} data={sampleProducts} keyAccessor="id" variant="striped" />
  ),
};

// Bordered variant
export const Bordered: Story = {
  render: () => (
    <Table columns={columns} data={sampleProducts} keyAccessor="id" variant="bordered" />
  ),
};

// Sizes
export const SizeSmall: Story = {
  render: () => <Table columns={columns} data={sampleProducts} keyAccessor="id" size="sm" />,
};

export const SizeMedium: Story = {
  render: () => <Table columns={columns} data={sampleProducts} keyAccessor="id" size="md" />,
};

export const SizeLarge: Story = {
  render: () => <Table columns={columns} data={sampleProducts} keyAccessor="id" size="lg" />,
};

// With sorting
export const WithSorting: Story = {
  render: function WithSortingTable() {
    const [sortKey, setSortKey] = useState<string | null>('price');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>('desc');

    return (
      <div>
        <p className="text-sm text-gray-500 mb-4">
          Ordenado por: {sortKey || 'ninguno'} ({sortDirection || 'none'})
        </p>
        <Table
          columns={columns}
          data={sampleProducts}
          keyAccessor="id"
          defaultSortKey={sortKey || undefined}
          defaultSortDirection={sortDirection}
          onSortChange={(key, direction) => {
            setSortKey(key);
            setSortDirection(direction);
          }}
        />
      </div>
    );
  },
};

// With selection
export const WithSelection: Story = {
  render: function WithSelectionTable() {
    const [selectedKeys, setSelectedKeys] = useState<Set<string | number>>(new Set());

    return (
      <div>
        <p className="text-sm text-gray-500 mb-4">
          Seleccionados: {selectedKeys.size} de {sampleProducts.length}
        </p>
        <Table
          columns={columns}
          data={sampleProducts}
          keyAccessor="id"
          selectable
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        />
      </div>
    );
  },
};

// With row click
export const WithRowClick: Story = {
  render: function WithRowClickTable() {
    const [clicked, setClicked] = useState<string | null>(null);

    return (
      <div>
        <p className="text-sm text-gray-500 mb-4">Producto seleccionado: {clicked || 'ninguno'}</p>
        <Table
          columns={columns}
          data={sampleProducts}
          keyAccessor="id"
          onRowClick={(row) => setClicked(row.name)}
        />
      </div>
    );
  },
};

// Sticky header
export const StickyHeader: Story = {
  render: () => (
    <div className="h-64 overflow-auto">
      <Table
        columns={columns}
        data={[...sampleProducts, ...sampleProducts, ...sampleProducts]}
        keyAccessor={(row, index) => `${row.id}-${index}`}
        stickyHeader
      />
    </div>
  ),
};

// Loading
export const Loading: Story = {
  render: () => <Table columns={columns} data={[]} keyAccessor="id" loading />,
};

// Empty state
export const EmptyState: Story = {
  render: () => (
    <Table
      columns={columns}
      data={[]}
      keyAccessor="id"
      emptyMessage="No se encontraron productos"
      emptyIcon={<Package className="w-12 h-12 text-gray-300" />}
    />
  ),
};

// With actions column
export const WithActions: Story = {
  render: () => {
    const columnsWithActions = [
      ...columns,
      {
        key: 'actions',
        header: 'Acciones',
        cell: () => (
          <div className="flex items-center gap-2">
            <button className="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded transition-colors">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-primary-600 hover:bg-gray-100 rounded transition-colors">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ),
        align: 'center' as const,
      },
    ];

    return <Table columns={columnsWithActions} data={sampleProducts} keyAccessor="id" />;
  },
};

// Responsive with hidden columns
export const ResponsiveColumns: Story = {
  render: () => {
    const responsiveColumns = [
      { key: 'name', header: 'Producto', cell: 'name' as const },
      {
        key: 'category',
        header: 'Categoría',
        cell: 'category' as const,
        hideOnMobile: true,
      },
      {
        key: 'price',
        header: 'Precio',
        cell: (row: Product) => `$${row.price.toLocaleString()}`,
        align: 'right' as const,
      },
      {
        key: 'stock',
        header: 'Stock',
        cell: 'stock' as const,
        hideOnMobile: true,
        hideOnTablet: true,
        align: 'center' as const,
      },
      {
        key: 'status',
        header: 'Estado',
        cell: (row: Product) => {
          const variants = {
            active: 'success',
            inactive: 'danger',
            pending: 'warning',
          } as const;
          const labels = {
            active: 'Activo',
            inactive: 'Inactivo',
            pending: 'Pendiente',
          };
          return (
            <Badge variant={variants[row.status]} size="sm">
              {labels[row.status]}
            </Badge>
          );
        },
      },
    ];

    return (
      <div>
        <p className="text-sm text-gray-500 mb-4">
          Redimensiona la ventana para ver las columnas ocultarse
        </p>
        <Table columns={responsiveColumns} data={sampleProducts} keyAccessor="id" />
      </div>
    );
  },
};

// Without hover
export const WithoutHover: Story = {
  render: () => (
    <Table columns={columns} data={sampleProducts} keyAccessor="id" hoverable={false} />
  ),
};

// Orders table example
export const OrdersExample: Story = {
  render: () => {
    interface Order {
      id: string;
      customer: string;
      date: string;
      total: number;
      status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    }

    const orders: Order[] = [
      {
        id: 'ORD-001',
        customer: 'María García',
        date: '2024-01-15',
        total: 2500,
        status: 'delivered',
      },
      { id: 'ORD-002', customer: 'Juan López', date: '2024-01-14', total: 1850, status: 'shipped' },
      {
        id: 'ORD-003',
        customer: 'Ana Martínez',
        date: '2024-01-13',
        total: 3200,
        status: 'pending',
      },
      {
        id: 'ORD-004',
        customer: 'Carlos Ruiz',
        date: '2024-01-12',
        total: 950,
        status: 'cancelled',
      },
    ];

    const orderColumns = [
      { key: 'id', header: 'Pedido', cell: 'id' as const },
      { key: 'customer', header: 'Cliente', cell: 'customer' as const },
      { key: 'date', header: 'Fecha', cell: 'date' as const, hideOnMobile: true },
      {
        key: 'total',
        header: 'Total',
        cell: (row: Order) => `$${row.total.toLocaleString()} MXN`,
        align: 'right' as const,
      },
      {
        key: 'status',
        header: 'Estado',
        cell: (row: Order) => {
          const variants = {
            pending: 'warning',
            shipped: 'info',
            delivered: 'success',
            cancelled: 'danger',
          } as const;
          const labels = {
            pending: 'Pendiente',
            shipped: 'Enviado',
            delivered: 'Entregado',
            cancelled: 'Cancelado',
          };
          return <Badge variant={variants[row.status]}>{labels[row.status]}</Badge>;
        },
      },
    ];

    return <Table columns={orderColumns} data={orders} keyAccessor="id" variant="striped" />;
  },
};
