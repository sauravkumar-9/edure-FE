import DialogDataAction from "@/components/dialog/dialogDataAction";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  AlertTriangle,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
} from "lucide-react";
import { useState } from "react";
import TeacherAvailabilityForm from "./confirmAvailability";
import { Button } from "@/components/ui/button";

interface ExamDetailsCardProps {
  examData: {
    examId: string;
    title: string;
    isDraft: boolean;
    dates: Array<{
      day: string;
      date: string;
      slots: string[];
    }>;
    cutoffs: Array<{
      label: string;
      date: string;
    }>;
    status: {
      studentsRegistered: string;
      teachersConfirmed: string;
    };
  };
  getConfirmSlots?: (schedule: any) => void;
}

export default function ExamDetailsCard({
  examData,
  getConfirmSlots,
}: ExamDetailsCardProps) {
  const [showSlotConfirmationDialog, setShowSlotConfirmationDialog] =
    useState(false);

  const handleSaveDraft = () => {
    console.log("Save Draft");
  };

  const handleConfirmSlots = () => {
    setShowSlotConfirmationDialog(true);
    getConfirmSlots?.(examData);
  };

  const confirmSlotsTabDetails = [
    {
      value: "confirm",
      label: "Confirm Slots",
      component: TeacherAvailabilityForm,
      props: {
        examSchedule: examData.dates,
      },
    },
  ];

  const formattedDates = examData.dates.map((d) => d.date).join(", ");

  return (
    <Card className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {examData.title}
            {examData.isDraft && (
              <Badge
                variant="outline"
                className="ml-2 text-yellow-600 border-yellow-200"
              >
                Draft
              </Badge>
            )}
          </h3>
          <div className="flex items-center text-sm text-gray-600">
            <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
            <span>{formattedDates}</span>
          </div>
        </div>

        <Button variant="default" onClick={handleConfirmSlots}>
          Confirm Slots
        </Button>

        <DialogDataAction
          isDialogOpen={showSlotConfirmationDialog}
          setIsDialogOpen={setShowSlotConfirmationDialog}
          tabsDetails={confirmSlotsTabDetails}
          actionButtonLabel="Confirm Slots"
          dialogTitle="Confirm exam slots"
          handleSaveDraft={handleSaveDraft}
          handleScheduleDrive={handleConfirmSlots}
          handleDiscard={() => setShowSlotConfirmationDialog(false)}
        />
      </div>

      {/* Section: Exam Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {/* Cutoff Dates */}
        <div className="border rounded-md p-4 bg-gray-50">
          <h4 className="font-medium text-gray-700 mb-2 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-gray-500" />
            Cutoff Dates
          </h4>
          <ul className="space-y-1">
            {examData.cutoffs.map((cutoff, index) => (
              <li key={index} className="text-sm text-gray-700">
                <span className="font-medium">{cutoff.label}:</span>{" "}
                {cutoff.date}
              </li>
            ))}
          </ul>
        </div>

        {/* Status */}
        <div className="border rounded-md p-4 bg-gray-50">
          <h4 className="font-medium text-gray-700 mb-2 flex items-center">
            <UsersIcon className="h-4 w-4 mr-2 text-gray-500" />
            Registration Status
          </h4>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Students Registered:</span>
              <span className="font-medium">
                {examData.status.studentsRegistered}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Teachers Confirmed:</span>
              <span className="font-medium">
                {examData.status.teachersConfirmed}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Section: Exam Slots */}
      <div>
        <h4 className="font-medium text-gray-800 mb-4 flex items-center text-base">
          <ClockIcon className="h-4 w-4 mr-2 text-gray-600" />
          Exam Slots
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {examData.dates.map((date, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-md p-4 bg-gray-50"
            >
              <h5 className="font-semibold text-sm text-gray-700 mb-2">
                {date.day}, {date.date}
              </h5>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-800">
                {date.slots.map((slot, slotIndex) => (
                  <li key={slotIndex}>{slot}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
