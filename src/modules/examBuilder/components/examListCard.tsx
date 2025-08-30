import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Exam {
  id: string;
  name: string;
  description: string;
  type?: string; // optional e.g. "Midterm", "Final", "Quiz"
}

interface ExamCardProps {
  exam: Exam;
  onViewDetails?: (id: string) => void;
  onViewQuestionBank?: (id: string) => void;
}

export const ExamListCard: React.FC<ExamCardProps> = ({
  exam,
  onViewDetails,
  onViewQuestionBank,
}) => {
  const navigate = useNavigate();
  return (
    <Card className="w-full bg-white hover:shadow-md transition-all duration-200 relative">
      <CardContent className="px-4 py-1">
        <div className="flex items-center justify-between gap-4">
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

          {/* Right Actions */}
          <div className="flex gap-2 shrink-0">
            <Button
              size="sm"
              variant="outline"
              onClick={() => navigate(`/questions/exams/${exam.id}`)}
            >
              Question Bank
            </Button>
            <Button
              size="sm"
              className="bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={() => navigate(exam.id)}
            >
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
