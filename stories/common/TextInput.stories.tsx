import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import TextInput from '@/components/common/TextInput';
import { Search, Mail, Lock, Eye, EyeOff, User, DollarSign, Phone, MapPin } from 'lucide-react';

/**
 * TextInput component for single-line text entry.
 * Features label, error/hint messages, icons, and multiple sizes.
 */
const meta: Meta<typeof TextInput> = {
  title: 'Inputs/TextInput',
  component: TextInput,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A versatile text input component with label, error/hint messages, left/right icons, and three size variants. Built with accessibility in mind.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant affecting padding and font size',
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the input',
    },
    hint: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Whether the input takes full width',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    placeholder: 'Ingresa tu texto...',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// With label
export const WithLabel: Story = {
  args: {
    label: 'Correo electrónico',
    placeholder: 'ejemplo@correo.com',
    type: 'email',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// Required field
export const Required: Story = {
  args: {
    label: 'Nombre completo',
    placeholder: 'Tu nombre',
    required: true,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// With hint
export const WithHint: Story = {
  args: {
    label: 'Contraseña',
    type: 'password',
    placeholder: '••••••••',
    hint: 'Mínimo 8 caracteres, incluyendo una mayúscula y un número',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// With error
export const WithError: Story = {
  args: {
    label: 'Correo electrónico',
    type: 'email',
    defaultValue: 'correo-invalido',
    error: 'Por favor ingresa un correo electrónico válido',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// With left icon
export const WithLeftIcon: Story = {
  args: {
    label: 'Buscar',
    placeholder: 'Buscar productos...',
    leftIcon: <Search className="w-full h-full" />,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// With right icon
export const WithRightIcon: Story = {
  args: {
    label: 'Correo electrónico',
    placeholder: 'ejemplo@correo.com',
    type: 'email',
    rightIcon: <Mail className="w-full h-full" />,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// With both icons
export const WithBothIcons: Story = {
  args: {
    label: 'Precio',
    placeholder: '0.00',
    type: 'number',
    leftIcon: <DollarSign className="w-full h-full" />,
    rightIcon: <span className="text-gray-400 text-xs">MXN</span>,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// Sizes
export const SizeSmall: Story = {
  args: {
    label: 'Tamaño pequeño',
    placeholder: 'Texto...',
    size: 'sm',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const SizeMedium: Story = {
  args: {
    label: 'Tamaño mediano',
    placeholder: 'Texto...',
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

export const SizeLarge: Story = {
  args: {
    label: 'Tamaño grande',
    placeholder: 'Texto...',
    size: 'lg',
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Campo deshabilitado',
    defaultValue: 'No editable',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <TextInput label="Pequeño (sm)" placeholder="Texto..." size="sm" />
      <TextInput label="Mediano (md)" placeholder="Texto..." size="md" />
      <TextInput label="Grande (lg)" placeholder="Texto..." size="lg" />
    </div>
  ),
};

// Password with toggle
export const PasswordToggle: Story = {
  render: function PasswordToggleStory() {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="w-80">
        <TextInput
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          placeholder="Ingresa tu contraseña"
          leftIcon={<Lock className="w-full h-full" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none"
            >
              {showPassword ? (
                <EyeOff className="w-full h-full hover:text-gray-600" />
              ) : (
                <Eye className="w-full h-full hover:text-gray-600" />
              )}
            </button>
          }
        />
      </div>
    );
  },
};

// Real-world: Login form
export const LoginForm: Story = {
  render: () => (
    <div className="w-80 space-y-4 p-6 border rounded-lg bg-white">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Iniciar sesión</h2>
      <TextInput
        label="Correo electrónico"
        type="email"
        placeholder="tu@correo.com"
        leftIcon={<Mail className="w-full h-full" />}
        required
      />
      <TextInput
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        leftIcon={<Lock className="w-full h-full" />}
        required
      />
      <button className="w-full py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
        Entrar
      </button>
    </div>
  ),
};

// Real-world: Registration form
export const RegistrationForm: Story = {
  render: () => (
    <div className="w-96 space-y-4 p-6 border rounded-lg bg-white">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Crear cuenta</h2>
      <div className="grid grid-cols-2 gap-4">
        <TextInput
          label="Nombre"
          placeholder="Juan"
          leftIcon={<User className="w-full h-full" />}
          required
        />
        <TextInput label="Apellido" placeholder="Pérez" required />
      </div>
      <TextInput
        label="Correo electrónico"
        type="email"
        placeholder="juan@correo.com"
        leftIcon={<Mail className="w-full h-full" />}
        required
      />
      <TextInput
        label="Teléfono"
        type="tel"
        placeholder="+52 55 1234 5678"
        leftIcon={<Phone className="w-full h-full" />}
        hint="Incluye código de área"
      />
      <TextInput
        label="Contraseña"
        type="password"
        placeholder="••••••••"
        leftIcon={<Lock className="w-full h-full" />}
        hint="Mínimo 8 caracteres"
        required
      />
    </div>
  ),
};

// Real-world: Shipping address
export const ShippingAddress: Story = {
  render: () => (
    <div className="w-96 space-y-4 p-6 border rounded-lg bg-white">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Dirección de envío</h2>
      <TextInput
        label="Calle y número"
        placeholder="Av. Reforma 123"
        leftIcon={<MapPin className="w-full h-full" />}
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <TextInput label="Colonia" placeholder="Centro" required />
        <TextInput label="Código postal" placeholder="06600" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TextInput label="Ciudad" placeholder="CDMX" required />
        <TextInput label="Estado" placeholder="CDMX" required />
      </div>
      <TextInput
        label="Referencias"
        placeholder="Entre calles, color de fachada, etc."
        hint="Opcional, pero ayuda al repartidor"
      />
    </div>
  ),
};

// Real-world: Search input
export const SearchInput: Story = {
  render: () => (
    <div className="w-96">
      <TextInput
        placeholder="Buscar artesanías, artesanos, categorías..."
        leftIcon={<Search className="w-full h-full" />}
        size="lg"
      />
    </div>
  ),
};

// All states
export const AllStates: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <TextInput label="Normal" placeholder="Texto normal..." />
      <TextInput label="Con valor" defaultValue="Valor ingresado" />
      <TextInput label="Requerido" placeholder="Campo requerido" required />
      <TextInput label="Con ayuda" placeholder="Texto..." hint="Texto de ayuda para el usuario" />
      <TextInput
        label="Con error"
        defaultValue="Valor inválido"
        error="Este campo tiene un error"
      />
      <TextInput label="Deshabilitado" defaultValue="No editable" disabled />
    </div>
  ),
};

// Input types
export const InputTypes: Story = {
  render: () => (
    <div className="w-80 space-y-4">
      <TextInput label="Texto" type="text" placeholder="Texto libre" />
      <TextInput label="Email" type="email" placeholder="correo@ejemplo.com" />
      <TextInput label="Contraseña" type="password" placeholder="••••••••" />
      <TextInput label="Número" type="number" placeholder="0" />
      <TextInput label="Teléfono" type="tel" placeholder="+52 55 1234 5678" />
      <TextInput label="URL" type="url" placeholder="https://ejemplo.com" />
    </div>
  ),
};
