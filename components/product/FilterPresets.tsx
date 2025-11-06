'use client';

import { Suspense } from 'react';
import { useUrlState } from '@/hooks/common/useUrlState';
import { FILTER_PRESETS, matchesPreset } from '@/lib/constants/filterPresets';

function FilterPresetsContent() {
  const { searchParams, setUrlParams, clearUrlParams } = useUrlState('/productos');

  const handlePresetClick = (presetId: string) => {
    const preset = FILTER_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    const isActive = matchesPreset(searchParams, preset);

    if (isActive) {
      clearUrlParams();
    } else {
      setUrlParams(preset.params);
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-3">Filtros rápidos:</h3>
      <div className="flex gap-3 flex-wrap">
        {FILTER_PRESETS.map((preset) => {
          const isActive = matchesPreset(searchParams, preset);

          return (
            <button
              key={preset.id}
              onClick={() => handlePresetClick(preset.id)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isActive
                  ? 'bg-primary-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-primary-500'
              }`}
              title={preset.description}
            >
              <span className="text-lg">{preset.icon}</span>
              {preset.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function FilterPresets() {
  return (
    <Suspense fallback={<div className="h-16 animate-pulse bg-gray-200 rounded-lg" />}>
      <FilterPresetsContent />
    </Suspense>
  );
}
