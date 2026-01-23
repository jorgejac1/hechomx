/**
 * @fileoverview Keyboard shortcut handler hook
 * Registers keyboard event listeners for specified key combinations with optional target element binding
 * @module hooks/common/useKeyboardShortcuts
 */

import { useEffect, RefObject } from 'react';

/**
 * Generic keyboard shortcut handler
 *
 * @param shortcuts - Map of key combinations to handlers
 * @param options - Configuration options
 *
 * @example
 * useKeyboardShortcuts({
 *   'ArrowLeft': goToPrevious,
 *   'ArrowRight': goToNext,
 *   'Escape': close,
 *   'Enter': open,
 * }, { enabled: true });
 */
export type ShortcutHandler = (event: KeyboardEvent) => void;
export type ShortcutMap = Record<string, ShortcutHandler>;

export interface UseKeyboardShortcutsOptions {
  enabled?: boolean;
  preventDefault?: boolean;
  target?: RefObject<HTMLElement>;
}

export function useKeyboardShortcuts(
  shortcuts: ShortcutMap,
  options: UseKeyboardShortcutsOptions = {}
): void {
  const { enabled = true, preventDefault = true, target } = options;

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const handler = shortcuts[event.key];

      if (handler) {
        if (preventDefault) {
          event.preventDefault();
        }
        handler(event);
      }
    };

    const element = target?.current;

    if (element) {
      // Attach to specific element
      element.addEventListener('keydown', handleKeyDown);
      return () => {
        element.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      // Attach to window
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [shortcuts, enabled, preventDefault, target]);
}
