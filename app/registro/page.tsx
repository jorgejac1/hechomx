'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { registerSchema, type RegisterInput } from '@/validators';
import { validate } from '@/validators/utils';
import { ROUTES } from '@/lib';
import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import { Eye, EyeOff, Mail, Lock, User as UserIcon, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState<RegisterInput>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registerError, setRegisterError] = useState<string>('');
  const [userType, setUserType] = useState<'buyer' | 'seller'>('buyer');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.replace(ROUTES.HOME);
    }
  }, [isAuthenticated, authLoading, router]);

  // Show loading while checking auth
  if (authLoading) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando..." />;
  }

  // Don't render form if authenticated
  if (isAuthenticated) {
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    setRegisterError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    // Validate form
    const validation = validate(registerSchema, formData);
    if (!validation.success) {
      setErrors(validation.errors || {});
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await register(formData.name, formData.email, formData.password);
      // Success! Redirect to home
      router.push(ROUTES.HOME);
    } catch (error) {
      setRegisterError(error instanceof Error ? error.message : 'Error al crear la cuenta');
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    if (!password) return { strength: 0, text: '', color: '' };
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, text: '', color: '' },
      { strength: 1, text: 'Débil', color: 'bg-red-500' },
      { strength: 2, text: 'Regular', color: 'bg-yellow-500' },
      { strength: 3, text: 'Buena', color: 'bg-blue-500' },
      { strength: 4, text: 'Excelente', color: 'bg-green-500' },
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-bold text-gray-900">
          Crea tu cuenta gratis
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <Link
            href={ROUTES.LOGIN}
            className="font-semibold text-primary-600 hover:text-primary-700"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>

      <div className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 sm:py-8 px-4 sm:px-10 shadow-lg sm:rounded-xl">
          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              ¿Qué quieres hacer?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType('buyer')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  userType === 'buyer'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <span className="text-2xl mb-2 block">🛍️</span>
                  <p className="font-semibold text-sm">Comprar</p>
                  <p className="text-xs text-gray-600 mt-1">Productos artesanales</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setUserType('seller')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  userType === 'seller'
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <span className="text-2xl mb-2 block">🎨</span>
                  <p className="font-semibold text-sm">Vender</p>
                  <p className="text-xs text-gray-600 mt-1">Mis productos</p>
                </div>
              </button>
            </div>
          </div>

          {/* Register error */}
          {registerError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{registerError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-900 mb-2">
                Tu nombre completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-3 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Ej: María González"
                />
              </div>
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
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
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>

              {/* Password strength indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`h-1 flex-1 rounded-full ${
                          level <= passwordStrength.strength
                            ? passwordStrength.color
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  {passwordStrength.text && (
                    <p className="text-xs text-gray-600">
                      Seguridad: <span className="font-semibold">{passwordStrength.text}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Password requirements */}
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-600 font-medium">Tu contraseña debe tener:</p>
                <div className="space-y-1">
                  <p
                    className={`text-xs flex items-center gap-1 ${formData.password.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}
                  >
                    {formData.password.length >= 8 ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-gray-300" />
                    )}
                    Mínimo 8 caracteres
                  </p>
                  <p
                    className={`text-xs flex items-center gap-1 ${/[A-Z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}
                  >
                    {/[A-Z]/.test(formData.password) ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-gray-300" />
                    )}
                    Una letra mayúscula
                  </p>
                  <p
                    className={`text-xs flex items-center gap-1 ${/[a-z]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}
                  >
                    {/[a-z]/.test(formData.password) ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-gray-300" />
                    )}
                    Una letra minúscula
                  </p>
                  <p
                    className={`text-xs flex items-center gap-1 ${/[0-9]/.test(formData.password) ? 'text-green-600' : 'text-gray-500'}`}
                  >
                    {/[0-9]/.test(formData.password) ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-gray-300" />
                    )}
                    Un número
                  </p>
                </div>
              </div>

              {errors.password && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-gray-900 mb-2"
              >
                Confirmar contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-3 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-base ${
                    errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms acceptance */}
            <div>
              <div className="flex items-start">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-sm mt-0.5"
                />
                <label htmlFor="acceptTerms" className="ml-2 block text-sm text-gray-700">
                  Acepto los{' '}
                  <Link
                    href="/terminos"
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    términos y condiciones
                  </Link>{' '}
                  y la{' '}
                  <Link
                    href="/privacidad"
                    className="text-primary-600 hover:text-primary-700 font-semibold"
                  >
                    política de privacidad
                  </Link>
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="mt-1.5 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.acceptTerms}
                </p>
              )}
            </div>

            {/* Submit button */}
            <Button type="submit" variant="primary" size="lg" fullWidth disabled={isLoading}>
              {isLoading ? 'Creando cuenta...' : 'Crear cuenta gratis'}
            </Button>
          </form>

          {/* Info box for sellers */}
          {userType === 'seller' && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">💡 Para vendedores:</span> Después de crear tu
                cuenta, podrás publicar tus productos y empezar a vender.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
