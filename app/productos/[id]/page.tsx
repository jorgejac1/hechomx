import { Suspense } from 'react';
import Script from 'next/script';
import { getProductById, getAllProducts } from '@/lib/server';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { notFound } from 'next/navigation';
import ProductDetailClient from '@/components/product/ProductDetailClient';
import { Product } from '@/types';
import { generateProductJsonLd, generateBreadcrumbJsonLd } from '@/config/seo';

export const dynamic = 'force-dynamic';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface ProductDetailWrapperProps {
  product: Product;
  similarProducts: Product[];
  breadcrumbItems: BreadcrumbItem[];
  productJsonLd: ReturnType<typeof generateProductJsonLd>;
  breadcrumbJsonLd: ReturnType<typeof generateBreadcrumbJsonLd>;
}

// Keep or remove generateStaticParams - doesn't matter with force-dynamic
export async function generateStaticParams() {
  const products = getAllProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    return {
      title: 'Producto no encontrado',
    };
  }

  return {
    title: `${product.name} - Papalote Market`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images[0]],
    },
  };
}

// Create a wrapper component that handles Suspense
function ProductDetailWrapper({
  product,
  similarProducts,
  breadcrumbItems,
  productJsonLd,
  breadcrumbJsonLd,
}: ProductDetailWrapperProps) {
  return (
    <>
      <Script
        id="product-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumbs items={breadcrumbItems} />
          </div>
        </div>

        <ProductDetailClient product={product} similarProducts={similarProducts} />
      </div>
    </>
  );
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const allProducts = getAllProducts();
  const similarProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Inicio', href: '/' },
    { label: 'Productos', href: '/productos' },
    {
      label: product.category,
      href: `/productos?category=${encodeURIComponent(product.category)}`,
    },
    { label: product.name },
  ];

  // Generate JSON-LD structured data
  const productJsonLd = generateProductJsonLd({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    currency: 'MXN',
    images: product.images,
    rating: product.rating,
    reviewCount: product.reviewCount,
    inStock: (product.stock ?? 0) > 0,
  });

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(breadcrumbItems);

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="animate-pulse space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl" />
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-sm w-3/4" />
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-sm w-1/2" />
                  <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    >
      <ProductDetailWrapper
        product={product}
        similarProducts={similarProducts}
        breadcrumbItems={breadcrumbItems}
        productJsonLd={productJsonLd}
        breadcrumbJsonLd={breadcrumbJsonLd}
      />
    </Suspense>
  );
}
