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
      <div className="flex gap-2 mb-3">
        {photos.map((photo, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedPhoto(photo)}
            className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200 hover:border-primary-500 transition-colors"
          >
            <Image
              src={photo}
              alt={`Foto de reseña ${idx + 1}`}
              fill
              sizes="80px"
              className="object-cover"
            />
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
            className="absolute top-4 right-4 text-white text-4xl"
            onClick={() => setSelectedPhoto(null)}
          >
            ×
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