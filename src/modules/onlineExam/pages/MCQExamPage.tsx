import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import clsx from "clsx";

type Question = {
  id: number;
  question: string;
  options: string[];
};

const questions: Question[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  question: `Sample question ${
    i + 1
  }? This is a longer question text to demonstrate how the layout handles multi-line questions in the exam interface.`,
  options: ["Option A", "Option B", "Option C", "Option D"],
}));

const examDurationMinutes = 10;

export function MCQExamPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [visited, setVisited] = useState<Set<number>>(new Set());
  const [timeLeft, setTimeLeft] = useState(examDurationMinutes * 60);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentQuestion = questions[currentIndex];
  const isAnswered = !!answers[currentQuestion.id];
  const isVisited = visited.has(currentQuestion.id);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleOptionSelect = (value: string) => {
    setAnswers({ ...answers, [currentQuestion.id]: value });
    setVisited((prev) => new Set(prev).add(currentQuestion.id));
  };

  const handleSkip = () => {
    setVisited((prev) => new Set(prev).add(currentQuestion.id));
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSubmit = () => {
    console.log("Submitted answers:", answers);
    alert("Exam Submitted!");
  };

  const totalAnswered = Object.keys(answers).length;
  const progress = (totalAnswered / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 md:px-8 flex gap-6">
      {/* Left Panel: Timer + Question Nav (Stacked) */}
      <div className="w-16 md:w-48 flex flex-col gap-6">
        {/* Timer - Larger and bolder */}
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

        {/* Question Navigation - Stacked */}
        <Card className="flex-1 overflow-y-auto">
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

      {/* Right Panel: Question - Full height */}
      <div className="flex-1 flex flex-col h-[calc(100vh-3rem)]">
        {/* Progress Bar */}
        <div className="flex justify-between items-center mb-4 gap-4">
          <span className="text-sm text-gray-700 font-medium whitespace-nowrap">
            Answered {totalAnswered} / {questions.length}
          </span>
          <Progress value={progress} className="h-3 flex-1" />
        </div>

        {/* Question Card - Takes remaining space */}
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
                  const selected = answers[currentQuestion.id] === opt;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(opt)}
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

            {/* Navigation Buttons */}
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
                {currentIndex === questions.length - 1 ? (
                  <Button onClick={handleSubmit} className="min-w-24">
                    Submit
                  </Button>
                ) : (
                  <Button
                    onClick={() => setCurrentIndex((prev) => prev + 1)}
                    className="min-w-24"
                  >
                    Next
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
