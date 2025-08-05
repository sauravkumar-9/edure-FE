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
import { useState } from "react";
import { toast } from "sonner";
import { QuestionDialog } from "../components/questionDialog";
import { Question, defaultNewQuestion, Difficulty } from "../types";

export default function QuestionBank() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [activeTab, setActiveTab] = useState<Difficulty>("easy");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Omit<Question, "id">>({
    ...defaultNewQuestion,
  });
  const [editId, setEditId] = useState<string | null>(null);

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

  const handleEdit = (q: Question) => {
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {questions
                .filter((q) => q.difficulty === diff)
                .map((q) => (
                  <Card key={q.id}>
                    <CardHeader>
                      <CardTitle className="text-base">{q.text}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {q.options.map((opt, idx) => (
                        <div
                          key={idx}
                          className={`px-2 py-1 rounded border ${
                            idx === q.correctIndex
                              ? "border-green-500 bg-green-50"
                              : "border-gray-200"
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}. {opt}
                        </div>
                      ))}
                      <div className="flex gap-2 pt-2">
                        {q.tags.map((tag, i) => (
                          <Badge key={i} variant="outline">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(q)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(q.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
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
