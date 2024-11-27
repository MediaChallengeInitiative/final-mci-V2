export function StaffSkeleton({ count = 8 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="relative rounded-2xl overflow-hidden bg-gray-200 animate-pulse"
        >
          <div className="aspect-w-3 aspect-h-4" />
        </div>
      ))}
    </div>
  );
}
