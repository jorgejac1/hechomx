import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Ban } from 'lucide-react';
import Alert from '../Alert';

describe('Alert', () => {
  describe('rendering', () => {
    it('should render children content', () => {
      render(<Alert>This is an alert message</Alert>);
      expect(screen.getByText('This is an alert message')).toBeInTheDocument();
    });

    it('should render with title', () => {
      render(<Alert title="Important Notice">Alert content</Alert>);
      expect(screen.getByText('Important Notice')).toBeInTheDocument();
      expect(screen.getByText('Alert content')).toBeInTheDocument();
    });

    it('should have role="alert"', () => {
      render(<Alert>Alert content</Alert>);
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<Alert className="custom-class">Content</Alert>);
      expect(screen.getByRole('alert')).toHaveClass('custom-class');
    });
  });

  describe('variants', () => {
    it('should render info variant by default', () => {
      render(<Alert>Info alert</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert.className).toContain('bg-blue-50');
    });

    it('should render success variant', () => {
      render(<Alert variant="success">Success alert</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert.className).toContain('bg-green-50');
    });

    it('should render warning variant', () => {
      render(<Alert variant="warning">Warning alert</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert.className).toContain('bg-amber-50');
    });

    it('should render error variant', () => {
      render(<Alert variant="error">Error alert</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert.className).toContain('bg-red-50');
    });
  });

  describe('layouts', () => {
    it('should render default layout with border and rounded corners', () => {
      render(<Alert layout="default">Content</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert.className).toContain('border');
      expect(alert.className).toContain('rounded-lg');
    });

    it('should render bordered layout with xl rounded corners', () => {
      render(<Alert layout="bordered">Content</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert.className).toContain('border');
      expect(alert.className).toContain('rounded-xl');
    });

    it('should render sidebar layout with left border accent', () => {
      render(<Alert layout="sidebar">Content</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert.className).toContain('border-l-4');
      expect(alert.className).toContain('rounded-r-lg');
    });

    it('should apply correct border color for sidebar variant', () => {
      render(
        <Alert layout="sidebar" variant="error">
          Content
        </Alert>
      );
      const alert = screen.getByRole('alert');
      expect(alert.className).toContain('border-l-red-600');
    });
  });

  describe('icons', () => {
    it('should render default icon based on variant', () => {
      render(<Alert variant="info">Content</Alert>);
      // Icon should be present (aria-hidden)
      const icon = screen.getByRole('alert').querySelector('svg');
      expect(icon).toBeInTheDocument();
    });

    it('should render custom icon when provided', () => {
      render(
        <Alert icon={Ban} data-testid="alert">
          Content
        </Alert>
      );
      // Custom icon should be rendered
      const alert = screen.getByRole('alert');
      expect(alert.querySelector('svg')).toBeInTheDocument();
    });

    it('should hide icon when hideIcon is true', () => {
      render(<Alert hideIcon>Content</Alert>);
      const alert = screen.getByRole('alert');
      expect(alert.querySelector('svg')).not.toBeInTheDocument();
    });
  });

  describe('dismissible', () => {
    it('should not show close button by default', () => {
      render(<Alert>Content</Alert>);
      expect(screen.queryByLabelText('Cerrar alerta')).not.toBeInTheDocument();
    });

    it('should show close button when dismissible is true', () => {
      render(<Alert dismissible>Content</Alert>);
      expect(screen.getByLabelText('Cerrar alerta')).toBeInTheDocument();
    });

    it('should call onDismiss when close button is clicked', () => {
      const onDismiss = vi.fn();
      render(
        <Alert dismissible onDismiss={onDismiss}>
          Content
        </Alert>
      );
      fireEvent.click(screen.getByLabelText('Cerrar alerta'));
      expect(onDismiss).toHaveBeenCalledTimes(1);
    });
  });

  describe('actions', () => {
    it('should render actions when provided', () => {
      render(<Alert actions={<button>Take Action</button>}>Content</Alert>);
      expect(screen.getByText('Take Action')).toBeInTheDocument();
    });

    it('should render multiple actions', () => {
      render(
        <Alert
          actions={
            <>
              <button>Action 1</button>
              <button>Action 2</button>
            </>
          }
        >
          Content
        </Alert>
      );
      expect(screen.getByText('Action 1')).toBeInTheDocument();
      expect(screen.getByText('Action 2')).toBeInTheDocument();
    });
  });

  describe('title and content styling', () => {
    it('should apply correct title styles for info variant', () => {
      render(
        <Alert variant="info" title="Info Title">
          Content
        </Alert>
      );
      const title = screen.getByText('Info Title');
      expect(title.className).toContain('text-blue-800');
      expect(title.className).toContain('font-semibold');
    });

    it('should apply correct title styles for error variant', () => {
      render(
        <Alert variant="error" title="Error Title">
          Content
        </Alert>
      );
      const title = screen.getByText('Error Title');
      expect(title.className).toContain('text-red-800');
    });

    it('should apply correct text styles for success variant', () => {
      render(<Alert variant="success">Success message</Alert>);
      const content = screen.getByText('Success message');
      expect(content.className).toContain('text-green-700');
    });

    it('should apply correct text styles for warning variant', () => {
      render(<Alert variant="warning">Warning message</Alert>);
      const content = screen.getByText('Warning message');
      expect(content.className).toContain('text-amber-700');
    });
  });

  describe('complex content', () => {
    it('should render JSX children', () => {
      render(
        <Alert>
          <p data-testid="paragraph">Paragraph content</p>
          <ul data-testid="list">
            <li>Item 1</li>
            <li>Item 2</li>
          </ul>
        </Alert>
      );
      expect(screen.getByTestId('paragraph')).toBeInTheDocument();
      expect(screen.getByTestId('list')).toBeInTheDocument();
      expect(screen.getByText('Item 1')).toBeInTheDocument();
    });

    it('should render with title and complex children', () => {
      render(
        <Alert title="Account Suspended">
          <p>Your account has been suspended due to:</p>
          <ul>
            <li>Violation of terms</li>
          </ul>
        </Alert>
      );
      expect(screen.getByText('Account Suspended')).toBeInTheDocument();
      expect(screen.getByText('Your account has been suspended due to:')).toBeInTheDocument();
      expect(screen.getByText('Violation of terms')).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have aria-hidden on icon', () => {
      render(<Alert>Content</Alert>);
      const icon = screen.getByRole('alert').querySelector('svg');
      expect(icon).toHaveAttribute('aria-hidden', 'true');
    });

    it('should have accessible name on dismiss button', () => {
      render(<Alert dismissible>Content</Alert>);
      const button = screen.getByLabelText('Cerrar alerta');
      expect(button).toBeInTheDocument();
    });
  });
});
