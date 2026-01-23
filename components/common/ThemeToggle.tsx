/**
 * @fileoverview ThemeToggle component for switching between light, dark, and system themes.
 * Supports simple toggle (light/dark) or dropdown (light/dark/system) variants.
 * Handles hydration mismatch and persists theme preference.
 * @module components/common/ThemeToggle
 */

'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';

/**
 * Props for the ThemeToggle component
 * @interface ThemeToggleProps
 */
interface ThemeToggleProps {
  /** Show as dropdown with all options or simple toggle */
  variant?: 'toggle' | 'dropdown';
  /** Size of the button */
  size?: 'sm' | 'md' | 'lg';
  /** Additional CSS classes */
  className?: string;
}

export default function ThemeToggle({
  variant = 'toggle',
  size = 'md',
  className = '',
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder with same dimensions to prevent layout shift
    return (
      <button
        className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 ${className}`}
        aria-label="Cargando tema"
        disabled
      >
        <div className={`${size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5'}`} />
      </button>
    );
  }

  const iconSize = size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-6 h-6' : 'w-5 h-5';
  const buttonSize = size === 'sm' ? 'p-1.5' : size === 'lg' ? 'p-3' : 'p-2';

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  if (variant === 'toggle') {
    return (
      <button
        onClick={toggleTheme}
        className={`${buttonSize} rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors ${className}`}
        aria-label={resolvedTheme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
        title={resolvedTheme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
      >
        {resolvedTheme === 'dark' ? <Sun className={iconSize} /> : <Moon className={iconSize} />}
      </button>
    );
  }

  // Dropdown variant
  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`${buttonSize} rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors ${className}`}
        aria-label="Seleccionar tema"
        aria-expanded={showDropdown}
      >
        {resolvedTheme === 'dark' ? <Moon className={iconSize} /> : <Sun className={iconSize} />}
      </button>

      {showDropdown && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 z-40" onClick={() => setShowDropdown(false)} />

          {/* Dropdown menu */}
          <div className="absolute right-0 mt-2 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50">
            <button
              onClick={() => {
                setTheme('light');
                setShowDropdown(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                theme === 'light'
                  ? 'text-primary-600 font-medium'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <Sun className="w-4 h-4" />
              Claro
            </button>
            <button
              onClick={() => {
                setTheme('dark');
                setShowDropdown(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                theme === 'dark'
                  ? 'text-primary-600 font-medium'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <Moon className="w-4 h-4" />
              Oscuro
            </button>
            <button
              onClick={() => {
                setTheme('system');
                setShowDropdown(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                theme === 'system'
                  ? 'text-primary-600 font-medium'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
            >
              <Monitor className="w-4 h-4" />
              Sistema
            </button>
          </div>
        </>
      )}
    </div>
  );
}
