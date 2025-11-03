import { Metadata } from 'next';
import { ComparisonPageClient } from '@/components/product/Comparison';

export const metadata: Metadata = {
  title: 'Comparar Productos - Hecho en México',
  description: 'Compara productos artesanales mexicanos lado a lado para tomar la mejor decisión de compra.',
};

export default function ComparePage() {
  return <ComparisonPageClient />;
}