/**
 * @fileoverview Product images upload section component
 * Supports drag-and-drop file upload and URL input with preview grid.
 * Converts uploaded files to base64 for localStorage compatibility.
 * Supports up to 10 images with the first image marked as primary.
 * @module components/product/form/ImagesSection
 */

'use client';

import { useState, useCallback, DragEvent, ChangeEvent, useRef } from 'react';
import Image from 'next/image';
import { Upload, X, Plus, Info, Image as ImageIcon, Link, AlertCircle } from 'lucide-react';

/**
 * Props for the ImagesSection component
 * @interface ImagesSectionProps
 */
interface ImagesSectionProps {
  /** Array of image URLs (can be external URLs or base64 data URLs) */
  images: string[];
  /** Callback to update the images array */
  setImages: (images: string[]) => void;
}

const MAX_IMAGES = 10;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB per image
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/**
 * Converts a File to a base64 data URL
 */
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/**
 * Validates a file for upload
 */
function validateFile(file: File): string | null {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return 'Tipo de archivo no permitido. Usa JPG, PNG, WebP o GIF.';
  }
  if (file.size > MAX_FILE_SIZE) {
    return 'El archivo excede 5MB. Por favor usa una imagen más pequeña.';
  }
  return null;
}

export default function ImagesSection({ images, setImages }: ImagesSectionProps) {
  const [imageInput, setImageInput] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const canAddMore = images.length < MAX_IMAGES;
  const remainingSlots = MAX_IMAGES - images.length;

  const handleAddImageUrl = () => {
    if (imageInput.trim() && canAddMore) {
      setImages([...images, imageInput.trim()]);
      setImageInput('');
      setUploadError(null);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const processFiles = useCallback(
    async (fileList: FileList) => {
      if (!canAddMore) return;

      setIsProcessing(true);
      setUploadError(null);

      const filesToProcess = Array.from(fileList).slice(0, remainingSlots);
      const newImages: string[] = [];
      const errors: string[] = [];

      for (const file of filesToProcess) {
        const error = validateFile(file);
        if (error) {
          errors.push(`${file.name}: ${error}`);
          continue;
        }

        try {
          const base64 = await fileToBase64(file);
          newImages.push(base64);
        } catch {
          errors.push(`${file.name}: Error al procesar el archivo`);
        }
      }

      if (newImages.length > 0) {
        setImages([...images, ...newImages]);
      }

      if (errors.length > 0) {
        setUploadError(errors.join(' • '));
      }

      setIsProcessing(false);
    },
    [canAddMore, remainingSlots, images, setImages]
  );

  const handleDragEnter = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processFiles(e.dataTransfer.files);
      }
    },
    [processFiles]
  );

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        processFiles(e.target.files);
      }
      e.target.value = '';
    },
    [processFiles]
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const moveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= images.length) return;
    const newImages = [...images];
    const [movedImage] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, movedImage);
    setImages(newImages);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
      <div className="flex items-center gap-2 mb-6">
        <ImageIcon className="w-5 h-5 text-primary-600 dark:text-primary-400" />
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Imágenes del Producto</h2>
        <span className="text-sm text-red-600 dark:text-red-400">*Al menos 1</span>
      </div>

      <div className="space-y-4">
        {/* Drag & Drop Zone */}
        {canAddMore && (
          <div
            onClick={handleClick}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className={`
              relative border-2 border-dashed rounded-xl p-8 text-center transition cursor-pointer
              ${isDragging ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'}
              ${isProcessing ? 'opacity-50 cursor-wait' : ''}
            `}
          >
            <Upload
              className={`w-12 h-12 mx-auto mb-4 ${isDragging ? 'text-primary-500' : 'text-gray-400 dark:text-gray-500'}`}
            />
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {isProcessing
                ? 'Procesando imágenes...'
                : 'Arrastra imágenes aquí o haz clic para seleccionar'}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              JPG, PNG, WebP o GIF • Máximo 5MB por imagen • {remainingSlots}{' '}
              {remainingSlots === 1 ? 'espacio disponible' : 'espacios disponibles'}
            </p>
          </div>
        )}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          multiple
          onChange={handleInputChange}
          className="hidden"
          disabled={!canAddMore || isProcessing}
        />

        {/* Upload Error */}
        {uploadError && (
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-red-700 dark:text-red-400 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{uploadError}</span>
          </div>
        )}

        {/* URL Input Toggle */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition"
          >
            <Link className="w-4 h-4" />
            {showUrlInput ? 'Ocultar entrada de URL' : '¿Tienes una URL de imagen?'}
          </button>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            <Info className="w-4 h-4 inline mr-1" />
            La primera imagen será la principal
          </p>
        </div>

        {/* URL Input (collapsed by default) */}
        {showUrlInput && (
          <div className="flex gap-2">
            <input
              type="url"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddImageUrl();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddImageUrl}
              disabled={!imageInput.trim() || !canAddMore}
              className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:cursor-not-allowed"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Image Preview Grid */}
        {images.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {images.map((img, index) => (
              <div key={`${img.slice(0, 50)}-${index}`} className="relative group">
                <Image
                  src={img}
                  alt={`Imagen ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-32 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600"
                  unoptimized={img.startsWith('data:')}
                />
                {index === 0 && (
                  <span className="absolute top-2 left-2 px-2 py-1 bg-primary-600 text-white text-xs font-semibold rounded-sm">
                    Principal
                  </span>
                )}

                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition rounded-lg flex items-center justify-center gap-2">
                  {/* Move buttons */}
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, index - 1)}
                      className="p-1.5 bg-white/90 rounded-full text-gray-700 hover:bg-white transition"
                      title="Mover a la izquierda"
                    >
                      ←
                    </button>
                  )}
                  {index < images.length - 1 && (
                    <button
                      type="button"
                      onClick={() => moveImage(index, index + 1)}
                      className="p-1.5 bg-white/90 rounded-full text-gray-700 hover:bg-white transition"
                      title="Mover a la derecha"
                    >
                      →
                    </button>
                  )}
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                  aria-label={`Eliminar imagen ${index + 1}`}
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Image number */}
                <span className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/60 text-white text-xs rounded">
                  {index + 1}/{images.length}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {images.length === 0 && !canAddMore && (
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-2" />
            <p className="text-gray-600 dark:text-gray-400">Aún no has agregado imágenes</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Agrega al menos 1 imagen para continuar
            </p>
          </div>
        )}

        {/* Limit reached message */}
        {!canAddMore && images.length > 0 && (
          <p className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2">
            <Info className="w-4 h-4" />
            Has alcanzado el límite de {MAX_IMAGES} imágenes
          </p>
        )}
      </div>
    </div>
  );
}
