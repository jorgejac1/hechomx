import { Suspense } from 'react';
import { getAllProducts } from '@/lib/server';
import { getSubcategories, getSubSubcategories } from '@/lib/server';
import { capitalize } from '@/lib';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import SubcategoriesGrid from '@/components/product/SubcategoriesGrid';
import ScrollToTop from '@/components/common/ScrollToTop';
import QuickFilters from '@/components/product/QuickFilters';
import ProductsPageClient from '@/components/product/ProductsPageClient';
import ErrorBoundary from '@/components/common/feedback/ErrorBoundary';
import { generateProductsMetadata } from '@/lib/utils/seo';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{
    categoria?: string;
    estado?: string;
    q?: string;
    precio?: string;
    destacado?: string;
    verificado?: string;
    enstock?: string;
  }>;
}) {
  const params = await searchParams;
  const products = getAllProducts();

  const filters = {
    categories: params.categoria ? [params.categoria] : [],
    states: params.estado ? [params.estado] : [],
    priceMax: params.precio ? parseInt(params.precio) : undefined,
    featured: params.destacado === 'si',
    verified: params.verificado === 'si',
    inStock: params.enstock === 'si',
    query: params.q,
  };

  return generateProductsMetadata(filters, products.length);
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    categoria?: string;
    estado?: string;
    q?: string;
    ordenar?: string;
    subcategoria?: string;
    subsubcategoria?: string;
    precio?: string;
    destacado?: string;
    verificado?: string;
    enstock?: string;
  }>;
}) {
  const params = await searchParams;
  const products = getAllProducts();

  const subcategories = params.categoria ? getSubcategories(params.categoria) : [];
  const subSubcategories =
    params.categoria && params.subcategoria
      ? getSubSubcategories(params.categoria, params.subcategoria)
      : [];

  const breadcrumbItems = [{ label: 'Productos', href: '/productos' }];

  if (params.categoria) {
    breadcrumbItems.push({
      label: params.categoria,
      href: `/productos?categoria=${encodeURIComponent(params.categoria)}`,
    });
  }

  if (params.subcategoria) {
    const subcatUrl = new URLSearchParams();
    subcatUrl.set('categoria', params.categoria!);
    subcatUrl.set('subcategoria', params.subcategoria);

    breadcrumbItems.push({
      label: params.subcategoria
        .split('-')
        .map((w) => capitalize(w))
        .join(' '),
      href: `/productos?${subcatUrl.toString()}`,
    });
  }

  if (params.subsubcategoria) {
    const subsubcatUrl = new URLSearchParams();
    subsubcatUrl.set('categoria', params.categoria!);
    subsubcatUrl.set('subcategoria', params.subcategoria!);
    subsubcatUrl.set('subsubcategoria', params.subsubcategoria);

    breadcrumbItems.push({
      label: params.subsubcategoria
        .split('-')
        .map((w) => capitalize(w))
        .join(' '),
      href: `/productos?${subsubcatUrl.toString()}`,
    });
  }

  if (params.estado) {
    breadcrumbItems.push({
      label: params.estado,
      href: `/productos?estado=${encodeURIComponent(params.estado)}`,
    });
  }

  const getTitle = () => {
    if (params.q) return `Resultados para "${params.q}"`;
    if (params.subsubcategoria) {
      const name = params.subsubcategoria
        .split('-')
        .map((w) => capitalize(w))
        .join(' ');
      return `${name} - ${params.subcategoria
        ?.split('-')
        .map((w) => capitalize(w))
        .join(' ')}`;
    }
    if (params.subcategoria) {
      const name = params.subcategoria
        .split('-')
        .map((w) => capitalize(w))
        .join(' ');
      return `${name} - ${params.categoria}`;
    }
    if (params.categoria) return `Productos: ${params.categoria}`;
    if (params.estado) return `Productos de ${params.estado}`;
    return 'Todos los Productos';
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{getTitle()}</h1>
            <p className="text-gray-600">Descubre productos auténticos hechos en México</p>
          </div>

          {params.categoria && !params.subcategoria && subcategories.length > 0 && (
            <SubcategoriesGrid category={params.categoria} subcategories={subcategories} />
          )}

          {params.categoria &&
            params.subcategoria &&
            !params.subsubcategoria &&
            subSubcategories.length > 0 && (
              <SubcategoriesGrid
                category={params.categoria}
                subcategories={subSubcategories}
                currentSubcategory={params.subcategoria}
              />
            )}

          <QuickFilters />

          <Suspense fallback={<div className="animate-pulse h-96 bg-gray-200 rounded-xl" />}>
            <ProductsPageClient products={products} />
          </Suspense>
        </div>

        <ScrollToTop />
      </div>
    </ErrorBoundary>
  );
}
