import { useState, useCallback } from 'react';

/**
 * Zoom in/out state management
 * 
 * @param min - Minimum zoom level
 * @param max - Maximum zoom level
 * @param step - Zoom increment
 * @param initial - Initial zoom level
 * @returns Zoom controls
 * 
 * @example
 * const { zoom, zoomIn, zoomOut, canZoomIn, canZoomOut } = 
 *   useZoomControls(1, 3, 0.5);
 */
export interface UseZoomControlsReturn {
  zoom: number;
  zoomIn: () => void;
  zoomOut: () => void;
  setZoom: (level: number) => void;
  reset: () => void;
  canZoomIn: boolean;
  canZoomOut: boolean;
}

export function useZoomControls(
  min: number = 1,
  max: number = 3,
  step: number = 0.5,
  initial?: number
): UseZoomControlsReturn {
  const [zoom, setZoomState] = useState(initial || min);

  const zoomIn = useCallback(() => {
    setZoomState((prev) => Math.min(prev + step, max));
  }, [step, max]);

  const zoomOut = useCallback(() => {
    setZoomState((prev) => Math.max(prev - step, min));
  }, [step, min]);

  const setZoom = useCallback(
    (level: number) => {
      setZoomState(Math.max(min, Math.min(max, level)));
    },
    [min, max]
  );

  const reset = useCallback(() => {
    setZoomState(initial || min);
  }, [initial, min]);

  const canZoomIn = zoom < max;
  const canZoomOut = zoom > min;

  return {
    zoom,
    zoomIn,
    zoomOut,
    setZoom,
    reset,
    canZoomIn,
    canZoomOut,
  };
}