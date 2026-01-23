import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DataList, { useDataList } from '../DataList';

interface TestItem {
  id: number;
  name: string;
  email: string;
}

const testData: TestItem[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
];

const renderItem = (item: TestItem) => <DataList.Item primary={item.name} secondary={item.email} />;

describe('DataList', () => {
  describe('Rendering', () => {
    it('should render a list', () => {
      render(<DataList data={testData} renderItem={renderItem} keyAccessor="id" />);
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should render all items', () => {
      render(<DataList data={testData} renderItem={renderItem} keyAccessor="id" />);
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('Charlie')).toBeInTheDocument();
    });

    it('should render secondary text', () => {
      render(<DataList data={testData} renderItem={renderItem} keyAccessor="id" />);
      expect(screen.getByText('alice@example.com')).toBeInTheDocument();
      expect(screen.getByText('bob@example.com')).toBeInTheDocument();
    });

    it('should support function key accessor', () => {
      render(
        <DataList
          data={testData}
          renderItem={renderItem}
          keyAccessor={(item) => `item-${item.id}`}
        />
      );
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    it('should render custom content via renderItem', () => {
      render(
        <DataList
          data={testData}
          renderItem={(item) => <span data-testid="custom">{item.name.toUpperCase()}</span>}
          keyAccessor="id"
        />
      );
      expect(screen.getByText('ALICE')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should render empty message when data is empty', () => {
      render(<DataList data={[]} renderItem={renderItem} keyAccessor="id" />);
      expect(screen.getByText('No hay elementos disponibles')).toBeInTheDocument();
    });

    it('should render custom empty message', () => {
      render(
        <DataList
          data={[]}
          renderItem={renderItem}
          keyAccessor="id"
          emptyMessage="No items found"
        />
      );
      expect(screen.getByText('No items found')).toBeInTheDocument();
    });

    it('should render empty icon when provided', () => {
      render(
        <DataList
          data={[]}
          renderItem={renderItem}
          keyAccessor="id"
          emptyIcon={<span data-testid="empty-icon">📭</span>}
        />
      );
      expect(screen.getByTestId('empty-icon')).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('should render loading skeleton', () => {
      const { container } = render(
        <DataList data={testData} renderItem={renderItem} keyAccessor="id" loading />
      );
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('should render specified number of skeleton items', () => {
      const { container } = render(
        <DataList
          data={testData}
          renderItem={renderItem}
          keyAccessor="id"
          loading
          loadingItems={3}
        />
      );
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBe(3);
    });

    it('should not render data when loading', () => {
      render(<DataList data={testData} renderItem={renderItem} keyAccessor="id" loading />);
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });
  });

  describe('Layout Modes', () => {
    it('should render list layout by default', () => {
      const { container } = render(
        <DataList data={testData} renderItem={renderItem} keyAccessor="id" />
      );
      expect(container.querySelector('ul')).toBeInTheDocument();
    });

    it('should render grid layout', () => {
      const { container } = render(
        <DataList data={testData} renderItem={renderItem} keyAccessor="id" layout="grid" />
      );
      expect(container.querySelector('.grid')).toBeInTheDocument();
    });

    it('should render compact layout', () => {
      const { container } = render(
        <DataList data={testData} renderItem={renderItem} keyAccessor="id" layout="compact" />
      );
      const items = container.querySelectorAll('li');
      expect(items[0]).toHaveClass('py-2');
    });

    it('should apply grid columns', () => {
      const { container } = render(
        <DataList
          data={testData}
          renderItem={renderItem}
          keyAccessor="id"
          layout="grid"
          columns={4}
        />
      );
      expect(container.firstChild).toHaveClass('lg:grid-cols-4');
    });

    it('should render grid items with cards', () => {
      const { container } = render(
        <DataList data={testData} renderItem={renderItem} keyAccessor="id" layout="grid" />
      );
      const items = container.querySelectorAll('[role="listitem"]');
      expect(items[0]).toHaveClass('rounded-lg', 'border', 'border-gray-200');
    });
  });

  describe('Sizes', () => {
    it('should apply small size padding', () => {
      const { container } = render(
        <DataList data={testData} renderItem={renderItem} keyAccessor="id" size="sm" />
      );
      const items = container.querySelectorAll('li');
      expect(items[0]).toHaveClass('p-2');
    });

    it('should apply medium size padding by default', () => {
      const { container } = render(
        <DataList data={testData} renderItem={renderItem} keyAccessor="id" />
      );
      const items = container.querySelectorAll('li');
      expect(items[0]).toHaveClass('p-4');
    });

    it('should apply large size padding', () => {
      const { container } = render(
        <DataList data={testData} renderItem={renderItem} keyAccessor="id" size="lg" />
      );
      const items = container.querySelectorAll('li');
      expect(items[0]).toHaveClass('p-6');
    });
  });

  describe('Dividers', () => {
    it('should show dividers by default', () => {
      render(<DataList data={testData} renderItem={renderItem} keyAccessor="id" />);
      expect(screen.getByRole('list')).toHaveClass('divide-y', 'divide-gray-100');
    });

    it('should hide dividers when divided is false', () => {
      render(<DataList data={testData} renderItem={renderItem} keyAccessor="id" divided={false} />);
      expect(screen.getByRole('list')).not.toHaveClass('divide-y');
    });
  });

  describe('Hoverable', () => {
    it('should apply hover styles by default', () => {
      const { container } = render(
        <DataList data={testData} renderItem={renderItem} keyAccessor="id" />
      );
      const items = container.querySelectorAll('li');
      expect(items[0]).toHaveClass('hover:bg-gray-50');
    });

    it('should not apply hover styles when hoverable is false', () => {
      const { container } = render(
        <DataList data={testData} renderItem={renderItem} keyAccessor="id" hoverable={false} />
      );
      const items = container.querySelectorAll('li');
      expect(items[0]).not.toHaveClass('hover:bg-gray-50');
    });

    it('should apply hover styles to grid items', () => {
      const { container } = render(
        <DataList data={testData} renderItem={renderItem} keyAccessor="id" layout="grid" />
      );
      const items = container.querySelectorAll('[role="listitem"]');
      expect(items[0]).toHaveClass('hover:shadow-md');
    });
  });

  describe('Item Click', () => {
    it('should call onItemClick when item is clicked', () => {
      const handleClick = vi.fn();
      render(
        <DataList
          data={testData}
          renderItem={renderItem}
          keyAccessor="id"
          onItemClick={handleClick}
        />
      );
      fireEvent.click(screen.getByText('Alice'));
      expect(handleClick).toHaveBeenCalledWith(testData[0], 0);
    });

    it('should apply cursor-pointer when onItemClick is provided', () => {
      const { container } = render(
        <DataList data={testData} renderItem={renderItem} keyAccessor="id" onItemClick={() => {}} />
      );
      const items = container.querySelectorAll('li');
      expect(items[0]).toHaveClass('cursor-pointer');
    });

    it('should call onItemClick for grid items', () => {
      const handleClick = vi.fn();
      render(
        <DataList
          data={testData}
          renderItem={renderItem}
          keyAccessor="id"
          layout="grid"
          onItemClick={handleClick}
        />
      );
      fireEvent.click(screen.getByText('Bob'));
      expect(handleClick).toHaveBeenCalledWith(testData[1], 1);
    });
  });

  describe('Custom ClassNames', () => {
    it('should apply custom className to container', () => {
      const { container } = render(
        <DataList
          data={testData}
          renderItem={renderItem}
          keyAccessor="id"
          className="custom-list"
        />
      );
      expect(container.firstChild).toHaveClass('custom-list');
    });

    it('should apply itemClassName to items', () => {
      const { container } = render(
        <DataList
          data={testData}
          renderItem={renderItem}
          keyAccessor="id"
          itemClassName="custom-item"
        />
      );
      const items = container.querySelectorAll('li');
      expect(items[0]).toHaveClass('custom-item');
    });
  });

  describe('DataList.Item', () => {
    it('should render primary content', () => {
      render(
        <DataList
          data={testData}
          renderItem={(item) => <DataList.Item primary={item.name} />}
          keyAccessor="id"
        />
      );
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    it('should render secondary content', () => {
      render(
        <DataList
          data={testData}
          renderItem={(item) => <DataList.Item primary={item.name} secondary={item.email} />}
          keyAccessor="id"
        />
      );
      expect(screen.getByText('alice@example.com')).toBeInTheDocument();
    });

    it('should render leading element', () => {
      render(
        <DataList
          data={testData}
          renderItem={(item) => (
            <DataList.Item leading={<span data-testid="avatar">A</span>} primary={item.name} />
          )}
          keyAccessor="id"
        />
      );
      expect(screen.getAllByTestId('avatar').length).toBe(3);
    });

    it('should render trailing element', () => {
      render(
        <DataList
          data={testData}
          renderItem={(item) => (
            <DataList.Item primary={item.name} trailing={<span data-testid="badge">Active</span>} />
          )}
          keyAccessor="id"
        />
      );
      expect(screen.getAllByTestId('badge').length).toBe(3);
    });

    it('should apply custom className', () => {
      const { container } = render(
        <DataList
          data={[testData[0]]}
          renderItem={(item) => <DataList.Item primary={item.name} className="custom-item-class" />}
          keyAccessor="id"
        />
      );
      expect(container.querySelector('.custom-item-class')).toBeInTheDocument();
    });

    it('should truncate long text', () => {
      const { container } = render(
        <DataList
          data={[testData[0]]}
          renderItem={(item) => <DataList.Item primary={item.name} secondary={item.email} />}
          keyAccessor="id"
        />
      );
      const primary = container.querySelector('p.truncate');
      expect(primary).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have list role', () => {
      render(<DataList data={testData} renderItem={renderItem} keyAccessor="id" />);
      expect(screen.getByRole('list')).toBeInTheDocument();
    });

    it('should have listitem role for grid items', () => {
      render(<DataList data={testData} renderItem={renderItem} keyAccessor="id" layout="grid" />);
      expect(screen.getAllByRole('listitem').length).toBe(3);
    });
  });

  describe('useDataList hook', () => {
    it('should return context value when used inside DataList', () => {
      let contextValue: ReturnType<typeof useDataList> | undefined;

      function TestConsumer() {
        contextValue = useDataList();
        return <div data-testid="consumer">Consumer</div>;
      }

      render(
        <DataList
          data={testData}
          renderItem={() => <TestConsumer />}
          keyAccessor="id"
          size="lg"
          layout="grid"
          hoverable={false}
        />
      );

      expect(screen.getAllByTestId('consumer').length).toBe(3);
      expect(contextValue).toEqual({
        size: 'lg',
        layout: 'grid',
        hoverable: false,
        divided: true,
      });
    });
  });
});
