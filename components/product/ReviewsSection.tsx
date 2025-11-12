'use client';

import { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Camera, X, Upload, Loader2 } from 'lucide-react';
import { formatDate } from '@/lib';
import { useToast } from '@/contexts/ToastContext';
import Image from 'next/image';
import ReviewPhotos from './ReviewPhotos';
import RatingBreakdown from './RatingBreakdown';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';

interface ReviewsSectionProps {
  productId: number;
  rating: number;
  reviewCount: number;
}

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  helpful: number;
  photos: string[];
}

// Mock reviews data with photos
const mockReviews: Review[] = [
  {
    id: 1,
    author: 'María González',
    rating: 5,
    date: '2024-10-15',
    comment:
      'Hermoso producto, la calidad es excepcional. Se nota el trabajo artesanal y el cuidado en cada detalle. Llegó perfectamente empacado.',
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
    comment:
      'Muy buen producto, aunque el envío tardó un poco más de lo esperado. La pieza es tal como se describe y las fotos no le hacen justicia.',
    verified: true,
    helpful: 8,
    photos: [],
  },
  {
    id: 3,
    author: 'Ana Martínez',
    rating: 5,
    date: '2024-10-05',
    comment:
      '¡Excelente! Es el regalo perfecto. La artesanía mexicana en su máxima expresión. Definitivamente volveré a comprar.',
    verified: false,
    helpful: 15,
    photos: ['https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400'],
  },
];

