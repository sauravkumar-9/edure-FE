import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  AlertCircle,
  BookOpen,
  Users,
  Bell,
  FileText,
  GraduationCap,
  ClipboardList,
  UserX,
  TrendingDown,
  Bookmark,
  BarChart2,
} from "lucide-react";
import { WelcomeBanner } from "@/components/final/welcomeBanner";
import welcomeImage from "@/assets/vector/teacherWelcome.png";
import { CalendarSidebar } from "@/components/layout/calenderSidebar";

export default function TeacherDashboard() {
  // Sample data for teacher dashboard
  const todaysClasses = [
    {
      id: 1,
      subject: "Grade 10 Mathematics",
      time: "9:00 - 10:30 AM",
      topic: "Quadratic Equations",
      room: "MATH-201",
      totalStudents: 32,
    },
    {
      id: 2,
      subject: "Grade 11 Physics",
      time: "11:00 - 12:30 PM",
      topic: "Electromagnetic Waves",
      room: "SCI-105",
      totalStudents: 28,
    },
  ];

  const attendanceSummary = [
    {
      id: 1,
      class: "Grade 10 Mathematics",
      absentToday: 4,
      weeklyAttendance: 87,
      trend: "up", // up, down, or neutral
    },
    {
      id: 2,
      class: "Grade 11 Physics",
      absentToday: 2,
      weeklyAttendance: 92,
      trend: "neutral",
    },
  ];

  const gradingInProgress = [
    {
      id: 1,
      assignment: "Algebra Midterm",
      class: "Grade 10 Math",
      graded: 18,
      total: 32,
      dueDate: "2023-11-20",
    },
    {
      id: 2,
      assignment: "Physics Lab Report",
      class: "Grade 11 Physics",
      graded: 12,
      total: 28,
      dueDate: "2023-11-22",
    },
  ];

  const pendingReports = [
    {
      id: 1,
      type: "Quarterly Report",
      class: "Grade 10 Mathematics",
      status: "Draft",
      deadline: "2023-11-25",
    },
    {
      id: 2,
      type: "Parent Conference Notes",
      class: "Grade 11 Physics",
      status: "Pending Review",
      deadline: "2023-11-28",
    },
  ];

  const scheduledMeetings = [
    {
      id: 1,
      type: "Parent-Teacher",
      student: "Alex Johnson",
      time: "Today, 3:00 PM",
      location: "Room 201",
    },
    {
      id: 2,
      type: "Department",
      topic: "Curriculum Review",
      time: "Tomorrow, 2:00 PM",
      location: "Conference Room B",
    },
  ];

  const performanceConcerns = [
    {
      id: 1,
      student: "Morgan Taylor",
      class: "Grade 10 Math",
      drop: 15, // percentage drop
      missingAssignments: 3,
    },
    {
      id: 2,
      student: "Jordan Smith",
      class: "Grade 11 Physics",
      drop: 22,
      missingAssignments: 5,
    },
  ];

  const participationIssues = [
    {
      id: 1,
      class: "Grade 10 Mathematics",
      nonSubmitters: 6,
      totalStudents: 32,
      assignment: "Problem Set 5",
      deadline: "2023-11-18",
    },
    {
      id: 2,
      class: "Grade 11 Physics",
      nonSubmitters: 4,
      totalStudents: 28,
      assignment: "Lab Report 3",
      deadline: "2023-11-20",
    },
  ];

  const classComparison = [
    {
      id: 1,
      class: "Grade 10 Mathematics",
      average: 78,
      schoolAverage: 72,
      trend: "up",
    },
    {
      id: 2,
      class: "Grade 11 Physics",
      average: 85,
      schoolAverage: 82,
      trend: "neutral",
    },
  ];

  const gradientFrom = "from-blue-200";
  const gradientVia = "via-indigo-200";
  const gradientTo = "to-purple-200";
  return (
    <div className="flex min-h-screen gap-8">
      {/* Main Content */}
      <div className="flex-1 space-y-6">
        {/* Header */}
        <WelcomeBanner
          welcomeMessage="Welcome Back, Ajay!"
          subMessage="Take a moment to review the key updates and tasks that need your attention today."
          actionElement={
            <Button
              variant="outline"
              size="sm"
              className={`bg-gradient-to-r ${gradientFrom} ${gradientVia} ${gradientTo} py-5`}
            >
              <Calendar className={`h-4 w-4 mr-2`} />
              View Calendar
            </Button>
          }
          imageUrl={welcomeImage}
          imageCustomClass="w-full max-w-[400px] md:max-w-[270px]"
        />

        {/* Today's Classes */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            Today's Classes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {todaysClasses.map((cls) => (
              <Card key={cls.id} className="hover:shadow-md">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold">{cls.subject}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {cls.time} • {cls.room}
                      </p>
                      <p className="text-sm text-blue-600 mt-2">
                        Topic: {cls.topic}
                      </p>
                    </div>
                    <span className="bg-blue-50 text-blue-800 text-xs px-2 py-1 rounded">
                      {cls.totalStudents} students
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      Lesson Plan
                    </Button>
                    <Button size="sm" className="flex-1">
                      Take Attendance
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <UserX className="h-5 w-5 text-orange-600" />
              Attendance Summary
            </h3>
            <div className="space-y-4">
              {attendanceSummary.map((item) => (
                <Card key={item.id} className="hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-medium">{item.class}</h4>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          item.trend === "up"
                            ? "bg-green-100 text-green-800"
                            : item.trend === "down"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.trend === "up"
                          ? "↑ Improving"
                          : item.trend === "down"
                          ? "↓ Declining"
                          : "→ Steady"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <p className="text-sm text-gray-500">Absent Today</p>
                        <p className="text-xl font-semibold">
                          {item.absentToday}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Weekly %</p>
                        <p className="text-xl font-semibold">
                          {item.weeklyAttendance}%
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Grading in Progress */}
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              Grading in Progress
            </h3>
            <div className="space-y-4">
              {gradingInProgress.map((item) => (
                <Card key={item.id} className="hover:shadow-md">
                  <CardContent className="p-4">
                    <h4 className="font-medium">{item.assignment}</h4>
                    <p className="text-sm text-gray-600">{item.class}</p>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>
                          Graded: {item.graded}/{item.total}
                        </span>
                        <span>Due: {item.dueDate}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-purple-600 h-2 rounded-full"
                          style={{
                            width: `${Math.round(
                              (item.graded / item.total) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      Continue Grading
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Reports and Meetings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <ClipboardList className="h-5 w-5 text-green-600" />
              Draft Reports
            </h3>
            <div className="space-y-4">
              {pendingReports.map((report) => (
                <Card key={report.id} className="hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{report.type}</h4>
                        <p className="text-sm text-gray-600">{report.class}</p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          report.status === "Draft"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {report.status}
                      </span>
                    </div>
                    <div className="mt-3 flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Deadline: {report.deadline}
                      </p>
                      <Button variant="outline" size="sm">
                        {report.status === "Draft" ? "Continue" : "Review"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Users className="h-5 w-5 text-red-600" />
              Scheduled Meetings
            </h3>
            <div className="space-y-4">
              {scheduledMeetings.map((meeting) => (
                <Card key={meeting.id} className="hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">
                          {meeting.type} Meeting
                          {meeting.student && ` - ${meeting.student}`}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {meeting.time} • {meeting.location}
                        </p>
                        {meeting.topic && (
                          <p className="text-sm text-gray-600">
                            Topic: {meeting.topic}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button variant="outline" size="sm" className="w-full">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Performance and Participation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-red-600" />
              Performance Drops
            </h3>
            <div className="space-y-4">
              {performanceConcerns.map((student) => (
                <Card key={student.id} className="hover:shadow-md">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{student.student}</h4>
                        <p className="text-sm text-gray-600">{student.class}</p>
                      </div>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        ↓ {student.drop}%
                      </span>
                    </div>
                    <div className="mt-3">
                      <p className="text-sm text-gray-600">
                        Missing assignments: {student.missingAssignments}
                      </p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button variant="outline" size="sm" className="flex-1">
                        View Profile
                      </Button>
                      <Button size="sm" className="flex-1">
                        Contact Parent
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Bookmark className="h-5 w-5 text-yellow-600" />
              Low Participation
            </h3>
            <div className="space-y-4">
              {participationIssues.map((item) => (
                <Card key={item.id} className="hover:shadow-md">
                  <CardContent className="p-4">
                    <h4 className="font-medium">{item.class}</h4>
                    <p className="text-sm text-gray-600">{item.assignment}</p>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span>
                          Not submitted: {item.nonSubmitters}/
                          {item.totalStudents}
                        </span>
                        <span>Due: {item.deadline}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-yellow-500 h-2 rounded-full"
                          style={{
                            width: `${Math.round(
                              (item.nonSubmitters / item.totalStudents) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full mt-3">
                      Send Reminder
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Class Comparison */}
        <div>
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-indigo-600" />
            Class Comparison
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classComparison.map((item) => (
              <Card key={item.id} className="hover:shadow-md">
                <CardContent className="p-4">
                  <h4 className="font-medium">{item.class}</h4>
                  <div className="grid grid-cols-2 gap-4 mt-3">
                    <div>
                      <p className="text-sm text-gray-500">Class Average</p>
                      <p className="text-xl font-semibold">{item.average}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">School Average</p>
                      <p className="text-xl font-semibold">
                        {item.schoolAverage}%
                      </p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        item.trend === "up"
                          ? "bg-green-100 text-green-800"
                          : item.trend === "down"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {item.trend === "up"
                        ? "↑ Above average"
                        : item.trend === "down"
                        ? "↓ Below average"
                        : "→ On par"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="lg:w-[400px] h-[100vh] overflow-hidden space-y-4">
        <CalendarSidebar />
      </div>
    </div>
  );
}
