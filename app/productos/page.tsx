import { Suspense } from 'react';
import { getAllProducts, getCategories, getStates } from '@/lib/products';
import { getSubcategories, getSubSubcategories } from '@/lib/subcategories';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import SubcategoriesGrid from '@/components/product/SubcategoriesGrid';
import ScrollToTop from '@/components/common/ScrollToTop';
import QuickFilters from '@/components/product/QuickFilters';
import ProductsPageClient from '@/components/product/ProductsPageClient';
import { Product } from '@/types';

const ITEMS_PER_PAGE = 20;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ 
    categoria?: string; 
    estado?: string; 
    q?: string; 
    ordenar?: string;
    pagina?: string;
    subcategoria?: string;
    subsubcategoria?: string;
    precio?: string;
    destacado?: string;
    verificado?: string;
  }>;
}) {
  const params = await searchParams;
  let products = getAllProducts();
  const categories = getCategories();
  const states = getStates();
  
  // Get subcategories based on current level
  const subcategories = params.categoria ? getSubcategories(params.categoria) : [];
  const subSubcategories = params.categoria && params.subcategoria 
    ? getSubSubcategories(params.categoria, params.subcategoria) 
    : [];

  // Filter by search query if provided
  if (params.q) {
    const query = params.q.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.state.toLowerCase().includes(query) ||
        p.maker.toLowerCase().includes(query)
    );
  }

  // Filter by category if provided
  if (params.categoria) {
    products = products.filter(
      (p) => p.category.toLowerCase() === params.categoria?.toLowerCase()
    );
  }

  // Filter by subcategory if provided
  if (params.subcategoria) {
    products = products.filter(
      (p) => p.subcategory?.toLowerCase() === params.subcategoria?.toLowerCase()
    );
  }

  // Filter by sub-subcategory if provided
  if (params.subsubcategoria) {
    products = products.filter(
      (p) => p.subSubcategory?.toLowerCase() === params.subsubcategoria?.toLowerCase()
    );
  }

  // Filter by state if provided
  if (params.estado) {
    products = products.filter(
      (p) => p.state.toLowerCase() === params.estado?.toLowerCase()
    );
  }

  // Filter by price
  if (params.precio) {
    const maxPrice = parseInt(params.precio);
    products = products.filter((p) => p.price <= maxPrice);
  }

  // Filter by featured
  if (params.destacado === 'si') {
    products = products.filter((p) => p.featured);
  }

  // Filter by verified
  if (params.verificado === 'si') {
    products = products.filter((p) => p.verified);
  }

  // Sort products based on ordenar parameter
  const sortProducts = (products: Product[], sortBy: string = 'featured'): Product[] => {
    const sorted = [...products];
    
    switch (sortBy) {
      case 'price-asc':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return sorted.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return sorted.sort((a, b) => a.name.localeCompare(b.name, 'es'));
      case 'name-desc':
        return sorted.sort((a, b) => b.name.localeCompare(a.name, 'es'));
      case 'newest':
        return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
      case 'featured':
      default:
        return sorted.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.price - b.price;
        });
    }
  };

  products = sortProducts(products, params.ordenar);

  // Pagination
  const currentPage = parseInt(params.pagina || '1', 10);
  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const paginatedProducts = products.slice(startIndex, endIndex);

  // Build breadcrumbs dynamically with hierarchy
  const breadcrumbItems = [{ label: 'Productos', href: '/productos' }];
  
  if (params.categoria) {
    breadcrumbItems.push({
      label: params.categoria,
      href: `/productos?categoria=${encodeURIComponent(params.categoria)}`
    });
  }
  
  if (params.subcategoria) {
    const subcatUrl = new URLSearchParams();
    subcatUrl.set('categoria', params.categoria!);
    subcatUrl.set('subcategoria', params.subcategoria);
    
    breadcrumbItems.push({
      label: params.subcategoria.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      href: `/productos?${subcatUrl.toString()}`
    });
  }

  if (params.subsubcategoria) {
    const subsubcatUrl = new URLSearchParams();
    subsubcatUrl.set('categoria', params.categoria!);
    subsubcatUrl.set('subcategoria', params.subcategoria!);
    subsubcatUrl.set('subsubcategoria', params.subsubcategoria);
    
    breadcrumbItems.push({
      label: params.subsubcategoria.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      href: `/productos?${subsubcatUrl.toString()}`
    });
  }
  
  if (params.estado) {
    breadcrumbItems.push({
      label: params.estado,
      href: `/productos?estado=${encodeURIComponent(params.estado)}`
    });
  }

  // Build dynamic title
  const getTitle = () => {
    if (params.q) return `Resultados para "${params.q}"`;
    if (params.subsubcategoria) {
      const name = params.subsubcategoria.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      return `${name} - ${params.subcategoria?.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}`;
    }
    if (params.subcategoria) {
      const name = params.subcategoria.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      return `${name} - ${params.categoria}`;
    }
    if (params.categoria) return `Productos: ${params.categoria}`;
    if (params.estado) return `Productos de ${params.estado}`;
    return 'Todos los Productos';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getTitle()}
          </h1>
          <p className="text-gray-600">
            Descubre productos auténticos hechos en México
          </p>
        </div>

        {/* First level subcategories - Only show if category selected and no subcategory */}
        {params.categoria && !params.subcategoria && subcategories.length > 0 && (
          <SubcategoriesGrid 
            category={params.categoria} 
            subcategories={subcategories} 
          />
        )}

        {/* Second level subcategories - Only show if subcategory selected and has children */}
        {params.categoria && params.subcategoria && !params.subsubcategoria && subSubcategories.length > 0 && (
          <SubcategoriesGrid 
            category={params.categoria}
            subcategories={subSubcategories}
            currentSubcategory={params.subcategoria}
          />
        )}

        {/* Quick Filters */}
        <Suspense fallback={<div className="h-12" />}>
          <QuickFilters />
        </Suspense>
        {/* Filters, View Toggle, Products Grid - Client Component */}
        <Suspense fallback={<div className="animate-pulse h-96 bg-gray-200 rounded-xl" />}>
          <ProductsPageClient
            products={products}
            paginatedProducts={paginatedProducts}
            categories={categories}
            states={states}
            currentCategory={params.categoria}
            currentState={params.estado}
            currentQuery={params.q}
            currentSort={params.ordenar}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </Suspense>
      </div>
      
      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}