import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCcw,
  MessageCircle,
  Shield,
  Truck,
  CreditCard,
} from 'lucide-react';
import { ROUTES } from '@/lib';
import Alert from '@/components/common/Alert';

export const metadata: Metadata = {
  title: 'Política de Devoluciones | Papalote Market',
  description:
    'Conoce nuestra política de devoluciones y reembolsos para productos artesanales mexicanos',
};

export default function ReturnsPage() {
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
              <RefreshCcw className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Política de Devoluciones</h1>
              <p className="text-gray-600 mt-1">Última actualización: Noviembre 2024</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            En Papalote Market valoramos tu satisfacción y confianza. Nuestra política de
            devoluciones está diseñada para proteger tanto a compradores como a artesanos,
            garantizando un proceso justo y transparente para todos.
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">30 Días</h3>
            <p className="text-sm text-gray-600">Para solicitar devolución</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Compra Protegida</h3>
            <p className="text-sm text-gray-600">Reembolso garantizado</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Truck className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Envío Gratuito</h3>
            <p className="text-sm text-gray-600">En devoluciones válidas</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Plazo de Devolución */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Plazo de Devolución</h2>
            </div>
            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 mb-4">
                Tienes <strong>30 días naturales</strong> a partir de la fecha de recepción del
                producto para solicitar una devolución o cambio. Este plazo se aplica a todos los
                productos excepto aquellos personalizados o hechos bajo pedido.
              </p>
              <Alert variant="info" layout="sidebar" icon={AlertCircle}>
                <span className="font-medium">
                  El plazo comienza a contar desde el día en que recibes tu pedido, no desde la
                  fecha de compra.
                </span>
              </Alert>
            </div>
          </section>

          {/* Condiciones para Devolución */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Condiciones para Devolución</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  Productos Elegibles para Devolución
                </h3>
                <ul className="space-y-2 text-gray-700 ml-7">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Productos sin usar, en su estado original</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Con todas las etiquetas y empaques originales</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Sin señales de uso, lavado o alteración</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Productos dañados o defectuosos al recibirlos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>Productos que no coincidan con la descripción</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <XCircle className="w-5 h-5 text-red-600" />
                  Productos NO Elegibles para Devolución
                </h3>
                <ul className="space-y-2 text-gray-700 ml-7">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Productos personalizados o hechos bajo pedido especial</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Productos de uso personal (joyería perforada, ropa interior)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Productos perecederos o de temporada</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Productos en oferta final o descuento superior al 50%</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    <span>Productos con señales de uso o sin embalaje original</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Proceso de Devolución */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCcw className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Proceso de Devolución</h2>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Solicita la Devolución</h3>
                  <p className="text-gray-700 text-sm">
                    Envía un correo a{' '}
                    <a
                      href="mailto:devoluciones@@papalotemarket.com"
                      className="text-primary-600 hover:underline"
                    >
                      devoluciones@@papalotemarket.com
                    </a>{' '}
                    con tu número de pedido, razón de la devolución y fotos del producto (si
                    aplica). Responderemos en 24 horas hábiles.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Aprobación</h3>
                  <p className="text-gray-700 text-sm">
                    Una vez aprobada tu solicitud, te enviaremos las instrucciones de envío y una
                    guía prepagada si aplica. Recibirás un número de autorización de devolución
                    (RMA).
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Empaca y Envía</h3>
                  <p className="text-gray-700 text-sm">
                    Empaca el producto de forma segura, incluye el número RMA y envíalo a la
                    dirección indicada. Conserva tu comprobante de envío hasta que recibas tu
                    reembolso.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">Inspección y Reembolso</h3>
                  <p className="text-gray-700 text-sm">
                    Inspeccionaremos el producto dentro de 3-5 días hábiles. Si cumple con las
                    condiciones, procesaremos tu reembolso en 5-10 días hábiles.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Métodos de Reembolso */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Métodos de Reembolso</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                Los reembolsos se procesan automáticamente al método de pago original utilizado en
                la compra:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Tarjeta de crédito/débito:</strong> 5-10 días hábiles
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>PayPal:</strong> 3-5 días hábiles
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>OXXO Pay:</strong> Cupón de reembolso en 24 horas
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Transferencia bancaria:</strong> 3-5 días hábiles
                  </span>
                </li>
              </ul>
              <Alert variant="warning" layout="sidebar" icon={AlertCircle} className="mt-4">
                Los costos de envío originales no son reembolsables, excepto en casos de productos
                defectuosos o errores en el pedido.
              </Alert>
            </div>
          </section>

          {/* Cambios */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <RefreshCcw className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Cambios</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                Si deseas cambiar un producto por otra talla, color o modelo, el proceso es similar
                a una devolución:
              </p>
              <ol className="space-y-2 ml-4 list-decimal">
                <li>Solicita el cambio indicando el producto que deseas recibir</li>
                <li>
                  Si hay diferencia de precio, se te cobrará o reembolsará la diferencia
                  correspondiente
                </li>
                <li>Envía el producto original siguiendo el proceso de devolución</li>
                <li>
                  Una vez recibido y aprobado, enviaremos el nuevo producto sin costo adicional de
                  envío
                </li>
              </ol>
              <p className="text-sm">
                Los cambios están sujetos a disponibilidad del producto solicitado.
              </p>
            </div>
          </section>

          {/* Productos Dañados */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">Productos Dañados o Defectuosos</h2>
            </div>
            <div className="text-gray-700 space-y-4">
              <p>
                Si recibes un producto dañado, defectuoso o incorrecto, contáctanos inmediatamente:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>
                    Envía fotos claras del producto y el empaque dentro de las primeras 48 horas
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>Describe el problema detalladamente</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>Te ofreceremos reembolso completo o reemplazo sin costo adicional</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-600 mt-1">•</span>
                  <span>Incluye el costo de envío en el reembolso</span>
                </li>
              </ul>
              <Alert variant="success" layout="sidebar" icon={Shield}>
                <span className="font-medium">
                  Todos nuestros artesanos están comprometidos con la calidad. Los productos
                  defectuosos son raros, pero cuando ocurren, resolveremos el problema
                  inmediatamente.
                </span>
              </Alert>
            </div>
          </section>

          {/* Preguntas Frecuentes */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Preguntas Frecuentes</h2>
            </div>
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Quién paga el envío de devolución?
                </h3>
                <p className="text-gray-700 text-sm">
                  Si el producto está defectuoso o hubo un error en el pedido, nosotros cubrimos el
                  costo de envío. En cambios de opinión, el comprador cubre el envío de devolución.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Puedo devolver un producto personalizado?
                </h3>
                <p className="text-gray-700 text-sm">
                  Los productos personalizados o hechos bajo pedido especial no son elegibles para
                  devolución, excepto si están defectuosos o no coinciden con las especificaciones
                  acordadas.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-4">
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Cuánto tarda en llegar mi reembolso?
                </h3>
                <p className="text-gray-700 text-sm">
                  Después de aprobar tu devolución, el reembolso se procesa en 5-10 días hábiles,
                  dependiendo de tu método de pago. Tu banco puede tomar tiempo adicional para
                  reflejar el cargo.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Qué hago si mi producto llegó dañado por paquetería?
                </h3>
                <p className="text-gray-700 text-sm">
                  Documenta el daño con fotos del empaque y producto, y contáctanos inmediatamente.
                  Trabajaremos con la paquetería para resolver el problema y te enviaremos un
                  reemplazo o reembolso completo.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Card */}
          <section className="bg-linear-to-r from-primary-600 to-primary-700 text-white rounded-xl shadow-md p-8">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">¿Necesitas Ayuda?</h2>
              <p className="mb-6 text-primary-100">
                Nuestro equipo de soporte está listo para ayudarte con cualquier duda sobre
                devoluciones
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:devoluciones@@papalotemarket.com"
                  className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  devoluciones@@papalotemarket.com
                </a>
                <a
                  href="tel:+525512345678"
                  className="px-6 py-3 bg-primary-800 text-white rounded-lg font-semibold hover:bg-primary-900 transition"
                >
                  55 1234 5678
                </a>
              </div>
              <p className="text-sm text-primary-100 mt-4">
                Horario de atención: Lunes a Viernes, 9:00 AM - 6:00 PM (Hora de México)
              </p>
            </div>
          </section>

          {/* Related Links */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-900 mb-4">Políticas Relacionadas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/politicas/privacidad"
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
              >
                <Shield className="w-4 h-4" />
                <span>Política de Privacidad</span>
              </Link>
              <Link
                href="/politicas/terminos"
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Términos y Condiciones</span>
              </Link>
              <Link
                href="/politicas/envios"
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
              >
                <Truck className="w-4 h-4" />
                <span>Política de Envíos</span>
              </Link>
              <Link
                href="/ayuda"
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Centro de Ayuda</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
