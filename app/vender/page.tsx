'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/lib';
import {
  Store,
  TrendingUp,
  DollarSign,
  Users,
  Shield,
  Sparkles,
  Package,
  BarChart3,
  Globe,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Palette,
  Clock,
  Award,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Star,
} from 'lucide-react';
import {
  BenefitCard,
  StepCard,
  FeatureCard,
  TestimonialCard,
  TrustIndicator,
} from '@/components/vender';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: '¿Cuánto cuesta vender en Papalote Market?',
    answer:
      'Crear tu tienda es completamente gratis. Solo cobramos una comisión del 10% sobre cada venta realizada, sin costos ocultos ni tarifas mensuales.',
  },
  {
    question: '¿Qué tipo de productos puedo vender?',
    answer:
      'Aceptamos todo tipo de artesanías mexicanas auténticas: textiles, cerámica, joyería, madera tallada, barro negro, talavera, alebrijes, y más. Los productos deben ser hechos a mano o con procesos artesanales tradicionales.',
  },
  {
    question: '¿Cómo recibo mis pagos?',
    answer:
      'Los pagos se procesan de manera segura y se depositan directamente en tu cuenta bancaria cada semana. Aceptamos transferencias bancarias, SPEI, y otros métodos de pago populares en México.',
  },
  {
    question: '¿Necesito experiencia vendiendo en línea?',
    answer:
      'No necesitas experiencia previa. Te guiamos paso a paso desde la creación de tu tienda hasta tu primera venta. Además, ofrecemos herramientas como la calculadora de precios y recursos educativos.',
  },
  {
    question: '¿Puedo vender si vivo fuera de las ciudades principales?',
    answer:
      '¡Por supuesto! Trabajamos con artesanos de todo México, desde comunidades rurales hasta grandes ciudades. Lo único que necesitas es acceso a internet para gestionar tu tienda.',
  },
  {
    question: '¿Cómo manejo los envíos?',
    answer:
      'Tú decides cómo enviar tus productos. Puedes usar servicios de paquetería de tu elección o trabajar con nuestros partners logísticos para obtener tarifas preferenciales. Nosotros te ayudamos con el etiquetado y seguimiento.',
  },
];

const BENEFITS = [
  {
    icon: DollarSign,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    title: 'Cero Costos Iniciales',
    description:
      'Crea tu tienda gratis. Solo pagas el 10% de comisión cuando vendas. Sin tarifas mensuales ni costos ocultos.',
  },
  {
    icon: Users,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    title: 'Audiencia Comprometida',
    description:
      'Acceso a miles de clientes que buscan específicamente artesanías mexicanas auténticas y de calidad.',
  },
  {
    icon: Sparkles,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    title: 'Cuenta Tu Historia',
    description:
      'Comparte tu herencia, proceso creativo y pasión. Conecta emocionalmente con tus clientes.',
  },
  {
    icon: Calculator,
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
    title: 'Herramientas Profesionales',
    description:
      'Calculadora de precios, analytics, gestión de inventario y más herramientas para hacer crecer tu negocio.',
  },
  {
    icon: Shield,
    iconColor: 'text-red-600',
    iconBg: 'bg-red-100',
    title: 'Pagos Seguros',
    description:
      'Procesamos pagos de forma segura y te depositamos semanalmente. Tú te enfocas en crear, nosotros en el resto.',
  },
  {
    icon: MessageSquare,
    iconColor: 'text-yellow-600',
    iconBg: 'bg-yellow-100',
    title: 'Soporte Dedicado',
    description:
      'Equipo de soporte en español listo para ayudarte. Desde configuración hasta estrategias de venta.',
  },
  {
    icon: Palette,
    iconColor: 'text-pink-600',
    iconBg: 'bg-pink-100',
    title: 'Libertad Creativa',
    description:
      'Tú decides qué crear y cómo contarlo. Sin restricciones en tu expresión artística ni en tu narrativa cultural.',
  },
  {
    icon: Clock,
    iconColor: 'text-indigo-600',
    iconBg: 'bg-indigo-100',
    title: 'Horario Flexible',
    description:
      'Trabaja cuando quieras, desde donde quieras. Sin presión de horarios ni entregas imposibles. Tú controlas tu tiempo.',
  },
];

