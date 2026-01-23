/**
 * @fileoverview Lazy loading utilities for deferred content rendering.
 * Provides LazyLoad component, createLazyComponent factory, useViewportLazy hook,
 * and withLazyLoad HOC for various lazy loading strategies including
 * Suspense-based and Intersection Observer-based approaches.
 * @module components/common/LazyLoad
 */

'use client';

import { ReactNode, Suspense, lazy, ComponentType, useState, useEffect, useRef } from 'react';

/**
 * Props for the LazyLoad component
 * @interface LazyLoadProps
 */
interface LazyLoadProps {
  /** Content to render when loading */
  fallback?: ReactNode;
  /** Children to render lazily */
  children: ReactNode;
  /** Whether to use intersection observer for viewport-based loading */
  useViewport?: boolean;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Threshold for intersection observer */
  threshold?: number | number[];
  /** Additional CSS classes for the container */
  className?: string;
  /** Minimum height to prevent layout shift */
  minHeight?: number | string;
}

/**
 * LazyLoad component for deferred rendering of content.
 * Supports both Suspense-based and Intersection Observer-based lazy loading.
 */
export default function LazyLoad({
  fallback,
  children,
  useViewport = false,
  rootMargin = '100px',
  threshold = 0,
  className = '',
  minHeight,
}: LazyLoadProps) {
  const [isVisible, setIsVisible] = useState(!useViewport);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!useViewport || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [useViewport, isVisible, rootMargin, threshold]);

  const defaultFallback = (
    <div className="animate-pulse bg-gray-100 rounded-lg" style={{ minHeight: minHeight || 100 }} />
  );

  if (useViewport && !isVisible) {
    return (
      <div ref={containerRef} className={className} style={{ minHeight: minHeight || 100 }}>
        {fallback || defaultFallback}
      </div>
    );
  }

  return (
    <Suspense fallback={fallback || defaultFallback}>
      <div className={className}>{children}</div>
    </Suspense>
  );
}

/**
 * Creates a lazy-loaded version of a component with automatic code splitting.
 *
 * @example
 * const LazyChart = createLazyComponent(() => import('./Chart'));
 *
 * <LazyChart data={chartData} fallback={<ChartSkeleton />} />
 */
export function createLazyComponent<P extends object>(
  importFn: () => Promise<{ default: ComponentType<P> }>,
  options?: {
    fallback?: ReactNode;
    preload?: boolean;
  }
): ComponentType<P> & { preload: () => Promise<{ default: ComponentType<P> }> } {
  const LazyComponent = lazy(importFn);

  // Create a wrapper component that includes Suspense
  const WrappedComponent = (props: P) => {
    const fallback = options?.fallback || (
      <div className="animate-pulse bg-gray-100 rounded-lg h-24" />
    );

    return (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

  // Add preload method for eager loading
  const ComponentWithPreload = WrappedComponent as ComponentType<P> & {
    preload: () => Promise<{ default: ComponentType<P> }>;
  };
  ComponentWithPreload.preload = importFn;

  // Optionally preload on creation
  if (options?.preload) {
    importFn();
  }

  return ComponentWithPreload;
}

/**
 * Hook for lazy loading content when it enters the viewport.
 *
 * @example
 * const { ref, isVisible } = useViewportLazy();
 *
 * return (
 *   <div ref={ref}>
 *     {isVisible ? <HeavyComponent /> : <Skeleton />}
 *   </div>
 * );
 */
export function useViewportLazy(options?: {
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}) {
  const { rootMargin = '100px', threshold = 0, triggerOnce = true } = options || {};
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [rootMargin, threshold, triggerOnce]);

  return { ref, isVisible };
}

/**
 * Higher-order component for lazy loading with viewport detection.
 *
 * @example
 * const LazyImage = withLazyLoad(Image, { minHeight: 200 });
 */
export function withLazyLoad<P extends object>(
  Component: ComponentType<P>,
  options?: {
    fallback?: ReactNode;
    rootMargin?: string;
    threshold?: number | number[];
    minHeight?: number | string;
  }
) {
  const WrappedComponent = (props: P) => {
    const { ref, isVisible } = useViewportLazy({
      rootMargin: options?.rootMargin,
      threshold: options?.threshold,
    });

    const fallback = options?.fallback || (
      <div
        className="animate-pulse bg-gray-100 rounded-lg"
        style={{ minHeight: options?.minHeight || 100 }}
      />
    );

    return (
      <div ref={ref} style={{ minHeight: options?.minHeight }}>
        {isVisible ? <Component {...props} /> : fallback}
      </div>
    );
  };

  WrappedComponent.displayName = `withLazyLoad(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
}
