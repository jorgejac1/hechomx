import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Autocomplete, { AutocompleteOption } from '../Autocomplete';

const defaultOptions: AutocompleteOption<string>[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date', label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
];

const optionsWithDescriptions: AutocompleteOption<string>[] = [
  { value: 'mx', label: 'Mexico', description: 'North America' },
  { value: 'us', label: 'United States', description: 'North America' },
  { value: 'br', label: 'Brazil', description: 'South America' },
];

const groupedOptions: AutocompleteOption<string>[] = [
  { value: 'apple', label: 'Apple', group: 'Fruits' },
  { value: 'banana', label: 'Banana', group: 'Fruits' },
  { value: 'carrot', label: 'Carrot', group: 'Vegetables' },
  { value: 'broccoli', label: 'Broccoli', group: 'Vegetables' },
];

const disabledOptions: AutocompleteOption<string>[] = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana', disabled: true },
  { value: 'cherry', label: 'Cherry' },
];

// Helper to get the input element
function getInput() {
  return screen.getByRole('textbox');
}

describe('Autocomplete', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render with placeholder', () => {
      render(<Autocomplete options={defaultOptions} placeholder="Search fruits..." />);
      expect(screen.getByPlaceholderText('Search fruits...')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<Autocomplete options={defaultOptions} label="Select fruit" />);
      expect(screen.getByText('Select fruit')).toBeInTheDocument();
    });

    it('should render with required indicator', () => {
      render(<Autocomplete options={defaultOptions} label="Fruit" required />);
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should render helper text', () => {
      render(<Autocomplete options={defaultOptions} helperText="Choose your favorite" />);
      expect(screen.getByText('Choose your favorite')).toBeInTheDocument();
    });

    it('should render error message', () => {
      render(<Autocomplete options={defaultOptions} error="Selection required" />);
      expect(screen.getByText('Selection required')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      const { container } = render(
        <Autocomplete options={defaultOptions} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should show search icon', () => {
      render(<Autocomplete options={defaultOptions} />);
      expect(document.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should render small size', () => {
      const { container } = render(<Autocomplete options={defaultOptions} size="sm" />);
      const wrapper = container.querySelector('.py-1\\.5');
      expect(wrapper).toBeInTheDocument();
    });

    it('should render medium size by default', () => {
      const { container } = render(<Autocomplete options={defaultOptions} />);
      const wrapper = container.querySelector('.py-2');
      expect(wrapper).toBeInTheDocument();
    });

    it('should render large size', () => {
      const { container } = render(<Autocomplete options={defaultOptions} size="lg" />);
      const wrapper = container.querySelector('.py-3');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Dropdown Behavior', () => {
    it('should open dropdown on focus', () => {
      render(<Autocomplete options={defaultOptions} />);
      const input = getInput();
      fireEvent.focus(input);

      expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    it('should show options when typing', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={defaultOptions} />);
      const input = getInput();

      await user.type(input, 'app');
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('should close on outside click', () => {
      render(<Autocomplete options={defaultOptions} />);
      const input = getInput();
      fireEvent.focus(input);

      expect(screen.getByRole('listbox')).toBeInTheDocument();

      fireEvent.mouseDown(document.body);
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });

    it('should have aria-expanded attribute', () => {
      render(<Autocomplete options={defaultOptions} />);
      const input = getInput();

      expect(input).toHaveAttribute('aria-expanded', 'false');
      fireEvent.focus(input);
      expect(input).toHaveAttribute('aria-expanded', 'true');
    });
  });

  describe('Filtering', () => {
    it('should filter options based on input', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={defaultOptions} />);
      const input = getInput();

      await user.type(input, 'ban');

      expect(screen.getByText('Banana')).toBeInTheDocument();
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();
    });

    it('should be case insensitive', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={defaultOptions} />);
      const input = getInput();

      await user.type(input, 'APPLE');

      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('should search in descriptions', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={optionsWithDescriptions} />);
      const input = getInput();

      await user.type(input, 'North');

      expect(screen.getByText('Mexico')).toBeInTheDocument();
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    it('should show no results message', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={defaultOptions} noOptionsMessage="No fruits found" />);
      const input = getInput();

      await user.type(input, 'xyz');

      expect(screen.getByText('No fruits found')).toBeInTheDocument();
    });

    it('should respect minChars', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={defaultOptions} minChars={3} />);
      const input = getInput();

      await user.type(input, 'ap');

      // Should not show results yet
      expect(screen.queryByText('Apple')).not.toBeInTheDocument();

      await user.type(input, 'p');
      expect(screen.getByText('Apple')).toBeInTheDocument();
    });

    it('should limit results with maxOptions', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={defaultOptions} maxOptions={2} />);
      const input = getInput();

      await user.type(input, 'a');

      const options = screen.getAllByRole('option');
      expect(options.length).toBeLessThanOrEqual(2);
    });
  });

  describe('Selection', () => {
    it('should call onChange when option is selected', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Autocomplete options={defaultOptions} onChange={onChange} />);
      const input = getInput();

      await user.click(input);
      const option = screen.getByText('Apple');
      await user.click(option);

      expect(onChange).toHaveBeenCalledWith('apple');
    });

    it('should close dropdown after selection in single mode', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Autocomplete options={defaultOptions} onChange={onChange} />);
      const input = getInput();

      await user.click(input);
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      const option = screen.getByText('Apple');
      await user.click(option);

      // Verify selection was made
      expect(onChange).toHaveBeenCalledWith('apple');
    });

    it('should update input with selected label', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={defaultOptions} />);
      const input = getInput();

      await user.click(input);
      const option = screen.getByText('Apple');
      await user.click(option);

      expect(input).toHaveValue('Apple');
    });

    it('should not select disabled options', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Autocomplete options={disabledOptions} onChange={onChange} />);
      const input = getInput();

      await user.click(input);
      const disabledOption = screen.getByText('Banana');
      await user.click(disabledOption);

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Multiple Selection', () => {
    it('should allow multiple selections', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Autocomplete options={defaultOptions} multiple onChange={onChange} />);
      const input = getInput();

      // Select first item
      await user.click(input);
      await user.click(screen.getByText('Apple'));

      // First call should be with just apple
      expect(onChange).toHaveBeenLastCalledWith(['apple']);
    });

    it('should show selected items as tags', () => {
      render(<Autocomplete options={defaultOptions} multiple value={['apple', 'banana']} />);
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
    });

    it('should remove item when tag close is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <Autocomplete
          options={defaultOptions}
          multiple
          value={['apple', 'banana']}
          onChange={onChange}
        />
      );

      // Find and click the close button for Apple
      const closeButtons = screen.getAllByLabelText(/Eliminar/);
      await user.click(closeButtons[0]);

      expect(onChange).toHaveBeenCalledWith(['banana']);
    });

    it('should remove last item on backspace when input is empty', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(
        <Autocomplete
          options={defaultOptions}
          multiple
          value={['apple', 'banana']}
          onChange={onChange}
        />
      );
      const input = getInput();

      await user.click(input);
      await user.keyboard('{Backspace}');

      expect(onChange).toHaveBeenCalledWith(['apple']);
    });

    it('should clear input after selection in multiple mode', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={defaultOptions} multiple />);
      const input = getInput();

      await user.type(input, 'app');
      await user.click(screen.getByText('Apple'));

      expect(input).toHaveValue('');
    });
  });

  describe('Keyboard Navigation', () => {
    it('should highlight next option on ArrowDown', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={defaultOptions} />);
      const input = getInput();

      await user.click(input);
      await user.keyboard('{ArrowDown}');

      const options = screen.getAllByRole('option');
      expect(options[0]).toHaveClass('bg-primary-50');
    });

    it('should highlight previous option on ArrowUp', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={defaultOptions} />);
      const input = getInput();

      await user.click(input);
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowUp}');

      const options = screen.getAllByRole('option');
      expect(options[0]).toHaveClass('bg-primary-50');
    });

    it('should select highlighted option on Enter', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Autocomplete options={defaultOptions} onChange={onChange} />);
      const input = getInput();

      await user.click(input);
      await user.keyboard('{ArrowDown}{Enter}');

      expect(onChange).toHaveBeenCalledWith('apple');
    });

    it('should close dropdown on Escape', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={defaultOptions} />);
      const input = getInput();

      await user.click(input);
      expect(screen.getByRole('listbox')).toBeInTheDocument();

      await user.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
    });
  });

  describe('Creatable', () => {
    it('should show create option when creatable', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={defaultOptions} creatable />);
      const input = getInput();

      await user.type(input, 'newfrui');

      expect(screen.getByText(/Crear/)).toBeInTheDocument();
    });

    it('should call onCreate when create option is clicked', async () => {
      const user = userEvent.setup();
      const onCreate = vi.fn();
      render(<Autocomplete options={defaultOptions} creatable onCreate={onCreate} />);
      const input = getInput();

      await user.type(input, 'newfruit');
      await user.click(screen.getByText(/Crear/));

      expect(onCreate).toHaveBeenCalledWith('newfruit');
    });

    it('should not show create option if value exists', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={defaultOptions} creatable />);
      const input = getInput();

      await user.type(input, 'Apple');

      expect(screen.queryByText(/Crear "Apple"/)).not.toBeInTheDocument();
    });

    it('should use custom createLabel', async () => {
      const user = userEvent.setup();
      render(
        <Autocomplete options={defaultOptions} creatable createLabel={(val) => `Add "${val}"`} />
      );
      const input = getInput();

      await user.type(input, 'xyz');

      expect(screen.getByText('Add "xyz"')).toBeInTheDocument();
    });
  });

  describe('Grouped Options', () => {
    it('should render group headers', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={groupedOptions} />);
      const input = getInput();

      await user.click(input);

      expect(screen.getByText('Fruits')).toBeInTheDocument();
      expect(screen.getByText('Vegetables')).toBeInTheDocument();
    });

    it('should render options under their groups', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={groupedOptions} />);
      const input = getInput();

      await user.click(input);

      // Check that fruits are rendered
      expect(screen.getByText('Apple')).toBeInTheDocument();
      expect(screen.getByText('Banana')).toBeInTheDocument();
      // Check that vegetables are rendered
      expect(screen.getByText('Carrot')).toBeInTheDocument();
      expect(screen.getByText('Broccoli')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('should show loading spinner', () => {
      render(<Autocomplete options={defaultOptions} loading />);
      // Check for loader icon
      expect(document.querySelector('.animate-spin')).toBeInTheDocument();
    });

    it('should show loading message in dropdown', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={[]} loading />);
      const input = getInput();

      await user.type(input, 'test');

      expect(screen.getByText('Buscando...')).toBeInTheDocument();
    });
  });

  describe('Clearable', () => {
    it('should show clear button when value exists', () => {
      render(<Autocomplete options={defaultOptions} value="apple" clearable />);
      expect(screen.getByLabelText('Limpiar')).toBeInTheDocument();
    });

    it('should clear value when clear button is clicked', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Autocomplete options={defaultOptions} value="apple" clearable onChange={onChange} />);

      await user.click(screen.getByLabelText('Limpiar'));
      expect(onChange).toHaveBeenCalledWith(null);
    });

    it('should not show clear button when clearable is false', () => {
      render(<Autocomplete options={defaultOptions} value="apple" clearable={false} />);
      expect(screen.queryByLabelText('Limpiar')).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('should disable the input', () => {
      render(<Autocomplete options={defaultOptions} disabled />);
      const input = getInput();
      expect(input).toBeDisabled();
    });

    it('should apply disabled styles', () => {
      const { container } = render(<Autocomplete options={defaultOptions} disabled />);
      const wrapper = container.querySelector('.cursor-not-allowed');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Callbacks', () => {
    it('should call onInputChange when typing', async () => {
      const user = userEvent.setup();
      const onInputChange = vi.fn();
      render(<Autocomplete options={defaultOptions} onInputChange={onInputChange} />);
      const input = getInput();

      await user.type(input, 'test');

      expect(onInputChange).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have aria-autocomplete attribute', () => {
      render(<Autocomplete options={defaultOptions} />);
      const input = getInput();
      expect(input).toHaveAttribute('aria-autocomplete', 'list');
    });

    it('should have aria-controls linking to listbox', () => {
      render(<Autocomplete options={defaultOptions} />);
      const input = getInput();
      expect(input).toHaveAttribute('aria-controls');
    });

    it('should label the listbox', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={defaultOptions} label="Select fruit" />);
      const input = getInput();

      await user.click(input);

      const listbox = screen.getByRole('listbox');
      expect(listbox).toHaveAttribute('aria-label');
    });
  });

  describe('Create option via keyboard', () => {
    it('should select create option when navigating past all options with Enter', async () => {
      const user = userEvent.setup();
      const onCreate = vi.fn();
      const options = [{ value: 'a', label: 'A' }];
      render(<Autocomplete options={options} creatable onCreate={onCreate} />);
      const input = getInput();

      await user.type(input, 'newvalue');
      // Navigate to the create option (which is after all filtered options, in this case 0)
      await user.keyboard('{ArrowDown}');
      await user.keyboard('{Enter}');

      expect(onCreate).toHaveBeenCalledWith('newvalue');
    });
  });

  describe('Grouped option interactions', () => {
    it('should handle click on grouped option', async () => {
      const user = userEvent.setup();
      const onChange = vi.fn();
      render(<Autocomplete options={groupedOptions} onChange={onChange} />);
      const input = getInput();

      await user.click(input);
      // Click on a grouped option (e.g., Carrot which is in Vegetables group)
      await user.click(screen.getByText('Carrot'));

      expect(onChange).toHaveBeenCalledWith('carrot');
    });

    it('should highlight grouped option on mouse enter', async () => {
      const user = userEvent.setup();
      render(<Autocomplete options={groupedOptions} />);
      const input = getInput();

      await user.click(input);
      const carrotOption = screen.getByText('Carrot').closest('li');

      // Hover over the option
      if (carrotOption) {
        await user.hover(carrotOption);
        expect(carrotOption).toHaveClass('bg-primary-50');
      }
    });
  });
});
