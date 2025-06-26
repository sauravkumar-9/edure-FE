import { SectionHeading } from "@/components/final/sectionHeading";
import { WelcomeBanner } from "@/components/final/welcomeBanner";
import { CalendarSidebar } from "@/components/layout/calenderSidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  AlertCircleIcon,
  AlertTriangle,
  BellIcon,
  Calendar,
  CalendarDaysIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  SearchIcon,
  TrendingDown,
  UsersIcon,
} from "lucide-react";
import welcomeImage from "@/assets/vector/placementWelcome.png";
const dummyDrives = {
  urgentDrives: [
    {
      id: 1,
      company: "Amazon",
      companyLogo: "https://logo.clearbit.com/amazon.com",
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: "10:00 AM - 2:00 PM",
      location: "Main Auditorium, Block A",
      pendingRequests: 12,
      registrationPercentage: 68,
      registeredStudents: 34,
      totalSeats: 50,
      jobRoles: ["Software Engineer", "Data Analyst"],
      packageRange: "8-12 LPA",
      exceptionRequests: 20,
    },
    {
      id: 2,
      company: "Apple",
      companyLogo: "https://logo.clearbit.com/apple.com",
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: "9:30 AM - 1:30 PM",
      location: "Seminar Hall, Block B",
      pendingRequests: 8,
      registrationPercentage: 82,
      registeredStudents: 41,
      totalSeats: 50,
      jobRoles: ["Financial Analyst", "Risk Manager"],
      packageRange: "7-10 LPA",
      exceptionRequests: 20,
    },
  ],
  todaysDrives: [
    {
      id: 1,
      company: "Airbnb",
      companyLogo: "https://logo.clearbit.com/airbnb.com",
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: "10:00 AM - 2:00 PM",
      location: "Main Auditorium, Block A",
      pendingRequests: 12,
      registrationPercentage: 68,
      registeredStudents: 34,
      totalSeats: 50,
      jobRoles: ["Software Engineer", "Data Analyst"],
      packageRange: "8-12 LPA",
      exceptionRequests: 20,
    },
  ],
};
const gradientFrom = "from-blue-200";
const gradientVia = "via-indigo-200";
const gradientTo = "to-purple-200";
export function PlacementCatchupDashboard() {
  const { urgentDrives, todaysDrives } = dummyDrives;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left Content - Scrollable */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-4">
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
          imageCustomClass="w-full max-w-[400px] md:max-w-[300px]"
        />

        <div className="space-y-4">
          <SectionHeading
            icon={<Calendar className="h-5 w-5" />}
            title="Todays Drive"
            count={10}
            colorClass="blue"
          />
          {todaysDrives.map((drive) => (
            <Card
              key={drive.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                {/* Company Logo */}
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={drive.companyLogo}
                    alt={`${drive.company} logo`}
                    className="rounded-full object-cover"
                  />
                  <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                    {drive.company.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {drive.company}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPinIcon className="h-4 w-4 mr-1 text-gray-500" />
                        {drive.location}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1"></div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <SectionHeading
            icon={<Calendar className="h-5 w-5" />}
            title="Upcoming Drives (7 Days)"
            count={10}
            colorClass="blue"
          />
          {urgentDrives.map((drive) => (
            <Card
              key={drive.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                {/* Company Logo */}
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={drive.companyLogo}
                    alt={`${drive.company} logo`}
                    className="rounded-full object-cover"
                  />
                  <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                    {drive.company.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {drive.company}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mt-1">
                        <MapPinIcon className="h-4 w-4 mr-1 text-gray-500" />
                        {drive.location}
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge
                        variant="destructive"
                        className="w-fit bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                      >
                        {drive.exceptionRequests} Exception Requests
                      </Badge>
                    </div>
                  </div>

                  {/* Date and Time together */}
                  <div className="flex items-center text-sm text-gray-700 bg-gray-50 px-2 py-1 rounded-md w-fit">
                    <CalendarIcon className="h-4 w-4 mr-1 text-gray-500" />
                    {new Date(drive.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                    <span className="mx-1">•</span>
                    <ClockIcon className="h-4 w-4 mr-1 text-gray-500" />
                    {drive.time}
                  </div>

                  {/* Registration Stats */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center text-sm">
                        <UsersIcon className="h-4 w-4 mr-1 text-gray-500" />
                        <span className="font-medium text-gray-900">
                          {drive.registeredStudents}
                        </span>
                        <span className="text-gray-500 mx-1">/</span>
                        <span className="text-gray-500">
                          {drive.totalSeats}
                        </span>
                      </div>

                      <div className="flex items-center text-sm">
                        {drive.registrationPercentage >= 75 ? (
                          <>
                            <span className="text-green-600 ml-1">
                              {drive.registrationPercentage}%
                            </span>
                          </>
                        ) : (
                          <>
                            <AlertTriangle className="h-4 w-4 text-red-500" />

                            <span className="text-red-600 ml-1">
                              {drive.registrationPercentage}%
                            </span>
                            <span className="text-xs text-red-500 ml-1">
                              (Low)
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Right Sidebar - Fixed */}
      <div className="lg:w-[400px] h-[100vh] overflow-hidden space-y-4">
        <CalendarSidebar />
      </div>
    </div>
  );
}
