"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import examMock from "../mock/examDetails.json";
import TabLayout from "@/components/comman/tabLayout";
import ExamOverview from "../components/slotDetails";
import LeadList from "./examReport";
import ExamExactDetails from "../mock/examExactDetails";

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

const tabsDetails: any = [
  {
    label: "Overview",
    value: "overview",
    component: ExamOverview,
    props: {
      examOverview: ExamExactDetails,
    },
  },
  {
    label: "Candidates",
    value: "candidates",
    component: LeadList,
  },
  {
    label: "Proctors",
    value: "proctors",
    component: LeadList,
  },
];

export default function ExamDetails() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState<string>("overview");
  const [examDetails, setExamDetails] =
    useState<ExamDetailsProps["exam"]>(examMock);

  // Set default selections on component mount
  useEffect(() => {
    setExamDetails(examMock);

    // Set first date as default
    if (examMock.dates.length > 0) {
      const firstDate = examMock.dates[0].date;
      setSelectedDate(firstDate);

      // Set first slot of the first date as default
      if (examMock.dates[0].slots.length > 0) {
        setSelectedSlot(examMock.dates[0].slots[0]);
      }
    }
  }, []);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    // Reset slot selection when date changes and select first slot of new date
    const dateObj = examDetails.dates.find((d) => d.date === date);
    if (dateObj && dateObj.slots.length > 0) {
      setSelectedSlot(dateObj.slots[0]);
    } else {
      setSelectedSlot(null);
    }
  };

  const handleSlotSelect = (slot: string) => {
    setSelectedSlot(slot);
  };

  return (
    <div className="min-h-screen p-1">
      <div className="w-full mx-auto">
        {/* HEADER */}
        <div className=" space-y-2">
          <h1 className="text-2xl font-bold">{examDetails.name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="flex flex-col items-center p-3 bg-white rounded-md">
              <span className="font-semibold text-indigo-700">
                Registration Cutoff
              </span>
              <span className="text-indigo-900">
                {examDetails.registrationCutoff}
              </span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white rounded-md">
              <span className="font-semibold text-indigo-700">
                Slot Booking Cutoff
              </span>
              <span className="text-indigo-900">{examDetails.slotCutoff}</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-white rounded-md">
              <span className="font-semibold text-indigo-700">
                Teacher Registration Cutoff
              </span>
              <span className="text-indigo-900">
                {examDetails.teacherCutoff}
              </span>
            </div>
          </div>
        </div>

        {/* FILTERS */}
        <div className="text-center space-y-4 p-4">
          {/* Date Filter */}
          <div className="space-y-4">
            <div className="flex flex-wrap justify-center gap-3">
              {examDetails.dates.map((d) => (
                <Badge
                  key={d.date}
                  variant={selectedDate === d.date ? "default" : "outline"}
                  className={`px-4 py-2 cursor-pointer transition-all ${
                    selectedDate === d.date
                      ? "bg-black text-white hover:bg-black-700 scale-105"
                      : "bg-white text-gray-700 border-black-200 hover:bg-indigo-50 hover:text-indigo-700"
                  }`}
                  onClick={() => handleDateSelect(d.date)}
                >
                  {d.date}
                </Badge>
              ))}
            </div>
          </div>

          {/* Slot Filter */}
          {selectedDate && (
            <div className="space-y-4">
              <div className="flex flex-wrap justify-center gap-3">
                {examDetails.dates
                  .find((d) => d.date === selectedDate)
                  ?.slots.map((slot) => (
                    <Badge
                      key={slot}
                      variant={selectedSlot === slot ? "default" : "outline"}
                      className={`px-4 py-2 cursor-pointer transition-all ${
                        selectedSlot === slot
                          ? "bg-black text-white hover:bg-black-700 scale-105"
                          : "bg-white text-gray-700 border-black-200 hover:bg-indigo-50 hover:text-indigo-700"
                      }`}
                      onClick={() => handleSlotSelect(slot)}
                    >
                      {slot}
                    </Badge>
                  ))}
              </div>
            </div>
          )}
        </div>

        <Separator className="" />
        <div className="p-2 bg-gray-100 my-1">
          Showing data for{" "}
          <span className="font-medium text-indigo-600">{selectedDate}</span> at{" "}
          {""}
          <span className="font-medium text-indigo-600">{selectedSlot}</span>
        </div>
        {/* CONTENT */}
        <div className="mt-4">
          <TabLayout
            tabs={tabsDetails}
            mode="content"
            value={tabValue}
            onChange={setTabValue}
          />
        </div>
      </div>
    </div>
  );
}
