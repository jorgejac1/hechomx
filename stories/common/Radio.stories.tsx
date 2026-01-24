import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Radio from '@/components/common/Radio';

/**
 * Radio button component for single-option selection within a group.
 * Features customizable sizes, label positioning, error states, and hint text.
 */
const meta: Meta<typeof Radio> = {
  title: 'Inputs/Radio',
  component: Radio,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A standalone radio button component with label, sizes, error states, and hint text. Use within a group for single-option selection.',
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
    label: {
      control: 'text',
      description: 'Label text or JSX content',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    hint: {
      control: 'text',
      description: 'Hint text shown below the radio',
    },
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the radio relative to label',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    label: 'Opción',
    name: 'demo',
  },
};

// Checked
export const Checked: Story = {
  args: {
    label: 'Opción seleccionada',
    name: 'demo',
    defaultChecked: true,
  },
};

// With hint
export const WithHint: Story = {
  args: {
    label: 'Envío estándar',
    hint: '3-5 días hábiles',
    name: 'shipping',
  },
};

// With error
export const WithError: Story = {
  args: {
    label: 'Opción con error',
    error: 'Debes seleccionar una opción',
    name: 'demo',
  },
};

// Sizes
export const SizeSmall: Story = {
  args: {
    label: 'Tamaño pequeño',
    size: 'sm',
    name: 'size-demo',
  },
};

export const SizeMedium: Story = {
  args: {
    label: 'Tamaño mediano',
    size: 'md',
    name: 'size-demo',
  },
};

export const SizeLarge: Story = {
  args: {
    label: 'Tamaño grande',
    size: 'lg',
    name: 'size-demo',
  },
};

// Label position left
export const LabelLeft: Story = {
  args: {
    label: 'Etiqueta a la izquierda',
    labelPosition: 'left',
    name: 'demo',
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Opción deshabilitada',
    disabled: true,
    name: 'demo',
  },
};

// Disabled checked
export const DisabledChecked: Story = {
  args: {
    label: 'Opción deshabilitada seleccionada',
    disabled: true,
    defaultChecked: true,
    name: 'demo',
  },
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Radio label="Pequeño (sm)" size="sm" name="sizes" />
      <Radio label="Mediano (md)" size="md" name="sizes" />
      <Radio label="Grande (lg)" size="lg" name="sizes" />
    </div>
  ),
};

// Radio group example
export const RadioGroup: Story = {
  render: function RadioGroupExample() {
    const [selected, setSelected] = useState('standard');

    return (
      <div className="space-y-3">
        <p className="text-sm font-medium text-gray-700 mb-2">Método de envío</p>
        <Radio
          label="Envío estándar"
          hint="3-5 días hábiles - Gratis"
          name="shipping"
          value="standard"
          checked={selected === 'standard'}
          onChange={() => setSelected('standard')}
        />
        <Radio
          label="Envío express"
          hint="1-2 días hábiles - $99 MXN"
          name="shipping"
          value="express"
          checked={selected === 'express'}
          onChange={() => setSelected('express')}
        />
        <Radio
          label="Envío mismo día"
          hint="Antes de las 8pm - $199 MXN (solo CDMX)"
          name="shipping"
          value="sameday"
          checked={selected === 'sameday'}
          onChange={() => setSelected('sameday')}
        />
      </div>
    );
  },
};

// Payment method example
export const PaymentMethod: Story = {
  render: function PaymentMethodExample() {
    const [selected, setSelected] = useState('card');

    return (
      <div className="max-w-md p-4 border rounded-lg space-y-3">
        <p className="font-medium text-gray-900 mb-2">Método de pago</p>
        <Radio
          label="Tarjeta de crédito o débito"
          name="payment"
          value="card"
          checked={selected === 'card'}
          onChange={() => setSelected('card')}
        />
        <Radio
          label="PayPal"
          name="payment"
          value="paypal"
          checked={selected === 'paypal'}
          onChange={() => setSelected('paypal')}
        />
        <Radio
          label="Transferencia bancaria"
          hint="SPEI - Tu banco habitual"
          name="payment"
          value="transfer"
          checked={selected === 'transfer'}
          onChange={() => setSelected('transfer')}
        />
        <Radio
          label="Pago en OXXO"
          hint="Paga en efectivo en cualquier tienda OXXO"
          name="payment"
          value="oxxo"
          checked={selected === 'oxxo'}
          onChange={() => setSelected('oxxo')}
        />
      </div>
    );
  },
};

