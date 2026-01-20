import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Select from '../Select';

describe('Select', () => {
  const basicOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  describe('rendering', () => {
    it('should render a select element', () => {
      render(<Select options={basicOptions} />);
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<Select label="Category" options={basicOptions} />);
      expect(screen.getByText('Category')).toBeInTheDocument();
    });

    it('should render with required indicator', () => {
      render(<Select label="Category" required options={basicOptions} />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should render with placeholder', () => {
      render(<Select placeholder="Select an option" options={basicOptions} defaultValue="" />);
      expect(screen.getByRole('option', { name: 'Select an option' })).toBeInTheDocument();
    });

    it('should render with hint text', () => {
      render(<Select hint="Select your preferred category" options={basicOptions} />);
      expect(screen.getByText('Select your preferred category')).toBeInTheDocument();
    });

    it('should render with error message', () => {
      render(<Select error="This field is required" options={basicOptions} />);
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('should not show hint when error is present', () => {
      render(<Select hint="Hint text" error="Error text" options={basicOptions} />);
      expect(screen.queryByText('Hint text')).not.toBeInTheDocument();
      expect(screen.getByText('Error text')).toBeInTheDocument();
    });

    it('should render with left icon', () => {
      render(
        <Select leftIcon={<span data-testid="left-icon">Icon</span>} options={basicOptions} />
      );
      expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('should render all options', () => {
      render(<Select options={basicOptions} />);
      basicOptions.forEach((option) => {
        expect(screen.getByRole('option', { name: option.label })).toBeInTheDocument();
      });
    });

    it('should render option groups', () => {
      const groupedOptions = [
        {
          label: 'Group 1',
          options: [
            { value: 'a', label: 'A' },
            { value: 'b', label: 'B' },
          ],
        },
        {
          label: 'Group 2',
          options: [
            { value: 'c', label: 'C' },
            { value: 'd', label: 'D' },
          ],
        },
      ];
      render(<Select options={groupedOptions} />);
      expect(screen.getByRole('group', { name: 'Group 1' })).toBeInTheDocument();
      expect(screen.getByRole('group', { name: 'Group 2' })).toBeInTheDocument();
    });

    it('should render disabled options', () => {
      const optionsWithDisabled = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true },
      ];
      render(<Select options={optionsWithDisabled} />);
      expect(screen.getByRole('option', { name: 'Option 2' })).toBeDisabled();
    });

    it('should render children instead of options', () => {
      render(
        <Select>
          <option value="child1">Child 1</option>
          <option value="child2">Child 2</option>
        </Select>
      );
      expect(screen.getByRole('option', { name: 'Child 1' })).toBeInTheDocument();
    });
  });

  describe('sizes', () => {
    it('should apply small size styles', () => {
      render(<Select size="sm" options={basicOptions} data-testid="select" />);
      const select = screen.getByTestId('select');
      expect(select.className).toContain('px-3');
      expect(select.className).toContain('py-2');
      expect(select.className).toContain('text-sm');
    });

    it('should apply medium size styles by default', () => {
      render(<Select options={basicOptions} data-testid="select" />);
      const select = screen.getByTestId('select');
      expect(select.className).toContain('px-4');
      expect(select.className).toContain('py-3');
      expect(select.className).toContain('text-base');
    });

    it('should apply large size styles', () => {
      render(<Select size="lg" options={basicOptions} data-testid="select" />);
      const select = screen.getByTestId('select');
      expect(select.className).toContain('px-5');
      expect(select.className).toContain('py-4');
      expect(select.className).toContain('text-lg');
    });
  });

  describe('states', () => {
    it('should apply error styles when error is present', () => {
      render(<Select error="Error" options={basicOptions} data-testid="select" />);
      const select = screen.getByTestId('select');
      expect(select.className).toContain('border-red-500');
      expect(select).toHaveAttribute('aria-invalid', 'true');
    });

    it('should apply disabled styles when disabled', () => {
      render(<Select disabled options={basicOptions} data-testid="select" />);
      const select = screen.getByTestId('select');
      expect(select).toBeDisabled();
      expect(select.className).toContain('disabled:bg-gray-100');
    });

    it('should have aria-describedby for error', () => {
      render(<Select id="test-select" error="Error message" options={basicOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-describedby', 'test-select-error');
    });

    it('should have aria-describedby for hint', () => {
      render(<Select id="test-select" hint="Hint message" options={basicOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-describedby', 'test-select-hint');
    });

    it('should have aria-required when required', () => {
      render(<Select required options={basicOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).toHaveAttribute('aria-required', 'true');
    });

    it('should not have aria-required when not required', () => {
      render(<Select options={basicOptions} />);
      const select = screen.getByRole('combobox');
      expect(select).not.toHaveAttribute('aria-required');
    });
  });

  describe('interaction', () => {
    it('should call onChange when value changes', () => {
      const handleChange = vi.fn();
      render(<Select onChange={handleChange} options={basicOptions} />);
      const select = screen.getByRole('combobox');
      fireEvent.change(select, { target: { value: 'option2' } });
      expect(handleChange).toHaveBeenCalled();
    });

    it('should accept value prop', () => {
      render(<Select value="option2" onChange={() => {}} options={basicOptions} />);
      expect(screen.getByRole('combobox')).toHaveValue('option2');
    });
  });

  describe('width', () => {
    it('should be full width by default', () => {
      render(<Select options={basicOptions} data-testid="select" />);
      const select = screen.getByTestId('select');
      expect(select.className).toContain('w-full');
    });

    it('should not be full width when fullWidth is false', () => {
      render(<Select fullWidth={false} options={basicOptions} data-testid="select" />);
      const select = screen.getByTestId('select');
      expect(select.className).not.toContain('w-full');
    });
  });

  describe('custom className', () => {
    it('should apply custom className', () => {
      render(<Select className="custom-class" options={basicOptions} data-testid="select" />);
      const select = screen.getByTestId('select');
      expect(select.className).toContain('custom-class');
    });
  });
});
