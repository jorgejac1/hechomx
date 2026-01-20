'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { loginSchema, type LoginInput } from '@/validators';
import { validate } from '@/validators/utils';
import { ROUTES } from '@/lib';
import Button from '@/components/common/Button';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import { Eye, EyeOff, Mail, Lock, AlertCircle, Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isAdmin, isLoading: authLoading } = useAuth();
  const [formData, setFormData] = useState<LoginInput>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string>('');

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      // Redirect admin to admin dashboard, regular users to home
      if (isAdmin) {
        router.replace(ROUTES.ADMIN);
      } else {
        router.replace(ROUTES.HOME);
      }
    }
  }, [isAuthenticated, isAdmin, authLoading, router]);

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
    setLoginError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Validate form
    const validation = validate(loginSchema, formData);
    if (!validation.success) {
      setErrors(validation.errors || {});
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await login(formData.email, formData.password);
      // Redirect will happen via useEffect based on isAdmin
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Inicia sesión en tu cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          ¿No tienes cuenta?{' '}
          <Link
            href={ROUTES.REGISTER}
            className="font-semibold text-primary-600 hover:text-primary-700"
          >
            Regístrate gratis
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10">
          {/* Demo credentials info */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm font-semibold text-blue-900 mb-2">🔐 Credenciales de prueba:</p>
            <div className="text-xs text-blue-800 space-y-2">
              <div className="pb-2 border-b border-blue-300">
                <p className="font-semibold flex items-center gap-1">
                  <Shield className="w-3 h-3 text-purple-600" />
                  Administrador:
                </p>
                <p>
                  <strong>Email:</strong> admin@papalote.com
                </p>
                <p>
                  <strong>Password:</strong> Admin123
                </p>
              </div>
              <div>
                <p className="font-semibold">Usuario Regular:</p>
                <p>
                  <strong>Email:</strong> juan@ejemplo.com
                </p>
                <p>
                  <strong>Password:</strong> Password123
                </p>
              </div>
              <div className="border-t border-blue-300 pt-2">
                <p className="font-semibold">Vendedor Individual:</p>
                <p>
                  <strong>Email:</strong> sofia@ejemplo.com
                </p>
                <p>
                  <strong>Password:</strong> Password123
                </p>
              </div>
              <div className="border-t border-blue-300 pt-2">
                <p className="font-semibold">Artesano:</p>
                <p>
                  <strong>Email:</strong> pedro@ejemplo.com
                </p>
                <p>
                  <strong>Password:</strong> Password123
                </p>
              </div>
              <div className="border-t border-blue-300 pt-2">
                <p className="font-semibold">Empresa:</p>
                <p>
                  <strong>Email:</strong> ventas@artesaniasdemexico.com
                </p>
                <p>
                  <strong>Password:</strong> Password123
                </p>
              </div>
            </div>
          </div>

          {/* Login error */}
          {loginError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{loginError}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  className={`block w-full pl-10 pr-3 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.email ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="tu@ejemplo.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
                  autoComplete="current-password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`block w-full pl-10 pr-10 py-2.5 border-2 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                    errors.password ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-sm"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
                  Recordarme
                </label>
              </div>

              <Link
                href={ROUTES.FORGOT_PASSWORD}
                className="text-sm font-semibold text-primary-600 hover:text-primary-700"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            {/* Submit button */}
            <Button type="submit" variant="primary" size="lg" fullWidth disabled={isLoading}>
              {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">¿Nuevo en Papalote Market?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link href={ROUTES.REGISTER}>
                <Button variant="outline" size="lg" fullWidth>
                  Crear cuenta nueva
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
