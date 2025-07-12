import { ColumnDef } from "@tanstack/react-table";
import { Calendar, Clock, AlertCircle, CircleCheck } from "lucide-react";

export type Exam = {
  id: string;
  name: string;
  type: "internal" | "midterm" | "final" | "practical";
  startDate: string;
  endDate: string;
  totalMarks: number;
  passingMarks: number;
  status: "completed" | "scheduled" | "not_scheduled";
};

export const examColumns: ColumnDef<Exam>[] = [
  {
    accessorKey: "name",
    header: "Exam",
    cell: ({ row }) => {
      const exam = row.original;
      const iconMap = {
        internal: <Calendar className="h-4 w-4 text-blue-500" />,
        midterm: <Calendar className="h-4 w-4 text-orange-500" />,
        final: <Calendar className="h-4 w-4 text-red-500" />,
        practical: <Clock className="h-4 w-4 text-green-500" />,
      };
      return (
        <div className="flex items-center gap-3">
          <div className="bg-gray-100 p-2 rounded-md">{iconMap[exam.type]}</div>
          <span className="font-medium">{exam.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "dateRange",
    header: "Date",
    cell: ({ row }) => {
      const exam = row.original;
      const start = new Date(exam.startDate).toLocaleDateString();
      const end = new Date(exam.endDate).toLocaleDateString();
      return (
        <div>
          {start === end ? (
            <span>{start}</span>
          ) : (
            <span>
              {start} - {end}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "totalMarks",
    header: "Total Marks",
    cell: ({ row }) => {
      const exam = row.original;
      return (
        <div>
          {exam.totalMarks}
          <span className="text-xs text-gray-500 ml-1">
            (Pass: {exam.passingMarks})
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const exam = row.original;
      const statusMap = {
        completed: {
          icon: <CircleCheck className="h-4 w-4" />,
          className:
            "bg-green-50 text-green-700 hover:bg-green-50 border-green-200",
          text: "Completed",
          iconColor: "text-green-500",
        },
        scheduled: {
          icon: <Clock className="h-4 w-4" />,
          className:
            "bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200",
          text: "Scheduled",
          iconColor: "text-amber-500",
        },
        not_scheduled: {
          icon: <AlertCircle className="h-4 w-4" />,
          className:
            "bg-gray-50 text-gray-700 hover:bg-gray-50 border-gray-200",
          text: "Not Scheduled",
          iconColor: "text-gray-500",
        },
        // Optional additional status if needed
        cancelled: {
          icon: <CircleCheck className="h-4 w-4" />,
          className: "bg-red-50 text-red-700 hover:bg-red-50 border-red-200",
          text: "Cancelled",
          iconColor: "text-red-500",
        },
      };

      const status = statusMap[exam.status];
      return (
        <div
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border ${status.className}`}
        >
          <span className={status.iconColor}>{status.icon}</span>
          {status.text}
        </div>
      );
    },
  },
];

export const examData: Exam[] = [
  {
    id: "1",
    name: "Internal Assessment 1",
    type: "internal",
    startDate: "2024-01-15",
    endDate: "2024-01-15",
    totalMarks: 50,
    passingMarks: 20,
    status: "completed",
  },
  {
    id: "2",
    name: "Internal Assessment 2",
    type: "internal",
    startDate: "2024-03-10",
    endDate: "2024-03-10",
    totalMarks: 50,
    passingMarks: 20,
    status: "scheduled",
  },
  {
    id: "3",
    name: "Midterm Exam",
    type: "midterm",
    startDate: "2024-05-05",
    endDate: "2024-05-07",
    totalMarks: 100,
    passingMarks: 40,
    status: "scheduled",
  },
  {
    id: "4",
    name: "Practical Exam 1",
    type: "practical",
    startDate: "",
    endDate: "",
    totalMarks: 30,
    passingMarks: 12,
    status: "not_scheduled",
  },
  {
    id: "5",
    name: "Final Examination",
    type: "final",
    startDate: "2024-06-15",
    endDate: "2024-06-20",
    totalMarks: 150,
    passingMarks: 60,
    status: "scheduled",
  },
  {
    id: "6",
    name: "Practical Exam 2",
    type: "practical",
    startDate: "",
    endDate: "",
    totalMarks: 30,
    passingMarks: 12,
    status: "not_scheduled",
  },
];

export type ExamTimetable = {
  id: string;
  subjectName: string;
  subjectCode: string;
  date: string;
  time: string;
  duration: string;
  room: string;
  type: "written" | "practical" | "oral";
  invigilator?: string;
};

export const examTimetableData: ExamTimetable[] = [
  {
    id: "1",
    subjectName: "Data Structures",
    subjectCode: "CS201",
    date: "2024-01-15",
    time: "09:00 AM",
    duration: "3 hours",
    room: "A-101",
    type: "written",
    invigilator: "Prof. Smith",
  },
  {
    id: "2",
    subjectName: "Algorithms",
    subjectCode: "CS202",
    date: "2024-01-17",
    time: "02:00 PM",
    duration: "2 hours",
    room: "B-205",
    type: "written",
    invigilator: "Prof. Johnson",
  },
  {
    id: "3",
    subjectName: "Database Systems",
    subjectCode: "CS203",
    date: "2024-01-19",
    time: "10:00 AM",
    duration: "2.5 hours",
    room: "C-301",
    type: "written",
    invigilator: "Prof. Williams",
  },
  {
    id: "4",
    subjectName: "Database Systems Lab",
    subjectCode: "CS203P",
    date: "2024-01-22",
    time: "09:30 AM",
    duration: "1.5 hours",
    room: "Lab-3",
    type: "practical",
    invigilator: "Prof. Brown",
  },
  {
    id: "5",
    subjectName: "Operating Systems",
    subjectCode: "CS204",
    date: "2024-01-24",
    time: "01:30 PM",
    duration: "3 hours",
    room: "A-102",
    type: "written",
    invigilator: "Prof. Davis",
  },
  {
    id: "6",
    subjectName: "Computer Networks",
    subjectCode: "CS205",
    date: "2024-01-26",
    time: "09:00 AM",
    duration: "2 hours",
    room: "B-206",
    type: "written",
    invigilator: "Prof. Miller",
  },
  {
    id: "7",
    subjectName: "Software Engineering Viva",
    subjectCode: "CS206V",
    date: "2024-01-29",
    time: "11:00 AM",
    duration: "30 mins",
    room: "Viva-2",
    type: "oral",
    invigilator: "Prof. Wilson",
  },
];

import { Book, FlaskConical, Mic } from "lucide-react";

export const examTimetableColumns: ColumnDef<ExamTimetable>[] = [
  {
    accessorKey: "subjectName",
    header: "Subject",
    cell: ({ row }) => {
      const exam = row.original;
      const iconMap = {
        practical: {
          icon: <FlaskConical className="h-4 w-4" />,
          bgColor: "bg-gray-100",
          iconColor: "text-purple-600",
        },
        oral: {
          icon: <Mic className="h-4 w-4" />,
          bgColor: "bg-gray-100",
          iconColor: "text-orange-600",
        },
        written: {
          icon: <Book className="h-5 w-5" />,
          bgColor: "bg-gray-100",
          iconColor: "text-blue-600",
        },
      };

      const subjectType = iconMap[exam.type];

      return (
        <div className="flex items-center gap-3">
          <div className={`${subjectType.bgColor} p-2 rounded-md`}>
            <span className={subjectType.iconColor}>{subjectType.icon}</span>
          </div>
          <div>
            <div className="font-medium">{exam.subjectName}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "subjectCode",
    header: "Code",
    cell: ({ row }) => {
      const exam = row.original;
      return <div className="font-medium">{exam.subjectCode}</div>;
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => {
      const exam = row.original;
      return (
        <div className="font-medium">
          {new Date(exam.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "time",
    header: "Time",
    cell: ({ row }) => {
      const exam = row.original;
      const [startTime, endTime] = calculateExamTimeRange(
        exam.time,
        exam.duration
      );

      return (
        <div className="font-medium">
          {startTime} - {endTime}
        </div>
      );
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("duration")}</div>
    ),
  },
  {
    accessorKey: "room",
    header: "Room",
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("room")}</div>
    ),
  },
];

// Helper function to calculate end time
function calculateExamTimeRange(
  startTime: string,
  duration: string
): [string, string] {
  // Parse duration (e.g., "2 hours" → 120 minutes)
  const durationMinutes = parseInt(duration) * 60 || 0;

  // Parse start time (e.g., "09:00 AM")
  const [time, period] = startTime.split(" ");
  const [hours, minutes] = time.split(":").map(Number);

  // Calculate end time
  const startDate = new Date();
  startDate.setHours(period === "PM" ? hours + 12 : hours, minutes, 0, 0);
  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

  // Format times
  const formatTime = (date: Date) => {
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const period = date.getHours() < 12 ? "AM" : "PM";
    return `${hours}:${minutes} ${period}`;
  };

  return [formatTime(startDate), formatTime(endDate)];
}
