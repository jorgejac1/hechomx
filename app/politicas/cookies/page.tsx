import { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowLeft,
  Cookie,
  Shield,
  Settings,
  CheckCircle,
  AlertCircle,
  FileText,
} from 'lucide-react';
import { ROUTES } from '@/lib';

export const metadata: Metadata = {
  title: 'Política de Cookies | Hecho en México',
  description: 'Conoce cómo utilizamos cookies en nuestro sitio web',
};

export default function CookiesPage() {
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
              <Cookie className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Política de Cookies</h1>
              <p className="text-gray-600 mt-1">Última actualización: Noviembre 2024</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Esta política explica qué son las cookies, cómo las usamos en Hecho en México, y cómo
            puedes controlarlas para proteger tu privacidad.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* ¿Qué son las Cookies? */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Cookie className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">¿Qué son las Cookies?</h2>
            </div>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo
                (computadora, tablet o teléfono) cuando visitas un sitio web. Las cookies permiten
                que el sitio web reconozca tu dispositivo y recuerde información sobre tu visita.
              </p>
              <p>
                Las cookies pueden ser "de sesión" (que se eliminan cuando cierras el navegador) o
                "persistentes" (que permanecen en tu dispositivo durante un período determinado).
              </p>
            </div>
          </section>

          {/* Cómo Usamos las Cookies */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Cómo Usamos las Cookies</h2>
            </div>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>
                Utilizamos cookies y tecnologías similares para mejorar tu experiencia en nuestro
                sitio, analizar cómo se usa y personalizar el contenido.
              </p>
            </div>
          </section>

          {/* Tipos de Cookies */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tipos de Cookies que Usamos</h2>

            {/* Esenciales */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    1. Cookies Estrictamente Necesarias
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Estas cookies son esenciales para que el sitio funcione correctamente. No pueden
                    desactivarse.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Propósito:</h4>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      <li>• Mantener tu sesión activa</li>
                      <li>• Recordar productos en tu carrito</li>
                      <li>• Habilitar la navegación segura</li>
                      <li>• Recordar tus preferencias de privacidad</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Funcionales */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <Settings className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">2. Cookies Funcionales</h3>
                  <p className="text-gray-700 mb-3">
                    Estas cookies permiten que el sitio recuerde tus elecciones y proporcione
                    funciones mejoradas.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Propósito:</h4>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      <li>• Recordar tu idioma preferido</li>
                      <li>• Guardar tus preferencias de visualización</li>
                      <li>• Recordar tu ubicación</li>
                      <li>• Personalizar contenido según tus intereses</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Analíticas */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <Shield className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    3. Cookies de Análisis y Rendimiento
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Estas cookies nos ayudan a entender cómo los visitantes interactúan con nuestro
                    sitio.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Propósito:</h4>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      <li>• Contar visitantes y medir tráfico</li>
                      <li>• Entender cómo navegan los usuarios</li>
                      <li>• Identificar páginas populares y problemáticas</li>
                      <li>• Mejorar el rendimiento del sitio</li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <strong>Servicios utilizados:</strong> Google Analytics, Hotjar
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Publicidad */}
            <div>
              <div className="flex items-start gap-3 mb-3">
                <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    4. Cookies de Publicidad y Marketing
                  </h3>
                  <p className="text-gray-700 mb-3">
                    Estas cookies se utilizan para mostrarte anuncios relevantes y medir la
                    efectividad de nuestras campañas.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Propósito:</h4>
                    <ul className="text-sm text-gray-700 space-y-1 ml-4">
                      <li>• Mostrar anuncios relevantes</li>
                      <li>• Limitar la frecuencia de anuncios</li>
                      <li>• Medir la efectividad de campañas</li>
                      <li>• Personalizar contenido publicitario</li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <p className="text-sm text-gray-600">
                        <strong>Servicios utilizados:</strong> Google Ads, Facebook Pixel, Pinterest
                        Tag
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Cookies de Terceros */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies de Terceros</h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p className="mb-4">
                Algunos de nuestros socios también pueden colocar cookies en tu dispositivo cuando
                visitas nuestro sitio:
              </p>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Google Analytics</h3>
                  <p className="text-sm mb-2">
                    Utilizamos Google Analytics para analizar el uso de nuestro sitio web.
                  </p>
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:underline"
                  >
                    Ver política de privacidad →
                  </a>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Facebook Pixel</h3>
                  <p className="text-sm mb-2">
                    Usado para rastrear conversiones y optimizar anuncios en Facebook.
                  </p>
                  <a
                    href="https://www.facebook.com/privacy/explanation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:underline"
                  >
                    Ver política de privacidad →
                  </a>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-bold text-gray-900 mb-2">Stripe / PayPal</h3>
                  <p className="text-sm mb-2">
                    Nuestros procesadores de pago usan cookies para procesar transacciones seguras.
                  </p>
                  <a
                    href="https://stripe.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary-600 hover:underline"
                  >
                    Ver políticas de privacidad →
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Controlar Cookies */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-primary-600" />
              <h2 className="text-2xl font-bold text-gray-900">Cómo Controlar las Cookies</h2>
            </div>
            <div className="prose prose-gray max-w-none text-gray-700">
              <h3 className="text-lg font-bold mt-4 mb-2">1. Configuración del Navegador</h3>
              <p>
                Puedes configurar tu navegador para que rechace todas las cookies o te avise cuando
                se envía una cookie. Sin embargo, si desactivas las cookies, algunas funcionalidades
                del sitio pueden no funcionar correctamente.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Google Chrome</h4>
                  <p className="text-sm">
                    Configuración → Privacidad y seguridad → Cookies y otros datos de sitios
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Mozilla Firefox</h4>
                  <p className="text-sm">
                    Opciones → Privacidad y seguridad → Cookies y datos del sitio
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Safari</h4>
                  <p className="text-sm">
                    Preferencias → Privacidad → Administrar datos de sitios web
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-bold text-gray-900 mb-2">Microsoft Edge</h4>
                  <p className="text-sm">
                    Configuración → Privacidad, búsqueda y servicios → Cookies
                  </p>
                </div>
              </div>

              <h3 className="text-lg font-bold mt-4 mb-2">2. Panel de Preferencias de Cookies</h3>
              <p>
                Puedes gestionar tus preferencias de cookies en cualquier momento a través de
                nuestro panel de configuración de cookies.
              </p>
              <button className="mt-3 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition">
                Configurar Preferencias de Cookies
              </button>

              <h3 className="text-lg font-bold mt-4 mb-2">3. Opt-Out de Publicidad</h3>
              <p>Puedes optar por no participar en la publicidad personalizada:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>
                  <a
                    href="https://optout.aboutads.info/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    Digital Advertising Alliance (DAA)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youronlinechoices.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    European Interactive Digital Advertising Alliance (EDAA)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.networkadvertising.org/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-600 hover:underline"
                  >
                    Network Advertising Initiative (NAI)
                  </a>
                </li>
              </ul>
            </div>
          </section>

          {/* Do Not Track */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Señales "Do Not Track"</h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>
                Algunos navegadores incluyen una función "Do Not Track" que indica a los sitios web
                que no rastreen tu actividad. Actualmente no existe un estándar universal para
                interpretar estas señales, por lo que nuestro sitio no responde a solicitudes "Do
                Not Track" en este momento.
              </p>
            </div>
          </section>

          {/* Actualizaciones */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Actualizaciones de esta Política
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>
                Podemos actualizar esta Política de Cookies periódicamente para reflejar cambios en
                nuestras prácticas o por otras razones operativas, legales o regulatorias. Te
                notificaremos sobre cambios significativos publicando la política actualizada en
                esta página.
              </p>
            </div>
          </section>

          {/* Contact Card */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl shadow-md p-8">
            <div className="text-center">
              <Cookie className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">¿Preguntas sobre Cookies?</h2>
              <p className="mb-6 text-primary-100">
                Contáctanos si tienes dudas sobre nuestra política de cookies
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:privacidad@hechoenmexicov.com"
                  className="px-6 py-3 bg-white text-primary-600 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  privacidad@hechoenmexicov.com
                </a>
              </div>
            </div>
          </div>

          {/* Related Links */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-900 mb-4">Políticas Relacionadas</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href={ROUTES.PRIVACY}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
              >
                <Shield className="w-4 h-4" />
                <span>Política de Privacidad</span>
              </Link>
              <Link
                href={ROUTES.TERMS}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Términos y Condiciones</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
