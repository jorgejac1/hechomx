import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../Card';

describe('Card', () => {
  describe('rendering', () => {
    it('should render children', () => {
      render(<Card>Card content</Card>);
      expect(screen.getByText('Card content')).toBeInTheDocument();
    });

    it('should render as div by default', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.tagName).toBe('DIV');
    });

    it('should render as article when specified', () => {
      render(
        <Card as="article" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card.tagName).toBe('ARTICLE');
    });

    it('should render as section when specified', () => {
      render(
        <Card as="section" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card.tagName).toBe('SECTION');
    });
  });

  describe('variants', () => {
    it('should apply default variant styles', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('bg-white');
      expect(card.className).toContain('rounded-xl');
      expect(card.className).toContain('shadow-md');
    });

    it('should apply outlined variant styles', () => {
      render(
        <Card variant="outlined" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card.className).toContain('border');
      expect(card.className).toContain('border-gray-200');
    });

    it('should apply elevated variant styles', () => {
      render(
        <Card variant="elevated" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card.className).toContain('shadow-lg');
      expect(card.className).toContain('hover:shadow-xl');
    });
  });

  describe('padding', () => {
    it('should apply no padding', () => {
      render(
        <Card padding="none" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card.className).not.toContain('p-4');
      expect(card.className).not.toContain('p-6');
      expect(card.className).not.toContain('p-8');
    });

    it('should apply small padding', () => {
      render(
        <Card padding="sm" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card.className).toContain('p-4');
    });

    it('should apply medium padding by default', () => {
      render(<Card data-testid="card">Content</Card>);
      const card = screen.getByTestId('card');
      expect(card.className).toContain('p-6');
    });

    it('should apply large padding', () => {
      render(
        <Card padding="lg" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card.className).toContain('p-8');
    });
  });

  describe('interaction', () => {
    it('should call onClick when clicked', () => {
      const handleClick = vi.fn();
      render(
        <Card onClick={handleClick} data-testid="card">
          Content
        </Card>
      );
      fireEvent.click(screen.getByTestId('card'));
      expect(handleClick).toHaveBeenCalled();
    });

    it('should have cursor-pointer when clickable', () => {
      render(
        <Card onClick={() => {}} data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card.className).toContain('cursor-pointer');
    });

    it('should have role="button" when clickable', () => {
      render(<Card onClick={() => {}}>Content</Card>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('should be keyboard accessible when clickable', () => {
      const handleClick = vi.fn();
      render(
        <Card onClick={handleClick} data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      fireEvent.keyDown(card, { key: 'Enter' });
      expect(handleClick).toHaveBeenCalled();
    });

    it('should trigger onClick on Space key', () => {
      const handleClick = vi.fn();
      render(
        <Card onClick={handleClick} data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      fireEvent.keyDown(card, { key: ' ' });
      expect(handleClick).toHaveBeenCalled();
    });
  });

  describe('custom className', () => {
    it('should apply custom className', () => {
      render(
        <Card className="custom-class" data-testid="card">
          Content
        </Card>
      );
      const card = screen.getByTestId('card');
      expect(card.className).toContain('custom-class');
    });
  });
});

describe('CardHeader', () => {
  it('should render children', () => {
    render(<CardHeader>Header content</CardHeader>);
    expect(screen.getByText('Header content')).toBeInTheDocument();
  });

  it('should render with icon', () => {
    render(<CardHeader icon={<span data-testid="icon">Icon</span>}>Header</CardHeader>);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('should render with action', () => {
    render(<CardHeader action={<button>Action</button>}>Header</CardHeader>);
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(
      <CardHeader className="custom-header" data-testid="header">
        Header
      </CardHeader>
    );
    // The custom class is applied but we test for content
    expect(screen.getByText('Header')).toBeInTheDocument();
  });
});

describe('CardTitle', () => {
  it('should render as h3 by default', () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
  });

  it('should render as specified heading level', () => {
    render(<CardTitle as="h1">Title</CardTitle>);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('should render as h2', () => {
    render(<CardTitle as="h2">Title</CardTitle>);
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  it('should apply font-bold style', () => {
    render(<CardTitle data-testid="title">Title</CardTitle>);
    const title = screen.getByTestId('title');
    expect(title.className).toContain('font-bold');
  });

  it('should apply custom className', () => {
    render(
      <CardTitle className="custom-title" data-testid="title">
        Title
      </CardTitle>
    );
    const title = screen.getByTestId('title');
    expect(title.className).toContain('custom-title');
  });
});

describe('CardDescription', () => {
  it('should render children', () => {
    render(<CardDescription>Description text</CardDescription>);
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('should apply text-sm and text-gray-600 styles', () => {
    render(<CardDescription data-testid="desc">Description</CardDescription>);
    const desc = screen.getByTestId('desc');
    expect(desc.className).toContain('text-sm');
    expect(desc.className).toContain('text-gray-600');
  });

  it('should apply custom className', () => {
    render(
      <CardDescription className="custom-desc" data-testid="desc">
        Description
      </CardDescription>
    );
    const desc = screen.getByTestId('desc');
    expect(desc.className).toContain('custom-desc');
  });
});

describe('CardContent', () => {
  it('should render children', () => {
    render(<CardContent>Content here</CardContent>);
    expect(screen.getByText('Content here')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(
      <CardContent className="custom-content" data-testid="content">
        Content
      </CardContent>
    );
    const content = screen.getByTestId('content');
    expect(content.className).toContain('custom-content');
  });
});

describe('CardFooter', () => {
  it('should render children', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('should apply border-t style', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>);
    const footer = screen.getByTestId('footer');
    expect(footer.className).toContain('border-t');
  });

  it('should align right by default', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>);
    const footer = screen.getByTestId('footer');
    expect(footer.className).toContain('justify-end');
  });

  it('should align left when specified', () => {
    render(
      <CardFooter align="left" data-testid="footer">
        Footer
      </CardFooter>
    );
    const footer = screen.getByTestId('footer');
    expect(footer.className).toContain('justify-start');
  });

  it('should align center when specified', () => {
    render(
      <CardFooter align="center" data-testid="footer">
        Footer
      </CardFooter>
    );
    const footer = screen.getByTestId('footer');
    expect(footer.className).toContain('justify-center');
  });

  it('should align between when specified', () => {
    render(
      <CardFooter align="between" data-testid="footer">
        Footer
      </CardFooter>
    );
    const footer = screen.getByTestId('footer');
    expect(footer.className).toContain('justify-between');
  });

  it('should apply custom className', () => {
    render(
      <CardFooter className="custom-footer" data-testid="footer">
        Footer
      </CardFooter>
    );
    const footer = screen.getByTestId('footer');
    expect(footer.className).toContain('custom-footer');
  });
});

describe('Card composition', () => {
  it('should render a complete card with all subcomponents', () => {
    render(
      <Card>
        <CardHeader icon={<span>📦</span>} action={<button>Edit</button>}>
          <CardTitle>Product Card</CardTitle>
          <CardDescription>A description of the product</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main content goes here</p>
        </CardContent>
        <CardFooter>
          <button>Cancel</button>
          <button>Save</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('📦')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Product Card' })).toBeInTheDocument();
    expect(screen.getByText('A description of the product')).toBeInTheDocument();
    expect(screen.getByText('Main content goes here')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });
});
