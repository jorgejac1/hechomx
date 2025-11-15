import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, CheckCircle, AlertCircle, Shield } from 'lucide-react';
import { ROUTES } from '@/lib';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Papalote Market',
  description: 'Lee nuestros términos y condiciones de uso de la plataforma',
};

export default function TermsPage() {
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
              <FileText className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Términos y Condiciones</h1>
              <p className="text-gray-600 mt-1">Última actualización: Noviembre 2024</p>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Al acceder y utilizar Papalote Market, aceptas estar sujeto a estos términos y
            condiciones. Por favor, léelos cuidadosamente antes de usar nuestra plataforma.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Aceptación */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-6 h-6 text-primary-600" />
              1. Aceptación de Términos
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>
                Al acceder y utilizar Papalote Market (el "Sitio"), aceptas cumplir con estos
                Términos y Condiciones ("Términos"). Si no estás de acuerdo con alguna parte de
                estos términos, no debes utilizar nuestro sitio.
              </p>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los
                cambios entrarán en vigor inmediatamente después de su publicación en el Sitio. Es
                tu responsabilidad revisar estos términos periódicamente.
              </p>
            </div>
          </section>

          {/* Uso del Sitio */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Uso del Sitio</h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <h3 className="text-lg font-bold mt-4 mb-2">2.1 Elegibilidad</h3>
              <p>
                Debes tener al menos 18 años para usar nuestro Sitio y realizar compras. Al usar el
                Sitio, declaras y garantizas que tienes la capacidad legal para celebrar contratos
                vinculantes.
              </p>

              <h3 className="text-lg font-bold mt-4 mb-2">2.2 Cuenta de Usuario</h3>
              <p>
                Para realizar compras, debes crear una cuenta proporcionando información precisa y
                actualizada. Eres responsable de:
              </p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Mantener la confidencialidad de tu contraseña</li>
                <li>Todas las actividades que ocurran bajo tu cuenta</li>
                <li>Notificarnos inmediatamente sobre cualquier uso no autorizado</li>
              </ul>

              <h3 className="text-lg font-bold mt-4 mb-2">2.3 Uso Prohibido</h3>
              <p>No puedes usar el Sitio para:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Violar cualquier ley local, estatal, nacional o internacional</li>
                <li>Transmitir material ofensivo, difamatorio o ilegal</li>
                <li>Interferir con el funcionamiento del Sitio</li>
                <li>Intentar obtener acceso no autorizado a sistemas o redes</li>
                <li>Realizar actividades comerciales no autorizadas</li>
              </ul>
            </div>
          </section>

          {/* Compras */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Compras y Pagos</h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <h3 className="text-lg font-bold mt-4 mb-2">3.1 Productos</h3>
              <p>
                Los productos artesanales listados en el Sitio son vendidos directamente por
                artesanos independientes. Hacemos nuestro mejor esfuerzo para mostrar los colores y
                características de los productos con precisión, pero no podemos garantizar que tu
                monitor muestre los colores con exactitud absoluta.
              </p>

              <h3 className="text-lg font-bold mt-4 mb-2">3.2 Precios</h3>
              <p>
                Todos los precios están en pesos mexicanos (MXN) e incluyen IVA cuando aplique. Nos
                reservamos el derecho de modificar precios sin previo aviso. El precio aplicable
                será el vigente al momento de realizar tu pedido.
              </p>

              <h3 className="text-lg font-bold mt-4 mb-2">3.3 Proceso de Pago</h3>
              <p>
                Al realizar un pedido, declaras que la información de pago proporcionada es correcta
                y que tienes autorización para usar el método de pago seleccionado. Podemos rechazar
                o cancelar pedidos por cualquier motivo, incluyendo errores de precio, problemas de
                inventario o sospecha de fraude.
              </p>
            </div>
          </section>

          {/* Envíos */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Envíos y Entregas</h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>
                Los tiempos de envío son estimados y pueden variar. No somos responsables por
                retrasos causados por la paquetería, condiciones climáticas, o eventos fuera de
                nuestro control.
              </p>
              <p>
                El riesgo de pérdida y propiedad de los productos pasan a ti al momento de la
                entrega al transportista. Si un producto es dañado durante el envío, contáctanos
                inmediatamente para resolver el problema.
              </p>
            </div>
          </section>

          {/* Devoluciones */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Devoluciones y Reembolsos</h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>
                Nuestra política de devoluciones permite devolver la mayoría de los productos dentro
                de los 30 días posteriores a la recepción. Los productos personalizados o hechos
                bajo pedido no son elegibles para devolución excepto si están defectuosos.
              </p>
              <p>
                Los reembolsos se procesarán al método de pago original dentro de 5-10 días hábiles
                después de recibir y aprobar la devolución. Los costos de envío original no son
                reembolsables excepto en casos de productos defectuosos o errores de nuestra parte.
              </p>
            </div>
          </section>

          {/* Propiedad Intelectual */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Propiedad Intelectual</h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>
                Todo el contenido del Sitio, incluyendo textos, gráficos, logos, imágenes, videos y
                software, es propiedad de Papalote Market o sus proveedores de contenido y está
                protegido por las leyes de derechos de autor mexicanas e internacionales.
              </p>
              <p>
                Los productos artesanales y sus diseños son propiedad intelectual de los artesanos
                respectivos. No puedes reproducir, copiar o vender diseños sin el permiso expreso
                del artesano.
              </p>
            </div>
          </section>

          {/* Limitación de Responsabilidad */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              7. Limitación de Responsabilidad
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>
                Papalote Market actúa como plataforma intermediaria entre compradores y artesanos.
                No fabricamos los productos y no somos responsables por defectos de fabricación,
                aunque trabajaremos contigo y el artesano para resolver cualquier problema.
              </p>
              <p>
                En la máxima medida permitida por la ley, no seremos responsables por daños
                indirectos, incidentales, especiales o consecuentes, incluyendo pérdida de
                ganancias, datos o goodwill.
              </p>
            </div>
          </section>

          {/* Para Vendedores */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Términos para Vendedores</h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <h3 className="text-lg font-bold mt-4 mb-2">8.1 Registro</h3>
              <p>
                Los artesanos deben completar un proceso de verificación antes de vender en la
                plataforma. Debes proporcionar información veraz y mantener tu perfil actualizado.
              </p>

              <h3 className="text-lg font-bold mt-4 mb-2">8.2 Comisiones</h3>
              <p>
                Cobramos una comisión del 15% sobre cada venta más tarifas de procesamiento de pago.
                Los pagos se transfieren a tu cuenta 7 días después de la confirmación de recepción
                por parte del comprador.
              </p>

              <h3 className="text-lg font-bold mt-4 mb-2">8.3 Responsabilidades</h3>
              <p>Como vendedor, eres responsable de:</p>
              <ul className="list-disc ml-6 space-y-1">
                <li>Describir productos con precisión</li>
                <li>Cumplir con los tiempos de entrega estimados</li>
                <li>Empacar productos adecuadamente</li>
                <li>Responder a consultas de clientes</li>
                <li>Cumplir con todas las leyes aplicables</li>
              </ul>
            </div>
          </section>

          {/* Ley Aplicable */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              9. Ley Aplicable y Jurisdicción
            </h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>
                Estos Términos se regirán e interpretarán de acuerdo con las leyes de los Estados
                Unidos Mexicanos. Cualquier disputa relacionada con estos Términos estará sujeta a
                la jurisdicción exclusiva de los tribunales de la Ciudad de México.
              </p>
            </div>
          </section>

          {/* Contacto */}
          <section className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contacto</h2>
            <div className="prose prose-gray max-w-none text-gray-700">
              <p>Si tienes preguntas sobre estos Términos y Condiciones, contáctanos en:</p>
              <ul className="list-none ml-0 space-y-1">
                <li>
                  <strong>Email:</strong>{' '}
                  <a
                    href="mailto:legal@hechoenmexicov.com"
                    className="text-primary-600 hover:underline"
                  >
                    legal@hechoenmexicov.com
                  </a>
                </li>
                <li>
                  <strong>Teléfono:</strong> +52 55 1234 5678
                </li>
                <li>
                  <strong>Dirección:</strong> Av. Reforma 123, Ciudad de México, 06600
                </li>
              </ul>
            </div>
          </section>

          {/* Notice Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Nota Importante</h3>
                <p className="text-sm text-blue-800">
                  Estos términos constituyen el acuerdo completo entre tú y Papalote Market. Si
                  alguna disposición es considerada inválida, las demás disposiciones permanecerán
                  en pleno vigor y efecto.
                </p>
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
                href={ROUTES.RETURNS_POLICY}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Política de Devoluciones</span>
              </Link>
              <Link
                href={ROUTES.COOKIES}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Política de Cookies</span>
              </Link>
              <Link
                href={ROUTES.SHIPPING_POLICY}
                className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition"
              >
                <FileText className="w-4 h-4" />
                <span>Política de Envíos</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
