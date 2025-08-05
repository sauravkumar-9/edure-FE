"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Question, Difficulty } from "../types"; // You should define types in a separate file

interface QuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: Question;
  onQuestionChange: (question: Question) => void;
  onSubmit: () => void;
  isEditing: boolean;
}

export function QuestionDialog({
  open,
  onOpenChange,
  question,
  onQuestionChange,
  onSubmit,
  isEditing,
}: QuestionDialogProps) {
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = value;
    onQuestionChange({ ...question, options: updatedOptions });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Question" : "Add Question"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="Enter question"
            value={question.text}
            onChange={(e) =>
              onQuestionChange({ ...question, text: e.target.value })
            }
          />
          <div className="grid grid-cols-2 gap-2">
            {question.options.map((opt, idx) => (
              <Input
                key={idx}
                placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                value={opt}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label className="text-sm">Correct Answer:</label>
            <select
              className="border rounded px-2 py-1 text-sm"
              value={question.correctIndex}
              onChange={(e) =>
                onQuestionChange({
                  ...question,
                  correctIndex: Number(e.target.value),
                })
              }
            >
              {["A", "B", "C", "D"].map((opt, idx) => (
                <option value={idx} key={idx}>
                  {opt}
                </option>
              ))}
            </select>

            <select
              className="border rounded px-2 py-1 text-sm ml-auto"
              value={question.difficulty}
              onChange={(e) =>
                onQuestionChange({
                  ...question,
                  difficulty: e.target.value as Difficulty,
                })
              }
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <Input
            placeholder="Comma separated tags (e.g. algebra,math)"
            value={question.tags.join(",")}
            onChange={(e) =>
              onQuestionChange({
                ...question,
                tags: e.target.value.split(",").map((t) => t.trim()),
              })
            }
          />
        </div>

        <DialogFooter>
          <Button onClick={onSubmit}>
            {isEditing ? "Update" : "Add & Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
