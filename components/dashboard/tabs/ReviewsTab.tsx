import Image from 'next/image';
import { Star } from 'lucide-react';
import { formatRelativeTime } from '@/lib';
import { Review } from '@/lib/types';

interface ReviewsTabProps {
  reviews: Review[];
}

export default function ReviewsTab({ reviews }: ReviewsTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Reseñas de Clientes</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-600 text-center py-8">No hay reseñas aún</p>
      ) : (
        reviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start gap-4">
              {review.buyerAvatar && (
                <Image
                  src={review.buyerAvatar}
                  alt={review.buyerName}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-bold text-gray-900">{review.buyerName}</p>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2">{review.productName}</p>
                <p className="text-gray-900 mb-2">{review.comment}</p>
                <p className="text-xs text-gray-500">{formatRelativeTime(review.date)}</p>

                {review.response && (
                  <div className="mt-4 ml-4 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                    <p className="text-sm font-semibold text-blue-900 mb-1">Tu respuesta:</p>
                    <p className="text-sm text-gray-900">{review.response.text}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatRelativeTime(review.response.date)}
                    </p>
                  </div>
                )}

                <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                  <span>{review.helpful} personas encontraron esto útil</span>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
