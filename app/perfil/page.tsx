'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { updateProfileSchema, type UpdateProfileInput } from '@/validators';
import { validate } from '@/validators/utils';
import { ROUTES } from '@/lib';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import SellerSetupForm from '@/components/profile/SellerSetupForm';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Camera,
  Edit2,
  Save,
  X,
  LogOut,
  Package,
  Heart,
  Settings,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
  Store,
} from 'lucide-react';
import { formatRelativeTime } from '@/lib';

interface MakerProfileData {
  shopName: string;
  location: string;
  description: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  const [showSellerSetup, setShowSellerSetup] = useState(false);
  const [formData, setFormData] = useState<Omit<UpdateProfileInput, 'avatar'>>({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || undefined,
  });

  // Redirect if not authenticated
  if (!isAuthenticated && !isLoading) {
    router.push(ROUTES.LOGIN);
    return null;
  }

  // Show loading
  if (isLoading || !user) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando tu perfil..." />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || undefined,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setSuccessMessage('');
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone || undefined,
    });
    setIsEditing(false);
    setErrors({});
    setSuccessMessage('');
  };

  const handleSave = async () => {
    setSuccessMessage('');

    // Validate
    const validation = validate(updateProfileSchema, formData);

    if (!validation.success) {
      setErrors(validation.errors || {});
      return;
    }

    setIsSaving(true);
    setErrors({});

    try {
      await updateProfile(formData);
      setIsEditing(false);
      setSuccessMessage('¡Perfil actualizado correctamente! ✓');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      setErrors({
        _form: error instanceof Error ? error.message : 'Error al actualizar el perfil',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveSellerProfile = async (data: MakerProfileData) => {
    // Mock: In real app, this would call API to save seller profile
    await (updateProfile as (data: unknown) => Promise<void>)({
      ...formData,
      makerProfile: {
        shopName: data.shopName,
        location: data.location,
        description: data.description,
        verified: false,
        stats: {
          productsCount: 0,
          rating: 0,
          salesCount: 0,
        },
      },
    });
    setShowSellerSetup(false);
    setSuccessMessage('¡Tienda activada correctamente! ✓');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleLogout = () => {
    if (confirm('¿Estás seguro que quieres cerrar sesión?')) {
      logout();
    }
  };

  const memberSince = user.createdAt ? formatRelativeTime(user.createdAt) : 'Recientemente';

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Mi Perfil</h1>
          <p className="text-gray-600 mt-1">Administra tu información personal</p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
            <p className="text-sm text-green-800 font-medium">{successMessage}</p>
          </div>
        )}

        {/* Error Message */}
        {errors._form && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-800">{errors._form}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* Avatar */}
              <div className="flex flex-col items-center">
                <div className="relative">
                  {user.avatar ? (
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-primary-100"
                    />
                  ) : (
                    <div className="w-28 h-28 sm:w-32 sm:h-32 bg-primary-100 rounded-full flex items-center justify-center border-4 border-primary-200">
                      <User className="w-12 h-12 sm:w-16 sm:h-16 text-primary-600" />
                    </div>
                  )}
                  <button
                    className="absolute bottom-0 right-0 bg-primary-600 text-white p-2 rounded-full shadow-lg hover:bg-primary-700 transition"
                    title="Cambiar foto"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <h2 className="mt-4 text-xl font-bold text-gray-900 text-center">{user.name}</h2>
                <p className="text-sm text-gray-600 text-center">{user.email}</p>

                <div className="mt-3 px-3 py-1 bg-primary-50 rounded-full">
                  <p className="text-xs font-medium text-primary-700 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Miembro desde {memberSince}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 space-y-2">
                {user.makerProfile && (
                  <>
                    <button
                      onClick={() => router.push(ROUTES.DASHBOARD)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg bg-primary-50 hover:bg-primary-100 transition text-left text-primary-700 font-medium border-2 border-primary-200"
                    >
                      <TrendingUp className="w-5 h-5 text-primary-600" />
                      Dashboard de Ventas
                    </button>
                    <button
                      onClick={() => router.push('/perfil/vendedor')}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-left text-gray-700 font-medium"
                    >
                      <Store className="w-5 h-5 text-gray-600" />
                      Perfil de Vendedor
                    </button>
                  </>
                )}
                <button
                  onClick={() => router.push(ROUTES.ORDERS)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-left text-gray-700 font-medium"
                >
                  <Package className="w-5 h-5 text-gray-600" />
                  Mis Pedidos
                </button>
                <button
                  onClick={() => router.push(ROUTES.WISHLIST)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-left text-gray-700 font-medium"
                >
                  <Heart className="w-5 h-5 text-gray-600" />
                  Favoritos
                </button>
                <button
                  onClick={() => router.push('/configuracion')}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition text-left text-gray-700 font-medium"
                >
                  <Settings className="w-5 h-5 text-gray-600" />
                  Configuración
                </button>
              </div>

              {/* Logout Button */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition font-medium border-2 border-red-200"
                >
                  <LogOut className="w-5 h-5" />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Profile Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Information Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Información Personal</h3>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleCancel}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium text-sm disabled:opacity-50"
                    >
                      <X className="w-4 h-4" />
                      Cancelar
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <LoadingSpinner size="sm" color="white" />
                          Guardando...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Guardar
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Nombre completo
                  </label>
                  {isEditing ? (
                    <>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base ${
                            errors.name ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      {errors.name && (
                        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.name}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <User className="w-5 h-5 text-gray-500" />
                      <p className="text-gray-900 font-medium">{user.name}</p>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Correo electrónico
                  </label>
                  {isEditing ? (
                    <>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base ${
                            errors.email ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="tu@ejemplo.com"
                        />
                      </div>
                      {errors.email && (
                        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.email}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Mail className="w-5 h-5 text-gray-500" />
                      <p className="text-gray-900 font-medium">{user.email}</p>
                    </div>
                  )}
                </div>

                {/* Phone (Optional) */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Teléfono <span className="text-gray-500 font-normal">(opcional)</span>
                  </label>
                  {isEditing ? (
                    <>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone || ''}
                          onChange={handleChange}
                          className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base ${
                            errors.phone ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="55 1234 5678"
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {errors.phone}
                        </p>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Phone className="w-5 h-5 text-gray-500" />
                      <p className="text-gray-900 font-medium">{user.phone || 'No registrado'}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Seller Profile Card */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Perfil de Vendedor</h3>
                  <p className="text-sm text-gray-600 mt-1">Información de tu tienda o taller</p>
                </div>
                {user.makerProfile ? (
                  <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Activo
                  </span>
                ) : (
                  <button
                    onClick={() => setShowSellerSetup(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium text-sm"
                  >
                    Activar Tienda
                  </button>
                )}
              </div>

              {user.makerProfile ? (
                // Show existing maker profile
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl font-bold text-primary-700">
                        {user.makerProfile.shopName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900">{user.makerProfile.shopName}</h4>
                        {user.makerProfile.verified && (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{user.makerProfile.location}</p>
                      <p className="text-sm text-gray-700 mt-2">{user.makerProfile.description}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">
                        {user.makerProfile.stats.productsCount}+
                      </p>
                      <p className="text-sm text-gray-600">Productos</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">
                        {user.makerProfile.stats.rating}
                      </p>
                      <p className="text-sm text-gray-600">Calificación</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-2xl font-bold text-gray-900">
                        {user.makerProfile.stats.salesCount}+
                      </p>
                      <p className="text-sm text-gray-600">Ventas</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowSellerSetup(true)}
                    className="w-full flex items-center justify-center gap-2 p-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition font-medium text-gray-700"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar Información de Tienda
                  </button>
                </div>
              ) : (
                // Show activation prompt
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      className="w-8 h-8 text-primary-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">
                    ¿Quieres vender tus productos?
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Activa tu tienda y comienza a vender artesanías mexicanas
                  </p>
                  <button
                    onClick={() => setShowSellerSetup(true)}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium"
                  >
                    Activar Mi Tienda
                  </button>
                </div>
              )}
            </div>

            {/* Help Card for less tech-savvy users */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">💡 Ayuda</h3>
              <div className="space-y-2 text-sm text-blue-800">
                <p>
                  <strong>¿Necesitas cambiar algo?</strong> Haz clic en "Editar" para modificar tu
                  información.
                </p>
                <p>
                  <strong>¿Olvidaste tu contraseña?</strong> Puedes cambiarla desde la
                  configuración.
                </p>
                <p>
                  <strong>¿Tienes problemas?</strong> Contáctanos y te ayudaremos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seller Setup Modal */}
      {showSellerSetup && (
        <SellerSetupForm
          onClose={() => setShowSellerSetup(false)}
          onSave={handleSaveSellerProfile}
        />
      )}
    </div>
  );
}
