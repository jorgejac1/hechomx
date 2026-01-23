/**
 * @fileoverview Dropdown component system for creating accessible dropdown menus.
 * Supports selection, icons, dividers, labels, and keyboard navigation.
 * Provides compound components: Dropdown, Dropdown.Trigger, Dropdown.Menu, Dropdown.Item, etc.
 * @module components/common/Dropdown
 */

'use client';

import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  useId,
  forwardRef,
} from 'react';
import { ChevronDown, Check, type LucideIcon } from 'lucide-react';

/**
 * Available dropdown menu placement positions
 * @typedef {'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'} DropdownPlacement
 */
type DropdownPlacement = 'bottom-start' | 'bottom-end' | 'top-start' | 'top-end';

/**
 * Available dropdown trigger visual variants
 * @typedef {'default' | 'outline' | 'ghost'} DropdownVariant
 */
type DropdownVariant = 'default' | 'outline' | 'ghost';

/**
 * Available dropdown sizes
 * @typedef {'sm' | 'md' | 'lg'} DropdownSize
 */
type DropdownSize = 'sm' | 'md' | 'lg';

interface DropdownContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  closeMenu: () => void;
  selectedValue: string | null;
  setSelectedValue: (value: string) => void;
  variant: DropdownVariant;
  size: DropdownSize;
  baseId: string;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

function useDropdownContext() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error('Dropdown compound components must be used within a Dropdown component');
  }
  return context;
}

// Variant styles for trigger
const triggerVariantStyles: Record<DropdownVariant, string> = {
  default:
    'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-primary-500 focus:border-primary-500',
  outline:
    'bg-transparent border border-gray-300 text-gray-700 hover:border-gray-400 focus:ring-2 focus:ring-primary-500',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-2 focus:ring-primary-500',
};

// Size styles
const sizeStyles: Record<DropdownSize, { trigger: string; menu: string; item: string }> = {
  sm: { trigger: 'px-3 py-1.5 text-sm', menu: 'text-sm', item: 'px-3 py-1.5' },
  md: { trigger: 'px-4 py-2 text-sm', menu: 'text-sm', item: 'px-4 py-2' },
  lg: { trigger: 'px-5 py-2.5 text-base', menu: 'text-base', item: 'px-5 py-2.5' },
};

// Placement styles
const placementStyles: Record<DropdownPlacement, string> = {
  'bottom-start': 'top-full left-0 mt-1',
  'bottom-end': 'top-full right-0 mt-1',
  'top-start': 'bottom-full left-0 mb-1',
  'top-end': 'bottom-full right-0 mb-1',
};

// ========== DropdownTrigger Component ==========
interface DropdownTriggerProps {
  /** Custom trigger content */
  children?: ReactNode;
  /** Placeholder text when no selection */
  placeholder?: string;
  /** Whether to show chevron icon */
  showChevron?: boolean;
  /** Custom icon */
  icon?: LucideIcon;
  /** Additional CSS classes */
  className?: string;
  /** Whether trigger is disabled */
  disabled?: boolean;
}

const DropdownTrigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(
  (
    {
      children,
      placeholder = 'Select...',
      showChevron = true,
      icon: Icon,
      className = '',
      disabled = false,
    },
    ref
  ) => {
    const { isOpen, setIsOpen, variant, size, baseId } = useDropdownContext();
    const sizes = sizeStyles[size];

    const handleClick = useCallback(() => {
      if (!disabled) {
        setIsOpen(!isOpen);
      }
    }, [disabled, isOpen, setIsOpen]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (disabled) return;

        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setIsOpen(!isOpen);
        } else if (e.key === 'Escape' && isOpen) {
          e.preventDefault();
          setIsOpen(false);
        } else if (e.key === 'ArrowDown' && !isOpen) {
          e.preventDefault();
          setIsOpen(true);
        }
      },
      [disabled, isOpen, setIsOpen]
    );

    return (
      <button
        ref={ref}
        type="button"
        id={`${baseId}-trigger`}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${baseId}-menu`}
        aria-disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={`
          inline-flex items-center justify-between gap-2 rounded-lg font-medium transition-colors
          ${triggerVariantStyles[variant]}
          ${sizes.trigger}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          ${className}
        `}
      >
        <span className="flex items-center gap-2">
          {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
          <span>{children || placeholder}</span>
        </span>
        {showChevron && (
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        )}
      </button>
    );
  }
);

DropdownTrigger.displayName = 'DropdownTrigger';

// ========== DropdownMenu Component ==========
interface DropdownMenuProps {
  /** Menu items */
  children: ReactNode;
  /** Menu placement */
  placement?: DropdownPlacement;
  /** Additional CSS classes */
  className?: string;
  /** Minimum width (defaults to trigger width) */
  minWidth?: number | string;
}

function DropdownMenu({
  children,
  placement = 'bottom-start',
  className = '',
  minWidth,
}: DropdownMenuProps) {
  const { isOpen, baseId, size } = useDropdownContext();
  const sizes = sizeStyles[size];

  if (!isOpen) return null;

  return (
    <div
      id={`${baseId}-menu`}
      role="listbox"
      aria-labelledby={`${baseId}-trigger`}
      className={`
        absolute z-50 bg-white border border-gray-200 rounded-lg shadow-lg py-1 overflow-hidden
        ${placementStyles[placement]}
        ${sizes.menu}
        ${className}
      `}
      style={{ minWidth: minWidth || 'max-content' }}
    >
      {children}
    </div>
  );
}

// ========== DropdownItem Component ==========
interface DropdownItemProps {
  /** Item value for selection */
  value: string;
  /** Item display content */
  children: ReactNode;
  /** Optional icon */
  icon?: LucideIcon;
  /** Whether this item is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Click handler (called in addition to selection) */
  onClick?: () => void;
}

function DropdownItem({
  value,
  children,
  icon: Icon,
  disabled = false,
  className = '',
  onClick,
}: DropdownItemProps) {
  const { selectedValue, setSelectedValue, closeMenu, size } = useDropdownContext();
  const isSelected = selectedValue === value;
  const sizes = sizeStyles[size];

  const handleClick = useCallback(() => {
    if (!disabled) {
      setSelectedValue(value);
      onClick?.();
      closeMenu();
    }
  }, [disabled, value, setSelectedValue, onClick, closeMenu]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleClick();
      }
    },
    [disabled, handleClick]
  );

  return (
    <div
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={`
        flex items-center justify-between gap-2 cursor-pointer transition-colors
        ${sizes.item}
        ${isSelected ? 'bg-primary-50 text-primary-700' : 'text-gray-700 hover:bg-gray-50'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      <span className="flex items-center gap-2">
        {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
        <span>{children}</span>
      </span>
      {isSelected && <Check className="w-4 h-4 text-primary-600" aria-hidden="true" />}
    </div>
  );
}

// ========== DropdownDivider Component ==========
function DropdownDivider() {
  return <div className="border-t border-gray-200 my-1" role="separator" />;
}

// ========== DropdownLabel Component ==========
interface DropdownLabelProps {
  children: ReactNode;
  className?: string;
}

function DropdownLabel({ children, className = '' }: DropdownLabelProps) {
  return (
    <div
      className={`px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider ${className}`}
    >
      {children}
    </div>
  );
}

// ========== Main Dropdown Component ==========
interface DropdownProps {
  /** Currently selected value (controlled mode) */
  value?: string | null;
  /** Default selected value (uncontrolled mode) */
  defaultValue?: string | null;
  /** Callback when selection changes */
  onValueChange?: (value: string) => void;
  /** Visual variant */
  variant?: DropdownVariant;
  /** Size variant */
  size?: DropdownSize;
  /** Children (Trigger and Menu) */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
}

function Dropdown({
  value: controlledValue,
  defaultValue = null,
  onValueChange,
  variant = 'default',
  size = 'md',
  children,
  className = '',
  open: controlledOpen,
  onOpenChange,
}: DropdownProps) {
  const baseId = useId();
  const containerRef = useRef<HTMLDivElement>(null);

  // Internal state
  const [internalOpen, setInternalOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<string | null>(defaultValue);

  // Determine controlled vs uncontrolled
  const isOpenControlled = controlledOpen !== undefined;
  const isValueControlled = controlledValue !== undefined;

  const isOpen = isOpenControlled ? controlledOpen : internalOpen;
  const selectedValue = isValueControlled ? controlledValue : internalValue;

  const setIsOpen = useCallback(
    (open: boolean) => {
      if (!isOpenControlled) {
        setInternalOpen(open);
      }
      onOpenChange?.(open);
    },
    [isOpenControlled, onOpenChange]
  );

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const setSelectedValue = useCallback(
    (value: string) => {
      if (!isValueControlled) {
        setInternalValue(value);
      }
      onValueChange?.(value);
    },
    [isValueControlled, onValueChange]
  );

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, setIsOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, setIsOpen]);

  return (
    <DropdownContext.Provider
      value={{
        isOpen,
        setIsOpen,
        closeMenu,
        selectedValue,
        setSelectedValue,
        variant,
        size,
        baseId,
      }}
    >
      <div ref={containerRef} className={`relative inline-block ${className}`}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

// Attach compound components
Dropdown.Trigger = DropdownTrigger;
Dropdown.Menu = DropdownMenu;
Dropdown.Item = DropdownItem;
Dropdown.Divider = DropdownDivider;
Dropdown.Label = DropdownLabel;

export default Dropdown;
export type {
  DropdownPlacement,
  DropdownVariant,
  DropdownSize,
  DropdownProps,
  DropdownTriggerProps,
  DropdownMenuProps,
  DropdownItemProps,
};
