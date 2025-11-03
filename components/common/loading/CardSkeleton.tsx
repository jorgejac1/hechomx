import Skeleton from './Skeleton';
import ImageSkeleton from './ImageSkeleton';

interface CardSkeletonProps {
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  showPrice?: boolean;
  showActions?: boolean;
  className?: string;
}

export default function CardSkeleton({
  showImage = true,
  showTitle = true,
  showDescription = true,
  showPrice = true,
  showActions = true,
  className = '',
}: CardSkeletonProps) {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}>
      {showImage && (
        <ImageSkeleton aspectRatio="square" rounded={false} />
      )}
      
      <div className="p-4 space-y-3">
        {showTitle && (
          <Skeleton className="h-5 w-3/4" />
        )}
        
        {showDescription && (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        )}
        
        {showPrice && (
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        )}
        
        {showActions && (
          <div className="flex gap-2 pt-2">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-10" variant="circular" />
          </div>
        )}
      </div>
    </div>
  );
}