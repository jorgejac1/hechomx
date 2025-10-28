import Link from 'next/link';

export default function AboutSection() {
  return (
    <>
      <section className="bg-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ¿Qué es Hecho en México?
            </h2>
            <Link
              href="/nosotros"
              className="text-primary-600 hover:text-primary-700 font-medium underline"
            >
              Conoce nuestra historia
            </Link>
          </div>

          {/* Three Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Column 1 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Una comunidad que transforma
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Hecho en México es un mercado digital donde artesanos y creadores mexicanos 
                se conectan con personas que valoran lo auténtico. Somos una comunidad 
                comprometida con preservar las tradiciones, apoyar la economía local y 
                promover el talento mexicano en todo el mundo.{' '}
                <Link
                  href="/impacto"
                  className="text-primary-600 hover:text-primary-700 font-medium underline"
                >
                  Conoce nuestro impacto positivo.
                </Link>
              </p>
            </div>

            {/* Column 2 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Apoya a artesanos independientes
              </h3>
              <p className="text-gray-700 leading-relaxed">
                No hay bodega de Hecho en México - solo millones de artesanos vendiendo 
                las creaciones que aman. Facilitamos todo el proceso, ayudándote a conectar 
                directamente con maestros artesanos de los 32 estados para encontrar algo 
                verdaderamente extraordinario.
              </p>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Compra con confianza
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Tu seguridad es nuestra prioridad más alta. Cada producto está verificado 
                como 100% hecho en México. Nuestro equipo dedicado está siempre listo para 
                brindarte asistencia y garantizar una experiencia de compra excepcional.
              </p>
            </div>
          </div>

          {/* Help Center CTA */}
          <div className="text-center">
            <p className="text-xl text-gray-900 mb-4">
              ¿Tienes alguna pregunta? Tenemos respuestas.
            </p>
            <Link
              href="/ayuda"
              className="inline-block px-8 py-3 border-2 border-gray-900 rounded-full text-gray-900 font-semibold hover:bg-gray-900 hover:text-white transition"
            >
              Ir al Centro de Ayuda
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section - FULL WIDTH */}
      <section className="bg-blue-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-lg md:text-xl text-gray-900 mb-6 max-w-4xl mx-auto">
              ¡Sí! Envíame ofertas exclusivas, ideas únicas de regalos y consejos 
              personalizados para comprar y vender en Hecho en México.
            </p>
            <form className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 items-center justify-center">
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className="w-full sm:flex-1 px-6 py-4 rounded-full border-2 border-gray-300 focus:border-primary-500 focus:outline-none text-base"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition whitespace-nowrap"
              >
                Suscribirse
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Sustainability Note */}
      <section className="bg-amber-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-gray-700">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">
                <Link href="/sustentabilidad" className="underline hover:text-primary-600">
                  Comprometidos con prácticas sustentables y comercio justo.
                </Link>
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}