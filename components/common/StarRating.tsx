interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  reviewCount?: number;
  productId?: string;
}

export default function StarRating({
  rating,
  maxRating = 5,
  size = 'md',
  showValue = true,
  reviewCount,
  productId = 'default'
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {/* Full Stars */}
        {[...Array(fullStars)].map((_, i) => (
          <svg key={`full-${i}`} className={`${sizeClasses[size]} text-yellow-400 fill-current`} viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
        {/* Half Star */}
        {hasHalfStar && (
          <svg className={`${sizeClasses[size]} text-yellow-400`} viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`half-${productId}`}>
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="#D1D5DB" stopOpacity="1" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#half-${productId})`}
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>
        )}
        {/* Empty Stars */}
        {[...Array(emptyStars)].map((_, i) => (
          <svg key={`empty-${i}`} className={`${sizeClasses[size]} text-gray-300 fill-current`} viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
      {showValue && (
        <>
          <span className={`${textSizeClasses[size]} font-semibold text-gray-700`}>
            {rating.toFixed(1)}
          </span>
          {reviewCount && (
            <span className={`${textSizeClasses[size]} text-gray-500`}>
              ({reviewCount})
            </span>
          )}
        </>
      )}
    </div>
  );
}