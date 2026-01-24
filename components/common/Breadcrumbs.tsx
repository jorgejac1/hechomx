/**
 * @fileoverview Breadcrumbs component for displaying hierarchical navigation path.
 * Renders a list of links with chevron separators, with the last item as plain text.
 * @module components/common/Breadcrumbs
 */

import Link from 'next/link';

/**
 * Single breadcrumb item configuration
 * @interface BreadcrumbItem
 */
interface BreadcrumbItem {
  /** Display text for the breadcrumb */
  label: string;
  /** URL to navigate to (omit for non-clickable items) */
  href?: string;
}

/**
 * Props for the Breadcrumbs component
 * @interface BreadcrumbsProps
 */
interface BreadcrumbsProps {
  /** Array of breadcrumb items from root to current page */
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-8" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={item.href || item.label} className="flex items-center">
          {index > 0 && (
            <svg
              className="w-4 h-4 text-gray-400 dark:text-gray-500 mx-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {index === items.length - 1 || !item.href ? (
            <span className="text-gray-900 dark:text-gray-100 font-medium">{item.label}</span>
          ) : (
            <Link
              href={item.href}
              className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
