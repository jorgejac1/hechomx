import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Truck,
  Package,
  MapPin,
  Clock,
  DollarSign,
  Shield,
  AlertCircle,
  CheckCircle,
} from 'lucide-react';
import { ROUTES } from '@/lib';

export const metadata: Metadata = {
  title: 'Información de Envíos | Papalote Market',
  description: 'Conoce nuestros métodos de envío, tiempos de entrega y costos',
};

export default function ShippingInfoPage() {
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
              <Truck className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Información de Envíos</h1>
              <p className="text-gray-600 mt-1">
                Todo lo que necesitas saber sobre nuestros envíos
              </p>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">3-7 Días</h3>
            <p className="text-sm text-gray-600">Tiempo estimado de entrega</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Envío Gratis</h3>
            <p className="text-sm text-gray-600">En compras +$500 MXN</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Shield className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Envío Seguro</h3>
            <p className="text-sm text-gray-600">Embalaje profesional</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Cobertura */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Cobertura de Envíos</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                Realizamos envíos a <strong>toda la República Mexicana</strong>, incluyendo zonas
                rurales y áreas remotas. Nuestro objetivo es que la belleza del arte artesanal
                mexicano llegue a todos los rincones del país.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-sm">
                <p className="text-sm text-blue-900">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Actualmente solo realizamos envíos dentro de México. Próximamente estaremos
                  enviando a todo el mundo.
                </p>
              </div>
            </div>
          </section>

          {/* Tiempos de Entrega */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Tiempos de Entrega</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700">
                Los tiempos de entrega varían según tu ubicación y el tipo de producto:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Productos en Stock</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>CDMX y Área Metropolitana: 2-3 días</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Ciudades principales: 3-5 días</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Zonas rurales: 5-7 días</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Productos Personalizados</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>Tiempo de producción: 5-15 días</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>Más tiempo de envío estándar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span>Depende de la complejidad del pedido</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded-sm">
                <p className="text-sm text-yellow-900">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Los tiempos son estimados y pueden variar durante temporadas altas (Día de
                  Muertos, Navidad, etc.)
                </p>
              </div>
            </div>
          </section>

          {/* Costos de Envío */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Costos de Envío</h2>
            </div>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  ¡Envío Gratuito!
                </h3>
                <p className="text-sm text-green-800">
                  En pedidos superiores a <strong>$500 MXN</strong> el envío es completamente gratis
                  a cualquier parte de México.
                </p>
              </div>

              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left p-4 font-semibold text-gray-900">Zona</th>
                    <th className="text-left p-4 font-semibold text-gray-900">
                      Costo (pedidos &lt;$500)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-4 text-gray-700">CDMX y Área Metropolitana</td>
                    <td className="p-4 text-gray-700">$80 MXN</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-700">Zona Centro (Puebla, Querétaro, etc.)</td>
                    <td className="p-4 text-gray-700">$100 MXN</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-700">Norte (Monterrey, Chihuahua, etc.)</td>
                    <td className="p-4 text-gray-700">$120 MXN</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-700">Sur (Chiapas, Yucatán, etc.)</td>
                    <td className="p-4 text-gray-700">$120 MXN</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-gray-700">Zonas remotas</td>
                    <td className="p-4 text-gray-700">$150 MXN</td>
                  </tr>
                </tbody>
              </table>

              <p className="text-sm text-gray-600">
                * Los costos pueden variar según el peso y dimensiones del paquete
              </p>
            </div>
          </section>

          {/* Paqueterías */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Paqueterías y Rastreo</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>Trabajamos con las siguientes paqueterías confiables:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>FedEx:</strong> Para envíos express y entregas urgentes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Estafeta:</strong> Cobertura nacional con buenos tiempos de entrega
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>DHL:</strong> Para paquetes grandes y productos delicados
                  </span>
                </li>
              </ul>

              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-sm mt-4">
                <h3 className="font-bold text-blue-900 mb-2">Rastreo de tu Pedido</h3>
                <p className="text-sm text-blue-800 mb-2">
                  Una vez que tu pedido sea enviado, recibirás:
                </p>
                <ul className="text-sm text-blue-800 space-y-1 ml-4">
                  <li>• Email con número de rastreo</li>
                  <li>• Link directo para rastrear tu paquete</li>
                  <li>• Actualizaciones del estado en tu cuenta</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Embalaje */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Embalaje y Protección</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                Cada producto es embalado cuidadosamente para garantizar que llegue en perfectas
                condiciones:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Materiales de embalaje profesionales y resistentes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Protección extra para productos frágiles (cerámica, vidrio)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Cajas reforzadas para piezas delicadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Seguro incluido en todos los envíos</span>
                </li>
              </ul>

              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded-sm">
                <p className="text-sm text-green-900 font-medium">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Si tu producto llega dañado, lo reemplazamos o reembolsamos sin costo adicional.
                </p>
              </div>
            </div>
          </section>

          {/* Contact Card */}
          <div className="bg-linear-to-r from-primary-600 to-primary-700 text-white rounded-xl shadow-md p-8">
            <div className="text-center">
              <Truck className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">¿Preguntas sobre tu envío?</h2>
              <p className="mb-6 text-primary-100">
                Contáctanos y te ayudaremos con cualquier duda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:envios@@papalotemarket.com"
                  className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  envios@@papalotemarket.com
                </a>
                <a
                  href="tel:+525512345678"
                  className="px-6 py-3 bg-primary-800 text-white rounded-lg font-semibold hover:bg-primary-900 transition"
                >
                  55 1234 5678
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
