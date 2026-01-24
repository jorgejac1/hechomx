/**
 * @fileoverview Order review modal for rating purchased products.
 * Allows buyers to rate and review individual items from their orders.
 * Supports star ratings and text reviews for each product.
 * @module components/orders/ReviewModal
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useToast } from '@/contexts/ToastContext';
import type { BuyerOrder } from '@/lib/types/buyer';
import Modal from '@/components/common/Modal';
import Textarea from '@/components/common/Textarea';
import LoadingButton from '@/components/common/LoadingButton';
import Button from '@/components/common/Button';

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

  const footer = (
    <>
      <Button variant="outline" onClick={onClose} disabled={isSubmitting} fullWidth>
        Cancelar
      </Button>
      <LoadingButton
        onClick={handleSubmit}
        isLoading={isSubmitting}
        loadingText="Enviando..."
        fullWidth
      >
        Publicar Reseñas
      </LoadingButton>
    </>
  );

  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      title="Dejar Reseña"
      description={`Pedido #${order.id}`}
      size="lg"
      footer={footer}
      closeOnBackdrop={!isSubmitting}
      closeOnEscape={!isSubmitting}
    >
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
            <Textarea
              label="Tu opinión (opcional)"
              value={reviews[item.id]?.comment || ''}
              onChange={(e) => handleCommentChange(item.id, e.target.value)}
              minRows={3}
              placeholder="Comparte tu experiencia con este producto..."
              disabled={isSubmitting}
            />
          </div>
        ))}
      </div>
    </Modal>
  );
}
