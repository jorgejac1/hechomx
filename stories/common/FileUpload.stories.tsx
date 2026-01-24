import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import FileUpload, { UploadedFile } from '@/components/common/FileUpload';
import { Camera } from 'lucide-react';

/**
 * FileUpload component for handling file selection and drag-and-drop uploads.
 * Supports multiple variants (default dropzone, compact tags, avatar),
 * file validation, preview generation, and upload progress indication.
 */
const meta: Meta<typeof FileUpload> = {
  title: 'Inputs/FileUpload',
  component: FileUpload,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A file upload component with drag-and-drop support, file previews, validation, and three variants: default dropzone, compact tags, and avatar.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'avatar'],
      description: 'Layout variant for the upload area',
    },
    multiple: {
      control: 'boolean',
      description: 'Whether multiple files can be selected',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the upload is disabled',
    },
    accept: {
      control: 'text',
      description: 'Accepted file types',
    },
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
    maxFiles: {
      control: 'number',
      description: 'Maximum number of files allowed',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default
export const Default: Story = {
  render: function DefaultUpload() {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <div className="w-full max-w-md">
        <FileUpload
          files={files}
          onFilesChange={setFiles}
          onFileRemove={(id) => setFiles(files.filter((f) => f.id !== id))}
        />
      </div>
    );
  },
};

// With label
export const WithLabel: Story = {
  render: function LabeledUpload() {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <div className="w-full max-w-md">
        <FileUpload
          label="Fotos del producto"
          files={files}
          onFilesChange={setFiles}
          onFileRemove={(id) => setFiles(files.filter((f) => f.id !== id))}
        />
      </div>
    );
  },
};

// Images only
export const ImagesOnly: Story = {
  render: function ImagesUpload() {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <div className="w-full max-w-md">
        <FileUpload
          label="Imágenes del producto"
          accept="image/*"
          files={files}
          onFilesChange={setFiles}
          onFileRemove={(id) => setFiles(files.filter((f) => f.id !== id))}
          helperText="Solo imágenes (JPG, PNG, GIF)"
        />
      </div>
    );
  },
};

// Multiple files
export const MultipleFiles: Story = {
  render: function MultipleUpload() {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <div className="w-full max-w-md">
        <FileUpload
          label="Galería de productos"
          multiple
          maxFiles={5}
          accept="image/*"
          files={files}
          onFilesChange={setFiles}
          onFileRemove={(id) => setFiles(files.filter((f) => f.id !== id))}
          helperText="Puedes subir hasta 5 imágenes"
        />
      </div>
    );
  },
};

// With uploaded files
export const WithUploadedFiles: Story = {
  render: function UploadedFilesExample() {
    const [files, setFiles] = useState<UploadedFile[]>([
      {
        id: '1',
        file: new File([], 'rebozo-azul.jpg'),
        name: 'rebozo-azul.jpg',
        size: 245000,
        type: 'image/jpeg',
        preview: 'https://via.placeholder.com/100x100/3b82f6/ffffff?text=1',
      },
      {
        id: '2',
        file: new File([], 'rebozo-rojo.jpg'),
        name: 'rebozo-rojo.jpg',
        size: 312000,
        type: 'image/jpeg',
        preview: 'https://via.placeholder.com/100x100/ef4444/ffffff?text=2',
      },
    ]);

    return (
      <div className="w-full max-w-md">
        <FileUpload
          label="Imágenes del producto"
          multiple
          maxFiles={5}
          accept="image/*"
          files={files}
          onFilesChange={setFiles}
          onFileRemove={(id) => setFiles(files.filter((f) => f.id !== id))}
        />
      </div>
    );
  },
};

// With error
export const WithError: Story = {
  render: function ErrorUpload() {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <div className="w-full max-w-md">
        <FileUpload
          label="Documentos"
          accept=".pdf,.doc,.docx"
          files={files}
          onFilesChange={setFiles}
          onFileRemove={(id) => setFiles(files.filter((f) => f.id !== id))}
          error="Debes subir al menos un documento"
        />
      </div>
    );
  },
};

// File with error
export const FileWithError: Story = {
  render: function FileErrorExample() {
    const [files, setFiles] = useState<UploadedFile[]>([
      {
        id: '1',
        file: new File([], 'archivo-muy-grande.jpg'),
        name: 'archivo-muy-grande.jpg',
        size: 15000000,
        type: 'image/jpeg',
        error: 'El archivo excede el tamaño máximo de 10 MB',
      },
    ]);

    return (
      <div className="w-full max-w-md">
        <FileUpload
          label="Imágenes"
          accept="image/*"
          files={files}
          onFilesChange={setFiles}
          onFileRemove={(id) => setFiles(files.filter((f) => f.id !== id))}
        />
      </div>
    );
  },
};

