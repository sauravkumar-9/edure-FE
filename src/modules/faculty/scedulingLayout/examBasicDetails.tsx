"use client";

import { Calendar22 } from "@/components/final/datePicket";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ExamDetailsTabProps {
  examName: string;
  setExamName: (name: string) => void;
  selectedDates: Date[];
  setSelectedDates: (dates: Date[]) => void;
  studentCutoff?: Date;
  setStudentCutoff: (date?: Date) => void;
  teacherCutoff?: Date;
  setTeacherCutoff: (date?: Date) => void;
  lastRegDate?: Date;
  setLastRegDate: (date?: Date) => void;
}

export function ExamDetailsTab({
  examName,
  setExamName,
  selectedDates,
  setSelectedDates,
  studentCutoff,
  setStudentCutoff,
  teacherCutoff,
  setTeacherCutoff,
  lastRegDate,
  setLastRegDate,
}: ExamDetailsTabProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Exam Name</Label>
        <Input
          placeholder="Enter exam name"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
          className="w-full"
        />
      </div>

      <Calendar22
        selectedDates={selectedDates}
        onSelectDates={setSelectedDates}
        label="Select Exam Dates"
        multiSelect
        className="w-full"
      />

      <Calendar22
        selected={studentCutoff}
        onSelect={setStudentCutoff}
        label="Student Slot Booking Cutoff"
        className="w-full"
      />

      <Calendar22
        selected={teacherCutoff}
        onSelect={setTeacherCutoff}
        label="Teacher Slot Confirmation Cutoff"
        className="w-full"
      />

      <Calendar22
        selected={lastRegDate}
        onSelect={setLastRegDate}
        label="Student Registration Cutoff"
        className="w-full"
      />
    </div>
  );
}
