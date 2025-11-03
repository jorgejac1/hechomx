import { ReactNode } from 'react';

interface ComparisonRowProps {
  label: string;
  values: (string | number | ReactNode)[];
  showOnlyDifferences: boolean;
  hasDifference: boolean;
}

export default function ComparisonRow({
  label,
  values,
  showOnlyDifferences,
  hasDifference,
}: ComparisonRowProps) {
  // Hide row if showing only differences and values are the same
  if (showOnlyDifferences && !hasDifference) {
    return null;
  }

  const gridCols = `grid-cols-[200px_repeat(${values.length},1fr)]`;

  return (
    <div
      className={`grid ${gridCols} gap-4 p-4 transition-colors ${
        hasDifference ? 'bg-yellow-50' : 'hover:bg-gray-50'
      }`}
    >
      <div className="font-semibold text-gray-900 flex items-center">
        {label}
        {hasDifference && (
          <span className="ml-2 text-xs bg-yellow-200 text-yellow-800 px-2 py-0.5 rounded-full">
            Diferente
          </span>
        )}
      </div>
      {values.map((value, index) => (
        <div key={index} className="text-center flex items-center justify-center">
          {typeof value === 'string' || typeof value === 'number' ? (
            <span className="text-gray-700">{value}</span>
          ) : (
            value
          )}
        </div>
      ))}
    </div>
  );
}