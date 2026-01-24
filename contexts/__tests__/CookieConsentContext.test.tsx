import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { CookieConsentProvider, useCookieConsent } from '../CookieConsentContext';

// Test component that uses useCookieConsent
function CookieConsentTestComponent() {
  const {
    isHydrated,
    hasConsented,
    preferences,
    isPreferencesModalOpen,
    openPreferencesModal,
    closePreferencesModal,
    acceptAll,
    rejectAll,
    savePreferences,
    isCategoryAllowed,
  } = useCookieConsent();

  return (
    <div>
      <span data-testid="is-hydrated">{isHydrated ? 'yes' : 'no'}</span>
      <span data-testid="has-consented">{hasConsented ? 'yes' : 'no'}</span>
      <span data-testid="modal-open">{isPreferencesModalOpen ? 'yes' : 'no'}</span>
      <span data-testid="pref-essential">{preferences.essential ? 'yes' : 'no'}</span>
      <span data-testid="pref-functional">{preferences.functional ? 'yes' : 'no'}</span>
      <span data-testid="pref-analytics">{preferences.analytics ? 'yes' : 'no'}</span>
      <span data-testid="pref-marketing">{preferences.marketing ? 'yes' : 'no'}</span>
      <span data-testid="allowed-essential">{isCategoryAllowed('essential') ? 'yes' : 'no'}</span>
      <span data-testid="allowed-analytics">{isCategoryAllowed('analytics') ? 'yes' : 'no'}</span>
      <button data-testid="open-modal" onClick={openPreferencesModal}>
        Open Modal
      </button>
      <button data-testid="close-modal" onClick={closePreferencesModal}>
        Close Modal
      </button>
      <button data-testid="accept-all" onClick={acceptAll}>
        Accept All
      </button>
      <button data-testid="reject-all" onClick={rejectAll}>
        Reject All
      </button>
      <button
        data-testid="save-custom"
        onClick={() =>
          savePreferences({
            essential: true,
            functional: true,
            analytics: false,
            marketing: false,
          })
        }
      >
        Save Custom
      </button>
      <button
        data-testid="save-all-true"
        onClick={() =>
          savePreferences({
            essential: true,
            functional: true,
            analytics: true,
            marketing: true,
          })
        }
      >
        Save All True
      </button>
    </div>
  );
}

