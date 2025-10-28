// components/product/ProductDetailClient.tsx - FINAL VERSION
'use client';

import { useState } from 'react';
import { Product } from '@/types';
import ProductGallery from './ProductGallery';
import ProductInfo from './ProductInfo';
import ProductHighlights from './ProductHighlights';
import SellerProfile from './SellerProfile';
import ReviewsSection from './ReviewsSection';
import SimilarProducts from './SimilarProducts';
import ShippingReturns from './ShippingReturns';
import StickyCartBar from './StickyCartBar';
import ProductDescription from './ProductDescription';

interface ProductDetailClientProps {
  product: Product;
  similarProducts: Product[];
}

export default function ProductDetailClient({ product, similarProducts }: ProductDetailClientProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const handleAddToCart = async () => {
    // Add to cart logic
    alert(`Agregado ${selectedQuantity} ${selectedQuantity === 1 ? 'unidad' : 'unidades'} al carrito`);
  };

  return (
    <>
      <div className="space-y-8">
        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-xl shadow-md p-6 lg:p-8">
          {/* Left: Gallery with videos support */}
          <ProductGallery 
            images={product.images} 
            videos={product.videos}
            productName={product.name} 
          />

          {/* Right: Product Info */}
          <ProductInfo
            product={product}
            selectedQuantity={selectedQuantity}
            onQuantityChange={setSelectedQuantity}
          />
        </div>

        {/* Description */}
        <ProductDescription 
          description={product.description}
          category={product.category}
          subcategory={product.subcategory}
          state={product.state}
        />

        {/* Product Highlights */}
        <ProductHighlights />

        {/* Shipping & Returns */}
        <ShippingReturns />

        {/* Enhanced Seller Profile */}
        <SellerProfile 
          maker={product.maker}
          verified={product.verified ?? false}
          state={product.state}
        />

        {/* Reviews Section */}
        {product.rating && product.reviewCount && (
          <ReviewsSection
            productId={typeof product.id === 'string' ? parseInt(product.id) : product.id}
            rating={product.rating}
            reviewCount={product.reviewCount}
          />
        )}

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <SimilarProducts products={similarProducts} category={product.category} />
        )}
      </div>

      {/* Sticky Cart Bar for Mobile */}
      <StickyCartBar 
        product={product}
        selectedQuantity={selectedQuantity}
        onAddToCart={handleAddToCart}
      />
    </>
  );
}