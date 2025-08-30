import ComponentDialog from "@/components/dialog/componentDialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { AlertTriangle, CalendarIcon, UsersIcon, Eye } from "lucide-react";
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

  const handleViewDetails = () => {
    console.log("View Exam Details:", examData.examId);
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
    <Card className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center">
            {examData.title}
            {examData.isDraft && (
              <Badge
                variant="outline"
                className="ml-2 text-yellow-700 border-yellow-300 bg-yellow-50"
              >
                Draft
              </Badge>
            )}
          </h3>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
            <span>{formattedDates}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button size="sm" onClick={handleConfirmSlots}>
            Confirm Slots
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewDetails}
            className="flex items-center"
          >
            <Eye className="w-4 h-4 mr-1" />
            View Details
          </Button>
        </div>

        <ComponentDialog
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
        {/* Slots */}
        <div className="rounded-lg border bg-gray-50 p-4 shadow-sm">
          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2 text-indigo-500" />
            Slots
          </h4>
          {examData.dates.map((date, index) => (
            <div key={index} className="mb-3">
              <h5 className="font-semibold text-sm text-gray-800">
                {date.day}, {date.date}
              </h5>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 ml-2">
                {date.slots.map((slot, slotIndex) => (
                  <li key={slotIndex}>{slot}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Cutoff Dates */}
        <div className="rounded-lg border bg-gray-50 p-4 shadow-sm">
          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2 text-red-500" />
            Cutoff Dates
          </h4>
          <ul className="space-y-1 text-sm text-gray-700">
            {examData.cutoffs.map((cutoff, index) => (
              <li key={index}>
                <span className="font-medium">{cutoff.label}:</span>{" "}
                {cutoff.date}
              </li>
            ))}
          </ul>
        </div>

        {/* Status */}
        <div className="rounded-lg border bg-gray-50 p-4 shadow-sm">
          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
            <UsersIcon className="h-4 w-4 mr-2 text-green-500" />
            Registration Status
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Students Registered:</span>
              <span className="font-semibold text-gray-900">
                {examData.status.studentsRegistered}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Teachers Confirmed:</span>
              <span className="font-semibold text-gray-900">
                {examData.status.teachersConfirmed}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
