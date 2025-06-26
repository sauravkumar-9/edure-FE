import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  AlertTriangle,
  BookOpen,
  Briefcase,
  Bell,
  PlusIcon,
  MapPin,
  Badge,
} from "lucide-react";
import { AnnouncementCard } from "@/components/final/announcementCard";
import { SectionHeading } from "@/components/final/sectionHeading";
import { CalendarSidebar } from "@/components/layout/calenderSidebar";
import { WelcomeBanner } from "@/components/final/welcomeBanner";
import welcomeImage from "@/assets/vector/studentWelcome.png";

export default function StudentCatchUp() {
  const upcomingExams = [
    {
      id: "1",
      name: "Internal Exam 1",
      startDate: "2024-02-15",
      endDate: "2024-02-15",
      time: "09:00 AM - 12:00 PM",
      roomNumber: "A-101",
    },
    {
      id: "2",
      name: "Internal Exam 2",
      startDate: "2024-03-10",
      endDate: "2024-03-10",
      time: "02:00 PM - 04:00 PM",
      roomNumber: "B-205",
    },
  ].map((exam) => ({
    ...exam,
    formattedDate: new Date(exam.startDate).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
  }));

  const placementRegistrations = [
    { id: 1, company: "Google", deadline: "2023-11-10", registered: false },
    { id: 2, company: "Microsoft", deadline: "2023-11-12", registered: true },
    { id: 3, company: "Amazon", deadline: "2023-11-15", registered: false },
  ];

  const attendanceData = [
    { subject: "Mathematics", percentage: 65, threshold: 75 },
    { subject: "Computer Networks", percentage: 68, threshold: 75 },
    { subject: "Data Structures", percentage: 72, threshold: 75 },
  ];

  const importantAnnouncements = [
    {
      id: 1,
      title: "Campus Recruitment Drive",
      date: "2023-11-05",
      content: "TCS will be conducting campus interviews on Nov 20th",
    },
    {
      id: 2,
      title: "Semester Project Submission",
      date: "2023-11-08",
      content: "Final project submission deadline extended to Nov 25th",
    },
    {
      id: 2,
      title: "Semester Project Submission",
      date: "2023-11-08",
      content: "Final project submission deadline extended to Nov 25th",
    },
  ];

  // utils/exam-utils.ts
  // utils/exam-utils.ts
  function calculateDaysLeft(startDate: string): number {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const examDate = new Date(startDate);
    examDate.setHours(0, 0, 0, 0);
    return Math.ceil(
      (examDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );
  }

  function formatDateRange(startDate: string, endDate: string): string {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (start.toDateString() === end.toDateString()) {
      return start.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
    }

    return `${start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })} - ${end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })}`;
  }

  const gradientFrom = "from-blue-200";
  const gradientVia = "via-indigo-200";
  const gradientTo = "to-purple-200";

  return (
    <div className="flex min-h-screen gap-8 text-gray-900">
      <div className="flex-1 space-y-6">
        <WelcomeBanner
          welcomeMessage="Welcome back, Saurav!"
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
          imageCustomClass="w-full max-w-[300px] md:max-w-[250px]"
        />

        <div className="space-y-6">
          <div>
            <SectionHeading
              icon={<Calendar className="h-5 w-5" />}
              title="Upcoming Exams"
              count={upcomingExams.length}
              colorClass="blue"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingExams.map((exam) => {
                const daysLeft = calculateDaysLeft(exam.startDate);
                const isToday = daysLeft === 0;
                const isTomorrow = daysLeft === 1;

                return (
                  <Card key={exam.id} className="hover:shadow-md p-0">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold">{exam.name}</h4>
                      </div>

                      <div className="mt-4 space-y-1">
                        <p className="text-sm text-muted-foreground">
                          Starts:
                          {formatDateRange(exam.startDate, exam.endDate)}
                        </p>
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                      >
                        Schedule
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div>
            <SectionHeading
              icon={<Briefcase className="h-5 w-5" />}
              title="Placement Registrations"
              count={placementRegistrations.filter((p) => !p.registered).length}
              colorClass="yellow"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {placementRegistrations.map((placement) => (
                <Card
                  key={placement.id}
                  className="hover:shadow-md transition-shadow p-1"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold">{placement.company}</h4>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                          placement.registered
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {placement.registered ? "Registered" : "Pending"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">
                      {placement.deadline}
                    </p>
                    <Button
                      variant={placement.registered ? "outline" : "default"}
                      className="w-full mt-4"
                    >
                      {placement.registered ? "View Details" : "Apply Now"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              icon={<AlertTriangle className="h-5 w-5" />}
              title="Attendance Alerts"
              count={
                attendanceData.filter((a) => a.percentage < a.threshold).length
              }
              colorClass="yellow"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {attendanceData.map((item, index) => (
                <Card
                  key={index}
                  className="hover:shadow-md transition-shadow p-1"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{item.subject}</h4>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          item.percentage < item.threshold
                            ? "bg-red-100 text-red-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {item.percentage}%
                      </span>
                    </div>
                    <div className="mt-3 text-sm mb-1 flex justify-between font-medium text-gray-700">
                      <span>Current: {item.percentage}%</span>
                    </div>
                    <div className="relative w-full h-2 rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className={`h-full ${
                          item.percentage < item.threshold
                            ? "bg-red-400"
                            : "bg-green-400"
                        }`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    {item.percentage < item.threshold && (
                      <Button variant="outline" className="w-full mt-4">
                        Regularize
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="w-80 shrink-0">
        <div className="sticky top-1 space-y-6">
          <SectionHeading
            icon={<Bell className="h-5 w-5" />}
            title="Announcements"
            count={importantAnnouncements.length}
            colorClass="orange"
          />

          <div className="space-y-4">
            {importantAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                id={announcement.id}
                title={announcement.title}
                content={announcement.content}
                date={announcement.date}
                onReadMore={() => {
                  console.log("Read more clicked for:", announcement.id);
                }}
              />
            ))}
          </div>
        </div>
      </div> */}
      <div className="lg:w-[400px] h-[100vh] overflow-hidden space-y-4">
        <CalendarSidebar />
      </div>
    </div>
  );
}
