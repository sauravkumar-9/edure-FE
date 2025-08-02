"use client";

import { Button } from "@/components/ui/button";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar22 } from "@/components/final/datePicket";

export default function ExamSchedulerPage() {
  const [showDialog, setShowDialog] = useState(false);
  const [examName, setExamName] = useState("");
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [slots, setSlots] = useState<
    Record<string, { start: string; end: string }[]>
  >({});
  const [studentCutoff, setStudentCutoff] = useState<Date>();
  const [teacherCutoff, setTeacherCutoff] = useState<Date>();
  const [lastRegDate, setLastRegDate] = useState<Date>();
  const [tab, setTab] = useState("details");

  const addSlot = (dateStr: string) => {
    setSlots((prev) => ({
      ...prev,
      [dateStr]: [...(prev[dateStr] || []), { start: "", end: "" }],
    }));
  };

  const removeSlot = (dateStr: string, index: number) => {
    setSlots((prev) => {
      const updated = [...(prev[dateStr] || [])];
      updated.splice(index, 1);
      return { ...prev, [dateStr]: updated };
    });
  };

  const updateSlot = (
    dateStr: string,
    index: number,
    key: "start" | "end",
    value: string
  ) => {
    setSlots((prev) => ({
      ...prev,
      [dateStr]: prev[dateStr].map((slot, i) =>
        i === index ? { ...slot, [key]: value } : slot
      ),
    }));
  };

  const handleSave = () => {
    console.log({
      examName,
      selectedDates,
      slots,
      studentCutoff,
      teacherCutoff,
      lastRegDate,
    });
    setShowDialog(false);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Exam Schedule</h2>
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogTrigger asChild>
            <Button onClick={() => setShowDialog(true)}>+ Schedule Exam</Button>
          </DialogTrigger>

          <DialogContent className="w-full max-w-4xl h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle>Schedule New Exam</DialogTitle>
            </DialogHeader>

            {/* Tabs Header - Fixed */}
            <Tabs
              value={tab}
              onValueChange={setTab}
              className="flex-1 flex flex-col"
            >
              <div className="sticky top-0 z-10 bg-white border-b">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Basic Info</TabsTrigger>
                  <TabsTrigger value="slots">Exam Slots</TabsTrigger>
                </TabsList>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-1 pr-3 mt-4 space-y-6">
                <TabsContent value="details">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Exam Name</Label>
                      <Input
                        placeholder="Enter exam name"
                        value={examName}
                        onChange={(e) => setExamName(e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <Calendar22
                      selectedDates={selectedDates}
                      onSelectDates={setSelectedDates}
                      label="Select Exam Dates"
                      multiSelect
                      className="w-full"
                    />

                    <Calendar22
                      selected={studentCutoff}
                      onSelect={setStudentCutoff}
                      label="Student Slot Booking Cutoff"
                      className="w-full"
                    />

                    <Calendar22
                      selected={teacherCutoff}
                      onSelect={setTeacherCutoff}
                      label="Teacher Slot Confirmation Cutoff"
                      className="w-full"
                    />

                    <Calendar22
                      selected={lastRegDate}
                      onSelect={setLastRegDate}
                      label="Student Registration Cutoff"
                      className="w-full"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="slots">
                  {selectedDates.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      Please select exam dates in the Basic Info tab first.
                    </p>
                  ) : (
                    selectedDates.map((date) => {
                      const dateStr = format(date, "yyyy-MM-dd");
                      const dateSlots = slots[dateStr] || [];

                      return (
                        <div
                          key={dateStr}
                          className="border rounded-md p-4 space-y-4 bg-muted/10"
                        >
                          <div className="flex justify-between items-center border-b pb-2">
                            <h4 className="text-base font-semibold">
                              {format(date, "EEEE, dd/MM/yyyy")}
                            </h4>
                            <Button
                              onClick={() => addSlot(dateStr)}
                              variant="outline"
                              size="sm"
                            >
                              <Plus className="w-4 h-4 mr-1" /> Add Slot
                            </Button>
                          </div>

                          {dateSlots.length === 0 ? (
                            <p className="text-sm text-muted-foreground">
                              No slots added yet.
                            </p>
                          ) : (
                            <div className="space-y-3">
                              {dateSlots.map((slot, idx) => (
                                <div
                                  key={idx}
                                  className="flex flex-col gap-3 md:flex-row md:items-end"
                                >
                                  <div className="w-full">
                                    <Label>Start Time</Label>
                                    <Input
                                      type="time"
                                      value={slot.start}
                                      onChange={(e) =>
                                        updateSlot(
                                          dateStr,
                                          idx,
                                          "start",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <div className="w-full">
                                    <Label>End Time</Label>
                                    <Input
                                      type="time"
                                      value={slot.end}
                                      onChange={(e) =>
                                        updateSlot(
                                          dateStr,
                                          idx,
                                          "end",
                                          e.target.value
                                        )
                                      }
                                    />
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => removeSlot(dateStr, idx)}
                                    className="text-red-500"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </TabsContent>
              </div>

              {/* Fixed Footer */}
              <div className="sticky bottom-0 bg-white border-t pt-4 pb-2 px-4 flex justify-end gap-2">
                {tab === "details" ? (
                  <Button onClick={() => setTab("slots")}>Next</Button>
                ) : (
                  <>
                    <Button variant="outline" onClick={() => setTab("details")}>
                      Back
                    </Button>
                    <Button onClick={handleSave}>Save Schedule</Button>
                  </>
                )}
              </div>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Mock Schedule */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded-md shadow-sm bg-white">
          <h3 className="text-lg font-semibold mb-2">Mock Exam</h3>
          <p>
            <strong>Dates:</strong> 13/01/2025, 15/01/2025
          </p>
          <p>
            <strong>Slots:</strong> 10:00-12:00, 2:00-4:00
          </p>
          <p>
            <strong>Registration Cutoff:</strong> 10/01/2025
          </p>
        </div>
      </div>
    </div>
  );
}
