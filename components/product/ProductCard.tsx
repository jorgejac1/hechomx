import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Generate random rating if not provided (for demo purposes)
  const rating = product.rating || (Math.random() * (5 - 4) + 4);
  const reviewCount = product.reviewCount || Math.floor(Math.random() * 500) + 50;

  return (
    <Link href={`/productos/${product.id}`} className="group block h-full">
      <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 bg-gray-200 overflow-hidden flex-shrink-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
          
          {/* Badges - Compactos */}
          <div className="absolute top-2 left-2 flex gap-1.5">
            {product.featured && (
              <span className="bg-primary-600 text-white px-2 py-0.5 rounded-full text-xs font-bold shadow-sm">
                Destacado
              </span>
            )}
          </div>
          
          {product.verified && (
            <div className="absolute top-2 right-2 bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center shadow-sm" title="Producto verificado">
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}
        </div>

        {/* Content - MÁS COMPACTO */}
        <div className="p-3 flex-1 flex flex-col">
          {/* Product Name */}
          <h3 className="text-sm font-bold text-gray-900 mb-1.5 line-clamp-2 group-hover:text-primary-600 transition-colors leading-tight min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Rating & Location - Una línea */}
          <div className="flex items-center justify-between mb-2 text-xs">
            <div className="flex items-center gap-1">
              <span className="font-bold text-gray-900">{rating.toFixed(1)}</span>
              <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
              <span className="text-gray-500">({reviewCount})</span>
            </div>
            <span className="text-gray-500 truncate ml-2">{product.state}</span>
          </div>

          {/* Price & Stock */}
          <div className="flex items-end justify-between mt-auto pt-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-1 mb-0.5">
                <span className="text-lg font-bold text-primary-600">
                  ${product.price.toLocaleString('es-MX')}
                </span>
                <span className="text-xs text-gray-500">{product.currency}</span>
              </div>
              <p className="text-xs text-gray-500 truncate">
                {product.maker}
              </p>
            </div>
            
            {product.inStock ? (
              <span className="text-xs text-green-600 font-medium whitespace-nowrap ml-2">
                Disponible
              </span>
            ) : (
              <span className="text-xs text-red-600 font-medium whitespace-nowrap ml-2">
                Agotado
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}