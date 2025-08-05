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

interface Question {
  id: string;
  question: string;
  options: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  tags: string[];
}

export function QuestionCardList({
  questions,
  onEdit,
  onDelete,
}: {
  questions: Question[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {questions.map((q) => (
        <Card key={q.id}>
          <CardHeader>
            <CardTitle className="text-base font-medium">
              {q.question}
            </CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline" className="capitalize">
                {q.difficulty}
              </Badge>
              {q.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardHeader>

          <CardContent className="space-y-1">
            {q.options.map((opt, idx) => (
              <div
                key={idx}
                className="border rounded px-2 py-1 text-sm text-muted-foreground bg-muted"
              >
                {String.fromCharCode(65 + idx)}. {opt}
              </div>
            ))}
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button size="sm" variant="outline" onClick={() => onEdit(q.id)}>
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(q.id)}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
