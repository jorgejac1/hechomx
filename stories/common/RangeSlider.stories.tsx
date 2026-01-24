import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import RangeSlider from '@/components/common/RangeSlider';

/**
 * RangeSlider component for selecting numeric values or ranges.
 * Features single and dual-handle modes, tooltips, marks, keyboard navigation,
 * and customizable appearance with multiple sizes and colors.
 */
const meta: Meta<typeof RangeSlider> = {
  title: 'Inputs/RangeSlider',
  component: RangeSlider,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A slider component for numeric value or range selection. Supports single and dual handles, tooltips, marks, and full keyboard navigation.',
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
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'warning', 'error'],
      description: 'Color theme',
    },
    range: {
      control: 'boolean',
      description: 'Whether to show two handles for selecting a range',
    },
    showMinMax: {
      control: 'boolean',
      description: 'Whether to show min/max value labels',
    },
    showTooltip: {
      control: 'boolean',
      description: 'Whether to show value tooltip',
    },
    alwaysShowTooltip: {
      control: 'boolean',
      description: 'Whether tooltip is always visible',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the slider is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
  },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

// With label
export const WithLabel: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 75,
    label: 'Volumen',
  },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

// Range mode
export const Range: Story = {
  args: {
    min: 0,
    max: 1000,
    defaultValue: [200, 800],
    range: true,
    label: 'Rango de precio',
  },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

// With custom step
export const WithStep: Story = {
  args: {
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 50,
    label: 'Porcentaje',
  },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

// Always show tooltip
export const AlwaysShowTooltip: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 65,
    alwaysShowTooltip: true,
    label: 'Brillo',
  },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

// No tooltip
export const NoTooltip: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
    showTooltip: false,
    label: 'Valor',
  },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

// No min/max labels
export const NoMinMax: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
    showMinMax: false,
    label: 'Progreso',
  },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

// Sizes
export const SizeSmall: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
    size: 'sm',
    label: 'Pequeño',
  },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

export const SizeMedium: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
    size: 'md',
    label: 'Mediano',
  },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

export const SizeLarge: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
    size: 'lg',
    label: 'Grande',
  },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

