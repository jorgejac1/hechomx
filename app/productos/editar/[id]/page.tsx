'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Edit3, ArrowLeft, Loader2 } from 'lucide-react';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import ProductForm from '@/components/product/ProductForm';
import { useToast } from '@/contexts/ToastContext';
import { ROUTES } from '@/lib/constants/routes';
import { getProductById } from '@/lib/data/products';
import { getDraftProducts } from '@/lib/utils/products';
import type { User } from '@/contexts/AuthContext';
import type { ProductFormData, Product } from '@/types/product';
import Link from 'next/link';

export default function EditProductPage() {
  return (
    <AuthPageWrapper requireSeller loadingText="Cargando producto...">
      {(user) => <EditProductContent user={user} />}
    </AuthPageWrapper>
  );
}

function EditProductContent({ user }: { user: User }) {
  const params = useParams();
  const router = useRouter();
  const { showToast } = useToast();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadProduct = () => {
      // First, try to find in published products
      const publishedProduct = getProductById(productId);

      if (publishedProduct) {
        setProduct(publishedProduct);
        setLoading(false);
        return;
      }

      // Then, try to find in draft products (localStorage)
      if (user?.email) {
        const drafts = getDraftProducts(user.email);
        const draftProduct = drafts.find((d) => d.id === productId);

        if (draftProduct) {
          setProduct({
            id: draftProduct.id,
            name: draftProduct.name,
            description: draftProduct.description || '',
            price: draftProduct.price,
            currency: 'MXN',
            category: draftProduct.category,
            subcategory: draftProduct.subcategory || '',
            state: '',
            maker: user.makerProfile?.shopName || '',
            images: draftProduct.images,
            inStock: (draftProduct.stock || 0) > 0,
            featured: false,
            verified: user.makerProfile?.verified || false,
            rating: 0,
            reviewCount: 0,
            materials: draftProduct.materials || [],
            careInstructions: draftProduct.careInstructions ? [draftProduct.careInstructions] : [],
            features: [],
            status: draftProduct.status,
            stock: draftProduct.stock,
            tags: draftProduct.tags || [],
          });
          setLoading(false);
          return;
        }
      }

      // Also check seller's mock products
      if (user?.makerProfile?.products) {
        const sellerProduct = user.makerProfile.products.find((p) => p.id === productId);

        if (sellerProduct) {
          setProduct({
            id: sellerProduct.id,
            name: sellerProduct.name,
            description: '',
            price: sellerProduct.price,
            currency: 'MXN',
            category: '',
            subcategory: '',
            state: '',
            maker: user.makerProfile.shopName,
            images: [sellerProduct.image],
            inStock: sellerProduct.stock > 0,
            featured: false,
            verified: true,
            rating: 0,
            reviewCount: 0,
            materials: [],
            careInstructions: [],
            features: [],
            stock: sellerProduct.stock,
          });
          setLoading(false);
          return;
        }
      }

      // Product not found
      setNotFound(true);
      setLoading(false);
    };

    loadProduct();
  }, [productId, user?.email, user?.makerProfile]);

  const handleSubmit = async (data: ProductFormData) => {
    console.log('Updating product:', productId, data);

    // TODO: Update product in backend/database
    // For now, simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    showToast('¡Producto actualizado exitosamente!', 'success');
    router.push(ROUTES.DASHBOARD);
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  // Not found state
  if (notFound || !product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-md p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h1>
            <p className="text-gray-600 mb-6">
              El producto que buscas no existe o no tienes permisos para editarlo.
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href={ROUTES.DASHBOARD}
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
              >
                <ArrowLeft className="w-5 h-5" />
                Volver al Dashboard
              </Link>
              <Link
                href={ROUTES.PRODUCT_CREATE}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
              >
                Crear Producto Nuevo
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Parse dimensions - products.json has string values like "25 cm"
  const parseDimensions = () => {
    if (!product.dimensions) {
      return { length: 0, width: 0, height: 0, unit: 'cm' as const };
    }

    const dims = product.dimensions;
    const parseNum = (val: string | number | undefined): number => {
      if (typeof val === 'number') return val;
      if (typeof val === 'string') {
        const match = val.match(/[\d.]+/);
        return match ? parseFloat(match[0]) : 0;
      }
      return 0;
    };

    return {
      length: parseNum(dims.length),
      width: parseNum(dims.width),
      height: parseNum(dims.height),
      unit: 'cm' as const,
    };
  };

  // Convert product to form data format
  const initialData: Partial<ProductFormData> & { id: string } = {
    id: product.id,
    name: product.name,
    category: product.category,
    subcategory: product.subcategory || '',
    price: product.price,
    description: product.description,
    images: product.images,
    stock: product.stock || (product.inStock ? 10 : 0),
    status: product.status || 'published',
    materials: product.materials || [],
    dimensions: parseDimensions(),
    careInstructions: Array.isArray(product.careInstructions)
      ? product.careInstructions.join('\n')
      : '',
    tags: product.tags || [],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={ROUTES.DASHBOARD}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Dashboard
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Edit3 className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Editar Producto</h1>
          </div>
          <p className="text-gray-600">
            Modifica la información de <span className="font-semibold">{product.name}</span>
          </p>
        </div>

        {/* Product Form */}
        <ProductForm
          initialData={initialData}
          onSubmit={handleSubmit}
          submitLabel="Guardar Cambios"
          isEditing={true}
        />
      </div>
    </div>
  );
}
