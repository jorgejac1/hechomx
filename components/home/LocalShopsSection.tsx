'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface LocalShop {
  id: string;
  name: string;
  username: string;
  logo: string;
  coverImage: string;
  state: string;
  city: string;
  specialty: string;
  verified: boolean;
}

const shopsByState: Record<string, LocalShop[]> = {
  'Ciudad de México': [
    {
      id: '1',
      name: 'Textiles Artesanales CDMX',
      username: 'TextilesCDMX',
      logo: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?w=200',
      coverImage: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800',
      state: 'Ciudad de México',
      city: 'Coyoacán',
      specialty: 'Textiles personalizados',
      verified: true
    },
    {
      id: '2',
      name: 'Carpintería Moderna',
      username: 'RefineKitchenware',
      logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
      coverImage: 'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800',
      state: 'Ciudad de México',
      city: 'Roma Norte',
      specialty: 'Muebles artesanales',
      verified: true
    },
    {
      id: '3',
      name: 'Velos Vintage',
      username: 'EvintageVeils',
      logo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      coverImage: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=800',
      state: 'Ciudad de México',
      city: 'Polanco',
      specialty: 'Accesorios de moda',
      verified: true
    }
  ],
  'Jalisco': [
    {
      id: '4',
      name: 'Cerámica Talavera GDL',
      username: 'TalaveraGDL',
      logo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
      coverImage: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800',
      state: 'Jalisco',
      city: 'Guadalajara',
      specialty: 'Cerámica artesanal',
      verified: true
    },
    {
      id: '5',
      name: 'Textiles de Tonalá',
      username: 'TextilesTonala',
      logo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
      coverImage: 'https://images.unsplash.com/photo-1584184924103-e310e9892b13?w=800',
      state: 'Jalisco',
      city: 'Tonalá',
      specialty: 'Textiles tradicionales',
      verified: true
    }
  ],
  'Oaxaca': [
    {
      id: '6',
      name: 'Alebrijes de Oaxaca',
      username: 'AlebrijesOax',
      logo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
      coverImage: 'https://images.unsplash.com/photo-1582845512747-e42001c95638?w=800',
      state: 'Oaxaca',
      city: 'Oaxaca de Juárez',
      specialty: 'Alebrijes tallados',
      verified: true
    },
    {
      id: '7',
      name: 'Barro Negro Artesanal',
      username: 'BarroNegro',
      logo: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200',
      coverImage: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800',
      state: 'Oaxaca',
      city: 'San Bartolo Coyotepec',
      specialty: 'Cerámica de barro negro',
      verified: true
    }
  ]
};

const getUserState = (): string => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('userState');
    return saved || 'Ciudad de México';
  }
  return 'Ciudad de México';
};

export default function LocalShopsSection() {
  const [userState, setUserState] = useState<string>('Ciudad de México');
  const [localShops, setLocalShops] = useState<LocalShop[]>([]);

  useEffect(() => {
    const state = getUserState();
    setUserState(state);
    setLocalShops(shopsByState[state] || shopsByState['Ciudad de México']);
  }, []);

  const handleChangeLocation = () => {
    const states = Object.keys(shopsByState);
    const currentIndex = states.indexOf(userState);
    const nextState = states[(currentIndex + 1) % states.length];
    
    setUserState(nextState);
    setLocalShops(shopsByState[nextState]);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('userState', nextState);
    }
  };

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header - POLISHED: Better mobile button sizing */}
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Descubre artesanos locales de {userState}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600 mb-3">
            Productos únicos de talleres cercanos a ti
          </p>
          {/* POLISHED: Smaller padding on mobile, tighter gap, max-width */}
          <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 max-w-md sm:max-w-none">
            <Link
              href={`/tiendas?estado=${encodeURIComponent(userState)}`}
              className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-200 text-gray-900 rounded-full text-sm font-semibold hover:bg-gray-300 transition text-center sm:text-left"
            >
              Inspírate
            </Link>
            <button
              onClick={handleChangeLocation}
              className="px-3 sm:px-4 py-1.5 sm:py-2 border-2 border-gray-300 text-gray-700 rounded-full text-sm font-semibold hover:border-gray-400 transition flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Cambiar ubicación
            </button>
          </div>
        </div>

        {/* Shops Grid - Mobile: Simple stack, Desktop: Masonry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {localShops.map((shop, index) => {
            const isLarge = index === 0;
            
            return (
              <Link
                key={shop.id}
                href={`/tienda/${shop.username}`}
                className={`group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
                  isLarge ? 'md:row-span-2' : ''
                }`}
                style={{ minHeight: isLarge ? '320px' : '155px' }}
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <Image
                    src={shop.coverImage}
                    alt={shop.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative h-full flex flex-col justify-between p-3 sm:p-4">
                  {/* Top - Badges */}
                  <div className="flex items-start justify-between">
                    {isLarge && (
                      <div className="bg-white px-2 py-1 rounded-full text-xs font-bold uppercase text-gray-900 shadow-md">
                        DESTACADO
                      </div>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      className="ml-auto w-8 h-8 sm:w-9 sm:h-9 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                      aria-label="Favorito"
                    >
                      <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Bottom - Shop Info */}
                  <div className="text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 sm:border-3 border-white shadow-md shrink-0">
                        <Image
                          src={shop.logo}
                          alt={`${shop.name} logo`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm sm:text-base font-bold mb-0.5 flex items-center gap-1.5">
                          <span className="truncate">{shop.name}</span>
                          {shop.verified && (
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          )}
                        </h3>
                        <p className="text-xs text-white/90 truncate">{shop.specialty}</p>
                      </div>
                    </div>
                    <p className="text-xs text-white/80 flex items-center gap-1">
                      <svg className="w-3 h-3 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {shop.city}, {shop.state}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Link */}
        <div className="mt-4 sm:mt-6 text-center">
          <Link
            href={`/tiendas?estado=${encodeURIComponent(userState)}`}
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm sm:text-base"
          >
            Ver todos los artesanos de {userState}
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}