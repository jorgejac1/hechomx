import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Shield,
  Lock,
  Eye,
  Database,
  UserCheck,
  FileText,
  AlertCircle,
  Mail,
} from 'lucide-react';
import { ROUTES } from '@/lib';

export const metadata: Metadata = {
  title: 'Política de Privacidad | Hecho en México',
  description: 'Conoce cómo protegemos y manejamos tu información personal',
};

export default function PrivacyPage() {
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
              <Shield className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Política de Privacidad</h1>
              <p className="text-gray-600 mt-1">Última actualización: Noviembre 2024</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            En Hecho en México, respetamos tu privacidad y nos comprometemos a proteger tu
            información personal. Esta política describe cómo recopilamos, usamos y protegemos tus
            datos.
          </p>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Lock className="w-8 h-8 text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Datos Encriptados</h3>
            <p className="text-sm text-gray-600">SSL 256-bit</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Shield className="w-8 h-8 text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">LFPDPPP Compliant</h3>
            <p className="text-sm text-gray-600">Ley Federal de México</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <UserCheck className="w-8 h-8 text-purple-600 mx-auto mb-3" />
            <h3 className="font-bold text-gray-900 mb-1">Control Total</h3>
            <p className="text-sm text-gray-600">Sobre tus datos</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Información Recopilada */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">1. Información que Recopilamos</h2>
            </div>
            <div className="prose prose-gray max-w-none text-gray-700">
              <h3 className="text-lg font-bold mt-4 mb-2">1.1 Información que Proporcionas</h3>
              <p>Recopilamos información que nos proporcionas directamente cuando:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Creas una cuenta (nombre, email, contraseña)</li>
                <li>Realizas una compra (dirección de envío, información de pago)</li>
                <li>Completas tu perfil (foto, teléfono, preferencias)</li>
                <li>Contactas a nuestro soporte (mensajes, consultas)</li>
                <li>Dejas reseñas o comentarios</li>
                <li>Participas en encuestas o promociones</li>
              </ul>

              <h3 className="text-lg font-bold mt-4 mb-2">
                1.2 Información Recopilada Automáticamente
              </h3>
              <p>Cuando visitas nuestro sitio, recopilamos automáticamente:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Dirección IP y ubicación geográfica aproximada</li>
                <li>Tipo de navegador y sistema operativo</li>
                <li>Páginas visitadas y tiempo de navegación</li>
                <li>Fuente de referencia (cómo llegaste a nuestro sitio)</li>
                <li>Información del dispositivo</li>
              </ul>

              <h3 className="text-lg font-bold mt-4 mb-2">1.3 Información de Terceros</h3>
              <p>Podemos recibir información de:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Servicios de autenticación (Google, Facebook)</li>
                <li>Procesadores de pago (datos de transacción)</li>
                <li>Servicios de análisis (Google Analytics)</li>
                <li>Redes sociales (si vinculas tu cuenta)</li>
              </ul>
            </div>
          </section>

          {/* Uso de la Información */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">2. Cómo Usamos tu Información</h2>
            </div>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>Utilizamos tu información personal para:</p>

              <h3 className="text-lg font-bold mt-4 mb-2">2.1 Proporcionar Servicios</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Procesar y completar tus pedidos</li>
                <li>Gestionar tu cuenta y preferencias</li>
                <li>Facilitar la comunicación con artesanos</li>
                <li>Proporcionar soporte al cliente</li>
                <li>Enviar confirmaciones y actualizaciones de pedidos</li>
              </ul>

              <h3 className="text-lg font-bold mt-4 mb-2">2.2 Mejorar y Personalizar</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Personalizar tu experiencia de compra</li>
                <li>Recomendar productos relevantes</li>
                <li>Analizar tendencias y comportamiento de usuarios</li>
                <li>Mejorar nuestros productos y servicios</li>
                <li>Desarrollar nuevas características</li>
              </ul>

              <h3 className="text-lg font-bold mt-4 mb-2">2.3 Comunicación</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Enviarte actualizaciones de cuenta y pedidos</li>
                <li>Responder a tus consultas y solicitudes</li>
                <li>Enviar ofertas y promociones (con tu consentimiento)</li>
                <li>Notificarte sobre cambios en nuestros términos</li>
              </ul>

              <h3 className="text-lg font-bold mt-4 mb-2">2.4 Seguridad y Legal</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Prevenir fraude y actividades ilegales</li>
                <li>Proteger nuestros derechos y propiedad</li>
                <li>Cumplir con obligaciones legales</li>
                <li>Resolver disputas</li>
              </ul>
            </div>
          </section>

          {/* Compartir Información */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">3. Compartir tu Información</h2>
            </div>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>Compartimos tu información personal solo en las siguientes circunstancias:</p>

              <h3 className="text-lg font-bold mt-4 mb-2">3.1 Con Artesanos</h3>
              <p>
                Compartimos información de contacto y envío con los artesanos cuando realizas una
                compra para que puedan procesar y enviar tu pedido.
              </p>

              <h3 className="text-lg font-bold mt-4 mb-2">3.2 Proveedores de Servicios</h3>
              <p>Trabajamos con terceros que nos ayudan a operar nuestro negocio:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Procesadores de pago (Stripe, PayPal)</li>
                <li>Servicios de envío y logística</li>
                <li>Proveedores de hosting y almacenamiento</li>
                <li>Servicios de análisis y marketing</li>
                <li>Proveedores de email y comunicación</li>
              </ul>

              <h3 className="text-lg font-bold mt-4 mb-2">3.3 Requisitos Legales</h3>
              <p>Podemos divulgar tu información si:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Es requerido por ley o proceso legal</li>
                <li>Es necesario para proteger nuestros derechos</li>
                <li>Es necesario para prevenir fraude o actividad ilegal</li>
                <li>Es necesario para proteger la seguridad de usuarios</li>
              </ul>

              <h3 className="text-lg font-bold mt-4 mb-2">3.4 Transferencias de Negocio</h3>
              <p>
                En caso de fusión, adquisición o venta de activos, tu información puede ser
                transferida. Te notificaremos antes de que tu información esté sujeta a una política
                de privacidad diferente.
              </p>

              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded mt-4">
                <p className="text-sm text-green-900 font-medium">
                  <Shield className="w-4 h-4 inline mr-2" />
                  Nunca vendemos tu información personal a terceros para sus propósitos de
                  marketing.
                </p>
              </div>
            </div>
          </section>

          {/* Seguridad */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">4. Seguridad de la Información</h2>
            </div>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>
                Implementamos medidas técnicas y organizativas para proteger tu información personal
                contra acceso, uso, modificación o divulgación no autorizados:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Encriptación SSL/TLS para todas las transmisiones de datos</li>
                <li>Contraseñas hasheadas con algoritmos seguros</li>
                <li>Acceso restringido a información personal solo a personal autorizado</li>
                <li>Firewalls y sistemas de detección de intrusiones</li>
                <li>Auditorías de seguridad regulares</li>
                <li>Capacitación continua del personal en seguridad</li>
              </ul>

              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 rounded mt-4">
                <p className="text-sm text-yellow-900">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  Aunque implementamos medidas de seguridad robustas, ningún sistema es 100% seguro.
                  Si detectas actividad sospechosa en tu cuenta, contáctanos inmediatamente.
                </p>
              </div>
            </div>
          </section>

          {/* Tus Derechos */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <UserCheck className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">5. Tus Derechos (Derechos ARCO)</h2>
            </div>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>
                Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los
                Particulares, tienes derecho a:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Acceso</h4>
                  <p className="text-sm">
                    Solicitar información sobre qué datos personales tenemos sobre ti
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Rectificación</h4>
                  <p className="text-sm">Corregir datos personales incorrectos o desactualizados</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Cancelación</h4>
                  <p className="text-sm">
                    Solicitar la eliminación de tus datos personales de nuestros registros
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Oposición</h4>
                  <p className="text-sm">
                    Oponerte al uso de tus datos personales para fines específicos
                  </p>
                </div>
              </div>

              <p>Para ejercer tus derechos ARCO, contáctanos en:</p>
              <ul className="list-none ml-0 space-y-1">
                <li>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:privacidad@hechoenmexicov.com"
                    className="text-primary-600 hover:underline"
                  >
                    privacidad@hechoenmexicov.com
                  </a>
                </li>
                <li>
                  <strong>Tiempo de respuesta:</strong> 20 días hábiles
                </li>
              </ul>

              <h3 className="text-lg font-bold mt-4 mb-2">Otros Derechos</h3>
              <ul className="list-disc ml-6 space-y-1">
                <li>Actualizar tu información de cuenta en cualquier momento</li>
                <li>Desactivar o eliminar tu cuenta</li>
                <li>Optar por no recibir comunicaciones de marketing</li>
                <li>Solicitar una copia de tus datos en formato portable</li>
                <li>Retirar tu consentimiento en cualquier momento</li>
              </ul>
            </div>
          </section>

          {/* Cookies */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">
                6. Cookies y Tecnologías Similares
              </h2>
            </div>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia, analizar el
                uso del sitio y personalizar contenido. Puedes controlar las cookies a través de la
                configuración de tu navegador.
              </p>
              <p>
                Para más información, consulta nuestra{' '}
                <Link href={ROUTES.COOKIES} className="text-primary-600 hover:underline">
                  Política de Cookies
                </Link>
                .
              </p>
            </div>
          </section>

          {/* Retención */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Database className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">7. Retención de Datos</h2>
            </div>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>Retenemos tu información personal durante el tiempo necesario para:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Proporcionar nuestros servicios</li>
                <li>Cumplir con obligaciones legales</li>
                <li>Resolver disputas</li>
                <li>Hacer cumplir nuestros acuerdos</li>
              </ul>
              <p>
                Cuando ya no sea necesario retener tu información, la eliminaremos o anonimizaremos
                de forma segura.
              </p>
            </div>
          </section>

          {/* Menores */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">8. Privacidad de Menores</h2>
            </div>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>
                Nuestros servicios están dirigidos a personas mayores de 18 años. No recopilamos
                intencionalmente información personal de menores de 18 años. Si descubrimos que
                hemos recopilado información de un menor, la eliminaremos inmediatamente.
              </p>
              <p>
                Si eres padre o tutor y crees que tu hijo nos ha proporcionado información personal,
                contáctanos en{' '}
                <a
                  href="mailto:privacidad@hechoenmexicov.com"
                  className="text-primary-600 hover:underline"
                >
                  privacidad@hechoenmexicov.com
                </a>
              </p>
            </div>
          </section>

          {/* Cambios */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">9. Cambios a esta Política</h2>
            </div>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>
                Podemos actualizar esta Política de Privacidad periódicamente. Te notificaremos
                sobre cambios significativos publicando la nueva política en esta página y
                actualizando la fecha de "Última actualización".
              </p>
              <p>
                Te recomendamos revisar esta política regularmente para estar informado sobre cómo
                protegemos tu información.
              </p>
            </div>
          </section>

          {/* Contact Card */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl shadow-md p-8">
            <div className="text-center">
              <Mail className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">¿Preguntas sobre tu Privacidad?</h2>
              <p className="mb-6 text-primary-100">
                Nuestro equipo de privacidad está disponible para ayudarte
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:privacidad@hechoenmexicov.com"
                  className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  privacidad@hechoenmexicov.com
                </a>
              </div>
              <p className="text-sm text-primary-100 mt-4">
                Responsable: Hecho en México S.A. de C.V.
                <br />
                Domicilio: Av. Reforma 123, Ciudad de México, 06600
              </p>
            </div>
          </div>

          {/* Related Links */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-900 mb-4">Políticas Relacionadas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href={ROUTES.TERMS}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Términos y Condiciones</span>
              </Link>
              <Link
                href={ROUTES.COOKIES}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Política de Cookies</span>
              </Link>
              <Link
                href={ROUTES.RETURNS_POLICY}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Política de Devoluciones</span>
              </Link>
              <Link
                href={ROUTES.LEGAL_NOTICE}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Aviso Legal</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
