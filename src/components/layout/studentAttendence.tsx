import { CustomBarChart } from "../charts/barChart";
import { GaugeMeter } from "../charts/gageMeter";
import { Clock, AlertCircle, CheckCircle2, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import TableView from "../table/table";
import { attendanceColumns, attendanceData } from "./data";
import { ChartRadialStacked } from "../cards/radialChart";
import { AttendanceSummaryCard } from "../charts/progress";

interface GaugeMeterProps {
  value: number;
  size?: "sm" | "md" | "lg";
  label?: string;
}

interface ActivityItem {
  type: "missed" | "regularized" | "meeting";
  date: string;
  description: string;
  subject?: string;
  resolved?: boolean;
}

interface StudentAttendanceProps {
  gauges: {
    first: GaugeMeterProps;
    second: GaugeMeterProps;
  };
  chartData: any;
  rightContent?: React.ReactNode;
}

export default function StudentAttendance({
  rightContent,
  gauges = {
    first: { value: 65, label: "Overall Attendance" },
    second: { value: 78, label: "Recent Month" },
  },
  chartData,
}: StudentAttendanceProps) {
  const recentActivities: ActivityItem[] = [
    {
      type: "missed",
      date: "2 hours ago",
      description: "Missed class",
      subject: "Mathematics",
      resolved: false,
    },
    {
      type: "regularized",
      date: "Yesterday",
      description: "Attendance regularized",
      subject: "Physics",
      resolved: true,
    },
    {
      type: "missed",
      date: "1 week ago",
      description: "Missed lab session",
      subject: "Chemistry",
      resolved: true,
    },
    {
      type: "regularized",
      date: "Yesterday",
      description: "Attendance regularized",
      subject: "Physics",
      resolved: true,
    },
    {
      type: "regularized",
      date: "Yesterday",
      description: "Attendance regularized",
      subject: "Physics",
      resolved: true,
    },
  ];

  const ActivityIcon = ({ type }: { type: ActivityItem["type"] }) => {
    switch (type) {
      case "missed":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "regularized":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "meeting":
        return <User className="h-5 w-5 text-blue-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const ActivityCard = ({ activity }: { activity: ActivityItem }) => (
    <div className="bg-white rounded-xl border border-gray-100 shadow-xs hover:shadow-sm transition-all">
      <div className="flex gap-4 p-5">
        <div className="flex-shrink-0">
          <div className="p-2.5 bg-gray-50 rounded-lg">
            <ActivityIcon type={activity.type} />
          </div>
        </div>

        <div className="flex-1 space-y-2">
          <h4 className="font-medium text-gray-900 leading-tight">
            {activity.description}
          </h4>

          {activity.subject && (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Subject:</span> {activity.subject}
            </p>
          )}

          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1.5 text-gray-400" />
            <span>{activity.date}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const defaultRightContent = (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold flex items-center gap-2">
        <Calendar className="h-5 w-5 text-blue-600" />
        Recent Activities
      </h3>
      <div className="space-y-3">
        {recentActivities.map((activity, index) => (
          <ActivityCard key={index} activity={activity} />
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Left side - Charts */}
      <div className="w-[65%] space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <ChartRadialStacked />
          <AttendanceSummaryCard actual={60} regularized={12} />
        </div>

        <div className="">
          <TableView
            data={attendanceData}
            columns={attendanceColumns}
            isToolBar={false}
            isPagination={false}
          />
          {/* <CustomBarChart
            title="Attendance by Subject"
            description="Overview of attendance percentages across different subjects"
            data={[
              { name: "Math", value: 85 },
              { name: "Science", value: 78 },
              { name: "English", value: 90 },
              { name: "History", value: 70 },
              { name: "Geography", value: 88 },
              { name: "ADA", value: 88 },
            ]}
            metricName="percentage"
            metricColor="#8B5CF6" // Purple
            peakValue={22}
            peakMonth="Week 2"
          /> */}
        </div>
      </div>

      {/* Right side - Activities */}
      <div className="w-[35%]">
        <div className="bg-white p-5 rounded-xl border border-gray-200 h-full">
          {rightContent || defaultRightContent}
        </div>
      </div>
    </div>
  );
}
