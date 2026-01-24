import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Package, Star, Heart, ShoppingCart, Settings, MoreVertical } from 'lucide-react';
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/common/Card';
import Button from '@/components/common/Button';
import Badge from '@/components/common/Badge';

/**
 * Card component system for displaying content in contained boxes.
 * Includes Header, Title, Description, Content, and Footer subcomponents.
 */
const meta: Meta<typeof Card> = {
  title: 'Data Display/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible card component with subcomponents for structured content. Supports multiple variants, padding sizes, and interactive states.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
      description: 'Visual style variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Internal padding size',
    },
    as: {
      control: 'select',
      options: ['div', 'article', 'section'],
      description: 'HTML element to render',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic card
export const Default: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Título de la tarjeta</CardTitle>
          <CardDescription>Descripción breve del contenido de la tarjeta.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Este es el contenido principal de la tarjeta. Puede incluir texto, imágenes, o cualquier
            otro elemento.
          </p>
        </CardContent>
      </>
    ),
  },
};

// Variants
export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <>
        <CardHeader>
          <CardTitle>Tarjeta con borde</CardTitle>
          <CardDescription>Estilo con borde en lugar de sombra.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Ideal para contenido secundario o cuando hay muchas tarjetas juntas.
          </p>
        </CardContent>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <CardHeader>
          <CardTitle>Tarjeta elevada</CardTitle>
          <CardDescription>Sombra más pronunciada con hover.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Perfecta para destacar contenido importante o acciones principales.
          </p>
        </CardContent>
      </>
    ),
  },
};

// Padding sizes
export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    children: (
      <CardContent>
        <p className="text-gray-600 dark:text-gray-400">Tarjeta con padding pequeño.</p>
      </CardContent>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    children: (
      <CardContent>
        <p className="text-gray-600 dark:text-gray-400">Tarjeta con padding grande.</p>
      </CardContent>
    ),
  },
};

// With icon in header
export const WithHeaderIcon: Story = {
  args: {
    children: (
      <>
        <CardHeader icon={<Package className="w-5 h-5" />}>
          <CardTitle>Gestión de productos</CardTitle>
          <CardDescription>Administra tu inventario.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Agrega, edita y elimina productos de tu tienda.
          </p>
        </CardContent>
      </>
    ),
  },
};

// With header action
export const WithHeaderAction: Story = {
  args: {
    children: (
      <>
        <CardHeader
          action={
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              <MoreVertical className="w-5 h-5 text-gray-500" />
            </button>
          }
        >
          <CardTitle>Configuración</CardTitle>
          <CardDescription>Ajusta las preferencias de tu cuenta.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">Contenido de configuración aquí.</p>
        </CardContent>
      </>
    ),
  },
};

// With footer
export const WithFooter: Story = {
  args: {
    children: (
      <>
        <CardHeader>
          <CardTitle>Confirmar acción</CardTitle>
          <CardDescription>Revisa los detalles antes de continuar.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">
            Esta acción no se puede deshacer. ¿Estás seguro de continuar?
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" size="sm">
            Cancelar
          </Button>
          <Button size="sm">Confirmar</Button>
        </CardFooter>
      </>
    ),
  },
};

// Footer alignments
export const FooterAlignLeft: Story = {
  args: {
    children: (
      <>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">Footer alineado a la izquierda.</p>
        </CardContent>
        <CardFooter align="left">
          <Button size="sm">Acción</Button>
        </CardFooter>
      </>
    ),
  },
};

export const FooterAlignBetween: Story = {
  args: {
    children: (
      <>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">Footer con espacio entre elementos.</p>
        </CardContent>
        <CardFooter align="between">
          <span className="text-sm text-gray-500">Paso 1 de 3</span>
          <Button size="sm">Siguiente</Button>
        </CardFooter>
      </>
    ),
  },
};

// Interactive card
export const Clickable: Story = {
  args: {
    onClick: () => alert('¡Card clickeada!'),
    children: (
      <>
        <CardHeader>
          <CardTitle>Tarjeta interactiva</CardTitle>
          <CardDescription>Haz clic para ver más detalles.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 dark:text-gray-400">Esta tarjeta completa es clickeable.</p>
        </CardContent>
      </>
    ),
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Card variant="default">
        <CardHeader>
          <CardTitle as="h4">Default</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400">Estilo por defecto.</p>
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardHeader>
          <CardTitle as="h4">Outlined</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400">Con borde.</p>
        </CardContent>
      </Card>
      <Card variant="elevated">
        <CardHeader>
          <CardTitle as="h4">Elevated</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400">Con sombra.</p>
        </CardContent>
      </Card>
    </div>
  ),
};

// Real-world examples
export const ProductCard: Story = {
  render: () => (
    <Card padding="none" className="w-72 overflow-hidden">
      <div className="aspect-square bg-gray-100 dark:bg-gray-700 relative">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <Package className="w-12 h-12" />
        </div>
        <button className="absolute top-2 right-2 p-2 bg-white dark:bg-gray-800 rounded-full shadow">
          <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="success" size="sm">
            Verificado
          </Badge>
          <Badge variant="category" size="sm">
            Textiles
          </Badge>
        </div>
        <h3 className="font-bold text-gray-900 dark:text-gray-100">Rebozo de Seda Oaxaqueño</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Por María Textiles</p>
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-primary-600">$2,450.00</span>
          <Button size="sm" icon={<ShoppingCart />}>
            Agregar
          </Button>
        </div>
      </div>
    </Card>
  ),
};

export const StatsCard: Story = {
  render: () => (
    <Card className="w-64">
      <CardHeader icon={<Star className="w-5 h-5" />}>
        <CardTitle as="h4">Ventas del mes</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">$45,230</p>
        <p className="text-sm text-green-600 mt-1">↑ 12% vs mes anterior</p>
      </CardContent>
    </Card>
  ),
};

export const SettingsCard: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader icon={<Settings className="w-5 h-5" />}>
        <CardTitle>Preferencias de notificación</CardTitle>
        <CardDescription>Configura cómo recibir alertas.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Correos de pedidos</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Promociones</span>
            <input type="checkbox" className="rounded" />
          </label>
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-700 dark:text-gray-300">Nuevos productos</span>
            <input type="checkbox" defaultChecked className="rounded" />
          </label>
        </div>
      </CardContent>
      <CardFooter>
        <Button size="sm">Guardar cambios</Button>
      </CardFooter>
    </Card>
  ),
};
