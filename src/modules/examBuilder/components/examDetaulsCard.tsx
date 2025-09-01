import ComponentDialog from "@/components/dialog/componentDialog";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  AlertTriangle,
  CalendarIcon,
  UsersIcon,
  Eye,
  NotebookText,
  Check,
  CalendarCheck,
  Clock,
} from "lucide-react";
import { useState } from "react";
import TeacherAvailabilityForm from "./confirmAvailability";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
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
    navigate(`/exam/${examData.examId}`);
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
    <Card className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-all duration-300 ease-in-out">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-900">
              {examData.title}
            </h3>
            {examData.isDraft && (
              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200">
                Draft
              </Badge>
            )}
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <CalendarIcon className="h-4 w-4 mr-1.5 text-blue-500" />
            <span>{formattedDates}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button onClick={handleConfirmSlots} className="btn-primary">
            <CalendarCheck className="w-4 h-4" />
            Confirm Slots
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("1")}
            className="btn-primary"
          >
            <NotebookText className="w-4 h-4" />
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
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {/* Slots */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <Clock className="h-4 w-4 text-blue-600" />
            </div>
            Slots
          </h4>
          <div className="space-y-3">
            {examData.dates.map((date, index) => (
              <div
                key={index}
                className="pb-3 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <h5 className="font-medium text-sm text-gray-800 mb-2">
                  {date.day}, {date.date}
                </h5>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {date.slots.map((slot, slotIndex) => (
                    <li key={slotIndex} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                      <span>{slot}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Cutoff Dates */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <div className="p-1.5 bg-rose-100 rounded-lg">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
            </div>
            Important Dates
          </h4>
          <ul className="space-y-3">
            {examData.cutoffs.map((cutoff, index) => (
              <li
                key={index}
                className="flex justify-between items-center pb-2 border-b border-gray-100 last:border-0 last:pb-0"
              >
                <span className="text-sm text-gray-600">{cutoff.label}:</span>
                <span className="text-sm font-medium text-gray-900">
                  {cutoff.date}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Status */}
        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <div className="p-1.5 bg-emerald-100 rounded-lg">
              <UsersIcon className="h-4 w-4 text-emerald-600" />
            </div>
            Registration Status
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <span className="text-sm text-gray-600">
                Students Registered:
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {examData.status.studentsRegistered}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Teachers Confirmed:</span>
              <span className="text-sm font-semibold text-gray-900">
                {examData.status.teachersConfirmed}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
