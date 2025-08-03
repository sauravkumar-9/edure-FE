import ConfigDialog from "@/components/final/configDialog";
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
  examSchedule: any;
  getConfirmSlots?: (schedule: any) => void;
}

export default function ExamDetailsCard({
  examData,
  getConfirmSlots,
  examSchedule,
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
        examSchedule: examSchedule,
      },
    },
  ];

  // Format dates for display
  const formattedDates = examData.dates.map((d) => d.date).join(", ");

  return (
    <Card className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-4">
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
          <ConfigDialog
            isDialogOpen={showSlotConfirmationDialog}
            setIsDialogOpen={setShowSlotConfirmationDialog}
            tabsDetails={confirmSlotsTabDetails}
            actionButtonLabel="Confirm Slots"
            dialogTitle="Confirm exam slots"
            isDraft={true}
            handleSaveDraft={examData.isDraft ? handleSaveDraft : undefined}
            handleActionConfimration={handleConfirmSlots}
            handleDiscard={() => setShowSlotConfirmationDialog(false)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Exam Slots */}
          <div className="border rounded-md p-4 bg-gray-50">
            <h4 className="font-medium text-gray-700 mb-2 flex items-center">
              <ClockIcon className="h-4 w-4 mr-2 text-gray-500" />
              Exam Slots
            </h4>
            <div className="space-y-4">
              {examData.dates.map((date, index) => (
                <div key={index}>
                  <h5 className="font-medium text-gray-800 mb-1">
                    {date.day}, {date.date}
                  </h5>
                  <ul className="ml-4 space-y-1">
                    {date.slots.map((slot, slotIndex) => (
                      <li key={slotIndex} className="text-sm text-gray-700">
                        {slot}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

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
              Status
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
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Slots Finalized:</span>
                <Badge
                  variant={examData.isDraft ? "outline" : "default"}
                  className={
                    examData.isDraft
                      ? "text-gray-600 border-gray-200"
                      : "text-green-600 border-green-200"
                  }
                >
                  {examData.isDraft ? "Pending" : "Completed"}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
