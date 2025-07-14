// src/pages/exam-scheduling/confirmation.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { CheckCircle2, Printer } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export function ConfirmationPage() {
  const navigate = useNavigate();
  // These would typically come from state/context/params
  const examDetails = {
    date: new Date(),
    timeSlot: "2:00 PM - 3:00 PM",
    examId: "EXM-2023-00123",
    amountPaid: "₹500.00",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          <CardTitle className="text-2xl font-bold mt-4">
            Booking Confirmed!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Exam Details:</h3>
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
          </div>

          <div className="border-t pt-4 space-y-2">
            <h3 className="font-semibold">What's Next?</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>You'll receive a confirmation email with exam details</li>
              <li>Login 15 minutes before your scheduled time</li>
              <li>Have your ID ready for verification</li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="mr-2 h-4 w-4" /> Print Receipt
          </Button>
          <Button onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
