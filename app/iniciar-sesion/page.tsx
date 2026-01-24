'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { loginSchema, type LoginInput } from '@/validators';
import { validate } from '@/validators/utils';
import { ROUTES } from '@/lib';
import Button from '@/components/common/Button';
import TextInput from '@/components/common/TextInput';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import Alert from '@/components/common/Alert';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-gray-100">
          Inicia sesión en tu cuenta
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          ¿No tienes cuenta?{' '}
          <Link
            href={ROUTES.REGISTER}
            className="font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
          >
            Regístrate gratis
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow-lg sm:rounded-xl sm:px-10">
          {/* Demo credentials info */}
          <Alert variant="info" layout="bordered" className="mb-6">
            <p className="text-sm font-semibold mb-2">🔐 Credenciales de prueba:</p>
            <div className="text-xs space-y-2">
              {/* Admin credentials hidden in production
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
              */}
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
          </Alert>

          {/* Login error */}
          {loginError && (
            <Alert variant="error" layout="bordered" icon={AlertCircle} className="mb-4">
              {loginError}
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
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
            <TextInput
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
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
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              }
              error={errors.password}
            />

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 dark:border-gray-600 rounded-sm bg-white dark:bg-gray-700"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
                >
                  Recordarme
                </label>
              </div>

              <Link
                href={ROUTES.FORGOT_PASSWORD}
                className="text-sm font-semibold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
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
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                  ¿Nuevo en Papalote Market?
                </span>
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
