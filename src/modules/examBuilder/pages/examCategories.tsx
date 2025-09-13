"use client";

import { useEffect, useState } from "react";
import { ExamListCard } from "../components/examListCard";
import { Button } from "@/components/ui/button";
import { Info, Plus } from "lucide-react";
import { ConfigureExamDialog } from "../components/configureExamDialogContent";
import ComponentDialog from "@/components/dialog/componentDialog";
import { getExamCategoryList } from "../services/examBuilder";
import ExamListCardSkeleton from "../skeletonComponents/examListCardSkeleton";
import PageInfo from "@/components/comman/pageInfo";

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
        <PageInfo
          title="Manage Your Exams"
          description="Create and organize exams for your institution. Each exam can have multiple date slots, question banks, and registration settings. Use the status badges to track progress from draft to published and completed exams."
          variant="blue"
        />
      </div>

      {/* Exam List */}
      <div className="grid gap-4">
        {isExamCategoriesLoading ? (
          <>
            {Array.from({ length: 3 }).map((_, index) => (
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
