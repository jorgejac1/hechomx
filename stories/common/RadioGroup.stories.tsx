import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { CreditCard, Truck, Package, Building, User, Home } from 'lucide-react';
import RadioGroup from '@/components/common/RadioGroup';

/**
 * RadioGroup component for managing multiple radio buttons.
 * Supports default, cards, and buttons variants with icons and descriptions.
 */
const meta: Meta<typeof RadioGroup> = {
  title: 'Inputs/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A compound radio group component supporting default, cards, and buttons variants. Features horizontal/vertical layouts, icons, and descriptions.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'cards', 'buttons'],
      description: 'Visual variant',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout orientation',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable all options',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const paymentOptions = [
  { value: 'card', label: 'Tarjeta de crédito' },
  { value: 'paypal', label: 'PayPal' },
  { value: 'transfer', label: 'Transferencia bancaria' },
];

// Default
export const Default: Story = {
  render: function DefaultRadioGroup() {
    const [value, setValue] = useState('card');
    return (
      <div className="max-w-md">
        <RadioGroup
          label="Método de pago"
          value={value}
          onChange={setValue}
          options={paymentOptions}
        />
      </div>
    );
  },
};

// With descriptions
export const WithDescriptions: Story = {
  render: function WithDescriptionsRadioGroup() {
    const [value, setValue] = useState('standard');
    return (
      <div className="max-w-md">
        <RadioGroup
          label="Tipo de envío"
          value={value}
          onChange={setValue}
          options={[
            {
              value: 'standard',
              label: 'Envío estándar',
              description: '3-5 días hábiles',
            },
            {
              value: 'express',
              label: 'Envío express',
              description: '1-2 días hábiles',
            },
            {
              value: 'pickup',
              label: 'Recoger en tienda',
              description: 'Disponible en 24 horas',
            },
          ]}
        />
      </div>
    );
  },
};

// Cards variant
export const CardsVariant: Story = {
  render: function CardsRadioGroup() {
    const [value, setValue] = useState('card');
    return (
      <div className="max-w-lg">
        <RadioGroup
          label="Método de pago"
          value={value}
          onChange={setValue}
          variant="cards"
          options={[
            {
              value: 'card',
              label: 'Tarjeta de crédito',
              description: 'Visa, Mastercard, American Express',
              icon: <CreditCard className="w-5 h-5" />,
            },
            {
              value: 'transfer',
              label: 'Transferencia bancaria',
              description: 'SPEI - 24-48 horas',
              icon: <Building className="w-5 h-5" />,
            },
            {
              value: 'cash',
              label: 'Pago en efectivo',
              description: 'OXXO, 7-Eleven',
              icon: <Package className="w-5 h-5" />,
            },
          ]}
        />
      </div>
    );
  },
};

// Buttons variant
export const ButtonsVariant: Story = {
  render: function ButtonsRadioGroup() {
    const [value, setValue] = useState('sm');
    return (
      <RadioGroup
        label="Talla"
        value={value}
        onChange={setValue}
        variant="buttons"
        orientation="horizontal"
        options={[
          { value: 'xs', label: 'XS' },
          { value: 'sm', label: 'S' },
          { value: 'md', label: 'M' },
          { value: 'lg', label: 'L' },
          { value: 'xl', label: 'XL' },
        ]}
      />
    );
  },
};

// Buttons with icons
export const ButtonsWithIcons: Story = {
  render: function ButtonsWithIconsRadioGroup() {
    const [value, setValue] = useState('home');
    return (
      <RadioGroup
        label="Tipo de dirección"
        value={value}
        onChange={setValue}
        variant="buttons"
        orientation="horizontal"
        options={[
          { value: 'home', label: 'Casa', icon: <Home className="w-4 h-4" /> },
          { value: 'work', label: 'Trabajo', icon: <Building className="w-4 h-4" /> },
          { value: 'other', label: 'Otro', icon: <User className="w-4 h-4" /> },
        ]}
      />
    );
  },
};

// Horizontal orientation
export const Horizontal: Story = {
  render: function HorizontalRadioGroup() {
    const [value, setValue] = useState('active');
    return (
      <RadioGroup
        label="Estado"
        value={value}
        onChange={setValue}
        orientation="horizontal"
        options={[
          { value: 'active', label: 'Activo' },
          { value: 'inactive', label: 'Inactivo' },
          { value: 'pending', label: 'Pendiente' },
        ]}
      />
    );
  },
};

// Sizes
export const SizeSmall: Story = {
  render: function SmallRadioGroup() {
    const [value, setValue] = useState('option1');
    return (
      <RadioGroup
        label="Tamaño pequeño"
        value={value}
        onChange={setValue}
        size="sm"
        options={paymentOptions}
      />
    );
  },
};

export const SizeMedium: Story = {
  render: function MediumRadioGroup() {
    const [value, setValue] = useState('option1');
    return (
      <RadioGroup
        label="Tamaño mediano"
        value={value}
        onChange={setValue}
        size="md"
        options={paymentOptions}
      />
    );
  },
};

export const SizeLarge: Story = {
  render: function LargeRadioGroup() {
    const [value, setValue] = useState('option1');
    return (
      <RadioGroup
        label="Tamaño grande"
        value={value}
        onChange={setValue}
        size="lg"
        options={paymentOptions}
      />
    );
  },
};

// With hint
export const WithHint: Story = {
  render: function WithHintRadioGroup() {
    const [value, setValue] = useState('personal');
    return (
      <div className="max-w-md">
        <RadioGroup
          label="Tipo de cuenta"
          value={value}
          onChange={setValue}
          hint="Selecciona el tipo de cuenta que mejor se adapte a tus necesidades."
          options={[
            { value: 'personal', label: 'Personal' },
            { value: 'business', label: 'Negocio' },
          ]}
        />
      </div>
    );
  },
};

// With error
export const WithError: Story = {
  render: function WithErrorRadioGroup() {
    const [value, setValue] = useState('');
    return (
      <div className="max-w-md">
        <RadioGroup
          label="Método de pago"
          value={value}
          onChange={setValue}
          error="Debes seleccionar un método de pago."
          options={paymentOptions}
        />
      </div>
    );
  },
};

// Disabled
export const Disabled: Story = {
  render: function DisabledRadioGroup() {
    const [value, setValue] = useState('card');
    return (
      <div className="max-w-md">
        <RadioGroup
          label="Método de pago"
          value={value}
          onChange={setValue}
          disabled
          options={paymentOptions}
        />
      </div>
    );
  },
};

// With disabled option
export const WithDisabledOption: Story = {
  render: function WithDisabledOptionRadioGroup() {
    const [value, setValue] = useState('card');
    return (
      <div className="max-w-md">
        <RadioGroup
          label="Método de pago"
          value={value}
          onChange={setValue}
          options={[
            { value: 'card', label: 'Tarjeta de crédito' },
            { value: 'paypal', label: 'PayPal (No disponible)', disabled: true },
            { value: 'transfer', label: 'Transferencia bancaria' },
          ]}
        />
      </div>
    );
  },
};

// Using compound components
export const CompoundComponents: Story = {
  render: function CompoundRadioGroup() {
    const [value, setValue] = useState('standard');
    return (
      <div className="max-w-md">
        <RadioGroup label="Opciones de envío" value={value} onChange={setValue} variant="cards">
          <RadioGroup.Option
            value="standard"
            icon={<Package className="w-5 h-5" />}
            description="Entrega en 3-5 días hábiles"
          >
            Envío estándar
          </RadioGroup.Option>
          <RadioGroup.Option
            value="express"
            icon={<Truck className="w-5 h-5" />}
            description="Entrega en 1-2 días hábiles"
          >
            Envío express
          </RadioGroup.Option>
        </RadioGroup>
      </div>
    );
  },
};

// Shipping example
export const ShippingExample: Story = {
  render: function ShippingRadioGroup() {
    const [value, setValue] = useState('standard');
    return (
      <div className="max-w-lg p-4 border rounded-lg">
        <RadioGroup
          label="Método de envío"
          value={value}
          onChange={setValue}
          variant="cards"
          options={[
            {
              value: 'standard',
              label: 'Envío estándar',
              description: 'Gratis - 3-5 días hábiles',
              icon: <Package className="w-5 h-5" />,
            },
            {
              value: 'express',
              label: 'Envío express',
              description: '$99 MXN - 1-2 días hábiles',
              icon: <Truck className="w-5 h-5" />,
            },
          ]}
        />
      </div>
    );
  },
};

// Filter example
export const FilterExample: Story = {
  render: function FilterRadioGroup() {
    const [value, setValue] = useState('all');
    return (
      <div className="w-64 p-4 border rounded-lg">
        <RadioGroup
          label="Ordenar por"
          value={value}
          onChange={setValue}
          size="sm"
          options={[
            { value: 'all', label: 'Todos' },
            { value: 'price_asc', label: 'Precio: menor a mayor' },
            { value: 'price_desc', label: 'Precio: mayor a menor' },
            { value: 'newest', label: 'Más recientes' },
            { value: 'popular', label: 'Más populares' },
          ]}
        />
      </div>
    );
  },
};
