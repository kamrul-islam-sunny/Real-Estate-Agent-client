import { Skeleton } from "@/components/ui/skeleton"

export function FormSkeleton() {
  return (
    <div className="space-y-10">
      {/* Heading Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>

      {/* Form Fields Skeleton */}
      <div className="pt-5 sm:pt-7 lg:pt-8 2xl:pt-10 lg:w-[60%] space-y-10">
        {/* Member Name Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Designation Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-10 w-full" />
        </div>

        {/* Image Upload Field */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px]" />
          <Skeleton className="h-32 w-full" />
        </div>

        {/* Submit Button */}
        <Skeleton className="h-10 w-[150px]" />
      </div>
    </div>
  )
}