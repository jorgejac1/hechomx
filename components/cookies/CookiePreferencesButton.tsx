'use client';

/**
 * @fileoverview Button to open the cookie preferences modal.
 * @module components/cookies/CookiePreferencesButton
 */

import { useCookieConsent } from '@/contexts/CookieConsentContext';

interface CookiePreferencesButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export default function CookiePreferencesButton({
  className = 'mt-3 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition',
  children = 'Configurar Preferencias de Cookies',
}: CookiePreferencesButtonProps) {
  const { isHydrated, openPreferencesModal } = useCookieConsent();

  return (
    <button
      onClick={openPreferencesModal}
      disabled={!isHydrated}
      className={`${className} ${!isHydrated ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}
