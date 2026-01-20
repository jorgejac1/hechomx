import { Product } from "@/types";
import { CheckCircle, XCircle } from "lucide-react";

interface ComparisonProsConsProps {
  products: Product[];
}

export default function ComparisonProsCons({
  products,
}: ComparisonProsConsProps) {
  const avgPrice =
    products.reduce((sum, p) => sum + p.price, 0) / products.length;
  const minPrice = Math.min(...products.map((p) => p.price));
  const maxRating = Math.max(...products.map((p) => p.rating || 0));

  const getPros = (product: Product) => {
    const pros: string[] = [];

    if ((product.rating || 0) >= 4.5) pros.push("Excelente calificación");
    if ((product.rating || 0) === maxRating && maxRating > 0)
      pros.push("Mejor valorado");
    if (product.price === minPrice) pros.push("Precio más bajo");
    if (product.price < avgPrice * 0.9) pros.push("Buen precio");
    if (product.inStock) pros.push("Disponible inmediatamente");
    if (product.verified) pros.push("Producto verificado");
    if (product.featured) pros.push("Producto destacado");
    if ((product.reviewCount || 0) > 100) pros.push("Muy reseñado");

    return pros;
  };

  const getCons = (product: Product) => {
    const cons: string[] = [];

    if (!product.inStock) cons.push("No disponible actualmente");
    if (product.price > avgPrice * 1.1)
      cons.push("Precio más alto que el promedio");
    if ((product.rating || 0) < 4.0) cons.push("Calificación moderada");
    if ((product.reviewCount || 0) < 50) cons.push("Pocas reseñas");
    if (!product.verified) cons.push("Sin verificar");

    return cons;
  };

  return (
    <div className="bg-white rounded-xl shadow-xs p-4 sm:p-6 md:p-8 mb-8">
      <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
        Ventajas y Desventajas
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((product) => {
          const pros = getPros(product);
          const cons = getCons(product);

          return (
            <div
              key={product.id}
              className="bg-gray-50 rounded-lg p-4 border-2 border-gray-200"
            >
              <h3 className="font-bold text-sm sm:text-base text-gray-900 mb-3 sm:mb-4 line-clamp-2">
                {product.name}
              </h3>

              {/* Pros */}
              <div className="mb-3 sm:mb-4">
                <p className="text-xs sm:text-sm font-semibold text-green-700 mb-2 flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Ventajas
                </p>
                {pros.length > 0 ? (
                  <ul className="text-xs sm:text-sm space-y-1 text-gray-700">
                    {pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-500 italic">
                    Sin ventajas destacadas
                  </p>
                )}
              </div>

              {/* Cons */}
              <div>
                <p className="text-xs sm:text-sm font-semibold text-red-700 mb-2 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  Desventajas
                </p>
                {cons.length > 0 ? (
                  <ul className="text-xs sm:text-sm space-y-1 text-gray-700">
                    {cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-red-600 mt-0.5">✗</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-gray-500 italic">
                    Sin desventajas significativas
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