// Disabled
export const Disabled: Story = {
  render: function DisabledUpload() {
    return (
      <div className="w-full max-w-md">
        <FileUpload label="Archivos" disabled helperText="Primero completa los campos anteriores" />
      </div>
    );
  },
};

// Compact variant
export const Compact: Story = {
  render: function CompactUpload() {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <div className="w-full max-w-md">
        <FileUpload
          variant="compact"
          label="Archivos adjuntos"
          multiple
          files={files}
          onFilesChange={setFiles}
          onFileRemove={(id) => setFiles(files.filter((f) => f.id !== id))}
        />
      </div>
    );
  },
};

// Compact with files
export const CompactWithFiles: Story = {
  render: function CompactFilesExample() {
    const [files, setFiles] = useState<UploadedFile[]>([
      {
        id: '1',
        file: new File([], 'documento.pdf'),
        name: 'documento.pdf',
        size: 125000,
        type: 'application/pdf',
      },
      {
        id: '2',
        file: new File([], 'imagen.jpg'),
        name: 'imagen.jpg',
        size: 245000,
        type: 'image/jpeg',
        preview: 'https://via.placeholder.com/40x40/3b82f6/ffffff?text=IMG',
      },
      {
        id: '3',
        file: new File([], 'video.mp4'),
        name: 'video.mp4',
        size: 5245000,
        type: 'video/mp4',
      },
    ]);

    return (
      <div className="w-full max-w-md">
        <FileUpload
          variant="compact"
          label="Archivos adjuntos"
          multiple
          files={files}
          onFilesChange={setFiles}
          onFileRemove={(id) => setFiles(files.filter((f) => f.id !== id))}
        />
      </div>
    );
  },
};

// Avatar variant
export const Avatar: Story = {
  render: function AvatarUpload() {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <div className="w-full max-w-sm">
        <FileUpload
          variant="avatar"
          label="Foto de perfil"
          accept="image/*"
          files={files}
          onFilesChange={setFiles}
          onFileRemove={(id) => setFiles(files.filter((f) => f.id !== id))}
          helperText="JPG o PNG, máximo 2MB"
        />
      </div>
    );
  },
};

// Avatar with image
export const AvatarWithImage: Story = {
  render: function AvatarWithImageExample() {
    const [files, setFiles] = useState<UploadedFile[]>([
      {
        id: '1',
        file: new File([], 'avatar.jpg'),
        name: 'avatar.jpg',
        size: 125000,
        type: 'image/jpeg',
        preview: 'https://via.placeholder.com/200x200/10b981/ffffff?text=MG',
      },
    ]);

    return (
      <div className="w-full max-w-sm">
        <FileUpload
          variant="avatar"
          label="Foto de perfil"
          accept="image/*"
          files={files}
          onFilesChange={setFiles}
          onFileRemove={(id) => setFiles(files.filter((f) => f.id !== id))}
        />
      </div>
    );
  },
};

// With custom placeholder
export const CustomPlaceholder: Story = {
  render: function CustomPlaceholderExample() {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <div className="w-full max-w-md">
        <FileUpload
          label="Fotos del producto"
          multiple
          maxFiles={10}
          accept="image/*"
          files={files}
          onFilesChange={setFiles}
          onFileRemove={(id) => setFiles(files.filter((f) => f.id !== id))}
          placeholder={
            <div className="text-center">
              <Camera className="w-12 h-12 text-primary-400 mx-auto mb-4" />
              <p className="text-sm font-medium text-primary-600 mb-1">
                Sube fotos de tu artesanía
              </p>
              <p className="text-xs text-gray-500">
                Arrastra hasta 10 imágenes o haz clic para seleccionar
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Recomendado: 1200x1200px para mejor calidad
              </p>
            </div>
          }
        />
      </div>
    );
  },
};

