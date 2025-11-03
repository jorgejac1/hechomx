'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { SeasonalTheme, getCurrentSeasonalTheme, seasonalThemes } from '../../lib/season';

interface SeasonalSectionProps {
  products: Product[];
}

interface CategoryImage {
  url: string;
  price: number;
  name: string;
}

const categoryImages: Record<string, CategoryImage[]> = {
  halloween: [
    {
      url: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400',
      price: 450,
      name: 'Decoración Halloween',
    },
    {
      url: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400',
      price: 280,
      name: 'Máscaras artesanales',
    },
    {
      url: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400',
      price: 350,
      name: 'Velas decorativas',
    },
  ],
  'dia-muertos': [
    {
      url: 'https://images.unsplash.com/photo-1601739183878-4bb5d967f874?w=400',
      price: 890,
      name: 'Calaveras pintadas',
    },
    {
      url: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400',
      price: 650,
      name: 'Flores de cempasúchil',
    },
    {
      url: 'https://images.unsplash.com/photo-1604095872530-d6d44271c133?w=400',
      price: 1200,
      name: 'Altar tradicional',
    },
    {
      url: 'https://images.unsplash.com/photo-1509715513011-e394f0cb20c4?w=400',
      price: 450,
      name: 'Papel picado',
    },
  ],
  navidad: [
    {
      url: 'https://images.unsplash.com/photo-1512389098783-66b81f86e199?w=400',
      price: 580,
      name: 'Gorros personalizados',
    },
    {
      url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400',
      price: 350,
      name: 'Calcetines navideños',
    },
    {
      url: 'https://images.unsplash.com/photo-1576319155264-99536e0be1ee?w=400',
      price: 890,
      name: 'Tarjetas artesanales',
    },
    {
      url: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=400',
      price: 1250,
      name: 'Adornos de cerámica',
    },
    {
      url: 'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?w=400',
      price: 420,
      name: 'Velas aromáticas',
    },
  ],
};

// Helper functions outside component to avoid useEffect dependencies
const addDays = (dateStr: string, days: number): string => {
  const [month, day] = dateStr.split('-').map(Number);
  const date = new Date(2024, month - 1, day + days);
  const newMonth = String(date.getMonth() + 1).padStart(2, '0');
  const newDay = String(date.getDate()).padStart(2, '0');
  return `${newMonth}-${newDay}`;
};

const isUpcoming = (theme: SeasonalTheme): boolean => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const currentDate = `${month}-${day}`;

  const themeStart = theme.startDate;
  return themeStart >= currentDate && themeStart <= addDays(currentDate, 30);
};

export default function SeasonalSection({ products: _products }: SeasonalSectionProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [activeThemes, setActiveThemes] = useState<SeasonalTheme[]>([]);
  const [displayImages, setDisplayImages] = useState<CategoryImage[]>([]);

  useEffect(() => {
    const active = seasonalThemes.filter((theme) => {
      const current = getCurrentSeasonalTheme();
      return current?.id === theme.id || isUpcoming(theme);
    });

    setActiveThemes(active);

    if (active.length > 0) {
      setSelectedTheme(active[0].id);
      updateDisplayImages(active[0].id);
    }
  }, []);

  const updateDisplayImages = (themeId: string) => {
    const images = categoryImages[themeId] || [];
    setDisplayImages(images);
  };

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    updateDisplayImages(themeId);
  };

  if (activeThemes.length === 0) {
    return null;
  }

  const currentTheme = activeThemes.find((t) => t.id === selectedTheme) || activeThemes[0];

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seasonal Filters - Mobile Optimized */}
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Compra por temporada:</h2>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {activeThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeChange(theme.id)}
                className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-sm sm:text-base font-semibold transition-all ${
                  selectedTheme === theme.id
                    ? `${theme.bgColor} ${theme.color} shadow-md`
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {theme.icon} {theme.name}
              </button>
            ))}
          </div>
        </div>

        {/* Collage Grid - Mobile: Vertical, Desktop: Horizontal */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-3 md:h-[400px]">
          {/* Left Panel - Info Card */}
          <div
            className={`md:col-span-4 ${currentTheme.bgColor} rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col justify-between shadow-md`}
          >
            <div>
              <span className="inline-block bg-white px-2 sm:px-3 py-1 rounded-full text-xs font-bold uppercase text-gray-900 mb-2 sm:mb-3">
                {currentTheme.categories[0]}
              </span>
              <h3 className={`text-xl sm:text-2xl font-bold mb-2 sm:mb-3 ${currentTheme.color}`}>
                Regalos especiales para {currentTheme.name}
              </h3>
              <p className="text-gray-700 text-sm mb-3 sm:mb-4">{currentTheme.description}</p>
            </div>
            <Link
              href={`/productos?temporada=${currentTheme.id}`}
              className="block bg-white text-center text-gray-900 px-4 sm:px-5 py-2 rounded-full font-bold hover:bg-gray-100 transition text-sm shadow-sm"
            >
              Inspírate
            </Link>
          </div>

          {/* Image Grid - Mobile: 2 columns, Desktop: Complex grid */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
            {displayImages.map((item, index) => {
              // Mobile: Simple 2-column grid
              // Desktop: Complex collage sizes
              const sizes = [
                'md:col-span-4 md:row-span-2', // Large
                'md:col-span-2 md:row-span-1', // Small
                'md:col-span-2 md:row-span-2', // Tall
                'md:col-span-2 md:row-span-1', // Small
                'md:col-span-2 md:row-span-1', // Small
                'md:col-span-2 md:row-span-1', // Small
              ];

              const sizeClass = sizes[index % sizes.length];

              return (
                <Link
                  key={index}
                  href={`/produtos?temporada=${currentTheme.id}`}
                  className={`${sizeClass} col-span-1 group relative rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-32 sm:h-40 md:h-auto`}
                >
                  {/* Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={item.url}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 bg-white text-gray-900 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                    ${item.price}
                  </div>

                  {/* Product Name on Hover - Hidden on mobile */}
                  <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 text-white sm:transform sm:translate-y-full sm:group-hover:translate-y-0 sm:transition-transform sm:duration-300 bg-gradient-to-t from-black/60 to-transparent sm:bg-transparent">
                    <p className="font-semibold text-xs sm:text-sm line-clamp-1">{item.name}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* View All Link - Mobile Optimized */}
        <div className="mt-4 sm:mt-6 text-center">
          <Link
            href={`/productos?temporada=${currentTheme.id}`}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm sm:text-base"
          >
            Ver toda la colección
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
