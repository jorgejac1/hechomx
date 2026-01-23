/**
 * @fileoverview Admin banner component displayed at the top of the header
 * Shows a purple notification banner indicating the user is in administrator mode.
 * Includes accessibility features with role and aria-live attributes.
 * @module components/layout/header/AdminBanner
 */

import { Shield } from 'lucide-react';

/**
 * Props for the AdminBanner component
 * @interface AdminBannerProps
 */
interface AdminBannerProps {
  /** Custom message to display in the banner. Defaults to 'Modo Administrador' */
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
