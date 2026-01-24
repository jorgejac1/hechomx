import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import Textarea from '@/components/common/Textarea';

/**
 * Textarea component for multi-line text entry.
 * Features auto-resize, character count, and comprehensive form field styling.
 */
const meta: Meta<typeof Textarea> = {
  title: 'Inputs/Textarea',
  component: Textarea,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A textarea component with auto-resize, character count, multiple sizes, and full accessibility support.',
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
      description: 'Label text displayed above the textarea',
    },
    error: {
      control: 'text',
      description: 'Error message displayed below the textarea',
    },
    hint: {
      control: 'text',
      description: 'Helper text displayed below the textarea',
    },
    showCharCount: {
      control: 'boolean',
      description: 'Whether to show character count',
    },
    autoResize: {
      control: 'boolean',
      description: 'Whether to automatically resize based on content',
    },
    minRows: {
      control: 'number',
      description: 'Minimum number of visible rows',
    },
    maxRows: {
      control: 'number',
      description: 'Maximum number of visible rows (for auto-resize)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    placeholder: 'Escribe tu mensaje...',
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
    label: 'Descripción del producto',
    placeholder: 'Describe tu producto artesanal...',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Required field
export const Required: Story = {
  args: {
    label: 'Mensaje',
    placeholder: 'Tu mensaje...',
    required: true,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// With hint
export const WithHint: Story = {
  args: {
    label: 'Biografía',
    placeholder: 'Cuéntanos sobre ti...',
    hint: 'Incluye tu experiencia como artesano y las técnicas que dominas',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// With error
export const WithError: Story = {
  args: {
    label: 'Descripción',
    defaultValue: 'Texto muy corto',
    error: 'La descripción debe tener al menos 50 caracteres',
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// With character count
export const WithCharacterCount: Story = {
  args: {
    label: 'Descripción corta',
    placeholder: 'Describe tu producto brevemente...',
    showCharCount: true,
    maxLength: 200,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Character count at limit
export const CharacterCountAtLimit: Story = {
  args: {
    label: 'Descripción corta',
    defaultValue:
      'Este es un texto de ejemplo que tiene exactamente la cantidad máxima de caracteres permitidos para este campo de texto. Es importante respetar este límite para mantener la consistencia.',
    showCharCount: true,
    maxLength: 200,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Auto resize
export const AutoResize: Story = {
  args: {
    label: 'Descripción',
    placeholder: 'Escribe y observa cómo el textarea crece automáticamente...',
    autoResize: true,
    minRows: 3,
    maxRows: 10,
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
export const SizeSmall: Story = {
  args: {
    label: 'Tamaño pequeño',
    placeholder: 'Texto...',
    size: 'sm',
    minRows: 3,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
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
    minRows: 3,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
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
    minRows: 3,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Campo deshabilitado',
    defaultValue: 'Este contenido no puede ser editado',
    disabled: true,
  },
  decorators: [
    (Story) => (
      <div className="w-96">
        <Story />
      </div>
    ),
  ],
};

// All sizes comparison
export const AllSizes: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Textarea label="Pequeño (sm)" placeholder="Texto..." size="sm" minRows={2} />
      <Textarea label="Mediano (md)" placeholder="Texto..." size="md" minRows={2} />
      <Textarea label="Grande (lg)" placeholder="Texto..." size="lg" minRows={2} />
    </div>
  ),
};

// Controlled with character count
export const ControlledWithCount: Story = {
  render: function ControlledTextarea() {
    const [value, setValue] = useState('');
    const maxLength = 500;

    return (
      <div className="w-96">
        <Textarea
          label="Historia del producto"
          placeholder="Cuenta la historia detrás de este producto artesanal..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          showCharCount
          maxLength={maxLength}
          hint={`Describe el origen, materiales y proceso de creación`}
          minRows={4}
        />
        {value.length > maxLength * 0.8 && value.length < maxLength && (
          <p className="mt-2 text-sm text-yellow-600">
            Te quedan {maxLength - value.length} caracteres
          </p>
        )}
      </div>
    );
  },
};

// Real-world: Product description
export const ProductDescription: Story = {
  render: () => (
    <div className="w-full max-w-xl p-6 border rounded-lg bg-white space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Información del producto</h2>
      <Textarea
        label="Descripción corta"
        placeholder="Una breve descripción que aparecerá en la tarjeta del producto..."
        showCharCount
        maxLength={150}
        minRows={2}
        required
      />
      <Textarea
        label="Descripción detallada"
        placeholder="Describe el producto en detalle: materiales, dimensiones, técnica utilizada, cuidados especiales..."
        showCharCount
        maxLength={2000}
        autoResize
        minRows={4}
        maxRows={12}
        hint="Incluye información sobre materiales, proceso de elaboración y recomendaciones de cuidado"
      />
    </div>
  ),
};

// Real-world: Contact form
export const ContactForm: Story = {
  render: () => (
    <div className="w-full max-w-md p-6 border rounded-lg bg-white space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Contactar al artesano</h2>
      <Textarea
        label="Tu mensaje"
        placeholder="Escribe tu pregunta o solicitud de pedido personalizado..."
        minRows={5}
        required
        hint="Incluye detalles específicos si tienes un pedido especial en mente"
      />
      <button className="w-full py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700">
        Enviar mensaje
      </button>
    </div>
  ),
};

// Real-world: Review form
export const ReviewForm: Story = {
  render: () => (
    <div className="w-full max-w-md p-6 border rounded-lg bg-white space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Escribe una reseña</h2>
      <div className="flex items-center gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button key={star} className="text-2xl text-yellow-400">
            ★
          </button>
        ))}
      </div>
      <Textarea
        label="Tu opinión"
        placeholder="¿Qué te pareció el producto? Comparte tu experiencia con otros compradores..."
        showCharCount
        maxLength={1000}
        minRows={4}
        autoResize
        required
      />
    </div>
  ),
};

// Real-world: Artisan bio
export const ArtisanBio: Story = {
  render: () => (
    <div className="w-full max-w-xl p-6 border rounded-lg bg-white space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">Tu historia como artesano</h2>
      <Textarea
        label="Biografía"
        placeholder="Cuéntanos sobre ti, tu trayectoria como artesano, cómo aprendiste tu oficio y qué te apasiona de tu trabajo..."
        autoResize
        minRows={5}
        maxRows={15}
        showCharCount
        maxLength={2000}
        hint="Esta información aparecerá en tu perfil público"
      />
      <Textarea
        label="Técnicas y especialidades"
        placeholder="Describe las técnicas que dominas: telar de cintura, barro negro, tallado en madera..."
        minRows={3}
        showCharCount
        maxLength={500}
      />
    </div>
  ),
};

// All states
export const AllStates: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Textarea label="Normal" placeholder="Texto normal..." minRows={2} />
      <Textarea
        label="Con valor"
        defaultValue="Contenido ya ingresado por el usuario"
        minRows={2}
      />
      <Textarea label="Requerido" placeholder="Campo requerido" required minRows={2} />
      <Textarea
        label="Con ayuda"
        placeholder="Texto..."
        hint="Texto de ayuda para el usuario"
        minRows={2}
      />
      <Textarea
        label="Con contador"
        placeholder="Texto..."
        showCharCount
        maxLength={100}
        minRows={2}
      />
      <Textarea
        label="Con error"
        defaultValue="Valor inválido"
        error="Este campo tiene un error"
        minRows={2}
      />
      <Textarea label="Deshabilitado" defaultValue="No editable" disabled minRows={2} />
    </div>
  ),
};

// Custom rows
export const CustomRows: Story = {
  render: () => (
    <div className="w-96 space-y-6">
      <Textarea label="2 filas" placeholder="Textarea pequeño" minRows={2} />
      <Textarea label="4 filas" placeholder="Textarea mediano" minRows={4} />
      <Textarea label="6 filas" placeholder="Textarea grande" minRows={6} />
      <Textarea
        label="Auto-resize (3-8 filas)"
        placeholder="Crece automáticamente..."
        autoResize
        minRows={3}
        maxRows={8}
      />
    </div>
  ),
};
