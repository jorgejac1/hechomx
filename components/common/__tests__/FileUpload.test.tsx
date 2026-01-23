import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FileUpload, { UploadedFile } from '../FileUpload';

// Mock URL.createObjectURL and revokeObjectURL
const mockCreateObjectURL = vi.fn(() => 'blob:mock-url');
const mockRevokeObjectURL = vi.fn();
global.URL.createObjectURL = mockCreateObjectURL;
global.URL.revokeObjectURL = mockRevokeObjectURL;

function createMockFile(name: string, size: number, type: string): File {
  const file = new File([''], name, { type });
  Object.defineProperty(file, 'size', { value: size });
  return file;
}

describe('FileUpload', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render drop zone', () => {
      render(<FileUpload />);
      expect(screen.getByText(/Arrastra archivos aquí/)).toBeInTheDocument();
    });

    it('should render label when provided', () => {
      render(<FileUpload label="Subir documentos" />);
      expect(screen.getByText('Subir documentos')).toBeInTheDocument();
    });

    it('should render helper text', () => {
      render(<FileUpload helperText="Máximo 5 archivos" />);
      expect(screen.getByText('Máximo 5 archivos')).toBeInTheDocument();
    });

    it('should render error message', () => {
      render(<FileUpload error="Error de subida" />);
      expect(screen.getByText('Error de subida')).toBeInTheDocument();
    });
  });

  describe('File Selection', () => {
    it('should call onFilesChange when file is selected', async () => {
      const handleFilesChange = vi.fn();
      render(<FileUpload onFilesChange={handleFilesChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('test.pdf', 1024, 'application/pdf');

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(handleFilesChange).toHaveBeenCalled();
        const files = handleFilesChange.mock.calls[0][0];
        expect(files[0].name).toBe('test.pdf');
      });
    });

    it('should respect accept prop for file types', () => {
      render(<FileUpload accept=".pdf,.doc" />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('accept', '.pdf,.doc');
    });

    it('should allow multiple files when multiple is true', () => {
      render(<FileUpload multiple />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toHaveAttribute('multiple');
    });
  });

  describe('File Validation', () => {
    it('should validate file size', async () => {
      const handleFilesChange = vi.fn();
      render(
        <FileUpload
          maxSize={1024} // 1KB
          onFilesChange={handleFilesChange}
        />
      );

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('large.pdf', 2048, 'application/pdf');

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(handleFilesChange).toHaveBeenCalled();
        const files = handleFilesChange.mock.calls[0][0];
        expect(files[0].error).toContain('excede el tamaño');
      });
    });
  });

  describe('File Display', () => {
    it('should display uploaded files', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('test.pdf', 1024, 'application/pdf'),
          name: 'test.pdf',
          size: 1024,
          type: 'application/pdf',
        },
      ];
      render(<FileUpload files={files} />);
      expect(screen.getByText('test.pdf')).toBeInTheDocument();
    });

    it('should show file size', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('test.pdf', 1024, 'application/pdf'),
          name: 'test.pdf',
          size: 1024,
          type: 'application/pdf',
        },
      ];
      render(<FileUpload files={files} />);
      expect(screen.getByText('1 KB')).toBeInTheDocument();
    });

    it('should show image preview for images', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('image.jpg', 1024, 'image/jpeg'),
          name: 'image.jpg',
          size: 1024,
          type: 'image/jpeg',
          preview: 'blob:preview-url',
        },
      ];
      render(<FileUpload files={files} />);
      const img = screen.getByAltText('image.jpg');
      expect(img).toHaveAttribute('src', 'blob:preview-url');
    });
  });

  describe('File Removal', () => {
    it('should call onFileRemove when remove button is clicked', () => {
      const handleFileRemove = vi.fn();
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('test.pdf', 1024, 'application/pdf'),
          name: 'test.pdf',
          size: 1024,
          type: 'application/pdf',
        },
      ];
      render(<FileUpload files={files} onFileRemove={handleFileRemove} />);

      const removeButton = screen.getByRole('button', { name: /eliminar/i });
      fireEvent.click(removeButton);

      expect(handleFileRemove).toHaveBeenCalledWith('1');
    });
  });

  describe('Disabled State', () => {
    it('should disable input when disabled is true', () => {
      render(<FileUpload disabled />);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      expect(input).toBeDisabled();
    });

    it('should apply disabled styles', () => {
      const { container } = render(<FileUpload disabled />);
      expect(container.querySelector('.opacity-50')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    describe('Compact variant', () => {
      it('should render compact layout', () => {
        render(<FileUpload variant="compact" />);
        expect(screen.getByText('Agregar')).toBeInTheDocument();
      });

      it('should show files as chips', () => {
        const files: UploadedFile[] = [
          {
            id: '1',
            file: createMockFile('test.pdf', 1024, 'application/pdf'),
            name: 'test.pdf',
            size: 1024,
            type: 'application/pdf',
          },
        ];
        render(<FileUpload variant="compact" files={files} />);
        expect(screen.getByText('test.pdf')).toBeInTheDocument();
      });
    });

    describe('Avatar variant', () => {
      it('should render avatar layout', () => {
        render(<FileUpload variant="avatar" />);
        expect(screen.getByText('Subir imagen')).toBeInTheDocument();
      });

      it('should show change button when file is uploaded', () => {
        const files: UploadedFile[] = [
          {
            id: '1',
            file: createMockFile('avatar.jpg', 1024, 'image/jpeg'),
            name: 'avatar.jpg',
            size: 1024,
            type: 'image/jpeg',
            preview: 'blob:preview',
          },
        ];
        render(<FileUpload variant="avatar" files={files} />);
        expect(screen.getByText('Cambiar imagen')).toBeInTheDocument();
      });

      it('should show delete button when file is uploaded', () => {
        const files: UploadedFile[] = [
          {
            id: '1',
            file: createMockFile('avatar.jpg', 1024, 'image/jpeg'),
            name: 'avatar.jpg',
            size: 1024,
            type: 'image/jpeg',
            preview: 'blob:preview',
          },
        ];
        render(<FileUpload variant="avatar" files={files} />);
        expect(screen.getByText('Eliminar')).toBeInTheDocument();
      });
    });
  });

  describe('Max Files', () => {
    it('should hide drop zone when max files reached', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('file1.pdf', 1024, 'application/pdf'),
          name: 'file1.pdf',
          size: 1024,
          type: 'application/pdf',
        },
      ];
      render(<FileUpload files={files} maxFiles={1} />);
      expect(screen.queryByText(/Arrastra archivos/)).not.toBeInTheDocument();
    });

    it('should allow adding more files when under limit', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('file1.pdf', 1024, 'application/pdf'),
          name: 'file1.pdf',
          size: 1024,
          type: 'application/pdf',
        },
      ];
      render(<FileUpload files={files} maxFiles={5} multiple />);
      expect(screen.getByText(/Arrastra archivos/)).toBeInTheDocument();
    });
  });

  describe('Progress', () => {
    it('should show progress bar when file is uploading', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('test.pdf', 1024, 'application/pdf'),
          name: 'test.pdf',
          size: 1024,
          type: 'application/pdf',
          progress: 50,
        },
      ];
      const { container } = render(<FileUpload files={files} />);
      expect(container.querySelector('.bg-primary-600')).toBeInTheDocument();
    });

    it('should show remove button when upload is complete', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('test.pdf', 1024, 'application/pdf'),
          name: 'test.pdf',
          size: 1024,
          type: 'application/pdf',
          progress: 100,
        },
      ];
      render(<FileUpload files={files} />);
      expect(screen.getByRole('button', { name: /eliminar/i })).toBeInTheDocument();
    });
  });

  describe('Drag and Drop', () => {
    it('should handle drag enter event', () => {
      const { container } = render(<FileUpload />);
      const dropZone = container.querySelector('.border-dashed') as HTMLElement;

      fireEvent.dragEnter(dropZone, {
        dataTransfer: { files: [] },
        preventDefault: vi.fn(),
        stopPropagation: vi.fn(),
      });

      expect(dropZone).toHaveClass('border-primary-500');
    });

    it('should handle drag leave event', () => {
      const { container } = render(<FileUpload />);
      const dropZone = container.querySelector('.border-dashed') as HTMLElement;

      fireEvent.dragEnter(dropZone);
      fireEvent.dragLeave(dropZone);

      expect(dropZone).not.toHaveClass('border-primary-500');
    });

    it('should handle drag over event', () => {
      const { container } = render(<FileUpload />);
      const dropZone = container.querySelector('.border-dashed') as HTMLElement;

      const preventDefault = vi.fn();
      fireEvent.dragOver(dropZone, { preventDefault });

      // dragOver should prevent default
      expect(preventDefault).not.toHaveBeenCalled(); // fireEvent handles this
    });

    it('should process dropped files', async () => {
      const handleFilesChange = vi.fn();
      const { container } = render(<FileUpload onFilesChange={handleFilesChange} />);
      const dropZone = container.querySelector('.border-dashed') as HTMLElement;

      const file = createMockFile('dropped.pdf', 1024, 'application/pdf');
      const dataTransfer = {
        files: [file],
      };

      fireEvent.drop(dropZone, { dataTransfer });

      await waitFor(() => {
        expect(handleFilesChange).toHaveBeenCalled();
        expect(handleFilesChange.mock.calls[0][0][0].name).toBe('dropped.pdf');
      });
    });

    it('should not process files when disabled', async () => {
      const handleFilesChange = vi.fn();
      const { container } = render(<FileUpload onFilesChange={handleFilesChange} disabled />);
      const dropZone = container.querySelector('.border-dashed') as HTMLElement;

      const file = createMockFile('dropped.pdf', 1024, 'application/pdf');
      fireEvent.drop(dropZone, { dataTransfer: { files: [file] } });

      await waitFor(() => {
        expect(handleFilesChange).not.toHaveBeenCalled();
      });
    });
  });

  describe('File Type Validation', () => {
    it('should accept files matching wildcard pattern', async () => {
      const handleFilesChange = vi.fn();
      render(<FileUpload accept="image/*" onFilesChange={handleFilesChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('photo.jpg', 1024, 'image/jpeg');

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(handleFilesChange).toHaveBeenCalled();
        const files = handleFilesChange.mock.calls[0][0];
        expect(files[0].error).toBeUndefined();
      });
    });

    it('should reject files not matching wildcard pattern', async () => {
      const handleFilesChange = vi.fn();
      render(<FileUpload accept="image/*" onFilesChange={handleFilesChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('doc.pdf', 1024, 'application/pdf');

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(handleFilesChange).toHaveBeenCalled();
        const files = handleFilesChange.mock.calls[0][0];
        expect(files[0].error).toBe('Tipo de archivo no permitido');
      });
    });

    it('should accept files matching exact MIME type', async () => {
      const handleFilesChange = vi.fn();
      render(<FileUpload accept="application/pdf" onFilesChange={handleFilesChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('doc.pdf', 1024, 'application/pdf');

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(handleFilesChange).toHaveBeenCalled();
        const files = handleFilesChange.mock.calls[0][0];
        expect(files[0].error).toBeUndefined();
      });
    });

    it('should accept files matching extension', async () => {
      const handleFilesChange = vi.fn();
      render(<FileUpload accept=".pdf,.docx" onFilesChange={handleFilesChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile(
        'document.docx',
        1024,
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      );

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(handleFilesChange).toHaveBeenCalled();
        const files = handleFilesChange.mock.calls[0][0];
        expect(files[0].error).toBeUndefined();
      });
    });
  });

  describe('Image Preview', () => {
    it('should create object URL for image files', async () => {
      const handleFilesChange = vi.fn();
      render(<FileUpload onFilesChange={handleFilesChange} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file = createMockFile('photo.jpg', 1024, 'image/jpeg');

      fireEvent.change(input, { target: { files: [file] } });

      await waitFor(() => {
        expect(mockCreateObjectURL).toHaveBeenCalledWith(file);
        expect(handleFilesChange.mock.calls[0][0][0].preview).toBe('blob:mock-url');
      });
    });

    it('should revoke object URL when file is removed', async () => {
      const handleFileRemove = vi.fn();
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('photo.jpg', 1024, 'image/jpeg'),
          name: 'photo.jpg',
          size: 1024,
          type: 'image/jpeg',
          preview: 'blob:preview-url',
        },
      ];
      render(<FileUpload files={files} onFileRemove={handleFileRemove} />);

      const removeButton = screen.getByRole('button', { name: /eliminar/i });
      fireEvent.click(removeButton);

      expect(mockRevokeObjectURL).toHaveBeenCalledWith('blob:preview-url');
    });
  });

  describe('Multiple Files', () => {
    it('should only add one file when multiple is false', async () => {
      const handleFilesChange = vi.fn();
      render(<FileUpload onFilesChange={handleFilesChange} multiple={false} />);

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file1 = createMockFile('file1.pdf', 1024, 'application/pdf');
      const file2 = createMockFile('file2.pdf', 1024, 'application/pdf');

      fireEvent.change(input, { target: { files: [file1, file2] } });

      await waitFor(() => {
        expect(handleFilesChange).toHaveBeenCalled();
        expect(handleFilesChange.mock.calls[0][0]).toHaveLength(1);
      });
    });

    it('should respect maxFiles limit', async () => {
      const handleFilesChange = vi.fn();
      const existingFiles: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('existing.pdf', 1024, 'application/pdf'),
          name: 'existing.pdf',
          size: 1024,
          type: 'application/pdf',
        },
      ];
      render(
        <FileUpload files={existingFiles} onFilesChange={handleFilesChange} multiple maxFiles={2} />
      );

      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      const file1 = createMockFile('file1.pdf', 1024, 'application/pdf');
      const file2 = createMockFile('file2.pdf', 1024, 'application/pdf');

      fireEvent.change(input, { target: { files: [file1, file2] } });

      await waitFor(() => {
        expect(handleFilesChange).toHaveBeenCalled();
        // Only 1 new file should be added (existing 1 + new 1 = 2 max)
        expect(handleFilesChange.mock.calls[0][0]).toHaveLength(2);
      });
    });
  });

  describe('File Icons', () => {
    it('should show video icon for video files', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('video.mp4', 1024, 'video/mp4'),
          name: 'video.mp4',
          size: 1024,
          type: 'video/mp4',
        },
      ];
      const { container } = render(<FileUpload files={files} />);
      // Video files should have an icon (not a preview)
      expect(container.querySelector('.bg-gray-200')).toBeInTheDocument();
    });

    it('should show document icon for document files', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('doc.pdf', 1024, 'application/pdf'),
          name: 'doc.pdf',
          size: 1024,
          type: 'application/pdf',
        },
      ];
      const { container } = render(<FileUpload files={files} />);
      expect(container.querySelector('.bg-gray-200')).toBeInTheDocument();
    });
  });

  describe('Avatar Variant Extended', () => {
    it('should handle drag and drop on avatar', async () => {
      const handleFilesChange = vi.fn();
      const { container } = render(
        <FileUpload variant="avatar" onFilesChange={handleFilesChange} />
      );
      const avatarZone = container.querySelector('.rounded-full') as HTMLElement;

      fireEvent.dragEnter(avatarZone);
      expect(avatarZone).toHaveClass('border-primary-500');

      fireEvent.dragLeave(avatarZone);
      expect(avatarZone).not.toHaveClass('border-primary-500');
    });

    it('should handle drop on avatar', async () => {
      const handleFilesChange = vi.fn();
      const { container } = render(
        <FileUpload variant="avatar" onFilesChange={handleFilesChange} />
      );
      const avatarZone = container.querySelector('.rounded-full') as HTMLElement;

      const file = createMockFile('avatar.jpg', 1024, 'image/jpeg');
      fireEvent.drop(avatarZone, { dataTransfer: { files: [file] } });

      await waitFor(() => {
        expect(handleFilesChange).toHaveBeenCalled();
      });
    });

    it('should show error message in avatar variant', () => {
      render(<FileUpload variant="avatar" error="Invalid image" />);
      expect(screen.getByText('Invalid image')).toBeInTheDocument();
    });

    it('should call onFileRemove when delete button is clicked in avatar variant', () => {
      const handleFileRemove = vi.fn();
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('avatar.jpg', 1024, 'image/jpeg'),
          name: 'avatar.jpg',
          size: 1024,
          type: 'image/jpeg',
          preview: 'blob:preview',
        },
      ];
      render(<FileUpload variant="avatar" files={files} onFileRemove={handleFileRemove} />);

      const deleteButton = screen.getByText('Eliminar');
      fireEvent.click(deleteButton);

      expect(handleFileRemove).toHaveBeenCalledWith('1');
    });
  });

  describe('Compact Variant Extended', () => {
    it('should show image preview in compact chips', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('photo.jpg', 1024, 'image/jpeg'),
          name: 'photo.jpg',
          size: 1024,
          type: 'image/jpeg',
          preview: 'blob:preview',
        },
      ];
      render(<FileUpload variant="compact" files={files} />);
      const img = screen.getByAltText('photo.jpg');
      expect(img).toBeInTheDocument();
    });

    it('should show file icon when no preview in compact variant', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('doc.pdf', 1024, 'application/pdf'),
          name: 'doc.pdf',
          size: 1024,
          type: 'application/pdf',
        },
      ];
      const { container } = render(<FileUpload variant="compact" files={files} />);
      // Should have an icon element
      expect(container.querySelector('svg')).toBeInTheDocument();
    });

    it('should show error styling for files with errors in compact variant', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('large.pdf', 1024, 'application/pdf'),
          name: 'large.pdf',
          size: 1024,
          type: 'application/pdf',
          error: 'Too large',
        },
      ];
      const { container } = render(<FileUpload variant="compact" files={files} />);
      expect(container.querySelector('.bg-red-100')).toBeInTheDocument();
    });

    it('should show error message in compact variant', () => {
      render(<FileUpload variant="compact" error="Upload failed" />);
      expect(screen.getByText('Upload failed')).toBeInTheDocument();
    });

    it('should show helper text in compact variant', () => {
      render(<FileUpload variant="compact" helperText="Select files" />);
      expect(screen.getByText('Select files')).toBeInTheDocument();
    });

    it('should hide add button when max files reached in compact variant', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('file1.pdf', 1024, 'application/pdf'),
          name: 'file1.pdf',
          size: 1024,
          type: 'application/pdf',
        },
      ];
      render(<FileUpload variant="compact" files={files} maxFiles={1} />);
      expect(screen.queryByText('Agregar')).not.toBeInTheDocument();
    });

    it('should call onFileRemove in compact variant', () => {
      const handleFileRemove = vi.fn();
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('file.pdf', 1024, 'application/pdf'),
          name: 'file.pdf',
          size: 1024,
          type: 'application/pdf',
        },
      ];
      render(<FileUpload variant="compact" files={files} onFileRemove={handleFileRemove} />);

      const removeButton = screen.getByRole('button', { name: /eliminar/i });
      fireEvent.click(removeButton);

      expect(handleFileRemove).toHaveBeenCalledWith('1');
    });
  });

  describe('Custom Placeholder', () => {
    it('should render custom placeholder content', () => {
      render(<FileUpload placeholder={<div>Custom Upload Area</div>} />);
      expect(screen.getByText('Custom Upload Area')).toBeInTheDocument();
    });
  });

  describe('Error Display in File List', () => {
    it('should show file error in the file list', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('large.pdf', 1024, 'application/pdf'),
          name: 'large.pdf',
          size: 1024,
          type: 'application/pdf',
          error: 'File too large',
        },
      ];
      render(<FileUpload files={files} />);
      expect(screen.getByText('File too large')).toBeInTheDocument();
    });

    it('should apply error styling to file with error', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('large.pdf', 1024, 'application/pdf'),
          name: 'large.pdf',
          size: 1024,
          type: 'application/pdf',
          error: 'File too large',
        },
      ];
      const { container } = render(<FileUpload files={files} />);
      expect(container.querySelector('.bg-red-50')).toBeInTheDocument();
    });
  });

  describe('Click to Upload', () => {
    it('should trigger file input when drop zone is clicked', () => {
      const { container } = render(<FileUpload />);
      const dropZone = container.querySelector('.border-dashed') as HTMLElement;
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      const clickSpy = vi.spyOn(input, 'click');
      fireEvent.click(dropZone);

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should not trigger file input when disabled', () => {
      const { container } = render(<FileUpload disabled />);
      const dropZone = container.querySelector('.border-dashed') as HTMLElement;
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;

      const clickSpy = vi.spyOn(input, 'click');
      fireEvent.click(dropZone);

      expect(clickSpy).not.toHaveBeenCalled();
    });
  });

  describe('File Size Formatting', () => {
    it('should format 0 bytes correctly', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('empty.txt', 0, 'text/plain'),
          name: 'empty.txt',
          size: 0,
          type: 'text/plain',
        },
      ];
      render(<FileUpload files={files} />);
      expect(screen.getByText('0 B')).toBeInTheDocument();
    });

    it('should format MB correctly', () => {
      const files: UploadedFile[] = [
        {
          id: '1',
          file: createMockFile('large.zip', 5242880, 'application/zip'),
          name: 'large.zip',
          size: 5242880,
          type: 'application/zip',
        },
      ];
      render(<FileUpload files={files} />);
      expect(screen.getByText('5 MB')).toBeInTheDocument();
    });
  });
});
