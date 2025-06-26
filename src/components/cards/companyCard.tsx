import {
  CalendarIcon,
  GlobeIcon,
  ArrowRight,
  Briefcase,
  DollarSign,
  Users,
  MapPin,
  Clock,
} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { cn } from "@/lib/utils";
import { CompanyProfile } from "@/types/company";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface CompanyProfileHeaderProps {
  company: CompanyProfile;
  companyWebsite: string;
  placementDate: string;
  status: "Upcoming" | "Ongoing" | "Completed";
  hiringStats: {
    offersMade: number;
    highestPackage: string;
    averagePackage: string;
    studentsRegistered: number;
  };
  jobRoles: string[];
  location: string;
  deadline?: string;
}

const CompanyProfileHeader: React.FC<CompanyProfileHeaderProps> = ({
  company,
  companyWebsite,
  placementDate,
  status,
  hiringStats,
  jobRoles,
  location,
  deadline,
}) => {
  const statusStyles = {
    Upcoming: { bg: "bg-blue-100", text: "text-blue-800" },
    Ongoing: { bg: "bg-green-100", text: "text-green-800" },
    Completed: { bg: "bg-gray-100", text: "text-gray-800" },
  };

  return (
    <Card className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-90" />

      <CardContent className="relative px-6">
        {/* Top-right status badge */}
        <div className="absolute top-4 right-4 z-10">
          <Badge
            className={cn(
              statusStyles[status].bg,
              statusStyles[status].text,
              "px-3 py-1 text-sm font-medium"
            )}
          >
            {status}
          </Badge>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Company Logo */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <div className="w-32 h-32 rounded-xl border bg-white p-3 shadow-sm flex items-center justify-center">
              <img
                src={
                  company.profileImage ||
                  "https://via.placeholder.com/150?text=Company"
                }
                alt={company.name}
                className="w-full h-full object-contain"
              />
            </div>
            {status === "Ongoing" && (
              <Button className="gap-2 bg-green-600 hover:bg-green-700 text-white w-full">
                Apply Now
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-4">
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {company.name}
              </h1>

              {/* Job Roles */}
              {jobRoles.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {jobRoles.map((role, index) => (
                    <Badge key={index} variant="outline" className="text-sm">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {role}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Key Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {/* Website */}
                <div className="flex items-center gap-2 text-sm">
                  <GlobeIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <a
                    href={companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline hover:underline-offset-4 flex items-center gap-1 truncate"
                  >
                    {companyWebsite.replace(/^https?:\/\//, "")}
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>

                {/* Placement Date */}
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <CalendarIcon className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span>Drive: {placementDate}</span>
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600 text-sm">
                  <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                  <span>{location}</span>
                </div>

                {/* Deadline */}
                {deadline && (
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                    <span>Apply by: {deadline}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
              <div className="space-y-1">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  Registered
                </p>
                <p className="text-lg font-semibold">
                  {hiringStats.studentsRegistered}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  Offers
                </p>
                <p className="text-lg font-semibold">
                  {hiringStats.offersMade}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  Highest
                </p>
                <p className="text-lg font-semibold">
                  {hiringStats.highestPackage}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  Average
                </p>
                <p className="text-lg font-semibold">
                  {hiringStats.averagePackage}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyProfileHeader;
