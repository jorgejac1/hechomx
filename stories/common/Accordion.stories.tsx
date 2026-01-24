import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Package, Truck, CreditCard, Shield, HelpCircle, FileText } from 'lucide-react';
import Accordion from '@/components/common/Accordion';

/**
 * Accordion component system for collapsible content sections.
 * Supports multiple visual variants, single or multiple expanded items, and keyboard navigation.
 */
const meta: Meta<typeof Accordion> = {
  title: 'Layout/Accordion',
  component: Accordion,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A compound accordion component for collapsible sections. Supports default, bordered, and separated variants with single or multiple expansion.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'separated'],
      description: 'Visual variant',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple items to be expanded at once',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default accordion
export const Default: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Accordion defaultExpanded={['item1']}>
        <Accordion.Item itemId="item1" title="¿Cómo puedo hacer un pedido?">
          <p>
            Para hacer un pedido, simplemente navega por nuestra selección de productos artesanales,
            agrega los que te gusten al carrito y procede al pago. Aceptamos varios métodos de pago
            incluyendo tarjetas de crédito y PayPal.
          </p>
        </Accordion.Item>
        <Accordion.Item itemId="item2" title="¿Cuál es el tiempo de envío?">
          <p>
            El tiempo de envío varía según tu ubicación. Los envíos nacionales suelen tardar entre
            3-7 días hábiles. Los envíos internacionales pueden tardar entre 10-21 días hábiles.
          </p>
        </Accordion.Item>
        <Accordion.Item itemId="item3" title="¿Puedo devolver un producto?">
          <p>
            Sí, aceptamos devoluciones dentro de los 30 días posteriores a la recepción del
            producto. El artículo debe estar en su estado original y sin usar.
          </p>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

// Bordered variant
export const Bordered: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Accordion variant="bordered" defaultExpanded={['item1']}>
        <Accordion.Item itemId="item1" title="Productos artesanales">
          <p>
            Todos nuestros productos son hechos a mano por artesanos mexicanos con técnicas
            tradicionales que han pasado de generación en generación.
          </p>
        </Accordion.Item>
        <Accordion.Item itemId="item2" title="Garantía de calidad">
          <p>
            Cada producto pasa por un riguroso control de calidad antes de ser enviado. Garantizamos
            la autenticidad y calidad de cada pieza.
          </p>
        </Accordion.Item>
        <Accordion.Item itemId="item3" title="Envío asegurado">
          <p>
            Todos los envíos están asegurados. Si tu producto llega dañado, te enviaremos uno nuevo
            sin costo adicional.
          </p>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

// Separated variant
export const Separated: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Accordion variant="separated" defaultExpanded={['item1']}>
        <Accordion.Item itemId="item1" title="Sobre nosotros">
          <p>
            Somos una plataforma dedicada a conectar artesanos mexicanos con compradores de todo el
            mundo. Nuestra misión es preservar las tradiciones artesanales.
          </p>
        </Accordion.Item>
        <Accordion.Item itemId="item2" title="Nuestra historia">
          <p>
            Fundada en 2020, Papalote Market nació de la pasión por las artesanías mexicanas y el
            deseo de ayudar a los artesanos a alcanzar nuevos mercados.
          </p>
        </Accordion.Item>
        <Accordion.Item itemId="item3" title="Nuestro compromiso">
          <p>
            Nos comprometemos a ofrecer precios justos tanto para artesanos como para compradores,
            garantizando que cada transacción beneficie a la comunidad.
          </p>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

// With icons
export const WithIcons: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Accordion variant="bordered">
        <Accordion.Item itemId="productos" title="Información del producto" icon={Package}>
          <p>Detalles sobre materiales, dimensiones, cuidado y origen del producto.</p>
        </Accordion.Item>
        <Accordion.Item itemId="envio" title="Envío y entrega" icon={Truck}>
          <p>Opciones de envío disponibles, tiempos de entrega estimados y costos.</p>
        </Accordion.Item>
        <Accordion.Item itemId="pago" title="Métodos de pago" icon={CreditCard}>
          <p>Aceptamos tarjetas de crédito, débito, PayPal y transferencias bancarias.</p>
        </Accordion.Item>
        <Accordion.Item itemId="garantia" title="Garantía y devoluciones" icon={Shield}>
          <p>Política de garantía de 30 días y proceso de devolución sin complicaciones.</p>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

// Allow multiple
export const AllowMultiple: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Accordion allowMultiple defaultExpanded={['item1', 'item2']}>
        <Accordion.Item itemId="item1" title="Sección 1">
          <p>Contenido de la sección 1. Puedes abrir múltiples secciones a la vez.</p>
        </Accordion.Item>
        <Accordion.Item itemId="item2" title="Sección 2">
          <p>Contenido de la sección 2. Nota cómo ambas secciones pueden estar abiertas.</p>
        </Accordion.Item>
        <Accordion.Item itemId="item3" title="Sección 3">
          <p>Contenido de la sección 3. Haz clic para expandir sin cerrar las demás.</p>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

