/**
 * @fileoverview Categories Section Component
 * Displays a responsive grid of product categories with images, names, and product counts.
 * Each category card links to filtered product listings.
 * @module components/home/CategoriesSection
 */

import Link from 'next/link';
import Image from 'next/image';

/**
 * @typedef {Object} Category
 * @property {string} name - The display name of the category
 * @property {string} image - URL of the category image
 * @property {string} count - Display string showing product count (e.g., "2,453 productos")
 * @property {string} href - Navigation URL for the category
 */

/** @type {Category[]} Static array of product categories */
const categories = [
  {
    name: 'Arte',
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600',
    count: '2,453 productos',
    href: '/productos?categoria=Arte',
  },
  {
    name: 'Joyería',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600',
    count: '1,892 productos',
    href: '/productos?categoria=Joyería',
  },
  {
    name: 'Decoración del Hogar',
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
    count: '3,124 productos',
    href: '/productos?categoria=Decoración del Hogar',
  },
  {
    name: 'Ropa',
    image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600',
    count: '1,567 productos',
    href: '/productos?categoria=Ropa',
  },
  {
    name: 'Cocina',
    image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=600',
    count: '987 productos',
    href: '/productos?categoria=Cocina',
  },
  {
    name: 'Textiles',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600',
    count: '756 productos',
    href: '/productos?categoria=Textiles',
  },
];

/**
 * Renders a grid of product category cards with images and navigation links.
 * @returns {JSX.Element} The CategoriesSection component
 */
export default function CategoriesSection() {
  return (
    <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - Mobile Optimized */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2 sm:mb-4">
            Explora por Categoría
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-400 px-4">
            Descubre productos únicos organizados por categoría
          </p>
        </div>

        {/* Categories Grid - Mobile: 2 columns, Tablet: 3, Desktop: 6 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative h-40 sm:h-44 md:h-48 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Background Image */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Consistent Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-3 sm:p-4">
                <h3 className="text-white font-bold text-base sm:text-lg mb-0.5 sm:mb-1">
                  {category.name}
                </h3>
                <p className="text-white/90 text-xs sm:text-sm">{category.count}</p>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 bg-primary-600/0 group-hover:bg-primary-600/20 transition-colors duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
