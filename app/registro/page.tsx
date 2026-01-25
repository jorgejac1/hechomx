'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { registerSchema, type RegisterInput } from '@/validators';
import { validate } from '@/validators/utils';
import { ROUTES } from '@/lib';
import Button from '@/components/common/Button';
import TextInput from '@/components/common/TextInput';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import Alert from '@/components/common/Alert';
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User as UserIcon,
  AlertCircle,
  CheckCircle2,
  ShoppingBag,
  Palette,
} from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
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
      router.replace(returnTo || ROUTES.HOME);
    }
  }, [isAuthenticated, authLoading, router, returnTo]);

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
      // Success! Redirect to returnTo URL or home
      router.push(returnTo || ROUTES.HOME);
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

    return levels[strength] ?? { strength: 0, text: '', color: '' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">
          Crea tu cuenta gratis
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          ¿Ya tienes cuenta?{' '}
          <Link
            href={ROUTES.LOGIN}
            className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>

      <div className="mt-6 sm:mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-6 sm:py-8 px-4 sm:px-10 shadow-lg sm:rounded-xl">
          {/* User Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
              ¿Qué quieres hacer?
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setUserType('buyer')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  userType === 'buyer'
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="text-center">
                  <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-primary-600 dark:text-primary-400" />
                  <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">Comprar</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Productos artesanales
                  </p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setUserType('seller')}
                className={`p-4 rounded-lg border-2 transition-all ${
                  userType === 'seller'
                    ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="text-center">
                  <Palette className="w-8 h-8 mx-auto mb-2 text-primary-600 dark:text-primary-400" />
                  <p className="font-semibold text-sm text-gray-900 dark:text-gray-100">Vender</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Mis productos</p>
                </div>
              </button>
            </div>
          </div>

          {/* Register error */}
          {registerError && (
            <Alert variant="error" layout="bordered" icon={AlertCircle} className="mb-4">
              {registerError}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <TextInput
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              label="Tu nombre completo"
              placeholder="Ej: María González"
              leftIcon={<UserIcon className="h-5 w-5" />}
              error={errors.name}
            />

            {/* Email */}
            <TextInput
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              label="Correo electrónico"
              placeholder="tu@ejemplo.com"
              leftIcon={<Mail className="h-5 w-5" />}
              error={errors.email}
            />

            {/* Password */}
            <div>
              <TextInput
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                label="Contraseña"
                placeholder="••••••••"
                leftIcon={<Lock className="h-5 w-5" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-1 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                }
                error={errors.password}
              />

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
                            : 'bg-gray-200 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  {passwordStrength.text && (
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Seguridad: <span className="font-semibold">{passwordStrength.text}</span>
                    </p>
                  )}
                </div>
              )}

              {/* Password requirements */}
              <div className="mt-2 space-y-1">
                <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Tu contraseña debe tener:
                </p>
                <div className="space-y-1">
                  <p
                    className={`text-xs flex items-center gap-1 ${formData.password.length >= 8 ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {formData.password.length >= 8 ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600" />
                    )}
                    Mínimo 8 caracteres
                  </p>
                  <p
                    className={`text-xs flex items-center gap-1 ${/[A-Z]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {/[A-Z]/.test(formData.password) ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600" />
                    )}
                    Una letra mayúscula
                  </p>
                  <p
                    className={`text-xs flex items-center gap-1 ${/[a-z]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {/[a-z]/.test(formData.password) ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600" />
                    )}
                    Una letra minúscula
                  </p>
                  <p
                    className={`text-xs flex items-center gap-1 ${/[0-9]/.test(formData.password) ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}
                  >
                    {/[0-9]/.test(formData.password) ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <span className="w-3 h-3 rounded-full border border-gray-300 dark:border-gray-600" />
                    )}
                    Un número
                  </p>
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <TextInput
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
              label="Confirmar contraseña"
              placeholder="••••••••"
              leftIcon={<Lock className="h-5 w-5" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="p-1 hover:text-gray-600 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              }
              error={errors.confirmPassword}
            />

            {/* Terms acceptance */}
            <div>
              <div className="flex items-start">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded-sm mt-0.5 bg-white dark:bg-gray-700"
                />
                <label
                  htmlFor="acceptTerms"
                  className="ml-2 block text-sm text-gray-700 dark:text-gray-300"
                >
                  Acepto los{' '}
                  <Link
                    href="/terminos"
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
                  >
                    términos y condiciones
                  </Link>{' '}
                  y la{' '}
                  <Link
                    href="/privacidad"
                    className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold"
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
            <Alert variant="info" layout="bordered" className="mt-6">
              <span className="font-semibold">Para vendedores:</span> Después de crear tu cuenta,
              podrás publicar tus productos y empezar a vender.
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