// With disabled item
export const WithDisabled: Story = {
  render: () => (
    <div className="max-w-2xl">
      <Accordion variant="bordered">
        <Accordion.Item itemId="item1" title="Sección activa">
          <p>Esta sección está activa y puedes interactuar con ella normalmente.</p>
        </Accordion.Item>
        <Accordion.Item itemId="item2" title="Sección deshabilitada" disabled>
          <p>Este contenido no se mostrará porque la sección está deshabilitada.</p>
        </Accordion.Item>
        <Accordion.Item itemId="item3" title="Otra sección activa">
          <p>Esta sección también está activa y funciona correctamente.</p>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

// Controlled
export const Controlled: Story = {
  render: function ControlledAccordion() {
    const [expanded, setExpanded] = useState<string[]>(['item1']);

    return (
      <div className="max-w-2xl space-y-4">
        <div className="flex gap-2">
          <button
            onClick={() => setExpanded(['item1'])}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Open 1
          </button>
          <button
            onClick={() => setExpanded(['item2'])}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Open 2
          </button>
          <button
            onClick={() => setExpanded(['item1', 'item2', 'item3'])}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Open All
          </button>
          <button
            onClick={() => setExpanded([])}
            className="px-3 py-1 text-sm bg-gray-100 rounded hover:bg-gray-200"
          >
            Close All
          </button>
        </div>

        <Accordion
          allowMultiple
          expanded={expanded}
          onExpandedChange={setExpanded}
          variant="bordered"
        >
          <Accordion.Item itemId="item1" title="Sección 1">
            <p>Contenido de la sección 1.</p>
          </Accordion.Item>
          <Accordion.Item itemId="item2" title="Sección 2">
            <p>Contenido de la sección 2.</p>
          </Accordion.Item>
          <Accordion.Item itemId="item3" title="Sección 3">
            <p>Contenido de la sección 3.</p>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 max-w-2xl">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-3">Default</p>
        <Accordion>
          <Accordion.Item itemId="item1" title="Pregunta frecuente 1">
            <p>Respuesta a la pregunta frecuente 1.</p>
          </Accordion.Item>
          <Accordion.Item itemId="item2" title="Pregunta frecuente 2">
            <p>Respuesta a la pregunta frecuente 2.</p>
          </Accordion.Item>
        </Accordion>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500 mb-3">Bordered</p>
        <Accordion variant="bordered">
          <Accordion.Item itemId="item1" title="Pregunta frecuente 1">
            <p>Respuesta a la pregunta frecuente 1.</p>
          </Accordion.Item>
          <Accordion.Item itemId="item2" title="Pregunta frecuente 2">
            <p>Respuesta a la pregunta frecuente 2.</p>
          </Accordion.Item>
        </Accordion>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-500 mb-3">Separated</p>
        <Accordion variant="separated">
          <Accordion.Item itemId="item1" title="Pregunta frecuente 1">
            <p>Respuesta a la pregunta frecuente 1.</p>
          </Accordion.Item>
          <Accordion.Item itemId="item2" title="Pregunta frecuente 2">
            <p>Respuesta a la pregunta frecuente 2.</p>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  ),
};

// FAQ example
export const FAQExample: Story = {
  render: () => (
    <div className="max-w-2xl">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Preguntas Frecuentes</h2>
      <Accordion variant="separated">
        <Accordion.Item
          itemId="faq1"
          title="¿Los productos son 100% artesanales?"
          icon={HelpCircle}
        >
          <p className="text-gray-600">
            Sí, todos nuestros productos son elaborados completamente a mano por artesanos mexicanos
            utilizando técnicas tradicionales. Cada pieza es única y puede presentar pequeñas
            variaciones que son parte de su encanto artesanal.
          </p>
        </Accordion.Item>
        <Accordion.Item itemId="faq2" title="¿Cómo verifican a los artesanos?" icon={Shield}>
          <p className="text-gray-600">
            Tenemos un proceso de verificación de 4 niveles que incluye verificación de identidad,
            documentación de su trabajo, y en algunos casos, visitas a sus talleres. Los artesanos
            verificados tienen distintivos especiales en sus perfiles.
          </p>
        </Accordion.Item>
        <Accordion.Item itemId="faq3" title="¿Ofrecen facturación?" icon={FileText}>
          <p className="text-gray-600">
            Sí, ofrecemos facturación para todas las compras. Puedes solicitar tu factura durante el
            proceso de pago o contactando a nuestro servicio al cliente dentro de los 7 días
            posteriores a tu compra.
          </p>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};

// Product details example
export const ProductDetails: Story = {
  render: () => (
    <div className="max-w-md">
      <Accordion variant="bordered" defaultExpanded={['descripcion']}>
        <Accordion.Item itemId="descripcion" title="Descripción" icon={Package}>
          <p className="text-gray-600 text-sm">
            Vasija de barro negro hecha a mano en Oaxaca. Técnica tradicional de cocción en horno de
            leña. Perfecta para decoración o uso funcional.
          </p>
        </Accordion.Item>
        <Accordion.Item itemId="envio" title="Información de envío" icon={Truck}>
          <div className="text-gray-600 text-sm space-y-2">
            <p>
              <strong>Nacional:</strong> 3-5 días hábiles
            </p>
            <p>
              <strong>Internacional:</strong> 10-21 días hábiles
            </p>
            <p>Envío gratuito en pedidos mayores a $1,500 MXN</p>
          </div>
        </Accordion.Item>
        <Accordion.Item itemId="devoluciones" title="Devoluciones" icon={Shield}>
          <p className="text-gray-600 text-sm">
            Aceptamos devoluciones dentro de los 30 días. El producto debe estar en su condición
            original. Los gastos de envío de devolución corren por cuenta del comprador.
          </p>
        </Accordion.Item>
      </Accordion>
    </div>
  ),
};
