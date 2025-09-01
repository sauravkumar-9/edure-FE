import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const ExamDetailsCardSkeleton = () => {
  return (
    <Card className="bg-white border border-gray-200 rounded-xl p-6">
      {/* Header Section Skeleton */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-5 w-16" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-4 w-4 mr-1.5 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Skeleton className="h-9 w-32" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      {/* Section: Exam Details Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {/* Slots Skeleton */}
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-6 w-6 rounded-lg" />
            <Skeleton className="h-5 w-20" />
          </div>
          <div className="space-y-3">
            {[1, 2].map((item) => (
              <div
                key={item}
                className="pb-3 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <Skeleton className="h-4 w-32 mb-2" />
                <div className="space-y-1.5">
                  {[1, 2].map((slot) => (
                    <div key={slot} className="flex items-center gap-2">
                      <Skeleton className="h-2 w-2 rounded-full" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cutoff Dates Skeleton */}
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-6 w-6 rounded-lg" />
            <Skeleton className="h-5 w-28" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex justify-between items-center pb-2 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* Status Skeleton */}
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-2 mb-3">
            <Skeleton className="h-6 w-6 rounded-lg" />
            <Skeleton className="h-5 w-32" />
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-8" />
            </div>
            <div className="flex justify-between items-center">
              <Skeleton className="h-3 w-28" />
              <Skeleton className="h-3 w-8" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
