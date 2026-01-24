'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import { useToast } from '@/contexts/ToastContext';
import { ROUTES } from '@/lib/constants/routes';
import ProductForm from '@/components/product/ProductForm';
import type { User } from '@/contexts/AuthContext';
import type { ProductFormData, DraftProduct } from '@/types/product';
import {
  savePublishedProduct,
  generateProductId,
  getDuplicateProduct,
  clearDuplicateProduct,
} from '@/lib/utils/products';
import { Plus, Store, AlertCircle } from 'lucide-react';
import Alert from '@/components/common/Alert';

export default function CreateProductPage() {
  return (
    <AuthPageWrapper loadingText="Cargando...">
      {(user) => <CreateProductContent user={user} />}
    </AuthPageWrapper>
  );
}

function CreateProductContent({ user }: { user: User }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [showQuickSetup, setShowQuickSetup] = useState(false);
  const [shopName, setShopName] = useState('');
  const [location, setLocation] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [initialData, setInitialData] = useState<Partial<ProductFormData> | undefined>(undefined);
  const [isDuplicate, setIsDuplicate] = useState(false);

  // Check for duplicate product data and quick setup
  useEffect(() => {
    if (!user.makerProfile) {
      setShowQuickSetup(true);
    }

    // Check for duplicate product data
    const duplicateData = getDuplicateProduct();
    if (duplicateData) {
      setInitialData(duplicateData as Partial<ProductFormData>);
      setIsDuplicate(true);
      clearDuplicateProduct(); // Clear after loading
    }
  }, [user.makerProfile]);

  const handleQuickSetup = () => {
    if (!shopName.trim() || !location.trim()) {
      showToast('Por favor completa el nombre de la tienda y ubicación', 'error');
      return;
    }

    // TODO: Create minimal makerProfile
    console.log('Quick setup:', { shopName, location, shopDescription });

    // For now, just close the modal and show the form
    setShowQuickSetup(false);
    showToast('¡Tienda activada! Ahora puedes crear tu producto.', 'success');
  };

  const handleSubmit = async (data: ProductFormData) => {
    try {
      // Create the product object with all required fields
      const productId = generateProductId();
      const now = new Date().toISOString();
      const sellerName = user.makerProfile?.shopName || shopName || user.name || 'Vendedor';

      const product: DraftProduct = {
        ...data,
        id: productId,
        createdAt: now,
        updatedAt: now,
        sellerId: user.email,
        sellerName,
        status: 'published',
      };

      // Save to localStorage
      savePublishedProduct(product);

      console.log('[CreateProduct] Product saved:', product);

      showToast('¡Producto publicado exitosamente!', 'success');
      router.push(ROUTES.DASHBOARD);
    } catch (error) {
      console.error('[CreateProduct] Error saving product:', error);
      showToast('Error al publicar el producto. Intenta de nuevo.', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Plus className="w-8 h-8 text-primary-600 dark:text-primary-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {isDuplicate ? 'Duplicar Producto' : 'Crear Nuevo Producto'}
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            {isDuplicate
              ? 'Estás creando una copia. Modifica los detalles según necesites.'
              : 'Completa la información de tu producto para publicarlo en tu tienda'}
          </p>
        </div>

        {/* Quick Setup Modal */}
        {showQuickSetup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <Store className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Activa Tu Tienda
                </h2>
              </div>

              <Alert
                variant="info"
                layout="bordered"
                icon={AlertCircle}
                title="Configuración Rápida"
                className="mb-6"
              >
                Necesitas activar tu tienda antes de crear productos. Solo tomará un momento.
              </Alert>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Nombre de tu Tienda *
                  </label>
                  <input
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="Ej: Artesanías María"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Ubicación *
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ej: Oaxaca, México"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Descripción Breve (Opcional)
                  </label>
                  <textarea
                    value={shopDescription}
                    onChange={(e) => setShopDescription(e.target.value)}
                    rows={3}
                    placeholder="Ej: Artesanías tradicionales de Oaxaca"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg resize-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <Link
                  href={ROUTES.HOME}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold text-center"
                >
                  Cancelar
                </Link>
                <button
                  onClick={handleQuickSetup}
                  className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
                >
                  Activar Tienda
                </button>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                Puedes completar más detalles de tu tienda después desde tu perfil
              </p>
            </div>
          </div>
        )}

        {/* Product Form */}
        {!showQuickSetup && <ProductForm onSubmit={handleSubmit} initialData={initialData} />}
      </div>
    </div>
  );
}
