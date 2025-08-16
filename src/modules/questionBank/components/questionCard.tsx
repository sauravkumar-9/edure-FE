"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Question } from "../questionBankTypes";

export function QuestionCardList({
  questions,
  onEdit,
  onDelete,
}: {
  questions: Question;
  onEdit: (question: Question) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Card
      key={questions.id}
      className="flex flex-col h-full hover:shadow-md transition-shadow w-full"
    >
      <CardHeader className="space-y-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-base font-medium line-clamp-2 flex-1">
            {questions.text}
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-2">
        {questions.options.map((opt, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 p-2 rounded ${
              idx === questions.correctIndex
                ? "bg-green-50 border border-green-200"
                : "bg-muted"
            }`}
          >
            <div className="flex items-center justify-center h-6 w-6 rounded-full bg-background border font-medium text-sm">
              {String.fromCharCode(65 + idx)}
            </div>
            <div className="flex-1 text-sm">{opt}</div>
          </div>
        ))}

        <div className="flex flex-col gap-2 mt-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              Difficulty:
            </span>
            <Badge
              variant="outline"
              className={`capitalize ${
                questions.difficulty === "Easy"
                  ? "bg-green-50 text-green-700 border-green-200"
                  : questions.difficulty === "Medium"
                  ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                  : "bg-red-50 text-red-700 border-red-200"
              }`}
            >
              {questions.difficulty}
            </Badge>
          </div>

          {questions.tags.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-muted-foreground">
                Tags:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {questions.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-4 border-t">
        <div className="w-full flex justify-between items-center pt-4">
          <div className="text-xs text-muted-foreground space-y-1">
            <div className="flex items-center gap-1">
              <span className="font-medium">Code:</span>
              <span className="font-mono">{questions.code}</span>
            </div>
            <div>
              <span className="font-medium">Created:</span>{" "}
              {format(questions.createdAt, "MMM d, yyyy")} by{" "}
              {questions.createdBy.name}
            </div>
            <div>
              <span className="font-medium">Used:</span> {questions.timesUsed}{" "}
              time{questions.timesUsed !== 1 ? "s" : ""}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8"
              onClick={() => onEdit(questions)}
            >
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              className="h-8"
              onClick={() => onDelete(questions.id)}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
