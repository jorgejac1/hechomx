/**
 * @fileoverview States Section Component
 * Showcases Mexican states and their traditional crafts. Features a grid of highlighted
 * states with craft specialties, images, and product counts. Also includes a comprehensive
 * list of crafts organized by state with navigation links.
 * @module components/home/StatesSection
 */

import Link from 'next/link';
import Image from 'next/image';
import { CRAFT_STATES, ROUTES } from '@/lib';

/**
 * @typedef {Object} FeaturedState
 * @property {string} name - State name
 * @property {string} craft - Primary craft specialty
 * @property {string} icon - Emoji icon representing the craft
 * @property {string} description - Brief description of the craft tradition
 * @property {string} image - URL of the state/craft image
 * @property {string} count - Number of artisans/products (e.g., "500+")
 */

const FEATURED_STATES = [
  {
    name: 'Oaxaca',
    craft: 'Cerámica',
    description: 'Barro negro y alebrijes únicos',
    image: 'https://images.unsplash.com/photo-1582845512747-e42001c95638?w=800',
    count: '500+',
  },
  {
    name: 'Chiapas',
    craft: 'Textiles',
    description: 'Bordados tradicionales mayas',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800',
    count: '350+',
  },
  {
    name: 'Michoacán',
    craft: 'Madera',
    description: 'Tallado en madera y muebles',
    image: 'https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?w=800',
    count: '420+',
  },
  {
    name: 'Puebla',
    craft: 'Cerámica',
    description: 'Talavera tradicional poblana',
    image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800',
    count: '380+',
  },
] as const;

/**
 * Renders the States exploration section with featured state cards and craft listings.
 * @returns {JSX.Element} The StatesSection component
 */
export default function StatesSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Explora por Estado
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-400">
              Descubre las artesanías tradicionales de cada región de México
            </p>
          </div>
          <Link
            href={ROUTES.PRODUCTS}
            className="hidden sm:flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition"
          >
            Ver todo
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Featured States Grid - Matching product cards style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {FEATURED_STATES.map((state) => (
            <Link
              key={state.name}
              href={`${ROUTES.PRODUCTS}?estado=${encodeURIComponent(state.name)}`}
              className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md dark:shadow-gray-900/50 hover:shadow-xl dark:hover:shadow-gray-900/70 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden bg-gray-100 dark:bg-gray-700">
                <Image
                  src={state.image}
                  alt={`Artesanías de ${state.name}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                {/* Count Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-full shadow-md">
                  <span className="text-xs font-bold text-gray-900">{state.count}</span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white mb-2">{state.name}</h3>
                  <p className="text-sm text-white/90 font-medium mb-1">{state.craft}</p>
                  <p className="text-xs text-white/80">{state.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Craft Specialties - Clean white cards */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
              Cubrimos todo México
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Object.entries(CRAFT_STATES).map(([craft, states]) => (
              <div
                key={craft}
                className="bg-white dark:bg-gray-700 rounded-xl p-4 sm:p-5 shadow-xs dark:shadow-gray-900/30 hover:shadow-md dark:hover:shadow-gray-900/50 transition-shadow"
              >
                <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <span className="text-primary-600 dark:text-primary-400">{craft}:</span>
                </h4>
                <div className="space-y-1.5">
                  {states.map((state) => (
                    <Link
                      key={state}
                      href={`${ROUTES.PRODUCTS}?estado=${encodeURIComponent(state.replace(' (Guerrero)', ''))}`}
                      className="block text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 hover:underline transition-colors"
                    >
                      {state}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Más de{' '}
              <span className="font-bold text-primary-600 dark:text-primary-400">
                1,500 artesanos
              </span>{' '}
              de los{' '}
              <span className="font-bold text-primary-600 dark:text-primary-400">32 estados</span>{' '}
              de México
            </p>
          </div>
        </div>

        {/* Mobile View All */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href={ROUTES.PRODUCTS}
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
          >
            Ver todos los estados
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
