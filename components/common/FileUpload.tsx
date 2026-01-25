/**
 * @fileoverview FileUpload component for handling file selection and drag-and-drop uploads.
 * Supports multiple variants (default dropzone, compact tags, avatar), file validation,
 * preview generation, and upload progress indication.
 * @module components/common/FileUpload
 */

'use client';

import { useState, useRef, useCallback, DragEvent, ChangeEvent, ReactNode } from 'react';
import { Upload, X, File, Image as ImageIcon, FileText, Film, AlertCircle } from 'lucide-react';

/**
 * Available file upload layout variants
 * @typedef {'default' | 'compact' | 'avatar'} FileUploadVariant
 */
type FileUploadVariant = 'default' | 'compact' | 'avatar';

/**
 * Represents a file being uploaded or already uploaded
 * @interface UploadedFile
 */
interface UploadedFile {
  /** Unique identifier for the file */
  id: string;
  /** The actual File object */
  file: File;
  /** Display name of the file */
  name: string;
  /** File size in bytes */
  size: number;
  /** MIME type of the file */
  type: string;
  /** Object URL for image preview */
  preview?: string;
  /** Upload progress percentage (0-100) */
  progress?: number;
  /** Validation or upload error message */
  error?: string;
}

/**
 * Props for the FileUpload component
 * @interface FileUploadProps
 */
interface FileUploadProps {
  /** Accepted file types (e.g., "image/*", ".pdf,.doc") */
  accept?: string;
  /** Whether multiple files can be selected */
  multiple?: boolean;
  /** Maximum file size in bytes (default: 10MB) */
  maxSize?: number;
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Array of currently uploaded files */
  files?: UploadedFile[];
  /** Callback when files are added or changed */
  onFilesChange?: (files: UploadedFile[]) => void;
  /** Callback when a file is removed */
  onFileRemove?: (fileId: string) => void;
  /** Layout variant for the upload area */
  variant?: FileUploadVariant;
  /** Whether the upload is disabled */
  disabled?: boolean;
  /** Label text displayed above the upload area */
  label?: string;
  /** Helper text with additional instructions */
  helperText?: string;
  /** Error message to display */
  error?: string;
  /** Additional CSS classes */
  className?: string;
  /** Custom placeholder content for the dropzone */
  placeholder?: ReactNode;
}

// Format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

// Get file icon based on type
function getFileIcon(type: string) {
  if (type.startsWith('image/')) return ImageIcon;
  if (type.startsWith('video/')) return Film;
  if (type.includes('pdf') || type.includes('document')) return FileText;
  return File;
}