// Seller type example
export const SellerType: Story = {
  render: function SellerTypeExample() {
    const [selected, setSelected] = useState('');

    return (
      <div className="max-w-lg p-4 border rounded-lg space-y-4">
        <div>
          <p className="font-medium text-gray-900">¿Qué tipo de vendedor eres?</p>
          <p className="text-sm text-gray-500">Esto nos ayuda a personalizar tu experiencia</p>
        </div>
        <div className="space-y-3">
          <Radio
            label="Artesano individual"
            hint="Trabajo solo o con apoyo familiar ocasional"
            name="seller-type"
            value="individual"
            checked={selected === 'individual'}
            onChange={() => setSelected('individual')}
          />
          <Radio
            label="Taller artesanal"
            hint="Tengo un equipo pequeño de colaboradores"
            name="seller-type"
            value="workshop"
            checked={selected === 'workshop'}
            onChange={() => setSelected('workshop')}
          />
          <Radio
            label="Cooperativa"
            hint="Pertenezco a una cooperativa de artesanos"
            name="seller-type"
            value="cooperative"
            checked={selected === 'cooperative'}
            onChange={() => setSelected('cooperative')}
          />
          <Radio
            label="Empresa"
            hint="Tengo una empresa formalmente constituida"
            name="seller-type"
            value="company"
            checked={selected === 'company'}
            onChange={() => setSelected('company')}
          />
        </div>
      </div>
    );
  },
};

// With validation error
export const WithValidationError: Story = {
  render: () => (
    <div className="max-w-md space-y-3">
      <p className="text-sm font-medium text-gray-700">Acepto los términos</p>
      <Radio
        label="Acepto los términos y condiciones"
        name="terms"
        error="Debes aceptar los términos para continuar"
      />
    </div>
  ),
};

// All states
export const AllStates: Story = {
  render: () => (
    <div className="space-y-4">
      <Radio label="Normal" name="states1" />
      <Radio label="Seleccionado" name="states2" defaultChecked />
      <Radio label="Con ayuda" hint="Texto de ayuda adicional" name="states3" />
      <Radio label="Con error" error="Este campo tiene un error" name="states4" />
      <Radio label="Deshabilitado" disabled name="states5" />
      <Radio label="Deshabilitado seleccionado" disabled defaultChecked name="states6" />
    </div>
  ),
};

// Horizontal layout
export const HorizontalLayout: Story = {
  render: function HorizontalExample() {
    const [selected, setSelected] = useState('all');

    return (
      <div className="max-w-md">
        <p className="text-sm font-medium text-gray-700 mb-3">Filtrar por disponibilidad</p>
        <div className="flex gap-6">
          <Radio
            label="Todos"
            name="filter"
            value="all"
            checked={selected === 'all'}
            onChange={() => setSelected('all')}
          />
          <Radio
            label="Disponibles"
            name="filter"
            value="available"
            checked={selected === 'available'}
            onChange={() => setSelected('available')}
          />
          <Radio
            label="Agotados"
            name="filter"
            value="soldout"
            checked={selected === 'soldout'}
            onChange={() => setSelected('soldout')}
          />
        </div>
      </div>
    );
  },
};

// Complex label
export const ComplexLabel: Story = {
  render: function ComplexLabelExample() {
    const [selected, setSelected] = useState('pro');

    return (
      <div className="max-w-md space-y-3">
        <p className="font-medium text-gray-900 mb-2">Selecciona tu plan</p>
        <div className="space-y-2">
          <Radio
            label={
              <div className="flex items-center gap-2">
                <span>Plan Básico</span>
                <span className="px-2 py-0.5 text-xs bg-gray-100 text-gray-600 rounded">
                  Gratis
                </span>
              </div>
            }
            hint="Ideal para comenzar"
            name="plan"
            value="basic"
            checked={selected === 'basic'}
            onChange={() => setSelected('basic')}
          />
          <Radio
            label={
              <div className="flex items-center gap-2">
                <span>Plan Pro</span>
                <span className="px-2 py-0.5 text-xs bg-primary-100 text-primary-700 rounded">
                  Popular
                </span>
              </div>
            }
            hint="$199 MXN/mes"
            name="plan"
            value="pro"
            checked={selected === 'pro'}
            onChange={() => setSelected('pro')}
          />
          <Radio
            label={
              <div className="flex items-center gap-2">
                <span>Plan Empresarial</span>
              </div>
            }
            hint="Contactar para precio"
            name="plan"
            value="enterprise"
            checked={selected === 'enterprise'}
            onChange={() => setSelected('enterprise')}
          />
        </div>
      </div>
    );
  },
};
