import { useEffect, RefObject } from 'react';

/**
 * Traps focus within a container (for modals, drawers, etc.)
 * 
 * @param containerRef - Ref to the container element
 * @param options - Configuration options
 * 
 * @example
 * const modalRef = useRef<HTMLDivElement>(null);
 * useFocusTrap(modalRef, { enabled: isOpen, returnFocus: true });
 */
export interface UseFocusTrapOptions {
  enabled?: boolean;
  returnFocus?: boolean;
  initialFocus?: HTMLElement | null;
}

export function useFocusTrap(
  containerRef: RefObject<HTMLElement>,
  options: UseFocusTrapOptions = {}
): void {
  const { enabled = true, returnFocus = true, initialFocus } = options;

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    const previouslyFocusedElement = document.activeElement as HTMLElement;

    // Get all focusable elements
    const getFocusableElements = (): HTMLElement[] => {
      const elements = container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      return Array.from(elements).filter(
        (el) => !el.hasAttribute('disabled') && el.offsetParent !== null
      );
    };

    // Focus first element or specified element
    const focusableElements = getFocusableElements();
    if (initialFocus) {
      initialFocus.focus();
    } else if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    // Handle tab key
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;

      const focusableElements = getFocusableElements();
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      
      if (returnFocus && previouslyFocusedElement) {
        previouslyFocusedElement.focus();
      }
    };
  }, [enabled, containerRef, returnFocus, initialFocus]);
}