'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/lib';
import {
  Heart,
  Target,
  Eye,
  Award,
  Users,
  Globe2,
  Sparkles,
  TrendingUp,
  Shield,
  Zap,
} from 'lucide-react';

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Pasión por lo Artesanal',
      description:
        'Creemos en el valor único de cada pieza hecha a mano y en las historias que cuentan.',
    },
    {
      icon: Shield,
      title: 'Autenticidad Garantizada',
      description:
        'Verificamos cada artesano y producto para asegurar la autenticidad de cada creación.',
    },
    {
      icon: Users,
      title: 'Comunidad Primero',
      description: 'Priorizamos el bienestar de los artesanos y el desarrollo de sus comunidades.',
    },
    {
      icon: Globe2,
      title: 'Sostenibilidad',
      description:
        'Promovemos prácticas responsables que cuidan el medio ambiente y las tradiciones.',
    },
  ];

  const differentiators = [
    {
      icon: Award,
      title: 'Calidad Certificada',
      description:
        'Cada artesano pasa por un riguroso proceso de verificación. Solo el 15% de aplicantes son aceptados.',
      stat: '100% Verificados',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      icon: Sparkles,
      title: 'Piezas Únicas',
      description:
        'No producción masiva. Cada pieza es hecha a mano con dedicación y cuidado individual.',
      stat: '0% Industrializado',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      icon: TrendingUp,
      title: 'Crecimiento Justo',
      description:
        'Los artesanos ganan 40% más que en mercados tradicionales. Su éxito es nuestro éxito.',
      stat: '+40% Ingresos',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      icon: Zap,
      title: 'Impacto Inmediato',
      description:
        'Los fondos llegan directamente a los artesanos en 48 horas. Sin intermediarios innecesarios.',
      stat: '48hrs Pago',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
  ];

  const team = [
    {
      name: 'Lorem Ipsum',
      role: 'Dolor Sit Amet',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      name: 'Consectetur Adipiscing',
      role: 'Elit Sed Eiusmod',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      description:
        'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    },
    {
      name: 'Tempor Incididunt',
      role: 'Ut Labore Dolore',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      description:
        'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
    },
    {
      name: 'Magna Aliqua',
      role: 'Quis Nostrud',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      description:
        'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Conectando el Arte
              <br />
              <span className="text-yellow-300">con el Corazón de México</span>
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Somos una plataforma que une a artesanos mexicanos con personas que valoran la
              autenticidad, la calidad y las historias detrás de cada creación.
            </p>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Misión</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Empoderar a los artesanos mexicanos proporcionándoles una plataforma digital que les
              permita llegar a más clientes, obtener precios justos y preservar sus tradiciones
              ancestrales para las futuras generaciones.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nuestra Visión</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Ser la plataforma líder en México para la comercialización de productos artesanales,
              donde cada compra preserve tradiciones, apoye comunidades y celebre la riqueza
              cultural de nuestros pueblos.
            </p>
          </div>
        </div>
      </div>

      {/* Why We're Different - NEW SECTION */}
      <div className="bg-gradient-to-br from-primary-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Por Qué Somos Diferentes
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No somos un marketplace común. Somos una comunidad comprometida con la excelencia y el
              comercio justo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {differentiators.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div
                  className={`w-14 h-14 ${item.bgColor} rounded-xl flex items-center justify-center mb-4`}
                >
                  <item.icon className={`w-7 h-7 ${item.color}`} />
                </div>
                <div
                  className={`inline-flex items-center gap-1 px-3 py-1 ${item.bgColor} ${item.color} rounded-full text-xs font-bold mb-3`}
                >
                  {item.stat}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Nuestra Historia
              </h2>
              <div className="space-y-4 text-gray-600 text-lg">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                  fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde
                  omnis iste natus error sit voluptatem.
                </p>
                <p>
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed
                  quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque
                  porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur adipisci
                  velit.
                </p>
              </div>
            </div>
            <div className="relative h-96 lg:h-full rounded-xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1609137144813-7d9921338f24?w=800"
                alt="Artesanos trabajando"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Nuestros Valores</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Los principios que guían cada decisión que tomamos
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition text-center"
            >
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Nuestro Equipo</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Personas apasionadas trabajando para preservar el arte mexicano
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
            >
              <div className="relative h-64">
                <Image src={member.image} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-semibold text-sm mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Únete a Nuestra Misión</h2>
          <p className="text-xl text-primary-100 mb-8">
            Ya sea comprando, vendiendo o simplemente compartiendo, tú también puedes ser parte del
            cambio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={ROUTES.PRODUCTS}
              className="px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition font-bold text-lg"
            >
              Comprar Artesanías
            </Link>
            <Link
              href={ROUTES.SELL}
              className="px-8 py-4 bg-primary-700 text-white rounded-lg hover:bg-primary-600 transition font-bold text-lg border-2 border-white/20"
            >
              Vender en la Plataforma
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
