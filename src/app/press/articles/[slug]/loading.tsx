// app/press/articles/[slug]/loading.tsx
export default function Loading() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Title Skeleton */}
          <div className="space-y-4 text-center">
            <div className="h-12 bg-gray-200 rounded-lg w-3/4 mx-auto animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto animate-pulse" />
          </div>

          {/* Image Skeleton */}
          <div className="aspect-video bg-gray-200 rounded-2xl animate-pulse" />

          {/* Content Skeleton */}
          <div className="space-y-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
