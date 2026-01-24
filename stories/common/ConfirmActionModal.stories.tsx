import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import ConfirmActionModal from '@/components/common/ConfirmActionModal';
import Button from '@/components/common/Button';

/**
 * ConfirmActionModal component for confirming user actions.
 * Supports danger, success, and warning variants with loading states.
 */
const meta: Meta<typeof ConfirmActionModal> = {
  title: 'Overlays/ConfirmActionModal',
  component: ConfirmActionModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A confirmation modal for user actions with customizable title, message, and buttons. Supports danger, success, and warning variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    confirmVariant: {
      control: 'select',
      options: ['danger', 'success', 'warning'],
      description: 'Visual variant for confirm button',
    },
    isLoading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default danger
export const DangerVariant: Story = {
  render: function DangerModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
      }, 1500);
    };

    return (
      <>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Eliminar usuario
        </Button>
        <ConfirmActionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
          title="Eliminar usuario"
          message="Esta acción no se puede deshacer. ¿Estás seguro de que deseas eliminar este usuario?"
          confirmLabel="Eliminar"
          confirmVariant="danger"
          isLoading={isLoading}
        />
      </>
    );
  },
};

// Success variant
export const SuccessVariant: Story = {
  render: function SuccessModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
      }, 1500);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Verificar artesano</Button>
        <ConfirmActionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
          title="Verificar artesano"
          message="¿Deseas aprobar la verificación de este artesano? Esto le otorgará el badge de verificado."
          confirmLabel="Verificar"
          confirmVariant="success"
          isLoading={isLoading}
        />
      </>
    );
  },
};

// Warning variant
export const WarningVariant: Story = {
  render: function WarningModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
      }, 1500);
    };

    return (
      <>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Suspender cuenta
        </Button>
        <ConfirmActionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
          title="Suspender cuenta"
          message="La cuenta será suspendida temporalmente. El usuario no podrá acceder hasta que se reactive."
          confirmLabel="Suspender"
          confirmVariant="warning"
          isLoading={isLoading}
        />
      </>
    );
  },
};

// With user name
export const WithUserName: Story = {
  render: function WithUserNameModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
      }, 1500);
    };

    return (
      <>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Eliminar cuenta
        </Button>
        <ConfirmActionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
          title="Eliminar cuenta"
          message="Esta acción eliminará permanentemente la cuenta y todos sus datos asociados."
          confirmLabel="Eliminar cuenta"
          confirmVariant="danger"
          isLoading={isLoading}
          userName="María García"
        />
      </>
    );
  },
};

// Loading state
export const LoadingState: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onConfirm: () => {},
    title: 'Procesando acción',
    message: 'Espera mientras se procesa tu solicitud.',
    confirmLabel: 'Confirmar',
    confirmVariant: 'danger',
    isLoading: true,
  },
};

// Delete product example
export const DeleteProductExample: Story = {
  render: function DeleteProductModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
      }, 1500);
    };

    return (
      <>
        <Button variant="ghost" onClick={() => setIsOpen(true)} className="text-red-600">
          Eliminar producto
        </Button>
        <ConfirmActionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
          title="Eliminar producto"
          message="¿Estás seguro de que deseas eliminar 'Rebozo de Seda Oaxaqueño'? Esta acción no se puede deshacer."
          confirmLabel="Sí, eliminar"
          confirmVariant="danger"
          isLoading={isLoading}
        />
      </>
    );
  },
};

// Cancel order example
export const CancelOrderExample: Story = {
  render: function CancelOrderModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
      }, 1500);
    };

    return (
      <>
        <Button variant="outline" onClick={() => setIsOpen(true)}>
          Cancelar pedido
        </Button>
        <ConfirmActionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
          title="Cancelar pedido"
          message="¿Deseas cancelar el pedido #ORD-2024-001? Se procesará el reembolso en 3-5 días hábiles."
          confirmLabel="Cancelar pedido"
          confirmVariant="warning"
          isLoading={isLoading}
        />
      </>
    );
  },
};

// Approve request example
export const ApproveRequestExample: Story = {
  render: function ApproveRequestModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
      }, 1500);
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Aprobar solicitud</Button>
        <ConfirmActionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
          title="Aprobar solicitud de vendedor"
          message="Al aprobar esta solicitud, el usuario podrá comenzar a vender productos en la plataforma."
          confirmLabel="Aprobar"
          confirmVariant="success"
          isLoading={isLoading}
          userName="Pedro López"
        />
      </>
    );
  },
};

// Ban user example
export const BanUserExample: Story = {
  render: function BanUserModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = () => {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsOpen(false);
      }, 1500);
    };

    return (
      <>
        <Button variant="outline" onClick={() => setIsOpen(true)} className="text-red-600">
          Banear usuario
        </Button>
        <ConfirmActionModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onConfirm={handleConfirm}
          title="Banear usuario"
          message="El usuario será baneado permanentemente y no podrá crear nuevas cuentas. Esta acción es irreversible."
          confirmLabel="Banear usuario"
          confirmVariant="danger"
          isLoading={isLoading}
          userName="usuario@ejemplo.com"
        />
      </>
    );
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: function AllVariantsShowcase() {
    const [openModal, setOpenModal] = useState<'danger' | 'success' | 'warning' | null>(null);

    return (
      <div className="flex gap-4">
        <Button variant="outline" onClick={() => setOpenModal('danger')} className="text-red-600">
          Danger
        </Button>
        <Button onClick={() => setOpenModal('success')}>Success</Button>
        <Button variant="secondary" onClick={() => setOpenModal('warning')}>
          Warning
        </Button>

        <ConfirmActionModal
          isOpen={openModal === 'danger'}
          onClose={() => setOpenModal(null)}
          onConfirm={() => setOpenModal(null)}
          title="Acción peligrosa"
          message="Esta es una acción que puede tener consecuencias irreversibles."
          confirmLabel="Confirmar"
          confirmVariant="danger"
        />

        <ConfirmActionModal
          isOpen={openModal === 'success'}
          onClose={() => setOpenModal(null)}
          onConfirm={() => setOpenModal(null)}
          title="Acción positiva"
          message="Esta es una acción que tendrá un resultado positivo."
          confirmLabel="Confirmar"
          confirmVariant="success"
        />

        <ConfirmActionModal
          isOpen={openModal === 'warning'}
          onClose={() => setOpenModal(null)}
          onConfirm={() => setOpenModal(null)}
          title="Acción con precaución"
          message="Esta acción requiere precaución antes de proceder."
          confirmLabel="Confirmar"
          confirmVariant="warning"
        />
      </div>
    );
  },
};
