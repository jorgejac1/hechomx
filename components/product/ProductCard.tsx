"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useComparison } from "@/contexts/ComparisonContext";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggle, isInComparison, canAdd, isFull } = useComparison();
  const [mounted, setMounted] = useState(false);

  // Only access comparison state after hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  const isComparing = mounted ? isInComparison(product.id) : false;

  // Generate random rating if not provided (for demo purposes)
  const rating = product.rating || Math.random() * (5 - 4) + 4;
  const reviewCount =
    product.reviewCount || Math.floor(Math.random() * 500) + 50;

  const handleComparisonToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product);
  };

  const isDisabled = mounted ? !canAdd && !isComparing : false;

  return (
    <div className="group block h-full relative">
      {/* Comparison Button - Top Right */}
      {mounted && (
        <button
          onClick={handleComparisonToggle}
          disabled={isDisabled}
          className={`absolute top-2 right-2 z-10 p-1.5 sm:p-2 rounded-full shadow-md transition-all duration-200 
            ${
              isComparing
                ? "bg-primary-600 text-white scale-100"
                : "bg-white text-gray-600 hover:bg-gray-100"
            }
            ${isDisabled ? "opacity-50 cursor-not-allowed" : "hover:scale-110"}
            sm:opacity-0 sm:group-hover:opacity-100 opacity-100
            focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-1
          `}
          aria-label={
            isComparing ? "Quitar de comparación" : "Agregar a comparación"
          }
          title={
            isDisabled
              ? "Máximo 4 productos (quita uno para agregar otro)"
              : isComparing
              ? "Quitar de comparación"
              : "Agregar a comparación"
          }
        >
          <svg
            className="w-4 h-4 sm:w-5 sm:h-5"
            fill={isComparing ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            {isComparing ? (
              // Checkmark when comparing
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            ) : (
              // Balance/comparison icon when not comparing
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6"
                />
              </>
            )}
          </svg>
        </button>
      )}

      <Link href={`/productos/${product.id}`}>
        <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
          {/* Image - RESPONSIVE HEIGHT */}
          <div className="relative h-40 sm:h-48 md:h-56 bg-gray-200 overflow-hidden flex-shrink-0">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 60vw, (max-width: 1024px) 45vw, 25vw"
              className="object-cover group-hover:scale-110 transition-transform duration-300"
            />

            {/* Image - RESPONSIVE HEIGHT */}
            <div className="relative h-40 sm:h-48 md:h-56 bg-gray-200 overflow-hidden flex-shrink-0">
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 60vw, (max-width: 1024px) 45vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Left Side - Badges Group (Featured + Verified) */}
              <div className="absolute top-1.5 sm:top-2 left-1.5 sm:left-2 z-[1] flex items-center gap-1.5 sm:gap-2">
                {/* Featured Badge */}
                {product.featured && (
                  <span className="bg-primary-600 text-white px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-bold shadow-sm">
                    Destacado
                  </span>
                )}

                {/* Verified Badge */}
                {product.verified && (
                  <div
                    className="bg-green-500 text-white w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center shadow-sm flex-shrink-0"
                    title="Producto verificado"
                  >
                    <svg
                      className="w-3 h-3 sm:w-3.5 sm:h-3.5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content - MORE COMPACT ON MOBILE */}
          <div className="p-2.5 sm:p-3 flex-1 flex flex-col">
            {/* Product Name - SMALLER MIN-HEIGHT ON MOBILE */}
            <h3 className="text-xs sm:text-sm font-bold text-gray-900 mb-1 sm:mb-1.5 line-clamp-2 group-hover:text-primary-600 transition-colors leading-tight min-h-[2rem] sm:min-h-[2.5rem]">
              {product.name}
            </h3>

            {/* Rating & Location - STACKED ON MOBILE */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-0 mb-1.5 sm:mb-2 text-[10px] sm:text-xs">
              <div className="flex items-center gap-1">
                <span className="font-bold text-gray-900">
                  {rating.toFixed(1)}
                </span>
                <svg
                  className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
                <span className="text-gray-500">({reviewCount})</span>
              </div>
              <span className="text-gray-500 truncate sm:ml-2">
                {product.state}
              </span>
            </div>

            {/* Price & Stock - OPTIMIZED */}
            <div className="flex items-end justify-between mt-auto pt-1.5 sm:pt-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-0.5 sm:gap-1 mb-0.5">
                  <span className="text-base sm:text-lg font-bold text-primary-600">
                    ${product.price.toLocaleString("es-MX")}
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-500">
                    {product.currency}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                  {product.maker}
                </p>
              </div>

              {product.inStock ? (
                <span className="text-[10px] sm:text-xs text-green-600 font-medium whitespace-nowrap ml-1.5 sm:ml-2">
                  Disponible
                </span>
              ) : (
                <span className="text-[10px] sm:text-xs text-red-600 font-medium whitespace-nowrap ml-1.5 sm:ml-2">
                  Agotado
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
