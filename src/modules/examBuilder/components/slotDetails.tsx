"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  FileUp,
  FileText,
  Eye,
  RefreshCw,
  Users,
  UserCheck,
  Ratio,
  Plus,
  Minus,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/final/statCard";

export default function ExamOverview({ examOverview }: { examOverview: any }) {
  const [showGenerateDialog, setShowGenerateDialog] = useState(false);
  const [easyCount, setEasyCount] = useState(5);
  const [mediumCount, setMediumCount] = useState(10);
  const [hardCount, setHardCount] = useState(5);

  const totalQuestions = easyCount + mediumCount + hardCount;

  const handleIncrement = (type: any) => {
    if (type === "easy") setEasyCount(easyCount + 1);
    if (type === "medium") setMediumCount(mediumCount + 1);
    if (type === "hard") setHardCount(hardCount + 1);
  };

  const handleDecrement = (type: any) => {
    if (type === "easy" && easyCount > 0) setEasyCount(easyCount - 1);
    if (type === "medium" && mediumCount > 0) setMediumCount(mediumCount - 1);
    if (type === "hard" && hardCount > 0) setHardCount(hardCount - 1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Exam Overview</h1>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {examOverview.stats.map((stat: any, idx: number) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Status + Actions in Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Section */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Current Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {examOverview.status.map((status: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-sm font-medium">{status.label}</span>
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    {status.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        {/* Question Paper Management */}
        <Card className="border-0 shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Question Paper Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {!examOverview.paperSet ? (
                <>
                  <Button
                    variant="outline"
                    className="gap-2 border-gray-300 hover:bg-gray-100"
                  >
                    <FileUp className="w-4 h-4" />
                    Upload Question Paper
                  </Button>
                  <Button
                    className="bg-indigo-600 text-white hover:bg-indigo-700 gap-2"
                    onClick={() => setShowGenerateDialog(true)}
                  >
                    <FileText className="w-4 h-4" />
                    Generate Question Paper
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  className="gap-2 border-gray-300 hover:bg-gray-100"
                >
                  <RefreshCw className="w-4 h-4" />
                  Change Question Paper
                </Button>
              )}
            </div>

            {/* Preview Section */}
            <div className="border-t pt-4">
              <p className="text-sm text-gray-500 mb-2">
                Once a question paper is uploaded or generated, you can preview
                it here.
              </p>
              <Button
                variant="outline"
                className="gap-2 border-gray-300 hover:bg-gray-100"
                asChild
                disabled={!examOverview.paperSet}
              >
                <a
                  href={
                    examOverview.paperSet
                      ? "https://dummy-link.com/preview"
                      : "#"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Eye className="w-4 h-4" />
                  Preview Question Paper
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Generate Question Paper Dialog */}
      <Dialog open={showGenerateDialog} onOpenChange={setShowGenerateDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Generate Question Paper
            </DialogTitle>
            <DialogDescription>
              Configure the question distribution for your exam paper
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 border border-blue-200">
              <ul className="list-disc list-inside space-y-1">
                <li>
                  Questions will be selected from the existing question bank
                </li>
                <li>You can preview and make changes after generation</li>
                <li>
                  Ensure proper distribution of question difficulty levels
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="total" className="text-base">
                  Total Questions
                </Label>
                <div className="text-lg font-semibold text-gray-800">
                  {totalQuestions}
                </div>
              </div>

              <div className="space-y-3">
                {/* Easy Questions */}
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <Label htmlFor="easy" className="text-green-700 font-medium">
                    Easy Questions
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => handleDecrement("easy")}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center font-medium">
                      {easyCount}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => handleIncrement("easy")}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Medium Questions */}
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                  <Label
                    htmlFor="medium"
                    className="text-yellow-700 font-medium"
                  >
                    Medium Questions
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => handleDecrement("medium")}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center font-medium">
                      {mediumCount}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => handleIncrement("medium")}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Hard Questions */}
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-200">
                  <Label htmlFor="hard" className="text-red-700 font-medium">
                    Hard Questions
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => handleDecrement("hard")}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center font-medium">
                      {hardCount}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 rounded-full"
                      onClick={() => handleIncrement("hard")}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button
              variant="outline"
              onClick={() => setShowGenerateDialog(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button className="bg-indigo-600 text-white hover:bg-indigo-700 flex-1">
              Generate Paper
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
