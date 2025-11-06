'use client';

import { useState, useRef, useEffect, Suspense } from 'react';
import { useUrlState } from '@/hooks/common/useUrlState';
import { FILTER_PARAM_NAMES, SORT_OPTIONS } from '@/lib/constants/filters';
import type { SortOption } from '@/types/filters';

interface SortDropdownProps {
  currentSort?: string;
}

function SortDropdownContent({ currentSort = 'relevance' }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { setUrlParams } = useUrlState('/productos');

  const currentOption = SORT_OPTIONS.find((opt) => opt.value === currentSort) || SORT_OPTIONS[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSort = (sortValue: SortOption) => {
    setUrlParams({
      [FILTER_PARAM_NAMES.SORT]: sortValue === 'relevance' ? undefined : sortValue,
      [FILTER_PARAM_NAMES.PAGE]: undefined,
    });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:border-primary-500 hover:text-primary-600 transition"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
          />
        </svg>
        <span className="hidden sm:inline">Ordenar:</span>
        <span>{currentOption.label}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-30">
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSort(option.value as SortOption)}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition ${
                currentSort === option.value
                  ? 'text-primary-600 font-medium bg-primary-50'
                  : 'text-gray-700'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SortDropdown({ currentSort }: SortDropdownProps) {
  return (
    <Suspense fallback={<div className="h-10 w-64 animate-pulse bg-gray-200 rounded-lg" />}>
      <SortDropdownContent currentSort={currentSort} />
    </Suspense>
  );
}
