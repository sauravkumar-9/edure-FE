"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { QuestionDialog } from "../components/questionDialog";
import {
  Question,
  defaultNewQuestion,
  Difficulty,
} from "../types/questionBankTypes";
import QuestionMockResponse from "../mock/getQuestions.json";
import { QuestionCardList } from "../components/questionCard";

export default function QuestionBank() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeTab, setActiveTab] = useState<Difficulty>("easy");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Omit<Question, "id">>({
    ...defaultNewQuestion,
  });
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    setQuestions(QuestionMockResponse.questions);
  }, []);

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

      <Tabs
        defaultValue={activeTab}
        onValueChange={(v) => setActiveTab(v as Difficulty)}
      >
        <TabsList>
          <TabsTrigger value="easy">Easy</TabsTrigger>
          <TabsTrigger value="medium">Medium</TabsTrigger>
          <TabsTrigger value="hard">Hard</TabsTrigger>
        </TabsList>

        {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
          <TabsContent value={diff} key={diff}>
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
          </TabsContent>
        ))}
      </Tabs>

      <QuestionDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        question={{ id: editId || "", ...currentQuestion }}
        onQuestionChange={(q) => {
          const { id, ...questionData } = q;
          setCurrentQuestion(questionData);
        }}
        onSubmit={handleAddOrEdit}
        isEditing={!!editId}
      />
    </div>
  );
}
