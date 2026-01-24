import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { AlertTriangle, CheckCircle, Trash2 } from 'lucide-react';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';

/**
 * Modal dialog component with accessibility features.
 * Includes focus trapping, escape key handling, backdrop click, and body scroll lock.
 */
const meta: Meta<typeof Modal> = {
  title: 'Overlays/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A fully accessible modal dialog with focus trapping, keyboard navigation, and multiple sizes. Supports header, content, and footer sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal width size',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in header',
    },
    closeOnBackdrop: {
      control: 'boolean',
      description: 'Close when clicking backdrop',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close when pressing Escape',
    },
    title: {
      control: 'text',
      description: 'Modal title',
    },
    description: {
      control: 'text',
      description: 'Modal description',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper component
const ModalDemo = ({
  children,
  ...args
}: React.ComponentProps<typeof Modal> & { buttonLabel?: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{args.buttonLabel || 'Abrir modal'}</Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Modal>
    </>
  );
};

// Basic modal
export const Default: Story = {
  render: (args) => (
    <ModalDemo {...args} title="Título del modal">
      <p className="text-gray-600 dark:text-gray-400">
        Este es el contenido del modal. Puedes agregar cualquier elemento aquí.
      </p>
    </ModalDemo>
  ),
};

// With description
export const WithDescription: Story = {
  render: (args) => (
    <ModalDemo
      {...args}
      title="Agregar al carrito"
      description="Selecciona las opciones del producto antes de continuar."
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Cantidad
          </label>
          <input
            type="number"
            defaultValue={1}
            min={1}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Talla
          </label>
          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700">
            <option>Chica</option>
            <option>Mediana</option>
            <option>Grande</option>
          </select>
        </div>
      </div>
    </ModalDemo>
  ),
};

// With footer
export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Confirmar acción</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirmar compra"
          description="Revisa los detalles de tu pedido."
          footer={
            <>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsOpen(false)}>Confirmar</Button>
            </>
          }
        >
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
              <span className="font-medium">$1,500.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Envío</span>
              <span className="font-medium">$150.00</span>
            </div>
            <hr className="dark:border-gray-700" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>$1,650.00</span>
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

// Different sizes
export const SmallSize: Story = {
  render: (args) => (
    <ModalDemo {...args} title="Modal pequeño" size="sm">
      <p className="text-gray-600 dark:text-gray-400">Contenido compacto para acciones rápidas.</p>
    </ModalDemo>
  ),
};

export const LargeSize: Story = {
  render: (args) => (
    <ModalDemo {...args} title="Modal grande" size="lg">
      <p className="text-gray-600 dark:text-gray-400">
        Contenido más amplio para formularios o información detallada. Este modal tiene más espacio
        para mostrar contenido complejo.
      </p>
    </ModalDemo>
  ),
};

export const FullSize: Story = {
  render: (args) => (
    <ModalDemo {...args} title="Modal completo" size="full">
      <div className="space-y-4">
        <p className="text-gray-600 dark:text-gray-400">
          Modal de ancho completo para contenido extenso como tablas, galerías o formularios
          complejos.
        </p>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-32 bg-gray-100 dark:bg-gray-700 rounded-lg" />
          ))}
        </div>
      </div>
    </ModalDemo>
  ),
};

// Without close button
export const NoCloseButton: Story = {
  render: (args) => (
    <ModalDemo {...args} title="Acción requerida" showCloseButton={false}>
      <p className="text-gray-600 dark:text-gray-400">
        Este modal requiere que tomes una acción. No puedes cerrarlo con el botón X.
      </p>
    </ModalDemo>
  ),
};

// Confirmation dialog
export const ConfirmationDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button variant="outline" icon={<Trash2 />} onClick={() => setIsOpen(true)}>
          Eliminar producto
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="¿Eliminar producto?"
          size="sm"
          footer={
            <>
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button
                variant="primary"
                onClick={() => setIsOpen(false)}
                className="bg-red-600 hover:bg-red-700"
              >
                Eliminar
              </Button>
            </>
          }
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Esta acción no se puede deshacer. El producto será eliminado permanentemente.
            </p>
          </div>
        </Modal>
      </>
    );
  },
};

// Success dialog
export const SuccessDialog: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Mostrar éxito</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="sm"
          footer={
            <Button fullWidth onClick={() => setIsOpen(false)}>
              Continuar
            </Button>
          }
        >
          <div className="text-center py-4">
            <div className="inline-flex p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              ¡Pedido confirmado!
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Tu pedido #12345 ha sido procesado exitosamente.
            </p>
          </div>
        </Modal>
      </>
    );
  },
};
