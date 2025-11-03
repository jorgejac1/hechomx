'use client';

import { Star } from 'lucide-react';

interface RatingBreakdownProps {
  rating: number;
  reviewCount?: number;
}

export default function RatingBreakdown({ rating, reviewCount }: RatingBreakdownProps) {
  // Generate category ratings based on overall rating
  // Categories typically vary slightly from overall rating
  const generateCategoryRating = (baseRating: number, variance: number) => {
    const adjusted = baseRating + variance;
    return Math.max(1, Math.min(5, adjusted)); // Clamp between 1 and 5
  };

  const categories = [
    { label: 'Calidad del artículo', value: generateCategoryRating(rating, 0.2) },
    { label: 'Envío', value: generateCategoryRating(rating, -0.1) },
    { label: 'Servicio al cliente', value: generateCategoryRating(rating, 0.1) },
  ];

  return (
    <div className="space-y-4">
      {/* Overall Rating Display */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-200">
        <span className="text-base font-semibold text-gray-900">Calificación general</span>
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < Math.floor(rating)
                    ? 'text-yellow-400 fill-current'
                    : i < rating
                      ? 'text-yellow-400 fill-current opacity-50'
                      : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-base font-bold text-gray-900">{rating.toFixed(1)}</span>
          {reviewCount && <span className="text-sm text-gray-500">({reviewCount})</span>}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="space-y-3">
        {categories.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{item.label}</span>
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(item.value) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-900 w-8">
                {item.value.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
