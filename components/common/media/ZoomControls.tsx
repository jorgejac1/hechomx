'use client';

import { useEffect } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { useZoomControls } from '@/hooks/media';

interface ZoomControlsProps {
  min?: number;
  max?: number;
  step?: number;
  initial?: number;
  onZoomChange?: (zoom: number) => void;
  showPercentage?: boolean;
  className?: string;
}

export default function ZoomControls({
  min = 1,
  max = 3,
  step = 0.5,
  initial,
  onZoomChange,
  showPercentage = true,
  className = '',
}: ZoomControlsProps) {
  const { zoom, zoomIn, zoomOut, canZoomIn, canZoomOut } = useZoomControls(
    min,
    max,
    step,
    initial
  );

  // Notify parent of zoom changes
  useEffect(() => {
    onZoomChange?.(zoom);
  }, [zoom, onZoomChange]);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button
        onClick={zoomOut}
        disabled={!canZoomOut}
        className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Alejar"
      >
        <ZoomOut className="w-5 h-5" />
      </button>

      {showPercentage && (
        <div className="px-3 py-1 bg-white/10 text-white text-sm rounded-full min-w-[60px] text-center">
          {Math.round(zoom * 100)}%
        </div>
      )}

      <button
        onClick={zoomIn}
        disabled={!canZoomIn}
        className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Acercar"
      >
        <ZoomIn className="w-5 h-5" />
      </button>
    </div>
  );
}