/**
 * @fileoverview Accordion component system for collapsible content sections.
 * Supports multiple visual variants, single or multiple expanded items, and keyboard navigation.
 * Provides compound components: Accordion and Accordion.Item.
 * @module components/common/Accordion
 */

'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
  useId,
  useRef,
  useEffect,
  useMemo,
} from 'react';
import { ChevronDown, type LucideIcon } from 'lucide-react';

/**
 * Available accordion visual variants
 * @typedef {'default' | 'bordered' | 'separated'} AccordionVariant
 */
type AccordionVariant = 'default' | 'bordered' | 'separated';

interface AccordionContextValue {
  expandedItems: Set<string>;
  toggleItem: (itemId: string) => void;
  allowMultiple: boolean;
  variant: AccordionVariant;
  baseId: string;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext() {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error('Accordion compound components must be used within an Accordion component');
  }
  return context;
}

// Variant styles
const variantStyles: Record<
  AccordionVariant,
  {
    container: string;
    item: string;
    trigger: string;
    content: string;
  }
> = {
  default: {
    container: 'divide-y divide-gray-200',
    item: '',
    trigger:
      'flex items-center justify-between w-full py-4 text-left font-medium text-gray-900 hover:text-primary-600 transition-colors',
    content: 'pb-4 text-gray-700',
  },
  bordered: {
    container: 'space-y-2',
    item: 'border border-gray-200 rounded-lg overflow-hidden',
    trigger:
      'flex items-center justify-between w-full p-4 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors',
    content: 'px-4 pb-4 text-gray-700',
  },
  separated: {
    container: 'space-y-4',
    item: 'bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-gray-900/50 overflow-hidden',
    trigger:
      'flex items-center justify-between w-full p-5 text-left font-medium text-gray-900 hover:bg-gray-50 transition-colors',
    content: 'px-5 pb-5 text-gray-700',
  },
};

// ========== AccordionItem Component ==========
interface AccordionItemProps {
  /** Unique identifier for this item */
  itemId: string;
  /** The header/trigger content */
  title: ReactNode;
  /** Optional icon to display before the title */
  icon?: LucideIcon;
  /** The collapsible content */
  children: ReactNode;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Additional CSS classes for the item container */
  className?: string;
}

function AccordionItem({
  itemId,
  title,
  icon: Icon,
  children,
  disabled = false,
  className = '',
}: AccordionItemProps) {
  const { expandedItems, toggleItem, variant, baseId } = useAccordionContext();
  const isExpanded = expandedItems.has(itemId);
  const styles = variantStyles[variant];
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number | undefined>(undefined);

  // Measure content height for smooth animation
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  const handleToggle = useCallback(() => {
    if (!disabled) {
      toggleItem(itemId);
    }
  }, [disabled, itemId, toggleItem]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
        e.preventDefault();
        toggleItem(itemId);
      }
    },
    [disabled, itemId, toggleItem]
  );

  const triggerId = `${baseId}-trigger-${itemId}`;
  const panelId = `${baseId}-panel-${itemId}`;

  return (
    <div className={`${styles.item} ${className}`} data-state={isExpanded ? 'open' : 'closed'}>
      {/* Trigger */}
      <button
        type="button"
        id={triggerId}
        aria-expanded={isExpanded}
        aria-controls={panelId}
        aria-disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          ${styles.trigger}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <span className="flex items-center gap-3">
          {Icon && <Icon className="w-5 h-5 text-primary-600 shrink-0" aria-hidden="true" />}
          <span>{title}</span>
        </span>
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 shrink-0 ${
            isExpanded ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>

      {/* Content */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        hidden={!isExpanded}
        style={{
          height: isExpanded ? contentHeight : 0,
          overflow: 'hidden',
          transition: 'height 200ms ease-out',
        }}
      >
        <div ref={contentRef} className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ========== Main Accordion Component ==========
interface AccordionProps {
  /** Whether multiple items can be expanded at once */
  allowMultiple?: boolean;
  /** Default expanded item IDs (uncontrolled mode) */
  defaultExpanded?: string[];
  /** Controlled expanded item IDs */
  expanded?: string[];
  /** Callback when expanded items change */
  onExpandedChange?: (expandedIds: string[]) => void;
  /** Visual variant */
  variant?: AccordionVariant;
  /** Children (AccordionItem components) */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
}

function Accordion({
  allowMultiple = false,
  defaultExpanded = [],
  expanded: controlledExpanded,
  onExpandedChange,
  variant = 'default',
  children,
  className = '',
}: AccordionProps) {
  const baseId = useId();
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(new Set(defaultExpanded));

  // Determine if controlled or uncontrolled
  const isControlled = controlledExpanded !== undefined;
  const expandedItems = useMemo(
    () => (isControlled ? new Set(controlledExpanded) : internalExpanded),
    [isControlled, controlledExpanded, internalExpanded]
  );

  const toggleItem = useCallback(
    (itemId: string) => {
      const newExpanded = new Set(expandedItems);

      if (newExpanded.has(itemId)) {
        newExpanded.delete(itemId);
      } else {
        if (!allowMultiple) {
          newExpanded.clear();
        }
        newExpanded.add(itemId);
      }

      if (!isControlled) {
        setInternalExpanded(newExpanded);
      }

      onExpandedChange?.(Array.from(newExpanded));
    },
    [expandedItems, allowMultiple, isControlled, onExpandedChange]
  );

  const styles = variantStyles[variant];

  return (
    <AccordionContext.Provider
      value={{ expandedItems, toggleItem, allowMultiple, variant, baseId }}
    >
      <div className={`${styles.container} ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
}

// Attach compound component
Accordion.Item = AccordionItem;

export default Accordion;
export type { AccordionVariant, AccordionProps, AccordionItemProps };
