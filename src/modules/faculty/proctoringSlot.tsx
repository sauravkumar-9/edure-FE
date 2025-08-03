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

export default function ExamSchedulerPage() {
  const [showDialog, setShowDialog] = useState(false);
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

  const handleSaveDraft = () => {
    console.log("Save Draft");
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
        <Card className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Mock Exam
                </h3>
                <div className="flex items-center text-sm text-gray-600">
                  <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                  <span>13/01/2025, 15/01/2025</span>
                </div>
              </div>
              <Button variant="default" size="sm">
                Confirm Slots
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Exam Slots */}
              <div className="border rounded-md p-4 bg-gray-50">
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
                  Exam Slots
                </h4>
                <ul className="space-y-1">
                  <li className="text-sm text-gray-700">10:00 AM - 12:00 PM</li>
                  <li className="text-sm text-gray-700">2:00 PM - 4:00 PM</li>
                </ul>
              </div>

              {/* Cutoff Dates */}
              <div className="border rounded-md p-4 bg-gray-50">
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2 text-gray-500" />
                  Cutoff Dates
                </h4>
                <ul className="space-y-1">
                  <li className="text-sm text-gray-700">
                    <span className="font-medium">Student Reg:</span> 10/01/2025
                  </li>
                  <li className="text-sm text-gray-700">
                    <span className="font-medium">Booking:</span> 11/01/2025
                  </li>
                  <li className="text-sm text-gray-700">
                    <span className="font-medium">Teacher Confirm:</span>{" "}
                    12/01/2025
                  </li>
                </ul>
              </div>

              {/* Status */}
              <div className="border rounded-md p-4 bg-gray-50">
                <h4 className="font-medium text-gray-700 mb-2 flex items-center">
                  <UsersIcon className="h-4 w-4 mr-2 text-gray-500" />
                  Status
                </h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Students Registered:</span>
                    <span className="font-medium">42/60</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Teachers Confirmed:</span>
                    <span className="font-medium">8/10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Slots Finalized:</span>
                    <Badge
                      variant="outline"
                      className="text-green-600 border-green-200"
                    >
                      Completed
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
