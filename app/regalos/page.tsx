'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '@/lib';
import {
  Gift,
  Heart,
  Calendar,
  Sparkles,
  Home,
  Baby,
  Cake,
  GraduationCap,
  Users,
  ChevronRight,
  Filter,
  DollarSign,
  Star,
  Package,
} from 'lucide-react';

export default function GiftsPage() {
  const [priceFilter, setPriceFilter] = useState<string>('all');
  const [occasionFilter, setOccasionFilter] = useState<string>('all');

  const occasions = [
    {
      id: 'cumpleanos',
      name: 'Cumpleaños',
      icon: Cake,
      description: 'Regalos únicos para celebrar',
      image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800',
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 'boda',
      name: 'Bodas',
      icon: Heart, // Changed from Rings
      description: 'Detalles memorables para el día especial',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800',
      color: 'from-purple-500 to-indigo-500',
    },
    {
      id: 'hogar',
      name: 'Hogar Nuevo',
      icon: Home,
      description: 'Decoración artesanal para el hogar',
      image: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'bebe',
      name: 'Baby Shower',
      icon: Baby,
      description: 'Regalos tiernos hechos a mano',
      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=800',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      id: 'graduacion',
      name: 'Graduación',
      icon: GraduationCap,
      description: 'Celebra este logro importante',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 'aniversario',
      name: 'Aniversario',
      icon: Calendar, // Using Calendar icon
      description: 'Detalles románticos y especiales',
      image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800',
      color: 'from-red-500 to-pink-500',
    },
  ];

  const priceRanges = [
    { id: 'all', name: 'Todos los precios', min: 0, max: Infinity },
    { id: 'bajo', name: 'Menos de $500', min: 0, max: 500 },
    { id: 'medio', name: '$500 - $1,500', min: 500, max: 1500 },
    { id: 'alto', name: '$1,500 - $3,000', min: 1500, max: 3000 },
    { id: 'premium', name: 'Más de $3,000', min: 3000, max: Infinity },
  ];

  const curatedCollections = [
    {
      title: 'Regalos Sustentables',
      description: 'Productos eco-friendly hechos con materiales naturales',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
      icon: Sparkles,
      badge: 'Eco-Friendly',
      badgeColor: 'bg-green-100 text-green-800',
    },
    {
      title: 'Lo Mejor de Oaxaca',
      description: 'Alebrijes, textiles y barro negro de maestros artesanos',
      image: 'https://images.unsplash.com/photo-1582053433009-c6a36688d1f3?w=800',
      icon: Star,
      badge: 'Destacado',
      badgeColor: 'bg-yellow-100 text-yellow-800',
    },
    {
      title: 'Joyería Artesanal',
      description: 'Piezas únicas de plata y piedras naturales',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800',
      icon: Sparkles,
      badge: 'Lujo',
      badgeColor: 'bg-purple-100 text-purple-800',
    },
    {
      title: 'Set de Regalo',
      description: 'Cajas curadas listas para regalar',
      image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800',
      icon: Package,
      badge: 'Listo para Regalo',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
  ];

  const giftGuides = [
    {
      title: 'Para Ella',
      items: ['Joyería', 'Textiles', 'Decoración', 'Arte'],
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600',
    },
    {
      title: 'Para Él',
      items: ['Accesorios', 'Arte', 'Artículos de cuero', 'Cerámica'],
      image: 'https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=600',
    },
    {
      title: 'Para el Hogar',
      items: ['Decoración', 'Vajilla', 'Textiles', 'Iluminación'],
      image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600',
    },
    {
      title: 'Para Niños',
      items: ['Juguetes', 'Ropa', 'Decoración', 'Libros'],
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600',
    },
  ];

  const whyGiftArtisan = [
    {
      icon: Heart,
      title: 'Único y Especial',
      description: 'Cada pieza es única, hecha a mano con dedicación',
    },
    {
      icon: Users,
      title: 'Apoya Comunidades',
      description: 'Tu regalo genera ingresos directos para familias artesanas',
    },
    {
      icon: Sparkles,
      title: 'Calidad Superior',
      description: 'Materiales nobles y técnicas tradicionales',
    },
    {
      icon: Package,
      title: 'Empaque Especial',
      description: 'Presentación hermosa lista para regalar',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-linear-to-br from-primary-600 via-primary-700 to-primary-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-4 py-16 sm:py-24 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-sm font-semibold mb-6 backdrop-blur-xs">
              <Gift className="w-4 h-4" />
              Regalos Artesanales Mexicanos
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              El Regalo Perfecto
              <br />
              <span className="text-yellow-300">Hecho a Mano con Amor</span>
            </h1>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto mb-8">
              Encuentra regalos únicos y significativos que apoyan a artesanos mexicanos y celebran
              tradiciones milenarias
            </p>
            <Link
              href={ROUTES.PRODUCTS}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-600 rounded-lg hover:bg-primary-50 transition font-bold text-lg"
            >
              Explorar Regalos
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Filters Section - NEW */}
      <div className="bg-white shadow-md sticky top-0 z-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 overflow-x-auto">
            <div className="flex items-center gap-2 text-gray-700 font-semibold whitespace-nowrap">
              <Filter className="w-5 h-5" />
              Filtrar por:
            </div>

            {/* Occasion Filter */}
            <select
              value={occasionFilter}
              onChange={(e) => setOccasionFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-medium"
            >
              <option value="all">Todas las Ocasiones</option>
              {occasions.map((occasion) => (
                <option key={occasion.id} value={occasion.id}>
                  {occasion.name}
                </option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-medium"
            >
              {priceRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.name}
                </option>
              ))}
            </select>

            {/* Active Filters Count */}
            {(occasionFilter !== 'all' || priceFilter !== 'all') && (
              <button
                onClick={() => {
                  setOccasionFilter('all');
                  setPriceFilter('all');
                }}
                className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-semibold hover:bg-primary-200 transition whitespace-nowrap"
              >
                Limpiar Filtros
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Occasions Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Regalos por Ocasión</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Encuentra el regalo perfecto para cada momento especial
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {occasions.map((occasion) => {
            const Icon = occasion.icon;
            return (
              <button
                key={occasion.id}
                onClick={() => setOccasionFilter(occasion.id)}
                className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 ${
                  occasionFilter === occasion.id ? 'ring-4 ring-primary-600' : ''
                }`}
              >
                <div className="relative h-64">
                  <Image
                    src={occasion.image}
                    alt={occasion.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div
                    className={`absolute inset-0 bg-linear-to-t ${occasion.color} opacity-60 group-hover:opacity-70 transition-opacity`}
                  />
                </div>
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="p-3 bg-white/20 backdrop-blur-xs rounded-lg w-fit mb-3">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{occasion.name}</h3>
                  <p className="text-white/90">{occasion.description}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Curated Collections */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Colecciones Curadas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Selecciones especiales de nuestros mejores productos artesanales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {curatedCollections.map((collection, index) => {
              const Icon = collection.icon;
              return (
                <Link
                  key={index}
                  href={ROUTES.PRODUCTS}
                  className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
                >
                  <div className="relative h-64">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 ${collection.badgeColor} rounded-full text-xs font-bold`}
                      >
                        <Icon className="w-3 h-3" />
                        {collection.badge}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition">
                      {collection.title}
                    </h3>
                    <p className="text-gray-600">{collection.description}</p>
                    <div className="mt-4 flex items-center gap-2 text-primary-600 font-semibold text-sm">
                      Ver Colección
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Compra por Presupuesto</h2>
            <p className="text-gray-600">Encuentra el regalo perfecto dentro de tu presupuesto</p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {priceRanges.map((range) => (
              <button
                key={range.id}
                onClick={() => setPriceFilter(range.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition ${
                  priceFilter === range.id
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  {range.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gift Guides */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Guías de Regalo</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ideas organizadas para ayudarte a encontrar el regalo ideal
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {giftGuides.map((guide, index) => (
            <Link
              key={index}
              href={ROUTES.PRODUCTS}
              className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="relative h-48">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {guide.title}
                </h3>
              </div>
              <div className="p-4">
                <ul className="space-y-2">
                  {guide.items.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <ChevronRight className="w-4 h-4 text-primary-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Why Gift Artisan */}
      <div className="bg-linear-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Por Qué Regalar Artesanía Mexicana
            </h2>
            <p className="text-xl text-primary-100 max-w-3xl mx-auto">
              Cada regalo artesanal cuenta una historia y genera impacto positivo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyGiftArtisan.map((reason, index) => {
              const Icon = reason.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-xs">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                  <p className="text-primary-100">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          ¿Necesitas Ayuda para Elegir?
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Nuestro equipo puede ayudarte a encontrar el regalo perfecto
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={ROUTES.HELP}
            className="px-8 py-4 bg-gray-100 text-gray-900 rounded-lg hover:bg-gray-200 transition font-bold text-lg"
          >
            Contactar Soporte
          </Link>
          <Link
            href={ROUTES.PRODUCTS}
            className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-bold text-lg"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </div>
    </div>
  );
}
