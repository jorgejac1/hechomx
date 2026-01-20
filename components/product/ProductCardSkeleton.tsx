export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
      <div className="h-56 bg-gray-200" />
      <div className="p-4">
        <div className="h-4 bg-gray-200 rounded-sm mb-2" />
        <div className="h-4 bg-gray-200 rounded-sm w-2/3 mb-3" />
        <div className="h-3 bg-gray-200 rounded-sm w-1/2 mb-2" />
        <div className="flex items-center justify-between mb-2">
          <div className="h-6 bg-gray-200 rounded-sm w-1/3" />
          <div className="h-4 bg-gray-200 rounded-sm w-1/4" />
        </div>
        <div className="h-3 bg-gray-200 rounded-sm w-3/4" />
      </div>
    </div>
  );
}