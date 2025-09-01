import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function QuestionCardSkeleton() {
  return (
    <Card className="flex flex-col h-full w-full">
      <CardHeader className="space-y-3">
        <div className="flex justify-between items-start gap-2">
          <Skeleton className="h-6 w-full" />
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-2 rounded bg-muted"
          >
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </CardContent>

      <CardFooter className="px-4 border-t">
        <div className="w-full flex justify-between items-center pt-4">
          <div className="text-xs text-muted-foreground space-y-2">
            <div className="flex items-center gap-1">
              <Skeleton className="h-3 w-10" />
              <Skeleton className="h-5 w-16" />
            </div>
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>

          <div className="flex gap-2">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
