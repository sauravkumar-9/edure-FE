import { useState } from "react";
import { format } from "date-fns";
import { ArrowRight, CalendarIcon, Clock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function SlotBookingPage({ onComplete }: { onComplete: () => void }) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const slotData = [
    { id: "slot1", time: "9:00 AM - 10:00 AM", registrations: 10 },
    { id: "slot2", time: "10:00 AM - 11:00 AM", registrations: 8 },
    { id: "slot3", time: "11:00 AM - 12:00 PM", registrations: 12 },
    { id: "slot4", time: "12:00 PM - 1:00 PM", registrations: 6 },
    { id: "slot5", time: "1:00 PM - 2:00 PM", registrations: 9 },
    { id: "slot6", time: "2:00 PM - 3:00 PM", registrations: 4 },
  ];

  return (
    <div className="min-h-screen w-full bg-white px-4 py-8 md:px-8 flex justify-center">
      <div className="w-full max-w-4xl flex flex-col flex-grow space-y-10">
        {/* Page Title */}
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Book Your Exam Slot
          </h1>
          <p className="text-muted-foreground text-sm">
            Select your preferred date and available time slot for the exam.
          </p>
        </div>

        {/* Date Picker */}
        <div className="space-y-2">
          <Label className="text-base font-medium">Select Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full md:w-80 justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => setDate(selectedDate)}
                disabled={(date) => date < new Date()}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Time Slots */}
        {date && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">
              Available Time Slots
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {slotData.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => setSelectedSlot(slot.id)}
                  className={`cursor-pointer p-4 rounded-lg border transition-all ${
                    selectedSlot === slot.id
                      ? "border-blue-600 bg-blue-50"
                      : "border-gray-200 hover:border-blue-400"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2 text-blue-700 font-medium">
                    <Clock className="w-4 h-4" />
                    {slot.time}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    {slot.registrations} registered
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirm Button */}
        <div className="mt-auto pt-6 border-t">
          <div className="flex justify-end">
            <Button
              onClick={onComplete}
              disabled={!date || !selectedSlot}
              className="w-full sm:w-auto"
            >
              Confirm Booking <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
