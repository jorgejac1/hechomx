/**
 * @fileoverview Client-side product detail page component
 * Renders the complete product detail view including gallery, info, description,
 * highlights, shipping details, seller profile, reviews, and similar products.
 * Handles cart interactions and tracks recently viewed products.
 * @module components/product/ProductDetailClient
 */

'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Product } from '@/types';
import { addToRecentlyViewed } from '@/lib/utils/recently-viewed';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductHighlights from './ProductHighlights';
import SellerProfile from './SellerProfile';
import ReviewsSection from './ReviewsSection';
import ProductRecommendations from './ProductRecommendations';
import ShippingReturns from './ShippingReturns';
import StickyCartBar from './StickyCartBar';
import ProductDescription from './ProductDescription';

/**
 * Props for the ProductDetailClient component
 * @interface ProductDetailClientProps
 */
interface ProductDetailClientProps {
  /** The main product to display */
  product: Product;
  /** All available products for recommendation calculations */
  allProducts: Product[];
}

export default function ProductDetailClient({ product, allProducts }: ProductDetailClientProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const { addToCart } = useCart();

  // Track product view
  useEffect(() => {
    addToRecentlyViewed(product.id);
  }, [product.id]);

  const handleAddToCart = () => {
    addToCart(product, selectedQuantity);
  };

  return (
    <>
      {/* Main Content with proper mobile spacing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Bottom padding for mobile sticky bar */}
        <div className="space-y-6 sm:space-y-8 pb-24 sm:pb-8">
          {/* 1. Main Product Section - Gallery + Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
            {/* Left: Gallery - Sticky on desktop */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <ProductGallery
                images={product.images}
                videos={product.videos}
                productName={product.name}
              />
            </div>

            {/* Right: Product Info */}
            <div>
              <ProductInfo
                product={product}
                selectedQuantity={selectedQuantity}
                onQuantityChange={setSelectedQuantity}
              />
            </div>
          </div>

          {/* 2. Description Section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
            <ProductDescription
              description={product.description}
              category={product.category}
              subcategory={product.subcategory}
              state={product.state}
            />
          </div>

          {/* 3. Product Highlights */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 lg:p-8">
            <ProductHighlights />
          </div>

          {/* 4. Shipping & Returns */}
          <ShippingReturns />

          {/* 5. Seller Profile */}
          <SellerProfile
            maker={product.maker}
            verified={product.verified ?? false}
            state={product.state}
          />

          {/* 6. Reviews Section */}
          {product.rating && product.reviewCount && (
            <ReviewsSection
              productId={typeof product.id === 'string' ? parseInt(product.id) : product.id}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          )}

          {/* 7. Product Recommendations */}
          <ProductRecommendations currentProduct={product} allProducts={allProducts} />
        </div>
      </div>

      {/* Sticky Cart Bar for Mobile - With safe area support */}
      <StickyCartBar
        product={product}
        selectedQuantity={selectedQuantity}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}
