import Link from 'next/link';
import { getFeaturedProducts, getAllProducts } from '@/lib/server';
import ProductCarousel from '@/components/product/ProductCarousel';
import AboutSection from '@/components/home/AboutSection';
import SeasonalSection from '@/components/home/SeasonalSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import DealsSection from '@/components/home/DealsSection';
import LocalShopsSection from '@/components/home/LocalShopsSection';
import HeroSlider from '@/components/home/HeroSlider';
import StatesSection from '@/components/home/StatesSection';
import RecentlyViewedSection from '@/components/home/RecentlyViewedSection';

export const dynamic = 'force-dynamic';

export default function Home() {
  const featuredProducts = getFeaturedProducts();
  const allProducts = getAllProducts();

  return (
    <div>
      {/* Hero Section */}
      <HeroSlider />

      {/* Features */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">100% Auténtico</h3>
              <p className="text-gray-600">
                Todos los productos son verificados y hechos en México
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Apoya Artesanos</h3>
              <p className="text-sm sm:text-base text-gray-600 px-2">
                Todos los productos son verificados y hechos en México
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-primary-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">De Todo México</h3>
              <p className="text-gray-600">Productos de los 32 estados de la República Mexicana</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recently Viewed - Shows only if user has history */}
      <RecentlyViewedSection allProducts={allProducts} />

      {/* Deals Section */}
      <DealsSection />

      {/* Seasonal Section */}
      <SeasonalSection products={allProducts} />

      {/* Featured Products - Now with Carousel */}
      <ProductCarousel
        products={featuredProducts}
        title="Productos Destacados"
        viewAllLink="/productos"
        itemsToShow={4}
      />

      <StatesSection />

      {/* Categories Section */}
      <CategoriesSection />

      {/* Local Shops Section */}
      <LocalShopsSection />

      {/* About Section */}
      <AboutSection />

      {/* CTA Section */}
      <section className="py-8 sm:py-12 lg:py-16 bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">¿Eres Artesano o Creador?</h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-primary-50 px-4">
            Únete a nuestra plataforma y comparte tus creaciones con todo México
          </p>
          <Link
            href="/vendedores"
            className="inline-block bg-white text-primary-600 px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-primary-50 transition"
          >
            Comienza a Vender
          </Link>
        </div>
      </section>
    </div>
  );
}
