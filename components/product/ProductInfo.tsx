'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/contexts/ToastContext';
import ShareModal from '@/components/common/ShareModal';
import { Product } from '@/types';
import { formatRelativeTime } from '@/lib';
import {
  Heart,
  Share2,
  ShoppingCart,
  Minus,
  Plus,
  MapPin,
  CheckCircle,
  Package2,
} from 'lucide-react';
import DeliveryEstimate from './DeliveryEstimate';
import TrustIndicators from './TrustIndicators';
import SellerBadge from './SellerBadge';
import Badge from '@/components/common/Badge';
import Button from '@/components/common/Button';

interface ProductInfoProps {
  product: Product;
  selectedQuantity: number;
  onQuantityChange: (quantity: number) => void;
}

export default function ProductInfo({
  product,
  selectedQuantity,
  onQuantityChange,
}: ProductInfoProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const { addToCart, isInCart } = useCart();
  const { success } = useToast();

  const handleAddToCart = () => {
    addToCart(product, selectedQuantity);
    success(
      `Agregado ${selectedQuantity} ${selectedQuantity === 1 ? 'unidad' : 'unidades'} al carrito`
    );
  };

  const handleBuyNow = () => {
    addToCart(product, selectedQuantity);
    success('Producto agregado al carrito');
    window.location.href = '/carrito';
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const decreaseQuantity = () => {
    if (selectedQuantity > 1) {
      onQuantityChange(selectedQuantity - 1);
    }
  };

  const increaseQuantity = () => {
    onQuantityChange(selectedQuantity + 1);
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Seller Badge */}
      <SellerBadge verified={product.verified ?? false} makerName={product.maker} />

      {/* Badges */}
      <div className="flex items-center gap-2 flex-wrap">
        {product.featured && (
          <Badge variant="primary" size="sm" className="sm:text-sm">
            Destacado
          </Badge>
        )}
        {product.verified && (
          <Badge
            variant="success"
            size="sm"
            icon={<CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />}
            className="sm:text-sm"
          >
            Verificado
          </Badge>
        )}
        {product.inStock && (
          <Badge
            variant="info"
            size="sm"
            icon={<Package2 className="w-3 h-3 sm:w-4 sm:h-4" />}
            className="sm:text-sm"
          >
            Listo para enviar
          </Badge>
        )}
      </div>

      {/* Product Name */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{product.state}, México</span>
          </div>
          <span className="text-gray-400">•</span>
          <button className="font-semibold text-gray-900 hover:text-teal-600 transition-colors">
            {product.maker}
          </button>
        </div>
      </div>

      {/* Rating */}
      {product.rating && product.reviewCount && (
        <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(product.rating!)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="font-bold text-lg text-gray-900">{product.rating.toFixed(1)}</span>
          </div>
          <a href="#reviews" className="text-teal-600 hover:text-teal-700 underline font-medium">
            ({product.reviewCount.toLocaleString('es-MX')}{' '}
            {product.reviewCount === 1 ? 'reseña' : 'reseñas'})
          </a>
        </div>
      )}

      {product.createdAt && (
        <div className="pb-4 border-b border-gray-200">
          <p className="text-sm text-gray-600 flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Agregado {formatRelativeTime(product.createdAt)}
          </p>
        </div>
      )}

      {/* Price */}
      <div className="py-4 border-b border-gray-200">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-4xl font-bold text-gray-900">
            ${product.price.toLocaleString('es-MX')}
          </span>
          <span className="text-xl text-gray-600">{product.currency}</span>
        </div>
        <p className="text-sm text-gray-600">Impuestos incluidos</p>
      </div>

      {/* Delivery Estimate */}
      <DeliveryEstimate />

      {/* Stock Status */}
      <div>
        {product.inStock ? (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">Disponible para envío</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-red-600">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="font-medium">Producto agotado</span>
          </div>
        )}
      </div>

      {/* Quantity Selector */}
      {product.inStock && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 mb-3">Cantidad</label>
          <div className="flex items-center gap-3">
            <button
              onClick={decreaseQuantity}
              disabled={selectedQuantity <= 1}
              className="p-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="number"
              min="1"
              value={selectedQuantity}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (value > 0) onQuantityChange(value);
              }}
              className="w-20 text-center py-2 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 font-semibold"
            />
            <button
              onClick={increaseQuantity}
              className="p-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
            <span className="text-sm text-gray-600 ml-2">
              {product.inStock ? 'Disponible' : 'Agotado'}
            </span>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        {product.inStock ? (
          <>
            <Button
              variant="primary"
              size="lg"
              onClick={handleAddToCart}
              icon={<ShoppingCart className="w-5 h-5" />}
              fullWidth
            >
              {isInCart(product.id) ? 'Agregar más al carrito' : 'Agregar al carrito'}
            </Button>

            <Button variant="secondary" size="lg" onClick={handleBuyNow} fullWidth>
              Comprar ahora
            </Button>
          </>
        ) : (
          <Button variant="primary" size="lg" disabled fullWidth>
            No disponible
          </Button>
        )}

        {/* Secondary Actions */}
        <div className="flex gap-3">
          <Button
            variant={isFavorite ? 'primary' : 'outline'}
            size="md"
            onClick={() => setIsFavorite(!isFavorite)}
            icon={<Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />}
            fullWidth
          >
            <span className="hidden sm:inline">Favoritos</span>
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={handleShare}
            icon={<Share2 className="w-5 h-5" />}
            fullWidth
          >
            <span className="hidden sm:inline">Compartir</span>
          </Button>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm text-gray-600">
        <div className="flex items-start gap-2">
          <svg
            className="w-5 h-5 text-teal-600 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Producto 100% hecho a mano</span>
        </div>
        <div className="flex items-start gap-2">
          <svg
            className="w-5 h-5 text-teal-600 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Envío seguro a toda la República Mexicana</span>
        </div>
        <div className="flex items-start gap-2">
          <svg
            className="w-5 h-5 text-teal-600 shrink-0 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>Apoyas directamente a artesanos mexicanos</span>
        </div>
      </div>

      {/* Trust Indicators */}
      <TrustIndicators />

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        url={typeof window !== 'undefined' ? window.location.href : ''}
        title={product.name}
        text={product.description}
      />
    </div>
  );
}
