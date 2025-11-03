"use client";

import { useState, RefObject } from "react";
import { useToast } from "@/contexts/ToastContext";
import ShareModal from "@/components/common/ShareModal";
import { Product } from "@/types";
import { Printer, Share2, Download } from "lucide-react";

interface ComparisonActionsProps {
  products: Product[];
  tableRef: RefObject<HTMLDivElement | null>
}

export default function ComparisonActions({
  products,
  tableRef,
}: ComparisonActionsProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const { info, success, error } = useToast();

  const handlePrint = () => {
    window.print();

    // Track analytics
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "comparison_printed", {
        products_count: products.length,
      });
    }
  };

  const generateShareableLink = () => {
    const productIds = products.map((p) => p.id).join(",");
    return `${window.location.origin}/comparar?products=${productIds}`;
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleExportPDF = async () => {
    if (!tableRef.current) {
      error("No se pudo generar el PDF. Intenta de nuevo.");
      return;
    }

    setIsExporting(true);
    info("Generando PDF...");

    try {
      // Dynamically import html2pdf only on client side
      const html2pdf = (await import("html2pdf.js")).default;

      // Clone the element to avoid modifying the original
      const element = tableRef.current.cloneNode(true) as HTMLElement;

      // Remove interactive elements from the clone
      const buttons = element.querySelectorAll("button");
      buttons.forEach((btn) => btn.remove());

      const links = element.querySelectorAll("a");
      links.forEach((link) => {
        // Remove links but keep text
        const text = link.textContent;
        const span = document.createElement("span");
        span.textContent = text;
        span.className = link.className;
        link.replaceWith(span);
      });

      // Remove "Ver detalles" rows
      const verDetallesRows = element.querySelectorAll(
        'td:has(a[href*="/producto/"]), .product-actions'
      );
      verDetallesRows.forEach((row) => {
        const parent = row.closest("tr");
        if (parent) parent.remove();
      });

      // Create a wrapper with header and footer
      const wrapper = document.createElement("div");
      wrapper.style.padding = "20px";
      wrapper.style.fontFamily = "Arial, sans-serif";

      // Add header
      const header = document.createElement("div");
      header.style.marginBottom = "20px";
      header.style.borderBottom = "2px solid #0D9488";
      header.style.paddingBottom = "10px";
      header.innerHTML = `
        <h1 style="margin: 0; color: #0D9488; font-size: 24px;">Hecho en México</h1>
        <p style="margin: 5px 0 0 0; color: #666; font-size: 14px;">
          Comparación de Productos - ${new Date().toLocaleDateString("es-MX", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      `;

      // Add the comparison table
      wrapper.appendChild(header);
      wrapper.appendChild(element);

      // Add footer
      const footer = document.createElement("div");
      footer.style.marginTop = "20px";
      footer.style.borderTop = "1px solid #E5E7EB";
      footer.style.paddingTop = "10px";
      footer.style.textAlign = "center";
      footer.style.color = "#666";
      footer.style.fontSize = "12px";
      footer.innerHTML = `
        <p style="margin: 0;">Productos artesanales auténticos de México</p>
        <p style="margin: 5px 0 0 0;">www.hechoenmexico.com</p>
      `;
      wrapper.appendChild(footer);

      // Configure PDF options with proper TypeScript types
      const opt = {
        margin: [10, 10, 10, 10] as [number, number, number, number],
        filename: `comparacion-productos-${new Date().toISOString().split("T")[0]}.pdf`,
        image: {
          type: "jpeg" as "jpeg",
          quality: 0.98,
        },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
        },
        jsPDF: {
          unit: "mm" as "mm",
          format: "a4" as "a4",
          orientation: "landscape" as "landscape",
        },
      };

      // Generate PDF from the wrapper
      await html2pdf().set(opt).from(wrapper).save();

      success("PDF descargado exitosamente");

      // Track analytics
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "comparison_exported_pdf", {
          products_count: products.length,
          success: true,
        });
      }
    } catch (err) {
      console.error("Error generating PDF:", err);
      error("Error al generar el PDF. Intenta de nuevo.");

      // Track analytics
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "comparison_exported_pdf", {
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
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "text-gray-700 bg-white border border-gray-300 hover:bg-gray-50"
          }`}
        >
          <Download
            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
              isExporting ? "animate-bounce" : ""
            }`}
          />
          <span className="hidden sm:inline">
            {isExporting ? "Generando..." : "Exportar PDF"}
          </span>
        </button>
      </div>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
        url={generateShareableLink()}
        title="Comparación de productos - Hecho en México"
        text={`Compara estos ${products.length} productos artesanales`}
      />
    </>
  );
}