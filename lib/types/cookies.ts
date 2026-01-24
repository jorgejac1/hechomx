/**
 * @fileoverview Cookie consent types and interfaces.
 * @module lib/types/cookies
 */

export type CookieCategory = 'essential' | 'functional' | 'analytics' | 'marketing';

export interface CookiePreferences {
  essential: boolean; // Always true, cannot be disabled
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsentState {
  hasConsented: boolean;
  consentDate: string | null;
  preferences: CookiePreferences;
}

export const DEFAULT_COOKIE_PREFERENCES: CookiePreferences = {
  essential: true,
  functional: false,
  analytics: false,
  marketing: false,
};

export const COOKIE_CATEGORY_INFO: Record<
  CookieCategory,
  {
    name: string;
    description: string;
    required: boolean;
  }
> = {
  essential: {
    name: 'Cookies Esenciales',
    description:
      'Necesarias para el funcionamiento del sitio. Incluyen sesión, carrito de compras y preferencias de privacidad.',
    required: true,
  },
  functional: {
    name: 'Cookies Funcionales',
    description:
      'Permiten recordar tus preferencias como idioma, ubicación y opciones de visualización.',
    required: false,
  },
  analytics: {
    name: 'Cookies de Análisis',
    description:
      'Nos ayudan a entender cómo usas el sitio para mejorar la experiencia. Usamos Google Analytics.',
    required: false,
  },
  marketing: {
    name: 'Cookies de Marketing',
    description:
      'Usadas para mostrarte anuncios relevantes en nuestro sitio y en otras plataformas.',
    required: false,
  },
};
