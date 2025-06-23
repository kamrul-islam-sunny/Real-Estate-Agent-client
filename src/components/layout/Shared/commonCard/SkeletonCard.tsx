'use client'

import { CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function SkeletonCard() {
  return (
    <div className="w-full rounded-lg overflow-hidden border border-gray-100">
      {/* Image Skeleton */}
      <div className="relative">
        <Skeleton className="w-full h-52" />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-12 rounded-full" />
        </div>
      </div>

      <CardContent className="space-y-3 p-4">
        <Skeleton className="w-16 h-5 rounded-md" />
        <Skeleton className="w-24 h-6 rounded-md" />
        <Skeleton className="w-3/4 h-4 rounded-md" />

        {/* Bottom Info */}
        <div className="flex items-center justify-between border-t pt-3 mt-3">
          <Skeleton className="w-16 h-4" />
          <div className="flex gap-3">
            <Skeleton className="w-8 h-4" />
            <Skeleton className="w-8 h-4" />
            <Skeleton className="w-8 h-4" />
          </div>
        </div>
      </CardContent>
    </div>
  )
}
