import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DataTable, { TrendCell, CurrencyCell, BadgeCell } from '@/components/charts/DataTable';

/**
 * DataTable is a generic table component with responsive columns, sorting indicators,
 * and helper components for common cell types.
 */
const meta: Meta<typeof DataTable> = {
  title: 'Charts/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A flexible data table with custom column rendering, responsive hiding, and helper cell components.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    hoverable: {
      control: 'boolean',
      description: 'Show hover effect on rows',
    },
    striped: {
      control: 'boolean',
      description: 'Alternate row colors',
    },
    compact: {
      control: 'boolean',
      description: 'Reduce padding',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DataTable>;

// Sample product data
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  sales: number;
  status: 'active' | 'low_stock' | 'out_of_stock';
}

const sampleProducts: Product[] = [
  { id: '1', name: 'Alebrije Dragón', price: 2500, stock: 12, sales: 45, status: 'active' },
  { id: '2', name: 'Rebozo de Seda', price: 3500, stock: 3, sales: 28, status: 'low_stock' },
  { id: '3', name: 'Talavera Set', price: 1800, stock: 0, sales: 15, status: 'out_of_stock' },
  { id: '4', name: 'Collar de Plata', price: 950, stock: 25, sales: 89, status: 'active' },
  { id: '5', name: 'Huipil Bordado', price: 4200, stock: 8, sales: 12, status: 'active' },
];

// Basic table
export const Default: Story = {
  render: () => (
    <DataTable<Product>
      columns={[
        { header: 'Producto', accessor: 'name' },
        { header: 'Precio', accessor: (row) => `$${row.price.toLocaleString()}`, align: 'right' },
        { header: 'Stock', accessor: 'stock', align: 'center' },
        { header: 'Ventas', accessor: 'sales', align: 'center' },
      ]}
      data={sampleProducts}
      keyAccessor="id"
      hoverable
    />
  ),
};

// With striped rows
export const Striped: Story = {
  render: () => (
    <DataTable<Product>
      columns={[
        { header: 'Producto', accessor: 'name' },
        { header: 'Precio', accessor: (row) => `$${row.price.toLocaleString()}`, align: 'right' },
        { header: 'Stock', accessor: 'stock', align: 'center' },
      ]}
      data={sampleProducts}
      keyAccessor="id"
      striped
      hoverable={false}
    />
  ),
};

// Compact table
export const Compact: Story = {
  render: () => (
    <DataTable<Product>
      columns={[
        { header: 'Producto', accessor: 'name' },
        { header: 'Precio', accessor: (row) => `$${row.price.toLocaleString()}`, align: 'right' },
        { header: 'Stock', accessor: 'stock', align: 'center' },
      ]}
      data={sampleProducts}
      keyAccessor="id"
      compact
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Compact table with reduced padding.',
      },
    },
  },
};

// With helper cell components
export const WithCellHelpers: Story = {
  render: () => {
    interface SalesData {
      id: string;
      product: string;
      revenue: number;
      change: number;
      status: 'active' | 'paused' | 'sold_out';
    }

    const data: SalesData[] = [
      { id: '1', product: 'Alebrije Dragón', revenue: 45000, change: 12, status: 'active' },
      { id: '2', product: 'Rebozo de Seda', revenue: 32000, change: -5, status: 'active' },
      { id: '3', product: 'Talavera Set', revenue: 28000, change: 8, status: 'paused' },
      { id: '4', product: 'Collar de Plata', revenue: 15000, change: -12, status: 'sold_out' },
    ];

    const statusColors: Record<string, 'green' | 'amber' | 'red'> = {
      active: 'green',
      paused: 'amber',
      sold_out: 'red',
    };

    const statusLabels: Record<string, string> = {
      active: 'Activo',
      paused: 'Pausado',
      sold_out: 'Agotado',
    };

    return (
      <DataTable
        columns={[
          { header: 'Producto', accessor: 'product' },
          {
            header: 'Ingresos',
            accessor: (row) => <CurrencyCell value={row.revenue} />,
            align: 'right',
          },
          {
            header: 'Cambio',
            accessor: (row) => <TrendCell value={row.change} />,
            align: 'center',
          },
          {
            header: 'Estado',
            accessor: (row) => (
              <BadgeCell variant={statusColors[row.status]}>{statusLabels[row.status]}</BadgeCell>
            ),
            align: 'center',
          },
        ]}
        data={data}
        keyAccessor="id"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Using TrendCell, CurrencyCell, and BadgeCell helper components.',
      },
    },
  },
};

// Responsive columns
export const ResponsiveColumns: Story = {
  render: () => {
    const colors: Record<string, 'green' | 'amber' | 'red'> = {
      active: 'green',
      low_stock: 'amber',
      out_of_stock: 'red',
    };
    const labels: Record<string, string> = {
      active: 'Activo',
      low_stock: 'Bajo',
      out_of_stock: 'Agotado',
    };

    return (
      <DataTable<Product>
        columns={[
          { header: 'Producto', accessor: 'name' },
          { header: 'Precio', accessor: (row) => `$${row.price.toLocaleString()}`, align: 'right' },
          { header: 'Stock', accessor: 'stock', align: 'center', hideOnMobile: true },
          { header: 'Ventas', accessor: 'sales', align: 'center', hideOnMobile: true },
          {
            header: 'Estado',
            accessor: (row) => (
              <BadgeCell variant={colors[row.status]}>{labels[row.status]}</BadgeCell>
            ),
            align: 'center',
            hideOnTablet: true,
          },
        ]}
        data={sampleProducts}
        keyAccessor="id"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Columns that hide on mobile and tablet breakpoints.',
      },
    },
  },
};

// Empty state
export const EmptyState: Story = {
  render: () => (
    <DataTable<Product>
      columns={[
        { header: 'Producto', accessor: 'name' },
        { header: 'Precio', accessor: (row) => `$${row.price}`, align: 'right' },
      ]}
      data={[]}
      keyAccessor="id"
      emptyMessage="No hay productos para mostrar"
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Empty table state with custom message.',
      },
    },
  },
};

// In dashboard card
export const InDashboardCard: Story = {
  render: () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 max-w-2xl">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
        Productos Recientes
      </h3>
      <DataTable<Product>
        columns={[
          { header: 'Producto', accessor: 'name' },
          { header: 'Precio', accessor: (row) => `$${row.price.toLocaleString()}`, align: 'right' },
          { header: 'Stock', accessor: 'stock', align: 'center' },
        ]}
        data={sampleProducts.slice(0, 4)}
        keyAccessor="id"
        compact
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'DataTable inside a dashboard card.',
      },
    },
  },
};

// Badge variants showcase
export const BadgeVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-bold mb-2">BadgeCell Variants</h3>
      <div className="flex flex-wrap gap-2">
        <BadgeCell variant="gray">Gray</BadgeCell>
        <BadgeCell variant="green">Green</BadgeCell>
        <BadgeCell variant="red">Red</BadgeCell>
        <BadgeCell variant="blue">Blue</BadgeCell>
        <BadgeCell variant="amber">Amber</BadgeCell>
        <BadgeCell variant="purple">Purple</BadgeCell>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available BadgeCell color variants.',
      },
    },
  },
};
