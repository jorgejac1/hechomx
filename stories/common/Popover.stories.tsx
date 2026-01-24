import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Info, HelpCircle, Settings, Bell } from 'lucide-react';
import Popover from '@/components/common/Popover';
import Button from '@/components/common/Button';

/**
 * Popover component for displaying floating content panels.
 * Supports click and hover triggers, multiple placements, and configurable close behaviors.
 */
const meta: Meta<typeof Popover> = {
  title: 'Overlays/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A popover component for displaying floating content with customizable triggers, placements, headers/footers, and close behaviors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    placement: {
      control: 'select',
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
      ],
      description: 'Popover placement',
    },
    trigger: {
      control: 'select',
      options: ['click', 'hover'],
      description: 'Trigger method',
    },
    showArrow: {
      control: 'boolean',
      description: 'Show arrow',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  args: {
    content: 'Este es el contenido del popover. Puede incluir cualquier tipo de contenido.',
    children: <Button>Mostrar popover</Button>,
  },
};

// Click trigger
export const ClickTrigger: Story = {
  args: {
    content: 'Este popover se abre al hacer clic.',
    trigger: 'click',
    children: <Button>Clic para abrir</Button>,
  },
};

// Hover trigger
export const HoverTrigger: Story = {
  args: {
    content: 'Este popover se muestra al pasar el mouse.',
    trigger: 'hover',
    children: <Button variant="outline">Hover para ver</Button>,
  },
};

// Placements
export const PlacementTop: Story = {
  args: {
    content: 'Popover arriba',
    placement: 'top',
    children: <Button>Top</Button>,
  },
  decorators: [
    (Story) => (
      <div className="pt-20">
        <Story />
      </div>
    ),
  ],
};

export const PlacementBottom: Story = {
  args: {
    content: 'Popover abajo',
    placement: 'bottom',
    children: <Button>Bottom</Button>,
  },
};

export const PlacementLeft: Story = {
  args: {
    content: 'Popover izquierda',
    placement: 'left',
    children: <Button>Left</Button>,
  },
  decorators: [
    (Story) => (
      <div className="pl-40">
        <Story />
      </div>
    ),
  ],
};

export const PlacementRight: Story = {
  args: {
    content: 'Popover derecha',
    placement: 'right',
    children: <Button>Right</Button>,
  },
};

export const PlacementTopStart: Story = {
  args: {
    content: 'Popover arriba izquierda',
    placement: 'top-start',
    children: <Button>Top Start</Button>,
  },
  decorators: [
    (Story) => (
      <div className="pt-20">
        <Story />
      </div>
    ),
  ],
};

export const PlacementBottomEnd: Story = {
  args: {
    content: 'Popover abajo derecha',
    placement: 'bottom-end',
    children: <Button>Bottom End</Button>,
  },
};

// With header
export const WithHeader: Story = {
  args: {
    content: 'Configura tus preferencias de notificación aquí.',
    header: 'Notificaciones',
    children: <Button icon={<Bell className="w-4 h-4" />}>Notificaciones</Button>,
  },
};

// With header and footer
export const WithHeaderAndFooter: Story = {
  args: {
    content: 'Aquí puedes ajustar la configuración de tu cuenta.',
    header: 'Configuración',
    footer: (
      <div className="flex justify-end gap-2">
        <Button size="sm" variant="ghost">
          Cancelar
        </Button>
        <Button size="sm">Guardar</Button>
      </div>
    ),
    children: <Button icon={<Settings className="w-4 h-4" />}>Configuración</Button>,
  },
};

// Without arrow
export const WithoutArrow: Story = {
  args: {
    content: 'Este popover no tiene flecha.',
    showArrow: false,
    children: <Button>Sin flecha</Button>,
  },
};

// Custom width
export const CustomWidth: Story = {
  args: {
    content: 'Este popover tiene un ancho personalizado de 350px.',
    width: 350,
    children: <Button>Ancho personalizado</Button>,
  },
};

