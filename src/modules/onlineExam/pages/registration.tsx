import { useState } from "react";
import {
  BookOpen,
  MonitorCheck,
  Clock,
  CreditCard,
  Calendar,
  BadgeCheck,
  CheckCircle2,
  Info,
  PhoneCall,
  Mail,
} from "lucide-react";
import { ExamBriefingPage } from "../components/examBriefing";
import { PaymentPage } from "../components/payment";
import { SlotBookingPage } from "../components/slotBooking";
import { ConfirmationPage } from "../components/confirmation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

const steps = [
  {
    id: 1,
    name: "Briefing",
    icon: <Clock className="h-5 w-5" />,
    description: "Understand exam rules and requirements.",
  },
  {
    id: 2,
    name: "Payment",
    icon: <CreditCard className="h-5 w-5" />,
    description: "Pay your registration fee.",
  },
  {
    id: 3,
    name: "Slot Booking",
    icon: <Calendar className="h-5 w-5" />,
    description: "Choose date and time for your exam.",
  },
];

export function ExamStepperLayout() {
  const [currentStep, setCurrentStep] = useState(1);
  const userName = "Saurav";

  const progressPercent = Math.round(
    ((currentStep - 1) / (steps.length - 1)) * 100
  );
  const completedSteps = currentStep > 1 ? currentStep - 1 : 0;

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
        return null;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 h-24 bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-4">
            <img
              src="/university-logo.png"
              alt="University Logo"
              className="h-14 w-14 rounded-full bg-white p-1 shadow-md"
            />
            <div>
              <h1 className="text-2xl font-bold leading-tight">
                Academic University
              </h1>
              <p className="text-sm sm:text-base text-white/90 font-medium">
                National Entrance Examination 2024
              </p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="text-white text-sm sm:text-base text-right">
            <p className="font-medium">
              👋 Welcome, <span className="font-bold">{userName}</span>!
            </p>
            <p className="text-white/80">
              Let’s complete your exam registration.
            </p>
          </div>
        </div>
      </header>

      {/* Main Area */}
      <div className="flex flex-1 overflow-hidden pt-24">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r shadow-sm h-full flex flex-col justify-between">
          {/* Scrollable Content */}
          <div className="px-4 py-6 overflow-y-auto">
            {/* Progress */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-1">
                {completedSteps}/{steps.length} Steps Completed
              </p>
              <Progress value={progressPercent} className="h-2" />
            </div>

            <Separator className="my-4" />

            {/* Stepper */}
            <h2 className="text-lg font-semibold mb-4">Registration Steps</h2>
            {steps.map((step) => (
              <div
                key={step.id}
                className={`mb-4 p-3 rounded-lg ${
                  currentStep === step.id
                    ? "bg-indigo-50 border-l-4 border-indigo-600"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2 font-medium text-sm">
                  {currentStep > step.id ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : (
                    <span className="h-5 w-5 flex items-center justify-center text-xs rounded-full border border-gray-400">
                      {step.id}
                    </span>
                  )}
                  {step.name}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          {/* Fixed Footer inside Sidebar */}
          <div className="border-t px-4 py-4 space-y-3">
            {/* About Exam */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="text-indigo-600 hover:text-indigo-800 p-0"
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

            {/* Contact Us */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="link"
                  className="text-indigo-600 hover:text-indigo-800 p-0"
                >
                  <PhoneCall className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Need Help?</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 text-sm text-muted-foreground">
                  <p>
                    For any queries or assistance with the exam process, feel
                    free to reach out:
                  </p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-indigo-600" />
                    <span>support@academicuniv.edu</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneCall className="h-4 w-4 text-indigo-600" />
                    <span>+91 98765 43210</span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </aside>

        {/* Main Step Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-4xl mx-auto">{renderStepContent()}</div>
        </main>
      </div>
    </div>
  );
}
