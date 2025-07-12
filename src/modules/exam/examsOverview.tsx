import {
  Calendar,
  CheckCircle,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";
import { examColumns, examData } from "./data";
import TableView from "@/components/table/table";
import { StatCard } from "@/components/final/statCard";

const examStats = [
  {
    title: "Total Exams",
    value: "12",
    change: "+2 from last term",
    icon: <ClipboardList className="h-6 w-6 text-blue-500" />,
    trend: "up", // optional for styling
  },
  {
    title: "Completed",
    value: "5",
    change: "3 remaining",
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
    trend: "neutral",
  },
  {
    title: "Scheduled",
    value: "4",
    change: "Starts next week",
    icon: <Calendar className="h-6 w-6 text-orange-500" />,
    trend: "up",
  },
  {
    title: "Pending Schedule",
    value: "3",
    change: "Needs attention",
    icon: <AlertTriangle className="h-6 w-6 text-red-500" />,
    trend: "down",
  },
];

export default function ExamsOverview() {
  return (
    <div className="space-y-6">
      {/* Exam Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4">
        {examStats.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Exams Table */}
      <TableView
        data={examData}
        columns={examColumns}
        isToolBar={false}
        isPagination={false}
      />
    </div>
  );
}
