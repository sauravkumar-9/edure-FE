import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import clsx from "clsx";
import { ConfirmationDialog } from "@/components/dialog/confirmationDialog";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentQuestion = questions[currentIndex];
  const totalAnswered = Object.keys(answers).length;
  const progress = (totalAnswered / questions.length) * 100;

  // Auto-scroll to current question
  useEffect(() => {
    questionRefs.current[currentIndex]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, [currentIndex]);

  // Timer countdown
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
    if (currentIndex < questions.length - 1)
      setCurrentIndex((prev) => prev + 1);
  };

  const handleSkip = () => {
    setVisited((prev) => new Set(prev).add(currentQuestion.id));
    setSelectedOption(null);
    if (currentIndex < questions.length - 1)
      setCurrentIndex((prev) => prev + 1);
  };

  const handleFinalSubmit = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50 px-4 py-10">
        <Card className="max-w-lg w-full text-center shadow-xl border border-indigo-100">
          {/* Submission Message */}
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl font-semibold text-indigo-700">
              Exam Completed 🎉
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              You have successfully submitted your exam.
            </p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-gray-700 text-base">
              <p>
                <strong>{totalAnswered}</strong> out of{" "}
                <strong>{questions.length}</strong> questions answered.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Results will be shared via your registered email once evaluation
                is complete.
              </p>
              <p className="text-sm text-muted-foreground">
                If you have any queries, contact the exam administrator.
              </p>
            </div>

            <Button
              variant="outline"
              className="mt-4"
              onClick={() => (window.location.href = "/")}
            >
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden flex bg-gray-50 px-4 py-6 md:px-8 gap-6">
      {/* Left Panel */}
      <div className="w-16 md:w-70 flex flex-col gap-6">
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

        {/* Question List */}
        <Card className="flex-1 overflow-hidden gap-0">
          <CardHeader className="p-3">
            <CardTitle className="text-sm font-semibold text-gray-800">
              Navigate Questions
            </CardTitle>
            <p className="text-xs text-muted-foreground mt-1">
              Click a question number to jump and review or answer it.
            </p>
          </CardHeader>
          <CardContent className="px-4 py-2 space-y-2 overflow-y-auto max-h-[calc(100vh-10rem)]">
            {questions.map((q, idx) => {
              const attempted = answers[q.id];
              const seen = visited.has(q.id);
              const active = currentIndex === idx;
              return (
                <button
                  key={q.id}
                  ref={(el) => {
                    questionRefs.current[idx] = el;
                  }}
                  onClick={() => setCurrentIndex(idx)}
                  className={clsx(
                    "w-full text-left p-2 rounded-md border text-xs font-medium",
                    {
                      "bg-green-100 text-green-800 border-green-300": attempted,
                      "bg-yellow-100 text-yellow-800 border-yellow-300":
                        seen && !attempted,
                      "bg-gray-100 text-gray-600 border-gray-300": !seen,
                      "ring-2 ring-blue-500 border-blue-500": active,
                    }
                  )}
                >
                  <div className="flex flex-col leading-snug">
                    <span>Question {q.id}</span>
                    <span className="text-[11px] text-muted-foreground">
                      {attempted
                        ? "Answered"
                        : seen
                        ? "Skipped"
                        : "Not Visited"}
                    </span>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col h-full">
        {/* Fixed Top Header */}
        <div className="sticky top-0 z-20 bg-white px-4 md:px-6 py-3 border-b shadow-sm flex items-center gap-4">
          <span className="text-sm text-muted-foreground font-medium whitespace-nowrap">
            Answered{" "}
            <strong className="text-foreground">{totalAnswered}</strong> /{" "}
            {questions.length}
          </span>

          <Progress
            value={progress}
            className="h-2 flex-1 rounded-full bg-indigo-100"
          />

          <Button
            className="btn-primary"
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

        {/* Question & Options */}
        <Card className="flex-1 flex flex-col overflow-hidden">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Question {currentIndex + 1} of {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col overflow-auto">
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

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        open={showFinalDialog}
        onOpenChange={setShowFinalDialog}
        title="Confirm Exam Submission"
        description={`You have answered ${totalAnswered} out of ${questions.length} questions. Are you sure you want to submit the exam?`}
        confirmLabel="Submit Exam"
        cancelLabel="Cancel"
        onConfirm={handleFinalSubmit}
        isLoading={isSubmitting}
        disableConfirm={isSubmitting}
      />
    </div>
  );
}
