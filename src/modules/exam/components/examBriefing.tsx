import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { WelcomeBanner } from "@/components/final/welcomeBanner";
import welcomeImage from "@/assets/vector/placementWelcome.png";
import { InstructionSection } from "./instructionSection";

// Simulated user name; replace with actual prop/context value as needed

export function ExamBriefingPage({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-white px-4 py-8 md:px-8 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col space-y-10">
        <WelcomeBanner
          welcomeMessage="Welcome, Ajay!"
          subMessage="Please review the following instructions and requirements before
            proceeding."
          imageUrl={welcomeImage}
          imageCustomClass="w-full max-w-[400px] md:max-w-[300px]"
        />

        <InstructionSection />

        {/* CTA */}
        <div className="pt-6 border-t">
          <div className="flex justify-end">
            <Button onClick={onComplete}>
              Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