const STEPS = [
  {
    title: 'Regístrate Gratis',
    description: 'Crea tu cuenta en menos de 2 minutos. Solo necesitas un correo electrónico.',
  },
  {
    title: 'Configura Tu Tienda',
    description: 'Personaliza tu perfil, comparte tu historia y sube tus primeros productos.',
  },
  {
    title: 'Recibe Pedidos',
    description:
      'Los clientes encuentran tus productos, hacen pedidos y tú recibes notificaciones.',
  },
  {
    title: 'Cobra y Crece',
    description:
      'Recibe pagos semanalmente y usa nuestras herramientas para hacer crecer tu negocio.',
  },
];

const FEATURES = [
  {
    icon: Sparkles,
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    title: 'Historia Artesanal',
    description:
      'Comparte tu herencia familiar, proceso creativo y el significado cultural de tu trabajo para conectar emocionalmente con clientes.',
  },
  {
    icon: Calculator,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    title: 'Calculadora de Precios',
    description:
      'Calcula precios justos que incluyan materiales, tiempo de trabajo y un salario digno para ti y tu equipo.',
  },
  {
    icon: BarChart3,
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    title: 'Analytics Avanzados',
    description:
      'Analiza tus ventas, productos más populares, comportamiento de clientes y más para tomar mejores decisiones.',
  },
  {
    icon: Package,
    iconColor: 'text-orange-600',
    iconBg: 'bg-orange-100',
    title: 'Gestión de Inventario',
    description:
      'Controla tu stock, recibe alertas de productos bajos y gestiona múltiples variantes fácilmente.',
  },
  {
    icon: Award,
    iconColor: 'text-red-600',
    iconBg: 'bg-red-100',
    title: 'Insignias de Verificación',
    description:
      'Gana badges que aumentan la confianza: Verificado, Artesano Certificado, Top Seller y más.',
  },
  {
    icon: Globe,
    iconColor: 'text-yellow-600',
    iconBg: 'bg-yellow-100',
    title: 'Alcance Internacional',
    description:
      'Vende a clientes en todo México y el mundo. Configuración de envíos nacionales e internacionales.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Sofía Ramírez',
    shopName: 'Tejidos Sofía',
    location: 'CDMX',
    testimonial:
      'En 6 meses mis ventas aumentaron 300%. La calculadora de precios me ayudó a valorar mejor mi trabajo y la historia artesanal conectó con mis clientes.',
    monthlySales: '$18,500',
    initials: 'SR',
    gradientFrom: 'from-pink-400',
    gradientTo: 'to-red-400',
  },
  {
    name: 'Pedro Martínez',
    shopName: 'Alebrijes Don Pedro',
    location: 'Oaxaca',
    testimonial:
      'Ahora vendo a clientes en Estados Unidos y Europa. El alcance internacional cambió mi vida y la de mi familia. ¡Gracias!',
    monthlySales: '$45,000',
    initials: 'PM',
    gradientFrom: 'from-purple-400',
    gradientTo: 'to-indigo-400',
  },
  {
    name: 'Laura Castro',
    shopName: 'Cerámica Luna',
    location: 'Puebla',
    testimonial:
      'El soporte fue increíble. Me ayudaron con todo, desde fotos hasta estrategia de precios. Ahora tengo un negocio real y sostenible.',
    monthlySales: '$22,800',
    initials: 'LC',
    gradientFrom: 'from-blue-400',
    gradientTo: 'to-cyan-400',
  },
];

