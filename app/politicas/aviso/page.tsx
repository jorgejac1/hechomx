import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Building, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { ROUTES } from '@/lib';

export const metadata: Metadata = {
  title: 'Aviso Legal | Papalote Market',
  description: 'Información legal sobre Papalote Market',
};

export default function LegalNoticePage() {
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
              <FileText className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Aviso Legal</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Información legal y corporativa
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Identificación */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                1. Identificación del Titular
              </h2>
            </div>
            <div className="prose prose-gray max-w-none">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <Building className="w-5 h-5 text-gray-600 dark:text-gray-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Razón Social:</p>
                    <p className="text-gray-700 dark:text-gray-300">Papalote Market S.A. de C.V.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-gray-600 dark:text-gray-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">RFC:</p>
                    <p className="text-gray-700 dark:text-gray-300">HEM123456789</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-600 dark:text-gray-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">
                      Domicilio Fiscal:
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                      Av. Reforma 123
                      <br />
                      Col. Juárez, C.P. 06600
                      <br />
                      Cuauhtémoc, Ciudad de México
                      <br />
                      México
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Email:</p>
                    <a
                      href="mailto:legal@@papalotemarket.com"
                      className="text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      legal@@papalotemarket.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400 shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-gray-100">Teléfono:</p>
                    <p className="text-gray-700 dark:text-gray-300">+52 55 1234 5678</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Objeto del Sitio Web */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              2. Objeto del Sitio Web
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700 dark:text-gray-300">
              <p>
                Papalote Market es una plataforma de comercio electrónico que conecta a artesanos
                mexicanos con compradores interesados en productos artesanales auténticos y de alta
                calidad.
              </p>
              <p>
                El sitio web ofrece un marketplace donde los artesanos pueden exhibir y vender sus
                productos, y los compradores pueden descubrir, comparar y adquirir artesanías
                tradicionales mexicanas.
              </p>
            </div>
          </section>

          {/* Condiciones de Uso */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              3. Condiciones de Uso
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700 dark:text-gray-300">
              <p>
                El acceso y uso de este sitio web atribuye la condición de usuario y supone la
                aceptación plena de todas las condiciones incluidas en este Aviso Legal, los
                Términos y Condiciones de Uso y la Política de Privacidad.
              </p>
              <p>
                El titular se reserva el derecho de modificar el contenido del sitio web sin previo
                aviso y sin ninguna limitación.
              </p>
            </div>
          </section>

          {/* Propiedad Intelectual */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              4. Propiedad Intelectual e Industrial
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700 dark:text-gray-300">
              <p>
                Todos los contenidos del sitio web, incluyendo pero no limitado a textos,
                fotografías, gráficos, imágenes, iconos, tecnología, software, links y demás
                contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, son
                propiedad intelectual de Papalote Market S.A. de C.V. o de sus proveedores de
                contenido.
              </p>
              <p>
                Queda expresamente prohibida la reproducción, distribución, comunicación pública y
                transformación de los contenidos sin la autorización expresa del titular de los
                derechos.
              </p>
              <p>
                Los productos artesanales y sus diseños son propiedad intelectual de los artesanos
                respectivos. Cualquier uso no autorizado constituye una violación de los derechos de
                propiedad intelectual.
              </p>
            </div>
          </section>

          {/* Exclusión de Garantías */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              5. Exclusión de Garantías y Responsabilidad
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700 dark:text-gray-300">
              <h3 className="text-lg font-bold mt-4 mb-2">5.1 Contenido del Sitio</h3>
              <p>
                Papalote Market no garantiza la licitud, fiabilidad, exactitud, exhaustividad y
                actualidad de los contenidos del sitio web. El uso de la información publicada es
                responsabilidad exclusiva del usuario.
              </p>

              <h3 className="text-lg font-bold mt-4 mb-2">5.2 Productos de Terceros</h3>
              <p>
                Papalote Market actúa como intermediario entre compradores y artesanos. Los
                productos son fabricados y vendidos directamente por artesanos independientes. No
                somos responsables por defectos de fabricación, aunque trabajaremos contigo y el
                artesano para resolver cualquier problema.
              </p>

              <h3 className="text-lg font-bold mt-4 mb-2">5.3 Disponibilidad del Servicio</h3>
              <p>
                No garantizamos la disponibilidad continua e ininterrumpida del sitio web. Nos
                reservamos el derecho de suspender temporalmente el acceso al sitio por razones
                técnicas, de mantenimiento, o de cualquier otra índole.
              </p>

              <h3 className="text-lg font-bold mt-4 mb-2">5.4 Enlaces Externos</h3>
              <p>
                El sitio puede contener enlaces a sitios web de terceros. No somos responsables del
                contenido de estos sitios externos ni de su política de privacidad o términos de
                uso.
              </p>
            </div>
          </section>

          {/* Protección de Datos */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                6. Protección de Datos Personales
              </h2>
            </div>
            <div className="prose prose-gray max-w-none text-gray-700 dark:text-gray-300">
              <p>
                De conformidad con la Ley Federal de Protección de Datos Personales en Posesión de
                los Particulares (LFPDPPP), Papalote Market S.A. de C.V. es responsable del
                tratamiento de tus datos personales.
              </p>
              <p>
                Los datos personales que recabamos serán utilizados para las finalidades descritas
                en nuestro{' '}
                <Link
                  href={ROUTES.PRIVACY}
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Aviso de Privacidad
                </Link>
                , el cual ponemos a tu disposición para su consulta.
              </p>
              <p>
                Para ejercer tus derechos ARCO (Acceso, Rectificación, Cancelación y Oposición),
                puedes contactarnos en{' '}
                <a
                  href="mailto:privacidad@@papalotemarket.com"
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  privacidad@@papalotemarket.com
                </a>
              </p>
            </div>
          </section>

          {/* Legislación Aplicable */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              7. Legislación Aplicable y Jurisdicción
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700 dark:text-gray-300">
              <p>
                Este Aviso Legal se rige por la legislación mexicana vigente. Para cualquier
                controversia que pudiera derivarse del acceso o uso del sitio web, las partes se
                someten expresamente a la jurisdicción de los tribunales de la Ciudad de México,
                renunciando a cualquier otro fuero que pudiera corresponderles.
              </p>
            </div>
          </section>

          {/* Contacto */}
          <section className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              8. Contacto
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700 dark:text-gray-300">
              <p>
                Para cualquier consulta relacionada con este Aviso Legal o con el funcionamiento del
                sitio web, puedes contactarnos a través de:
              </p>
              <ul className="list-none ml-0 space-y-2">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <a
                    href="mailto:legal@@papalotemarket.com"
                    className="text-primary-600 dark:text-primary-400 hover:underline"
                  >
                    legal@@papalotemarket.com
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary-600 dark:text-primary-400" />
                  <span>+52 55 1234 5678</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-primary-600 dark:text-primary-400 shrink-0 mt-1" />
                  <span>
                    Av. Reforma 123, Col. Juárez
                    <br />
                    C.P. 06600, Ciudad de México
                  </span>
                </li>
              </ul>
            </div>
          </section>

          {/* Related Links */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">
              Documentos Legales Relacionados
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href={ROUTES.TERMS}
                className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Términos y Condiciones</span>
              </Link>
              <Link
                href={ROUTES.PRIVACY}
                className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition"
              >
                <Shield className="w-4 h-4" />
                <span>Política de Privacidad</span>
              </Link>
              <Link
                href={ROUTES.COOKIES}
                className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Política de Cookies</span>
              </Link>
              <Link
                href={ROUTES.RETURNS_POLICY}
                className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Política de Devoluciones</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
