"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface AddExamDialogProps {
  onAddExam: (exam: { name: string; description: string }) => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
}

export function ConfigureExamDialog({
  onAddExam,
  onOpenChange,
  open,
}: AddExamDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onAddExam({ name, description });
    setName("");
    setDescription("");
    onOpenChange(false);
  };

  return (
    <div className="space-y-4 py-2">
      <div className="space-y-2">
        <Label htmlFor="exam-name">Exam Name</Label>
        <Input
          id="exam-name"
          placeholder="Enter exam name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="exam-description">Description</Label>
        <Textarea
          id="description"
          placeholder="Brief description of the exam..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
}
