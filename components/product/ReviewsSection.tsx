'use client';

import { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Camera } from 'lucide-react';
import ReviewPhotos from './ReviewPhotos';
import RatingBreakdown from './RatingBreakdown';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';

interface ReviewsSectionProps {
  productId: number;
  rating: number;
  reviewCount: number;
}

// Mock reviews data with photos
const mockReviews = [
  {
    id: 1,
    author: 'María González',
    rating: 5,
    date: '2024-10-15',
    comment: 'Hermoso producto, la calidad es excepcional. Se nota el trabajo artesanal y el cuidado en cada detalle. Llegó perfectamente empacado.',
    verified: true,
    helpful: 12,
    photos: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400',
    ],
  },
  {
    id: 2,
    author: 'Carlos Ramírez',
    rating: 4,
    date: '2024-10-10',
    comment: 'Muy buen producto, aunque el envío tardó un poco más de lo esperado. La pieza es tal como se describe y las fotos no le hacen justicia.',
    verified: true,
    helpful: 8,
    photos: [],
  },
  {
    id: 3,
    author: 'Ana Martínez',
    rating: 5,
    date: '2024-10-05',
    comment: '¡Excelente! Es el regalo perfecto. La artesanía mexicana en su máxima expresión. Definitivamente volveré a comprar.',
    verified: false,
    helpful: 15,
    photos: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400',
    ],
  },
];

export default function ReviewsSection({ productId, rating, reviewCount }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState(mockReviews);
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<'all' | 'photos'>('all');

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);
  const filteredReviews = filter === 'photos' 
    ? displayedReviews.filter(r => r.photos.length > 0)
    : displayedReviews;

  const reviewsWithPhotos = reviews.filter(r => r.photos.length > 0).length;

  // Calculate rating distribution
  const ratingDistribution = [
    { stars: 5, count: Math.floor(reviewCount * 0.7) },
    { stars: 4, count: Math.floor(reviewCount * 0.2) },
    { stars: 3, count: Math.floor(reviewCount * 0.07) },
    { stars: 2, count: Math.floor(reviewCount * 0.02) },
    { stars: 1, count: Math.floor(reviewCount * 0.01) },
  ];

  return (
    <div id="reviews" className="bg-white rounded-xl shadow-md p-6 lg:p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Reseñas de Clientes</h2>

      {/* Enhanced Rating Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-200">
        {/* Overall Rating */}
        <div>
          <div className="flex items-end gap-3 mb-4">
            <div className="text-5xl font-bold text-gray-900">{rating.toFixed(1)}</div>
            <div className="pb-1">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">
                {reviewCount.toLocaleString('es-MX')} reseñas totales
              </p>
            </div>
          </div>

          {/* Rating Breakdown */}
          <RatingBreakdown rating={rating} />
        </div>

        {/* Rating Distribution */}
        <div className="space-y-2">
          {ratingDistribution.map(({ stars, count }) => (
            <div key={stars} className="flex items-center gap-3">
              <div className="flex items-center gap-1 w-16">
                <span className="text-sm font-medium text-gray-900">{stars}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
              </div>
              <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full transition-all"
                  style={{ width: `${(count / reviewCount) * 100}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Filter and Write Review */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-gray-600">
            <Camera className="w-5 h-5" />
            <span className="font-semibold">{reviewsWithPhotos} reseñas con fotos</span>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Todas
            </button>
            <button
              onClick={() => setFilter('photos')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'photos'
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Con fotos
            </button>
          </div>
        </div>

        {/* Write Review Button */}
        <Button
          variant="secondary"
          size="md"
          icon={<MessageSquare className="w-5 h-5" />}
        >
          Escribir una reseña
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
            {/* Review Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 font-semibold">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">{review.author}</span>
                    {/* Verified Purchase Badge */}
                    {review.verified && (
                      <Badge variant="success" size="sm">
                        Compra verificada
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString('es-MX', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Photos */}
            <ReviewPhotos photos={review.photos} />

            {/* Review Content */}
            <p className="text-gray-700 mb-3">{review.comment}</p>

            {/* Review Actions */}
            <div className="flex items-center gap-4">
              <button className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-primary-600 transition-colors">
                <ThumbsUp className="w-4 h-4" />
                <span>Útil ({review.helpful})</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {reviews.length > 3 && filter === 'all' && (
        <div className="mt-8 text-center">
          {/* Show More Button */}
          <Button
            variant="secondary"
            size="md"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Ver menos reseñas' : `Ver todas las reseñas (${reviews.length})`}
          </Button>
        </div>
      )}
    </div>
  );
}