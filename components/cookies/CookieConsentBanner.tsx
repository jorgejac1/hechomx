'use client';

/**
 * @fileoverview Cookie consent banner that appears for users who haven't made a choice.
 * @module components/cookies/CookieConsentBanner
 */

import { Cookie, Settings } from 'lucide-react';
import Link from 'next/link';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { ROUTES } from '@/lib';

export default function CookieConsentBanner() {
  const { isHydrated, hasConsented, acceptAll, rejectAll, openPreferencesModal } =
    useCookieConsent();

  // Don't show until hydrated or if user has already consented
  if (!isHydrated || hasConsented) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700">
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg shrink-0">
              <Cookie className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">Usamos cookies</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Utilizamos cookies para mejorar tu experiencia, analizar el tráfico y personalizar
                el contenido. Al hacer clic en "Aceptar todas", aceptas el uso de todas las cookies.{' '}
                <Link
                  href={ROUTES.COOKIES}
                  className="text-primary-600 dark:text-primary-400 hover:underline"
                >
                  Más información
                </Link>
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={acceptAll}
              className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition text-sm"
            >
              Aceptar todas
            </button>
            <button
              onClick={rejectAll}
              className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition text-sm"
            >
              Solo esenciales
            </button>
            <button
              onClick={openPreferencesModal}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition text-sm"
            >
              <Settings className="w-4 h-4" />
              Configurar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
