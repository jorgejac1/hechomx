/**
 * @fileoverview Media viewer component for images and videos.
 * Displays media gallery with thumbnail navigation.
 * Supports both image and video content with play buttons.
 * @module components/common/media/MediaViewer
 */

'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';

interface MediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  alt?: string;
}

interface MediaViewerProps {
  items: MediaItem[];
  currentIndex: number;
  onIndexChange?: (index: number) => void;
  className?: string;
}

export default function MediaViewer({ items, currentIndex, className = '' }: MediaViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!items.length) return null;

  const currentItem = items[currentIndex];

  return (
    <div className={`relative w-full h-full ${className}`}>
      {currentItem.type === 'image' ? (
        <Image
          src={currentItem.url}
          alt={currentItem.alt || `Media ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <video
          src={currentItem.url}
          controls
          className="w-full h-full object-contain"
          poster={currentItem.thumbnail}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        >
          Tu navegador no soporta videos.
        </video>
      )}

      {currentItem.type === 'video' && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
            <Play className="w-8 h-8 text-gray-900 ml-1" />
          </div>
        </div>
      )}
    </div>
  );
}
