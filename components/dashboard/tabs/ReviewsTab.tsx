/**
 * @fileoverview Reviews tab component for the seller dashboard.
 * Displays customer reviews with ratings, comments, and seller responses.
 * Shows review helpfulness counts and supports threaded responses.
 * @module components/dashboard/tabs/ReviewsTab
 */

import { formatRelativeTime } from '@/lib';
import { Review } from '@/lib/types';
import Card from '@/components/common/Card';
import Avatar from '@/components/common/Avatar';
import StarRating from '@/components/common/StarRating';

/**
 * @interface ReviewsTabProps
 * Props for the ReviewsTab component.
 */
interface ReviewsTabProps {
  /** Array of customer reviews to display */
  reviews: Review[];
}

export default function ReviewsTab({ reviews }: ReviewsTabProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">Reseñas de Clientes</h3>
      {reviews.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-400 text-center py-8">No hay reseñas aún</p>
      ) : (
        reviews.map((review) => (
          <Card key={review.id} variant="outlined" padding="md">
            <div className="flex items-start gap-4">
              <Avatar
                src={review.buyerAvatar}
                name={review.buyerName}
                alt={review.buyerName}
                size="lg"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <p className="font-bold text-gray-900 dark:text-gray-100">{review.buyerName}</p>
                  <StarRating
                    rating={review.rating}
                    size="sm"
                    showValue={false}
                    productId={`review-${review.id}`}
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                  {review.productName}
                </p>
                <p className="text-gray-900 dark:text-gray-100 mb-2">{review.comment}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {formatRelativeTime(review.date)}
                </p>

                {review.response && (
                  <div className="mt-4 ml-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border-l-4 border-blue-400 dark:border-blue-500">
                    <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
                      Tu respuesta:
                    </p>
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      {review.response.text}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {formatRelativeTime(review.response.date)}
                    </p>
                  </div>
                )}

                <div className="mt-3 flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <span>{review.helpful} personas encontraron esto útil</span>
                </div>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
