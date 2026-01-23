/**
 * @fileoverview Autocomplete component for searchable dropdown selection.
 * Features single and multiple selection, async search, option groups,
 * creatable options, keyboard navigation, and full accessibility support.
 * @module components/common/Autocomplete
 */

'use client';

import { useState, useRef, useEffect, useCallback, useMemo, useId, KeyboardEvent } from 'react';
import { Search, X, Loader2, ChevronDown } from 'lucide-react';

/**
 * Available autocomplete sizes
 * @typedef {'sm' | 'md' | 'lg'} AutocompleteSize
 */
type AutocompleteSize = 'sm' | 'md' | 'lg';

/**
 * Configuration for an autocomplete option
 * @interface AutocompleteOption
 * @template T - The type of the option value
 */
interface AutocompleteOption<T = string> {
  /** Unique identifier for the option */
  value: T;
  /** Display text shown in the dropdown */
  label: string;
  /** Optional secondary text shown below the label */
  description?: string;
  /** Optional icon or image element */
  icon?: React.ReactNode;
  /** Whether this option is disabled and non-selectable */
  disabled?: boolean;
  /** Optional group name for organizing options into sections */
  group?: string;
}

/**
 * Props for the Autocomplete component
 * @interface AutocompleteProps
 * @template T - The type of option values
 */
interface AutocompleteProps<T = string> {
  /** Array of available options to choose from */
  options: AutocompleteOption<T>[];
  /** Currently selected value(s) */
  value?: T | T[] | null;
  /** Callback fired when selection changes */
  onChange?: (value: T | T[] | null) => void;
  /** Callback fired when input text changes (useful for async search) */
  onInputChange?: (query: string) => void;
  /** Placeholder text shown when input is empty */
  placeholder?: string;
  /** Label text displayed above the input */
  label?: string;
  /** Helper text with additional instructions */
  helperText?: string;
  /** Error message to display */
  error?: string;
  /** Whether multiple options can be selected */
  multiple?: boolean;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the field is required */
  required?: boolean;
  /** Whether to show a loading spinner */
  loading?: boolean;
  /** Size variant affecting padding and font size */
  size?: AutocompleteSize;
  /** Whether users can create new options from their search query */
  creatable?: boolean;
  /** Function to generate the create option label */
  createLabel?: (query: string) => string;
  /** Callback fired when a new option is created */
  onCreate?: (query: string) => void;
  /** Whether to clear input after selecting an option */
  clearOnSelect?: boolean;
  /** Custom function to filter options based on query */
  filterFn?: (option: AutocompleteOption<T>, query: string) => boolean;
  /** Message shown when no options match the query */
  noOptionsMessage?: string;
  /** Whether to show a clear button */
  clearable?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Form input name attribute */
  name?: string;
  /** Minimum characters required before showing options */
  minChars?: number;
  /** Maximum number of options to display */
  maxOptions?: number;
}

// Size styles
const sizeStyles: Record<AutocompleteSize, { input: string; option: string; tag: string }> = {
  sm: { input: 'px-3 py-1.5 text-sm', option: 'px-3 py-1.5 text-sm', tag: 'px-2 py-0.5 text-xs' },
  md: { input: 'px-4 py-2 text-base', option: 'px-4 py-2 text-sm', tag: 'px-2.5 py-1 text-sm' },
  lg: { input: 'px-5 py-3 text-lg', option: 'px-5 py-3 text-base', tag: 'px-3 py-1.5 text-base' },
};

function defaultFilter<T>(option: AutocompleteOption<T>, query: string): boolean {
  const searchText = query.toLowerCase();
  return (
    option.label.toLowerCase().includes(searchText) ||
    (option.description?.toLowerCase().includes(searchText) ?? false)
  );
}

