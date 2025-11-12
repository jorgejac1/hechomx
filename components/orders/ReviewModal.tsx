'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star, X, Loader2 } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';
import type { BuyerOrder } from '@/lib/types/buyer';

interface ReviewModalProps {
  order: BuyerOrder;
  onClose: () => void;
  onSubmit: (reviews: OrderReview[]) => void;
}

interface OrderReview {
  itemId: string;
  rating: number;
  comment: string;
  images?: File[];
}

export default function ReviewModal({ order, onClose, onSubmit }: ReviewModalProps) {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<Record<string, { rating: number; comment: string }>>(
    Object.fromEntries(order.items.map((item) => [item.id, { rating: 0, comment: '' }]))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (itemId: string, rating: number) => {
    setReviews((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], rating },
    }));
  };

  const handleCommentChange = (itemId: string, comment: string) => {
    setReviews((prev) => ({
      ...prev,
      [itemId]: { ...prev[itemId], comment },
    }));
  };

  const handleSubmit = async () => {
    // Validate all items have ratings
    const allRated = order.items.every((item) => reviews[item.id]?.rating > 0);
    if (!allRated) {
      showToast('Por favor califica todos los productos', 'error');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const reviewsData: OrderReview[] = order.items.map((item) => ({
      itemId: item.id,
      rating: reviews[item.id].rating,
      comment: reviews[item.id].comment,
    }));

    onSubmit(reviewsData);
    setIsSubmitting(false);
  };

  const renderStars = (itemId: string, currentRating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => handleRatingChange(itemId, star)}
            className="transition-transform hover:scale-110"
            type="button"
          >
            <Star
              className={`w-8 h-8 ${
                star <= currentRating
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300 hover:text-yellow-300'
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-3xl bg-white rounded-xl shadow-2xl z-50 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Dejar Reseña</h2>
              <p className="text-sm text-gray-600 mt-1">Pedido #{order.id}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
              disabled={isSubmitting}
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {order.items.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                {/* Product Info */}
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-1">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.artisan.shopName}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Calificación *
                  </label>
                  {renderStars(item.id, reviews[item.id]?.rating || 0)}
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tu opinión (opcional)
                  </label>
                  <textarea
                    value={reviews[item.id]?.comment || ''}
                    onChange={(e) => handleCommentChange(item.id, e.target.value)}
                    rows={3}
                    placeholder="Comparte tu experiencia con este producto..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Publicar Reseñas'
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
