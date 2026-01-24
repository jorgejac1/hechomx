import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import SizeSelector from '@/components/product/SizeSelector';

/**
 * SizeSelector component for products with size options.
 * Displays available sizes as selectable buttons with a size guide modal.
 */
const meta: Meta<typeof SizeSelector> = {
  title: 'Product/SizeSelector',
  component: SizeSelector,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'A size selector component for clothing, shoes, and rings. Includes an interactive size guide and validation state.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    sizeType: {
      control: 'select',
      options: ['clothing', 'shoes', 'rings', 'one_size'],
      description: 'Type of sizing system',
    },
    selectedSize: {
      control: 'text',
      description: 'Currently selected size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable size selection',
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-md p-4 bg-white rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive wrapper
const SizeSelectorDemo = (
  props: Omit<React.ComponentProps<typeof SizeSelector>, 'onSizeSelect' | 'selectedSize'> & {
    initialSize?: string | null;
  }
) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(props.initialSize || null);
  return <SizeSelector {...props} selectedSize={selectedSize} onSizeSelect={setSelectedSize} />;
};

// Clothing sizes
export const ClothingSizes: Story = {
  render: () => (
    <SizeSelectorDemo availableSizes={['XCH', 'CH', 'M', 'G', 'XG', 'XXG']} sizeType="clothing" />
  ),
};

// With selected size
export const WithSelectedSize: Story = {
  render: () => (
    <SizeSelectorDemo
      availableSizes={['XCH', 'CH', 'M', 'G', 'XG', 'XXG']}
      sizeType="clothing"
      initialSize="M"
    />
  ),
};

// Shoe sizes (Mexican)
export const ShoeSizes: Story = {
  render: () => (
    <SizeSelectorDemo
      availableSizes={['22', '23', '24', '25', '26', '27', '28', '29', '30']}
      sizeType="shoes"
    />
  ),
};

// Ring sizes
export const RingSizes: Story = {
  render: () => (
    <SizeSelectorDemo availableSizes={['5', '6', '7', '8', '9', '10']} sizeType="rings" />
  ),
};

// One size fits all
export const OneSize: Story = {
  render: () => <SizeSelectorDemo availableSizes={['Única']} sizeType="one_size" />,
};

// Disabled state
export const Disabled: Story = {
  args: {
    availableSizes: ['CH', 'M', 'G'],
    sizeType: 'clothing',
    selectedSize: 'M',
    onSizeSelect: () => {},
    disabled: true,
  },
};

// Limited sizes (only a few options)
export const LimitedSizes: Story = {
  render: () => <SizeSelectorDemo availableSizes={['CH', 'G']} sizeType="clothing" />,
};

// Many sizes
export const ManySizes: Story = {
  render: () => (
    <SizeSelectorDemo
      availableSizes={['20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31']}
      sizeType="shoes"
    />
  ),
};

// All size types comparison
export const AllSizeTypes: Story = {
  decorators: [
    (Story) => (
      <div className="space-y-8 p-4 bg-white rounded-lg max-w-lg">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <>
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Ropa / Clothing</h3>
        <SizeSelectorDemo availableSizes={['XCH', 'CH', 'M', 'G', 'XG']} sizeType="clothing" />
      </div>
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Zapatos / Shoes</h3>
        <SizeSelectorDemo availableSizes={['24', '25', '26', '27', '28']} sizeType="shoes" />
      </div>
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Anillos / Rings</h3>
        <SizeSelectorDemo availableSizes={['6', '7', '8', '9']} sizeType="rings" />
      </div>
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Talla Única / One Size</h3>
        <SizeSelectorDemo availableSizes={['Única']} sizeType="one_size" />
      </div>
    </>
  ),
};

// Real product example - Huipil
export const HuipilExample: Story = {
  decorators: [
    (Story) => (
      <div className="p-4 bg-white rounded-lg max-w-md border">
        <h2 className="font-bold text-lg text-gray-900 mb-1">Huipil Bordado a Mano</h2>
        <p className="text-sm text-gray-500 mb-4">Selecciona tu talla</p>
        <Story />
      </div>
    ),
  ],
  render: () => <SizeSelectorDemo availableSizes={['CH', 'M', 'G', 'XG']} sizeType="clothing" />,
};

// Real product example - Huaraches
export const HuarachesExample: Story = {
  decorators: [
    (Story) => (
      <div className="p-4 bg-white rounded-lg max-w-md border">
        <h2 className="font-bold text-lg text-gray-900 mb-1">Huaraches de Cuero</h2>
        <p className="text-sm text-gray-500 mb-4">Selecciona tu talla</p>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <SizeSelectorDemo
      availableSizes={['22', '23', '24', '25', '26', '27', '28']}
      sizeType="shoes"
    />
  ),
};

// Real product example - Silver ring
export const SilverRingExample: Story = {
  decorators: [
    (Story) => (
      <div className="p-4 bg-white rounded-lg max-w-md border">
        <h2 className="font-bold text-lg text-gray-900 mb-1">Anillo de Plata Oaxaqueña</h2>
        <p className="text-sm text-gray-500 mb-4">Selecciona tu talla</p>
        <Story />
      </div>
    ),
  ],
  render: () => <SizeSelectorDemo availableSizes={['5', '6', '7', '8', '9']} sizeType="rings" />,
};
