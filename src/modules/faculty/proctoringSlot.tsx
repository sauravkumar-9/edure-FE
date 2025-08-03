"use client";

import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Calendar,
  CalendarIcon,
  ClockIcon,
  Plus,
  UsersIcon,
  X,
} from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar22 } from "@/components/final/datePicket";
import { ExamDetailsTab } from "./scedulingLayout/examBasicDetails";
import { ExamSlotsTab } from "./scedulingLayout/examSlots";
import ConfigDialog from "@/components/final/configDialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/final/sectionHeading";
import TeacherAvailabilityForm from "./scedulingLayout/confirmAvailability";
import ExamDetailsCard from "./scedulingLayout/examDetaulsCard";

export default function ExamSchedulerPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [showSlotConfirmationDialog, setShowSlotConfirmationDialog] =
    useState(false);
  const [examName, setExamName] = useState("");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [slots, setSlots] = useState<
    Record<string, { start: string; end: string }[]>
  >({});
  const [studentCutoff, setStudentCutoff] = useState<Date>();
  const [teacherCutoff, setTeacherCutoff] = useState<Date>();
  const [lastRegDate, setLastRegDate] = useState<Date>();
  const [tab, setTab] = useState("details");

  const addSlot = (dateStr: string) => {
    setSlots((prev) => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), { start: "", end: "" }],
    }));
  };

  const removeSlot = (dateStr: string, index: number) => {
    setSlots((prev) => {
      const updated = [...(prev[dateStr] || [])];
      updated.splice(index, 1);
      return { ...prev, [dateStr]: updated };
    });
  };

  const updateSlot = (
    dateStr: string,
    index: number,
    key: "start" | "end",
    value: string
  ) => {
    setSlots((prev) => ({
      ...prev,
      [dateStr]: prev[dateStr].map((slot, i) =>
        i === index ? { ...slot, [key]: value } : slot
      ),
    }));
  };

  const handleSave = () => {
    console.log({
      examName,
      selectedDates,
      slots,
      studentCutoff,
      teacherCutoff,
      lastRegDate,
    });
    setShowDialog(false);
  };

  const tabsDetails = [
    {
      value: "details",
      label: "Details",
      component: ExamDetailsTab,
      props: {
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
      },
    },
    {
      value: "slots",
      label: "Slots",
      component: ExamSlotsTab,
      props: {
        selectedDates,
        slots,
        addSlot,
        removeSlot,
        updateSlot,
      },
    },
  ];

  const examSchedule = [
    {
      date: "2025-08-10",
      slots: ["9:00 AM - 11:00 AM", "1:00 PM - 3:00 PM"],
    },
    {
      date: "2025-08-12",
      slots: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"],
    },
  ];

  const handleSaveDraft = () => {
    console.log("Save Draft");
  };

  const handleConfirmSlots = (data: any) => {
    console.log(data);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">NUCAT Exam</h2>
        <ConfigDialog
          isDialogOpen={showDialog}
          setIsDialogOpen={setShowDialog}
          tabsDetails={tabsDetails}
          actionButtonLabel="Schedule New Exam"
          dialogTitle="Schedule New Exam"
          handleSaveDraft={handleSaveDraft}
          handleScheduleDrive={handleSave}
          handleDiscard={() => setShowDialog(false)}
        />
      </div>

      <div className="space-y-4">
        <ExamDetailsCard
          examSchedule={examSchedule}
          getConfirmSlots={handleConfirmSlots}
        />
      </div>
    </div>
  );
}
