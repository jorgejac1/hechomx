'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import { getSellerReviews } from '@/lib/api/sellerApi';
import type { SellerReview } from '@/lib/types';
import type { User } from '@/contexts/AuthContext';
import { formatRelativeTime, ROUTES } from '@/lib';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import {
  Star,
  Send,
  Search,
  Filter,
  ArrowLeft,
  ThumbsUp,
  CheckCircle2,
  Clock,
  MessageSquare,
  ShieldCheck,
  Image as ImageIcon,
} from 'lucide-react';

export default function ReviewsManagementPage() {
  return (
    <AuthPageWrapper requireSeller loadingText="Cargando reseñas...">
      {(user) => <ReviewsManagementContent user={user} />}
    </AuthPageWrapper>
  );
}

function ReviewsManagementContent({ user }: { user: User }) {
  const [reviews, setReviews] = useState<SellerReview[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<SellerReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'responded'>('all');
  const [filterRating, setFilterRating] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedReview, setSelectedReview] = useState<SellerReview | null>(null);
  const [responseText, setResponseText] = useState('');
  const [showImageModal, setShowImageModal] = useState<string | null>(null);

  useEffect(() => {
    async function loadReviews() {
      setIsLoading(true);
      const data = await getSellerReviews(user.email);
      setReviews(data);
      setFilteredReviews(data);
      setIsLoading(false);
    }
    loadReviews();
  }, [user.email]);

  // Filter reviews
  useEffect(() => {
    let filtered = reviews;

    if (filterStatus !== 'all') {
      filtered = filtered.filter((review) => review.status === filterStatus);
    }

    if (filterRating !== 'all') {
      filtered = filtered.filter((review) => review.rating === Number(filterRating));
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (review) =>
          review.review.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.buyer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredReviews(filtered);
  }, [filterStatus, filterRating, searchQuery, reviews]);

  if (isLoading) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando reseñas..." />;
  }

  const pendingCount = reviews.filter((r) => r.status === 'pending').length;
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : '0.0';

  const handleSendResponse = () => {
    if (!responseText.trim() || !selectedReview) return;

    console.log('Sending response:', responseText);

    const updatedReviews = reviews.map((review) =>
      review.id === selectedReview.id
        ? {
            ...review,
            status: 'responded' as const,
            response: {
              text: responseText,
              date: new Date().toISOString(),
            },
          }
        : review
    );

    setReviews(updatedReviews);
    setSelectedReview({
      ...selectedReview,
      status: 'responded',
      response: {
        text: responseText,
        date: new Date().toISOString(),
      },
    });
    setResponseText('');
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClasses = {
      sm: 'w-3 h-3',
      md: 'w-4 h-4',
      lg: 'w-5 h-5',
    };

    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <Link
            href={ROUTES.DASHBOARD}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Dashboard
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Gestión de Reseñas</h1>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-bold text-gray-900">{averageRating}</span>
                  <span className="text-sm text-gray-600">({reviews.length} reseñas)</span>
                </div>
                {pendingCount > 0 && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-semibold rounded-full">
                    {pendingCount} pendiente{pendingCount > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por cliente, producto o comentario..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Filter className="w-3 h-3 text-gray-600" />
                <label className="text-xs font-semibold text-gray-700">Estado</label>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as 'all' | 'pending' | 'responded')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Todas</option>
                <option value="pending">Pendientes</option>
                <option value="responded">Respondidas</option>
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Star className="w-3 h-3 text-yellow-500" />
                <label className="text-xs font-semibold text-gray-700">Calificación</label>
              </div>
              <select
                value={filterRating}
                onChange={(e) =>
                  setFilterRating(e.target.value as 'all' | '5' | '4' | '3' | '2' | '1')
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">Todas las estrellas</option>
                <option value="5">5 estrellas</option>
                <option value="4">4 estrellas</option>
                <option value="3">3 estrellas</option>
                <option value="2">2 estrellas</option>
                <option value="1">1 estrella</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredReviews.length === 0 ? (
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-12 text-center">
              <Star className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">No hay reseñas</h3>
              <p className="text-gray-600">
                {searchQuery || filterStatus !== 'all' || filterRating !== 'all'
                  ? 'Intenta con otros filtros'
                  : 'Aún no tienes reseñas de clientes'}
              </p>
            </div>
          ) : (
            filteredReviews.map((review) => (
              <div
                key={review.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer ${
                  selectedReview?.id === review.id ? 'ring-2 ring-primary-500' : ''
                }`}
                onClick={() => setSelectedReview(review)}
              >
                {/* Review Header */}
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex items-start gap-3 mb-3">
                    {review.buyer.avatar ? (
                      <Image
                        src={review.buyer.avatar}
                        alt={review.buyer.name}
                        width={48}
                        height={48}
                        className="rounded-full shrink-0"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-gray-600 font-semibold">
                          {review.buyer.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-gray-900 truncate">{review.buyer.name}</p>
                        {review.buyer.verified && (
                          <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        {renderStars(review.rating, 'sm')}
                        <span className="text-xs text-gray-600">
                          {formatRelativeTime(review.date)}
                        </span>
                      </div>
                    </div>
                    {review.status === 'responded' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                    ) : (
                      <Clock className="w-5 h-5 text-yellow-600 shrink-0" />
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Image
                      src={review.product.image}
                      alt={review.product.name}
                      width={48}
                      height={48}
                      className="rounded-lg object-cover shrink-0"
                    />
                    <p className="text-sm font-semibold text-gray-900 flex-1 truncate">
                      {review.product.name}
                    </p>
                  </div>
                </div>

                {/* Review Content */}
                <div className="p-4 sm:p-6">
                  <p className="text-sm text-gray-900 mb-3 line-clamp-3">{review.review}</p>

                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-3 overflow-x-auto">
                      {review.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowImageModal(img);
                          }}
                          className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden hover:opacity-80 transition"
                        >
                          <Image
                            src={img}
                            alt={`Review image ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <ImageIcon className="w-6 h-6 text-white" />
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Helpful Count */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <ThumbsUp className="w-4 h-4" />
                    <span>
                      {review.helpful} {review.helpful === 1 ? 'persona' : 'personas'} encontraron
                      esto útil
                    </span>
                  </div>

                  {/* Response */}
                  {review.response ? (
                    <div className="p-3 bg-primary-50 rounded-lg border-l-4 border-primary-500">
                      <div className="flex items-center gap-2 mb-2">
                        <MessageSquare className="w-4 h-4 text-primary-600" />
                        <p className="text-xs font-semibold text-primary-900">Tu respuesta</p>
                        <span className="text-xs text-gray-600">
                          {formatRelativeTime(review.response.date)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900">{review.response.text}</p>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedReview(review);
                      }}
                      className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      Responder Reseña
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Response Modal */}
        {selectedReview && selectedReview.status === 'pending' && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedReview(null)}
            />

            <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl bg-white rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Responder Reseña</h2>
                <div className="flex items-center gap-3">
                  {selectedReview.buyer.avatar ? (
                    <Image
                      src={selectedReview.buyer.avatar}
                      alt={selectedReview.buyer.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-semibold text-sm">
                        {selectedReview.buyer.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{selectedReview.buyer.name}</p>
                    <div className="flex items-center gap-2">
                      {renderStars(selectedReview.rating, 'sm')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Reseña del cliente:</p>
                  <p className="text-sm text-gray-900 bg-gray-50 p-4 rounded-lg">
                    {selectedReview.review}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tu respuesta:
                  </label>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Escribe una respuesta profesional y cordial..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                  />
                  <p className="text-xs text-gray-600 mt-2">
                    Consejo: Agradece al cliente, aborda sus comentarios y ofrece ayuda adicional si
                    es necesario.
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedReview(null)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleSendResponse}
                    disabled={!responseText.trim()}
                    className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Enviar Respuesta
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Image Modal */}
        {showImageModal && (
          <>
            <div
              className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
              onClick={() => setShowImageModal(null)}
            >
              <div className="relative max-w-4xl max-h-[90vh]">
                <Image
                  src={showImageModal}
                  alt="Review image"
                  width={1200}
                  height={800}
                  className="object-contain max-h-[90vh]"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
