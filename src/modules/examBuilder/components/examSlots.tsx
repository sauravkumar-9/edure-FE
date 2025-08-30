"use client";

import { format } from "date-fns";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ExamSlotsTabProps {
  selectedDates: Date[];
  slots: Record<string, { start: string; end: string }[]>;
  addSlot: (dateStr: string) => void;
  removeSlot: (dateStr: string, index: number) => void;
  updateSlot: (
    dateStr: string,
    index: number,
    key: "start" | "end",
    value: string
  ) => void;
}

export function ExamSlotsTab({
  selectedDates,
  slots,
  addSlot,
  removeSlot,
  updateSlot,
}: ExamSlotsTabProps) {
  return (
    <div className="space-y-4">
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
                        <Label className="mb-2">Start Time</Label>
                        <Input
                          type="time"
                          value={slot.start}
                          onChange={(e) =>
                            updateSlot(dateStr, idx, "start", e.target.value)
                          }
                        />
                      </div>
                      <div className="w-full">
                        <Label className="mb-2">End Time</Label>
                        <Input
                          type="time"
                          value={slot.end}
                          onChange={(e) =>
                            updateSlot(dateStr, idx, "end", e.target.value)
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
    </div>
  );
}
