import { Skeleton } from "@/components/ui/skeleton"

export default function PropertyCardSkeleton() {
  return (
    <div className="max-w-sm w-full rounded-lg shadow-lg border overflow-hidden bg-white">
      {/* Top Image Skeleton */}
      <div className="relative">
        <Skeleton className="w-full h-48" />

        {/* Badges */}
        <div className="absolute top-2 left-2 space-y-1">
          <Skeleton className="w-20 h-5 rounded-full" />
          <Skeleton className="w-12 h-5 rounded-full" />
        </div>
      </div>

      {/* Card Body Skeleton */}
      <div className="p-4 space-y-3">
        <Skeleton className="w-20 h-5 rounded-md" /> {/* Tag: For Rent */}
        <Skeleton className="w-32 h-7 rounded-md" /> {/* Price */}
        <Skeleton className="w-40 h-4 rounded" />     {/* Address */}

        <div className="pt-2 mt-3 border-t flex justify-between items-center">
          <Skeleton className="w-16 h-4" /> {/* Size */}
          <div className="flex gap-3">
            <Skeleton className="w-10 h-4" />
            <Skeleton className="w-10 h-4" />
            <Skeleton className="w-10 h-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
