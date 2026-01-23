/**
 * @fileoverview ScrollToTop component providing a floating button to scroll to page top.
 * Appears after scrolling down 300px and smoothly scrolls to the top when clicked.
 * Positioned in the bottom-right corner with responsive positioning for mobile.
 * @module components/common/ScrollToTop
 */

'use client';

import { useEffect, useState } from 'react';
import Button from '@/components/common/Button';

/**
 * Floating button that appears when scrolling down and scrolls to top on click.
 * @returns The scroll to top button component, or null when near the top
 */
export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      variant="primary"
      size="sm"
      icon={
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      }
      className="fixed bottom-20 right-4 sm:bottom-8 sm:right-8 z-40 p-2.5! sm:p-3! rounded-full shadow-lg hover:scale-110"
      ariaLabel="Volver arriba"
    />
  );
}
