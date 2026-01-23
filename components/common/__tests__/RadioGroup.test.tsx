import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RadioGroup from '../RadioGroup';
import { Package, Truck } from 'lucide-react';

describe('RadioGroup', () => {
  const defaultOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  describe('Rendering', () => {
    it('should render radio group with options', () => {
      render(<RadioGroup value="option1" onChange={() => {}} options={defaultOptions} />);
      expect(screen.getAllByRole('radio')).toHaveLength(3);
    });

    it('should render with label', () => {
      render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          label="Select an option"
        />
      );
      expect(screen.getByText('Select an option')).toBeInTheDocument();
    });

    it('should have radiogroup role', () => {
      render(<RadioGroup value="option1" onChange={() => {}} options={defaultOptions} />);
      expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    });

    it('should render all option labels', () => {
      render(<RadioGroup value="option1" onChange={() => {}} options={defaultOptions} />);
      expect(screen.getByText('Option 1')).toBeInTheDocument();
      expect(screen.getByText('Option 2')).toBeInTheDocument();
      expect(screen.getByText('Option 3')).toBeInTheDocument();
    });
  });

  describe('Selection', () => {
    it('should mark selected option as checked', () => {
      render(<RadioGroup value="option2" onChange={() => {}} options={defaultOptions} />);
      const radios = screen.getAllByRole('radio');
      expect(radios[0]).not.toBeChecked();
      expect(radios[1]).toBeChecked();
      expect(radios[2]).not.toBeChecked();
    });

    it('should call onChange when option is selected', () => {
      const handleChange = vi.fn();
      render(<RadioGroup value="option1" onChange={handleChange} options={defaultOptions} />);
      fireEvent.click(screen.getByText('Option 2'));
      expect(handleChange).toHaveBeenCalledWith('option2');
    });

    it('should call onChange with correct value', () => {
      const handleChange = vi.fn();
      render(<RadioGroup value="option1" onChange={handleChange} options={defaultOptions} />);
      fireEvent.click(screen.getByText('Option 3'));
      expect(handleChange).toHaveBeenCalledWith('option3');
    });
  });

  describe('Disabled State', () => {
    it('should disable all options when group is disabled', () => {
      render(<RadioGroup value="option1" onChange={() => {}} options={defaultOptions} disabled />);
      screen.getAllByRole('radio').forEach((radio) => {
        expect(radio).toBeDisabled();
      });
    });

    it('should disable individual options', () => {
      const optionsWithDisabled = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true },
        { value: 'option3', label: 'Option 3' },
      ];
      render(<RadioGroup value="option1" onChange={() => {}} options={optionsWithDisabled} />);
      const radios = screen.getAllByRole('radio');
      expect(radios[0]).not.toBeDisabled();
      expect(radios[1]).toBeDisabled();
      expect(radios[2]).not.toBeDisabled();
    });

    it('should not call onChange when disabled option is clicked', () => {
      const handleChange = vi.fn();
      const optionsWithDisabled = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2', disabled: true },
      ];
      render(<RadioGroup value="option1" onChange={handleChange} options={optionsWithDisabled} />);
      fireEvent.click(screen.getByText('Option 2'));
      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('Descriptions', () => {
    it('should render option descriptions', () => {
      const optionsWithDescriptions = [
        { value: 'option1', label: 'Option 1', description: 'Description for option 1' },
        { value: 'option2', label: 'Option 2', description: 'Description for option 2' },
      ];
      render(<RadioGroup value="option1" onChange={() => {}} options={optionsWithDescriptions} />);
      expect(screen.getByText('Description for option 1')).toBeInTheDocument();
      expect(screen.getByText('Description for option 2')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should apply sm size', () => {
      render(<RadioGroup value="option1" onChange={() => {}} options={defaultOptions} size="sm" />);
      screen.getAllByRole('radio').forEach((radio) => {
        expect(radio).toHaveClass('w-4', 'h-4');
      });
    });

    it('should apply md size by default', () => {
      render(<RadioGroup value="option1" onChange={() => {}} options={defaultOptions} />);
      screen.getAllByRole('radio').forEach((radio) => {
        expect(radio).toHaveClass('w-5', 'h-5');
      });
    });

    it('should apply lg size', () => {
      render(<RadioGroup value="option1" onChange={() => {}} options={defaultOptions} size="lg" />);
      screen.getAllByRole('radio').forEach((radio) => {
        expect(radio).toHaveClass('w-6', 'h-6');
      });
    });
  });

  describe('Orientation', () => {
    it('should use vertical orientation by default', () => {
      const { container } = render(
        <RadioGroup value="option1" onChange={() => {}} options={defaultOptions} />
      );
      const optionsContainer = container.querySelector('.flex-col');
      expect(optionsContainer).toBeInTheDocument();
    });

    it('should use horizontal orientation when specified', () => {
      const { container } = render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          orientation="horizontal"
        />
      );
      const optionsContainer = container.querySelector('.flex-wrap');
      expect(optionsContainer).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should display error message', () => {
      render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          error="Please select an option"
        />
      );
      expect(screen.getByRole('alert')).toHaveTextContent('Please select an option');
    });
  });

  describe('Hint Text', () => {
    it('should display hint text', () => {
      render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          hint="Choose your preferred option"
        />
      );
      expect(screen.getByText('Choose your preferred option')).toBeInTheDocument();
    });

    it('should not display hint when error is present', () => {
      render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          hint="Hint"
          error="Error"
        />
      );
      expect(screen.queryByText('Hint')).not.toBeInTheDocument();
    });
  });

  describe('Cards Variant', () => {
    it('should render card-style options', () => {
      const { container } = render(
        <RadioGroup value="option1" onChange={() => {}} options={defaultOptions} variant="cards" />
      );
      // Cards variant has sr-only class on inputs
      const inputs = container.querySelectorAll('input.sr-only');
      expect(inputs).toHaveLength(3);
    });

    it('should show selected card with primary border', () => {
      const { container } = render(
        <RadioGroup value="option1" onChange={() => {}} options={defaultOptions} variant="cards" />
      );
      const labels = container.querySelectorAll('label');
      expect(labels[0]).toHaveClass('border-primary-500', 'bg-primary-50');
    });

    it('should render icons in cards variant', () => {
      const optionsWithIcons = [
        { value: 'standard', label: 'Standard', icon: <Package data-testid="icon-package" /> },
        { value: 'express', label: 'Express', icon: <Truck data-testid="icon-truck" /> },
      ];
      render(
        <RadioGroup
          value="standard"
          onChange={() => {}}
          options={optionsWithIcons}
          variant="cards"
        />
      );
      expect(screen.getByTestId('icon-package')).toBeInTheDocument();
      expect(screen.getByTestId('icon-truck')).toBeInTheDocument();
    });
  });

  describe('Buttons Variant', () => {
    it('should render button-style options', () => {
      const { container } = render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          variant="buttons"
        />
      );
      const labels = container.querySelectorAll('label');
      expect(labels).toHaveLength(3);
      // Selected button should have primary bg
      expect(labels[0]).toHaveClass('bg-primary-600', 'text-white');
    });

    it('should style unselected buttons correctly', () => {
      const { container } = render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          variant="buttons"
        />
      );
      const labels = container.querySelectorAll('label');
      // Unselected buttons should have white bg
      expect(labels[1]).toHaveClass('bg-white', 'text-gray-700');
    });
  });

  describe('Custom Children', () => {
    it('should render custom children instead of options', () => {
      render(
        <RadioGroup value="custom1" onChange={() => {}}>
          <RadioGroup.Option value="custom1">Custom Option 1</RadioGroup.Option>
          <RadioGroup.Option value="custom2">Custom Option 2</RadioGroup.Option>
        </RadioGroup>
      );
      expect(screen.getByText('Custom Option 1')).toBeInTheDocument();
      expect(screen.getByText('Custom Option 2')).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('should apply custom className to container', () => {
      const { container } = render(
        <RadioGroup
          value="option1"
          onChange={() => {}}
          options={defaultOptions}
          className="custom-class"
        />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Name Attribute', () => {
    it('should apply custom name to all radios', () => {
      render(
        <RadioGroup value="option1" onChange={() => {}} options={defaultOptions} name="my-group" />
      );
      screen.getAllByRole('radio').forEach((radio) => {
        expect(radio).toHaveAttribute('name', 'my-group');
      });
    });

    it('should generate name when not provided', () => {
      render(<RadioGroup value="option1" onChange={() => {}} options={defaultOptions} />);
      const radios = screen.getAllByRole('radio');
      const name = radios[0].getAttribute('name');
      expect(name).toBeTruthy();
      radios.forEach((radio) => {
        expect(radio).toHaveAttribute('name', name);
      });
    });
  });

  describe('Error Handling', () => {
    it('should throw error when RadioGroup.Option is used outside RadioGroup', () => {
      // Suppress console.error for this test since we expect an error
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<RadioGroup.Option value="test">Test</RadioGroup.Option>);
      }).toThrow('RadioGroup.Option must be used within RadioGroup');

      consoleSpy.mockRestore();
    });
  });
});
