"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Building2, FileText, Users2, MessageSquare } from "lucide-react";

const DashboardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6">
      {/* Welcome Section Skeleton */}
      <div className="flex flex-col gap-2">
        <Skeleton className="h-9 w-64" />
        <Skeleton className="h-5 w-80" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="relative overflow-hidden">
            <div className="absolute right-4 top-4 rounded-full bg-muted p-2.5">
              {i === 0 ? <Building2 className="h-5 w-5 text-muted-foreground" /> : 
               i === 1 ? <FileText className="h-5 w-5 text-muted-foreground" /> : 
               i === 2 ? <MessageSquare className="h-5 w-5 text-muted-foreground" /> : 
               <Users2 className="h-5 w-5 text-muted-foreground" />}
            </div>
            <CardHeader className="pb-2">
              <Skeleton className="h-5 w-24" />
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-2">
                <Skeleton className="h-8 w-12" />
                <Skeleton className="h-4 w-10 mb-1" />
              </div>
              <Skeleton className="h-4 w-full mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section Skeleton */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-12">
        <Card className="lg:col-span-6">
          <CardHeader>
            <Skeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent className="pl-2 h-[300px]">
            <Skeleton className="h-full w-full" />
          </CardContent>
        </Card>
        <Card className="lg:col-span-6">
          <CardHeader>
            <Skeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent className="h-[300px]">
            <Skeleton className="h-full w-full " />
          </CardContent>
        </Card>
      </div>

      {/* Blog and Team Sections Skeleton */}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <Skeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full" />
                  <div className="flex gap-1">
                    <Skeleton className="h-4 w-12 rounded-full" />
                    <Skeleton className="h-4 w-12 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-3">
          <CardHeader>
            <Skeleton className="h-6 w-36" />
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <Skeleton className="h-16 w-16 rounded-full" />
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSkeleton;