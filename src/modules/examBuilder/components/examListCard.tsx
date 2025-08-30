import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  FileText,
  MoreVertical,
  Trash2,
  Edit,
  Eye,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";

interface Exam {
  id: string;
  name: string;
  description: string;
  type?: string; // optional e.g. "Midterm", "Final", "Quiz"
  status?: "draft" | "published" | "completed"; // optional status field
}

interface ExamCardProps {
  exam: Exam;
  onViewDetails?: (id: string) => void;
  onViewQuestionBank?: (id: string) => void;
  onEditExam?: (id: string) => void;
  onDeleteExam?: (id: string) => void;
}

export const ExamListCard: React.FC<ExamCardProps> = ({
  exam,
  onViewDetails,
  onViewQuestionBank,
  onEditExam,
  onDeleteExam,
}) => {
  const navigate = useNavigate();

  // Status badge color based on exam status
  const getStatusVariant = (status?: string) => {
    switch (status) {
      case "published":
        return "default";
      case "completed":
        return "secondary";
      case "draft":
      default:
        return "outline";
    }
  };

  // Status badge text color based on exam status
  const getStatusColor = (status?: string) => {
    switch (status) {
      case "published":
        return "text-green-800 bg-green-100 border-green-200";
      case "completed":
        return "text-blue-800 bg-blue-100 border-blue-200";
      case "draft":
      default:
        return "text-gray-800 bg-gray-100 border-gray-200";
    }
  };

  return (
    <Card className="w-full bg-white hover:shadow-md transition-all duration-200 relative group">
      <CardContent className="p-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left Content */}
          <div className="flex items-start gap-4 flex-1 min-w-0">
            {/* Exam Icon */}
            <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-indigo-100 group-hover:bg-indigo-200 transition-colors">
              <FileText className="text-indigo-600 w-5 h-5" />
            </div>

            {/* Exam Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-gray-800 truncate">
                  {exam.name}
                </h3>
                {exam.status && (
                  <Badge
                    variant={getStatusVariant(exam.status)}
                    className={`text-xs ${getStatusColor(exam.status)}`}
                  >
                    {exam.status.charAt(0).toUpperCase() + exam.status.slice(1)}
                  </Badge>
                )}
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {exam.description}
              </p>

              {exam.type && (
                <Badge
                  variant="outline"
                  className="text-xs border-indigo-200 bg-indigo-50 text-indigo-700"
                >
                  {exam.type}
                </Badge>
              )}
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Primary Actions */}
            <Button
              size="sm"
              variant="outline"
              className="gap-1 hidden sm:flex"
              onClick={() => navigate(`/questions/exams/${exam.id}`)}
            >
              <BookOpen className="h-4 w-4" />
              <span>Question Bank</span>
            </Button>

            <Button
              size="sm"
              className="bg-indigo-600 text-white hover:bg-indigo-700 gap-1 hidden sm:flex"
              onClick={() => navigate(exam.id)}
            >
              <Eye className="h-4 w-4" />
              <span>View Details</span>
            </Button>

            {/* Dropdown Menu for Additional Actions */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() => navigate(exam.id)}
                  className="cursor-pointer"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>

                <DropdownMenuItem
                  onClick={() => navigate(`/questions/exams/${exam.id}`)}
                  className="cursor-pointer"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>

                {onEditExam && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => onEditExam(exam.id)}
                      className="cursor-pointer text-blue-600 focus:text-blue-600"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Exam
                    </DropdownMenuItem>
                  </>
                )}

                {onDeleteExam && (
                  <DropdownMenuItem
                    onClick={() => onDeleteExam(exam.id)}
                    className="cursor-pointer text-red-600 focus:text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Exam
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
