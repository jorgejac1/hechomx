import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Truck, CreditCard, Check, User, MapPin, ShoppingCart } from 'lucide-react';
import Stepper, { Step } from '@/components/common/Stepper';

/**
 * Stepper component for multi-step processes and wizards.
 * Displays progress through sequential steps with status indicators.
 */
const meta: Meta<typeof Stepper> = {
  title: 'Navigation/Stepper',
  component: Stepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A stepper component for multi-step wizards. Supports horizontal/vertical layouts, clickable navigation, and custom icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    currentStep: {
      control: { type: 'number', min: 0, max: 4 },
      description: 'Current active step (0-indexed)',
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
    clickable: {
      control: 'boolean',
      description: 'Whether completed steps are clickable',
    },
    showNumbers: {
      control: 'boolean',
      description: 'Show step numbers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const checkoutSteps: Step[] = [
  { id: 'carrito', label: 'Carrito' },
  { id: 'envio', label: 'Envío' },
  { id: 'pago', label: 'Pago' },
  { id: 'confirmacion', label: 'Confirmación' },
];

// Default
export const Default: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 1,
  },
};

// All steps completed
export const AllCompleted: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 4,
  },
};

// First step
export const FirstStep: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 0,
  },
};

// With descriptions
const stepsWithDescriptions: Step[] = [
  { id: 'cuenta', label: 'Cuenta', description: 'Crear o iniciar sesión' },
  { id: 'datos', label: 'Datos', description: 'Información personal' },
  { id: 'envio', label: 'Envío', description: 'Dirección de entrega' },
  { id: 'pago', label: 'Pago', description: 'Método de pago' },
];

export const WithDescriptions: Story = {
  args: {
    steps: stepsWithDescriptions,
    currentStep: 2,
  },
};

// With icons
const stepsWithIcons: Step[] = [
  { id: 'carrito', label: 'Carrito', icon: ShoppingCart },
  { id: 'envio', label: 'Envío', icon: Truck },
  { id: 'pago', label: 'Pago', icon: CreditCard },
  { id: 'confirmacion', label: 'Listo', icon: Check },
];

export const WithIcons: Story = {
  args: {
    steps: stepsWithIcons,
    currentStep: 2,
  },
};

// Vertical orientation
export const Vertical: Story = {
  args: {
    steps: stepsWithDescriptions,
    currentStep: 1,
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

// Sizes
export const SizeSmall: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 2,
    size: 'sm',
  },
};

export const SizeMedium: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 2,
    size: 'md',
  },
};

export const SizeLarge: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 2,
    size: 'lg',
  },
};

// Without numbers (dots)
export const WithoutNumbers: Story = {
  args: {
    steps: checkoutSteps,
    currentStep: 2,
    showNumbers: false,
  },
};

// With optional step
const stepsWithOptional: Step[] = [
  { id: 'cuenta', label: 'Cuenta' },
  { id: 'regalo', label: 'Opciones de regalo', optional: true },
  { id: 'envio', label: 'Envío' },
  { id: 'pago', label: 'Pago' },
];

export const WithOptionalStep: Story = {
  args: {
    steps: stepsWithOptional,
    currentStep: 1,
  },
};

// Clickable
export const Clickable: Story = {
  render: function ClickableStepper() {
    const [currentStep, setCurrentStep] = useState(2);

    return (
      <div className="space-y-4">
        <Stepper
          steps={checkoutSteps}
          currentStep={currentStep}
          clickable
          onStepClick={setCurrentStep}
        />
        <p className="text-sm text-gray-500">
          Paso actual: {currentStep + 1} - Haz clic en pasos completados para navegar
        </p>
      </div>
    );
  },
};

