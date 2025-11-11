import Link from 'next/link';
import { getShopSlug } from '@/lib/utils/shop';
import { Store, ExternalLink } from 'lucide-react';

interface DashboardHeaderProps {
  shopName: string;
}

export default function DashboardHeader({ shopName }: DashboardHeaderProps) {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Dashboard de Vendedor</h1>
        <p className="text-gray-600 mt-1">{shopName}</p>
      </div>

      <Link
        href={`/tienda/${getShopSlug(shopName)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-xl shadow-lg hover:shadow-xl hover:from-primary-700 hover:to-primary-800 transition font-semibold mb-6"
      >
        <Store className="w-5 h-5" />
        Ver Mi Tienda
        <ExternalLink className="w-4 h-4" />
      </Link>
    </>
  );
}
