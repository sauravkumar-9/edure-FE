"use client";

import * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DatePickerProps {
  label?: string;
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;

  // New props for multi-date mode
  multiSelect?: boolean;
  selectedDates?: Date[];
  onSelectDates?: (dates: Date[]) => void;

  className?: string;
}

export default function DatePicker({
  label = "Select Date",
  selected,
  onSelect,
  multiSelect = false,
  selectedDates = [],
  onSelectDates,
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (date: Date | undefined) => {
    if (!date) return;

    if (multiSelect && onSelectDates) {
      const exists = selectedDates.some(
        (d) => d.toDateString() === date.toDateString()
      );
      const updated = exists
        ? selectedDates.filter((d) => d.toDateString() !== date.toDateString())
        : [...selectedDates, date];
      onSelectDates(updated);
    } else {
      onSelect?.(date);
    }
  };

  const displayText = multiSelect
    ? selectedDates.length > 0
      ? `${selectedDates.length} date(s) selected`
      : "Select dates"
    : selected
    ? format(selected, "dd/MM/yyyy")
    : "Select date";

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <Label className="px-1">{label}</Label>}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="w-52 justify-between font-normal"
          >
            {displayText}
            <ChevronDownIcon className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={multiSelect ? undefined : selected}
            onSelect={handleSelect}
            captionLayout="dropdown"
            className="p-3 pointer-events-auto"
            modifiers={{
              selected: (date) =>
                multiSelect
                  ? selectedDates.some(
                      (d) => d.toDateString() === date.toDateString()
                    )
                  : false,
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
