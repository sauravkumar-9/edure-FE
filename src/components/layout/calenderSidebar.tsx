import { useState } from "react";
import { format, addDays, isToday, isSameDay } from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  X,
  Megaphone,
  MegaphoneOff,
  Info,
} from "lucide-react";
import { CalendarDays, Clock, CalendarX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Generate dynamic events for today, yesterday, and tomorrow
const generateEvents = () => {
  const today = new Date();
  const yesterday = addDays(today, -1);
  const tomorrow = addDays(today, 1);

  const baseEvents = [
    { id: 1, title: "TechCorp Pre-Placement Talk", time: "10:00 AM" },
    { id: 2, title: "Student Resume Review", time: "2:00 PM" },
    { id: 3, title: "GlobalSoft Coding Test", time: "9:00 AM" },
    { id: 4, title: "Placement Team Meeting", time: "11:00 AM" },
    { id: 5, title: "Mock Interview Round", time: "3:00 PM" },
    { id: 6, title: "Design Workshop", time: "5:00 PM" },
  ];

  return [
    // Yesterday's events (fewer events)
    ...baseEvents.slice(0, 3).map((event) => ({
      ...event,
      id: event.id + 10, // Different ID range
      date: format(yesterday, "yyyy-MM-dd"),
      title: `${event.title}`, // Mark as completed
    })),

    // Today's events
    ...baseEvents.map((event) => ({
      ...event,
      date: format(today, "yyyy-MM-dd"),
    })),

    // Tomorrow's events (more events)
    ...baseEvents.map((event) => ({
      ...event,
      id: event.id + 20, // Different ID range
      date: format(tomorrow, "yyyy-MM-dd"),
      title: `${event.title}`, // Mark as upcoming
    })),
    {
      id: 26,
      date: format(tomorrow, "yyyy-MM-dd"),
      title: "Additional Company Session",
      time: "4:30 PM",
    },
  ];
};

export function CalendarSidebar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dismissedUpdates, setDismissedUpdates] = useState<number[]>([]);

  const events = generateEvents();

  const notifications = [
    "New placement policy updated - effective immediately",
    "3 pending student approval requests",
    "Campus recruitment schedule changed for December",
    "Deadline for company registrations: Nov 20",
    "Internship offers from TechieX arriving next week",
    "Alumni session on tech careers this Friday",
  ];

  const weekDays = Array.from({ length: 7 }).map((_, index) =>
    addDays(currentDate, index - 3)
  );

  const todaysEvents = events.filter((event) =>
    isSameDay(new Date(event.date), selectedDate)
  );

  const handlePrevWeek = () => setCurrentDate(addDays(currentDate, -7));
  const handleNextWeek = () => setCurrentDate(addDays(currentDate, 7));

  const handleDismissUpdate = (index: number) => {
    setDismissedUpdates((prev) => [...prev, index]);
  };

  return (
    <>
      {/* Calendar Card */}
      <Card className="flex flex-col h-[43vh] shadow-sm">
        <CardContent className="flex-1 flex flex-col overflow-hidden gap-3">
          {/* Navigation */}
          <div className="flex items-center justify-between px-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrevWeek}
              className="hover:bg-indigo-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm font-medium">
              {format(weekDays[0], "MMM d")} -{" "}
              {format(weekDays[6], "MMM d, yyyy")}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNextWeek}
              className="hover:bg-indigo-100"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Days */}
          <div className="grid grid-cols-7 gap-1.5">
            {weekDays.map((day) => {
              const isActive = isSameDay(day, selectedDate);
              const isCurrent = isToday(day);

              return (
                <button
                  key={day.toString()}
                  onClick={() => setSelectedDate(day)}
                  className={`flex flex-col items-center p-1.5 rounded-lg text-xs transition-all
              ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md"
                  : "hover:bg-indigo-100"
              }
              ${isCurrent && !isActive ? "ring-2 ring-indigo-500" : ""}`}
                >
                  <span className="text-[0.7rem] font-medium">
                    {format(day, "EEE")}
                  </span>
                  <span
                    className={`mt-0.5 text-sm font-semibold ${
                      isActive ? "text-white" : ""
                    }`}
                  >
                    {format(day, "d")}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Activities */}
          <div className="flex-1 overflow-y-auto">
            <div className="sticky top-0 pt-1 pb-3 z-10 bg-white">
              <h3 className="text-sm  font-medium flex items-center gap-1.5">
                <CalendarDays className="h-4 w-4" />
                {isToday(selectedDate)
                  ? "Today's Activities"
                  : `${format(selectedDate, "MMMM d")}'s Activities`}
              </h3>
            </div>
            <div className="space-y-2 pr-1">
              {todaysEvents.length > 0 ? (
                todaysEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-3 rounded-lg border bg-indigo-50 border border-indigo-100 border hover:border-indigo-300 transition-all"
                  >
                    <div className="flex items-start gap-2">
                      <div className="bg-indigo-100 p-1 rounded-full mt-0.5">
                        <Clock className="h-3.5 w-3.5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs mt-0.5">{event.time}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-indigo-400">
                  <CalendarX className="h-8 w-8 mb-2" />
                  <p className="text-sm">No activities scheduled</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card className="h-[43vh] flex flex-col shadow-sm gap-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5" />
              <CardTitle className="text-base font-semibold">
                Announcements
              </CardTitle>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="hover:text-blue-800 hover:bg-blue-100 px-3 py-1.5"
            >
              View All
              <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto space-y-2">
          {notifications.map((note, index) =>
            dismissedUpdates.includes(index) ? null : (
              <div
                key={index}
                className="relative bg-blue-50 border border-blue-50 p-3 rounded-lg shadow-xs flex justify-between items-start hover:border-blue-200 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 p-1.5 rounded-full mt-0.5">
                    <Info className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-700 pr-6">{note}</p>
                </div>
                <button
                  className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                  onClick={() => handleDismissUpdate(index)}
                  aria-label="Dismiss announcement"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )
          )}
          {notifications.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <MegaphoneOff className="w-8 h-8 mb-2" />
              <p className="text-sm">No announcements yet</p>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
