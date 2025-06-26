import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Course } from "@/types/student";
import { cn } from "@/lib/utils";

interface CourseCardProps {
  course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "In Progress":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-amber-100 text-amber-800";
      case "Completed":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCompletionColor = (percentage: number) => {
    if (percentage === 100) return "border-green-500 text-green-500";
    if (percentage > 50) return "border-purple-500 text-purple-500";
    return "border-gray-300 text-gray-500";
  };

  return (
    <Card className={cn("gap-6 py-6")}>
      <div className="flex">
        <div className="w-[120px] h-[120px] relative overflow-hidden border-r">
          <img
            src={course.imageSrc}
            alt={course.title}
            className="w-full object-cover"
          />
        </div>
        <CardContent className="flex-1 p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-4 flex-1">
              <div>
                <h3 className="text-xl font-medium mb-2">{course.title}</h3>
                <div className="flex flex-wrap gap-3 mb-2">
                  <Badge className={`${getStatusBadgeColor(course.status)}`}>
                    {course.status}
                  </Badge>
                  <div className="text-sm text-gray-600">
                    Enrollment ID: {course.enrollmentId}
                  </div>
                  <div className="text-sm text-gray-600">
                    Expiring in: {course.expiringIn}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-4">
              <Button variant="outline" size="sm" className="gap-1">
                View on LMS
                <ChevronRight className="h-4 w-4" />
              </Button>

              <div
                className={`w-20 h-20 rounded-full border-4 ${getCompletionColor(
                  course.completionPercentage
                )} flex items-center justify-center`}
              >
                <div className="text-center">
                  <div className="font-bold text-lg">
                    {course.completionPercentage}%
                  </div>
                  <div className="text-xs">Completed</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
