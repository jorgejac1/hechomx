import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Table, { TableColumn, useTable } from '../Table';

interface TestData {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  age: number;
}

const testData: TestData[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com', status: 'active', age: 30 },
  { id: 2, name: 'Bob', email: 'bob@example.com', status: 'inactive', age: 25 },
  { id: 3, name: 'Charlie', email: 'charlie@example.com', status: 'active', age: 35 },
];

const testColumns: TableColumn<TestData>[] = [
  { key: 'name', header: 'Name', cell: 'name' },
  { key: 'email', header: 'Email', cell: 'email' },
  { key: 'status', header: 'Status', cell: 'status' },
];

describe('Table', () => {
  describe('Rendering', () => {
    it('should render a table', () => {
      render(<Table columns={testColumns} data={testData} keyAccessor="id" />);
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('should render column headers', () => {
      render(<Table columns={testColumns} data={testData} keyAccessor="id" />);
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
    });

    it('should render data rows', () => {
      render(<Table columns={testColumns} data={testData} keyAccessor="id" />);
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('Charlie')).toBeInTheDocument();
    });

    it('should render cell values from key accessor', () => {
      render(<Table columns={testColumns} data={testData} keyAccessor="id" />);
      expect(screen.getByText('alice@example.com')).toBeInTheDocument();
      expect(screen.getByText('bob@example.com')).toBeInTheDocument();
    });

    it('should render cell values from render function', () => {
      const columnsWithRender: TableColumn<TestData>[] = [
        {
          key: 'name',
          header: 'Name',
          cell: (row) => <span data-testid="custom-cell">{row.name.toUpperCase()}</span>,
        },
      ];
      render(<Table columns={columnsWithRender} data={testData} keyAccessor="id" />);
      expect(screen.getByText('ALICE')).toBeInTheDocument();
    });

    it('should support function key accessor', () => {
      render(
        <Table columns={testColumns} data={testData} keyAccessor={(row) => `row-${row.id}`} />
      );
      expect(screen.getByText('Alice')).toBeInTheDocument();
    });

    it('should render caption when provided', () => {
      render(
        <Table
          columns={testColumns}
          data={testData}
          keyAccessor="id"
          caption="Test Table Caption"
        />
      );
      expect(screen.getByText('Test Table Caption')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('should render empty message when data is empty', () => {
      render(<Table columns={testColumns} data={[]} keyAccessor="id" />);
      expect(screen.getByText('No hay datos disponibles')).toBeInTheDocument();
    });

    it('should render custom empty message', () => {
      render(
        <Table columns={testColumns} data={[]} keyAccessor="id" emptyMessage="No results found" />
      );
      expect(screen.getByText('No results found')).toBeInTheDocument();
    });

    it('should render empty icon when provided', () => {
      render(
        <Table
          columns={testColumns}
          data={[]}
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
        <Table columns={testColumns} data={testData} keyAccessor="id" loading />
      );
      const skeletons = container.querySelectorAll('.animate-pulse');
      expect(skeletons.length).toBeGreaterThan(0);
    });

    it('should not render data when loading', () => {
      render(<Table columns={testColumns} data={testData} keyAccessor="id" loading />);
      expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('should apply small size classes', () => {
      render(<Table columns={testColumns} data={testData} keyAccessor="id" size="sm" />);
      const cells = screen.getAllByRole('cell');
      // Responsive classes: py-2 px-2 sm:px-3 text-xs sm:text-sm
      expect(cells[0]).toHaveClass('py-2', 'px-2');
      expect(cells[0].className).toContain('sm:px-3');
    });

    it('should apply medium size classes by default', () => {
      render(<Table columns={testColumns} data={testData} keyAccessor="id" />);
      const cells = screen.getAllByRole('cell');
      // Responsive classes: py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm
      expect(cells[0]).toHaveClass('px-3');
      expect(cells[0].className).toContain('sm:py-3');
    });

    it('should apply large size classes', () => {
      render(<Table columns={testColumns} data={testData} keyAccessor="id" size="lg" />);
      const cells = screen.getAllByRole('cell');
      // Responsive classes: py-3 sm:py-4 px-4 sm:px-6 text-sm sm:text-base
      expect(cells[0]).toHaveClass('py-3', 'px-4');
      expect(cells[0].className).toContain('sm:py-4');
    });
  });

  describe('Variants', () => {
    it('should apply striped variant', () => {
      const { container } = render(
        <Table columns={testColumns} data={testData} keyAccessor="id" variant="striped" />
      );
      const rows = container.querySelectorAll('tbody tr');
      expect(rows[1]).toHaveClass('bg-gray-50');
    });

    it('should apply bordered variant', () => {
      const { container } = render(
        <Table columns={testColumns} data={testData} keyAccessor="id" variant="bordered" />
      );
      const rows = container.querySelectorAll('tbody tr');
      expect(rows[0]).toHaveClass('border', 'border-gray-200');
    });
  });

  describe('Hoverable', () => {
    it('should apply hover styles by default', () => {
      const { container } = render(
        <Table columns={testColumns} data={testData} keyAccessor="id" />
      );
      const row = container.querySelector('tbody tr');
      expect(row).toHaveClass('hover:bg-gray-50');
    });

    it('should not apply hover styles when hoverable is false', () => {
      const { container } = render(
        <Table columns={testColumns} data={testData} keyAccessor="id" hoverable={false} />
      );
      const row = container.querySelector('tbody tr');
      expect(row).not.toHaveClass('hover:bg-gray-50');
    });
  });

  describe('Sticky Header', () => {
    it('should apply sticky header classes', () => {
      const { container } = render(
        <Table columns={testColumns} data={testData} keyAccessor="id" stickyHeader />
      );
      const thead = container.querySelector('thead');
      expect(thead).toHaveClass('sticky', 'top-0', 'z-10');
    });

    it('should not apply sticky header by default', () => {
      const { container } = render(
        <Table columns={testColumns} data={testData} keyAccessor="id" />
      );
      const thead = container.querySelector('thead');
      expect(thead).not.toHaveClass('sticky');
    });
  });

  describe('Row Click', () => {
    it('should call onRowClick when row is clicked', () => {
      const handleRowClick = vi.fn();
      render(
        <Table columns={testColumns} data={testData} keyAccessor="id" onRowClick={handleRowClick} />
      );
      fireEvent.click(screen.getByText('Alice'));
      expect(handleRowClick).toHaveBeenCalledWith(testData[0], 0);
    });

    it('should apply cursor-pointer when onRowClick is provided', () => {
      const { container } = render(
        <Table columns={testColumns} data={testData} keyAccessor="id" onRowClick={() => {}} />
      );
      const row = container.querySelector('tbody tr');
      expect(row).toHaveClass('cursor-pointer');
    });
  });

  describe('Selection', () => {
    it('should render checkboxes when selectable', () => {
      render(
        <Table
          columns={testColumns}
          data={testData}
          keyAccessor="id"
          selectable
          selectedKeys={new Set()}
          onSelectionChange={() => {}}
        />
      );
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes.length).toBe(4); // header + 3 rows
    });

    it('should check selected rows', () => {
      render(
        <Table
          columns={testColumns}
          data={testData}
          keyAccessor="id"
          selectable
          selectedKeys={new Set(['1'])}
          onSelectionChange={() => {}}
        />
      );
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes[1]).toBeChecked(); // first data row
    });

    it('should call onSelectionChange when checkbox clicked', () => {
      const handleSelectionChange = vi.fn();
      render(
        <Table
          columns={testColumns}
          data={testData}
          keyAccessor="id"
          selectable
          selectedKeys={new Set()}
          onSelectionChange={handleSelectionChange}
        />
      );
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[1]); // click first data row
      expect(handleSelectionChange).toHaveBeenCalled();
      const newSelection = handleSelectionChange.mock.calls[0][0] as Set<string>;
      expect(newSelection.has('1')).toBe(true);
    });

    it('should select all when header checkbox clicked', () => {
      const handleSelectionChange = vi.fn();
      render(
        <Table
          columns={testColumns}
          data={testData}
          keyAccessor="id"
          selectable
          selectedKeys={new Set()}
          onSelectionChange={handleSelectionChange}
        />
      );
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]); // header checkbox
      expect(handleSelectionChange).toHaveBeenCalled();
      const newSelection = handleSelectionChange.mock.calls[0][0] as Set<number>;
      expect(newSelection.size).toBe(3);
    });

    it('should deselect all when header checkbox clicked while all selected', () => {
      const handleSelectionChange = vi.fn();
      render(
        <Table
          columns={testColumns}
          data={testData}
          keyAccessor="id"
          selectable
          selectedKeys={new Set(['1', '2', '3'])}
          onSelectionChange={handleSelectionChange}
        />
      );
      const checkboxes = screen.getAllByRole('checkbox');
      fireEvent.click(checkboxes[0]); // header checkbox
      expect(handleSelectionChange).toHaveBeenCalled();
      const newSelection = handleSelectionChange.mock.calls[0][0] as Set<string>;
      expect(newSelection.size).toBe(0);
    });

    it('should apply selected row styling', () => {
      const { container } = render(
        <Table
          columns={testColumns}
          data={testData}
          keyAccessor="id"
          selectable
          selectedKeys={new Set(['1'])}
          onSelectionChange={() => {}}
        />
      );
      const rows = container.querySelectorAll('tbody tr');
      expect(rows[0]).toHaveClass('bg-primary-50');
    });
  });

  describe('Sorting', () => {
    const sortableColumns: TableColumn<TestData>[] = [
      { key: 'name', header: 'Name', cell: 'name', sortable: true },
      { key: 'age', header: 'Age', cell: 'age', sortable: true },
      { key: 'email', header: 'Email', cell: 'email' },
    ];

    it('should render sort icons for sortable columns', () => {
      const { container } = render(
        <Table columns={sortableColumns} data={testData} keyAccessor="id" />
      );
      // ChevronsUpDown icon for unsorted state
      const sortIcons = container.querySelectorAll('th svg');
      expect(sortIcons.length).toBe(2); // only sortable columns
    });

    it('should sort ascending on first click', () => {
      render(<Table columns={sortableColumns} data={testData} keyAccessor="id" />);
      fireEvent.click(screen.getByText('Age'));
      const cells = screen.getAllByRole('cell');
      // Find cells with ages
      const ages = cells.filter((cell) => ['25', '30', '35'].includes(cell.textContent || ''));
      expect(ages[0]).toHaveTextContent('25');
      expect(ages[1]).toHaveTextContent('30');
      expect(ages[2]).toHaveTextContent('35');
    });

    it('should sort descending on second click', () => {
      render(<Table columns={sortableColumns} data={testData} keyAccessor="id" />);
      fireEvent.click(screen.getByText('Age'));
      fireEvent.click(screen.getByText('Age'));
      const cells = screen.getAllByRole('cell');
      const ages = cells.filter((cell) => ['25', '30', '35'].includes(cell.textContent || ''));
      expect(ages[0]).toHaveTextContent('35');
      expect(ages[1]).toHaveTextContent('30');
      expect(ages[2]).toHaveTextContent('25');
    });

    it('should reset sort on third click', () => {
      render(<Table columns={sortableColumns} data={testData} keyAccessor="id" />);
      fireEvent.click(screen.getByText('Age'));
      fireEvent.click(screen.getByText('Age'));
      fireEvent.click(screen.getByText('Age'));
      const cells = screen.getAllByRole('cell');
      const ages = cells.filter((cell) => ['25', '30', '35'].includes(cell.textContent || ''));
      // Original order: 30, 25, 35
      expect(ages[0]).toHaveTextContent('30');
      expect(ages[1]).toHaveTextContent('25');
      expect(ages[2]).toHaveTextContent('35');
    });

    it('should call onSortChange callback', () => {
      const handleSortChange = vi.fn();
      render(
        <Table
          columns={sortableColumns}
          data={testData}
          keyAccessor="id"
          onSortChange={handleSortChange}
        />
      );
      fireEvent.click(screen.getByText('Name'));
      expect(handleSortChange).toHaveBeenCalledWith('name', 'asc');
    });

    it('should apply hover styles to sortable headers', () => {
      render(<Table columns={sortableColumns} data={testData} keyAccessor="id" />);
      const nameHeader = screen.getByText('Name').closest('th');
      expect(nameHeader).toHaveClass('cursor-pointer', 'hover:bg-gray-100');
    });

    it('should apply aria-sort attribute', () => {
      render(
        <Table
          columns={sortableColumns}
          data={testData}
          keyAccessor="id"
          defaultSortKey="name"
          defaultSortDirection="asc"
        />
      );
      const nameHeader = screen.getByText('Name').closest('th');
      expect(nameHeader).toHaveAttribute('aria-sort', 'ascending');
    });

    it('should use sortKey when different from cell accessor', () => {
      const columnsWithSortKey: TableColumn<TestData>[] = [
        {
          key: 'displayName',
          header: 'Name',
          cell: (row) => <span>{row.name}</span>,
          sortable: true,
          sortKey: 'name',
        },
      ];
      render(<Table columns={columnsWithSortKey} data={testData} keyAccessor="id" />);
      fireEvent.click(screen.getByText('Name'));
      // Should sort by 'name' field
      const spans = screen.getAllByText(/Alice|Bob|Charlie/);
      expect(spans[0]).toHaveTextContent('Alice');
    });

    it('should call sortFunction for server-side sorting', () => {
      const handleSort = vi.fn();
      render(
        <Table
          columns={sortableColumns}
          data={testData}
          keyAccessor="id"
          sortFunction={handleSort}
        />
      );
      fireEvent.click(screen.getByText('Name'));
      expect(handleSort).toHaveBeenCalledWith('name', 'asc');
    });
  });

  describe('Column Alignment', () => {
    it('should apply left alignment by default', () => {
      render(<Table columns={testColumns} data={testData} keyAccessor="id" />);
      const cells = screen.getAllByRole('cell');
      expect(cells[0]).toHaveClass('text-left');
    });

    it('should apply center alignment', () => {
      const centeredColumns: TableColumn<TestData>[] = [
        { key: 'name', header: 'Name', cell: 'name', align: 'center' },
      ];
      render(<Table columns={centeredColumns} data={testData} keyAccessor="id" />);
      const cells = screen.getAllByRole('cell');
      expect(cells[0]).toHaveClass('text-center');
    });

    it('should apply right alignment', () => {
      const rightColumns: TableColumn<TestData>[] = [
        { key: 'name', header: 'Name', cell: 'name', align: 'right' },
      ];
      render(<Table columns={rightColumns} data={testData} keyAccessor="id" />);
      const cells = screen.getAllByRole('cell');
      expect(cells[0]).toHaveClass('text-right');
    });
  });

  describe('Responsive Columns', () => {
    it('should hide column on mobile', () => {
      const responsiveColumns: TableColumn<TestData>[] = [
        { key: 'name', header: 'Name', cell: 'name' },
        { key: 'email', header: 'Email', cell: 'email', hideOnMobile: true },
      ];
      render(<Table columns={responsiveColumns} data={testData} keyAccessor="id" />);
      const emailHeader = screen.getByText('Email').closest('th');
      expect(emailHeader).toHaveClass('hidden', 'sm:table-cell');
    });

    it('should hide column on tablet', () => {
      const responsiveColumns: TableColumn<TestData>[] = [
        { key: 'name', header: 'Name', cell: 'name' },
        { key: 'email', header: 'Email', cell: 'email', hideOnTablet: true },
      ];
      render(<Table columns={responsiveColumns} data={testData} keyAccessor="id" />);
      const emailHeader = screen.getByText('Email').closest('th');
      expect(emailHeader).toHaveClass('hidden', 'md:table-cell');
    });
  });

  describe('Custom ClassNames', () => {
    it('should apply custom className to container', () => {
      const { container } = render(
        <Table columns={testColumns} data={testData} keyAccessor="id" className="custom-table" />
      );
      expect(container.firstChild).toHaveClass('custom-table');
    });

    it('should apply headerClassName to column header', () => {
      const columnsWithHeaderClass: TableColumn<TestData>[] = [
        { key: 'name', header: 'Name', cell: 'name', headerClassName: 'custom-header' },
      ];
      render(<Table columns={columnsWithHeaderClass} data={testData} keyAccessor="id" />);
      const header = screen.getByText('Name').closest('th');
      expect(header).toHaveClass('custom-header');
    });

    it('should apply cellClassName to cells', () => {
      const columnsWithCellClass: TableColumn<TestData>[] = [
        { key: 'name', header: 'Name', cell: 'name', cellClassName: 'custom-cell' },
      ];
      render(<Table columns={columnsWithCellClass} data={testData} keyAccessor="id" />);
      const cells = screen.getAllByRole('cell');
      expect(cells[0]).toHaveClass('custom-cell');
    });

    it('should apply column width', () => {
      const columnsWithWidth: TableColumn<TestData>[] = [
        { key: 'name', header: 'Name', cell: 'name', width: 'w-1/2' },
      ];
      render(<Table columns={columnsWithWidth} data={testData} keyAccessor="id" />);
      const header = screen.getByText('Name').closest('th');
      expect(header).toHaveClass('w-1/2');
    });
  });

  describe('Accessibility', () => {
    it('should have grid role', () => {
      render(<Table columns={testColumns} data={testData} keyAccessor="id" />);
      expect(screen.getByRole('grid')).toBeInTheDocument();
    });

    it('should have caption for screen readers', () => {
      render(<Table columns={testColumns} data={testData} keyAccessor="id" caption="User Data" />);
      const caption = screen.getByText('User Data');
      expect(caption).toHaveClass('sr-only');
    });
  });

  describe('Row Deselection', () => {
    it('should deselect row when clicking checkbox of already selected row', () => {
      const handleSelectionChange = vi.fn();
      // Note: keyAccessor returns String(id), so we need to use string keys in selectedKeys
      render(
        <Table
          columns={testColumns}
          data={testData}
          keyAccessor="id"
          selectable
          selectedKeys={new Set(['1'])}
          onSelectionChange={handleSelectionChange}
        />
      );
      // Get all checkboxes (first is header, rest are rows)
      const checkboxes = screen.getAllByRole('checkbox');
      // Verify first data row checkbox is checked (selected)
      expect(checkboxes[1]).toBeChecked();
      // Trigger onChange to toggle the selection (simulates clicking checkbox)
      fireEvent.click(checkboxes[1]);
      expect(handleSelectionChange).toHaveBeenCalled();
      const newSelection = handleSelectionChange.mock.calls[0][0];
      expect(newSelection.has('1')).toBe(false);
    });
  });

  describe('Sort Cycling', () => {
    it('should cycle sort direction back to asc from null', () => {
      const sortableColumns: TableColumn<TestData>[] = [
        { key: 'name', header: 'Name', cell: 'name', sortable: true },
      ];
      const handleSortChange = vi.fn();
      render(
        <Table
          columns={sortableColumns}
          data={testData}
          keyAccessor="id"
          onSortChange={handleSortChange}
        />
      );
      // Click 1: asc
      fireEvent.click(screen.getByText('Name'));
      expect(handleSortChange).toHaveBeenLastCalledWith('name', 'asc');
      // Click 2: desc
      fireEvent.click(screen.getByText('Name'));
      expect(handleSortChange).toHaveBeenLastCalledWith('name', 'desc');
      // Click 3: null (reset)
      fireEvent.click(screen.getByText('Name'));
      expect(handleSortChange).toHaveBeenLastCalledWith('name', null);
      // Click 4: asc again (cycling from null back to asc)
      fireEvent.click(screen.getByText('Name'));
      expect(handleSortChange).toHaveBeenLastCalledWith('name', 'asc');
    });
  });

  describe('useTable hook', () => {
    it('should return default values when used outside table context', () => {
      let contextValue: ReturnType<typeof useTable> | undefined;

      function TestConsumer() {
        contextValue = useTable();
        return <div>Test</div>;
      }

      render(<TestConsumer />);

      expect(contextValue).toEqual({
        size: 'md',
        variant: 'default',
        hoverable: true,
      });
    });
  });
});
