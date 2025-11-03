import { ReactNode } from 'react';
import { PackageOpen, Search, ShoppingBag, Heart } from 'lucide-react';

type IconType = 'package' | 'search' | 'cart' | 'heart';

interface EmptyStateProps {
  icon?: IconType | ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

const iconMap: Record<IconType, React.ComponentType<any>> = {
  package: PackageOpen,
  search: Search,
  cart: ShoppingBag,
  heart: Heart,
};

export default function EmptyState({
  icon = 'package',
  title,
  description,
  action,
  className = '',
}: EmptyStateProps) {
  // Type guard to check if icon is a string key
  const isIconKey = (value: any): value is IconType => {
    return typeof value === 'string' && value in iconMap;
  };

  const IconComponent = isIconKey(icon) ? iconMap[icon] : null;

  return (
    <div className={`flex flex-col items-center justify-center py-12 px-4 text-center ${className}`}>
      <div className="w-16 h-16 mb-4 text-gray-300">
        {IconComponent ? (
          <IconComponent className="w-full h-full" />
        ) : (
          icon
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      
      {description && (
        <p className="text-gray-600 mb-6 max-w-md">
          {description}
        </p>
      )}
      
      {action && (
        <div className="mt-4">
          {action}
        </div>
      )}
    </div>
  );
}