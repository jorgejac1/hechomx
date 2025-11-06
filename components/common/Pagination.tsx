'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

function PaginationContent({ currentPage, totalPages, baseUrl }: PaginationProps) {
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const buildUrl = (page: number) => {
    const params = new URLSearchParams(searchParams?.toString() || '');
    if (page === 1) {
      params.delete('pagina');
    } else {
      params.set('pagina', page.toString());
    }
    const queryString = params.toString();
    return queryString ? `${baseUrl}?${queryString}` : baseUrl;
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    // Always show first page
    pages.push(1);

    // Show ellipsis or pages after first
    if (showEllipsisStart) {
      pages.push('...');
      // Show current page and neighbors
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        if (i > 1 && i < totalPages) {
          pages.push(i);
        }
      }
    } else {
      // Show pages 2 to 4 (or less if totalPages is small)
      for (let i = 2; i < Math.min(5, totalPages); i++) {
        pages.push(i);
      }
    }

    // Show ellipsis or pages before last
    if (showEllipsisEnd) {
      pages.push('...');
    } else if (totalPages > 4) {
      // Fill in the gap
      for (let i = Math.max(5, totalPages - 2); i < totalPages; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
    }

    // Always show last page if there's more than 1
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      <Link
        href={buildUrl(Math.max(1, currentPage - 1))}
        className={`px-4 py-2 rounded-lg border font-medium transition ${
          currentPage === 1
            ? 'border-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
        aria-disabled={currentPage === 1}
      >
        Anterior
      </Link>

      {/* Page Numbers */}
      <div className="hidden sm:flex items-center gap-1">
        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-400">
                ...
              </span>
            );
          }

          const pageNumber = page as number;
          const isActive = pageNumber === currentPage;

          return (
            <Link
              key={pageNumber}
              href={buildUrl(pageNumber)}
              className={`min-w-[40px] h-10 flex items-center justify-center rounded-lg font-medium transition ${
                isActive ? 'bg-primary-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {pageNumber}
            </Link>
          );
        })}
      </div>

      {/* Mobile: Just show current page */}
      <div className="sm:hidden flex items-center gap-2">
        <span className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium">
          {currentPage}
        </span>
        <span className="text-gray-600">de {totalPages}</span>
      </div>

      {/* Next Button */}
      <Link
        href={buildUrl(Math.min(totalPages, currentPage + 1))}
        className={`px-4 py-2 rounded-lg border font-medium transition ${
          currentPage === totalPages
            ? 'border-gray-200 text-gray-400 cursor-not-allowed pointer-events-none'
            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
        }`}
        aria-disabled={currentPage === totalPages}
      >
        Siguiente
      </Link>
    </div>
  );
}

export default function Pagination(props: PaginationProps) {
  return (
    <Suspense fallback={<div className="h-12" />}>
      <PaginationContent {...props} />
    </Suspense>
  );
}
