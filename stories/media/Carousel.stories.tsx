import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Carousel from '@/components/common/media/Carousel';

/**
 * Carousel is a generic carousel component for any content type.
 * Supports autoplay, loop, navigation controls, and indicators.
 */
const meta: Meta<typeof Carousel> = {
  title: 'Media/Carousel',
  component: Carousel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Generic carousel with render prop pattern for flexible item rendering. Supports autoplay, loop, and customizable controls.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    loop: {
      control: 'boolean',
      description: 'Enable infinite loop',
    },
    autoPlay: {
      control: 'boolean',
      description: 'Enable auto-play',
    },
    autoPlayInterval: {
      control: 'number',
      description: 'Auto-play interval in milliseconds',
    },
    showControls: {
      control: 'boolean',
      description: 'Show navigation arrows',
    },
    showIndicators: {
      control: 'boolean',
      description: 'Show dot indicators',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Carousel<string>>;

const sampleImages = [
  'https://picsum.photos/seed/1/600/400',
  'https://picsum.photos/seed/2/600/400',
  'https://picsum.photos/seed/3/600/400',
  'https://picsum.photos/seed/4/600/400',
];

// Default carousel
export const Default: Story = {
  args: {
    items: sampleImages,
    renderItem: (url: string) => <img src={url} alt="Slide" className="w-full h-64 object-cover" />,
    className: 'w-[500px]',
  },
};

// With loop enabled
export const WithLoop: Story = {
  args: {
    items: sampleImages,
    renderItem: (url: string) => <img src={url} alt="Slide" className="w-full h-64 object-cover" />,
    loop: true,
    className: 'w-[500px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with infinite loop enabled.',
      },
    },
  },
};

// Auto-play
export const AutoPlay: Story = {
  args: {
    items: sampleImages,
    renderItem: (url: string) => <img src={url} alt="Slide" className="w-full h-64 object-cover" />,
    autoPlay: true,
    autoPlayInterval: 2000,
    loop: true,
    className: 'w-[500px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with auto-play enabled (2 second interval).',
      },
    },
  },
};

// Without controls
export const NoControls: Story = {
  args: {
    items: sampleImages,
    renderItem: (url: string) => <img src={url} alt="Slide" className="w-full h-64 object-cover" />,
    showControls: false,
    className: 'w-[500px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel without navigation arrows.',
      },
    },
  },
};

// Without indicators
export const NoIndicators: Story = {
  args: {
    items: sampleImages,
    renderItem: (url: string) => <img src={url} alt="Slide" className="w-full h-64 object-cover" />,
    showIndicators: false,
    className: 'w-[500px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel without dot indicators.',
      },
    },
  },
};

// Minimal (no controls or indicators)
export const Minimal: Story = {
  args: {
    items: sampleImages,
    renderItem: (url: string) => <img src={url} alt="Slide" className="w-full h-64 object-cover" />,
    showControls: false,
    showIndicators: false,
    autoPlay: true,
    loop: true,
    autoPlayInterval: 3000,
    className: 'w-[500px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal carousel with only auto-play, no UI controls.',
      },
    },
  },
};

// Product cards
export const ProductCards: Story = {
  render: () => {
    const products = [
      { name: 'Alebrijes', price: '$450', image: 'https://picsum.photos/seed/a1/300/300' },
      { name: 'Talavera', price: '$320', image: 'https://picsum.photos/seed/a2/300/300' },
      { name: 'Textiles', price: '$580', image: 'https://picsum.photos/seed/a3/300/300' },
      { name: 'Barro Negro', price: '$290', image: 'https://picsum.photos/seed/a4/300/300' },
    ];
    return (
      <Carousel
        items={products}
        renderItem={(item) => (
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md m-2">
            <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white">{item.name}</h3>
              <p className="text-primary-600 font-bold">{item.price}</p>
            </div>
          </div>
        )}
        className="w-[320px]"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with custom product card rendering.',
      },
    },
  },
};

// Testimonials
export const Testimonials: Story = {
  render: () => {
    const testimonials = [
      {
        text: 'Excelente calidad artesanal. Los productos llegaron perfectos.',
        author: 'María G.',
      },
      { text: 'Increíble trabajo de los artesanos. Muy recomendado.', author: 'Carlos L.' },
      { text: 'Piezas únicas que no encuentras en ningún otro lugar.', author: 'Ana P.' },
    ];
    return (
      <Carousel
        items={testimonials}
        renderItem={(item) => (
          <div className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 text-center">
            <p className="text-lg text-gray-700 dark:text-gray-200 italic mb-4">
              &quot;{item.text}&quot;
            </p>
            <p className="text-primary-600 dark:text-primary-400 font-semibold">— {item.author}</p>
          </div>
        )}
        loop
        className="w-[500px]"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel for testimonials/quotes.',
      },
    },
  },
};

// Single item (no controls shown)
export const SingleItem: Story = {
  args: {
    items: ['https://picsum.photos/seed/single/600/400'],
    renderItem: (url: string) => (
      <img src={url} alt="Single item" className="w-full h-64 object-cover" />
    ),
    className: 'w-[500px]',
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel with single item (controls hidden automatically).',
      },
    },
  },
};

// Hero banner style
export const HeroBanner: Story = {
  render: () => {
    const banners = [
      {
        title: 'Artesanías Mexicanas',
        subtitle: 'Hechas a mano con amor',
        bg: 'from-primary-600 to-primary-800',
      },
      {
        title: 'Tradición y Cultura',
        subtitle: 'Preservando nuestras raíces',
        bg: 'from-secondary-600 to-secondary-800',
      },
      {
        title: 'Calidad Garantizada',
        subtitle: 'Productos únicos y auténticos',
        bg: 'from-accent-600 to-accent-800',
      },
    ];
    return (
      <Carousel
        items={banners}
        renderItem={(item) => (
          <div
            className={`bg-gradient-to-r ${item.bg} h-80 flex flex-col items-center justify-center text-white`}
          >
            <h2 className="text-3xl font-bold mb-2">{item.title}</h2>
            <p className="text-lg opacity-90">{item.subtitle}</p>
          </div>
        )}
        autoPlay
        loop
        autoPlayInterval={4000}
        className="w-full max-w-4xl"
      />
    );
  },
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Full-width hero banner carousel.',
      },
    },
  },
};
