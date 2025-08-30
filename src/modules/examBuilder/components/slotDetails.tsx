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

export default function ExamOverview() {
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
        <Badge
          variant="outline"
          className="px-3 py-1 bg-blue-50 text-blue-700 border-blue-200"
        >
          Active • Semester Finals
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Students Registered
            </CardTitle>
            <Users className="h-5 w-5 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">120</div>
            <p className="text-xs text-gray-500 mt-1">+5 from yesterday</p>
            <Progress value={80} className="h-2 mt-2 bg-gray-200" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Faculty Available
            </CardTitle>
            <UserCheck className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">15</div>
            <p className="text-xs text-gray-500 mt-1">All faculty confirmed</p>
            <Progress value={100} className="h-2 mt-2 bg-gray-200" />
          </CardContent>
        </Card>

        <Card className="border-0 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Student-Faculty Ratio
            </CardTitle>
            <Ratio className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">8:1</div>
            <p className="text-xs text-gray-500 mt-1">Ideal ratio maintained</p>
            <Progress value={75} className="h-2 mt-2 bg-gray-200" />
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Question Paper Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
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
            <Button
              variant="outline"
              className="gap-2 border-gray-300 hover:bg-gray-100"
              asChild
            >
              <a
                href="https://dummy-link.com/preview"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Eye className="w-4 h-4" />
                Preview Question Paper
              </a>
            </Button>
            <Button
              variant="outline"
              className="gap-2 border-gray-300 hover:bg-gray-100"
            >
              <RefreshCw className="w-4 h-4" />
              Change Question Paper
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Status Section */}
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Current Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Question Paper</span>
                <Badge
                  variant="outline"
                  className="bg-green-50 text-green-700 border-green-200"
                >
                  Uploaded
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Answer Key</span>
                <Badge
                  variant="outline"
                  className="bg-yellow-50 text-yellow-700 border-yellow-200"
                >
                  Pending
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Seating Arrangement</span>
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 border-blue-200"
                >
                  In Progress
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Hall Tickets</span>
                <Badge
                  variant="outline"
                  className="bg-gray-50 text-gray-700 border-gray-200"
                >
                  Not Generated
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

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