function Autocomplete<T = string>({
  options,
  value,
  onChange,
  onInputChange,
  placeholder = 'Buscar...',
  label,
  helperText,
  error,
  multiple = false,
  disabled = false,
  required = false,
  loading = false,
  size = 'md',
  creatable = false,
  createLabel = (query) => `Crear "${query}"`,
  onCreate,
  clearOnSelect = false,
  filterFn = defaultFilter,
  noOptionsMessage = 'No se encontraron resultados',
  clearable = true,
  className = '',
  name,
  minChars = 0,
  maxOptions = 50,
}: AutocompleteProps<T>) {
  const id = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const sizes = sizeStyles[size];

  // Get selected options for display
  const selectedOptions = useMemo(() => {
    if (!value) return [];
    const values = Array.isArray(value) ? value : [value];
    return values
      .map((v) => options.find((o) => o.value === v))
      .filter(Boolean) as AutocompleteOption<T>[];
  }, [value, options]);

  // Filter options based on query
  const filteredOptions = useMemo(() => {
    if (query.length < minChars) return [];

    let filtered = options.filter((option) => {
      // Exclude already selected in multiple mode
      if (multiple && Array.isArray(value) && value.includes(option.value)) {
        return false;
      }
      return filterFn(option, query);
    });

    // Limit results
    filtered = filtered.slice(0, maxOptions);

    return filtered;
  }, [options, query, filterFn, multiple, value, minChars, maxOptions]);

  // Group options if they have groups
  const groupedOptions = useMemo(() => {
    const groups: { [key: string]: AutocompleteOption<T>[] } = {};
    const ungrouped: AutocompleteOption<T>[] = [];

    filteredOptions.forEach((option) => {
      if (option.group) {
        if (!groups[option.group]) groups[option.group] = [];
        groups[option.group].push(option);
      } else {
        ungrouped.push(option);
      }
    });

    return { groups, ungrouped };
  }, [filteredOptions]);

  // Check if we should show create option
  const showCreateOption = useMemo(() => {
    if (!creatable || !query.trim()) return false;
    return !options.some((o) => o.label.toLowerCase() === query.toLowerCase());
  }, [creatable, query, options]);

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newQuery = e.target.value;
      setQuery(newQuery);
      setHighlightedIndex(-1);
      onInputChange?.(newQuery);

      if (!isOpen && newQuery.length >= minChars) {
        setIsOpen(true);
      }
    },
    [onInputChange, isOpen, minChars]
  );

  // Handle option selection
  const handleSelect = useCallback(
    (option: AutocompleteOption<T>) => {
      if (option.disabled) return;

      if (multiple) {
        const currentValues = Array.isArray(value) ? value : [];
        const newValues = [...currentValues, option.value];
        onChange?.(newValues as T[]);
      } else {
        onChange?.(option.value);
        setIsOpen(false);
      }

      if (clearOnSelect || multiple) {
        setQuery('');
      } else {
        setQuery(option.label);
      }

      setHighlightedIndex(-1);
      inputRef.current?.focus();
    },
    [multiple, value, onChange, clearOnSelect]
  );

  // Handle create
  const handleCreate = useCallback(() => {
    onCreate?.(query);
    setQuery('');
    setIsOpen(false);
  }, [onCreate, query]);

  // Handle remove (for multiple)
  const handleRemove = useCallback(
    (valueToRemove: T) => {
      if (!multiple || !Array.isArray(value)) return;
      const newValues = value.filter((v) => v !== valueToRemove);
      onChange?.(newValues.length > 0 ? newValues : null);
    },
    [multiple, value, onChange]
  );

  // Handle clear all
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(null);
      setQuery('');
      inputRef.current?.focus();
    },
    [onChange]
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const totalOptions = filteredOptions.length + (showCreateOption ? 1 : 0);

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setHighlightedIndex((prev) => (prev < totalOptions - 1 ? prev + 1 : 0));
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : totalOptions - 1));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0) {
            if (highlightedIndex < filteredOptions.length) {
              handleSelect(filteredOptions[highlightedIndex]);
            } else if (showCreateOption) {
              handleCreate();
            }
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
        case 'Backspace':
          if (!query && multiple && Array.isArray(value) && value.length > 0) {
            handleRemove(value[value.length - 1]);
          }
          break;
      }
    },
    [
      isOpen,
      highlightedIndex,
      filteredOptions,
      showCreateOption,
      handleSelect,
      handleCreate,
      multiple,
      value,
      query,
      handleRemove,
    ]
  );

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Scroll highlighted option into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const highlighted = listRef.current.children[highlightedIndex] as HTMLElement;
      highlighted?.scrollIntoView({ block: 'nearest' });
    }
  }, [highlightedIndex]);

  const hasValue = multiple ? Array.isArray(value) && value.length > 0 : !!value;

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Input container */}
      <div
        className={`
          relative flex flex-wrap items-center gap-1.5 rounded-lg border transition-colors
          ${sizes.input}
          ${
            error
              ? 'border-red-500 focus-within:ring-red-500 focus-within:border-red-500'
              : 'border-gray-300 dark:border-gray-600 focus-within:ring-primary-500 focus-within:border-primary-500'
          }
          ${
            disabled
              ? 'bg-gray-100 dark:bg-gray-800 cursor-not-allowed'
              : 'bg-white dark:bg-gray-800 cursor-text'
          }
          focus-within:outline-none focus-within:ring-2
        `}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {/* Search icon */}
        <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 shrink-0" />

        {/* Selected tags (multiple mode) */}
        {multiple &&
          selectedOptions.map((option) => (
            <span
              key={String(option.value)}
              className={`
              inline-flex items-center gap-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-md
              ${sizes.tag}
            `}
            >
              {option.icon}
              <span className="truncate max-w-[150px]">{option.label}</span>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(option.value);
                }}
                className="hover:text-primary-900 dark:hover:text-primary-100"
                aria-label={`Eliminar ${option.label}`}
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          id={id}
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length >= minChars && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={hasValue && !multiple ? '' : placeholder}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-controls={`${id}-listbox`}
          aria-autocomplete="list"
          className="flex-1 min-w-[100px] bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 disabled:cursor-not-allowed"
        />

        {/* Loading spinner */}
        {loading && <Loader2 className="w-5 h-5 text-gray-400 animate-spin shrink-0" />}

        {/* Clear button */}
        {clearable && hasValue && !disabled && !loading && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors shrink-0"
            aria-label="Limpiar"
          >
            <X className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </button>
        )}

        {/* Dropdown indicator */}
        <ChevronDown
          className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform shrink-0 ${isOpen ? 'rotate-180' : ''}`}
        />

        {/* Hidden input for forms */}
        {name && (
          <input
            type="hidden"
            name={name}
            value={Array.isArray(value) ? value.join(',') : String(value ?? '')}
          />
        )}
      </div>

      {/* Helper/Error text */}
      {(helperText || error) && (
        <p
          className={`mt-1 text-sm ${error ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'}`}
        >
          {error || helperText}
        </p>
      )}

      {/* Dropdown */}
      {isOpen && (
        <ul
          ref={listRef}
          id={`${id}-listbox`}
          role="listbox"
          aria-label="Opciones"
          className="absolute z-50 w-full mt-1 max-h-60 overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1"
        >
          {/* Ungrouped options */}
          {groupedOptions.ungrouped.map((option, index) => (
            <li
              key={String(option.value)}
              role="option"
              aria-selected={!multiple && value === option.value}
              aria-disabled={option.disabled}
              onClick={() => handleSelect(option)}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={`
                ${sizes.option} cursor-pointer flex items-center gap-3 transition-colors
                ${highlightedIndex === index ? 'bg-primary-50 dark:bg-primary-900/30' : ''}
                ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}
              `}
            >
              {option.icon && <span className="shrink-0">{option.icon}</span>}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                  {option.label}
                </div>
                {option.description && (
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {option.description}
                  </div>
                )}
              </div>
            </li>
          ))}

          {/* Grouped options */}
          {Object.entries(groupedOptions.groups).map(([group, groupOptions]) => (
            <li key={group}>
              <div className="px-4 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider bg-gray-50 dark:bg-gray-900/50">
                {group}
              </div>
              <ul>
                {groupOptions.map((option, idx) => {
                  const globalIndex = groupedOptions.ungrouped.length + idx;
                  return (
                    <li
                      key={String(option.value)}
                      role="option"
                      aria-selected={!multiple && value === option.value}
                      aria-disabled={option.disabled}
                      onClick={() => handleSelect(option)}
                      onMouseEnter={() => setHighlightedIndex(globalIndex)}
                      className={`
                        ${sizes.option} cursor-pointer flex items-center gap-3 transition-colors
                        ${highlightedIndex === globalIndex ? 'bg-primary-50 dark:bg-primary-900/30' : ''}
                        ${option.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}
                      `}
                    >
                      {option.icon && <span className="shrink-0">{option.icon}</span>}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900 dark:text-gray-100 truncate">
                          {option.label}
                        </div>
                        {option.description && (
                          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
                            {option.description}
                          </div>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}

          {/* Create option */}
          {showCreateOption && (
            <li
              role="option"
              onClick={handleCreate}
              onMouseEnter={() => setHighlightedIndex(filteredOptions.length)}
              className={`
                ${sizes.option} cursor-pointer flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium transition-colors
                ${highlightedIndex === filteredOptions.length ? 'bg-primary-50 dark:bg-primary-900/30' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}
              `}
            >
              <span>+</span>
              <span>{createLabel(query)}</span>
            </li>
          )}

          {/* No results */}
          {filteredOptions.length === 0 && !showCreateOption && query.length >= minChars && (
            <li className={`${sizes.option} text-gray-500 dark:text-gray-400 text-center`}>
              {loading ? 'Buscando...' : noOptionsMessage}
            </li>
          )}

          {/* Min chars message */}
          {query.length < minChars && query.length > 0 && (
            <li className={`${sizes.option} text-gray-500 dark:text-gray-400 text-center`}>
              Escribe al menos {minChars} caracteres
            </li>
          )}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
export type { AutocompleteProps, AutocompleteOption, AutocompleteSize };
