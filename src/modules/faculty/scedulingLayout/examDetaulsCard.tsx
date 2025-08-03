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

export default function ExamDetailsCard(props: any) {
  const { examSchedule, getConfirmSlots } = props;

  const [showSlotConfirmationDialog, setShowSlotConfirmationDialog] =
    useState(false);

  const handleSaveDraft = () => {
    console.log("Save Draft");
  };

  const handleConfirmSlots = () => {
    setShowSlotConfirmationDialog(true);
    getConfirmSlots(examSchedule);
  };

  const confirmSlotsTabDetails = [
    {
      value: "confirm",
      label: "Confirm",
      component: TeacherAvailabilityForm,
      props: {
        examSchedule: examSchedule,
      },
    },
  ];

  return (
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
          <ConfigDialog
            isDialogOpen={showSlotConfirmationDialog}
            setIsDialogOpen={setShowSlotConfirmationDialog}
            tabsDetails={confirmSlotsTabDetails}
            actionButtonLabel="Confirm Slots"
            dialogTitle="Confirm Your Availability"
            handleSaveDraft={handleSaveDraft}
            handleScheduleDrive={handleConfirmSlots}
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
                <span className="font-medium">Teacher Confirm:</span> 12/01/2025
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
  );
}
