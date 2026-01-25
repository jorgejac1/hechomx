import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import AdminBanner from '@/components/layout/header/AdminBanner';

/**
 * AdminBanner displays a purple notification banner at the top of the header
 * indicating the user is in administrator mode.
 */
const meta: Meta<typeof AdminBanner> = {
  title: 'Layout/AdminBanner',
  component: AdminBanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A banner component shown at the top of the header when a user is logged in as an administrator.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    message: {
      control: 'text',
      description: 'Custom message to display in the banner',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default admin banner
export const Default: Story = {
  args: {},
};

// Custom message
export const CustomMessage: Story = {
  args: {
    message: 'Panel de Administración Activo',
  },
};

// Warning message
export const WarningMessage: Story = {
  args: {
    message: 'Modo de Prueba - Los cambios no se guardarán',
  },
};

// In header context
export const InHeaderContext: Story = {
  render: () => (
    <div className="bg-white dark:bg-gray-950 shadow-md">
      <AdminBanner />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <span className="text-lg font-bold text-gray-900 dark:text-white">Papalote Market</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Header content...</span>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'AdminBanner shown at the top of a header component.',
      },
    },
  },
};
