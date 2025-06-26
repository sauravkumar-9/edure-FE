import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import BasicInfo from "./schedulingLayouts/basicInfo";
import JobDetails from "./schedulingLayouts/jobDetails";
import Eligibility from "./schedulingLayouts/eligibility";
import Process from "./schedulingLayouts/process";
import Notification from "./schedulingLayouts/notification";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import showToast from "@/components/other/toast";

export default function PlacementDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    driveDate: "",
    status: "draft",
  });

  const handleSaveDraft = () => {
    setFormData({ ...formData, status: "draft" });
    setIsDialogOpen(false);
    showToast({
      title: "Saves as draft",
      description:
        "Report submitted successfully. Report submitted successfully.",
      type: "info",
    });
  };

  const handleScheduleDrive = () => {
    setFormData({ ...formData, status: "scheduled" });
    setIsDialogOpen(false);
    showToast({
      title: "Success",
      description:
        "Report submitted successfully. Report submitted successfully.",
      type: "success",
    });
  };

  const stats = [
    { title: "Total Drives", value: "24", change: "+5 from last year" },
    { title: "Students Placed", value: "187", change: "32% placement rate" },
    {
      title: "Offers Issued",
      value: "243",
      change: "Multiple offers included",
    },
    { title: "Highest Package", value: "₹42 LPA", change: "Amazon, 2023" },
  ];

  const topStudents = [
    {
      name: "Rahul Sharma",
      photo: "/avatars/rahul.jpg",
      package: "42 LPA",
      company: "Amazon",
      branch: "CSE",
    },
    {
      name: "Priya Patel",
      photo: "/avatars/priya.jpg",
      package: "38 LPA",
      company: "Microsoft",
      branch: "IT",
    },
    {
      name: "Amit Singh",
      photo: "/avatars/amit.jpg",
      package: "35 LPA",
      company: "Google",
      branch: "CSE",
    },
  ];

  const multiOfferStudents = [
    {
      name: "Ananya Reddy",
      branch: "CSE",
      offers: 3,
      companies: "TCS, Infosys, Wipro",
      photo: "/avatars/amit.jpg",
    },
    {
      name: "Karan Malhotra",
      branch: "CSE",
      offers: 2,
      companies: "Accenture, Cognizant",
      photo: "/avatars/amit.jpg",
    },
  ];

  const upcomingDrives = [
    {
      companyName: "Amazon",
      companyLogo: "https://logo.clearbit.com/amazon.com",
      date: "20th June 2025",
    },
    {
      companyName: "Apple",
      companyLogo: "https://logo.clearbit.com/apple.com",
      date: "25th June 2025",
    },
    {
      companyName: "Airbnb",
      companyLogo: "https://logo.clearbit.com/airbnb.com",
      date: "25th June 2025",
    },
    {
      companyName: "Dribbble",
      companyLogo: "https://logo.clearbit.com/dribbble.com",
      date: "25th June 2025",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Placement Management Dashboard</h1>
          <p className="text-muted-foreground">
            Track and manage all placement activities
          </p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">
            <PlusIcon className="w-4 h-4 mr-2" />
            Add Company
          </Button>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default">Schedule New Placement</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[900px] h-[700px] flex flex-col">
              <DialogHeader className="pb-2">
                <DialogTitle>Schedule New Placement Drive</DialogTitle>
              </DialogHeader>

              <div className="flex-1 overflow-y-auto space-y-6">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid grid-cols-5 sticky top-0 z-10">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="job">Job Details</TabsTrigger>
                    <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
                    <TabsTrigger value="process">Process</TabsTrigger>
                    <TabsTrigger value="notifications">
                      Notifications
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="basic" className="mt-6">
                    <BasicInfo />
                  </TabsContent>
                  <TabsContent value="job" className="mt-6">
                    <JobDetails />
                  </TabsContent>
                  <TabsContent value="eligibility" className="mt-6">
                    <Eligibility />
                  </TabsContent>
                  <TabsContent value="process" className="mt-6">
                    <Process />
                  </TabsContent>
                  <TabsContent value="notifications" className="mt-6">
                    <Notification />
                  </TabsContent>
                </Tabs>
              </div>

              <div className="border-t pt-4 flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Discard
                </Button>
                <div className="space-x-2">
                  <Button variant="secondary" onClick={handleSaveDraft}>
                    Save as Draft
                  </Button>
                  <Button onClick={handleScheduleDrive}>
                    Schedule Placement
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <CardDescription>{stat.title}</CardDescription>
              <CardTitle className="text-3xl">{stat.value}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Upcoming Drives */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Upcoming Placement Drives</CardTitle>
              <CardDescription>
                Scheduled drives in next 30 days
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {upcomingDrives.map((drive, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-3 border rounded-lg"
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={drive.companyLogo}
                    alt={`${drive.companyName} logo`}
                    className="rounded-full object-cover"
                  />
                  <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                    {drive.companyName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{drive.companyName}</p>
                  <p className="text-sm text-muted-foreground">{drive.date}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Top Students & Multi Offers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Packages</CardTitle>
            <CardDescription>Highest offers from current year</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topStudents.map((student, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 border rounded-lg"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={student.photo}
                      alt={`${student.name} logo`}
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                      {student.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {student.branch}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-green-600">
                      {student.package}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {student.company}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Multiple Offers</CardTitle>
            <CardDescription>Students with more than one offer</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {multiOfferStudents.map((student, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-3 border rounded-lg"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={student.photo}
                      alt={`${student.name} logo`}
                      className="rounded-full object-cover"
                    />
                    <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                      {student.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <p className="font-medium">{student.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        {student.branch}
                      </p>
                      <Badge variant="secondary">{student.offers} offers</Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground text-right">
                      {student.companies}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Icons
function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        d="M5 12h14M12 5v14"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
