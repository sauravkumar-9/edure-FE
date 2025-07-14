// src/components/ui/stepper.tsx
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

interface Step {
  id: number;
  name: string;
  icon?: React.ReactNode;
  status: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
  orientation?: "horizontal" | "vertical";
}

export function Stepper({
  steps,
  currentStep,
  orientation = "vertical",
}: StepperProps) {
  return (
    <div
      className={cn(
        orientation === "vertical"
          ? "flex-col space-y-4"
          : "flex-row space-x-4",
        "flex"
      )}
    >
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={cn(
              "flex items-center justify-center rounded-full h-8 w-8",
              step.status === "complete" ? "bg-green-100 text-green-800" : "",
              step.status === "current" ? "bg-blue-100 text-blue-800" : "",
              step.status === "upcoming" ? "bg-gray-100 text-gray-800" : ""
            )}
          >
            {step.status === "complete" ? (
              <CheckCircle2 className="h-5 w-5" />
            ) : (
              <span className="font-medium">{step.id}</span>
            )}
          </div>
          <div
            className={cn(
              orientation === "vertical" ? "ml-4" : "ml-2",
              "flex flex-col"
            )}
          >
            <span
              className={cn(
                "text-sm font-medium",
                step.status === "current" ? "text-blue-800" : "text-gray-600"
              )}
            >
              {step.name}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div
              className={cn(
                orientation === "vertical" ? "h-8 w-px ml-4" : "h-px w-8",
                "bg-gray-200"
              )}
            />
          )}
        </div>
      ))}
    </div>
  );
}
