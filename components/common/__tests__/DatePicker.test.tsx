import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DatePicker from '../DatePicker';

describe('DatePicker', () => {
  const mockOnChange = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Mock current date for consistent tests
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2024, 5, 15)); // June 15, 2024
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  // Helper to get the trigger button (the one with aria-haspopup)
  function getTriggerButton(): HTMLButtonElement {
    return screen
      .getAllByRole('button')
      .find((btn) => btn.hasAttribute('aria-haspopup')) as HTMLButtonElement;
  }

  describe('Rendering', () => {
    it('should render with placeholder', () => {
      render(<DatePicker placeholder="Select date" />);
      expect(screen.getByText('Select date')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<DatePicker label="Fecha de nacimiento" />);
      expect(screen.getByText('Fecha de nacimiento')).toBeInTheDocument();
    });

    it('should render with required indicator', () => {
      render(<DatePicker label="Date" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should render selected date', () => {
      const date = new Date(2024, 5, 20);
      render(<DatePicker value={date} />);
      expect(screen.getByText(/20/)).toBeInTheDocument();
    });

    it('should render helper text', () => {
      render(<DatePicker helperText="Selecciona tu fecha" />);
      expect(screen.getByText('Selecciona tu fecha')).toBeInTheDocument();
    });

    it('should render error message', () => {
      render(<DatePicker error="Fecha inválida" />);
      expect(screen.getByText('Fecha inválida')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(<DatePicker className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Sizes', () => {
    it('should render small size', () => {
      render(<DatePicker size="sm" />);
      const button = getTriggerButton();
      expect(button).toHaveClass('py-1.5');
    });

    it('should render medium size by default', () => {
      render(<DatePicker />);
      const button = getTriggerButton();
      expect(button).toHaveClass('py-2');
    });

    it('should render large size', () => {
      render(<DatePicker size="lg" />);
      const button = getTriggerButton();
      expect(button).toHaveClass('py-3');
    });
  });

  describe('Dropdown Behavior', () => {
    it('should open calendar on click', () => {
      render(<DatePicker />);
      fireEvent.click(getTriggerButton());
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });

    it('should close calendar on outside click', () => {
      render(<DatePicker />);
      fireEvent.click(getTriggerButton());
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      fireEvent.mouseDown(document.body);
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should have aria-expanded attribute', () => {
      render(<DatePicker />);
      const button = getTriggerButton();
      expect(button).toHaveAttribute('aria-expanded', 'false');

      fireEvent.click(button);
      expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('should not open when disabled', () => {
      render(<DatePicker disabled />);
      fireEvent.click(getTriggerButton());
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Calendar Navigation', () => {
    it('should show current month', () => {
      render(<DatePicker />);
      fireEvent.click(getTriggerButton());
      expect(screen.getByText('Junio 2024')).toBeInTheDocument();
    });

    it('should navigate to previous month', () => {
      render(<DatePicker />);
      fireEvent.click(getTriggerButton());
      fireEvent.click(screen.getByLabelText('Mes anterior'));
      expect(screen.getByText('Mayo 2024')).toBeInTheDocument();
    });

    it('should navigate to next month', () => {
      render(<DatePicker />);
      fireEvent.click(getTriggerButton());
      fireEvent.click(screen.getByLabelText('Mes siguiente'));
      expect(screen.getByText('Julio 2024')).toBeInTheDocument();
    });

    it('should have "Hoy" button', () => {
      render(<DatePicker />);
      fireEvent.click(getTriggerButton());
      expect(screen.getByText('Hoy')).toBeInTheDocument();
    });

    it('should select today when clicking Hoy button', () => {
      render(<DatePicker onChange={mockOnChange} />);
      fireEvent.click(getTriggerButton());
      fireEvent.click(screen.getByText('Hoy'));

      // Should call onChange with today's date (June 15, 2024)
      expect(mockOnChange).toHaveBeenCalled();
      const selectedDate = mockOnChange.mock.calls[0][0];
      expect(selectedDate.getDate()).toBe(15);
      expect(selectedDate.getMonth()).toBe(5); // June
      expect(selectedDate.getFullYear()).toBe(2024);
    });

    it('should close dropdown after clicking Hoy button', () => {
      render(<DatePicker onChange={mockOnChange} />);
      fireEvent.click(getTriggerButton());
      fireEvent.click(screen.getByText('Hoy'));

      // Dropdown should be closed
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should not select today if today is disabled', () => {
      // Today (June 15) is disabled
      const disabledDates = [new Date(2024, 5, 15)];
      render(<DatePicker disabledDates={disabledDates} onChange={mockOnChange} />);
      fireEvent.click(getTriggerButton());
      fireEvent.click(screen.getByText('Hoy'));

      // Should NOT call onChange since today is disabled
      expect(mockOnChange).not.toHaveBeenCalled();
      // Calendar should still be open
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('Date Selection', () => {
    it('should call onChange when date is selected', () => {
      render(<DatePicker onChange={mockOnChange} />);
      fireEvent.click(getTriggerButton());

      // Find a specific day button using aria-label that contains "jun"
      const june20 = screen.getByLabelText(/20 jun 2024/i);
      fireEvent.click(june20);

      expect(mockOnChange).toHaveBeenCalled();
      const selectedDate = mockOnChange.mock.calls[0][0];
      expect(selectedDate.getDate()).toBe(20);
    });

    it('should close dropdown after selection', () => {
      render(<DatePicker onChange={mockOnChange} />);
      fireEvent.click(getTriggerButton());

      const june20 = screen.getByLabelText(/20 jun 2024/i);
      fireEvent.click(june20);

      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('should highlight selected date', () => {
      const date = new Date(2024, 5, 20);
      render(<DatePicker value={date} />);
      fireEvent.click(getTriggerButton());

      const june20Button = screen.getByLabelText(/20 jun 2024/i);
      expect(june20Button).toHaveAttribute('aria-selected', 'true');
    });

    it('should highlight today', () => {
      render(<DatePicker />);
      fireEvent.click(getTriggerButton());

      // Today is June 15, 2024
      const todayButton = screen.getByLabelText(/15 jun 2024/i);
      expect(todayButton).toHaveClass('bg-primary-100');
    });
  });

  describe('Date Constraints', () => {
    it('should disable dates before minDate', () => {
      const minDate = new Date(2024, 5, 10);
      render(<DatePicker minDate={minDate} />);
      fireEvent.click(getTriggerButton());

      // Day 5 in June should be disabled - find a button with text "5" that's disabled
      const dayButtons = screen.getAllByRole('button').filter((btn) => btn.textContent === '5');
      // At least one should be disabled (the one in June before minDate)
      const disabledDays = dayButtons.filter((btn) => btn.hasAttribute('disabled'));
      expect(disabledDays.length).toBeGreaterThan(0);
    });

    it('should disable dates after maxDate', () => {
      const maxDate = new Date(2024, 5, 20);
      render(<DatePicker maxDate={maxDate} />);
      fireEvent.click(getTriggerButton());

      // Day 25 in June should be disabled
      const june25 = screen.getByLabelText(/25 jun 2024/i);
      expect(june25).toBeDisabled();
    });

    it('should disable specific dates', () => {
      const disabledDates = [new Date(2024, 5, 18)];
      render(<DatePicker disabledDates={disabledDates} />);
      fireEvent.click(getTriggerButton());

      // Day 18 in June should be disabled
      const june18 = screen.getByLabelText(/18 jun 2024/i);
      expect(june18).toBeDisabled();
    });

    it('should disable dates via function', () => {
      // Disable weekends using a function
      const disabledDates = (date: Date) => date.getDay() === 0 || date.getDay() === 6;
      render(<DatePicker disabledDates={disabledDates} />);
      fireEvent.click(getTriggerButton());

      // June 15, 2024 is a Saturday, should be disabled
      const june15 = screen.getByLabelText(/15 jun 2024/i);
      expect(june15).toBeDisabled();

      // June 16, 2024 is a Sunday, should be disabled
      const june16 = screen.getByLabelText(/16 jun 2024/i);
      expect(june16).toBeDisabled();

      // June 17, 2024 is a Monday, should not be disabled
      const june17 = screen.getByLabelText(/17 jun 2024/i);
      expect(june17).not.toBeDisabled();
    });

    it('should not call onChange for disabled dates', () => {
      const minDate = new Date(2024, 5, 10);
      render(<DatePicker minDate={minDate} onChange={mockOnChange} />);
      fireEvent.click(getTriggerButton());

      // Get button with text "5" that is disabled
      const dayButtons = screen
        .getAllByRole('button')
        .filter((btn) => btn.textContent === '5' && btn.hasAttribute('disabled'));
      expect(dayButtons.length).toBeGreaterThan(0);
      fireEvent.click(dayButtons[0]);

      expect(mockOnChange).not.toHaveBeenCalled();
    });
  });

  describe('Clear Functionality', () => {
    it('should show clear button when value is set', () => {
      const date = new Date(2024, 5, 20);
      render(<DatePicker value={date} clearable />);
      expect(screen.getByLabelText('Limpiar fecha')).toBeInTheDocument();
    });

    it('should not show clear button when clearable is false', () => {
      const date = new Date(2024, 5, 20);
      render(<DatePicker value={date} clearable={false} />);
      expect(screen.queryByLabelText('Limpiar fecha')).not.toBeInTheDocument();
    });

    it('should call onChange with null when cleared', () => {
      const date = new Date(2024, 5, 20);
      render(<DatePicker value={date} onChange={mockOnChange} clearable />);

      fireEvent.click(screen.getByLabelText('Limpiar fecha'));
      expect(mockOnChange).toHaveBeenCalledWith(null);
    });
  });

  describe('Inline Variant', () => {
    it('should render calendar inline', () => {
      render(<DatePicker variant="inline" />);
      // Calendar should be visible without clicking
      expect(screen.getByText('Junio 2024')).toBeInTheDocument();
    });

    it('should not close on date selection in inline mode', () => {
      render(<DatePicker variant="inline" onChange={mockOnChange} />);

      const june20 = screen.getByLabelText(/20 jun 2024/i);
      fireEvent.click(june20);

      // Calendar should still be visible
      expect(screen.getByText('Junio 2024')).toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should disable the trigger button', () => {
      render(<DatePicker disabled />);
      expect(getTriggerButton()).toBeDisabled();
    });

    it('should apply disabled styles', () => {
      render(<DatePicker disabled />);
      expect(getTriggerButton()).toHaveClass('cursor-not-allowed');
    });
  });

  describe('Accessibility', () => {
    it('should have aria-haspopup attribute', () => {
      render(<DatePicker />);
      expect(getTriggerButton()).toHaveAttribute('aria-haspopup', 'dialog');
    });

    it('should label calendar dialog', () => {
      render(<DatePicker />);
      fireEvent.click(getTriggerButton());
      expect(screen.getByRole('dialog')).toHaveAttribute('aria-label', 'Calendario');
    });

    it('should have accessible day buttons', () => {
      render(<DatePicker />);
      fireEvent.click(getTriggerButton());

      const june15 = screen.getByLabelText(/15 jun 2024/i);
      expect(june15).toHaveAttribute('aria-label');
    });
  });
});