// Colors
export const ColorPrimary: Story = {
  args: { min: 0, max: 100, defaultValue: 60, color: 'primary', label: 'Primary' },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

export const ColorSecondary: Story = {
  args: { min: 0, max: 100, defaultValue: 60, color: 'secondary', label: 'Secondary' },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

export const ColorSuccess: Story = {
  args: { min: 0, max: 100, defaultValue: 60, color: 'success', label: 'Success' },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

export const ColorWarning: Story = {
  args: { min: 0, max: 100, defaultValue: 60, color: 'warning', label: 'Warning' },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

export const ColorError: Story = {
  args: { min: 0, max: 100, defaultValue: 60, color: 'error', label: 'Error' },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

// Disabled
export const Disabled: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
    disabled: true,
    label: 'Deshabilitado',
  },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

// With marks (auto)
export const WithMarksAuto: Story = {
  args: {
    min: 0,
    max: 100,
    step: 20,
    defaultValue: 40,
    marks: true,
    label: 'Con marcas automáticas',
  },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

// With marks (custom values)
export const WithMarksCustom: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
    marks: [0, 25, 50, 75, 100],
    label: 'Con marcas personalizadas',
  },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

// With marks and labels
export const WithMarksLabels: Story = {
  args: {
    min: 0,
    max: 100,
    defaultValue: 50,
    marks: [
      { value: 0, label: 'Bajo' },
      { value: 50, label: 'Medio' },
      { value: 100, label: 'Alto' },
    ],
    label: 'Nivel de calidad',
  },
  decorators: [
    (Story) => (
      <div className="w-80 py-12">
        <Story />
      </div>
    ),
  ],
};

// Custom format
export const CustomFormat: Story = {
  args: {
    min: 0,
    max: 10000,
    step: 100,
    defaultValue: 5000,
    formatValue: (v) => `$${v.toLocaleString()} MXN`,
    label: 'Precio máximo',
    alwaysShowTooltip: true,
  },
  decorators: [
    (Story) => (
      <div className="w-80 py-8">
        <Story />
      </div>
    ),
  ],
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div className="w-80 space-y-12 py-8">
      <RangeSlider min={0} max={100} defaultValue={50} size="sm" label="Pequeño (sm)" />
      <RangeSlider min={0} max={100} defaultValue={50} size="md" label="Mediano (md)" />
      <RangeSlider min={0} max={100} defaultValue={50} size="lg" label="Grande (lg)" />
    </div>
  ),
};

// All colors comparison
export const AllColors: Story = {
  render: () => (
    <div className="w-80 space-y-8 py-8">
      <RangeSlider min={0} max={100} defaultValue={60} color="primary" label="Primary" />
      <RangeSlider min={0} max={100} defaultValue={60} color="secondary" label="Secondary" />
      <RangeSlider min={0} max={100} defaultValue={60} color="success" label="Success" />
      <RangeSlider min={0} max={100} defaultValue={60} color="warning" label="Warning" />
      <RangeSlider min={0} max={100} defaultValue={60} color="error" label="Error" />
    </div>
  ),
};

// Controlled example
export const Controlled: Story = {
  render: function ControlledSlider() {
    const [value, setValue] = useState(50);

    return (
      <div className="w-80 space-y-4 py-8">
        <RangeSlider
          min={0}
          max={100}
          value={value}
          onChange={(v) => setValue(v as number)}
          label="Valor controlado"
          alwaysShowTooltip
        />
        <div className="flex gap-2">
          <button
            onClick={() => setValue(0)}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Min
          </button>
          <button
            onClick={() => setValue(50)}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            50%
          </button>
          <button
            onClick={() => setValue(100)}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Max
          </button>
        </div>
        <p className="text-sm text-gray-600">Valor actual: {value}</p>
      </div>
    );
  },
};

// Controlled range
export const ControlledRange: Story = {
  render: function ControlledRangeSlider() {
    const [value, setValue] = useState<[number, number]>([2000, 8000]);

    return (
      <div className="w-96 space-y-4 py-8">
        <RangeSlider
          min={0}
          max={10000}
          step={100}
          value={value}
          onChange={(v) => setValue(v as [number, number])}
          range
          label="Rango de precio"
          formatValue={(v) => `$${v.toLocaleString()}`}
          alwaysShowTooltip
        />
        <p className="text-sm text-gray-600">
          Rango seleccionado: ${value[0].toLocaleString()} - ${value[1].toLocaleString()} MXN
        </p>
      </div>
    );
  },
};

// Real-world: Price filter
export const PriceFilter: Story = {
  render: function PriceFilterExample() {
    const [range, setRange] = useState<[number, number]>([500, 5000]);

    return (
      <div className="max-w-sm p-4 border rounded-lg bg-white">
        <h3 className="font-semibold text-gray-900 mb-4">Filtrar por precio</h3>
        <RangeSlider
          min={0}
          max={10000}
          step={100}
          value={range}
          onChange={(v) => setRange(v as [number, number])}
          range
          formatValue={(v) => `$${v.toLocaleString()}`}
          showMinMax={false}
        />
        <div className="flex justify-between mt-4 text-sm">
          <div className="text-gray-600">
            <span className="text-gray-400">Mín:</span> ${range[0].toLocaleString()} MXN
          </div>
          <div className="text-gray-600">
            <span className="text-gray-400">Máx:</span> ${range[1].toLocaleString()} MXN
          </div>
        </div>
        <button className="w-full mt-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
          Aplicar filtro
        </button>
      </div>
    );
  },
};

// Real-world: Rating filter
export const RatingFilter: Story = {
  render: function RatingFilterExample() {
    const [minRating, setMinRating] = useState(3);

    return (
      <div className="max-w-sm p-4 border rounded-lg bg-white">
        <h3 className="font-semibold text-gray-900 mb-4">Calificación mínima</h3>
        <RangeSlider
          min={1}
          max={5}
          step={0.5}
          value={minRating}
          onChange={(v) => setMinRating(v as number)}
          formatValue={(v) => `${v} ★`}
          marks={[
            { value: 1, label: '1★' },
            { value: 2, label: '2★' },
            { value: 3, label: '3★' },
            { value: 4, label: '4★' },
            { value: 5, label: '5★' },
          ]}
          color="warning"
          showMinMax={false}
        />
        <p className="mt-6 text-sm text-gray-600">Mostrando productos con {minRating}+ estrellas</p>
      </div>
    );
  },
};

// Real-world: Quantity selector
export const QuantitySelector: Story = {
  render: function QuantitySelectorExample() {
    const [quantity, setQuantity] = useState(10);

    return (
      <div className="max-w-sm p-4 border rounded-lg bg-white">
        <h3 className="font-semibold text-gray-900 mb-2">Cantidad</h3>
        <p className="text-sm text-gray-500 mb-4">Pedido mínimo: 5 unidades</p>
        <RangeSlider
          min={5}
          max={100}
          step={5}
          value={quantity}
          onChange={(v) => setQuantity(v as number)}
          formatValue={(v) => `${v} piezas`}
          marks={[5, 25, 50, 75, 100]}
          alwaysShowTooltip
        />
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Precio unitario:</span>
            <span className="font-medium">${quantity >= 50 ? '180' : '200'} MXN</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-600">Total:</span>
            <span className="font-bold text-primary-600">
              ${(quantity * (quantity >= 50 ? 180 : 200)).toLocaleString()} MXN
            </span>
          </div>
          {quantity >= 50 && (
            <p className="text-xs text-green-600 mt-2">¡10% de descuento aplicado!</p>
          )}
        </div>
      </div>
    );
  },
};

// Real-world: Shipping weight
export const ShippingWeight: Story = {
  render: function ShippingWeightExample() {
    const [weight, setWeight] = useState(2);

    const getShippingCost = (w: number) => {
      if (w <= 1) return 99;
      if (w <= 3) return 149;
      if (w <= 5) return 199;
      return 249;
    };

    return (
      <div className="max-w-sm p-4 border rounded-lg bg-white">
        <h3 className="font-semibold text-gray-900 mb-4">Calcular envío</h3>
        <RangeSlider
          min={0.5}
          max={10}
          step={0.5}
          value={weight}
          onChange={(v) => setWeight(v as number)}
          label="Peso del paquete"
          formatValue={(v) => `${v} kg`}
          marks={[
            { value: 1, label: '1kg' },
            { value: 3, label: '3kg' },
            { value: 5, label: '5kg' },
            { value: 10, label: '10kg' },
          ]}
          alwaysShowTooltip
        />
        <div className="mt-8 p-3 bg-primary-50 rounded-lg">
          <p className="text-sm text-primary-700">
            Costo de envío estimado: <strong>${getShippingCost(weight)} MXN</strong>
          </p>
        </div>
      </div>
    );
  },
};

// All states
export const AllStates: Story = {
  render: () => (
    <div className="w-80 space-y-12 py-8">
      <RangeSlider min={0} max={100} defaultValue={50} label="Normal" />
      <RangeSlider
        min={0}
        max={100}
        defaultValue={50}
        label="Con tooltip siempre visible"
        alwaysShowTooltip
      />
      <RangeSlider min={0} max={100} defaultValue={[25, 75]} range label="Modo rango" />
      <RangeSlider min={0} max={100} step={20} defaultValue={40} marks label="Con marcas" />
      <RangeSlider min={0} max={100} defaultValue={50} disabled label="Deshabilitado" />
    </div>
  ),
};
