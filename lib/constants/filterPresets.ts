/**
 * Pre-configured filter combinations
 */

import { FILTER_PARAM_NAMES } from './filters';

export interface FilterPreset {
  id: string;
  name: string;
  description: string;
  icon: string;
  params: Record<string, string>;
}

export const FILTER_PRESETS: FilterPreset[] = [
  {
    id: 'popular',
    name: 'Más Populares',
    description: 'Productos verificados más vendidos',
    icon: '🔥',
    params: {
      [FILTER_PARAM_NAMES.SORT]: 'popular',
      [FILTER_PARAM_NAMES.VERIFIED]: 'si',
    },
  },
  {
    id: 'budget',
    name: 'Económicos',
    description: 'Productos más accesibles',
    icon: '💰',
    params: {
      [FILTER_PARAM_NAMES.SORT]: 'price-asc',
      [FILTER_PARAM_NAMES.PRICE]: '1000',
    },
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Lo mejor calificado y destacado',
    icon: '⭐',
    params: {
      [FILTER_PARAM_NAMES.SORT]: 'rating-desc',
      [FILTER_PARAM_NAMES.VERIFIED]: 'si',
      [FILTER_PARAM_NAMES.FEATURED]: 'si',
    },
  },
  {
    id: 'featured',
    name: 'Destacados',
    description: 'Productos destacados en stock',
    icon: '✨',
    params: {
      [FILTER_PARAM_NAMES.FEATURED]: 'si',
      [FILTER_PARAM_NAMES.IN_STOCK]: 'si',
    },
  },
  {
    id: 'new-arrivals',
    name: 'Recién Llegados',
    description: 'Los productos más nuevos',
    icon: '🆕',
    params: {
      [FILTER_PARAM_NAMES.SORT]: 'newest',
      [FILTER_PARAM_NAMES.IN_STOCK]: 'si',
    },
  },
];

/**
 * Gets a filter preset by ID
 */
export const getFilterPreset = (id: string): FilterPreset | undefined => {
  return FILTER_PRESETS.find((preset) => preset.id === id);
};

/**
 * Checks if current params match a preset
 */
export const matchesPreset = (currentParams: URLSearchParams, preset: FilterPreset): boolean => {
  const presetKeys = Object.keys(preset.params);

  // Check if all preset params match current params
  return presetKeys.every((key) => {
    return currentParams.get(key) === preset.params[key];
  });
};
