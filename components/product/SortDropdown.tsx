/**
 * @fileoverview Sort dropdown component for product listings
 * Provides a dropdown menu to select product sort order.
 * Syncs with URL parameters for shareable sorted views.
 * @module components/product/SortDropdown
 */

'use client';

import { Suspense } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { useUrlState } from '@/hooks/common/useUrlState';
import { FILTER_PARAM_NAMES, SORT_OPTIONS } from '@/lib/constants/filters';
import Dropdown from '@/components/common/Dropdown';

/**
 * Props for the SortDropdown component
 * @interface SortDropdownProps
 */
interface SortDropdownProps {
  /** Currently selected sort option value */
  currentSort?: string;
}

function SortDropdownContent({ currentSort = 'relevance' }: SortDropdownProps) {
  const { setUrlParams } = useUrlState('/productos');

  const currentOption = SORT_OPTIONS.find((opt) => opt.value === currentSort) || SORT_OPTIONS[0];

  const handleSort = (sortValue: string) => {
    setUrlParams({
      [FILTER_PARAM_NAMES.SORT]: sortValue === 'relevance' ? undefined : sortValue,
      [FILTER_PARAM_NAMES.PAGE]: undefined,
    });
  };

  return (
    <Dropdown value={currentSort} onValueChange={handleSort} variant="outline" size="md">
      <Dropdown.Trigger icon={ArrowUpDown} className="min-w-[200px]">
        <span className="hidden sm:inline">Ordenar: </span>
        {currentOption.label}
      </Dropdown.Trigger>
      <Dropdown.Menu placement="bottom-end" minWidth={220}>
        {SORT_OPTIONS.map((option) => (
          <Dropdown.Item key={option.value} value={option.value}>
            {option.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default function SortDropdown({ currentSort }: SortDropdownProps) {
  return (
    <Suspense fallback={<div className="h-10 w-64 animate-pulse bg-gray-200 rounded-lg" />}>
      <SortDropdownContent currentSort={currentSort} />
    </Suspense>
  );
}
