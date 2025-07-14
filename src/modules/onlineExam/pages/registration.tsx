// src/pages/exam-scheduling/stepper-layout.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  Calendar,
  BadgeCheck,
  BookOpen,
  MonitorCheck,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Stepper } from "../components/stepper";
import { PaymentPage } from "../components/payment";
import { SlotBookingPage } from "../components/slotBooking";
import { ConfirmationPage } from "../components/confirmation";
import { ExamBriefingPage } from "../components/examBriefing";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const steps = [
  {
    id: 1,
    name: "Briefing",
    icon: <Clock className="h-5 w-5" />,
    status: "complete",
  },
  {
    id: 2,
    name: "Payment",
    icon: <CreditCard className="h-5 w-5" />,
    status: "current",
  },
  {
    id: 3,
    name: "Slot Booking",
    icon: <Calendar className="h-5 w-5" />,
    status: "upcoming",
  },
  {
    id: 4,
    name: "Confirmation",
    icon: <BadgeCheck className="h-5 w-5" />,
    status: "upcoming",
  },
];

export function ExamStepperLayout() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showBriefPopup, setShowBriefPopup] = useState(false);
  const navigate = useNavigate();

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <ExamBriefingPage onComplete={() => setCurrentStep(2)} />;
      case 2:
        return <PaymentPage onComplete={() => setCurrentStep(3)} />;
      case 3:
        return <SlotBookingPage onComplete={() => setCurrentStep(4)} />;
      case 4:
        return <ConfirmationPage />;
      default:
        return <ExamBriefingPage onComplete={() => setCurrentStep(2)} />;
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Fixed Welcome Banner */}
      <div className="bg-blue-600 text-white py-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto text-center">
          <div className="flex justify-center items-center space-x-4">
            <BookOpen className="h-8 w-8" />
            <h1 className="text-2xl font-bold">
              University Entrance Examination
            </h1>
            <MonitorCheck className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Floating Stepper Card */}
        <div className="absolute left-4 top-24 z-40 w-56">
          <Card className="shadow-lg">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold mb-4">
                Registration Progress
              </h2>
              <Stepper
                steps={steps}
                currentStep={currentStep}
                orientation="vertical"
              />

              {/* Quick Links */}
              <div className="mt-6 pt-4 border-t">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      className="text-blue-600 hover:text-blue-800 p-0"
                    >
                      <Info className="h-4 w-4 mr-2" />
                      About the Exam
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Exam Briefing</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <h3 className="font-semibold">Instructions:</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>50 multiple-choice questions</li>
                        <li>60 minutes duration</li>
                        <li>Stable internet connection required</li>
                        <li>No external resources allowed</li>
                      </ul>
                      <h3 className="font-semibold">Requirements:</h3>
                      <ul className="list-disc pl-5 space-y-2">
                        <li>Webcam and microphone</li>
                        <li>Chrome browser recommended</li>
                        <li>5 Mbps minimum internet speed</li>
                      </ul>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-8 ml-60">
          <div className="mx-auto max-w-3xl">{renderStepContent()}</div>
        </div>
      </div>
    </div>
  );
}
