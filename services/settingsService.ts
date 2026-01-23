/**
 * @fileoverview Platform settings service for managing admin configuration.
 * Currently uses localStorage for persistence, designed to be swapped with API calls.
 * All methods return Promises to match async API behavior for seamless migration.
 * @module services/settingsService
 */

import { PlatformSettings, defaultSettings } from '@/lib/types/settings';

const STORAGE_KEY = 'papalote_platform_settings';

// Simulate network delay (remove in production)
const simulateDelay = (ms: number = 500) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch current platform settings
 * TODO: Replace with API call - GET /api/admin/settings
 */
export async function getSettings(): Promise<PlatformSettings> {
  await simulateDelay();

  // For production: return fetch('/api/admin/settings').then(r => r.json());

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('[settingsService] Error loading settings:', error);
  }

  return defaultSettings;
}

/**
 * Save platform settings
 * TODO: Replace with API call - PUT /api/admin/settings
 */
export async function saveSettings(
  settings: PlatformSettings,
  userId?: string
): Promise<{ success: boolean; message: string }> {
  await simulateDelay(800);

  // For production:
  // return fetch('/api/admin/settings', {
  //   method: 'PUT',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(settings),
  // }).then(r => r.json());

  try {
    const settingsWithMeta: PlatformSettings = {
      ...settings,
      updatedAt: new Date().toISOString(),
      updatedBy: userId || 'admin',
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(settingsWithMeta));

    return { success: true, message: 'Configuración guardada exitosamente' };
  } catch (error) {
    console.error('[settingsService] Error saving settings:', error);
    return { success: false, message: 'Error al guardar la configuración' };
  }
}

/**
 * Save a specific settings section
 * TODO: Replace with API call - PATCH /api/admin/settings/:section
 */
export async function saveSectionSettings<K extends keyof PlatformSettings>(
  section: K,
  sectionSettings: PlatformSettings[K],
  userId?: string
): Promise<{ success: boolean; message: string }> {
  await simulateDelay(500);

  try {
    const current = await getSettings();
    const updated: PlatformSettings = {
      ...current,
      [section]: sectionSettings,
      updatedAt: new Date().toISOString(),
      updatedBy: userId || 'admin',
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    return { success: true, message: 'Sección actualizada exitosamente' };
  } catch (error) {
    console.error('[settingsService] Error saving section:', error);
    return { success: false, message: 'Error al actualizar la sección' };
  }
}

/**
 * Reset settings to defaults
 * TODO: Replace with API call - POST /api/admin/settings/reset
 */
export async function resetSettings(): Promise<{ success: boolean; message: string }> {
  await simulateDelay(500);

  try {
    localStorage.removeItem(STORAGE_KEY);
    return { success: true, message: 'Configuración restablecida a valores por defecto' };
  } catch (error) {
    console.error('[settingsService] Error resetting settings:', error);
    return { success: false, message: 'Error al restablecer la configuración' };
  }
}

/**
 * Test email configuration
 * TODO: Replace with API call - POST /api/admin/settings/test-email
 */
export async function testEmailConfig(
  emailSettings: PlatformSettings['email']
): Promise<{ success: boolean; message: string }> {
  await simulateDelay(1500); // Email takes longer

  // Simulate validation
  if (!emailSettings.smtpHost || !emailSettings.senderEmail) {
    return { success: false, message: 'Configuración SMTP incompleta' };
  }

  // For production:
  // return fetch('/api/admin/settings/test-email', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(emailSettings),
  // }).then(r => r.json());

  // Simulate success
  return { success: true, message: 'Email de prueba enviado correctamente' };
}

/**
 * Validate settings before save
 */
export function validateSettings(settings: PlatformSettings): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  // General validations
  if (!settings.general.siteName.trim()) {
    errors['general.siteName'] = 'El nombre del sitio es requerido';
  }

  // Payment validations
  if (settings.payments.minOrderAmount < 0) {
    errors['payments.minOrderAmount'] = 'El monto mínimo no puede ser negativo';
  }
  if (settings.payments.platformCommission < 0 || settings.payments.platformCommission > 100) {
    errors['payments.platformCommission'] = 'La comisión debe estar entre 0 y 100%';
  }

  // Security validations
  if (settings.security.sessionTimeout < 1) {
    errors['security.sessionTimeout'] = 'El tiempo de sesión debe ser al menos 1 hora';
  }
  if (settings.security.maxLoginAttempts < 1) {
    errors['security.maxLoginAttempts'] = 'Los intentos máximos deben ser al menos 1';
  }

  // Email validations
  if (settings.email.smtpPort < 1 || settings.email.smtpPort > 65535) {
    errors['email.smtpPort'] = 'Puerto SMTP inválido';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