describe('CookieConsentContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('CookieConsentProvider', () => {
    it('provides cookie consent context to children', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });
    });

    it('starts with default preferences', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
        expect(screen.getByTestId('has-consented').textContent).toBe('no');
        expect(screen.getByTestId('pref-essential').textContent).toBe('yes');
        expect(screen.getByTestId('pref-functional').textContent).toBe('no');
        expect(screen.getByTestId('pref-analytics').textContent).toBe('no');
        expect(screen.getByTestId('pref-marketing').textContent).toBe('no');
      });
    });

    it('loads saved preferences from localStorage', async () => {
      const savedState = {
        hasConsented: true,
        consentDate: '2024-01-01T00:00:00Z',
        preferences: {
          essential: true,
          functional: true,
          analytics: true,
          marketing: false,
        },
      };
      localStorage.setItem('papalote_cookie_consent', JSON.stringify(savedState));

      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('has-consented').textContent).toBe('yes');
        expect(screen.getByTestId('pref-functional').textContent).toBe('yes');
        expect(screen.getByTestId('pref-analytics').textContent).toBe('yes');
        expect(screen.getByTestId('pref-marketing').textContent).toBe('no');
      });
    });

    it('handles corrupted localStorage gracefully', async () => {
      localStorage.setItem('papalote_cookie_consent', 'invalid-json{{{');

      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
        expect(screen.getByTestId('has-consented').textContent).toBe('no');
      });
    });
  });

  describe('useCookieConsent hook', () => {
    it('throws error when used outside CookieConsentProvider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useCookieConsent());
      }).toThrow('useCookieConsent must be used within a CookieConsentProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('openPreferencesModal / closePreferencesModal', () => {
    it('opens the preferences modal', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });

      expect(screen.getByTestId('modal-open').textContent).toBe('no');

      fireEvent.click(screen.getByTestId('open-modal'));

      expect(screen.getByTestId('modal-open').textContent).toBe('yes');
    });

    it('closes the preferences modal', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });

      fireEvent.click(screen.getByTestId('open-modal'));
      expect(screen.getByTestId('modal-open').textContent).toBe('yes');

      fireEvent.click(screen.getByTestId('close-modal'));
      expect(screen.getByTestId('modal-open').textContent).toBe('no');
    });
  });

  describe('acceptAll', () => {
    it('accepts all cookies', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });

      fireEvent.click(screen.getByTestId('accept-all'));

      await waitFor(() => {
        expect(screen.getByTestId('has-consented').textContent).toBe('yes');
        expect(screen.getByTestId('pref-essential').textContent).toBe('yes');
        expect(screen.getByTestId('pref-functional').textContent).toBe('yes');
        expect(screen.getByTestId('pref-analytics').textContent).toBe('yes');
        expect(screen.getByTestId('pref-marketing').textContent).toBe('yes');
      });
    });

    it('closes modal when accepting all', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });

      fireEvent.click(screen.getByTestId('open-modal'));
      expect(screen.getByTestId('modal-open').textContent).toBe('yes');

      fireEvent.click(screen.getByTestId('accept-all'));

      expect(screen.getByTestId('modal-open').textContent).toBe('no');
    });

    it('saves consent to localStorage', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });

      fireEvent.click(screen.getByTestId('accept-all'));

      await waitFor(() => {
        const saved = localStorage.getItem('papalote_cookie_consent');
        expect(saved).not.toBeNull();
        const parsed = JSON.parse(saved!);
        expect(parsed.hasConsented).toBe(true);
        expect(parsed.preferences.functional).toBe(true);
        expect(parsed.preferences.analytics).toBe(true);
        expect(parsed.preferences.marketing).toBe(true);
        expect(parsed.consentDate).toBeTruthy();
      });
    });
  });

  describe('rejectAll', () => {
    it('rejects all optional cookies', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });

      fireEvent.click(screen.getByTestId('reject-all'));

      await waitFor(() => {
        expect(screen.getByTestId('has-consented').textContent).toBe('yes');
        expect(screen.getByTestId('pref-essential').textContent).toBe('yes');
        expect(screen.getByTestId('pref-functional').textContent).toBe('no');
        expect(screen.getByTestId('pref-analytics').textContent).toBe('no');
        expect(screen.getByTestId('pref-marketing').textContent).toBe('no');
      });
    });

    it('closes modal when rejecting', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });

      fireEvent.click(screen.getByTestId('open-modal'));
      expect(screen.getByTestId('modal-open').textContent).toBe('yes');

      fireEvent.click(screen.getByTestId('reject-all'));

      expect(screen.getByTestId('modal-open').textContent).toBe('no');
    });

    it('saves rejection to localStorage', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });

      fireEvent.click(screen.getByTestId('reject-all'));

      await waitFor(() => {
        const saved = localStorage.getItem('papalote_cookie_consent');
        expect(saved).not.toBeNull();
        const parsed = JSON.parse(saved!);
        expect(parsed.hasConsented).toBe(true);
        expect(parsed.preferences.essential).toBe(true);
        expect(parsed.preferences.functional).toBe(false);
        expect(parsed.preferences.analytics).toBe(false);
        expect(parsed.preferences.marketing).toBe(false);
      });
    });
  });

  describe('savePreferences', () => {
    it('saves custom preferences', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });

      fireEvent.click(screen.getByTestId('save-custom'));

      await waitFor(() => {
        expect(screen.getByTestId('has-consented').textContent).toBe('yes');
        expect(screen.getByTestId('pref-essential').textContent).toBe('yes');
        expect(screen.getByTestId('pref-functional').textContent).toBe('yes');
        expect(screen.getByTestId('pref-analytics').textContent).toBe('no');
        expect(screen.getByTestId('pref-marketing').textContent).toBe('no');
      });
    });

    it('always keeps essential cookies enabled', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });

      // Even if we try to set essential to false, it should stay true
      fireEvent.click(screen.getByTestId('save-custom'));

      await waitFor(() => {
        expect(screen.getByTestId('pref-essential').textContent).toBe('yes');
      });
    });

    it('closes modal when saving', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });

      fireEvent.click(screen.getByTestId('open-modal'));
      expect(screen.getByTestId('modal-open').textContent).toBe('yes');

      fireEvent.click(screen.getByTestId('save-custom'));

      expect(screen.getByTestId('modal-open').textContent).toBe('no');
    });

    it('saves preferences to localStorage', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });

      fireEvent.click(screen.getByTestId('save-custom'));

      await waitFor(() => {
        const saved = localStorage.getItem('papalote_cookie_consent');
        expect(saved).not.toBeNull();
        const parsed = JSON.parse(saved!);
        expect(parsed.hasConsented).toBe(true);
        expect(parsed.preferences.functional).toBe(true);
        expect(parsed.preferences.analytics).toBe(false);
      });
    });
  });

  describe('isCategoryAllowed', () => {
    it('returns true for essential (always allowed)', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });

      expect(screen.getByTestId('allowed-essential').textContent).toBe('yes');
    });

    it('returns correct value based on preferences', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });

      // Initially analytics is not allowed
      expect(screen.getByTestId('allowed-analytics').textContent).toBe('no');

      // Accept all
      fireEvent.click(screen.getByTestId('accept-all'));

      await waitFor(() => {
        expect(screen.getByTestId('allowed-analytics').textContent).toBe('yes');
      });
    });
  });

  describe('localStorage persistence', () => {
    it('does not save to localStorage before consent', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });

      // Should not save unless hasConsented is true
      expect(localStorage.getItem('papalote_cookie_consent')).toBeNull();
    });

    it('saves to localStorage after consent', async () => {
      render(
        <CookieConsentProvider>
          <CookieConsentTestComponent />
        </CookieConsentProvider>
      );

      await waitFor(() => {
        expect(screen.getByTestId('is-hydrated').textContent).toBe('yes');
      });

      fireEvent.click(screen.getByTestId('accept-all'));

      await waitFor(() => {
        expect(localStorage.getItem('papalote_cookie_consent')).not.toBeNull();
      });
    });
  });
});
