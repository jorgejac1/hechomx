import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Save, Send, Download, Trash2, Plus, ShoppingCart } from 'lucide-react';
import LoadingButton from '@/components/common/LoadingButton';

/**
 * LoadingButton component extending Button with loading state support.
 * Displays a spinner and optional loading text while async operations are in progress.
 */
const meta: Meta<typeof LoadingButton> = {
  title: 'Buttons/LoadingButton',
  component: LoadingButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A button component that shows a loading spinner during async operations. Automatically disables interaction while loading.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'outline'],
      description: 'Visual variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Full width button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    children: 'Guardar',
    isLoading: false,
  },
};

// Loading
export const Loading: Story = {
  args: {
    children: 'Guardar',
    isLoading: true,
  },
};

// With loading text
export const WithLoadingText: Story = {
  args: {
    children: 'Guardar',
    isLoading: true,
    loadingText: 'Guardando...',
  },
};

// With icon
export const WithIcon: Story = {
  args: {
    children: 'Guardar',
    icon: <Save className="w-4 h-4" />,
    isLoading: false,
  },
};

// With icon loading
export const WithIconLoading: Story = {
  args: {
    children: 'Guardar',
    icon: <Save className="w-4 h-4" />,
    isLoading: true,
  },
};

// Variants
export const VariantPrimary: Story = {
  args: {
    children: 'Primary',
    variant: 'primary',
    isLoading: true,
    loadingText: 'Procesando...',
  },
};

export const VariantSecondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
    isLoading: true,
    loadingText: 'Procesando...',
  },
};

export const VariantOutline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
    isLoading: true,
    loadingText: 'Procesando...',
  },
};

export const VariantGhost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
    isLoading: true,
    loadingText: 'Procesando...',
  },
};

// Sizes
export const SizeSmall: Story = {
  args: {
    children: 'Small',
    size: 'sm',
    isLoading: true,
  },
};

export const SizeMedium: Story = {
  args: {
    children: 'Medium',
    size: 'md',
    isLoading: true,
  },
};

export const SizeLarge: Story = {
  args: {
    children: 'Large',
    size: 'lg',
    isLoading: true,
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    children: 'Enviar pedido',
    fullWidth: true,
    isLoading: true,
    loadingText: 'Procesando pedido...',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// Interactive example
export const Interactive: Story = {
  render: function InteractiveLoadingButton() {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    return (
      <LoadingButton
        isLoading={isLoading}
        onClick={handleClick}
        loadingText="Guardando..."
        icon={<Save className="w-4 h-4" />}
      >
        Guardar cambios
      </LoadingButton>
    );
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <LoadingButton size="sm" isLoading loadingText="Cargando..." />
      <LoadingButton size="md" isLoading loadingText="Cargando..." />
      <LoadingButton size="lg" isLoading loadingText="Cargando..." />
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <LoadingButton variant="primary" isLoading loadingText="Primary..." />
      <LoadingButton variant="secondary" isLoading loadingText="Secondary..." />
      <LoadingButton variant="outline" isLoading loadingText="Outline..." />
      <LoadingButton variant="ghost" isLoading loadingText="Ghost..." />
    </div>
  ),
};

// Common use cases
export const SaveButton: Story = {
  render: function SaveButtonExample() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSave = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <LoadingButton
        isLoading={isLoading}
        onClick={handleSave}
        icon={<Save className="w-4 h-4" />}
        loadingText="Guardando..."
      >
        Guardar
      </LoadingButton>
    );
  },
};

export const SendButton: Story = {
  render: function SendButtonExample() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSend = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <LoadingButton
        isLoading={isLoading}
        onClick={handleSend}
        icon={<Send className="w-4 h-4" />}
        loadingText="Enviando..."
      >
        Enviar mensaje
      </LoadingButton>
    );
  },
};

export const DeleteButton: Story = {
  render: function DeleteButtonExample() {
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <LoadingButton
        isLoading={isLoading}
        onClick={handleDelete}
        icon={<Trash2 className="w-4 h-4" />}
        loadingText="Eliminando..."
        variant="outline"
        className="text-red-600 hover:text-red-700 hover:bg-red-50"
      >
        Eliminar
      </LoadingButton>
    );
  },
};

export const DownloadButton: Story = {
  render: function DownloadButtonExample() {
    const [isLoading, setIsLoading] = useState(false);

    const handleDownload = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 3000);
    };

    return (
      <LoadingButton
        isLoading={isLoading}
        onClick={handleDownload}
        icon={<Download className="w-4 h-4" />}
        loadingText="Descargando..."
        variant="secondary"
      >
        Descargar reporte
      </LoadingButton>
    );
  },
};

// Form submit example
export const FormSubmitExample: Story = {
  render: function FormSubmitExample() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2500);
    };

    return (
      <form onSubmit={handleSubmit} className="w-80 space-y-4 p-4 border rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="tu@email.com"
          />
        </div>
        <LoadingButton type="submit" isLoading={isLoading} loadingText="Enviando..." fullWidth>
          Suscribirse
        </LoadingButton>
      </form>
    );
  },
};

// Add to cart example
export const AddToCartExample: Story = {
  render: function AddToCartExample() {
    const [isLoading, setIsLoading] = useState(false);

    const handleAddToCart = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 1500);
    };

    return (
      <LoadingButton
        isLoading={isLoading}
        onClick={handleAddToCart}
        icon={<ShoppingCart className="w-4 h-4" />}
        loadingText="Agregando..."
        size="lg"
        fullWidth
      >
        Agregar al carrito
      </LoadingButton>
    );
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

// Create new example
export const CreateNewExample: Story = {
  render: function CreateNewExample() {
    const [isLoading, setIsLoading] = useState(false);

    const handleCreate = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    };

    return (
      <LoadingButton
        isLoading={isLoading}
        onClick={handleCreate}
        icon={<Plus className="w-4 h-4" />}
        loadingText="Creando..."
      >
        Nuevo producto
      </LoadingButton>
    );
  },
};
