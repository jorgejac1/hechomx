/**
 * @fileoverview Ranked list component for leaderboard-style displays.
 * Shows ordered items with rank badges, avatars, values, and optional trends.
 * Used for top sellers, best products, and similar rankings.
 * @module components/charts/RankedList
 */

import Image from 'next/image';
import { TrendingUp, TrendingDown } from 'lucide-react';

export interface RankedItem {
  /** Primary text/name */
  name: string;
  /** Secondary text/subtitle */
  subtitle?: string;
  /** Main value to display */
  value: string | number;
  /** Optional trend percentage */
  trend?: number;
  /** Optional avatar/image URL */
  avatar?: string;
  /** Optional custom content on the right */
  rightContent?: React.ReactNode;
}

export interface RankedListProps {
  /** Items to display */
  items: RankedItem[];
  /** Show rank numbers */
  showRank?: boolean;
  /** Show trend indicators */
  showTrend?: boolean;
  /** Maximum items to display */
  maxItems?: number;
  /** Rank badge color */
  rankColor?: 'purple' | 'blue' | 'green' | 'amber' | 'gray';
  /** Additional CSS classes */
  className?: string;
}

const rankColorStyles = {
  purple: 'bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300',
  blue: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300',
  green: 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300',
  amber: 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300',
  gray: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300',
};

export default function RankedList({
  items,
  showRank = true,
  showTrend = true,
  maxItems,
  rankColor = 'purple',
  className = '',
}: RankedListProps) {
  const displayItems = maxItems ? items.slice(0, maxItems) : items;

  return (
    <div className={`space-y-1 ${className}`}>
      {displayItems.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 py-3 border-b border-gray-100 dark:border-gray-700 last:border-0"
        >
          {/* Rank Badge */}
          {showRank && (
            <span
              className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0 ${rankColorStyles[rankColor]}`}
            >
              {index + 1}
            </span>
          )}

          {/* Avatar */}
          {item.avatar && (
            <Image
              src={item.avatar}
              alt=""
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="font-medium text-gray-900 dark:text-gray-100 truncate">{item.name}</p>
            {item.subtitle && (
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{item.subtitle}</p>
            )}
          </div>

          {/* Value & Trend */}
          <div className="text-right shrink-0">
            <p className="font-semibold text-gray-900 dark:text-gray-100">{item.value}</p>
            {showTrend && item.trend !== undefined && (
              <p
                className={`text-xs flex items-center justify-end gap-0.5 ${
                  item.trend >= 0 ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {item.trend >= 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
                {item.trend >= 0 ? '+' : ''}
                {item.trend}%
              </p>
            )}
            {item.rightContent}
          </div>
        </div>
      ))}
    </div>
  );
}
