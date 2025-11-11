'use client';

import Image from 'next/image';
import type { Review } from '@/lib/types';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { formatRelativeTime } from '@/lib';

interface ShopReviewsProps {
  reviews: Review[];
}

export default function ShopReviews({ reviews }: ShopReviewsProps) {
  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Sin reseñas aún</h3>
        <p className="text-gray-600">Esta tienda aún no tiene reseñas de clientes.</p>
      </div>
    );
  }

  // Calculate rating distribution
  const ratingCounts = [0, 0, 0, 0, 0];
  reviews.forEach((review) => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingCounts[review.rating - 1]++;
    }
  });

  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center">
            <p className="text-6xl font-bold text-gray-900 mb-2">{averageRating.toFixed(1)}</p>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-6 h-6 ${
                    i < Math.round(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-600">
              Basado en {reviews.length} {reviews.length === 1 ? 'reseña' : 'reseñas'}
            </p>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingCounts[rating - 1];
              const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0;

              return (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-700 w-12">{rating} ⭐</span>
                  <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-xl shadow-sm p-6">
            {/* Reviewer Info */}
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                {review.buyerAvatar ? (
                  <Image
                    src={review.buyerAvatar}
                    alt={review.buyerName}
                    width={48}
                    height={48}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold">
                    {review.buyerName.charAt(0)}
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-gray-900">{review.buyerName}</h4>
                  <span className="text-sm text-gray-500">{formatRelativeTime(review.date)}</span>
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  {review.productName && (
                    <span className="text-sm text-gray-500">· {review.productName}</span>
                  )}
                </div>

                <p className="text-gray-700 mb-3">{review.comment}</p>

                {/* Helpful Button */}
                <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Útil ({review.helpful})</span>
                </button>

                {/* Seller Response */}
                {review.response && (
                  <div className="mt-4 pl-4 border-l-2 border-primary-200 bg-primary-50 p-4 rounded-r-lg">
                    <p className="text-sm font-semibold text-gray-900 mb-1">
                      Respuesta del vendedor
                    </p>
                    <p className="text-sm text-gray-700 mb-2">{review.response.text}</p>
                    <p className="text-xs text-gray-500">
                      {formatRelativeTime(review.response.date)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
