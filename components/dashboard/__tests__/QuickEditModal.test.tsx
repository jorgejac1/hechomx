import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuickEditModal from '../QuickEditModal';
import { SellerProduct } from '@/lib/types';

const mockProduct: SellerProduct = {
  id: 'prod-1',
  name: 'Cojín Tejido Geometrico',
  image: '/images/products/cushion.jpg',
  price: 450,
  stock: 12,
  sold: 5,
  views: 89,
  favorites: 15,
  status: 'active',
};

const mockOnClose = vi.fn();
const mockOnSave = vi.fn();

describe('QuickEditModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockOnSave.mockResolvedValue(undefined);
  });

  describe('rendering', () => {
    it('should not render when isOpen is false', () => {
      const { container } = render(
        <QuickEditModal
          product={mockProduct}
          isOpen={false}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      expect(container.firstChild).toBeNull();
    });

    it('should not render when product is null', () => {
      const { container } = render(
        <QuickEditModal product={null} isOpen={true} onClose={mockOnClose} onSave={mockOnSave} />
      );
      expect(container.firstChild).toBeNull();
    });

    it('should render when isOpen is true and product is provided', () => {
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText('Edición Rápida')).toBeInTheDocument();
    });

    it('should display product preview with name and price', () => {
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      expect(screen.getByText('Cojín Tejido Geometrico')).toBeInTheDocument();
      // formatCurrency uses es-MX locale with no decimals, e.g., "$450"
      expect(screen.getByText(/\$450/)).toBeInTheDocument();
      expect(screen.getByText(/Stock: 12/)).toBeInTheDocument();
    });

    it('should display product image', () => {
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      const img = screen.getByAltText('Cojín Tejido Geometrico');
      expect(img).toBeInTheDocument();
    });

    it('should populate form fields with product data', () => {
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );
      const nameInput = screen.getByLabelText(/Nombre del Producto/i);
      const priceInput = screen.getByLabelText(/Precio/i);
      const stockInput = screen.getByLabelText(/Stock/i);

      expect(nameInput).toHaveValue('Cojín Tejido Geometrico');
      expect(priceInput).toHaveValue(450);
      expect(stockInput).toHaveValue(12);
    });
  });

  describe('form interactions', () => {
    it('should update name field when typing', async () => {
      const user = userEvent.setup();
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const nameInput = screen.getByLabelText(/Nombre del Producto/i);
      await user.clear(nameInput);
      await user.type(nameInput, 'Nuevo Nombre');

      expect(nameInput).toHaveValue('Nuevo Nombre');
    });

    it('should update price field when typing', async () => {
      const user = userEvent.setup();
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const priceInput = screen.getByLabelText(/Precio/i);
      await user.clear(priceInput);
      await user.type(priceInput, '599');

      expect(priceInput).toHaveValue(599);
    });

    it('should update stock field when typing', async () => {
      const user = userEvent.setup();
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const stockInput = screen.getByLabelText(/Stock/i);
      await user.clear(stockInput);
      await user.type(stockInput, '25');

      expect(stockInput).toHaveValue(25);
    });
  });

  describe('validation', () => {
    it('should show error when name is empty', async () => {
      const user = userEvent.setup();
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const nameInput = screen.getByLabelText(/Nombre del Producto/i);
      await user.clear(nameInput);

      const submitButton = screen.getByRole('button', { name: /Guardar/i });
      await user.click(submitButton);

      expect(screen.getByText('El nombre es requerido')).toBeInTheDocument();
      expect(mockOnSave).not.toHaveBeenCalled();
    });

    it('should show error when price is zero or negative', async () => {
      const user = userEvent.setup();
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const priceInput = screen.getByLabelText(/Precio/i);
      await user.clear(priceInput);
      await user.type(priceInput, '0');

      const submitButton = screen.getByRole('button', { name: /Guardar/i });
      await user.click(submitButton);

      expect(screen.getByText('Ingresa un precio válido mayor a 0')).toBeInTheDocument();
      expect(mockOnSave).not.toHaveBeenCalled();
    });

    it('should show error when stock is invalid (non-numeric)', async () => {
      const user = userEvent.setup();
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const stockInput = screen.getByLabelText(/Stock/i);
      await user.clear(stockInput);
      // Also change name to enable the save button
      const nameInput = screen.getByLabelText(/Nombre del Producto/i);
      await user.clear(nameInput);
      await user.type(nameInput, 'Nuevo Nombre');

      const submitButton = screen.getByRole('button', { name: /Guardar/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('El stock debe ser 0 o mayor')).toBeInTheDocument();
      });
      expect(mockOnSave).not.toHaveBeenCalled();
    });

    it('should allow stock of 0', async () => {
      const user = userEvent.setup();
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const stockInput = screen.getByLabelText(/Stock/i);
      await user.clear(stockInput);
      await user.type(stockInput, '0');

      const submitButton = screen.getByRole('button', { name: /Guardar/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSave).toHaveBeenCalledWith('prod-1', {
          name: 'Cojín Tejido Geometrico',
          price: 450,
          stock: 0,
        });
      });
    });
  });

  describe('save functionality', () => {
    it('should call onSave with correct data when form is valid', async () => {
      const user = userEvent.setup();
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const nameInput = screen.getByLabelText(/Nombre del Producto/i);
      await user.clear(nameInput);
      await user.type(nameInput, 'Producto Actualizado');

      const priceInput = screen.getByLabelText(/Precio/i);
      await user.clear(priceInput);
      await user.type(priceInput, '599');

      const stockInput = screen.getByLabelText(/Stock/i);
      await user.clear(stockInput);
      await user.type(stockInput, '20');

      const submitButton = screen.getByRole('button', { name: /Guardar/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSave).toHaveBeenCalledWith('prod-1', {
          name: 'Producto Actualizado',
          price: 599,
          stock: 20,
        });
      });
    });

    it('should call onClose after successful save', async () => {
      const user = userEvent.setup();
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const nameInput = screen.getByLabelText(/Nombre del Producto/i);
      await user.clear(nameInput);
      await user.type(nameInput, 'Nuevo Nombre');

      const submitButton = screen.getByRole('button', { name: /Guardar/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalled();
      });
    });

    it('should show loading state while saving', async () => {
      const user = userEvent.setup();
      let resolvePromise: () => void;
      const slowSave = vi.fn(
        () =>
          new Promise<void>((resolve) => {
            resolvePromise = resolve;
          })
      );

      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={slowSave}
        />
      );

      const nameInput = screen.getByLabelText(/Nombre del Producto/i);
      await user.clear(nameInput);
      await user.type(nameInput, 'Nuevo Nombre');

      const submitButton = screen.getByRole('button', { name: /Guardar/i });
      await user.click(submitButton);

      expect(screen.getByText('Guardando...')).toBeInTheDocument();

      resolvePromise!();
      await waitFor(() => {
        expect(mockOnClose).not.toHaveBeenCalled();
      });
    });

    it('should show error when save fails', async () => {
      const user = userEvent.setup();
      const failingSave = vi.fn().mockRejectedValue(new Error('Save failed'));

      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={failingSave}
        />
      );

      const nameInput = screen.getByLabelText(/Nombre del Producto/i);
      await user.clear(nameInput);
      await user.type(nameInput, 'Nuevo Nombre');

      const submitButton = screen.getByRole('button', { name: /Guardar/i });
      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Error al guardar. Inténtalo de nuevo.')).toBeInTheDocument();
      });
    });
  });

  describe('close functionality', () => {
    it('should call onClose when close button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const closeButton = screen.getByLabelText('Cerrar');
      await user.click(closeButton);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should call onClose when cancel button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const cancelButton = screen.getByRole('button', { name: /Cancelar/i });
      await user.click(cancelButton);

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should call onClose when backdrop is clicked', async () => {
      const user = userEvent.setup();
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const backdrop = document.querySelector('[aria-hidden="true"]');
      if (backdrop) {
        await user.click(backdrop);
      }

      expect(mockOnClose).toHaveBeenCalled();
    });

    it('should call onClose when escape key is pressed', () => {
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      fireEvent.keyDown(document, { key: 'Escape' });

      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  describe('save button disabled state', () => {
    it('should disable save button when no changes are made', () => {
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const submitButton = screen.getByRole('button', { name: /Guardar/i });
      expect(submitButton).toBeDisabled();
    });

    it('should enable save button when changes are made', async () => {
      const user = userEvent.setup();
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const nameInput = screen.getByLabelText(/Nombre del Producto/i);
      await user.clear(nameInput);
      await user.type(nameInput, 'Nuevo Nombre');

      const submitButton = screen.getByRole('button', { name: /Guardar/i });
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('form reset on product change', () => {
    it('should reset form fields when product changes', () => {
      const { rerender } = render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const newProduct: SellerProduct = {
        ...mockProduct,
        id: 'prod-2',
        name: 'Otro Producto',
        price: 999,
        stock: 5,
      };

      rerender(
        <QuickEditModal
          product={newProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const nameInput = screen.getByLabelText(/Nombre del Producto/i);
      const priceInput = screen.getByLabelText(/Precio/i);
      const stockInput = screen.getByLabelText(/Stock/i);

      expect(nameInput).toHaveValue('Otro Producto');
      expect(priceInput).toHaveValue(999);
      expect(stockInput).toHaveValue(5);
    });
  });

  describe('accessibility', () => {
    it('should have proper aria attributes', () => {
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(dialog).toHaveAttribute('aria-labelledby', 'quick-edit-title');
    });

    it('should have proper labels for form fields', () => {
      render(
        <QuickEditModal
          product={mockProduct}
          isOpen={true}
          onClose={mockOnClose}
          onSave={mockOnSave}
        />
      );

      expect(screen.getByLabelText(/Nombre del Producto/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Precio/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Stock/i)).toBeInTheDocument();
    });
  });
});
