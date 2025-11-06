import { Suspense } from 'react';
import ComparisonPageClient from '@/components/product/Comparison/ComparisonPageClient';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Comparar Productos - Hecho en México',
  description: 'Compara productos artesanales mexicanos lado a lado',
};

function ComparisonLoading() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<ComparisonLoading />}>
      <ComparisonPageClient />
    </Suspense>
  );
}
