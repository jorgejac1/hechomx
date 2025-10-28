'use client';

import { Star } from 'lucide-react';

interface RatingBreakdownProps {
  rating: number;
}

export default function RatingBreakdown({ rating }: RatingBreakdownProps) {
  const categories = [
    { label: 'Calidad del artículo', value: 5.0 },
    { label: 'Envío', value: 5.0 },
    { label: 'Servicio al cliente', value: 5.0 },
  ];

  return (
    <div className="space-y-3 mt-4">
      {categories.map((item, idx) => (
        <div key={idx} className="flex items-center justify-between">
          <span className="text-sm text-gray-700">{item.label}</span>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(item.value)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-900 w-8">
              {item.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}