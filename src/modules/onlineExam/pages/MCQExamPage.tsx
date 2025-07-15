import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import clsx from "clsx";
import { Info } from "lucide-react";

const questions = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  question: `Sample question ${i + 1}?`,
  options: ["Option A", "Option B", "Option C", "Option D"],
}));

const examDurationMinutes = 10;

export function MCQExamPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(examDurationMinutes * 60);
  const [showFinalDialog, setShowFinalDialog] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const questionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (questionRefs.current[currentIndex]) {
      questionRefs.current[currentIndex]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [currentIndex]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQuestion = questions[currentIndex];
  const totalAnswered = Object.keys(answers).length;
  const progress = (totalAnswered / questions.length) * 100;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleAnswerSubmit = () => {
    if (!selectedOption) return;
    const id = currentQuestion.id;
    setAnswers((prev) => ({ ...prev, [id]: selectedOption }));
    setVisited((prev) => new Set(prev).add(id));
    setSelectedOption(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    setVisited((prev) => new Set(prev).add(currentQuestion.id));
    setSelectedOption(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleFinalSubmit = () => {
    console.log("Final submitted answers:", answers);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4 py-10">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <CardTitle>Exam Submitted Successfully</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700">
              Thank you! Your exam has been submitted.
              <br />
              You answered <strong>{totalAnswered}</strong> out of{" "}
              {questions.length} questions.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8 flex gap-6">
      {/* Left Panel */}
      <div className="w-16 md:w-48 flex flex-col gap-6 sticky top-6">
        {/* Timer */}
        <Card className="text-center">
          <CardHeader className="p-3">
            <CardTitle className="text-xs text-muted-foreground">
              TIME REMAINING
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 pb-3">
            <div className="text-2xl font-bold text-red-600">
              {formatTime(timeLeft)}
            </div>
          </CardContent>
        </Card>

        {/* Navigation */}
        <Card className="flex-1 overflow-y-auto max-h-[calc(100vh-10rem)]">
          <CardHeader className="p-3">
            <CardTitle className="text-xs text-muted-foreground">
              QUESTIONS
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 space-y-2">
            {questions.map((q, idx) => {
              const attempted = answers[q.id];
              const seen = visited.has(q.id);
              return (
                <button
                  key={q.id}
                  ref={(el) => {
                    questionRefs.current[idx] = el;
                  }}
                  onClick={() => setCurrentIndex(idx)}
                  className={clsx(
                    "w-full rounded-md p-2 text-sm font-medium flex items-center justify-center transition-colors",
                    {
                      "bg-green-100 text-green-800 border border-green-300":
                        attempted,
                      "bg-yellow-100 text-yellow-800 border border-yellow-300":
                        seen && !attempted,
                      "bg-gray-100 text-gray-600 border border-gray-300": !seen,
                      "ring-2 ring-blue-500 border-blue-500":
                        currentIndex === idx,
                    }
                  )}
                >
                  <span className="hidden md:inline">Question</span> {q.id}
                </button>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col h-[calc(100vh-3rem)]">
        {/* Fixed Header */}
        <div className="sticky top-0 bg-white z-10 pt-4 pb-2 border-b flex justify-between items-center gap-4">
          <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
            Answered {totalAnswered} / {questions.length}
          </span>
          <Progress value={progress} className="h-3 flex-1" />
          <Button
            variant="destructive"
            onClick={() => setShowFinalDialog(true)}
          >
            Submit Exam
          </Button>
        </div>

        {/* Alert */}
        <Alert variant="destructive" className="mt-4 mb-4">
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm space-y-1">
            <ul className="list-disc pl-4 space-y-1">
              <li>This exam is being proctored.</li>
              <li>Video and screen are recorded.</li>
              <li>Do not switch tabs or close the browser.</li>
              <li>Time expiry will auto-submit your exam.</li>
            </ul>
          </AlertDescription>
        </Alert>

        {/* Question */}
        <Card className="flex-1 flex flex-col">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Question {currentIndex + 1} of {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            <div className="flex-1">
              <p className="text-gray-800 text-lg mb-6">
                {currentQuestion.question}
              </p>
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((opt, idx) => {
                  const selected = selectedOption === opt;
                  return (
                    <button
                      key={idx}
                      onClick={() => setSelectedOption(opt)}
                      className={clsx(
                        "border rounded-lg p-4 text-left transition-all",
                        selected
                          ? "bg-blue-50 border-blue-600 text-blue-700 shadow-sm"
                          : "hover:border-blue-400 hover:bg-blue-50"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={clsx(
                            "h-5 w-5 rounded-full border flex items-center justify-center flex-shrink-0",
                            selected
                              ? "bg-blue-600 border-blue-700"
                              : "border-gray-300"
                          )}
                        >
                          {selected && (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-white"
                            >
                              <polyline points="20 6 9 17 4 12" />
                            </svg>
                          )}
                        </div>
                        <span>{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between pt-6 mt-4 border-t gap-2 flex-wrap">
              <Button
                variant="outline"
                onClick={() => setCurrentIndex((prev) => prev - 1)}
                disabled={currentIndex === 0}
                className="min-w-24"
              >
                Previous
              </Button>
              <div className="flex gap-2 ml-auto">
                <Button
                  variant="secondary"
                  onClick={handleSkip}
                  className="min-w-24"
                >
                  Skip
                </Button>
                <Button
                  onClick={handleAnswerSubmit}
                  disabled={!selectedOption}
                  className="min-w-24"
                >
                  Submit Answer
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submit Confirmation Dialog */}
      <Dialog open={showFinalDialog} onOpenChange={setShowFinalDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Exam Submission</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600">
            You have answered {totalAnswered} out of {questions.length}{" "}
            questions. Are you sure you want to submit the exam?
          </p>
          <DialogFooter>
            <Button
              variant="secondary"
              onClick={() => setShowFinalDialog(false)}
            >
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleFinalSubmit}>
              Submit Exam
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
