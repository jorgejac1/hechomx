/**
 * @fileoverview Product images upload section component
 * Allows users to add product images via URL input with preview grid.
 * Supports up to 10 images with the first image marked as primary.
 * @module components/product/form/ImagesSection
 */

import { useState } from 'react';
import Image from 'next/image';
import { Upload, X, Plus, Info, Image as ImageIcon } from 'lucide-react';

/**
 * Props for the ImagesSection component
 * @interface ImagesSectionProps
 */
interface ImagesSectionProps {
  /** Array of image URLs */
  images: string[];
  /** Callback to update the images array */
  setImages: (images: string[]) => void;
}

export default function ImagesSection({ images, setImages }: ImagesSectionProps) {
  const [imageInput, setImageInput] = useState('');

  const handleAddImage = () => {
    if (imageInput.trim() && images.length < 10) {
      setImages([...images, imageInput.trim()]);
      setImageInput('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <ImageIcon className="w-5 h-5 text-primary-600" />
        <h2 className="text-xl font-bold text-gray-900">Imágenes del Producto</h2>
        <span className="text-sm text-red-600">*Al menos 1</span>
      </div>

      <div className="space-y-4">
        {/* Image Input */}
        <div className="flex gap-2">
          <input
            type="url"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            placeholder="URL de la imagen (ej: https://unsplash.com/...)"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddImage();
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddImage}
            disabled={!imageInput.trim() || images.length >= 10}
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-gray-600">
          <Info className="w-4 h-4 inline mr-1" />
          Puedes agregar hasta 10 imágenes. La primera será la imagen principal.
        </p>

        {/* Image Preview Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative group">
                <Image
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-32 object-cover rounded-lg border-2 border-gray-200"
                />
                {index === 0 && (
                  <span className="absolute top-2 left-2 px-2 py-1 bg-primary-600 text-white text-xs font-semibold rounded-sm">
                    Principal
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        {images.length === 0 && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Aún no has agregado imágenes</p>
            <p className="text-sm text-gray-500">Agrega al menos 1 imagen para continuar</p>
          </div>
        )}
      </div>
    </div>
  );
}
