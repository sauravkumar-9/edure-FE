"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import examMock from "../mock/examDetails.json";

interface ExamDetailsProps {
  exam: {
    name: string;
    registrationCutoff: string;
    slotCutoff: string;
    teacherCutoff: string;
    dates: {
      date: string;
      slots: string[];
    }[];
  };
}

export default function ExamDetails() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [examDetails, setExamDetails] =
    useState<ExamDetailsProps["exam"]>(examMock);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null); // reset slots when date changes
  };

  useEffect(() => {
    setExamDetails(examMock);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <h1 className="text-2xl font-bold text-indigo-700">
            {examDetails.name}
          </h1>
          <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <p>
              <span className="font-medium">Registration Cutoff:</span>{" "}
              {examDetails.registrationCutoff}
            </p>
            <p>
              <span className="font-medium">Slot Booking Cutoff:</span>{" "}
              {examDetails.slotCutoff}
            </p>
            <p>
              <span className="font-medium">Teacher Registration Cutoff:</span>{" "}
              {examDetails.teacherCutoff}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* FILTERS */}
      <div className="text-center space-y-4">
        {/* Date Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {examDetails.dates.map((d) => (
            <Badge
              key={d.date}
              variant={selectedDate === d.date ? "default" : "outline"}
              className={`cursor-pointer ${
                selectedDate === d.date
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "hover:bg-indigo-50"
              }`}
              onClick={() => handleDateSelect(d.date)}
            >
              {d.date}
            </Badge>
          ))}
        </div>

        {/* Slot Filter */}
        {selectedDate && (
          <div className="flex flex-wrap justify-center gap-2">
            {examDetails.dates
              .find((d) => d.date === selectedDate)
              ?.slots.map((slot) => (
                <Badge
                  key={slot}
                  variant={selectedSlot === slot ? "default" : "outline"}
                  className={`cursor-pointer ${
                    selectedSlot === slot
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "hover:bg-indigo-50"
                  }`}
                  onClick={() => setSelectedSlot(slot)}
                >
                  {slot}
                </Badge>
              ))}
          </div>
        )}
      </div>

      <Separator />

      {/* CONTENT */}
      <div className="p-4 border rounded-lg bg-white shadow-sm">
        {selectedDate ? (
          selectedSlot ? (
            <p className="text-center text-gray-700">
              Showing content for <b>{selectedDate}</b> at <b>{selectedSlot}</b>
              .
            </p>
          ) : (
            <p className="text-center text-gray-500">
              Please select a slot for <b>{selectedDate}</b>.
            </p>
          )
        ) : (
          <p className="text-center text-gray-500">
            Please select a date to view slots and details.
          </p>
        )}
      </div>
    </div>
  );
}