// Generate unique ID
function generateId(): string {
  return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export default function FileUpload({
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 10,
  files = [],
  onFilesChange,
  onFileRemove,
  variant = 'default',
  disabled = false,
  label,
  helperText,
  error,
  className = '',
  placeholder,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback(
    (file: File): string | null => {
      // Check file size
      if (file.size > maxSize) {
        return `El archivo excede el tamaño máximo de ${formatFileSize(maxSize)}`;
      }

      // Check file type if accept is specified
      if (accept) {
        const acceptedTypes = accept.split(',').map((t) => t.trim());
        const fileType = file.type;
        const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;

        const isAccepted = acceptedTypes.some((type) => {
          if (type.startsWith('.')) {
            return fileExtension === type.toLowerCase();
          }
          if (type.endsWith('/*')) {
            return fileType.startsWith(type.replace('/*', '/'));
          }
          return fileType === type;
        });

        if (!isAccepted) {
          return 'Tipo de archivo no permitido';
        }
      }

      return null;
    },
    [accept, maxSize]
  );

  const processFiles = useCallback(
    (fileList: FileList) => {
      if (disabled) return;

      const newFiles: UploadedFile[] = [];
      const currentCount = files.length;
      const availableSlots = maxFiles - currentCount;

      Array.from(fileList)
        .slice(0, multiple ? availableSlots : 1)
        .forEach((file) => {
          const error = validateFile(file);
          const uploadedFile: UploadedFile = {
            id: generateId(),
            file,
            name: file.name,
            size: file.size,
            type: file.type,
            error: error || undefined,
          };

          // Create preview for images
          if (file.type.startsWith('image/') && !error) {
            uploadedFile.preview = URL.createObjectURL(file);
          }

          newFiles.push(uploadedFile);
        });

      if (newFiles.length > 0) {
        const updatedFiles = multiple ? [...files, ...newFiles] : newFiles;
        onFilesChange?.(updatedFiles);
      }
    },
    [disabled, files, maxFiles, multiple, onFilesChange, validateFile]
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
      // Reset input to allow selecting the same file again
      e.target.value = '';
    },
    [processFiles]
  );

  const handleRemove = useCallback(
    (fileId: string) => {
      const file = files.find((f) => f.id === fileId);
      if (file?.preview) {
        URL.revokeObjectURL(file.preview);
      }
      onFileRemove?.(fileId);
    },
    [files, onFileRemove]
  );

  const handleClick = useCallback(() => {
    if (!disabled) {
      inputRef.current?.click();
    }
  }, [disabled]);

  const canAddMore = multiple ? files.length < maxFiles : files.length === 0;

  // Compact variant
  if (variant === 'compact') {
    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}
        <div className="flex flex-wrap items-center gap-2">
          {files.map((file) => (
            <div
              key={file.id}
              className={`
                inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                ${file.error ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}
              `}
            >
              {file.preview ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={file.preview} alt={file.name} className="w-5 h-5 rounded object-cover" />
              ) : (
                (() => {
                  const Icon = getFileIcon(file.type);
                  return <Icon className="w-4 h-4" />;
                })()
              )}
              <span className="max-w-[150px] truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => handleRemove(file.id)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Eliminar archivo"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          {canAddMore && (
            <button
              type="button"
              onClick={handleClick}
              disabled={disabled}
              className={`
                inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium
                border-2 border-dashed border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400
                hover:border-primary-400 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 transition
                ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              <Upload className="w-4 h-4" />
              Agregar
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />
        {helperText && !error && (
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
        )}
        {error && (
          <p className="mt-1.5 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        )}
      </div>
    );
  }

  // Avatar variant
  if (variant === 'avatar') {
    const currentFile = files[0];
    return (
      <div className={className}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {label}
          </label>
        )}
        <div className="flex items-center gap-4">
          <div
            onClick={handleClick}
            className={`
              relative w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-700 flex items-center justify-center
              border-2 border-dashed transition cursor-pointer
              ${isDragging ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500'}
              ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {currentFile?.preview ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={currentFile.preview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500" />
            )}
          </div>
          <div>
            <button
              type="button"
              onClick={handleClick}
              disabled={disabled}
              className="text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              {currentFile ? 'Cambiar imagen' : 'Subir imagen'}
            </button>
            {currentFile && (
              <button
                type="button"
                onClick={() => handleRemove(currentFile.id)}
                className="block text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 mt-1"
              >
                Eliminar
              </button>
            )}
            {helperText && (
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{helperText}</p>
            )}
          </div>
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept || 'image/*'}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />
        {error && (
          <p className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {error}
          </p>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>
      )}

      {/* Drop zone */}
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
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            ${error ? 'border-red-300 dark:border-red-700 bg-red-50 dark:bg-red-900/20' : ''}
          `}
        >
          {placeholder || (
            <>
              <Upload className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Arrastra archivos aquí o haz clic para seleccionar
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {accept ? `Tipos permitidos: ${accept}` : 'Todos los tipos de archivo'}
                {' • '}
                Máximo {formatFileSize(maxSize)}
              </p>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleInputChange}
        className="hidden"
        disabled={disabled}
      />

      {/* File list */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file) => {
            const FileIcon = getFileIcon(file.type);
            return (
              <div
                key={file.id}
                className={`
                  flex items-center gap-3 p-3 rounded-lg
                  ${file.error ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' : 'bg-gray-50 dark:bg-gray-700/50'}
                `}
              >
                {/* Preview or icon */}
                {file.preview ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-10 h-10 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                    <FileIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                  </div>
                )}

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatFileSize(file.size)}
                    {file.error && (
                      <span className="text-red-600 dark:text-red-400 ml-2">{file.error}</span>
                    )}
                  </p>
                </div>

                {/* Progress or remove */}
                {file.progress !== undefined && file.progress < 100 ? (
                  <div className="w-20">
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-600 transition-all"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleRemove(file.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition"
                    aria-label="Eliminar archivo"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}

      {helperText && !error && (
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
      {error && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
          <AlertCircle className="w-3 h-3" />
          {error}
        </p>
      )}
    </div>
  );
}

export type { FileUploadProps, UploadedFile, FileUploadVariant };
