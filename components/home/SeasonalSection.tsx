'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/types';
import { SeasonalTheme, getCurrentSeasonalTheme, seasonalThemes } from '../../lib/season';

interface SeasonalSectionProps {
  products: Product[];
}

// Imágenes de ejemplo por categoría
const categoryImages = {
  'halloween': [
    { url: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400', price: 450, name: 'Decoración Halloween' },
    { url: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400', price: 280, name: 'Máscaras artesanales' },
    { url: 'https://images.unsplash.com/photo-1509557965875-b88c97052f0e?w=400', price: 350, name: 'Velas decorativas' }
  ],
  'dia-muertos': [
    { url: 'https://images.unsplash.com/photo-1601739183878-4bb5d967f874?w=400', price: 890, name: 'Calaveras pintadas' },
    { url: 'https://images.unsplash.com/photo-1635322966219-b75ed372eb01?w=400', price: 650, name: 'Flores de cempasúchil' },
    { url: 'https://images.unsplash.com/photo-1604095872530-d6d44271c133?w=400', price: 1200, name: 'Altar tradicional' },
    { url: 'https://images.unsplash.com/photo-1509715513011-e394f0cb20c4?w=400', price: 450, name: 'Papel picado' }
  ],
  'navidad': [
    { url: 'https://images.unsplash.com/photo-1512389098783-66b81f86e199?w=400', price: 580, name: 'Gorros personalizados' },
    { url: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400', price: 350, name: 'Calcetines navideños' },
    { url: 'https://images.unsplash.com/photo-1576319155264-99536e0be1ee?w=400', price: 890, name: 'Tarjetas artesanales' },
    { url: 'https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=400', price: 1250, name: 'Adornos de cerámica' },
    { url: 'https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?w=400', price: 420, name: 'Velas aromáticas' }
  ]
};

export default function SeasonalSection({ products }: SeasonalSectionProps) {
  const [selectedTheme, setSelectedTheme] = useState<string>('');
  const [activeThemes, setActiveThemes] = useState<SeasonalTheme[]>([]);
  const [displayImages, setDisplayImages] = useState<any[]>([]);

  useEffect(() => {
    // Get all active themes for current time
    const active = seasonalThemes.filter(theme => {
      const current = getCurrentSeasonalTheme();
      return current?.id === theme.id || isUpcoming(theme);
    });
    
    setActiveThemes(active);
    
    if (active.length > 0) {
      setSelectedTheme(active[0].id);
      updateDisplayImages(active[0].id);
    }
  }, []);

  const isUpcoming = (theme: SeasonalTheme): boolean => {
    const today = new Date();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const currentDate = `${month}-${day}`;
    
    // Show themes within 30 days
    const themeStart = theme.startDate;
    return themeStart >= currentDate && themeStart <= addDays(currentDate, 30);
  };

  const addDays = (dateStr: string, days: number): string => {
    const [month, day] = dateStr.split('-').map(Number);
    const date = new Date(2024, month - 1, day + days);
    const newMonth = String(date.getMonth() + 1).padStart(2, '0');
    const newDay = String(date.getDate()).padStart(2, '0');
    return `${newMonth}-${newDay}`;
  };

  const updateDisplayImages = (themeId: string) => {
    const images = categoryImages[themeId as keyof typeof categoryImages] || [];
    setDisplayImages(images);
  };

  const handleThemeChange = (themeId: string) => {
    setSelectedTheme(themeId);
    updateDisplayImages(themeId);
  };

  if (activeThemes.length === 0) {
    return null;
  }

  const currentTheme = activeThemes.find(t => t.id === selectedTheme) || activeThemes[0];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Seasonal Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Compra por temporada:</h2>
          {activeThemes.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeChange(theme.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedTheme === theme.id
                  ? `${theme.bgColor} ${theme.color} shadow-md`
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {theme.icon} {theme.name}
            </button>
          ))}
        </div>

        {/* Collage Grid */}
        <div className="grid grid-cols-12 gap-3 h-[400px]">
          {/* Left Panel */}
          <div className={`col-span-12 md:col-span-4 ${currentTheme.bgColor} rounded-2xl p-6 flex flex-col justify-between shadow-md`}>
            <div>
              <span className="inline-block bg-white px-3 py-1 rounded-full text-xs font-bold uppercase text-gray-900 mb-3">
                {currentTheme.categories[0]}
              </span>
              <h3 className={`text-2xl font-bold mb-3 ${currentTheme.color}`}>
                Regalos especiales para {currentTheme.name}
              </h3>
              <p className="text-gray-700 text-sm mb-4">
                {currentTheme.description}
              </p>
            </div>
            <Link
              href={`/productos?temporada=${currentTheme.id}`}
              className="block bg-white text-center text-gray-900 px-5 py-2 rounded-full font-bold hover:bg-gray-100 transition text-sm shadow-sm"
            >
              Inspírate
            </Link>
          </div>

          {/* Image Grid - Collage Style */}
          <div className="col-span-12 md:col-span-8 grid grid-cols-6 gap-3">
            {displayImages.map((item, index) => {
              // Different sizes for collage effect
              const sizes = [
                'col-span-4 row-span-2', // Large
                'col-span-2 row-span-1', // Small
                'col-span-2 row-span-2', // Tall
                'col-span-2 row-span-1', // Small
                'col-span-2 row-span-1', // Small
                'col-span-2 row-span-1', // Small
              ];
              
              const sizeClass = sizes[index % sizes.length];

              return (
                <Link
                  key={index}
                  href={`/productos?temporada=${currentTheme.id}`}
                  className={`${sizeClass} group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300`}
                >
                  {/* Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={item.url}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-2 left-2 bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    ${item.price}
                  </div>

                  {/* Product Name on Hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-semibold text-sm">{item.name}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* View All Link */}
        <div className="mt-6 text-center">
          <Link
            href={`/productos?temporada=${currentTheme.id}`}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold"
          >
            Ver toda la colección
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}