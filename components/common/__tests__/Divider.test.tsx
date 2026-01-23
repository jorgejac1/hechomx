import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Divider from '../Divider';

describe('Divider', () => {
  describe('Rendering', () => {
    it('should render horizontal divider by default', () => {
      const { container } = render(<Divider />);
      expect(container.querySelector('hr')).toBeInTheDocument();
    });

    it('should have separator role', () => {
      render(<Divider />);
      expect(screen.getByRole('separator')).toBeInTheDocument();
    });

    it('should have correct aria-orientation for horizontal', () => {
      render(<Divider orientation="horizontal" />);
      expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'horizontal');
    });

    it('should have correct aria-orientation for vertical', () => {
      render(<Divider orientation="vertical" />);
      expect(screen.getByRole('separator')).toHaveAttribute('aria-orientation', 'vertical');
    });
  });

  describe('Orientation', () => {
    it('should render horizontal divider', () => {
      const { container } = render(<Divider orientation="horizontal" />);
      expect(container.querySelector('.w-full')).toBeInTheDocument();
    });

    it('should render vertical divider', () => {
      const { container } = render(<Divider orientation="vertical" />);
      expect(container.querySelector('.border-l')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('should render solid variant by default', () => {
      const { container } = render(<Divider />);
      expect(container.querySelector('.border-solid')).toBeInTheDocument();
    });

    it('should render dashed variant', () => {
      const { container } = render(<Divider variant="dashed" />);
      expect(container.querySelector('.border-dashed')).toBeInTheDocument();
    });

    it('should render dotted variant', () => {
      const { container } = render(<Divider variant="dotted" />);
      expect(container.querySelector('.border-dotted')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should render small size', () => {
      const { container } = render(<Divider size="sm" />);
      expect(container.querySelector('.border-t')).toBeInTheDocument();
    });

    it('should render medium size', () => {
      const { container } = render(<Divider size="md" />);
      expect(container.querySelector('.border-t-2')).toBeInTheDocument();
    });

    it('should render large size', () => {
      const { container } = render(<Divider size="lg" />);
      expect(container.querySelector('.border-t-4')).toBeInTheDocument();
    });
  });

  describe('Colors', () => {
    it('should render default color', () => {
      const { container } = render(<Divider />);
      expect(container.querySelector('.border-gray-200')).toBeInTheDocument();
    });

    it('should render light color', () => {
      const { container } = render(<Divider color="light" />);
      expect(container.querySelector('.border-gray-100')).toBeInTheDocument();
    });

    it('should render dark color', () => {
      const { container } = render(<Divider color="dark" />);
      expect(container.querySelector('.border-gray-400')).toBeInTheDocument();
    });

    it('should render primary color', () => {
      const { container } = render(<Divider color="primary" />);
      expect(container.querySelector('.border-primary-200')).toBeInTheDocument();
    });
  });

  describe('Label', () => {
    it('should render label in the middle', () => {
      render(<Divider>OR</Divider>);
      expect(screen.getByText('OR')).toBeInTheDocument();
    });

    it('should render divider lines around label', () => {
      const { container } = render(<Divider>Text</Divider>);
      const lines = container.querySelectorAll('.flex-1');
      expect(lines.length).toBe(2);
    });

    it('should position label on the left', () => {
      const { container } = render(<Divider labelPosition="left">Left</Divider>);
      expect(container.querySelector('.justify-start')).toBeInTheDocument();
    });

    it('should position label in the center by default', () => {
      const { container } = render(<Divider>Center</Divider>);
      expect(container.querySelector('.justify-center')).toBeInTheDocument();
    });

    it('should position label on the right', () => {
      const { container } = render(<Divider labelPosition="right">Right</Divider>);
      expect(container.querySelector('.justify-end')).toBeInTheDocument();
    });
  });

  describe('Spacing', () => {
    it('should apply no spacing', () => {
      const { container } = render(<Divider spacing="none" />);
      expect(container.querySelector('.my-2')).not.toBeInTheDocument();
      expect(container.querySelector('.my-4')).not.toBeInTheDocument();
    });

    it('should apply small spacing', () => {
      const { container } = render(<Divider spacing="sm" />);
      expect(container.querySelector('.my-2')).toBeInTheDocument();
    });

    it('should apply medium spacing by default', () => {
      const { container } = render(<Divider />);
      expect(container.querySelector('.my-4')).toBeInTheDocument();
    });

    it('should apply large spacing', () => {
      const { container } = render(<Divider spacing="lg" />);
      expect(container.querySelector('.my-8')).toBeInTheDocument();
    });
  });

  describe('Custom className', () => {
    it('should apply custom className', () => {
      const { container } = render(<Divider className="custom-divider" />);
      expect(container.querySelector('.custom-divider')).toBeInTheDocument();
    });
  });

  describe('Vertical with label', () => {
    it('should render vertical divider with label', () => {
      render(<Divider orientation="vertical">Label</Divider>);
      expect(screen.getByText('Label')).toBeInTheDocument();
    });
  });
});
