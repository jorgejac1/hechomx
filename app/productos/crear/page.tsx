'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import { useToast } from '@/contexts/ToastContext';
import { ROUTES } from '@/lib/constants/routes';
import ProductForm from '@/components/product/ProductForm';
import type { User } from '@/contexts/AuthContext';
import { ProductFormData } from '@/types/product';
import { Plus, Store, AlertCircle } from 'lucide-react';

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

  // Check if user needs quick setup after component mounts
  useEffect(() => {
    if (!user.makerProfile) {
      setShowQuickSetup(true);
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
    console.log('Product data:', data);

    // TODO: Save product to backend/database

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    showToast('¡Producto publicado exitosamente!', 'success');
    router.push(ROUTES.DASHBOARD);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Plus className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900">Crear Nuevo Producto</h1>
          </div>
          <p className="text-gray-600">
            Completa la información de tu producto para publicarlo en tu tienda
          </p>
        </div>

        {/* Quick Setup Modal */}
        {showQuickSetup && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
              <div className="flex items-center gap-3 mb-4">
                <Store className="w-8 h-8 text-primary-600" />
                <h2 className="text-2xl font-bold text-gray-900">Activa Tu Tienda</h2>
              </div>

              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-blue-900">Configuración Rápida</p>
                    <p className="text-sm text-blue-800">
                      Necesitas activar tu tienda antes de crear productos. Solo tomará un momento.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nombre de tu Tienda *
                  </label>
                  <input
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="Ej: Artesanías María"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Ubicación *
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Ej: Oaxaca, México"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Descripción Breve (Opcional)
                  </label>
                  <textarea
                    value={shopDescription}
                    onChange={(e) => setShopDescription(e.target.value)}
                    rows={3}
                    placeholder="Ej: Artesanías tradicionales de Oaxaca"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => router.push(ROUTES.HOME)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleQuickSetup}
                  className="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-semibold"
                >
                  Activar Tienda
                </button>
              </div>

              <p className="text-xs text-gray-500 mt-4 text-center">
                Puedes completar más detalles de tu tienda después desde tu perfil
              </p>
            </div>
          </div>
        )}

        {/* Product Form */}
        {!showQuickSetup && <ProductForm onSubmit={handleSubmit} />}
      </div>
    </div>
  );
}
