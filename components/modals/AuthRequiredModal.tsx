'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { loginSchema, type LoginInput } from '@/validators';
import { validate } from '@/validators/utils';
import { ROUTES } from '@/lib';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';
import TextInput from '@/components/common/TextInput';
import Alert from '@/components/common/Alert';
import { Eye, EyeOff, Mail, Lock, AlertCircle, ShoppingBag, UserPlus } from 'lucide-react';

interface AuthRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  title?: string;
  description?: string;
}

export default function AuthRequiredModal({
  isOpen,
  onClose,
  onLoginSuccess,
  title = 'Inicia sesión para continuar',
  description = 'Necesitas una cuenta para completar tu compra',
}: AuthRequiredModalProps) {
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginInput>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
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

    const validation = validate(loginSchema, formData);
    if (!validation.success) {
      setErrors(validation.errors || {});
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await login(formData.email, formData.password);
      onLoginSuccess();
    } catch (error) {
      setLoginError(error instanceof Error ? error.message : 'Error al iniciar sesión');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ email: '', password: '', rememberMe: false });
    setErrors({});
    setLoginError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="sm" showCloseButton={true}>
      <div className="text-center mb-5">
        <div className="w-14 h-14 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <ShoppingBag className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-lg font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>

      {loginError && (
        <Alert variant="error" layout="bordered" icon={AlertCircle} className="mb-4">
          {loginError}
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <TextInput
          id="modal-email"
          name="email"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          label="Correo electrónico"
          placeholder="tu@ejemplo.com"
          leftIcon={<Mail className="h-4 w-4" />}
          error={errors.email}
          size="md"
        />

        <TextInput
          id="modal-password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          label="Contraseña"
          placeholder="••••••••"
          leftIcon={<Lock className="h-4 w-4" />}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-1 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          }
          error={errors.password}
          size="md"
        />

        <div className="flex items-center justify-between text-sm pt-1">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded-sm"
            />
            <span className="text-gray-600">Recordarme</span>
          </label>
          <Link
            href={ROUTES.FORGOT_PASSWORD}
            className="text-primary-600 hover:text-primary-700 font-medium"
            onClick={handleClose}
          >
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="md"
          fullWidth
          disabled={isLoading}
          className="mt-2"
        >
          {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
        </Button>
      </form>

      <div className="mt-5">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500">¿No tienes cuenta?</span>
          </div>
        </div>

        <Link href={ROUTES.REGISTER} onClick={handleClose} className="block mt-4">
          <Button variant="outline" size="md" fullWidth>
            <span className="flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4" />
              Crear cuenta nueva
            </span>
          </Button>
        </Link>
      </div>

      <p className="text-xs text-gray-400 text-center mt-4">
        Al continuar, aceptas nuestros{' '}
        <Link
          href={ROUTES.TERMS}
          className="text-primary-600 hover:underline"
          onClick={handleClose}
        >
          Términos y Condiciones
        </Link>{' '}
        y{' '}
        <Link
          href={ROUTES.PRIVACY}
          className="text-primary-600 hover:underline"
          onClick={handleClose}
        >
          Política de Privacidad
        </Link>
      </p>
    </Modal>
  );
}
