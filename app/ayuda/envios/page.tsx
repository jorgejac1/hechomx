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
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { ROUTES } from '@/lib';
import Alert from '@/components/common/Alert';
import Table, { TableColumn } from '@/components/common/Table';

interface ShippingZone {
  id: number;
  zone: string;
  cost: string;
}

const shippingZones: ShippingZone[] = [
  { id: 1, zone: 'CDMX y Área Metropolitana', cost: '$80 MXN' },
  { id: 2, zone: 'Zona Centro (Puebla, Querétaro, etc.)', cost: '$100 MXN' },
  { id: 3, zone: 'Norte (Monterrey, Chihuahua, etc.)', cost: '$120 MXN' },
  { id: 4, zone: 'Sur (Chiapas, Yucatán, etc.)', cost: '$120 MXN' },
  { id: 5, zone: 'Zonas remotas', cost: '$150 MXN' },
];

const shippingColumns: TableColumn<ShippingZone>[] = [
  { key: 'zone', header: 'Zona', cell: 'zone' },
  { key: 'cost', header: 'Costo (pedidos <$500)', cell: 'cost' },
];

export const metadata: Metadata = {
  title: 'Información de Envíos | Papalote Market',
  description: 'Conoce nuestros métodos de envío, tiempos de entrega y costos',
};

export default function ShippingInfoPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-6 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Volver al inicio
        </Link>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
              <Truck className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                Información de Envíos
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Todo lo que necesitas saber sobre nuestros envíos
              </p>
            </div>
          </div>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <Clock className="w-8 h-8 text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">3-7 Días</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Tiempo estimado de entrega</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Envío Gratis</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">En compras +$500 MXN</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
            <Shield className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-1">Envío Seguro</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Embalaje profesional</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Cobertura */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Cobertura de Envíos
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Realizamos envíos a <strong>toda la República Mexicana</strong>, incluyendo zonas
                rurales y áreas remotas. Nuestro objetivo es que la belleza del arte artesanal
                mexicano llegue a todos los rincones del país.
              </p>
              <Alert variant="info" layout="sidebar" icon={AlertCircle}>
                Actualmente solo realizamos envíos dentro de México. Próximamente estaremos enviando
                a todo el mundo.
              </Alert>
            </div>
          </section>

          {/* Tiempos de Entrega */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Tiempos de Entrega
              </h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-700 dark:text-gray-300">
                Los tiempos de entrega varían según tu ubicación y el tipo de producto:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Productos en Stock
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                      <span>CDMX y Área Metropolitana: 2-3 días</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                      <span>Ciudades principales: 3-5 días</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                      <span>Zonas rurales: 5-7 días</span>
                    </li>
                  </ul>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                    Productos Personalizados
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <li className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>Tiempo de producción: 5-15 días</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>Más tiempo de envío estándar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                      <span>Depende de la complejidad del pedido</span>
                    </li>
                  </ul>
                </div>
              </div>

              <Alert variant="warning" layout="sidebar" icon={AlertCircle}>
                Los tiempos son estimados y pueden variar durante temporadas altas (Día de Muertos,
                Navidad, etc.)
              </Alert>
            </div>
          </section>

          {/* Costos de Envío */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Costos de Envío
              </h2>
            </div>
            <div className="space-y-4">
              <Alert
                variant="success"
                layout="bordered"
                icon={CheckCircle}
                title="¡Envío Gratuito!"
                className="mb-4"
              >
                En pedidos superiores a <strong>$500 MXN</strong> el envío es completamente gratis a
                cualquier parte de México.
              </Alert>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                <Table
                  columns={shippingColumns}
                  data={shippingZones}
                  keyAccessor="id"
                  variant="striped"
                  hoverable={false}
                  size="md"
                />
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                * Los costos pueden variar según el peso y dimensiones del paquete
              </p>
            </div>
          </section>

          {/* Paqueterías */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Paqueterías y Rastreo
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>Trabajamos con las siguientes paqueterías confiables:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>FedEx:</strong> Para envíos express y entregas urgentes
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Estafeta:</strong> Cobertura nacional con buenos tiempos de entrega
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>DHL:</strong> Para paquetes grandes y productos delicados
                  </span>
                </li>
              </ul>

              <Alert variant="info" layout="sidebar" title="Rastreo de tu Pedido" className="mt-4">
                <p className="mb-2">Una vez que tu pedido sea enviado, recibirás:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Email con número de rastreo</li>
                  <li>• Link directo para rastrear tu paquete</li>
                  <li>• Actualizaciones del estado en tu cuenta</li>
                </ul>
              </Alert>
            </div>
          </section>

          {/* Embalaje */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Embalaje y Protección
              </h2>
            </div>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Cada producto es embalado cuidadosamente para garantizar que llegue en perfectas
                condiciones:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span>Materiales de embalaje profesionales y resistentes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span>Protección extra para productos frágiles (cerámica, vidrio)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span>Cajas reforzadas para piezas delicadas</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                  <span>Seguro incluido en todos los envíos</span>
                </li>
              </ul>

              <Alert variant="success" layout="sidebar" icon={Shield}>
                <span className="font-medium">
                  Si tu producto llega dañado, lo reemplazamos o reembolsamos sin costo adicional.
                </span>
              </Alert>
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
                  className="px-6 py-3 bg-white dark:bg-gray-100 text-primary-600 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-white transition"
                >
                  envios@@papalotemarket.com
                </a>
                <a
                  href="tel:+525512345678"
                  className="px-6 py-3 bg-primary-800 dark:bg-primary-900 text-white rounded-lg font-semibold hover:bg-primary-900 dark:hover:bg-primary-950 transition"
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
