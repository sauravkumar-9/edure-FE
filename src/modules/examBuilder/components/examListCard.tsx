import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, FileText } from "lucide-react"; // using FileText for exam
import { Badge } from "@/components/ui/badge";

interface Exam {
  id: string;
  name: string;
  description: string;
  type?: string; // optional e.g. "Midterm", "Final", "Quiz"
}

interface ExamCardProps {
  exam: Exam;
}

export const ExamListCard: React.FC<ExamCardProps> = ({ exam }) => {
  return (
    <Card className="w-full bg-white hover:shadow-lg transition-shadow duration-200 relative">
      <CardContent className="px-4">
        <div className="flex items-center justify-between">
          {/* Left Content */}
          <div className="flex items-start gap-4">
            {/* Exam Icon */}
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-indigo-100">
              <FileText className="text-indigo-600" />
            </div>

            {/* Exam Info */}
            <div>
              <h3 className="font-semibold text-base text-gray-800">
                {exam.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {exam.description}
              </p>

              {exam.type && (
                <Badge
                  variant="outline"
                  className="text-xs border-gray-300 bg-gray-50 mt-2"
                >
                  {exam.type}
                </Badge>
              )}
            </div>
          </div>

          {/* Right Chevron */}
          <ChevronRight className="h-5 w-5 text-gray-400 mt-1" />
        </div>
      </CardContent>
    </Card>
  );
};
