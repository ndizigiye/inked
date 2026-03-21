export default function DashboardLoading() {
  return (
    <div className="pt-32 pb-20 px-12 max-w-screen-2xl mx-auto min-h-screen">
      {/* Header skeleton */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-3">
          <div className="h-12 w-72 bg-surface-container-low rounded animate-pulse" />
          <div className="h-4 w-48 bg-surface-container-low rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="bg-surface-container-low p-4 rounded-lg h-20 w-36 animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="bg-surface-container-low rounded-xl overflow-hidden animate-pulse"
          >
            <div className="h-48 bg-surface-container" />
            <div className="p-6 space-y-3">
              <div className="h-6 w-3/4 bg-surface-container rounded" />
              <div className="h-4 w-full bg-surface-container rounded" />
              <div className="h-4 w-2/3 bg-surface-container rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
