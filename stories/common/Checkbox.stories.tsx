import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Checkbox from '@/components/common/Checkbox';

/**
 * Checkbox component for binary selections.
 * Features customizable label position, error/hint messages, and multiple sizes.
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A checkbox component with label, error messages, hints, and multiple size variants. Built with accessibility in mind.',
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
    labelPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of the label relative to checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    label: 'Acepto los términos y condiciones',
  },
};

// Checked
export const Checked: Story = {
  args: {
    label: 'Opción seleccionada',
    defaultChecked: true,
  },
};

// Sizes
export const Small: Story = {
  args: {
    label: 'Checkbox pequeño',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Checkbox mediano',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Checkbox grande',
    size: 'lg',
  },
};

// Label positions
export const LabelRight: Story = {
  args: {
    label: 'Label a la derecha',
    labelPosition: 'right',
  },
};

export const LabelLeft: Story = {
  args: {
    label: 'Label a la izquierda',
    labelPosition: 'left',
  },
};

// With hint
export const WithHint: Story = {
  args: {
    label: 'Recibir ofertas por email',
    hint: 'Te enviaremos ofertas exclusivas y descuentos especiales.',
  },
};

// With error
export const WithError: Story = {
  args: {
    label: 'Acepto los términos y condiciones',
    error: 'Debes aceptar los términos para continuar.',
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Opción no disponible',
    disabled: true,
  },
};

// Disabled checked
export const DisabledChecked: Story = {
  args: {
    label: 'Opción seleccionada (no editable)',
    disabled: true,
    defaultChecked: true,
  },
};

// Without label
export const WithoutLabel: Story = {
  args: {},
};

// All sizes
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <Checkbox label="Pequeño (sm)" size="sm" />
      <Checkbox label="Mediano (md)" size="md" />
      <Checkbox label="Grande (lg)" size="lg" />
    </div>
  ),
};

// Controlled
export const Controlled: Story = {
  render: function ControlledCheckbox() {
    const [checked, setChecked] = useState(false);

    return (
      <div className="space-y-4">
        <Checkbox
          label={`Estado: ${checked ? 'Seleccionado' : 'No seleccionado'}`}
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <button
          onClick={() => setChecked(!checked)}
          className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
        >
          Toggle
        </button>
      </div>
    );
  },
};

// Form example
export const FormExample: Story = {
  render: () => (
    <div className="w-80 space-y-4 p-4 border rounded-lg">
      <h3 className="font-semibold text-gray-900">Preferencias de notificación</h3>

      <Checkbox
        label="Notificaciones por email"
        hint="Recibe actualizaciones sobre tus pedidos."
        defaultChecked
      />

      <Checkbox label="Notificaciones SMS" hint="Recibe alertas de envío en tu teléfono." />

      <Checkbox label="Newsletter semanal" hint="Descubre nuevos artesanos y productos." />

      <Checkbox
        label="Ofertas y promociones"
        hint="Acceso anticipado a descuentos exclusivos."
        defaultChecked
      />
    </div>
  ),
};

// Filter list example
export const FilterList: Story = {
  render: function FilterListExample() {
    const [filters, setFilters] = useState({
      textiles: true,
      ceramica: false,
      joyeria: true,
      madera: false,
    });

    const toggleFilter = (key: keyof typeof filters) => {
      setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    return (
      <div className="w-64 p-4 border rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-3">Categorías</h3>
        <div className="space-y-2">
          <Checkbox
            label="Textiles"
            size="sm"
            checked={filters.textiles}
            onChange={() => toggleFilter('textiles')}
          />
          <Checkbox
            label="Cerámica"
            size="sm"
            checked={filters.ceramica}
            onChange={() => toggleFilter('ceramica')}
          />
          <Checkbox
            label="Joyería"
            size="sm"
            checked={filters.joyeria}
            onChange={() => toggleFilter('joyeria')}
          />
          <Checkbox
            label="Madera"
            size="sm"
            checked={filters.madera}
            onChange={() => toggleFilter('madera')}
          />
        </div>
      </div>
    );
  },
};

// Terms and conditions example
export const TermsExample: Story = {
  render: function TermsExample() {
    const [accepted, setAccepted] = useState(false);
    const [marketing, setMarketing] = useState(false);

    return (
      <div className="w-96 space-y-4">
        <Checkbox
          label={
            <span>
              Acepto los{' '}
              <a href="#" className="text-primary-600 underline">
                términos y condiciones
              </a>{' '}
              y la{' '}
              <a href="#" className="text-primary-600 underline">
                política de privacidad
              </a>
            </span>
          }
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
          error={!accepted ? 'Debes aceptar para continuar' : undefined}
        />

        <Checkbox
          label="Acepto recibir comunicaciones comerciales"
          hint="Puedes cancelar tu suscripción en cualquier momento."
          checked={marketing}
          onChange={(e) => setMarketing(e.target.checked)}
        />

        <button
          disabled={!accepted}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            accepted
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
          }`}
        >
          Crear cuenta
        </button>
      </div>
    );
  },
};

// Shipping options example
export const ShippingOptions: Story = {
  render: () => (
    <div className="w-80 space-y-3 p-4 border rounded-lg">
      <h3 className="font-semibold text-gray-900 mb-2">Opciones de envío</h3>

      <Checkbox
        label="Envío estándar (3-5 días)"
        hint="Gratis en compras mayores a $500"
        defaultChecked
      />

      <Checkbox label="Empaque de regalo" hint="+ $50 MXN" />

      <Checkbox label="Incluir nota personalizada" hint="Escribe un mensaje especial" />
    </div>
  ),
};
