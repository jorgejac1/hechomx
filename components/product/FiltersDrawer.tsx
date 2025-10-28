'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FiltersDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  states: string[];
  currentCategory?: string;
  currentState?: string;
}

export default function FiltersDrawer({
  isOpen,
  onClose,
  categories,
  states,
  currentCategory,
  currentState
}: FiltersDrawerProps) {
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900">Filtros</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition"
              aria-label="Cerrar filtros"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Filters Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Categories */}
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Categorías</h3>
              <div className="space-y-2">
                <Link
                  href="/productos"
                  onClick={onClose}
                  className={`block px-4 py-2 rounded-lg text-sm transition ${
                    !currentCategory
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Todas las categorías
                </Link>
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/productos?categoria=${encodeURIComponent(category)}`}
                    onClick={onClose}
                    className={`block px-4 py-2 rounded-lg text-sm transition ${
                      currentCategory === category
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </Link>
                ))}
              </div>
            </div>

            {/* States */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4 text-lg">Estados</h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                <Link
                  href="/productos"
                  onClick={onClose}
                  className={`block px-4 py-2 rounded-lg text-sm transition ${
                    !currentState
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Todos los estados
                </Link>
                {states.map((state) => (
                  <Link
                    key={state}
                    href={`/productos?estado=${encodeURIComponent(state)}`}
                    onClick={onClose}
                    className={`block px-4 py-2 rounded-lg text-sm transition ${
                      currentState === state
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {state}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t">
            <Link
              href="/productos"
              onClick={onClose}
              className="block w-full text-center px-4 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
            >
              Limpiar filtros
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}