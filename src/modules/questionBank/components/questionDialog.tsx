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
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Question, Difficulty } from "../types";

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
          <div className="space-y-2">
            <Label htmlFor="question-text">Question</Label>
            <Textarea
              id="question-text"
              placeholder="Enter question text"
              value={question.text}
              onChange={(e) =>
                onQuestionChange({ ...question, text: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>Options</Label>
            <div className="grid grid-cols-2 gap-3">
              {question.options.map((opt, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded bg-muted font-medium">
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <Input
                    placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    className="flex-1"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="space-y-2 flex-1 min-w-[200px]">
              <Label>Correct Answer</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={question.correctIndex}
                onChange={(e) =>
                  onQuestionChange({
                    ...question,
                    correctIndex: Number(e.target.value),
                  })
                }
              >
                {question.options.map((_, idx) => (
                  <option value={idx} key={idx}>
                    {String.fromCharCode(65 + idx)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 flex-1 min-w-[200px]">
              <Label>Difficulty</Label>
              <select
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
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
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <Input
              placeholder="Comma separated tags (e.g. algebra, geometry)"
              value={question.tags.join(",")}
              onChange={(e) =>
                onQuestionChange({
                  ...question,
                  tags: e.target.value.split(",").map((t) => t.trim()),
                })
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={onSubmit}>
            {isEditing ? "Update Question" : "Add Question"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
