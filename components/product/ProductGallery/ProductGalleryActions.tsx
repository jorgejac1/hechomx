import { Share2, Download } from "lucide-react";

interface ProductGalleryActionsProps {
  onShare: () => void;
  onDownload: () => void;
  className?: string;
}

export function ProductGalleryActions({
  onShare,
  onDownload,
  className = "",
}: ProductGalleryActionsProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onShare();
        }}
        className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
        aria-label="Compartir imagen"
      >
        <Share2 className="w-4 h-4 text-gray-700" aria-hidden="true" />
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDownload();
        }}
        className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
        aria-label="Descargar imagen"
      >
        <Download className="w-4 h-4 text-gray-700" aria-hidden="true" />
      </button>
    </div>
  );
}