export default function VenderPage() {
  const { user, isAuthenticated } = useAuth();
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const hasMakerProfile = user?.makerProfile !== undefined;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-xs rounded-full mb-6">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Únete a nuestra comunidad de artesanos</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Vende tus artesanías a
              <span className="block text-primary-200">toda México y el mundo</span>
            </h1>

            <p className="text-xl sm:text-2xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Comparte tu arte, preserva tradiciones y genera ingresos dignos desde tu taller. Sin
              costos iniciales, sin complicaciones.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {!isAuthenticated ? (
                <>
                  <Link
                    href={ROUTES.REGISTER}
                    className="w-full sm:w-auto px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition font-bold text-lg shadow-lg"
                  >
                    Comenzar Gratis
                  </Link>
                  <Link
                    href="#como-funciona"
                    className="w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-xs text-white rounded-lg hover:bg-white/20 transition font-bold text-lg border-2 border-white"
                  >
                    Ver Cómo Funciona
                  </Link>
                </>
              ) : hasMakerProfile ? (
                <Link
                  href={ROUTES.DASHBOARD}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition font-bold text-lg shadow-lg"
                >
                  Ir a Mi Dashboard
                </Link>
              ) : (
                <Link
                  href={ROUTES.PROFILE}
                  className="w-full sm:w-auto px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition font-bold text-lg shadow-lg"
                >
                  Activar Mi Tienda
                </Link>
              )}
            </div>

            {/* Trust Indicators - USES Store, TrendingUp, Package, Star */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <TrustIndicator icon={Store} value="1,000+" label="Artesanos" />
              <TrustIndicator icon={Package} value="50,000+" label="Productos" />
              <TrustIndicator icon={TrendingUp} value="$2M+" label="En Ventas" />
              <TrustIndicator icon={Star} value="4.8★" label="Calificación" />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              ¿Por qué vender con nosotros?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Herramientas diseñadas para artesanos que quieren crecer
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Comienza a vender en 4 pasos sencillos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {STEPS.map((step, index) => (
              <StepCard
                key={index}
                step={index + 1}
                title={step.title}
                description={step.description}
                showArrow={index < STEPS.length - 1}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={
                isAuthenticated
                  ? hasMakerProfile
                    ? ROUTES.DASHBOARD
                    : ROUTES.PROFILE
                  : ROUTES.REGISTER
              }
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-bold text-lg shadow-lg"
            >
              {isAuthenticated
                ? hasMakerProfile
                  ? 'Ir a Dashboard'
                  : 'Activar Mi Tienda'
                : 'Empezar Ahora'}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16 sm:py-24 bg-linear-to-br from-pink-50 to-red-50 dark:from-pink-900/20 dark:to-red-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
              <TrendingUp className="w-5 h-5 text-red-600 dark:text-red-400" />
              <span className="font-semibold text-red-900 dark:text-red-100">
                Historias de Éxito
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Artesanos que han transformado su negocio
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Lee cómo otros artesanos están creciendo con nosotros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Herramientas que impulsan tu éxito
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Todo lo que necesitas para vender profesionalmente
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURES.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 sm:py-24 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Precios transparentes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Sin sorpresas, sin costos ocultos
            </p>
          </div>

          <div className="bg-linear-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30 rounded-2xl p-8 sm:p-12 border-2 border-primary-200 dark:border-primary-700">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-full mb-4">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-semibold">Plan Único</span>
              </div>
              <h3 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                10% de comisión
              </h3>
              <p className="text-gray-600 dark:text-gray-400">Solo pagas cuando vendes</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {[
                'Tienda gratis para siempre',
                'Productos ilimitados',
                'Todas las herramientas incluidas',
                'Soporte por chat y email',
                'Pagos semanales',
                'Sin contratos ni compromisos',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <Link
                href={
                  isAuthenticated
                    ? hasMakerProfile
                      ? ROUTES.DASHBOARD
                      : ROUTES.PROFILE
                    : ROUTES.REGISTER
                }
                className="inline-block px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-bold text-lg shadow-lg"
              >
                {isAuthenticated
                  ? hasMakerProfile
                    ? 'Ver Dashboard'
                    : 'Activar Tienda'
                  : 'Comenzar Gratis'}
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                No se requiere tarjeta de crédito
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Preguntas Frecuentes
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Todo lo que necesitas saber</p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                >
                  <span className="font-bold text-gray-900 dark:text-gray-100 pr-4">
                    {faq.question}
                  </span>
                  {openFAQ === index ? (
                    <ChevronUp className="w-5 h-5 text-primary-600 dark:text-primary-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>
                {openFAQ === index && (
                  <div className="px-6 pb-6">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 mb-4">¿Tienes más preguntas?</p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
            >
              Contáctanos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24 bg-linear-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Comienza tu viaje hoy</h2>
          <p className="text-xl text-primary-100 mb-8">
            Únete a cientos de artesanos que ya están compartiendo su arte con el mundo
          </p>
          <Link
            href={
              isAuthenticated
                ? hasMakerProfile
                  ? ROUTES.DASHBOARD
                  : ROUTES.PROFILE
                : ROUTES.REGISTER
            }
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-gray-100 transition font-bold text-lg shadow-lg"
          >
            {isAuthenticated
              ? hasMakerProfile
                ? 'Ir a Mi Dashboard'
                : 'Activar Mi Tienda'
              : 'Crear Cuenta Gratis'}
          </Link>
          <p className="text-sm text-primary-200 mt-4">
            Sin costos iniciales • Sin compromiso • Soporte en español
          </p>
        </div>
      </section>
    </div>
  );
}