// Interactive example
export const Interactive: Story = {
  render: function InteractiveStepper() {
    const [currentStep, setCurrentStep] = useState(0);

    const handleNext = () => {
      if (currentStep < checkoutSteps.length) {
        setCurrentStep(currentStep + 1);
      }
    };

    const handleBack = () => {
      if (currentStep > 0) {
        setCurrentStep(currentStep - 1);
      }
    };

    return (
      <div className="space-y-6">
        <Stepper
          steps={checkoutSteps}
          currentStep={currentStep}
          clickable
          onStepClick={setCurrentStep}
        />

        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            {currentStep < checkoutSteps.length
              ? `Contenido del paso: ${checkoutSteps[currentStep].label}`
              : 'Proceso completado'}
          </p>
        </div>

        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <button
            onClick={handleNext}
            disabled={currentStep >= checkoutSteps.length}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {currentStep === checkoutSteps.length - 1 ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
      </div>
    );
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-3">Small</p>
        <Stepper steps={checkoutSteps} currentStep={2} size="sm" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-3">Medium</p>
        <Stepper steps={checkoutSteps} currentStep={2} size="md" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-3">Large</p>
        <Stepper steps={checkoutSteps} currentStep={2} size="lg" />
      </div>
    </div>
  ),
};

// Vertical with icons
export const VerticalWithIcons: Story = {
  args: {
    steps: stepsWithIcons,
    currentStep: 1,
    orientation: 'vertical',
  },
  decorators: [
    (Story) => (
      <div className="max-w-sm">
        <Story />
      </div>
    ),
  ],
};

// Checkout example
export const CheckoutExample: Story = {
  render: () => {
    const steps: Step[] = [
      { id: 'carrito', label: 'Carrito', description: '3 productos', icon: ShoppingCart },
      { id: 'envio', label: 'Envío', description: 'Dirección y método', icon: Truck },
      { id: 'pago', label: 'Pago', description: 'Tarjeta o transferencia', icon: CreditCard },
      { id: 'confirmacion', label: 'Confirmación', description: 'Revisar pedido', icon: Check },
    ];

    return (
      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-sm">
        <Stepper steps={steps} currentStep={2} size="md" />
      </div>
    );
  },
};

// Registration example
export const RegistrationExample: Story = {
  render: () => {
    const steps: Step[] = [
      { id: 'email', label: 'Email', icon: User },
      { id: 'perfil', label: 'Perfil', icon: User },
      { id: 'ubicacion', label: 'Ubicación', icon: MapPin },
      { id: 'completado', label: 'Completado', icon: Check },
    ];

    return (
      <div className="max-w-md">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Crear cuenta de artesano</h2>
        <Stepper steps={steps} currentStep={1} orientation="vertical" />
      </div>
    );
  },
};

// Order tracking example
export const OrderTracking: Story = {
  render: () => {
    const steps: Step[] = [
      { id: 'confirmado', label: 'Pedido confirmado', description: '20 Ene 2026, 10:30' },
      { id: 'preparando', label: 'Preparando envío', description: '21 Ene 2026, 14:00' },
      { id: 'enviado', label: 'Enviado', description: '22 Ene 2026, 09:15' },
      { id: 'transito', label: 'En tránsito', description: 'Estimado: 25 Ene' },
      { id: 'entregado', label: 'Entregado', description: 'Pendiente' },
    ];

    return (
      <div className="max-w-md p-4 border rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-4">Seguimiento del pedido #12345</h3>
        <Stepper steps={steps} currentStep={3} orientation="vertical" size="sm" />
      </div>
    );
  },
};

// Verification process example
export const VerificationProcess: Story = {
  render: () => {
    const steps: Step[] = [
      { id: 'email', label: 'Verificar email' },
      { id: 'identidad', label: 'Verificar identidad' },
      { id: 'taller', label: 'Fotos del taller' },
      { id: 'revision', label: 'Revisión' },
      { id: 'aprobado', label: 'Aprobado' },
    ];

    return (
      <div className="space-y-4">
        <h3 className="font-semibold text-gray-900">Proceso de verificación de artesano</h3>
        <Stepper steps={steps} currentStep={2} />
        <div className="p-4 bg-blue-50 text-blue-700 rounded-lg text-sm">
          Estás en el paso 3: Sube fotos de tu taller para continuar con la verificación.
        </div>
      </div>
    );
  },
};

// Minimal (dots only)
export const MinimalDots: Story = {
  args: {
    steps: [
      { id: '1', label: '' },
      { id: '2', label: '' },
      { id: '3', label: '' },
      { id: '4', label: '' },
    ],
    currentStep: 1,
    showNumbers: false,
    size: 'sm',
  },
};