// With upload progress
export const WithProgress: Story = {
  render: function ProgressExample() {
    const [files, setFiles] = useState<UploadedFile[]>([
      {
        id: '1',
        file: new File([], 'subiendo.jpg'),
        name: 'subiendo.jpg',
        size: 2450000,
        type: 'image/jpeg',
        progress: 45,
      },
      {
        id: '2',
        file: new File([], 'completado.jpg'),
        name: 'completado.jpg',
        size: 1230000,
        type: 'image/jpeg',
        preview: 'https://via.placeholder.com/100x100/10b981/ffffff?text=OK',
      },
    ]);

    return (
      <div className="w-full max-w-md">
        <FileUpload
          label="Subiendo archivos..."
          multiple
          files={files}
          onFilesChange={setFiles}
          onFileRemove={(id) => setFiles(files.filter((f) => f.id !== id))}
        />
      </div>
    );
  },
};

// Real-world: Product images
export const ProductImages: Story = {
  render: function ProductImagesExample() {
    const [files, setFiles] = useState<UploadedFile[]>([]);

    return (
      <div className="max-w-lg p-6 border rounded-lg bg-white space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900">Fotos del producto</h3>
          <p className="text-sm text-gray-500">Sube fotos de alta calidad de tu artesanía</p>
        </div>
        <FileUpload
          multiple
          maxFiles={8}
          maxSize={5 * 1024 * 1024}
          accept="image/jpeg,image/png,image/webp"
          files={files}
          onFilesChange={setFiles}
          onFileRemove={(id) => setFiles(files.filter((f) => f.id !== id))}
          helperText="Máximo 8 imágenes, 5MB cada una. Formatos: JPG, PNG, WebP"
        />
        <div className="text-xs text-gray-500 space-y-1">
          <p>• La primera imagen será la portada del producto</p>
          <p>• Usa fondo blanco o neutro para mejores resultados</p>
          <p>• Incluye fotos de detalles y diferentes ángulos</p>
        </div>
      </div>
    );
  },
};

// Real-world: Artisan verification
export const ArtisanVerification: Story = {
  render: function VerificationExample() {
    const [idFiles, setIdFiles] = useState<UploadedFile[]>([]);
    const [craftFiles, setCraftFiles] = useState<UploadedFile[]>([]);

    return (
      <div className="max-w-lg p-6 border rounded-lg bg-white space-y-6">
        <div>
          <h3 className="font-semibold text-gray-900">Verificación de artesano</h3>
          <p className="text-sm text-gray-500">
            Sube los documentos necesarios para verificar tu cuenta
          </p>
        </div>

        <FileUpload
          label="Identificación oficial"
          accept="image/*,.pdf"
          maxSize={5 * 1024 * 1024}
          files={idFiles}
          onFilesChange={setIdFiles}
          onFileRemove={(id) => setIdFiles(idFiles.filter((f) => f.id !== id))}
          helperText="INE/IFE, pasaporte o licencia de conducir"
        />

        <FileUpload
          label="Fotos de tu trabajo"
          multiple
          maxFiles={5}
          accept="image/*"
          maxSize={5 * 1024 * 1024}
          files={craftFiles}
          onFilesChange={setCraftFiles}
          onFileRemove={(id) => setCraftFiles(craftFiles.filter((f) => f.id !== id))}
          helperText="Mínimo 3 fotos mostrando tu proceso de trabajo"
        />
      </div>
    );
  },
};

// Real-world: Profile setup
export const ProfileSetup: Story = {
  render: function ProfileSetupExample() {
    const [avatar, setAvatar] = useState<UploadedFile[]>([]);
    const [banner, setBanner] = useState<UploadedFile[]>([]);

    return (
      <div className="max-w-lg p-6 border rounded-lg bg-white space-y-6">
        <h3 className="font-semibold text-gray-900">Personaliza tu perfil</h3>

        <FileUpload
          variant="avatar"
          label="Foto de perfil"
          accept="image/*"
          maxSize={2 * 1024 * 1024}
          files={avatar}
          onFilesChange={setAvatar}
          onFileRemove={(id) => setAvatar(avatar.filter((f) => f.id !== id))}
          helperText="Cuadrada, mínimo 200x200px"
        />

        <FileUpload
          label="Imagen de portada"
          accept="image/*"
          maxSize={5 * 1024 * 1024}
          files={banner}
          onFilesChange={setBanner}
          onFileRemove={(id) => setBanner(banner.filter((f) => f.id !== id))}
          helperText="Recomendado: 1200x400px"
        />
      </div>
    );
  },
};

// All variants
export const AllVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-3">Default</p>
        <FileUpload label="Archivos" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-3">Compact</p>
        <FileUpload variant="compact" label="Archivos" />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 mb-3">Avatar</p>
        <FileUpload variant="avatar" label="Foto de perfil" />
      </div>
    </div>
  ),
};
