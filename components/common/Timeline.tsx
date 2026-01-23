/**
 * @fileoverview Timeline component for displaying chronological events or processes.
 * Supports default, alternate (zigzag), and right-aligned layouts with status indicators,
 * custom icons, timestamps, and additional content for each item.
 * @module components/common/Timeline
 */

import { ReactNode } from 'react';
import { Check, Circle, type LucideIcon } from 'lucide-react';

/**
 * Available timeline layout variants
 * @typedef {'default' | 'alternate' | 'right'} TimelineVariant
 */
type TimelineVariant = 'default' | 'alternate' | 'right';

/**
 * Available timeline sizes
 * @typedef {'sm' | 'md' | 'lg'} TimelineSize
 */
type TimelineSize = 'sm' | 'md' | 'lg';

/**
 * Status of a timeline item
 * @typedef {'completed' | 'current' | 'pending' | 'error'} TimelineItemStatus
 */
type TimelineItemStatus = 'completed' | 'current' | 'pending' | 'error';

/**
 * Configuration for a single timeline item
 * @interface TimelineItem
 */
interface TimelineItem {
  /** Unique identifier */
  id: string;
  /** Title of the timeline item */
  title: string;
  /** Description or content */
  description?: string;
  /** Timestamp or date string */
  timestamp?: string;
  /** Status of the item */
  status?: TimelineItemStatus;
  /** Custom icon */
  icon?: LucideIcon;
  /** Custom color (overrides status color) */
  color?: string;
  /** Additional content */
  content?: ReactNode;
}

interface TimelineProps {
  /** Array of timeline items */
  items: TimelineItem[];
  /** Layout variant */
  variant?: TimelineVariant;
  /** Size variant */
  size?: TimelineSize;
  /** Whether to show connector lines */
  showConnector?: boolean;
  /** Additional CSS classes */
  className?: string;
}

// Size configurations
const sizeConfig: Record<
  TimelineSize,
  {
    dot: string;
    icon: string;
    title: string;
    description: string;
    timestamp: string;
    connector: string;
    gap: string;
  }
> = {
  sm: {
    dot: 'w-3 h-3',
    icon: 'w-4 h-4',
    title: 'text-sm font-medium',
    description: 'text-xs',
    timestamp: 'text-xs',
    connector: 'w-0.5',
    gap: 'gap-3',
  },
  md: {
    dot: 'w-4 h-4',
    icon: 'w-5 h-5',
    title: 'text-base font-semibold',
    description: 'text-sm',
    timestamp: 'text-sm',
    connector: 'w-0.5',
    gap: 'gap-4',
  },
  lg: {
    dot: 'w-5 h-5',
    icon: 'w-6 h-6',
    title: 'text-lg font-bold',
    description: 'text-base',
    timestamp: 'text-base',
    connector: 'w-1',
    gap: 'gap-5',
  },
};

// Status styles
const statusStyles: Record<
  TimelineItemStatus,
  {
    dot: string;
    connector: string;
    icon: LucideIcon;
  }
> = {
  completed: {
    dot: 'bg-green-500 border-green-500',
    connector: 'bg-green-500',
    icon: Check,
  },
  current: {
    dot: 'bg-primary-500 border-primary-500 ring-4 ring-primary-100',
    connector: 'bg-gray-300',
    icon: Circle,
  },
  pending: {
    dot: 'bg-gray-200 border-gray-300',
    connector: 'bg-gray-200',
    icon: Circle,
  },
  error: {
    dot: 'bg-red-500 border-red-500',
    connector: 'bg-red-300',
    icon: Circle,
  },
};

// Single Timeline Item Component
interface TimelineItemComponentProps {
  item: TimelineItem;
  size: TimelineSize;
  showConnector: boolean;
  isLast: boolean;
  isAlternate: boolean;
  isRight: boolean;
  index: number;
}

function TimelineItemComponent({
  item,
  size,
  showConnector,
  isLast,
  isAlternate,
  isRight,
  index,
}: TimelineItemComponentProps) {
  const sizes = sizeConfig[size];
  const status = item.status || 'pending';
  const statusStyle = statusStyles[status];
  const Icon = item.icon || (status === 'completed' ? Check : Circle);

  const isEven = index % 2 === 0;
  const showOnRight = isRight || (isAlternate && !isEven);

  // Dot/Icon component
  const DotComponent = (
    <div
      className={`
        relative shrink-0 rounded-full border-2 flex items-center justify-center
        ${sizes.dot}
        ${item.color ? '' : statusStyle.dot}
      `}
      style={item.color ? { backgroundColor: item.color, borderColor: item.color } : undefined}
    >
      {item.icon || status === 'completed' ? <Icon className={`${sizes.icon} text-white`} /> : null}
    </div>
  );

  // Content component
  const ContentComponent = (
    <div className={`flex-1 min-w-0 pb-8 ${isLast ? 'pb-0' : ''}`}>
      <div className={`flex items-center ${sizes.gap} mb-1`}>
        <h3 className={`${sizes.title} text-gray-900`}>{item.title}</h3>
        {item.timestamp && (
          <span className={`${sizes.timestamp} text-gray-500`}>{item.timestamp}</span>
        )}
      </div>
      {item.description && (
        <p className={`${sizes.description} text-gray-600 mb-2`}>{item.description}</p>
      )}
      {item.content && <div className="mt-2">{item.content}</div>}
    </div>
  );

  // Connector line
  const ConnectorComponent = showConnector && !isLast && (
    <div
      className={`
        absolute top-6 ${sizes.connector} h-full -translate-x-1/2
        ${item.color ? '' : statusStyle.connector}
      `}
      style={
        item.color
          ? { backgroundColor: `${item.color}40` } // 40 = 25% opacity in hex
          : undefined
      }
    />
  );

  // Default layout (left-aligned)
  if (!isAlternate && !isRight) {
    return (
      <div className={`flex ${sizes.gap}`}>
        <div className="relative flex flex-col items-center">
          {DotComponent}
          {ConnectorComponent}
        </div>
        {ContentComponent}
      </div>
    );
  }

  // Right-aligned layout
  if (isRight) {
    return (
      <div className={`flex ${sizes.gap} flex-row-reverse text-right`}>
        <div className="relative flex flex-col items-center">
          {DotComponent}
          {ConnectorComponent}
        </div>
        {ContentComponent}
      </div>
    );
  }

  // Alternate layout
  return (
    <div className={`flex ${sizes.gap} ${showOnRight ? 'flex-row-reverse' : ''}`}>
      <div className={`flex-1 ${showOnRight ? 'text-right' : ''}`}>{ContentComponent}</div>
      <div className="relative flex flex-col items-center">
        {DotComponent}
        {ConnectorComponent}
      </div>
      <div className="flex-1" /> {/* Spacer */}
    </div>
  );
}

export default function Timeline({
  items,
  variant = 'default',
  size = 'md',
  showConnector = true,
  className = '',
}: TimelineProps) {
  if (items.length === 0) {
    return null;
  }

  const isAlternate = variant === 'alternate';
  const isRight = variant === 'right';

  return (
    <div className={`relative ${className}`} role="list" aria-label="Timeline">
      {items.map((item, index) => (
        <div key={item.id} role="listitem">
          <TimelineItemComponent
            item={item}
            size={size}
            showConnector={showConnector}
            isLast={index === items.length - 1}
            isAlternate={isAlternate}
            isRight={isRight}
            index={index}
          />
        </div>
      ))}
    </div>
  );
}

export type { TimelineProps, TimelineItem, TimelineVariant, TimelineSize, TimelineItemStatus };
