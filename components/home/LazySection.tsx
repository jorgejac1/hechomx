'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Skeleton components for loading states
const SectionSkeleton = ({ height = 400 }: { height?: number }) => (
  <div className="animate-pulse bg-gray-100 dark:bg-gray-800" style={{ minHeight: height }} />
);

// Dynamically import heavy sections
const DealsSection = dynamic(() => import('./DealsSection'), {
  loading: () => <SectionSkeleton height={300} />,
});

const SeasonalSection = dynamic(() => import('./SeasonalSection'), {
  loading: () => <SectionSkeleton height={400} />,
});

const StatesSection = dynamic(() => import('./StatesSection'), {
  loading: () => <SectionSkeleton height={500} />,
});

const CategoriesSection = dynamic(() => import('./CategoriesSection'), {
  loading: () => <SectionSkeleton height={350} />,
});

const LocalShopsSection = dynamic(() => import('./LocalShopsSection'), {
  loading: () => <SectionSkeleton height={400} />,
});

const AboutSection = dynamic(() => import('./AboutSection'), {
  loading: () => <SectionSkeleton height={300} />,
});

interface LazySectionProps {
  allProducts: ReturnType<typeof import('@/lib/server').getAllProducts>;
}

export default function LazySection({ allProducts }: LazySectionProps) {
  return (
    <Suspense fallback={<SectionSkeleton />}>
      {/* Deals Section */}
      <DealsSection />

      {/* Seasonal Section */}
      <SeasonalSection products={allProducts} />

      {/* States Section */}
      <StatesSection />

      {/* Categories Section */}
      <CategoriesSection />

      {/* Local Shops Section */}
      <LocalShopsSection />

      {/* About Section */}
      <AboutSection />
    </Suspense>
  );
}
