"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type ExamSlot = {
  date: string; // ISO date string
  slots: string[]; // Example: ["10:00 AM - 12:00 PM", "2:00 PM - 4:00 PM"]
};

type Props = {
  examSchedule: ExamSlot[];
  onConfirm?: (availability: Record<string, string[]>) => void;
};

export default function TeacherAvailabilityForm({
  examSchedule,
  onConfirm,
}: Props) {
  const [availability, setAvailability] = useState<Record<string, string[]>>(
    {}
  );

  const toggleSlot = (date: string, slot: string) => {
    setAvailability((prev) => {
      const current = new Set(prev[date] || []);
      if (current.has(slot)) {
        current.delete(slot);
      } else {
        current.add(slot);
      }
      return { ...prev, [date]: Array.from(current) };
    });
  };

  const markUnavailableForDay = (date: string) => {
    setAvailability((prev) => ({ ...prev, [date]: [] }));
  };

  const handleConfirm = () => {
    if (onConfirm) onConfirm(availability);
    console.log("Confirmed availability:", availability);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Confirm Your Availability</h2>

      {examSchedule.map(({ date, slots }) => (
        <div
          key={date}
          className="rounded-lg border bg-muted p-4 space-y-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <p className="text-base font-medium text-gray-800">
              {format(new Date(date), "EEEE, dd/MM/yyyy")}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {slots.map((slot) => {
              const selected = availability[date]?.includes(slot);
              return (
                <label
                  key={slot}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 border rounded-md text-sm cursor-pointer",
                    selected
                      ? "bg-green-100 border-green-400"
                      : "bg-white border-gray-300 hover:border-gray-400"
                  )}
                >
                  <Checkbox
                    checked={selected}
                    onCheckedChange={() => toggleSlot(date, slot)}
                  />
                  {slot}
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
