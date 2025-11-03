import Badge from "@/components/common/Badge";
import { Sparkles, Shield, Package } from "lucide-react";

export function ProductGalleryBadges() {
  return (
    <div
      className="flex flex-wrap items-center justify-center gap-2 text-xs"
      role="list"
    >
      <Badge
        variant="primary"
        size="sm"
        icon={<Sparkles className="w-3 h-3" aria-hidden="true" />}
        className="text-xs"
      >
        100% Hecho a Mano
      </Badge>

      <Badge
        variant="success"
        size="sm"
        icon={<Shield className="w-3 h-3" aria-hidden="true" />}
        className="text-xs"
      >
        Artesano Verificado
      </Badge>

      <Badge
        variant="info"
        size="sm"
        icon={<Package className="w-3 h-3" aria-hidden="true" />}
        className="text-xs"
      >
        Envío Nacional
      </Badge>
    </div>
  );
}