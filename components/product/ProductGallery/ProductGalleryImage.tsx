import Image from "next/image";
import { X } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/common/usePrefersReducedMotion";

interface ProductGalleryImageProps {
  url: string;
  alt: string;
  index: number;
  isLoaded: boolean;
  hasError: boolean;
  onLoad: () => void;
  onError: () => void;
  priority?: boolean;
  sizes: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ProductGalleryImage({
  url,
  alt,
  index,
  isLoaded,
  hasError,
  onLoad,
  onError,
  priority = false,
  sizes,
  className = "",
  style,
}: ProductGalleryImageProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const transitionClass = prefersReducedMotion ? "duration-0" : "duration-300";

  return (
    <>
      {/* Loading skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
      )}

      {/* Error state */}
      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center text-gray-400">
            <X className="w-12 h-12 mx-auto mb-2" />
            <p className="text-sm">Error al cargar imagen</p>
          </div>
        </div>
      ) : (
        <Image
          src={url}
          alt={alt}
          fill
          sizes={sizes}
          className={`object-contain transition-opacity ${transitionClass} ${
            isLoaded ? "opacity-100" : "opacity-0"
          } ${className}`}
          style={style}
          priority={priority}
          onLoad={onLoad}
          onError={onError}
        />
      )}
    </>
  );
}