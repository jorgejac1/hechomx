'use client';

/**
 * @fileoverview Modal for configuring cookie preferences.
 * @module components/cookies/CookiePreferencesModal
 */

import { useState, useEffect } from 'react';
import { X, Cookie, CheckCircle, Settings, Shield, AlertCircle } from 'lucide-react';
import { useCookieConsent } from '@/contexts/CookieConsentContext';
import { CookieCategory, CookiePreferences, COOKIE_CATEGORY_INFO } from '@/lib/types/cookies';

const CATEGORY_ICONS: Record<CookieCategory, typeof CheckCircle> = {
  essential: CheckCircle,
  functional: Settings,
  analytics: Shield,
  marketing: AlertCircle,
};

const CATEGORY_COLORS: Record<CookieCategory, string> = {
  essential: 'text-green-600 dark:text-green-400',
  functional: 'text-blue-600 dark:text-blue-400',
  analytics: 'text-purple-600 dark:text-purple-400',
  marketing: 'text-orange-600 dark:text-orange-400',
};

export default function CookiePreferencesModal() {
  const {
    isHydrated,
    isPreferencesModalOpen,
    closePreferencesModal,
    preferences,
    savePreferences,
    acceptAll,
    rejectAll,
  } = useCookieConsent();

  const [localPreferences, setLocalPreferences] = useState<CookiePreferences>(preferences);

  // Sync local preferences when modal opens or preferences change
  useEffect(() => {
    if (isPreferencesModalOpen) {
      setLocalPreferences(preferences);
    }
  }, [isPreferencesModalOpen, preferences]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isPreferencesModalOpen) {
        closePreferencesModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isPreferencesModalOpen, closePreferencesModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isPreferencesModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isPreferencesModalOpen]);

  // Don't render until hydrated or if modal is not open
  if (!isHydrated || !isPreferencesModalOpen) {
    return null;
  }

  const handleToggle = (category: CookieCategory) => {
    if (category === 'essential') return; // Cannot toggle essential
    setLocalPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const handleSave = () => {
    savePreferences(localPreferences);
  };

  const categories: CookieCategory[] = ['essential', 'functional', 'analytics', 'marketing'];

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-preferences-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={closePreferencesModal}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/50 rounded-lg">
              <Cookie className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
            <h2
              id="cookie-preferences-title"
              className="text-xl font-bold text-gray-900 dark:text-gray-100"
            >
              Preferencias de Cookies
            </h2>
          </div>
          <button
            onClick={closePreferencesModal}
            className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            Personaliza qué tipos de cookies deseas permitir. Las cookies esenciales no pueden
            desactivarse ya que son necesarias para el funcionamiento del sitio.
          </p>

          {/* Cookie Categories */}
          <div className="space-y-4">
            {categories.map((category) => {
              const info = COOKIE_CATEGORY_INFO[category];
              const Icon = CATEGORY_ICONS[category];
              const isEnabled = localPreferences[category];
              const isRequired = info.required;

              return (
                <div
                  key={category}
                  className="border border-gray-200 dark:border-gray-700 rounded-xl p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3 flex-1">
                      <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${CATEGORY_COLORS[category]}`} />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                          {info.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {info.description}
                        </p>
                        {isRequired && (
                          <span className="inline-block mt-2 text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded">
                            Siempre activas
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Toggle Switch */}
                    <button
                      onClick={() => handleToggle(category)}
                      disabled={isRequired}
                      className={`relative w-12 h-6 rounded-full transition-colors shrink-0 ${
                        isEnabled ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                      } ${isRequired ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'}`}
                      role="switch"
                      aria-checked={isEnabled}
                      aria-label={`${isEnabled ? 'Desactivar' : 'Activar'} ${info.name}`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                          isEnabled ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 md:p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={rejectAll}
              className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition text-sm"
            >
              Rechazar opcionales
            </button>
            <button
              onClick={acceptAll}
              className="flex-1 px-4 py-2.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition text-sm"
            >
              Aceptar todas
            </button>
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2.5 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition text-sm"
            >
              Guardar preferencias
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
