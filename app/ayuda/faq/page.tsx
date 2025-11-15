import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Package,
  CreditCard,
  Truck,
  RefreshCcw,
  ShoppingCart,
  User,
  Shield,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import { ROUTES } from '@/lib';

export const metadata: Metadata = {
  title: 'Preguntas Frecuentes | Papalote Market',
  description: 'Encuentra respuestas a las preguntas más comunes sobre Papalote Market',
};

const faqs = [
  {
    category: 'Pedidos y Compras',
    icon: ShoppingCart,
    questions: [
      {
        q: '¿Cómo realizo un pedido?',
        a: 'Para realizar un pedido, simplemente navega por nuestros productos, añade los artículos que desees al carrito y procede al checkout. Necesitarás crear una cuenta o iniciar sesión para completar tu compra.',
      },
      {
        q: '¿Puedo modificar o cancelar mi pedido?',
        a: 'Puedes modificar o cancelar tu pedido dentro de las primeras 2 horas después de realizarlo. Después de este tiempo, el artesano ya habrá comenzado a preparar tu pedido. Contáctanos lo antes posible si necesitas hacer cambios.',
      },
      {
        q: '¿Puedo hacer pedidos personalizados?',
        a: 'Sí, muchos de nuestros artesanos ofrecen productos personalizados. Busca productos con la etiqueta "Personalizable" o contacta directamente al artesano a través del botón "Contactar" en la página del producto.',
      },
      {
        q: '¿Qué pasa si un producto está agotado?',
        a: 'Si un producto está agotado, puedes contactar al artesano para preguntar cuándo estará disponible nuevamente. También puedes agregar el producto a tu lista de deseos para recibir notificaciones cuando esté en stock.',
      },
    ],
  },
  {
    category: 'Envíos y Entregas',
    icon: Truck,
    questions: [
      {
        q: '¿Cuánto tiempo tarda el envío?',
        a: 'El tiempo de envío varía según tu ubicación y el artesano. Generalmente, los pedidos llegan en 3-7 días hábiles dentro de México. Los tiempos pueden ser más largos para productos personalizados o hechos bajo pedido.',
      },
      {
        q: '¿Cuánto cuesta el envío?',
        a: 'Los costos de envío varían según el tamaño, peso y destino del paquete. El costo exacto se calculará en el checkout. Ofrecemos envío gratuito en pedidos superiores a $500 MXN.',
      },
      {
        q: '¿Hacen envíos internacionales?',
        a: 'Actualmente solo realizamos envíos dentro de México. Estamos trabajando para ofrecer envíos internacionales próximamente.',
      },
      {
        q: '¿Cómo puedo rastrear mi pedido?',
        a: 'Una vez que tu pedido sea enviado, recibirás un correo con el número de rastreo. También puedes ver el estado de tu pedido en la sección "Mis Pedidos" de tu cuenta.',
      },
    ],
  },
  {
    category: 'Pagos',
    icon: CreditCard,
    questions: [
      {
        q: '¿Qué métodos de pago aceptan?',
        a: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), PayPal, OXXO Pay, y transferencias bancarias. Todos los pagos son procesados de forma segura.',
      },
      {
        q: '¿Es seguro comprar en su sitio?',
        a: 'Sí, tu seguridad es nuestra prioridad. Utilizamos encriptación SSL y trabajamos con procesadores de pago certificados. Nunca almacenamos información completa de tarjetas de crédito.',
      },
      {
        q: '¿Puedo obtener una factura?',
        a: 'Sí, puedes solicitar tu factura en el momento de realizar tu pedido o después desde tu cuenta. Enviamos facturas electrónicas por correo.',
      },
      {
        q: '¿Ofrecen planes de pago?',
        a: 'Actualmente no ofrecemos planes de pago a plazos, pero estamos trabajando en esta funcionalidad para el futuro.',
      },
    ],
  },
  {
    category: 'Devoluciones y Reembolsos',
    icon: RefreshCcw,
    questions: [
      {
        q: '¿Cuál es su política de devoluciones?',
        a: 'Tienes 30 días para devolver productos en su estado original. Los productos personalizados no son elegibles para devolución excepto si están defectuosos. Consulta nuestra política completa de devoluciones para más detalles.',
      },
      {
        q: '¿Cómo inicio una devolución?',
        a: 'Envía un correo a devoluciones@hechoenmexicov.com con tu número de pedido y razón de la devolución. Te enviaremos las instrucciones y una guía de envío prepagada si aplica.',
      },
      {
        q: '¿Cuánto tarda el reembolso?',
        a: 'Una vez que recibamos y aprobemos tu devolución, procesaremos el reembolso en 5-10 días hábiles. El tiempo para que aparezca en tu cuenta depende de tu banco o método de pago.',
      },
      {
        q: '¿Puedo cambiar un producto?',
        a: 'Sí, puedes solicitar un cambio por otro producto. El proceso es similar a una devolución. Si hay diferencia de precio, se te cobrará o reembolsará según corresponda.',
      },
    ],
  },
  {
    category: 'Cuenta y Seguridad',
    icon: User,
    questions: [
      {
        q: '¿Necesito una cuenta para comprar?',
        a: 'Sí, necesitas crear una cuenta para realizar compras. Esto nos permite ofrecerte un mejor servicio, rastrear tus pedidos y guardar tu información de forma segura.',
      },
      {
        q: '¿Cómo protegen mi información personal?',
        a: 'Tomamos la privacidad muy en serio. Usamos encriptación, nunca compartimos tu información con terceros sin tu consentimiento, y cumplimos con todas las leyes de protección de datos. Lee nuestra política de privacidad para más detalles.',
      },
      {
        q: '¿Cómo cambio mi contraseña?',
        a: 'Ve a "Mi Cuenta" > "Configuración" y selecciona "Cambiar contraseña". Si olvidaste tu contraseña, usa la opción "¿Olvidaste tu contraseña?" en la página de inicio de sesión.',
      },
      {
        q: '¿Cómo elimino mi cuenta?',
        a: 'Puedes solicitar la eliminación de tu cuenta contactándonos a privacidad@hechoenmexicov.com. Procesaremos tu solicitud dentro de 30 días y eliminaremos toda tu información personal.',
      },
    ],
  },
  {
    category: 'Para Artesanos',
    icon: Package,
    questions: [
      {
        q: '¿Cómo puedo vender en Papalote Market?',
        a: 'Regístrate como vendedor en nuestra plataforma, completa tu perfil de artesano y comienza a subir tus productos. Revisaremos tu solicitud en 24-48 horas.',
      },
      {
        q: '¿Cuánto cobran por vender en la plataforma?',
        a: 'Cobramos una comisión del 15% sobre cada venta más una pequeña tarifa de procesamiento de pago. No hay costos mensuales ni de registro.',
      },
      {
        q: '¿Cuándo recibo mis pagos?',
        a: 'Los pagos se transfieren a tu cuenta 7 días después de que el comprador confirme la recepción del producto. Esto nos permite asegurar la satisfacción del cliente.',
      },
      {
        q: '¿Puedo promocionar mis productos?',
        a: 'Sí, ofrecemos opciones de publicidad para destacar tus productos. Contacta a nuestro equipo de soporte para más información sobre promociones.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-100 rounded-lg">
              <HelpCircle className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Preguntas Frecuentes</h1>
              <p className="text-gray-600 mt-1">Encuentra respuestas rápidas a tus dudas</p>
            </div>
          </div>
        </div>

        {/* FAQs by Category */}
        <div className="space-y-6">
          {faqs.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.category} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="w-6 h-6 text-primary-600" />
                  <h2 className="text-2xl font-bold text-gray-900">{category.category}</h2>
                </div>

                <div className="space-y-6">
                  {category.questions.map((item, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-200 last:border-0 pb-6 last:pb-0"
                    >
                      <h3 className="font-bold text-gray-900 mb-2">{item.q}</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl shadow-md p-8 mt-6">
          <div className="text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">¿No encontraste lo que buscabas?</h2>
            <p className="mb-6 text-primary-100">
              Nuestro equipo de soporte está listo para ayudarte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={ROUTES.CONTACT}
                className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
              >
                Contactar Soporte
              </Link>
              <a
                href="mailto:ayuda@hechoenmexicov.com"
                className="px-6 py-3 bg-primary-800 text-white rounded-lg font-semibold hover:bg-primary-900 transition"
              >
                Enviar Email
              </a>
            </div>
          </div>
        </div>

        {/* Related Links */}
        <div className="bg-white rounded-xl shadow-md p-6 mt-6">
          <h3 className="font-bold text-gray-900 mb-4">Recursos Útiles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Link
              href={ROUTES.SHIPPING_INFO}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
            >
              <Truck className="w-4 h-4" />
              <span>Información de Envíos</span>
            </Link>
            <Link
              href={ROUTES.RETURNS_POLICY}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
            >
              <RefreshCcw className="w-4 h-4" />
              <span>Política de Devoluciones</span>
            </Link>
            <Link
              href={ROUTES.PAYMENT_INFO}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
            >
              <CreditCard className="w-4 h-4" />
              <span>Métodos de Pago</span>
            </Link>
            <Link
              href={ROUTES.PRIVACY}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
            >
              <Shield className="w-4 h-4" />
              <span>Política de Privacidad</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
