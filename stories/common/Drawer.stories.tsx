import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Filter, ShoppingCart, Menu, User, Settings, X } from 'lucide-react';
import Drawer from '@/components/common/Drawer';
import Button from '@/components/common/Button';

/**
 * Drawer component for slide-in panels from any screen edge.
 * Features accessibility support with focus management, keyboard navigation, and body scroll lock.
 */
const meta: Meta<typeof Drawer> = {
  title: 'Overlays/Drawer',
  component: Drawer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A slide-in panel component supporting left, right, top, and bottom positions. Features focus trapping, keyboard navigation, and customizable sizes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: 'select',
      options: ['left', 'right', 'top', 'bottom'],
      description: 'Position from which the drawer slides in',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Width (left/right) or height (top/bottom)',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button in header',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close when clicking overlay',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close when pressing Escape',
    },
    showOverlay: {
      control: 'boolean',
      description: 'Show semi-transparent overlay',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Right position
export const Default: Story = {
  render: function DefaultDrawer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Abrir Drawer</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Drawer por defecto">
          <p className="text-gray-600">
            Este es el contenido del drawer. Puedes poner cualquier cosa aquí.
          </p>
        </Drawer>
      </div>
    );
  },
};

// Positions
export const PositionRight: Story = {
  render: function RightDrawer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Derecha</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Drawer derecho"
          position="right"
        >
          <p className="text-gray-600">Este drawer aparece desde la derecha.</p>
        </Drawer>
      </div>
    );
  },
};

export const PositionLeft: Story = {
  render: function LeftDrawer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Izquierda</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Drawer izquierdo"
          position="left"
        >
          <p className="text-gray-600">Este drawer aparece desde la izquierda.</p>
        </Drawer>
      </div>
    );
  },
};

export const PositionTop: Story = {
  render: function TopDrawer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Arriba</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Drawer superior"
          position="top"
          size="md"
        >
          <p className="text-gray-600">Este drawer aparece desde arriba.</p>
        </Drawer>
      </div>
    );
  },
};

export const PositionBottom: Story = {
  render: function BottomDrawer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Abajo</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Drawer inferior"
          position="bottom"
          size="md"
        >
          <p className="text-gray-600">Este drawer aparece desde abajo.</p>
        </Drawer>
      </div>
    );
  },
};

// Sizes
export const SizeSmall: Story = {
  render: function SmallDrawer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Pequeño (sm)</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Drawer pequeño" size="sm">
          <p className="text-gray-600">Drawer de tamaño pequeño.</p>
        </Drawer>
      </div>
    );
  },
};

export const SizeMedium: Story = {
  render: function MediumDrawer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Mediano (md)</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Drawer mediano" size="md">
          <p className="text-gray-600">Drawer de tamaño mediano.</p>
        </Drawer>
      </div>
    );
  },
};

export const SizeLarge: Story = {
  render: function LargeDrawer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Grande (lg)</Button>
        <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} title="Drawer grande" size="lg">
          <p className="text-gray-600">Drawer de tamaño grande.</p>
        </Drawer>
      </div>
    );
  },
};

export const SizeExtraLarge: Story = {
  render: function XLDrawer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Extra grande (xl)</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Drawer extra grande"
          size="xl"
        >
          <p className="text-gray-600">Drawer de tamaño extra grande.</p>
        </Drawer>
      </div>
    );
  },
};

export const SizeFull: Story = {
  render: function FullDrawer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Pantalla completa</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Drawer completo"
          size="full"
        >
          <p className="text-gray-600">Drawer de pantalla completa.</p>
        </Drawer>
      </div>
    );
  },
};

// With footer
export const WithFooter: Story = {
  render: function FooterDrawer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Con footer</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Drawer con footer"
          footer={
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setIsOpen(false)}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Guardar
              </Button>
            </div>
          }
        >
          <p className="text-gray-600">Este drawer tiene un footer con botones de acción.</p>
        </Drawer>
      </div>
    );
  },
};

// Without close button
export const WithoutCloseButton: Story = {
  render: function NoCloseDrawer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Sin botón cerrar</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Sin botón cerrar"
          showCloseButton={false}
          footer={
            <Button variant="primary" onClick={() => setIsOpen(false)} className="w-full">
              Cerrar
            </Button>
          }
        >
          <p className="text-gray-600">
            Este drawer no tiene el botón X. Usa el botón del footer o haz clic fuera.
          </p>
        </Drawer>
      </div>
    );
  },
};

// Without overlay
export const WithoutOverlay: Story = {
  render: function NoOverlayDrawer() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)}>Sin overlay</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Sin overlay"
          showOverlay={false}
        >
          <p className="text-gray-600">Este drawer no tiene el fondo oscuro.</p>
        </Drawer>
      </div>
    );
  },
};

