'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  PlatformSettings,
  defaultSettings,
  SettingsSectionKey,
  SettingsSectionMap,
} from '@/lib/types/settings';
import {
  getSettings,
  saveSettings,
  resetSettings,
  testEmailConfig,
  validateSettings,
} from '@/services/settingsService';

interface UseSettingsReturn {
  settings: PlatformSettings;
  isLoading: boolean;
  isSaving: boolean;
  error: string | null;
  validationErrors: Record<string, string>;
  hasChanges: boolean;

  // Actions
  updateSettings: (updates: Partial<PlatformSettings>) => void;
  updateSection: <K extends SettingsSectionKey>(
    section: K,
    updates: Partial<SettingsSectionMap[K]>
  ) => void;
  save: () => Promise<{ success: boolean; message: string }>;
  reset: () => Promise<{ success: boolean; message: string }>;
  reload: () => Promise<void>;
  testEmail: () => Promise<{ success: boolean; message: string }>;
}

export function useSettings(): UseSettingsReturn {
  const [settings, setSettings] = useState<PlatformSettings>(defaultSettings);
  const [originalSettings, setOriginalSettings] = useState<PlatformSettings>(defaultSettings);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Check if there are unsaved changes
  const hasChanges = JSON.stringify(settings) !== JSON.stringify(originalSettings);

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const loaded = await getSettings();
      setSettings(loaded);
      setOriginalSettings(loaded);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error desconocido';
      setError(`Error al cargar la configuración: ${message}`);
      console.error('Settings load error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update entire settings object
  const updateSettings = useCallback((updates: Partial<PlatformSettings>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
    setValidationErrors({});
  }, []);

  // Update a specific section
  const updateSection = useCallback(
    <K extends SettingsSectionKey>(section: K, updates: Partial<SettingsSectionMap[K]>) => {
      setSettings((prev) => ({
        ...prev,
        [section]: { ...prev[section], ...updates },
      }));
      setValidationErrors({});
    },
    []
  );

  // Save settings
  const save = useCallback(async (): Promise<{ success: boolean; message: string }> => {
    // Validate first
    const validation = validateSettings(settings);
    if (!validation.valid) {
      setValidationErrors(validation.errors);
      return { success: false, message: 'Por favor corrige los errores de validación' };
    }

    setIsSaving(true);
    setError(null);

    try {
      const result = await saveSettings(settings);

      if (result.success) {
        setOriginalSettings(settings);
        setValidationErrors({});
      }

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      const message = `Error al guardar la configuración: ${errorMessage}`;
      setError(message);
      return { success: false, message };
    } finally {
      setIsSaving(false);
    }
  }, [settings]);

  // Reset to defaults
  const reset = useCallback(async (): Promise<{ success: boolean; message: string }> => {
    setIsSaving(true);

    try {
      const result = await resetSettings();

      if (result.success) {
        setSettings(defaultSettings);
        setOriginalSettings(defaultSettings);
        setValidationErrors({});
      }

      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      return { success: false, message: `Error al restablecer la configuración: ${errorMessage}` };
    } finally {
      setIsSaving(false);
    }
  }, []);

  // Reload from storage/API
  const reload = useCallback(async () => {
    await loadSettings();
  }, []);

  // Test email configuration
  const testEmail = useCallback(async (): Promise<{ success: boolean; message: string }> => {
    return testEmailConfig(settings.email);
  }, [settings.email]);

  return {
    settings,
    isLoading,
    isSaving,
    error,
    validationErrors,
    hasChanges,
    updateSettings,
    updateSection,
    save,
    reset,
    reload,
    testEmail,
  };
}
