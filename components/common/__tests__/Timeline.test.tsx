import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Timeline, { TimelineItem } from '../Timeline';
import { Star } from 'lucide-react';

const basicItems: TimelineItem[] = [
  { id: '1', title: 'Step 1', description: 'First step' },
  { id: '2', title: 'Step 2', description: 'Second step' },
  { id: '3', title: 'Step 3', description: 'Third step' },
];

const itemsWithTimestamps: TimelineItem[] = [
  { id: '1', title: 'Order placed', timestamp: '10:30 AM' },
  { id: '2', title: 'Processing', timestamp: '11:00 AM' },
  { id: '3', title: 'Shipped', timestamp: '2:00 PM' },
];

const itemsWithStatus: TimelineItem[] = [
  { id: '1', title: 'Completed', status: 'completed' },
  { id: '2', title: 'Current', status: 'current' },
  { id: '3', title: 'Pending', status: 'pending' },
];

describe('Timeline', () => {
  describe('Rendering', () => {
    it('should render list role', () => {
      render(<Timeline items={basicItems} />);
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should render all items', () => {
      render(<Timeline items={basicItems} />);
      expect(screen.getByText('Step 1')).toBeInTheDocument();
      expect(screen.getByText('Step 2')).toBeInTheDocument();
      expect(screen.getByText('Step 3')).toBeInTheDocument();
    });

    it('should render descriptions', () => {
      render(<Timeline items={basicItems} />);
      expect(screen.getByText('First step')).toBeInTheDocument();
      expect(screen.getByText('Second step')).toBeInTheDocument();
    });

    it('should render timestamps', () => {
      render(<Timeline items={itemsWithTimestamps} />);
      expect(screen.getByText('10:30 AM')).toBeInTheDocument();
      expect(screen.getByText('11:00 AM')).toBeInTheDocument();
    });

    it('should render nothing when items is empty', () => {
      const { container } = render(<Timeline items={[]} />);
      expect(container.querySelector('[role="list"]')).not.toBeInTheDocument();
    });

    it('should have aria-label', () => {
      render(<Timeline items={basicItems} />);
      expect(screen.getByRole('list')).toHaveAttribute('aria-label', 'Timeline');
    });
  });

  describe('List Items', () => {
    it('should render list items', () => {
      render(<Timeline items={basicItems} />);
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(3);
    });
  });

  describe('Status', () => {
    it('should render completed status with check icon', () => {
      const { container } = render(<Timeline items={itemsWithStatus} />);
      // Completed items have bg-green-500 class
      expect(container.querySelector('.bg-green-500')).toBeInTheDocument();
    });

    it('should render current status with ring', () => {
      const { container } = render(<Timeline items={itemsWithStatus} />);
      expect(container.querySelector('.ring-4')).toBeInTheDocument();
    });

    it('should render pending status with gray background', () => {
      const { container } = render(<Timeline items={itemsWithStatus} />);
      expect(container.querySelector('.bg-gray-200')).toBeInTheDocument();
    });

    it('should render error status', () => {
      const items: TimelineItem[] = [{ id: '1', title: 'Error', status: 'error' }];
      const { container } = render(<Timeline items={items} />);
      expect(container.querySelector('.bg-red-500')).toBeInTheDocument();
    });
  });

  describe('Icons', () => {
    it('should render custom icon', () => {
      const items: TimelineItem[] = [{ id: '1', title: 'Starred', icon: Star }];
      const { container } = render(<Timeline items={items} />);
      expect(container.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Custom Color', () => {
    it('should apply custom color to dot', () => {
      const items: TimelineItem[] = [{ id: '1', title: 'Custom', color: '#ff0000' }];
      const { container } = render(<Timeline items={items} />);
      const dot = container.querySelector('[style]');
      expect(dot).toHaveStyle({ backgroundColor: '#ff0000' });
    });
  });

  describe('Variants', () => {
    it('should render default (left) variant', () => {
      const { container } = render(<Timeline items={basicItems} variant="default" />);
      // Default layout doesn't have text-right
      expect(container.querySelector('.text-right')).not.toBeInTheDocument();
    });

    it('should render right variant', () => {
      const { container } = render(<Timeline items={basicItems} variant="right" />);
      expect(container.querySelector('.text-right')).toBeInTheDocument();
    });

    it('should render alternate variant', () => {
      const { container } = render(<Timeline items={basicItems} variant="alternate" />);
      // Alternate has spacers
      const spacers = container.querySelectorAll('.flex-1');
      expect(spacers.length).toBeGreaterThan(0);
    });
  });

  describe('Sizes', () => {
    it('should render small size', () => {
      const { container } = render(<Timeline items={basicItems} size="sm" />);
      expect(container.querySelector('.text-sm')).toBeInTheDocument();
    });

    it('should render medium size by default', () => {
      const { container } = render(<Timeline items={basicItems} />);
      expect(container.querySelector('.text-base')).toBeInTheDocument();
    });

    it('should render large size', () => {
      const { container } = render(<Timeline items={basicItems} size="lg" />);
      expect(container.querySelector('.text-lg')).toBeInTheDocument();
    });
  });

  describe('Connector', () => {
    it('should show connector by default', () => {
      const { container } = render(<Timeline items={basicItems} />);
      // Connectors have w-0.5 or w-1 class
      expect(container.querySelector('.w-0\\.5')).toBeInTheDocument();
    });

    it('should hide connector when showConnector is false', () => {
      const { container } = render(<Timeline items={basicItems} showConnector={false} />);
      expect(container.querySelector('.w-0\\.5')).not.toBeInTheDocument();
    });

    it('should not show connector after last item', () => {
      const { container } = render(<Timeline items={[{ id: '1', title: 'Only' }]} />);
      // Single item shouldn't have connector
      expect(container.querySelector('.h-full.w-0\\.5')).not.toBeInTheDocument();
    });
  });

  describe('Custom Content', () => {
    it('should render custom content', () => {
      const items: TimelineItem[] = [
        { id: '1', title: 'With content', content: <button>Action</button> },
      ];
      render(<Timeline items={items} />);
      expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('should apply custom className', () => {
      const { container } = render(<Timeline items={basicItems} className="custom-timeline" />);
      expect(container.querySelector('.custom-timeline')).toBeInTheDocument();
    });
  });
});
