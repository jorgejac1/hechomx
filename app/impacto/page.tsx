'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/lib';
import {
  Heart,
  Users,
  TreePine,
  TrendingUp,
  Globe2,
  Award,
  HandHeart,
  Sparkles,
  MapPin,
  DollarSign,
  ShoppingBag,
  Home,
} from 'lucide-react';

export default function ImpactPage() {
  const impactStats = [
    {
      icon: Users,
      value: '2,500+',
      label: 'Artesanos Apoyados',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      icon: MapPin,
      value: '32',
      label: 'Estados de México',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: ShoppingBag,
      value: '50,000+',
      label: 'Productos Vendidos',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: DollarSign,
      value: '$15M+',
      label: 'Generados para Artesanos',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
  ];

  const socialImpact = [
    {
      icon: HandHeart,
      title: 'Comercio Justo',
      description:
        'Garantizamos precios justos que valoran el trabajo artesanal y aseguran un ingreso digno para las familias.',
      stats: 'Precio promedio 40% superior al mercado tradicional',
    },
    {
      icon: Home,
      title: 'Desarrollo Comunitario',
      description:
        'Apoyamos talleres familiares y cooperativas, fortaleciendo las economías locales y preservando tradiciones.',
      stats: '1,200 familias beneficiadas directamente',
    },
    {
      icon: Award,
      title: 'Preservación Cultural',
      description:
        'Promovemos técnicas ancestrales y conocimientos tradicionales transmitidos por generaciones.',
      stats: '87 técnicas artesanales preservadas',
    },
    {
      icon: Users,
      title: 'Empoderamiento',
      description:
        'Capacitamos en habilidades digitales, gestión empresarial y marketing para fortalecer negocios artesanales.',
      stats: '500+ artesanos capacitados en 2024',
    },
  ];

  const environmentalImpact = [
    {
      icon: TreePine,
      title: 'Producción Sostenible',
      description:
        'Priorizamos materiales naturales, reciclados y de origen local para reducir la huella ambiental.',
    },
    {
      icon: Globe2,
      title: 'Emisiones Reducidas',
      description:
        'La producción local y artesanal genera 70% menos emisiones que la producción industrial masiva.',
    },
    {
      icon: Sparkles,
      title: 'Cero Desperdicio',
      description:
        'Los artesanos aprovechan materiales al máximo y reutilizan excedentes en nuevas creaciones.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-linear-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6 backdrop-blur-xs">
              <Heart className="w-4 h-4" />
              Nuestro Impacto Social y Ambiental
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Transformando Vidas,
              <br />
              <span className="text-yellow-300">Preservando Tradiciones</span>
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Cada compra en Papalote Market apoya directamente a artesanos mexicanos, preserva
              técnicas ancestrales y contribuye a un futuro más sostenible.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-xs rounded-xl p-6 border border-white/20 hover:bg-white/20 transition"
              >
                <div
                  className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center mb-4`}
                >
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <p className="text-3xl font-bold mb-2">{stat.value}</p>
                <p className="text-primary-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Impact Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Impacto Social</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Construyendo comunidades más fuertes y equitativas a través del comercio justo
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {socialImpact.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center shrink-0">
                  <item.icon className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-800 rounded-full text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    {item.stats}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Environmental Impact Section */}
      <div className="bg-green-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Impacto Ambiental</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Promoviendo prácticas sostenibles que cuidan nuestro planeta
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {environmentalImpact.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stories Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Historias de Impacto
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conoce cómo estamos transformando vidas reales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Story 1 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="relative h-64">
              <Image
                src="https://images.unsplash.com/photo-1582053433009-c6a36688d1f3?w=800"
                alt="Artesana trabajando"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">María - Oaxaca</h3>
              <p className="text-gray-600 mb-4">
                "Gracias a la plataforma, pude expandir mi taller de alebrijes y ahora empleo a 5
                artesanas de mi comunidad. Mis hijas están estudiando la universidad."
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                <TrendingUp className="w-4 h-4" />
                Ingresos aumentados 300%
              </div>
            </div>
          </div>

          {/* Story 2 */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
            <div className="relative h-64">
              <Image
                src="https://images.unsplash.com/photo-1614935151651-0bea6508db6b?w=800"
                alt="Taller artesanal"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Carlos - Michoacán</h3>
              <p className="text-gray-600 mb-4">
                "Aprendí alfarería de mi abuelo. Ahora mis productos llegan a todo México y puedo
                enseñar el oficio a jóvenes de mi pueblo para que no se pierda."
              </p>
              <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                <Award className="w-4 h-4" />
                Técnica ancestral preservada
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-linear-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Sé Parte del Cambio</h2>
          <p className="text-xl text-primary-100 mb-8">
            Cada compra es una inversión en las comunidades artesanales de México
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ROUTES.PRODUCTS}
              className="px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition font-bold text-lg"
            >
              Explorar Productos
            </Link>
            <Link
              href={ROUTES.MY_IMPACT}
              className="px-8 py-4 bg-primary-700 text-white rounded-lg hover:bg-primary-600 transition font-bold text-lg border-2 border-white/20"
            >
              Ver Mi Impacto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
