"use client";

import { useState } from "react";
import { ExamListCard } from "../components/examListCard";
import examCatgoryListMock from "../mock/examCatgory.json";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ConfigureExamDialog } from "../components/configureExamDialogContent";
import ComponentDialog from "@/components/dialog/componentDialog";

export default function ExamCategoryList() {
  const [open, setOpen] = useState(false);
  const [exams, setExams] = useState(examCatgoryListMock.examCategory);

  const handleAddExam = (exam: { name: string; description: string }) => {
    console.log("Add Exam:", exam);
    const newExam = {
      id: String(Date.now()),
      ...exam,
    };
    setExams((prev) => [...prev, newExam]);
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
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Exams</h1>
        <Button
          className="bg-indigo-600 text-white hover:bg-indigo-700 flex items-center gap-2"
          onClick={() => setOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add Exam
        </Button>
      </div>

      {/* Exam List */}
      <div className="grid gap-4">
        {examCatgoryListMock.examCategory.map((examCategory) => (
          <ExamListCard
            key={examCategory.id}
            exam={{
              id: examCategory.id,
              name: examCategory.name,
              description: examCategory.description,
            }}
          />
        ))}
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
