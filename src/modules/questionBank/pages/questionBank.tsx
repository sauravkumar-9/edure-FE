"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { QuestionDialog } from "../components/questionDialog";
import { Question, defaultNewQuestion, Difficulty } from "../questionBankTypes";
import QuestionMockResponse from "../mock/getQuestions.json";
import { QuestionCardList } from "../components/questionCard";
import ComponentDialog from "@/components/dialog/componentDialog";
import TabLayout from "@/components/comman/tabLayout";

export default function QuestionBank() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeTab, setActiveTab] = useState<string>("easy");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Omit<Question, "id">>({
    ...defaultNewQuestion,
  });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    setQuestions(QuestionMockResponse.questions);
  }, []);

  const confirmSlotsTabDetails = [
    {
      value: "confirm",
      label: "Confirm Slots",
      component: QuestionDialog,
      props: {
        question: { id: editId || "", ...currentQuestion },
        onQuestionChange: (q: any) => {
          const { id, ...questionData } = q;
          setCurrentQuestion(questionData);
        },
      },
    },
  ];

  const handleAddOrEdit = () => {
    const isValid =
      currentQuestion.text && currentQuestion.options.every((o) => o);
    if (!isValid) {
      toast.error("Please fill all fields.");
      return;
    }

    if (editId) {
      setQuestions((prev) =>
        prev.map((q) => (q.id === editId ? { ...q, ...currentQuestion } : q))
      );
      toast.success("Question updated");
    } else {
      setQuestions((prev) => [
        ...prev,
        { id: crypto.randomUUID(), ...currentQuestion },
      ]);
      toast.success("Question added");
    }

    setCurrentQuestion({ ...defaultNewQuestion });
    setEditId(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (q: any) => {
    const { id, ...questionData } = q;
    setCurrentQuestion(questionData);
    setEditId(id);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    toast("Question deleted");
  };

  const tabs = [
    { value: "easy", label: "Easy" },
    { value: "medium", label: "Medium" },
    { value: "hard", label: "Hard" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Question Bank</h2>
        <Button
          onClick={() => {
            setIsDialogOpen(true);
            setEditId(null);
          }}
        >
          Add Question
        </Button>
      </div>

      <TabLayout
        mode="filter"
        value={activeTab}
        onChange={setActiveTab}
        tabs={tabs}
      />

      {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
        <div className="space-y-4">
          {questions
            .filter((q) => q.difficulty === diff)
            .map((q: any) => (
              <QuestionCardList
                questions={q}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
        </div>
      ))}

      <ComponentDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        tabsDetails={confirmSlotsTabDetails}
        actionButtonLabel={editId ? "Update Question" : "Add Question"}
        dialogTitle={editId ? "Update Question" : "Add Question"}
        handleScheduleDrive={handleAddOrEdit}
        handleDiscard={() => setIsDialogOpen(false)}
      />
    </div>
  );
}
