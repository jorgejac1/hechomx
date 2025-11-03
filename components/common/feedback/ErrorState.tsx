import { ReactNode } from 'react';
import { AlertCircle, XCircle, WifiOff, ServerCrash } from 'lucide-react';
import Button from '../Button';

interface ErrorStateProps {
  type?: 'error' | 'warning' | 'network' | 'server';
  title?: string;
  message?: string;
  action?: ReactNode;
  onRetry?: () => void;
  className?: string;
}

const errorConfig = {
  error: {
    icon: XCircle,
    defaultTitle: 'Algo salió mal',
    defaultMessage: 'Ha ocurrido un error inesperado. Por favor, intenta de nuevo.',
    iconColor: 'text-red-500',
  },
  warning: {
    icon: AlertCircle,
    defaultTitle: 'Atención',
    defaultMessage: 'Hay un problema que requiere tu atención.',
    iconColor: 'text-yellow-500',
  },
  network: {
    icon: WifiOff,
    defaultTitle: 'Sin conexión',
    defaultMessage: 'No se pudo conectar al servidor. Verifica tu conexión a internet.',
    iconColor: 'text-gray-500',
  },
  server: {
    icon: ServerCrash,
    defaultTitle: 'Error del servidor',
    defaultMessage: 'El servidor no está disponible en este momento. Intenta más tarde.',
    iconColor: 'text-red-500',
  },
};

export default function ErrorState({
  type = 'error',
  title,
  message,
  action,
  onRetry,
  className = '',
}: ErrorStateProps) {
  const config = errorConfig[type];
  const Icon = config.icon;

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className={`w-16 h-16 mb-4 ${config.iconColor}`}>
        <Icon className="w-full h-full" />
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title || config.defaultTitle}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message || config.defaultMessage}
      </p>
      
      <div className="flex gap-3">
        {onRetry && (
          <Button onClick={onRetry} variant="primary">
            Reintentar
          </Button>
        )}
        {action}
      </div>
    </div>
  );
}