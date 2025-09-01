"use client";

import { useEffect, useState } from "react";
import { ExamListCard } from "../components/examListCard";
import { Button } from "@/components/ui/button";
import { Info, Plus } from "lucide-react";
import { ConfigureExamDialog } from "../components/configureExamDialogContent";
import ComponentDialog from "@/components/dialog/componentDialog";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getExamCategoryList } from "../services/examBuilder";

// Skeleton loading component for ExamListCard
const ExamListCardSkeleton = () => {
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
};

export default function ExamCategoryList() {
  const [open, setOpen] = useState(false);
  const [exams, setExams] = useState([]);
  const [isExamCategoriesLoading, setIsExamCategoriesLoading] = useState(true); // Added loading state

  useEffect(() => {
    getExamCategory();
  }, []);

  const getExamCategory = async () => {
    setIsExamCategoriesLoading(true);
    const examCategory: any = await getExamCategoryList();
    setExams(examCategory);
    setIsExamCategoriesLoading(false);
  };

  const handleAddExam = (exam: { name: string; description: string }) => {
    console.log("Add Exam:", exam);
    const newExam = {
      id: String(Date.now()),
      ...exam,
    };
  };

  const tabsDetails = [
    {
      value: "confirm",
      label: "Confirm Slots",
      component: ConfigureExamDialog,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Exams</h1>
          <Button size="lg" variant="outline" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Exam
          </Button>
        </div>

        {/* Description section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <Info className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-blue-800 mb-1">
                Manage Your Exams
              </h3>
              <p className="text-sm text-blue-700">
                Create and organize exams for your institution. Each exam can
                have multiple date slots, question banks, and registration
                settings. Use the status badges to track progress from draft to
                published and completed exams.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Exam List */}
      <div className="grid gap-4">
        {isExamCategoriesLoading ? (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <ExamListCardSkeleton key={index} />
            ))}
          </>
        ) : (
          // Show actual exam cards when data is loaded
          exams.map((examCategory: any) => (
            <ExamListCard
              key={examCategory.id}
              exam={{
                id: examCategory.id,
                name: examCategory.name,
                description: examCategory.description,
              }}
            />
          ))
        )}
      </div>
      <ComponentDialog
        tabsDetails={tabsDetails}
        isDialogOpen={open}
        dialogTitle="Add New Exam"
        dialogDescription="Add a new exam to the category"
        setIsDialogOpen={setOpen}
        handleActionConfimration={handleAddExam}
        handleDiscard={() => setOpen(false)}
      />
    </div>
  );
}
