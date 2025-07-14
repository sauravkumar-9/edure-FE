// src/pages/exam-scheduling/briefing.tsx
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { ArrowRight, BookOpen, Clock, MonitorCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

export function ExamBriefingPage({ onComplete }: { onComplete: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Main Content - now using full width */}
      <div className="mx-auto py-12 px-4 w-full max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Exam Journey Steps - adjusted width */}
          <div className="lg:w-1/4">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  Your Exam Journey
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <Badge className="h-8 w-8 flex items-center justify-center">
                    1
                  </Badge>
                  <div>
                    <h4 className="font-medium">Exam Briefing</h4>
                    <p className="text-sm text-muted-foreground">
                      Understand the exam requirements
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Badge
                    variant="outline"
                    className="h-8 w-8 flex items-center justify-center"
                  >
                    2
                  </Badge>
                  <div>
                    <h4 className="font-medium">Payment</h4>
                    <p className="text-sm text-muted-foreground">
                      Secure your exam slot
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Badge
                    variant="outline"
                    className="h-8 w-8 flex items-center justify-center"
                  >
                    3
                  </Badge>
                  <div>
                    <h4 className="font-medium">Slot Booking</h4>
                    <p className="text-sm text-muted-foreground">
                      Choose your exam date & time
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Badge
                    variant="outline"
                    className="h-8 w-8 flex items-center justify-center"
                  >
                    4
                  </Badge>
                  <div>
                    <h4 className="font-medium">Exam Day</h4>
                    <p className="text-sm text-muted-foreground">
                      Take your entrance test
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Exam Briefing Card - now using more width */}
          <div className="lg:w-3/4">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-2xl font-bold">
                    Exam Briefing
                  </CardTitle>
                  <Badge variant="outline" className="px-4 py-1 w-fit">
                    <Clock className="mr-2 h-4 w-4" />
                    60 Minutes Duration
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* University Branding */}
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

                {/* Instructions Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Instructions:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 text-blue-800 rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 12l4 4 4-4" />
                        </svg>
                      </span>
                      <span>
                        This exam consists of 50 multiple-choice questions
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 text-blue-800 rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 12l4 4 4-4" />
                        </svg>
                      </span>
                      <span>You'll have 60 minutes to complete the exam</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 text-blue-800 rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 12l4 4 4-4" />
                        </svg>
                      </span>
                      <span>
                        Make sure you have a stable internet connection
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="bg-blue-100 text-blue-800 rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 12l4 4 4-4" />
                        </svg>
                      </span>
                      <span>No external resources are allowed</span>
                    </li>
                  </ul>
                </div>

                {/* Requirements Section */}
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Requirements:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="6" width="20" height="12" rx="2" />
                          <circle cx="12" cy="12" r="2" />
                          <path d="M6 12h.01M18 12h.01" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Webcam & Microphone</h4>
                        <p className="text-sm text-muted-foreground">
                          Required for proctoring
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
                          <path d="M18 14h-8" />
                          <path d="M15 18h-5" />
                          <path d="M10 6h8v4h-8V6Z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Chrome Browser</h4>
                        <p className="text-sm text-muted-foreground">
                          Version 90 or above
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Internet Speed</h4>
                        <p className="text-sm text-muted-foreground">
                          Minimum 5 Mbps
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect
                            width="18"
                            height="11"
                            x="3"
                            y="11"
                            rx="2"
                            ry="2"
                          />
                          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                        </svg>
                      </div>
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
                <Button variant="outline" className="w-full sm:w-auto">
                  Save for Later
                </Button>
                <Button
                  onClick={onComplete}
                  className="w-full sm:w-auto ml-auto"
                >
                  Proceed to Payment <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
