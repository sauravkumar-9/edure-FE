"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Question, Difficulty } from "../questionBankTypes";
import { useState } from "react";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface QuestionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  question: Question;
  onQuestionChange: (question: Question) => void;
  onSubmit: () => void;
  isEditing: boolean;
}

export function QuestionDialog({
  question,
  onQuestionChange,
}: QuestionDialogProps) {
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...question.options];
    updatedOptions[index] = value;
    onQuestionChange({ ...question, options: updatedOptions });
  };
  const [question2, setQuestion2] = useState("");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="question-text">Question</Label>
        {/* <Textarea
              id="question-text"
              placeholder="Enter question text"
              value={question.text}
              onChange={(e) =>
                onQuestionChange({ ...question, text: e.target.value })
              }
            /> */}
        <div>
          <textarea
            value={question2}
            onChange={(e) => setQuestion2(e.target.value)}
            placeholder="Enter LaTeX, e.g. \\vec{a} + \\vec{b}"
            rows={3}
            className="w-full border rounded px-2 py-1"
          />
          <div className="mt-1">
            <span className="text-sm font-medium">Preview:</span>
            <div className="p-4 border rounded-md bg-gray-50">
              {question2 ? (
                <div className="text-left">
                  <BlockMath math={question2} />
                </div>
              ) : (
                <p className="text-gray-400 italic">
                  LaTeX preview will appear here...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Options</Label>
        <div className="grid grid-cols-1 gap-3">
          {question.options.map((option, index) => (
            <div key={option.optionId} className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded bg-muted font-medium">
                {String.fromCharCode(65 + index)}
              </div>
              <Input
                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                value={option.optionLabel}
                onChange={(e) => handleOptionChange(index, e.target.value)}
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
            value={question.correctOptionId}
            onChange={(e) =>
              onQuestionChange({
                ...question,
                correctOptionId: Number(e.target.value),
              })
            }
          >
            {question.options.map((option, idx) => (
              <option value={option.optionId} key={option.optionId}>
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
  );
}
