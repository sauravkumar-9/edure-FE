import React, { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

interface Exam {
  id: string;
  name: string;
  description: string;
  type?: string;
  status?: "draft" | "published" | "completed";
}

interface ExamCardProps {
  exam: Exam;
  onUpdateExam?: (
    id: string,
    updated: { name: string; description: string }
  ) => void;
  onDeleteExam?: (id: string) => void;
}

export const ExamListCard: React.FC<ExamCardProps> = ({
  exam,
  onUpdateExam,
  onDeleteExam,
}) => {
  const navigate = useNavigate();

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [formData, setFormData] = useState({
    name: exam.name,
    description: exam.description,
  });

  // Status badge colors
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
    <>
      {/* Exam Card */}
      <Card className="w-full bg-white hover:shadow-md transition-all duration-200 relative group">
        <CardContent className="p-4">
          <div className="flex items-center justify-between gap-4">
            {/* Left Content */}
            <div className="flex items-start gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-indigo-100 group-hover:bg-indigo-200 transition-colors">
                <FileText className="text-indigo-600 w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold text-gray-800 truncate">
                    {exam.name}
                  </h3>
                  {exam.status && (
                    <Badge
                      variant="outline"
                      className={`text-xs ${getStatusColor(exam.status)}`}
                    >
                      {exam.status.charAt(0).toUpperCase() +
                        exam.status.slice(1)}
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                  {exam.description}
                </p>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 shrink-0">
              <Button
                size="sm"
                variant="outline"
                className="gap-1 hidden sm:flex"
                onClick={() => navigate(`/questions/exams/${exam.id}`)}
              >
                <BookOpen className="h-4 w-4" />
                Question Bank
              </Button>
              <Button
                size="sm"
                className="bg-indigo-600 text-white hover:bg-indigo-700 gap-1 hidden sm:flex"
                onClick={() => navigate(exam.id)}
              >
                <Eye className="h-4 w-4" />
                View Details
              </Button>

              {/* Dropdown Actions */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => setOpenEditDialog(true)}
                    className="cursor-pointer text-blue-600"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Exam
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => setOpenDeleteDialog(true)}
                    className="cursor-pointer text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Exam
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Exam</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Exam Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                onUpdateExam?.(exam.id, formData);
                setOpenEditDialog(false);
              }}
              className="bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this exam?
            </AlertDialogTitle>
          </AlertDialogHeader>
          <p className="text-sm text-gray-600">
            This action cannot be undone. All related data will be lost.
          </p>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                onDeleteExam?.(exam.id);
                setOpenDeleteDialog(false);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
