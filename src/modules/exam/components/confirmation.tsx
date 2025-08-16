import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileText } from "lucide-react";
import { format } from "date-fns";
import { SystemCheckDialog } from "./systemCheck";

export function ConfirmationPage() {
  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const examDetails = {
    date: new Date(),
    timeSlot: "2:00 PM - 3:00 PM",
    examId: "EXM-2023-00123",
    amountPaid: "₹500.00",
    email: "saurav.kumar@example.com",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4">
      <div className="w-full max-w-2xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="text-2xl font-bold text-gray-800">
            Registration Confirmed!
          </h1>
          <p className="text-muted-foreground text-sm">
            Your exam slot has been successfully booked.
          </p>
        </div>

        {/* Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Exam Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 text-sm text-gray-700">
            {/* Exam Info */}
            <div className="space-y-1">
              <p>
                <span className="font-medium">Exam ID:</span>{" "}
                {examDetails.examId}
              </p>
              <p>
                <span className="font-medium">Date:</span>{" "}
                {format(examDetails.date, "PPP")}
              </p>
              <p>
                <span className="font-medium">Time Slot:</span>{" "}
                {examDetails.timeSlot}
              </p>
              <p>
                <span className="font-medium">Amount Paid:</span>{" "}
                {examDetails.amountPaid}
              </p>
            </div>

            {/* Email Confirmation */}
            <div className="pt-4 border-t space-y-2">
              <p>
                A confirmation email has been sent to{" "}
                <span className="font-medium text-indigo-600">
                  {examDetails.email}
                </span>
                .
              </p>
              <p>
                Your exam link will be shared via email and also shown on this
                portal.
              </p>
              <p>
                You’ve already viewed the exam guidelines. You can revisit them
                below if needed.
              </p>
            </div>

            {/* System Check & Guidelines */}
            <div className="pt-4 border-t space-y-3">
              <div>
                <p className="font-semibold text-gray-800 mb-1">
                  System Check & Guidelines
                </p>
                <p className="text-muted-foreground text-sm mb-2">
                  Make sure your browser and webcam are functioning properly. If
                  needed, you can also revisit the exam guidelines.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
                <SystemCheckDialog />
                <Dialog
                  open={isExamDialogOpen}
                  onOpenChange={setIsExamDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      About the Exam
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-lg">
                    <DialogHeader>
                      <DialogTitle>About the Exam</DialogTitle>
                    </DialogHeader>
                    <div className="text-sm text-gray-600">
                      {/* You can add more detailed exam info here */}
                      Coming soon...
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Final Message */}
            <div className="pt-4 border-t">
              <p className="font-semibold text-green-600">
                ✅ Your registration is complete.
              </p>
              <p className="mt-1 text-gray-800 font-medium">
                Best of luck for your examination!
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