// Info tooltip
export const InfoTooltip: Story = {
  args: {
    content:
      'Los productos artesanales pueden presentar pequeñas variaciones debido a su naturaleza hecha a mano.',
    trigger: 'hover',
    placement: 'top',
    width: 250,
    children: (
      <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
        <Info className="w-4 h-4" />
      </button>
    ),
  },
};

// Help icon
export const HelpIcon: Story = {
  args: {
    content:
      'Puedes agregar hasta 10 imágenes por producto. El tamaño máximo por imagen es de 5MB.',
    trigger: 'hover',
    placement: 'right',
    width: 220,
    children: (
      <button className="p-1 text-gray-400 hover:text-primary-600 transition-colors">
        <HelpCircle className="w-5 h-5" />
      </button>
    ),
  },
};

// Controlled
export const Controlled: Story = {
  render: function ControlledPopover() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="space-y-4">
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setIsOpen(true)}>
            Abrir
          </Button>
          <Button size="sm" variant="outline" onClick={() => setIsOpen(false)}>
            Cerrar
          </Button>
        </div>
        <Popover
          content="Este popover es controlado externamente."
          isOpen={isOpen}
          onOpenChange={setIsOpen}
        >
          <Button>Popover controlado</Button>
        </Popover>
      </div>
    );
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    content: 'Este contenido no se mostrará.',
    disabled: true,
    children: <Button disabled>Deshabilitado</Button>,
  },
};

// With delays (hover)
export const WithDelays: Story = {
  args: {
    content: 'Este popover tiene un delay de 500ms para mostrar y 200ms para ocultar.',
    trigger: 'hover',
    delayShow: 500,
    delayHide: 200,
    children: <Button variant="outline">Con delays</Button>,
  },
};

// Complex content
export const ComplexContent: Story = {
  args: {
    content: (
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
            <span className="text-primary-600 font-semibold">MG</span>
          </div>
          <div>
            <p className="font-medium text-gray-900">María García</p>
            <p className="text-sm text-gray-500">Artesana verificada</p>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Especialista en textiles oaxaqueños con 15 años de experiencia.
        </p>
        <Button size="sm" fullWidth>
          Ver perfil
        </Button>
      </div>
    ),
    header: 'Acerca del artesano',
    width: 280,
    children: <Button variant="ghost">Ver artesano</Button>,
  },
};

// Notification popover
export const NotificationPopover: Story = {
  render: () => (
    <Popover
      content={
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="w-2 h-2 mt-2 bg-primary-500 rounded-full" />
            <div>
              <p className="text-sm font-medium text-gray-900">Nuevo pedido recibido</p>
              <p className="text-xs text-gray-500">Hace 5 minutos</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="w-2 h-2 mt-2 bg-gray-300 rounded-full" />
            <div>
              <p className="text-sm text-gray-700">Tu producto ha sido aprobado</p>
              <p className="text-xs text-gray-500">Hace 1 hora</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="w-2 h-2 mt-2 bg-gray-300 rounded-full" />
            <div>
              <p className="text-sm text-gray-700">Mensaje de un comprador</p>
              <p className="text-xs text-gray-500">Hace 3 horas</p>
            </div>
          </div>
        </div>
      }
      header="Notificaciones"
      footer={
        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium w-full text-center">
          Ver todas las notificaciones
        </button>
      }
      width={320}
      placement="bottom-end"
    >
      <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
        <Bell className="w-5 h-5" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
      </button>
    </Popover>
  ),
};

// Form field help
export const FormFieldHelp: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-gray-700">Precio de venta</label>
      <Popover
        content={
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• El precio debe incluir IVA</li>
            <li>• Se aplicará una comisión del 10%</li>
            <li>• Precio mínimo: $50 MXN</li>
          </ul>
        }
        trigger="hover"
        placement="top"
        width={220}
      >
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <HelpCircle className="w-4 h-4" />
        </button>
      </Popover>
    </div>
  ),
};
