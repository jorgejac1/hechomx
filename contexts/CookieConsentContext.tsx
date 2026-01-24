'use client';

/**
 * @fileoverview Cookie consent context for managing user cookie preferences.
 * @module contexts/CookieConsentContext
 */

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import {
  CookiePreferences,
  CookieConsentState,
  DEFAULT_COOKIE_PREFERENCES,
} from '@/lib/types/cookies';

const STORAGE_KEY = 'papalote_cookie_consent';

interface CookieConsentContextType {
  /** Whether the context has been hydrated (safe to render UI) */
  isHydrated: boolean;
  /** Whether the user has made a consent decision */
  hasConsented: boolean;
  /** The user's cookie preferences */
  preferences: CookiePreferences;
  /** Whether the preferences modal is open */
  isPreferencesModalOpen: boolean;
  /** Open the preferences modal */
  openPreferencesModal: () => void;
  /** Close the preferences modal */
  closePreferencesModal: () => void;
  /** Accept all cookies */
  acceptAll: () => void;
  /** Reject all optional cookies (only essential) */
  rejectAll: () => void;
  /** Save custom preferences */
  savePreferences: (preferences: CookiePreferences) => void;
  /** Check if a specific category is allowed */
  isCategoryAllowed: (category: keyof CookiePreferences) => boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null);

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}

interface CookieConsentProviderProps {
  children: ReactNode;
}

export function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const [state, setState] = useState<CookieConsentState>({
    hasConsented: false,
    consentDate: null,
    preferences: DEFAULT_COOKIE_PREFERENCES,
  });
  const [isPreferencesModalOpen, setIsPreferencesModalOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load saved preferences from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as CookieConsentState;
        setState(parsed);
      } catch {
        // Invalid data, use defaults
      }
    }
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever state changes (after hydration)
  useEffect(() => {
    if (isHydrated && state.hasConsented) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isHydrated]);

  const openPreferencesModal = useCallback(() => {
    setIsPreferencesModalOpen(true);
  }, []);

  const closePreferencesModal = useCallback(() => {
    setIsPreferencesModalOpen(false);
  }, []);

  const acceptAll = useCallback(() => {
    setState({
      hasConsented: true,
      consentDate: new Date().toISOString(),
      preferences: {
        essential: true,
        functional: true,
        analytics: true,
        marketing: true,
      },
    });
    setIsPreferencesModalOpen(false);
  }, []);

  const rejectAll = useCallback(() => {
    setState({
      hasConsented: true,
      consentDate: new Date().toISOString(),
      preferences: {
        essential: true, // Essential is always true
        functional: false,
        analytics: false,
        marketing: false,
      },
    });
    setIsPreferencesModalOpen(false);
  }, []);

  const savePreferences = useCallback((preferences: CookiePreferences) => {
    setState({
      hasConsented: true,
      consentDate: new Date().toISOString(),
      preferences: {
        ...preferences,
        essential: true, // Essential is always true
      },
    });
    setIsPreferencesModalOpen(false);
  }, []);

  const isCategoryAllowed = useCallback(
    (category: keyof CookiePreferences) => {
      return state.preferences[category];
    },
    [state.preferences]
  );

  return (
    <CookieConsentContext.Provider
      value={{
        isHydrated,
        hasConsented: state.hasConsented,
        preferences: state.preferences,
        isPreferencesModalOpen,
        openPreferencesModal,
        closePreferencesModal,
        acceptAll,
        rejectAll,
        savePreferences,
        isCategoryAllowed,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}