export default function ReviewsSection({
  productId: _productId,
  rating,
  reviewCount,
}: ReviewsSectionProps) {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<'all' | 'photos'>('all');
  const [helpfulReviews, setHelpfulReviews] = useState<Set<number>>(new Set());

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReviewRating, setNewReviewRating] = useState(0);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewPhotos, setNewReviewPhotos] = useState<string[]>([]);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);
  const filteredReviews =
    filter === 'photos' ? displayedReviews.filter((r) => r.photos.length > 0) : displayedReviews;

  const reviewsWithPhotos = reviews.filter((r) => r.photos.length > 0).length;

  // Handle marking review as helpful
  const handleHelpful = (reviewId: number) => {
    if (helpfulReviews.has(reviewId)) {
      setHelpfulReviews((prev) => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId ? { ...review, helpful: review.helpful - 1 } : review
        )
      );
    } else {
      setHelpfulReviews((prev) => new Set(prev).add(reviewId));

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === reviewId ? { ...review, helpful: review.helpful + 1 } : review
        )
      );
    }
  };

  // Handle photo upload (mock implementation)
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    if (newReviewPhotos.length + files.length > 5) {
      showToast('Máximo 5 fotos por reseña', 'error');
      return;
    }

    // Mock: Create object URLs for preview
    const newPhotos = Array.from(files).map((file) => URL.createObjectURL(file));
    setNewReviewPhotos([...newReviewPhotos, ...newPhotos]);
  };

  // Remove photo from new review
  const handleRemovePhoto = (index: number) => {
    setNewReviewPhotos(newReviewPhotos.filter((_, i) => i !== index));
  };

  // Open review modal
  const handleOpenReviewModal = () => {
    setShowReviewModal(true);
    setNewReviewRating(0);
    setNewReviewComment('');
    setNewReviewPhotos([]);
  };

  // Close review modal
  const handleCloseReviewModal = () => {
    setShowReviewModal(false);
    setNewReviewRating(0);
    setNewReviewComment('');
    setNewReviewPhotos([]);
    setHoverRating(0);
  };

  // Submit new review
  const handleSubmitReview = async () => {
    if (newReviewRating === 0) {
      showToast('Por favor selecciona una calificación', 'error');
      return;
    }

    if (newReviewComment.trim().length < 10) {
      showToast('La reseña debe tener al menos 10 caracteres', 'error');
      return;
    }

    setIsSubmittingReview(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Add new review to the list
    const newReview: Review = {
      id: Date.now(),
      author: 'Usuario Actual', // In real app, get from auth
      rating: newReviewRating,
      date: new Date().toISOString().split('T')[0],
      comment: newReviewComment.trim(),
      verified: true, // In real app, check if user purchased
      helpful: 0,
      photos: newReviewPhotos,
    };

    setReviews([newReview, ...reviews]);
    setIsSubmittingReview(false);
    handleCloseReviewModal();
    showToast('¡Reseña publicada exitosamente!', 'success');
  };

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
                      i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">{reviewCount} reseñas totales</p>
            </div>
          </div>

          {/* Rating Breakdown */}
          <RatingBreakdown rating={rating} reviewCount={reviewCount} />
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
          onClick={handleOpenReviewModal}
        >
          Escribir una reseña
        </Button>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {filteredReviews.map((review) => {
          const isMarkedHelpful = helpfulReviews.has(review.id);

          return (
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
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">
                        {formatDate(review.date, {
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
                <button
                  onClick={() => handleHelpful(review.id)}
                  className={`inline-flex items-center gap-1 text-sm transition-colors ${
                    isMarkedHelpful
                      ? 'text-primary-600 font-medium'
                      : 'text-gray-600 hover:text-primary-600'
                  }`}
                >
                  <ThumbsUp className={`w-4 h-4 ${isMarkedHelpful ? 'fill-current' : ''}`} />
                  <span>
                    {isMarkedHelpful ? 'Marcado como útil' : 'Útil'} ({review.helpful})
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More Button */}
      {reviews.length > 3 && filter === 'all' && (
        <div className="mt-8 text-center">
          <Button variant="secondary" size="md" onClick={() => setShowAll(!showAll)}>
            {showAll ? 'Ver menos reseñas' : `Ver todas las reseñas (${reviews.length})`}
          </Button>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/50 z-40" onClick={handleCloseReviewModal} />

          {/* Modal */}
          <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-xl shadow-2xl z-50 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Escribir una Reseña</h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Comparte tu experiencia con otros compradores
                  </p>
                </div>
                <button
                  onClick={handleCloseReviewModal}
                  className="p-2 hover:bg-gray-100 rounded-full transition"
                  disabled={isSubmittingReview}
                >
                  <X className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                {/* Rating */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Tu calificación *
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReviewRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                        disabled={isSubmittingReview}
                      >
                        <Star
                          className={`w-10 h-10 ${
                            star <= (hoverRating || newReviewRating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300 hover:text-yellow-300'
                          }`}
                        />
                      </button>
                    ))}
                    {newReviewRating > 0 && (
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {newReviewRating} {newReviewRating === 1 ? 'estrella' : 'estrellas'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Tu reseña *
                  </label>
                  <textarea
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    rows={5}
                    placeholder="Cuéntanos qué te pareció el producto. ¿Qué te gustó? ¿Algo que mejorar?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                    disabled={isSubmittingReview}
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    Mínimo 10 caracteres ({newReviewComment.length} / 500)
                  </p>
                </div>

                {/* Photos */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Fotos (opcional)
                  </label>
                  <p className="text-xs text-gray-500 mb-3">Agrega hasta 5 fotos del producto</p>

                  {/* Photo Preview Grid */}
                  {newReviewPhotos.length > 0 && (
                    <div className="grid grid-cols-5 gap-2 mb-3">
                      {newReviewPhotos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <div className="relative w-full h-20">
                            <Image
                              src={photo}
                              alt={`Preview ${index + 1}`}
                              fill
                              className="object-cover rounded-lg"
                            />
                          </div>
                          <button
                            onClick={() => handleRemovePhoto(index)}
                            className="absolute -top-2 -right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            disabled={isSubmittingReview}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload Button */}
                  {newReviewPhotos.length < 5 && (
                    <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition cursor-pointer">
                      <Upload className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">
                        Subir fotos ({newReviewPhotos.length}/5)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                        disabled={isSubmittingReview}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={handleCloseReviewModal}
                  disabled={isSubmittingReview}
                  className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitReview}
                  disabled={isSubmittingReview || newReviewRating === 0}
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmittingReview ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Publicando...
                    </>
                  ) : (
                    'Publicar Reseña'
                  )}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
