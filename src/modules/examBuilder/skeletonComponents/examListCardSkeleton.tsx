import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ExamListCardSkeleton() {
  return (
    <Card className="w-full bg-white">
      <CardContent className="px-4 py-2">
        <div className="flex items-center justify-between gap-4">
          {/* Left Content Skeleton */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            <Skeleton className="w-12 h-12 rounded-lg" />
            <div className="flex-1 min-w-0 space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-5 w-16" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>

          {/* Right Actions Skeleton */}
          <div className="flex items-center gap-2 shrink-0">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-9 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
