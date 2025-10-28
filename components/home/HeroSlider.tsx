'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  theme: 'primary' | 'secondary' | 'tertiary';
}

const SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Descubre lo Auténtico de México',
    subtitle: 'Artesanías y productos únicos hechos a mano',
    description: 'Apoya a artesanos mexicanos y lleva a casa piezas únicas con historia',
    image: 'https://images.unsplash.com/photo-1582845512747-e42001c95638?w=1200',
    primaryCTA: {
      text: 'Explorar Productos',
      href: '/productos'
    },
    secondaryCTA: {
      text: 'Ver Artesanos',
      href: '/tiendas'
    },
    theme: 'primary'
  },
  {
    id: 2,
    title: 'Calidad Artesanal Garantizada',
    subtitle: 'Cada producto cuenta una historia',
    description: 'Todos nuestros artesanos están verificados y certificados. Calidad 100% mexicana.',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=1200',
    primaryCTA: {
      text: 'Ver Productos Verificados',
      href: '/productos'
    },
    secondaryCTA: {
      text: 'Conocer Más',
      href: '#about'
    },
    theme: 'secondary'
  },
  {
    id: 3,
    title: '¿Eres Artesano o Creador?',
    subtitle: 'Únete a nuestra plataforma',
    description: 'Lleva tus creaciones a miles de clientes. Sin comisiones los primeros 3 meses.',
    image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=1200',
    primaryCTA: {
      text: 'Vender en la Plataforma',
      href: '/vendedores'
    },
    secondaryCTA: {
      text: 'Ver Beneficios',
      href: '/vendedores#beneficios'
    },
    theme: 'tertiary'
  },
  {
    id: 4,
    title: 'De Tu Estado a Tu Puerta',
    subtitle: 'Envíos a toda la República',
    description: 'Conectamos artesanos locales contigo. Productos únicos de cada región de México.',
    image: 'https://images.unsplash.com/photo-1612892483236-52d32a0e0ac1?w=1200',
    primaryCTA: {
      text: 'Explorar por Estado',
      href: '/productos'
    },
    secondaryCTA: {
      text: 'Ver Ofertas',
      href: '#ofertas'
    },
    theme: 'primary'
  }
];

const AUTO_PLAY_INTERVAL = 5000; // 5 seconds

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, AUTO_PLAY_INTERVAL);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    // Resume auto-play after 10 seconds of manual interaction
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const getGradientClasses = (theme: string) => {
    switch (theme) {
      case 'primary':
        return 'from-teal-600 to-cyan-700';
      case 'secondary':
        return 'from-rose-600 to-pink-700';
      case 'tertiary':
        return 'from-emerald-600 to-teal-700';
      default:
        return 'from-teal-600 to-cyan-700';
    }
  };

  return (
    <section className="relative h-[480px] overflow-hidden">
      {/* Slides */}
      {SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? 'opacity-100 translate-x-0'
              : index < currentSlide
              ? 'opacity-0 -translate-x-full'
              : 'opacity-0 translate-x-full'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${getGradientClasses(slide.theme)} opacity-50`} />
          </div>

          {/* Content */}
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
            <div className="max-w-2xl text-white">
              {/* Subtitle */}
              <p className="text-base md:text-lg mb-2 font-medium opacity-90 animate-fade-in-up">
                {slide.subtitle}
              </p>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 animate-fade-in-up animation-delay-100">
                {slide.title}
              </h1>

              {/* Description */}
              <p className="text-base md:text-lg mb-6 opacity-90 animate-fade-in-up animation-delay-200">
                {slide.description}
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-300">
                <Link
                  href={slide.primaryCTA.href}
                  className="bg-white text-primary-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
                >
                  {slide.primaryCTA.text}
                </Link>
                <Link
                  href={slide.secondaryCTA.href}
                  className="bg-transparent border-2 border-white text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition"
                >
                  {slide.secondaryCTA.text}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition z-10"
        aria-label="Slide anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/30 hover:bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition z-10"
        aria-label="Siguiente slide"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              index === currentSlide
                ? 'w-12 h-3 bg-white'
                : 'w-3 h-3 bg-white/50 hover:bg-white/75'
            } rounded-full`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      {isAutoPlaying && (
        <div className="absolute top-6 right-6 z-10">
          <div className="flex items-center gap-2 bg-white/30 backdrop-blur-sm px-3 py-2 rounded-full text-white text-sm">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            Auto
          </div>
        </div>
      )}
    </section>
  );
}