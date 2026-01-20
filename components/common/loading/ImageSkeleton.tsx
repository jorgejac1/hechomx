import Skeleton from './Skeleton';

interface ImageSkeletonProps {
  aspectRatio?: 'square' | 'video' | 'wide' | 'portrait';
  className?: string;
  rounded?: boolean;
}

const aspectRatioClasses = {
  square: 'aspect-square',
  video: 'aspect-video',
  wide: 'aspect-21/9',
  portrait: 'aspect-3/4',
};

export default function ImageSkeleton({
  aspectRatio = 'square',
  className = '',
  rounded = true,
}: ImageSkeletonProps) {
  return (
    <Skeleton
      variant="rectangular"
      className={`
        w-full
        ${aspectRatioClasses[aspectRatio]}
        ${rounded ? 'rounded-lg' : ''}
        ${className}
      `}
    />
  );
}