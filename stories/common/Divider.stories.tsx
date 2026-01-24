import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Divider from '@/components/common/Divider';

/**
 * Divider component for visual separation of content sections.
 * Supports horizontal/vertical orientation, multiple line styles, and optional labels.
 */
const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A divider component supporting horizontal/vertical orientation, solid/dashed/dotted styles, and centered text labels.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Divider orientation',
    },
    variant: {
      control: 'select',
      options: ['solid', 'dashed', 'dotted'],
      description: 'Line style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Thickness size',
    },
    color: {
      control: 'select',
      options: ['default', 'light', 'dark', 'primary'],
      description: 'Color variant',
    },
    spacing: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Spacing around divider',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Position of label text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {},
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Variants
export const Solid: Story = {
  args: {
    variant: 'solid',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const Dashed: Story = {
  args: {
    variant: 'dashed',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const Dotted: Story = {
  args: {
    variant: 'dotted',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Sizes
export const SizeSmall: Story = {
  args: {
    size: 'sm',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const SizeMedium: Story = {
  args: {
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const SizeLarge: Story = {
  args: {
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Colors
export const ColorDefault: Story = {
  args: {
    color: 'default',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const ColorLight: Story = {
  args: {
    color: 'light',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const ColorDark: Story = {
  args: {
    color: 'dark',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const ColorPrimary: Story = {
  args: {
    color: 'primary',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Spacing
export const SpacingNone: Story = {
  render: () => (
    <div className="w-96">
      <p className="text-gray-600">Texto arriba</p>
      <Divider spacing="none" />
      <p className="text-gray-600">Texto abajo</p>
    </div>
  ),
};

export const SpacingSmall: Story = {
  render: () => (
    <div className="w-96">
      <p className="text-gray-600">Texto arriba</p>
      <Divider spacing="sm" />
      <p className="text-gray-600">Texto abajo</p>
    </div>
  ),
};

export const SpacingMedium: Story = {
  render: () => (
    <div className="w-96">
      <p className="text-gray-600">Texto arriba</p>
      <Divider spacing="md" />
      <p className="text-gray-600">Texto abajo</p>
    </div>
  ),
};

export const SpacingLarge: Story = {
  render: () => (
    <div className="w-96">
      <p className="text-gray-600">Texto arriba</p>
      <Divider spacing="lg" />
      <p className="text-gray-600">Texto abajo</p>
    </div>
  ),
};

// With label
export const WithLabel: Story = {
  args: {
    children: 'o continúa con',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Label positions
export const LabelLeft: Story = {
  args: {
    children: 'Sección',
    labelPosition: 'left',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const LabelCenter: Story = {
  args: {
    children: 'Sección',
    labelPosition: 'center',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const LabelRight: Story = {
  args: {
    children: 'Sección',
    labelPosition: 'right',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Vertical
export const Vertical: Story = {
  render: () => (
    <div className="flex items-center h-20 gap-4">
      <span className="text-gray-600">Opción A</span>
      <Divider orientation="vertical" />
      <span className="text-gray-600">Opción B</span>
      <Divider orientation="vertical" />
      <span className="text-gray-600">Opción C</span>
    </div>
  ),
};

// Vertical sizes
export const VerticalSizes: Story = {
  render: () => (
    <div className="flex items-center h-20 gap-8">
      <div className="flex items-center gap-4 h-full">
        <span className="text-sm text-gray-500">sm</span>
        <Divider orientation="vertical" size="sm" />
        <span className="text-sm text-gray-500">text</span>
      </div>
      <div className="flex items-center gap-4 h-full">
        <span className="text-sm text-gray-500">md</span>
        <Divider orientation="vertical" size="md" />
        <span className="text-sm text-gray-500">text</span>
      </div>
      <div className="flex items-center gap-4 h-full">
        <span className="text-sm text-gray-500">lg</span>
        <Divider orientation="vertical" size="lg" />
        <span className="text-sm text-gray-500">text</span>
      </div>
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div>
        <p className="text-sm text-gray-500 mb-2">Solid</p>
        <Divider variant="solid" spacing="none" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Dashed</p>
        <Divider variant="dashed" spacing="none" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Dotted</p>
        <Divider variant="dotted" spacing="none" />
      </div>
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <div>
        <p className="text-sm text-gray-500 mb-2">Small</p>
        <Divider size="sm" spacing="none" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Medium</p>
        <Divider size="md" spacing="none" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-2">Large</p>
        <Divider size="lg" spacing="none" />
      </div>
    </div>
  ),
};

// Login form example
export const LoginFormExample: Story = {
  render: () => (
    <div className="w-80 space-y-4 p-4 border rounded-lg">
      <button className="w-full py-2 px-4 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
        Iniciar sesión
      </button>

      <Divider>o continúa con</Divider>

      <div className="flex gap-3">
        <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Google
        </button>
        <button className="flex-1 py-2 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Facebook
        </button>
      </div>
    </div>
  ),
};

// Section divider example
export const SectionDividerExample: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <div>
        <h3 className="font-semibold text-gray-900">Información personal</h3>
        <p className="text-sm text-gray-600">Nombre, email, teléfono</p>
      </div>

      <Divider />

      <div>
        <h3 className="font-semibold text-gray-900">Dirección de envío</h3>
        <p className="text-sm text-gray-600">Calle, ciudad, código postal</p>
      </div>

      <Divider />

      <div>
        <h3 className="font-semibold text-gray-900">Método de pago</h3>
        <p className="text-sm text-gray-600">Tarjeta de crédito, PayPal</p>
      </div>
    </div>
  ),
};

// Navigation divider example
export const NavigationDividerExample: Story = {
  render: () => (
    <div className="flex items-center gap-4 text-sm">
      <a href="#" className="text-gray-600 hover:text-primary-600">
        Inicio
      </a>
      <Divider orientation="vertical" spacing="none" className="h-4" />
      <a href="#" className="text-gray-600 hover:text-primary-600">
        Productos
      </a>
      <Divider orientation="vertical" spacing="none" className="h-4" />
      <a href="#" className="text-gray-600 hover:text-primary-600">
        Sobre nosotros
      </a>
      <Divider orientation="vertical" spacing="none" className="h-4" />
      <a href="#" className="text-gray-600 hover:text-primary-600">
        Contacto
      </a>
    </div>
  ),
};

// Footer divider example
export const FooterDividerExample: Story = {
  render: () => (
    <div className="w-full max-w-lg">
      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <span>Subtotal</span>
        <span>$2,500 MXN</span>
      </div>
      <div className="flex justify-between text-sm text-gray-600 mb-4">
        <span>Envío</span>
        <span>$150 MXN</span>
      </div>

      <Divider variant="dashed" />

      <div className="flex justify-between font-semibold text-gray-900">
        <span>Total</span>
        <span>$2,650 MXN</span>
      </div>
    </div>
  ),
};
