import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Pagination from '@/components/common/Pagination';

/**
 * Pagination component for navigating through paginated content.
 * Features URL-based navigation, responsive design with mobile-optimized view,
 * and smart page number display with ellipsis.
 */
const meta: Meta<typeof Pagination> = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'URL-based pagination component with Next.js Link integration. Shows smart ellipsis for large page counts and a mobile-optimized view.',
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentPage: {
      control: { type: 'number', min: 1 },
      description: 'Currently active page number (1-indexed)',
    },
    totalPages: {
      control: { type: 'number', min: 1 },
      description: 'Total number of pages available',
    },
    baseUrl: {
      control: 'text',
      description: 'Base URL for pagination links',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default - first page
export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    baseUrl: '/productos',
  },
};

// Middle page
export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    baseUrl: '/productos',
  },
};

// Last page
export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    baseUrl: '/productos',
  },
};

// Few pages (no ellipsis)
export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 4,
    baseUrl: '/productos',
  },
};

// Many pages (with ellipsis)
export const ManyPages: Story = {
  args: {
    currentPage: 15,
    totalPages: 50,
    baseUrl: '/productos',
  },
};

// Single page (hidden)
export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    baseUrl: '/productos',
  },
  parameters: {
    docs: {
      description: {
        story: 'When there is only one page, the pagination component is not rendered.',
      },
    },
  },
};

// Two pages
export const TwoPages: Story = {
  args: {
    currentPage: 1,
    totalPages: 2,
    baseUrl: '/productos',
  },
};

// Near start
export const NearStart: Story = {
  args: {
    currentPage: 2,
    totalPages: 20,
    baseUrl: '/productos',
  },
};

// Near end
export const NearEnd: Story = {
  args: {
    currentPage: 19,
    totalPages: 20,
    baseUrl: '/productos',
  },
};

// With category base URL
export const WithCategoryUrl: Story = {
  args: {
    currentPage: 3,
    totalPages: 12,
    baseUrl: '/productos/textiles',
  },
};

// Real-world: Product listing
export const ProductListing: Story = {
  render: () => (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Textiles tradicionales</h2>
        <p className="text-gray-500">Mostrando 25-36 de 156 productos</p>
      </div>

      {/* Simulated product grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="aspect-square bg-gray-100 rounded-lg" />
        ))}
      </div>

      <Pagination currentPage={3} totalPages={13} baseUrl="/productos/textiles" />
    </div>
  ),
};

// Real-world: Search results
export const SearchResults: Story = {
  render: () => (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Resultados para &quot;rebozo&quot;</h2>
        <p className="text-gray-500">Se encontraron 89 productos</p>
      </div>

      {/* Simulated results */}
      <div className="space-y-4 mb-8">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border rounded-lg">
            <div className="w-20 h-20 bg-gray-100 rounded-lg shrink-0" />
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-3 bg-gray-100 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>

      <Pagination currentPage={1} totalPages={9} baseUrl="/buscar" />
    </div>
  ),
};

// Real-world: Orders list
export const OrdersList: Story = {
  render: () => (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Mis pedidos</h2>

      {/* Simulated orders */}
      <div className="space-y-4 mb-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="p-4 border rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-gray-900">
                  Pedido #ORD-2024-{String(100 - i).padStart(3, '0')}
                </p>
                <p className="text-sm text-gray-500">15 de enero, 2024</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                Entregado
              </span>
            </div>
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-gray-100 rounded" />
              <div className="w-12 h-12 bg-gray-100 rounded" />
              <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                +2
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination currentPage={2} totalPages={8} baseUrl="/pedidos" />
    </div>
  ),
};

// All page positions
export const AllPositions: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-gray-500 mb-2">Primera página</p>
        <Pagination currentPage={1} totalPages={10} baseUrl="/demo" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Cerca del inicio (página 2)</p>
        <Pagination currentPage={2} totalPages={10} baseUrl="/demo" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Mitad (página 5)</p>
        <Pagination currentPage={5} totalPages={10} baseUrl="/demo" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Cerca del final (página 9)</p>
        <Pagination currentPage={9} totalPages={10} baseUrl="/demo" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Última página</p>
        <Pagination currentPage={10} totalPages={10} baseUrl="/demo" />
      </div>
    </div>
  ),
};

// Different total pages
export const DifferentTotals: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-gray-500 mb-2">3 páginas</p>
        <Pagination currentPage={2} totalPages={3} baseUrl="/demo" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">5 páginas</p>
        <Pagination currentPage={3} totalPages={5} baseUrl="/demo" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">10 páginas</p>
        <Pagination currentPage={5} totalPages={10} baseUrl="/demo" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">20 páginas</p>
        <Pagination currentPage={10} totalPages={20} baseUrl="/demo" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">100 páginas</p>
        <Pagination currentPage={50} totalPages={100} baseUrl="/demo" />
      </div>
    </div>
  ),
};
