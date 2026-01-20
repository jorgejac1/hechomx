import Link from 'next/link';
import Image from 'next/image';
import { Subcategory } from '@/lib';

interface SubcategoriesGridProps {
  category: string;
  subcategories: Subcategory[];
  currentSubcategory?: string;
  baseUrl?: string;
}

export default function SubcategoriesGrid({
  category,
  subcategories,
  currentSubcategory,
  baseUrl = '/productos',
}: SubcategoriesGridProps) {
  if (subcategories.length === 0) return null;

  const buildUrl = (slug: string) => {
    const params = new URLSearchParams();
    params.set('categoria', category);

    if (currentSubcategory) {
      params.set('subcategoria', currentSubcategory);
      params.set('subsubcategoria', slug);
    } else {
      params.set('subcategoria', slug);
    }

    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="mb-8 bg-white rounded-xl shadow-xs p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        {currentSubcategory ? 'Refina tu búsqueda' : 'Explora por tipo'}
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {subcategories.map((sub) => (
          <Link key={sub.slug} href={buildUrl(sub.slug)} className="group">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 mb-2 shadow-xs group-hover:shadow-lg transition-all border-2 border-transparent group-hover:border-primary-500">
              <Image
                src={sub.image}
                alt={sub.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Hover overlay con flecha */}
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Ícono de flecha en hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white/90 rounded-full p-2">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-xs font-medium text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
                {sub.name}
              </p>
              {sub.count && <p className="text-xs text-gray-500 mt-0.5">{sub.count}</p>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
