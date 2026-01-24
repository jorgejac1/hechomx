import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { renderHook } from '@testing-library/react';
import { ToastProvider, useToast } from '../ToastContext';

// Test component that uses useToast
function ToastTestComponent() {
  const { showToast, success, error, info, warning } = useToast();

  return (
    <div>
      <button data-testid="show-toast" onClick={() => showToast('Default toast')}>
        Show Toast
      </button>
      <button
        data-testid="show-toast-success"
        onClick={() => showToast('Success message', 'success')}
      >
        Show Success
      </button>
      <button
        data-testid="show-toast-custom-duration"
        onClick={() => showToast('Custom duration', 'info', 5000)}
      >
        Custom Duration
      </button>
      <button data-testid="success" onClick={() => success('Success!')}>
        Success
      </button>
      <button data-testid="error" onClick={() => error('Error!')}>
        Error
      </button>
      <button data-testid="info" onClick={() => info('Info!')}>
        Info
      </button>
      <button data-testid="warning" onClick={() => warning('Warning!')}>
        Warning
      </button>
      <button data-testid="success-custom" onClick={() => success('Custom success', 1000)}>
        Success Custom
      </button>
      <button data-testid="error-custom" onClick={() => error('Custom error', 2000)}>
        Error Custom
      </button>
      <button data-testid="info-custom" onClick={() => info('Custom info', 3000)}>
        Info Custom
      </button>
      <button data-testid="warning-custom" onClick={() => warning('Custom warning', 4000)}>
        Warning Custom
      </button>
    </div>
  );
}

describe('ToastContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('ToastProvider', () => {
    it('provides toast context to children', () => {
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      );

      expect(screen.getByTestId('show-toast')).toBeInTheDocument();
    });

    it('renders toast container', () => {
      const { container } = render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      );

      const toastContainer = container.querySelector('.fixed.top-4.right-4');
      expect(toastContainer).toBeInTheDocument();
    });
  });

  describe('useToast hook', () => {
    it('throws error when used outside ToastProvider', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        renderHook(() => useToast());
      }).toThrow('useToast must be used within a ToastProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('showToast', () => {
    it('displays a toast with default type (info)', async () => {
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-toast'));

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
        expect(screen.getByText('Default toast')).toBeInTheDocument();
      });
    });

    it('displays a toast with specified type', async () => {
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('show-toast-success'));

      await waitFor(() => {
        expect(screen.getByText('Success message')).toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveClass('bg-green-50');
      });
    });
  });

  describe('success', () => {
    it('displays a success toast', async () => {
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('success'));

      await waitFor(() => {
        expect(screen.getByText('Success!')).toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveClass('bg-green-50');
      });
    });

    it('accepts custom duration parameter', async () => {
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('success-custom'));

      await waitFor(() => {
        expect(screen.getByText('Custom success')).toBeInTheDocument();
      });
    });
  });

  describe('error', () => {
    it('displays an error toast', async () => {
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('error'));

      await waitFor(() => {
        expect(screen.getByText('Error!')).toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveClass('bg-red-50');
      });
    });

    it('accepts custom duration parameter', async () => {
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('error-custom'));

      await waitFor(() => {
        expect(screen.getByText('Custom error')).toBeInTheDocument();
      });
    });
  });

  describe('info', () => {
    it('displays an info toast', async () => {
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('info'));

      await waitFor(() => {
        expect(screen.getByText('Info!')).toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveClass('bg-blue-50');
      });
    });

    it('accepts custom duration parameter', async () => {
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('info-custom'));

      await waitFor(() => {
        expect(screen.getByText('Custom info')).toBeInTheDocument();
      });
    });
  });

  describe('warning', () => {
    it('displays a warning toast', async () => {
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('warning'));

      await waitFor(() => {
        expect(screen.getByText('Warning!')).toBeInTheDocument();
        expect(screen.getByRole('alert')).toHaveClass('bg-yellow-50');
      });
    });

    it('accepts custom duration parameter', async () => {
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('warning-custom'));

      await waitFor(() => {
        expect(screen.getByText('Custom warning')).toBeInTheDocument();
      });
    });
  });

  describe('Multiple toasts', () => {
    it('displays multiple toasts simultaneously', async () => {
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('success'));
      fireEvent.click(screen.getByTestId('error'));
      fireEvent.click(screen.getByTestId('info'));

      await waitFor(() => {
        expect(screen.getByText('Success!')).toBeInTheDocument();
        expect(screen.getByText('Error!')).toBeInTheDocument();
        expect(screen.getByText('Info!')).toBeInTheDocument();
      });

      const alerts = screen.getAllByRole('alert');
      expect(alerts).toHaveLength(3);
    });
  });

  describe('Manual close', () => {
    it('closes toast when close button is clicked', async () => {
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      );

      fireEvent.click(screen.getByTestId('success'));

      await waitFor(() => {
        expect(screen.getByText('Success!')).toBeInTheDocument();
      });

      const closeButton = screen.getByLabelText('Cerrar notificación');
      fireEvent.click(closeButton);

      await waitFor(() => {
        expect(screen.queryByText('Success!')).not.toBeInTheDocument();
      });
    });
  });

  describe('Toast removal', () => {
    it('removes toast from state when closed', async () => {
      render(
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      );

      // Show two toasts
      fireEvent.click(screen.getByTestId('success'));
      fireEvent.click(screen.getByTestId('error'));

      await waitFor(() => {
        expect(screen.getAllByRole('alert')).toHaveLength(2);
      });

      // Close the success toast
      const closeButtons = screen.getAllByLabelText('Cerrar notificación');
      fireEvent.click(closeButtons[0]);

      await waitFor(() => {
        expect(screen.getAllByRole('alert')).toHaveLength(1);
      });
    });
  });
});
