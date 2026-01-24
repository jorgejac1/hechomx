import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { MapPin, Tag, Truck } from 'lucide-react';
import Select from '@/components/common/Select';

/**
 * Select dropdown component with option groups support.
 * Features label, error/hint messages, icons, and multiple sizes.
 */
const meta: Meta<typeof Select> = {
  title: 'Inputs/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A select component supporting flat options and grouped options. Features left icons, error states, hints, and multiple sizes.',
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
    fullWidth: {
      control: 'boolean',
      description: 'Whether to take full width',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const categoryOptions = [
  { value: 'textiles', label: 'Textiles' },
  { value: 'ceramica', label: 'Cerámica' },
  { value: 'joyeria', label: 'Joyería' },
  { value: 'madera', label: 'Madera' },
  { value: 'cuero', label: 'Cuero' },
];

// Default
export const Default: Story = {
  args: {
    label: 'Categoría',
    placeholder: 'Selecciona una categoría',
    options: categoryOptions,
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

// With value
export const WithValue: Story = {
  args: {
    label: 'Categoría',
    options: categoryOptions,
    defaultValue: 'textiles',
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

// Sizes
export const SizeSmall: Story = {
  args: {
    label: 'Tamaño pequeño',
    options: categoryOptions,
    size: 'sm',
    placeholder: 'Selecciona...',
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export const SizeMedium: Story = {
  args: {
    label: 'Tamaño mediano',
    options: categoryOptions,
    size: 'md',
    placeholder: 'Selecciona...',
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export const SizeLarge: Story = {
  args: {
    label: 'Tamaño grande',
    options: categoryOptions,
    size: 'lg',
    placeholder: 'Selecciona...',
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

// With hint
export const WithHint: Story = {
  args: {
    label: 'Estado',
    placeholder: 'Selecciona tu estado',
    options: [
      { value: 'oaxaca', label: 'Oaxaca' },
      { value: 'chiapas', label: 'Chiapas' },
      { value: 'puebla', label: 'Puebla' },
    ],
    hint: 'Selecciona el estado donde se elaboró el producto.',
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

// With error
export const WithError: Story = {
  args: {
    label: 'Categoría',
    placeholder: 'Selecciona una categoría',
    options: categoryOptions,
    error: 'Este campo es obligatorio.',
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

// Required
export const Required: Story = {
  args: {
    label: 'Categoría',
    placeholder: 'Selecciona una categoría',
    options: categoryOptions,
    required: true,
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Categoría',
    options: categoryOptions,
    defaultValue: 'textiles',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

// With disabled option
export const WithDisabledOption: Story = {
  args: {
    label: 'Categoría',
    placeholder: 'Selecciona una categoría',
    options: [
      { value: 'textiles', label: 'Textiles' },
      { value: 'ceramica', label: 'Cerámica' },
      { value: 'joyeria', label: 'Joyería (Agotado)', disabled: true },
      { value: 'madera', label: 'Madera' },
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

// With left icon
export const WithIcon: Story = {
  args: {
    label: 'Estado de origen',
    placeholder: 'Selecciona un estado',
    options: [
      { value: 'oaxaca', label: 'Oaxaca' },
      { value: 'chiapas', label: 'Chiapas' },
      { value: 'puebla', label: 'Puebla' },
      { value: 'michoacan', label: 'Michoacán' },
    ],
    leftIcon: <MapPin className="w-5 h-5" />,
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

// With option groups
export const WithGroups: Story = {
  args: {
    label: 'Producto',
    placeholder: 'Selecciona un producto',
    options: [
      {
        label: 'Textiles',
        options: [
          { value: 'rebozo', label: 'Rebozo' },
          { value: 'huipil', label: 'Huipil' },
          { value: 'tapete', label: 'Tapete' },
        ],
      },
      {
        label: 'Cerámica',
        options: [
          { value: 'olla', label: 'Olla de barro' },
          { value: 'plato', label: 'Plato decorativo' },
          { value: 'talavera', label: 'Talavera' },
        ],
      },
      {
        label: 'Joyería',
        options: [
          { value: 'collar', label: 'Collar de plata' },
          { value: 'aretes', label: 'Aretes' },
          { value: 'pulsera', label: 'Pulsera' },
        ],
      },
    ],
  },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="w-72 space-y-4">
      <Select label="Small" size="sm" options={categoryOptions} placeholder="Selecciona..." />
      <Select label="Medium" size="md" options={categoryOptions} placeholder="Selecciona..." />
      <Select label="Large" size="lg" options={categoryOptions} placeholder="Selecciona..." />
    </div>
  ),
};

// Controlled
export const Controlled: Story = {
  render: function ControlledSelect() {
    const [value, setValue] = useState('');

    return (
      <div className="w-72 space-y-4">
        <Select
          label="Categoría seleccionada"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          options={categoryOptions}
          placeholder="Selecciona una categoría"
        />
        <p className="text-sm text-gray-500">Valor: {value || 'ninguno'}</p>
        <button
          onClick={() => setValue('ceramica')}
          className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          Seleccionar Cerámica
        </button>
      </div>
    );
  },
};

// Form example
export const FormExample: Story = {
  render: () => (
    <div className="w-80 space-y-4 p-4 border rounded-lg">
      <h3 className="font-semibold text-gray-900">Información del producto</h3>

      <Select
        label="Categoría"
        placeholder="Selecciona una categoría"
        options={categoryOptions}
        leftIcon={<Tag className="w-5 h-5" />}
        required
      />

      <Select
        label="Estado de origen"
        placeholder="Selecciona un estado"
        options={[
          { value: 'oaxaca', label: 'Oaxaca' },
          { value: 'chiapas', label: 'Chiapas' },
          { value: 'puebla', label: 'Puebla' },
          { value: 'michoacan', label: 'Michoacán' },
          { value: 'guerrero', label: 'Guerrero' },
        ]}
        leftIcon={<MapPin className="w-5 h-5" />}
        required
      />

      <Select
        label="Método de envío"
        placeholder="Selecciona un método"
        options={[
          { value: 'standard', label: 'Estándar (3-5 días)' },
          { value: 'express', label: 'Express (1-2 días)' },
          { value: 'pickup', label: 'Recoger en tienda' },
        ]}
        leftIcon={<Truck className="w-5 h-5" />}
        hint="El costo varía según el destino."
      />
    </div>
  ),
};

// Filter example
export const FilterExample: Story = {
  render: () => (
    <div className="flex gap-3">
      <Select
        size="sm"
        placeholder="Categoría"
        options={categoryOptions}
        fullWidth={false}
        className="w-36"
      />
      <Select
        size="sm"
        placeholder="Estado"
        options={[
          { value: 'oaxaca', label: 'Oaxaca' },
          { value: 'chiapas', label: 'Chiapas' },
          { value: 'puebla', label: 'Puebla' },
        ]}
        fullWidth={false}
        className="w-36"
      />
      <Select
        size="sm"
        placeholder="Ordenar por"
        options={[
          { value: 'price_asc', label: 'Precio: menor a mayor' },
          { value: 'price_desc', label: 'Precio: mayor a menor' },
          { value: 'newest', label: 'Más recientes' },
          { value: 'popular', label: 'Más populares' },
        ]}
        fullWidth={false}
        className="w-48"
      />
    </div>
  ),
};

// Shipping calculator example
export const ShippingCalculator: Story = {
  render: () => (
    <div className="w-80 p-4 border rounded-lg space-y-4">
      <h3 className="font-semibold text-gray-900">Calcular envío</h3>

      <Select
        label="País"
        options={[
          { value: 'mx', label: 'México' },
          { value: 'us', label: 'Estados Unidos' },
          { value: 'ca', label: 'Canadá' },
          { value: 'es', label: 'España' },
        ]}
        defaultValue="mx"
      />

      <Select
        label="Estado"
        placeholder="Selecciona un estado"
        options={[
          {
            label: 'Norte',
            options: [
              { value: 'nl', label: 'Nuevo León' },
              { value: 'coah', label: 'Coahuila' },
              { value: 'chih', label: 'Chihuahua' },
            ],
          },
          {
            label: 'Centro',
            options: [
              { value: 'cdmx', label: 'Ciudad de México' },
              { value: 'edomex', label: 'Estado de México' },
              { value: 'pue', label: 'Puebla' },
            ],
          },
          {
            label: 'Sur',
            options: [
              { value: 'oax', label: 'Oaxaca' },
              { value: 'chis', label: 'Chiapas' },
              { value: 'yuc', label: 'Yucatán' },
            ],
          },
        ]}
      />

      <button className="w-full py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors">
        Calcular
      </button>
    </div>
  ),
};
