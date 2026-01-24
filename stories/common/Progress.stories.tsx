import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Progress, { CircularProgress, MultiProgress } from '@/components/common/Progress';

/**
 * Progress components for displaying completion status.
 * Includes linear Progress bar, CircularProgress, and MultiProgress for segments.
 */
const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: Progress,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Progress bar components with linear, circular, and multi-segment variants. Supports animation, striped patterns, and multiple sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg'],
      description: 'Height size of the progress bar',
    },
    variant: {
      control: 'select',
      options: ['primary', 'success', 'warning', 'danger', 'info', 'neutral'],
      description: 'Color variant',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show percentage label',
    },
    animated: {
      control: 'boolean',
      description: 'Animate width changes',
    },
    striped: {
      control: 'boolean',
      description: 'Show striped pattern',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default progress
export const Default: Story = {
  args: {
    value: 60,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// With label
export const WithLabel: Story = {
  args: {
    value: 75,
    showLabel: true,
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
export const LabelTop: Story = {
  args: {
    value: 45,
    showLabel: true,
    labelPosition: 'top',
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
    value: 45,
    showLabel: true,
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

export const LabelInside: Story = {
  args: {
    value: 65,
    showLabel: true,
    labelPosition: 'inside',
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

// Custom label
export const CustomLabel: Story = {
  args: {
    value: 3,
    max: 5,
    label: '3 de 5 pasos',
    showLabel: true,
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
export const SizeXS: Story = {
  args: { value: 60, size: 'xs' },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const SizeSM: Story = {
  args: { value: 60, size: 'sm' },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const SizeMD: Story = {
  args: { value: 60, size: 'md' },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const SizeLG: Story = {
  args: { value: 60, size: 'lg' },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Variants
export const VariantPrimary: Story = {
  args: { value: 60, variant: 'primary', showLabel: true },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const VariantSuccess: Story = {
  args: { value: 100, variant: 'success', showLabel: true },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const VariantWarning: Story = {
  args: { value: 45, variant: 'warning', showLabel: true },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const VariantDanger: Story = {
  args: { value: 25, variant: 'danger', showLabel: true },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const VariantInfo: Story = {
  args: { value: 80, variant: 'info', showLabel: true },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

export const VariantNeutral: Story = {
  args: { value: 50, variant: 'neutral', showLabel: true },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Animated
export const Animated: Story = {
  args: {
    value: 70,
    animated: true,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Striped
export const Striped: Story = {
  args: {
    value: 60,
    striped: true,
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

// Striped animated
export const StripedAnimated: Story = {
  args: {
    value: 75,
    striped: true,
    animated: true,
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

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <div>
        <p className="text-sm text-gray-500 mb-1">Extra Small (xs)</p>
        <Progress value={60} size="xs" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">Small (sm)</p>
        <Progress value={60} size="sm" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">Medium (md)</p>
        <Progress value={60} size="md" />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-1">Large (lg)</p>
        <Progress value={60} size="lg" />
      </div>
    </div>
  ),
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="w-96 space-y-3">
      <Progress value={60} variant="primary" showLabel />
      <Progress value={100} variant="success" showLabel />
      <Progress value={45} variant="warning" showLabel />
      <Progress value={25} variant="danger" showLabel />
      <Progress value={80} variant="info" showLabel />
      <Progress value={50} variant="neutral" showLabel />
    </div>
  ),
};

// Circular Progress
export const Circular: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <CircularProgress value={25} showLabel />
      <CircularProgress value={50} showLabel />
      <CircularProgress value={75} showLabel />
      <CircularProgress value={100} showLabel />
    </div>
  ),
};

// Circular sizes
export const CircularSizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <CircularProgress value={75} size={32} strokeWidth={3} showLabel />
      <CircularProgress value={75} size={48} strokeWidth={4} showLabel />
      <CircularProgress value={75} size={64} strokeWidth={5} showLabel />
      <CircularProgress value={75} size={80} strokeWidth={6} showLabel />
    </div>
  ),
};

// Circular variants
export const CircularVariants: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <CircularProgress value={75} variant="primary" showLabel />
      <CircularProgress value={75} variant="success" showLabel />
      <CircularProgress value={75} variant="warning" showLabel />
      <CircularProgress value={75} variant="danger" showLabel />
      <CircularProgress value={75} variant="info" showLabel />
    </div>
  ),
};

// Circular with custom label
export const CircularCustomLabel: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <CircularProgress value={3} max={5} size={64} label="3/5" showLabel />
      <CircularProgress
        value={850}
        max={1000}
        size={80}
        label={
          <>
            <span className="text-lg font-bold">850</span>
            <span className="text-xs text-gray-500 block">MXN</span>
          </>
        }
        showLabel
      />
    </div>
  ),
};

// Multi-segment progress
export const MultiSegment: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <div>
        <p className="text-sm text-gray-500 mb-2">Distribución de ventas por categoría</p>
        <MultiProgress
          segments={[
            { value: 40, variant: 'primary', label: 'Textiles 40%' },
            { value: 25, variant: 'success', label: 'Cerámica 25%' },
            { value: 20, variant: 'warning', label: 'Joyería 20%' },
            { value: 15, variant: 'info', label: 'Otros 15%' },
          ]}
          size="md"
        />
      </div>
    </div>
  ),
};

// Multi-segment sizes
export const MultiSegmentSizes: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <MultiProgress
        segments={[
          { value: 50, variant: 'primary' },
          { value: 30, variant: 'success' },
          { value: 20, variant: 'warning' },
        ]}
        size="xs"
      />
      <MultiProgress
        segments={[
          { value: 50, variant: 'primary' },
          { value: 30, variant: 'success' },
          { value: 20, variant: 'warning' },
        ]}
        size="sm"
      />
      <MultiProgress
        segments={[
          { value: 50, variant: 'primary' },
          { value: 30, variant: 'success' },
          { value: 20, variant: 'warning' },
        ]}
        size="md"
      />
      <MultiProgress
        segments={[
          { value: 50, variant: 'primary' },
          { value: 30, variant: 'success' },
          { value: 20, variant: 'warning' },
        ]}
        size="lg"
      />
    </div>
  ),
};

// Real-world: Order status
export const OrderStatus: Story = {
  render: () => (
    <div className="w-96 space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">Estado del pedido</span>
        <span className="font-medium text-primary-600">En camino</span>
      </div>
      <Progress value={66} variant="primary" size="md" animated />
      <div className="flex justify-between text-xs text-gray-500">
        <span>Confirmado</span>
        <span>Enviado</span>
        <span>Entregado</span>
      </div>
    </div>
  ),
};

// Real-world: Upload progress
export const UploadProgress: Story = {
  render: () => (
    <div className="w-96 space-y-3">
      <div className="flex justify-between text-sm">
        <span className="text-gray-700">imagen-producto.jpg</span>
        <span className="text-gray-500">78%</span>
      </div>
      <Progress value={78} variant="info" size="sm" striped animated />
    </div>
  ),
};

// Real-world: Profile completion
export const ProfileCompletion: Story = {
  render: () => (
    <div className="w-80 p-4 bg-white rounded-lg border">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium text-gray-700">Perfil de artesano</span>
        <CircularProgress value={70} size={40} strokeWidth={3} variant="success" showLabel />
      </div>
      <Progress value={70} variant="success" size="xs" />
      <p className="text-xs text-gray-500 mt-2">Completa tu perfil para aumentar tu visibilidad</p>
    </div>
  ),
};

// Real-world: Verification steps
export const VerificationSteps: Story = {
  render: () => (
    <div className="w-96 space-y-4">
      <h3 className="font-medium text-gray-900">Progreso de verificación</h3>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Email verificado</span>
            <span className="text-green-600">Completado</span>
          </div>
          <Progress value={100} variant="success" size="xs" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Identificación</span>
            <span className="text-yellow-600">En revisión</span>
          </div>
          <Progress value={50} variant="warning" size="xs" />
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Fotos del taller</span>
            <span className="text-gray-500">Pendiente</span>
          </div>
          <Progress value={0} variant="neutral" size="xs" />
        </div>
      </div>
    </div>
  ),
};
