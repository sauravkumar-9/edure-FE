import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Chrome,
  Clock,
  Globe2,
  IdCard,
  Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export function ExamBriefingPage({ onComplete }: { onComplete: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Exam Briefing</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* University Info */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div className="flex items-center space-x-4">
                <div className="bg-white p-3 rounded-full shadow-sm">
                  <img
                    src="/university-logo.png"
                    alt="University Logo"
                    className="h-12 w-12"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg">
                    University of Academic Excellence
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Entrance Examination for 2024 Admissions
                  </p>
                </div>
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Instructions:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Clock className="text-blue-600 h-5 w-5 mt-1" />
                  <span>Duration: 60 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Info className="text-blue-600 h-5 w-5 mt-1" />
                  <span>
                    This exam consists of 50 multiple-choice questions
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock className="text-blue-600 h-5 w-5 mt-1" />
                  <span>You’ll have 60 minutes to complete the exam</span>
                </li>
                <li className="flex items-start gap-2">
                  <Globe2 className="text-blue-600 h-5 w-5 mt-1" />
                  <span>Ensure a stable internet connection</span>
                </li>
                <li className="flex items-start gap-2">
                  <BadgeCheck className="text-blue-600 h-5 w-5 mt-1" />
                  <span>No external resources are allowed</span>
                </li>
              </ul>
            </div>

            {/* Requirements */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Requirements:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Camera className="text-blue-600" />
                  <div>
                    <h4 className="font-medium">Webcam & Microphone</h4>
                    <p className="text-sm text-muted-foreground">
                      Required for proctoring
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Chrome className="text-blue-600" />
                  <div>
                    <h4 className="font-medium">Chrome Browser</h4>
                    <p className="text-sm text-muted-foreground">
                      Version 90 or above
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Globe2 className="text-blue-600" />
                  <div>
                    <h4 className="font-medium">Internet Speed</h4>
                    <p className="text-sm text-muted-foreground">
                      Minimum 5 Mbps
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <IdCard className="text-blue-600" />
                  <div>
                    <h4 className="font-medium">Valid ID</h4>
                    <p className="text-sm text-muted-foreground">
                      For verification
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t pt-6">
            <Button onClick={onComplete} className="w-full sm:w-auto ml-auto">
              Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
