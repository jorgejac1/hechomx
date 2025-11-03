'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

interface ReviewPhotosProps {
  photos: string[];
}

export default function ReviewPhotos({ photos }: ReviewPhotosProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (photos.length === 0) return null;

  return (
    <>
      {/* Photo Count Header */}
      <div className="flex items-center gap-2 mb-2">
        <Camera className="w-4 h-4 text-gray-500" />
        <span className="text-sm font-medium text-gray-700">
          {photos.length} {photos.length === 1 ? 'foto' : 'fotos'}
        </span>
      </div>

      {/* Photo Thumbnails */}
      <div className="flex gap-2 mb-3 flex-wrap">
        {photos.map((photo, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedPhoto(photo)}
            className="relative w-20 h-20 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-primary-500 transition-colors group"
          >
            <Image
              src={photo}
              alt={`Foto de reseña ${idx + 1}`}
              fill
              sizes="80px"
              className="object-cover group-hover:scale-110 transition-transform duration-200"
            />
            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
          </button>
        ))}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedPhoto(null)}
            aria-label="Cerrar"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="relative w-full h-full max-w-4xl max-h-[90vh]">
            <Image
              src={selectedPhoto}
              alt="Foto ampliada"
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
}
