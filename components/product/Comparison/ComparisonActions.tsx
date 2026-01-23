/**
 * @fileoverview Comparison action buttons component
 * Provides print, share, and PDF export functionality for the product comparison page.
 * @module components/product/Comparison/ComparisonActions
 */

'use client';

import { useState } from 'react';
import { useToast } from '@/contexts/ToastContext';
import ShareModal from '@/components/common/ShareModal';
import { Product } from '@/types';
import { Printer, Share2, Download } from 'lucide-react';

/**
 * Props for the ComparisonActions component
 * @interface ComparisonActionsProps
 */
interface ComparisonActionsProps {
  /** Products being compared */
  products: Product[];
  /** @deprecated No longer used - PDF is generated from product data directly */
  tableRef?: React.RefObject<HTMLDivElement | null>;
}

export default function ComparisonActions({ products }: ComparisonActionsProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { info, success, error } = useToast();

  const handlePrint = () => {
    window.print();

    // Track analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'comparison_printed', {
        products_count: products.length,
      });
    }
  };

  const generateShareableLink = () => {
    const productIds = products.map((p) => p.id).join(',');
    return `${window.location.origin}/comparar?products=${productIds}`;
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  /**
   * Generates a clean HTML table for PDF export with inline styles only
   * This avoids issues with html2canvas not supporting lab() colors from Tailwind CSS v4
   */
  const generatePDFContent = (): string => {
    const date = new Date().toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const productRows = products
      .map(
        (p) => `
        <td style="padding: 16px; text-align: center; border: 1px solid #E5E7EB; vertical-align: top;">
          <img src="${p.images[0]}" alt="${p.name}" style="width: 120px; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" crossorigin="anonymous" />
          <div style="font-weight: 600; color: #111827; font-size: 14px; margin-bottom: 4px;">${p.name}</div>
          <div style="font-size: 18px; font-weight: 700; color: #0D9488;">$${p.price.toLocaleString('es-MX')}</div>
        </td>
      `
      )
      .join('');

    const compareRow = (label: string, getValue: (p: Product) => string) => `
      <tr>
        <td style="padding: 12px 16px; font-weight: 600; color: #374151; background-color: #F9FAFB; border: 1px solid #E5E7EB; white-space: nowrap;">${label}</td>
        ${products.map((p) => `<td style="padding: 12px 16px; color: #4B5563; border: 1px solid #E5E7EB; text-align: center;">${getValue(p)}</td>`).join('')}
      </tr>
    `;

    return `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #ffffff;">
        <!-- Header -->
        <div style="margin-bottom: 24px; border-bottom: 3px solid #0D9488; padding-bottom: 16px;">
          <h1 style="margin: 0; color: #0D9488; font-size: 28px; font-weight: 700;">Papalote Market</h1>
          <p style="margin: 8px 0 0 0; color: #6B7280; font-size: 14px;">Comparación de Productos - ${date}</p>
        </div>

        <!-- Comparison Table -->
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr>
              <th style="padding: 16px; background-color: #0D9488; color: white; font-weight: 600; border: 1px solid #0D9488; text-align: left;">Producto</th>
              ${productRows}
            </tr>
          </thead>
          <tbody>
            ${compareRow('Categoría', (p) => p.category)}
            ${compareRow('Artesano', (p) => p.maker)}
            ${compareRow('Origen', (p) => p.state)}
            ${compareRow('Calificación', (p) => `${p.rating ?? 0} / 5 (${p.reviewCount ?? 0} reseñas)`)}
            ${compareRow('Disponibilidad', (p) => (p.inStock ? (p.stock ? `${p.stock} disponibles` : 'Disponible') : 'Agotado'))}
            ${compareRow('Verificado', (p) => (p.verified ? 'Sí' : 'No'))}
          </tbody>
        </table>

        <!-- Footer -->
        <div style="margin-top: 24px; border-top: 1px solid #E5E7EB; padding-top: 16px; text-align: center;">
          <p style="margin: 0; color: #6B7280; font-size: 12px;">Productos artesanales auténticos de México</p>
          <p style="margin: 4px 0 0 0; color: #9CA3AF; font-size: 11px;">www.papalotemarket.mx</p>
        </div>
      </div>
    `;
  };

  const handleExportPDF = async () => {
    if (products.length === 0) {
      error('No hay productos para exportar.');
      return;
    }

    setIsExporting(true);
    info('Generando PDF...');

    try {
      // Dynamically import html2pdf only on client side
      const html2pdf = (await import('html2pdf.js')).default;

      // Create an isolated container with only inline styles (no Tailwind)
      const container = document.createElement('div');
      container.innerHTML = generatePDFContent();

      // Configure PDF options
      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `comparacion-productos-${new Date().toISOString().split('T')[0]}.pdf`,
        image: {
          type: 'jpeg' as const,
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
          // Ignore stylesheets to avoid lab() color parsing
          ignoreElements: (el: Element) => el.tagName === 'STYLE' || el.tagName === 'LINK',
        },
        jsPDF: {
          unit: 'mm' as const,
          format: 'a4' as const,
          orientation: 'landscape' as const,
        },
      };

      // Generate PDF
      await html2pdf().set(opt).from(container).save();

      success('PDF descargado exitosamente');

      // Track analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'comparison_exported_pdf', {
          products_count: products.length,
          success: true,
        });
      }
    } catch (err) {
      console.error('[ComparisonActions] Error generating PDF:', err);
      error('Error al generar el PDF. Intenta de nuevo.');

      // Track analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'comparison_exported_pdf', {
          products_count: products.length,
          success: false,
        });
      }
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-4 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Printer className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Imprimir</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Compartir</span>
        </button>

        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
            isExporting
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
          }`}
        >
          <Download
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isExporting ? 'animate-bounce' : ''}`}
          />
          <span className="hidden sm:inline">{isExporting ? 'Generando...' : 'Exportar PDF'}</span>
        </button>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        url={generateShareableLink()}
        title="Comparación de productos - Papalote Market"
        text={`Compara estos ${products.length} productos artesanales`}
      />
    </>
  );
}
