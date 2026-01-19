'use client';

import type { VerificationLevel } from '@/lib/types/verification';
import { VERIFICATION_LEVELS } from '@/lib/constants/verification';

interface VerificationBadgeProps {
  level: VerificationLevel;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export default function VerificationBadge({
  level,
  size = 'md',
  showLabel = true,
  className = '',
}: VerificationBadgeProps) {
  const levelInfo = VERIFICATION_LEVELS[level];
  const badge = levelInfo.badge;

  const sizes = {
    sm: {
      container: 'px-2 py-0.5 text-xs gap-1',
      icon: 'text-sm',
      text: 'text-xs',
    },
    md: {
      container: 'px-3 py-1 text-sm gap-1.5',
      icon: 'text-base',
      text: 'text-sm',
    },
    lg: {
      container: 'px-4 py-2 text-base gap-2',
      icon: 'text-lg',
      text: 'text-base',
    },
  };

  const sizeClasses = sizes[size];

  return (
    <div
      className={`inline-flex items-center rounded-full font-semibold ${badge.bgColor} ${badge.color} ${sizeClasses.container} ${className}`}
    >
      <span className={sizeClasses.icon} aria-hidden="true">
        {badge.icon}
      </span>

      {showLabel && <span className={sizeClasses.text}>{badge.nameEs}</span>}
    </div>
  );
}

export function VerificationIcon({
  level,
  size = 'md',
}: {
  level: VerificationLevel;
  size?: 'sm' | 'md' | 'lg';
}) {
  const badge = VERIFICATION_LEVELS[level].badge;

  const sizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
  };

  return (
    <span
      className={`inline-flex items-center justify-center ${sizes[size]} ${badge.color}`}
      title={badge.descriptionEs}
      aria-label={badge.nameEs}
    >
      {badge.icon}
    </span>
  );
}

export function VerificationBadgeWithTooltip({
  level,
  size = 'md',
}: {
  level: VerificationLevel;
  size?: 'sm' | 'md' | 'lg';
}) {
  const levelInfo = VERIFICATION_LEVELS[level];
  const badge = levelInfo.badge;

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-2 text-base',
  };

  return (
    <div className="group relative inline-flex">
      <div
        className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${badge.bgColor} ${badge.color} ${sizes[size]}`}
      >
        <span aria-hidden="true">{badge.icon}</span>
        <span>{badge.nameEs}</span>
      </div>

      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50">
        <div className="bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap shadow-lg">
          {badge.descriptionEs}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
            <div className="border-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
