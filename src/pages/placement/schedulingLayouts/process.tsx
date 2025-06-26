"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Process() {
  const [selectionProcess, setSelectionProcess] = useState("");
  const [testPlatform, setTestPlatform] = useState("");
  const [resumeDeadline, setResumeDeadline] = useState<Date>();
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label className="font-medium">Selection Process</Label>
        <Textarea
          value={selectionProcess}
          onChange={(e) => setSelectionProcess(e.target.value)}
          placeholder="Describe the selection process (e.g., Online Test → Technical Interview → HR Round)"
          className="min-h-[100px]"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Test Platform</Label>
          <Input
            value={testPlatform}
            onChange={(e) => setTestPlatform(e.target.value)}
            placeholder="e.g., HackerRank, AMCAT, etc."
          />
        </div>

        <div className="space-y-2">
          <Label>Resume Submission Deadline</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !resumeDeadline && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {resumeDeadline ? (
                  format(resumeDeadline, "PPP")
                ) : (
                  <span>Pick deadline</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={resumeDeadline}
                onSelect={setResumeDeadline}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
