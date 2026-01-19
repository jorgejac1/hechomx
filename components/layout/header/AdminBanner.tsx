import { Shield } from 'lucide-react';

interface AdminBannerProps {
  message?: string;
}

export default function AdminBanner({ message = 'Modo Administrador' }: AdminBannerProps) {
  return (
    <div
      className="bg-purple-600 text-white text-center py-1.5 text-sm font-medium"
      role="status"
      aria-live="polite"
    >
      <Shield className="w-4 h-4 inline mr-2" aria-hidden="true" />
      {message}
    </div>
  );
}
