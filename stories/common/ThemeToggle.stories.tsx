import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ThemeToggle from '@/components/common/ThemeToggle';

/**
 * ThemeToggle component for switching between light, dark, and system themes.
 * Supports simple toggle or dropdown variants.
 */
const meta: Meta<typeof ThemeToggle> = {
  title: 'Utilities/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A theme toggle component for switching between light, dark, and system color modes. Handles hydration mismatch and persists theme preference.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['toggle', 'dropdown'],
      description: 'Toggle or dropdown variant',
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

// Default toggle
export const Default: Story = {
  args: {
    variant: 'toggle',
  },
};

// Toggle variant
export const Toggle: Story = {
  args: {
    variant: 'toggle',
  },
};

// Dropdown variant
export const Dropdown: Story = {
  args: {
    variant: 'dropdown',
  },
};

// Sizes
export const SizeSmall: Story = {
  args: {
    variant: 'toggle',
    size: 'sm',
  },
};

export const SizeMedium: Story = {
  args: {
    variant: 'toggle',
    size: 'md',
  },
};

export const SizeLarge: Story = {
  args: {
    variant: 'toggle',
    size: 'lg',
  },
};

// Dropdown sizes
export const DropdownSmall: Story = {
  args: {
    variant: 'dropdown',
    size: 'sm',
  },
};

export const DropdownMedium: Story = {
  args: {
    variant: 'dropdown',
    size: 'md',
  },
};

export const DropdownLarge: Story = {
  args: {
    variant: 'dropdown',
    size: 'lg',
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ThemeToggle size="sm" />
      <ThemeToggle size="md" />
      <ThemeToggle size="lg" />
    </div>
  ),
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">Toggle</p>
        <ThemeToggle variant="toggle" />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">Dropdown</p>
        <ThemeToggle variant="dropdown" />
      </div>
    </div>
  ),
};

// Header example
export const HeaderExample: Story = {
  render: () => (
    <div className="flex items-center justify-between w-96 px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg">
      <span className="font-semibold text-gray-900 dark:text-white">Mi cuenta</span>
      <ThemeToggle size="sm" />
    </div>
  ),
};

// Settings panel example
export const SettingsPanelExample: Story = {
  render: () => (
    <div className="w-80 p-4 bg-white dark:bg-gray-800 border rounded-lg space-y-4">
      <h3 className="font-semibold text-gray-900 dark:text-white">Configuración</h3>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-gray-700 dark:text-gray-300">Tema</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Elige tu preferencia de color</p>
        </div>
        <ThemeToggle variant="dropdown" size="sm" />
      </div>
    </div>
  ),
};

// Mobile menu example
export const MobileMenuExample: Story = {
  render: () => (
    <div className="w-72 bg-white dark:bg-gray-800 border rounded-lg">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <h3 className="font-semibold text-gray-900 dark:text-white">Menú</h3>
      </div>
      <nav className="p-2">
        <a
          href="#"
          className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        >
          Inicio
        </a>
        <a
          href="#"
          className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        >
          Productos
        </a>
        <a
          href="#"
          className="block px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
        >
          Mi cuenta
        </a>
      </nav>
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">Modo oscuro</span>
        <ThemeToggle size="sm" />
      </div>
    </div>
  ),
};

// Footer example
export const FooterExample: Story = {
  render: () => (
    <div className="w-full max-w-lg p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">© 2024 Papalote Market</p>
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Ayuda
          </a>
          <a
            href="#"
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Contacto
          </a>
          <ThemeToggle size="sm" />
        </div>
      </div>
    </div>
  ),
};
