import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { format } from "date-fns";

export function ConfirmationPage() {
  // Normally fetched from context or API
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
        <div className="text-center space-y-4">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="text-2xl font-bold text-gray-800">
            Registration Confirmed!
          </h1>
          <p className="text-muted-foreground text-sm">
            Your exam slot has been successfully booked.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Exam Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm text-gray-700">
            <div>
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

            <div className="pt-4 border-t">
              <p>
                A confirmation email has been sent to{" "}
                <span className="font-medium text-indigo-600">
                  {examDetails.email}
                </span>
                .
              </p>
              <p>
                Your exam link will be shared via email and will also be
                accessible here on this portal on the exam day.
              </p>
            </div>

            <div className="pt-4 border-t">
              <p>
                To know more about the exam process or get in touch, please use
                the <span className="font-medium">"About the Exam"</span> and{" "}
                <span className="font-medium">"Contact Us"</span> options in the
                sidebar.
              </p>
            </div>

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