// Cart drawer example
export const CartDrawer: Story = {
  render: function CartExample() {
    const [isOpen, setIsOpen] = useState(false);

    const cartItems = [
      { id: 1, name: 'Vasija de Barro Negro', price: 850, qty: 1 },
      { id: 2, name: 'Rebozo de Seda', price: 2500, qty: 1 },
      { id: 3, name: 'Alebrije de Madera', price: 1200, qty: 2 },
    ];

    const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    return (
      <div>
        <Button onClick={() => setIsOpen(true)} icon={<ShoppingCart className="w-4 h-4" />}>
          Carrito (3)
        </Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Tu carrito"
          size="md"
          footer={
            <div className="space-y-3">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total</span>
                <span>${total.toLocaleString()} MXN</span>
              </div>
              <Button variant="primary" className="w-full">
                Ir al checkout
              </Button>
            </div>
          }
        >
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 pb-4 border-b">
                <div className="w-16 h-16 bg-gray-100 rounded-lg" />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">Cantidad: {item.qty}</p>
                  <p className="font-semibold">${item.price.toLocaleString()} MXN</p>
                </div>
                <button className="text-gray-400 hover:text-red-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    );
  },
};

// Filter drawer example
export const FilterDrawer: Story = {
  render: function FilterExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          icon={<Filter className="w-4 h-4" />}
        >
          Filtros
        </Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Filtrar productos"
          position="left"
          footer={
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                Limpiar
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)} className="flex-1">
                Aplicar
              </Button>
            </div>
          }
        >
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Categoría</h4>
              <div className="space-y-2">
                {['Textiles', 'Cerámica', 'Joyería', 'Madera'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Precio</h4>
              <div className="space-y-2">
                {['Menos de $500', '$500 - $1,000', '$1,000 - $2,500', 'Más de $2,500'].map(
                  (price) => (
                    <label key={price} className="flex items-center gap-2">
                      <input type="radio" name="price" className="rounded-full" />
                      <span>{price}</span>
                    </label>
                  )
                )}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Estado</h4>
              <div className="space-y-2">
                {['Oaxaca', 'Chiapas', 'Puebla', 'Michoacán'].map((state) => (
                  <label key={state} className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span>{state}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
};

// Mobile menu example
export const MobileMenu: Story = {
  render: function MobileMenuExample() {
    const [isOpen, setIsOpen] = useState(false);

    const menuItems = [
      { label: 'Inicio', href: '/' },
      { label: 'Productos', href: '/productos' },
      { label: 'Artesanos', href: '/artesanos' },
      { label: 'Sobre nosotros', href: '/sobre-nosotros' },
      { label: 'Contacto', href: '/contacto' },
    ];

    return (
      <div>
        <Button variant="ghost" onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6" />
        </Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Menú"
          position="left"
          size="sm"
        >
          <nav className="space-y-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-6 pt-6 border-t space-y-3">
            <Button variant="outline" className="w-full" icon={<User className="w-4 h-4" />}>
              Iniciar sesión
            </Button>
            <Button variant="primary" className="w-full">
              Registrarse
            </Button>
          </div>
        </Drawer>
      </div>
    );
  },
};

// Settings drawer example
export const SettingsDrawer: Story = {
  render: function SettingsExample() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          icon={<Settings className="w-4 h-4" />}
        >
          Configuración
        </Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Configuración"
          size="lg"
          footer={
            <Button variant="primary" onClick={() => setIsOpen(false)} className="w-full">
              Guardar cambios
            </Button>
          }
        >
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-3">Notificaciones</h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span>Notificaciones por email</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span>Notificaciones push</span>
                  <input type="checkbox" className="rounded" />
                </label>
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-3">Privacidad</h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span>Perfil público</span>
                  <input type="checkbox" className="rounded" defaultChecked />
                </label>
                <label className="flex items-center justify-between">
                  <span>Mostrar actividad</span>
                  <input type="checkbox" className="rounded" />
                </label>
              </div>
            </div>
          </div>
        </Drawer>
      </div>
    );
  },
};

// All positions showcase
export const AllPositions: Story = {
  render: function AllPositionsExample() {
    const [openDrawer, setOpenDrawer] = useState<string | null>(null);

    return (
      <div className="flex flex-wrap gap-3">
        {['left', 'right', 'top', 'bottom'].map((position) => (
          <div key={position}>
            <Button variant="outline" onClick={() => setOpenDrawer(position)}>
              {position.charAt(0).toUpperCase() + position.slice(1)}
            </Button>
            <Drawer
              isOpen={openDrawer === position}
              onClose={() => setOpenDrawer(null)}
              title={`Drawer ${position}`}
              position={position as 'left' | 'right' | 'top' | 'bottom'}
              size={position === 'top' || position === 'bottom' ? 'md' : 'md'}
            >
              <p className="text-gray-600">Este drawer aparece desde: {position}</p>
            </Drawer>
          </div>
        ))}
      </div>
    );
  },
};
