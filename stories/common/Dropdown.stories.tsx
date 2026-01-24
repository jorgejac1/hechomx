import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import {
  Settings,
  User,
  LogOut,
  ChevronDown,
  Package,
  ShoppingCart,
  Heart,
  Bell,
  Filter,
  SortAsc,
} from 'lucide-react';
import Dropdown from '@/components/common/Dropdown';

/**
 * Dropdown component system for creating accessible dropdown menus.
 * Supports selection, icons, dividers, labels, and keyboard navigation.
 */
const meta: Meta<typeof Dropdown> = {
  title: 'Overlays/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A compound dropdown component with trigger, menu, items, dividers, and labels. Supports controlled/uncontrolled modes and keyboard navigation.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'ghost'],
      description: 'Visual variant of the trigger',
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

// Default
export const Default: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger placeholder="Selecciona una opción" />
      <Dropdown.Menu>
        <Dropdown.Item value="option1">Opción 1</Dropdown.Item>
        <Dropdown.Item value="option2">Opción 2</Dropdown.Item>
        <Dropdown.Item value="option3">Opción 3</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// With selection
export const WithSelection: Story = {
  render: function WithSelectionDropdown() {
    const [value, setValue] = useState<string | null>('oaxaca');
    const options = [
      { value: 'oaxaca', label: 'Oaxaca' },
      { value: 'chiapas', label: 'Chiapas' },
      { value: 'puebla', label: 'Puebla' },
      { value: 'michoacan', label: 'Michoacán' },
    ];
    const selectedOption = options.find((o) => o.value === value);

    return (
      <Dropdown value={value} onValueChange={setValue}>
        <Dropdown.Trigger placeholder="Selecciona un estado">
          {selectedOption?.label}
        </Dropdown.Trigger>
        <Dropdown.Menu>
          {options.map((option) => (
            <Dropdown.Item key={option.value} value={option.value}>
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  },
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger icon={User}>Mi cuenta</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item value="profile" icon={User}>
          Mi perfil
        </Dropdown.Item>
        <Dropdown.Item value="orders" icon={Package}>
          Mis pedidos
        </Dropdown.Item>
        <Dropdown.Item value="favorites" icon={Heart}>
          Favoritos
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item value="settings" icon={Settings}>
          Configuración
        </Dropdown.Item>
        <Dropdown.Item value="logout" icon={LogOut}>
          Cerrar sesión
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// With labels and dividers
export const WithLabelsAndDividers: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>Acciones</Dropdown.Trigger>
      <Dropdown.Menu minWidth={200}>
        <Dropdown.Label>Cuenta</Dropdown.Label>
        <Dropdown.Item value="profile" icon={User}>
          Ver perfil
        </Dropdown.Item>
        <Dropdown.Item value="settings" icon={Settings}>
          Configuración
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Label>Compras</Dropdown.Label>
        <Dropdown.Item value="orders" icon={Package}>
          Mis pedidos
        </Dropdown.Item>
        <Dropdown.Item value="cart" icon={ShoppingCart}>
          Mi carrito
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item value="logout" icon={LogOut}>
          Cerrar sesión
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// Variants
export const VariantDefault: Story = {
  render: () => (
    <Dropdown variant="default">
      <Dropdown.Trigger>Default</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item value="1">Opción 1</Dropdown.Item>
        <Dropdown.Item value="2">Opción 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const VariantOutline: Story = {
  render: () => (
    <Dropdown variant="outline">
      <Dropdown.Trigger>Outline</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item value="1">Opción 1</Dropdown.Item>
        <Dropdown.Item value="2">Opción 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const VariantGhost: Story = {
  render: () => (
    <Dropdown variant="ghost">
      <Dropdown.Trigger>Ghost</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item value="1">Opción 1</Dropdown.Item>
        <Dropdown.Item value="2">Opción 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// Sizes
export const SizeSmall: Story = {
  render: () => (
    <Dropdown size="sm">
      <Dropdown.Trigger>Pequeño</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item value="1">Opción 1</Dropdown.Item>
        <Dropdown.Item value="2">Opción 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const SizeMedium: Story = {
  render: () => (
    <Dropdown size="md">
      <Dropdown.Trigger>Mediano</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item value="1">Opción 1</Dropdown.Item>
        <Dropdown.Item value="2">Opción 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const SizeLarge: Story = {
  render: () => (
    <Dropdown size="lg">
      <Dropdown.Trigger>Grande</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item value="1">Opción 1</Dropdown.Item>
        <Dropdown.Item value="2">Opción 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// Placements
export const PlacementBottomStart: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>Bottom Start</Dropdown.Trigger>
      <Dropdown.Menu placement="bottom-start">
        <Dropdown.Item value="1">Opción 1</Dropdown.Item>
        <Dropdown.Item value="2">Opción 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const PlacementBottomEnd: Story = {
  render: () => (
    <div className="flex justify-end w-64">
      <Dropdown>
        <Dropdown.Trigger>Bottom End</Dropdown.Trigger>
        <Dropdown.Menu placement="bottom-end">
          <Dropdown.Item value="1">Opción 1</Dropdown.Item>
          <Dropdown.Item value="2">Opción 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ),
};

// Disabled trigger
export const Disabled: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger disabled>Deshabilitado</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item value="1">Opción 1</Dropdown.Item>
        <Dropdown.Item value="2">Opción 2</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// Disabled item
export const DisabledItem: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger>Con item deshabilitado</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item value="1">Opción disponible</Dropdown.Item>
        <Dropdown.Item value="2" disabled>
          Opción no disponible
        </Dropdown.Item>
        <Dropdown.Item value="3">Otra opción</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// Without chevron
export const WithoutChevron: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger showChevron={false} icon={Settings} />
      <Dropdown.Menu>
        <Dropdown.Item value="1">Configuración</Dropdown.Item>
        <Dropdown.Item value="2">Preferencias</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Dropdown size="sm">
        <Dropdown.Trigger>Small</Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item value="1">Opción 1</Dropdown.Item>
          <Dropdown.Item value="2">Opción 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown size="md">
        <Dropdown.Trigger>Medium</Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item value="1">Opción 1</Dropdown.Item>
          <Dropdown.Item value="2">Opción 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown size="lg">
        <Dropdown.Trigger>Large</Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item value="1">Opción 1</Dropdown.Item>
          <Dropdown.Item value="2">Opción 2</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ),
};

// Filter example
export const FilterExample: Story = {
  render: function FilterDropdown() {
    const [value, setValue] = useState<string | null>('newest');
    const options = [
      { value: 'newest', label: 'Más recientes' },
      { value: 'price_asc', label: 'Precio: menor a mayor' },
      { value: 'price_desc', label: 'Precio: mayor a menor' },
      { value: 'popular', label: 'Más populares' },
    ];
    const selectedOption = options.find((o) => o.value === value);

    return (
      <Dropdown value={value} onValueChange={setValue} size="sm">
        <Dropdown.Trigger icon={SortAsc}>{selectedOption?.label || 'Ordenar'}</Dropdown.Trigger>
        <Dropdown.Menu>
          {options.map((option) => (
            <Dropdown.Item key={option.value} value={option.value}>
              {option.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  },
};

// User menu example
export const UserMenuExample: Story = {
  render: () => (
    <Dropdown variant="ghost">
      <Dropdown.Trigger icon={User} showChevron={false}>
        María G.
      </Dropdown.Trigger>
      <Dropdown.Menu placement="bottom-end" minWidth={220}>
        <div className="px-4 py-3 border-b border-gray-200">
          <p className="text-sm font-medium text-gray-900">María García</p>
          <p className="text-xs text-gray-500">maria@ejemplo.com</p>
        </div>
        <Dropdown.Item value="profile" icon={User}>
          Mi perfil
        </Dropdown.Item>
        <Dropdown.Item value="orders" icon={Package}>
          Mis pedidos
        </Dropdown.Item>
        <Dropdown.Item value="favorites" icon={Heart}>
          Favoritos
        </Dropdown.Item>
        <Dropdown.Item value="notifications" icon={Bell}>
          Notificaciones
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item value="settings" icon={Settings}>
          Configuración
        </Dropdown.Item>
        <Dropdown.Item value="logout" icon={LogOut}>
          Cerrar sesión
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

// Category filter example
export const CategoryFilterExample: Story = {
  render: function CategoryFilterDropdown() {
    const [value, setValue] = useState<string | null>(null);
    const categories = [
      { value: 'textiles', label: 'Textiles' },
      { value: 'ceramica', label: 'Cerámica' },
      { value: 'joyeria', label: 'Joyería' },
      { value: 'madera', label: 'Madera' },
      { value: 'cuero', label: 'Cuero' },
    ];
    const selectedCategory = categories.find((c) => c.value === value);

    return (
      <Dropdown value={value} onValueChange={setValue} size="sm" variant="outline">
        <Dropdown.Trigger icon={Filter}>{selectedCategory?.label || 'Categoría'}</Dropdown.Trigger>
        <Dropdown.Menu>
          <Dropdown.Item value="">Todas las categorías</Dropdown.Item>
          <Dropdown.Divider />
          {categories.map((category) => (
            <Dropdown.Item key={category.value} value={category.value}>
              {category.label}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  },
};
