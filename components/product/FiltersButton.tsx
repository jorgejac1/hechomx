"use client";

import { useState } from "react";
import FiltersDrawer from "./FiltersDrawer";
import SortDropdown from "./SortDropdown";
import ViewToggle from "./ViewToggle";
import Link from "next/link";

interface FiltersButtonProps {
  categories: string[];
  states: string[];
  currentCategory?: string;
  currentState?: string;
  currentQuery?: string;
  currentSort?: string;
  totalProducts: number;
  view: 'grid' | 'list';
  onViewChange: (view: 'grid' | 'list') => void;
}

export default function FiltersButton({
  categories,
  states,
  currentCategory,
  currentState,
  currentQuery,
  currentSort,
  totalProducts,
  view,
  onViewChange,
}: FiltersButtonProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  return (
    <>
      {/* Top Bar: Everything in one row */}
      <div className="mb-6">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          {/* Left side: Filters Button & Count */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsFiltersOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-gray-300 rounded-lg font-medium text-gray-700 hover:border-primary-500 hover:text-primary-600 transition"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Filtros
            </button>

            {/* Product Count */}
            <div className="text-sm">
              <span className="text-gray-900 font-bold text-lg">{totalProducts}</span>{" "}
              <span className="text-gray-600">{totalProducts === 1 ? "producto" : "productos"}</span>
            </div>
          </div>

          {/* Right side: View Toggle & Sort */}
          <div className="flex items-center gap-3">
            <ViewToggle view={view} onViewChange={onViewChange} />
            <SortDropdown currentSort={currentSort} />
          </div>
        </div>

        {/* Active Filters */}
        {(currentCategory || currentState || currentQuery) && (
          <div className="flex items-center gap-2 flex-wrap mt-4">
            <span className="text-sm text-gray-600 font-medium">
              Filtros activos:
            </span>
            
            {currentCategory && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Categoría: {currentCategory}
                <Link
                  href={
                    currentState
                      ? `/productos?estado=${currentState}`
                      : "/productos"
                  }
                  className="hover:text-primary-900"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Link>
              </span>
            )}
            
            {currentState && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Estado: {currentState}
                <Link
                  href={
                    currentCategory
                      ? `/productos?categoria=${currentCategory}`
                      : "/productos"
                  }
                  className="hover:text-primary-900"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Link>
              </span>
            )}

            {currentQuery && (
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                Búsqueda: "{currentQuery}"
                <Link
                  href={
                    currentCategory || currentState
                      ? `/productos?${currentCategory ? `categoria=${currentCategory}` : ''}${currentState ? `${currentCategory ? '&' : ''}estado=${currentState}` : ''}`
                      : "/productos"
                  }
                  className="hover:text-primary-900"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </Link>
              </span>
            )}
            
            <Link
              href="/productos"
              className="text-sm text-gray-600 hover:text-gray-900 font-medium underline"
            >
              Limpiar todo
            </Link>
          </div>
        )}
      </div>

      {/* Filters Drawer */}
      <FiltersDrawer
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        categories={categories}
        states={states}
        currentCategory={currentCategory}
        currentState={currentState}
      />
    </>
  );
}