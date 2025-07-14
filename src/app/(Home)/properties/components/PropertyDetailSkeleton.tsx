// Skeleton loader for Property Details Page
export default function PropertyDetailSkeleton() {
  return (
    <div className="max-w-screen-xl mx-auto animate-pulse">
      {/* Images Section */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 py-10">
        <div className="sm:col-span-3 h-[450px] bg-gray-300 rounded" />
        <div className="sm:col-span-2 grid grid-cols-2 sm:grid-cols-1 sm:grid-rows-2 gap-4 h-[450px]">
          <div className="h-full bg-gray-300 rounded" />
          <div className="h-full bg-gray-300 rounded" />
        </div>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 space-y-6 font-nunito">
          <div className="space-y-4">
            <div className="flex items-start gap-2">
              <div className="h-5 w-20 bg-gray-400 rounded-full" />
              <div className="h-5 w-12 bg-gray-400 rounded-full" />
            </div>
            <div className="h-8 w-40 bg-gray-400 rounded" />
            <div className="h-5 w-60 bg-gray-300 rounded" />
            <div className="flex gap-4">
              <div className="h-4 w-20 bg-gray-300 rounded" />
              <div className="h-4 w-20 bg-gray-300 rounded" />
              <div className="h-4 w-20 bg-gray-300 rounded" />
            </div>
          </div>

          <hr className="my-4" />

          <div>
            <div className="h-6 w-32 bg-gray-400 rounded mb-2" />
            <div className="h-4 w-full bg-gray-300 rounded mb-1" />
            <div className="h-4 w-5/6 bg-gray-300 rounded mb-1" />
            <div className="h-4 w-3/4 bg-gray-300 rounded" />
          </div>
        </div>

        {/* Map Section */}
        <div className="sm:col-span-1">
          <div className="w-full h-64 bg-gray-300 rounded-md" />
        </div>
      </div>

      {/* General Info + Amenities */}
      <div className="grid md:grid-cols-2 gap-6 py-6 sm:py-16">
        <div className="bg-gray-100 py-10 flex flex-col items-center space-y-4">
          <div className="h-6 w-48 bg-gray-400 rounded" />
          <div className="w-24 border border-gray-400" />
          <div className="space-y-3 w-2/3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 w-40 bg-gray-300 rounded" />
                <div className="h-4 w-20 bg-gray-300 rounded" />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-100 py-10 flex flex-col items-center space-y-4">
          <div className="h-6 w-48 bg-gray-400 rounded" />
          <div className="w-24 border border-gray-400" />
          <div className="grid grid-cols-2 gap-y-4 gap-x-4 w-2/3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 w-full bg-gray-300 rounded" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
