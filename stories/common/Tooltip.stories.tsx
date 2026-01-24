import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Info, HelpCircle, AlertCircle } from 'lucide-react';
import Tooltip from '@/components/common/Tooltip';
import Button from '@/components/common/Button';

/**
 * Tooltip component for displaying contextual information on hover or click.
 * Features configurable placement, delay timings, variants, and accessibility support.
 */
const meta: Meta<typeof Tooltip> = {
  title: 'Overlays/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A tooltip component for displaying contextual information. Supports hover and click activation, multiple placements, and dark/light variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Position of the tooltip relative to the trigger',
    },
    variant: {
      control: 'select',
      options: ['dark', 'light'],
      description: 'Color scheme variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size affecting padding and font size',
    },
    delayShow: {
      control: 'number',
      description: 'Delay in ms before showing',
    },
    delayHide: {
      control: 'number',
      description: 'Delay in ms before hiding',
    },
    clickable: {
      control: 'boolean',
      description: 'Activate on click instead of hover',
    },
    arrow: {
      control: 'boolean',
      description: 'Show arrow pointing to trigger',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default tooltip
export const Default: Story = {
  args: {
    content: 'Este es un tooltip informativo',
    children: (
      <Button variant="outline" size="sm">
        Hover para ver tooltip
      </Button>
    ),
  },
};

// Placements
export const PlacementTop: Story = {
  args: {
    content: 'Tooltip arriba',
    placement: 'top',
    children: <Button variant="outline">Arriba</Button>,
  },
};

export const PlacementBottom: Story = {
  args: {
    content: 'Tooltip abajo',
    placement: 'bottom',
    children: <Button variant="outline">Abajo</Button>,
  },
};

export const PlacementLeft: Story = {
  args: {
    content: 'Tooltip izquierda',
    placement: 'left',
    children: <Button variant="outline">Izquierda</Button>,
  },
};

export const PlacementRight: Story = {
  args: {
    content: 'Tooltip derecha',
    placement: 'right',
    children: <Button variant="outline">Derecha</Button>,
  },
};

// Variants
export const Dark: Story = {
  args: {
    content: 'Tooltip oscuro',
    variant: 'dark',
    children: <Button variant="outline">Tema oscuro</Button>,
  },
};

export const Light: Story = {
  args: {
    content: 'Tooltip claro',
    variant: 'light',
    children: <Button variant="outline">Tema claro</Button>,
  },
};

// Sizes
export const Small: Story = {
  args: {
    content: 'Tooltip pequeño',
    size: 'sm',
    children: <Button size="sm">Pequeño</Button>,
  },
};

export const Medium: Story = {
  args: {
    content: 'Tooltip mediano',
    size: 'md',
    children: <Button size="md">Mediano</Button>,
  },
};

export const Large: Story = {
  args: {
    content: 'Tooltip grande con más espacio',
    size: 'lg',
    children: <Button size="lg">Grande</Button>,
  },
};

// Without arrow
export const NoArrow: Story = {
  args: {
    content: 'Tooltip sin flecha',
    arrow: false,
    children: <Button variant="outline">Sin flecha</Button>,
  },
};

// Click to show
export const Clickable: Story = {
  args: {
    content: 'Este tooltip se activa con clic',
    clickable: true,
    children: <Button variant="primary">Haz clic</Button>,
  },
};

// With delay
export const WithDelay: Story = {
  args: {
    content: 'Aparece después de 500ms',
    delayShow: 500,
    delayHide: 200,
    children: <Button variant="outline">Con retraso</Button>,
  },
};

// Rich content
export const RichContent: Story = {
  args: {
    content: (
      <div>
        <p className="font-semibold mb-1">Artesano Verificado</p>
        <p className="text-xs opacity-80">
          Este artesano ha pasado nuestro proceso de verificación.
        </p>
      </div>
    ),
    maxWidth: 300,
    children: (
      <span className="inline-flex items-center gap-1 text-green-600 cursor-help">
        <Info className="w-4 h-4" />
        <span>Verificado</span>
      </span>
    ),
  },
};

// Help icon tooltip
export const HelpIcon: Story = {
  args: {
    content: 'Haz clic aquí para obtener más información sobre este campo.',
    children: (
      <button className="text-gray-400 hover:text-gray-600">
        <HelpCircle className="w-5 h-5" />
      </button>
    ),
  },
};

// All placements showcase
export const AllPlacements: Story = {
  render: () => (
    <div className="flex flex-col items-center gap-8 p-12">
      <Tooltip content="Arriba" placement="top">
        <Button variant="outline">Top</Button>
      </Tooltip>
      <div className="flex items-center gap-32">
        <Tooltip content="Izquierda" placement="left">
          <Button variant="outline">Left</Button>
        </Tooltip>
        <Tooltip content="Derecha" placement="right">
          <Button variant="outline">Right</Button>
        </Tooltip>
      </div>
      <Tooltip content="Abajo" placement="bottom">
        <Button variant="outline">Bottom</Button>
      </Tooltip>
    </div>
  ),
};

// Real-world examples
export const VerificationInfo: Story = {
  args: {
    content: (
      <div className="space-y-1">
        <p className="font-semibold">Artesano Maestro</p>
        <p className="text-xs">Reconocido por su excelencia y años de experiencia.</p>
        <p className="text-xs opacity-70">Comisión reducida: 5%</p>
      </div>
    ),
    variant: 'light',
    maxWidth: 250,
    children: (
      <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm cursor-help">
        <AlertCircle className="w-4 h-4" />
        Artesano Maestro
      </span>
    ),
  },
};

export const ShippingInfo: Story = {
  args: {
    content: 'El envío se calcula según tu ubicación y el peso del producto.',
    placement: 'bottom',
    children: (
      <span className="text-sm text-blue-600 underline cursor-help">
        ¿Cómo se calcula el envío?
      </span>
    ),
  },
};
