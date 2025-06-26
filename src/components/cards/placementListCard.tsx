import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  Users,
  DollarSign,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PlacementCardProps {
  title: string;
  companyLogo: string;
  status: "ongoing" | "upcoming" | "closed";
  applicationDeadline: string;
  driveDate: string;
  location: string;
  packages?: {
    min?: string;
    max?: string;
    average?: string;
  };
  registeredStudents?: number;
  batches?: string[];
  onViewClick?: () => void;
  className?: string;
}

const statusLabel = {
  ongoing: "Ongoing",
  upcoming: "Upcoming",
  closed: "Closed",
};

const statusStyles = {
  ongoing: "bg-green-100 text-green-800 border border-green-300",
  upcoming: "bg-blue-100 text-blue-800 border border-blue-300",
  closed: "bg-gray-100 text-gray-700 border border-gray-300",
};

const PlacementListCard = ({
  title,
  companyLogo,
  status,
  applicationDeadline,
  driveDate,
  location,
  packages,
  registeredStudents,
  batches,
  onViewClick,
  className,
}: PlacementCardProps) => {
  return (
    <Card
      className={cn(
        "group relative flex flex-col justify-between rounded-xl border border-border bg-white p-6  transition-all hover:shadow-md transition-shadow cursor-pointer",
        className
      )}
      onClick={onViewClick}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <img
          src={companyLogo}
          alt={title}
          className="w-14 h-14 object-contain rounded-lg border bg-white p-1"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Calendar className="h-4 w-4" />
            <span>{driveDate}</span>
          </div>
        </div>

        <div className="absolute top-4 right-4">
          <span
            className={cn(
              "text-xs font-medium px-2 py-0.5 rounded-full",
              statusStyles[status]
            )}
          >
            {statusLabel[status]}
          </span>
        </div>
      </div>

      {/* Main Info */}
      <CardContent className="p-0 space-y-3 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-500" />
          <span>{location}</span>
        </div>

        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-amber-500" />
          <span>Apply by: {applicationDeadline}</span>
        </div>

        {packages?.average && (
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span>Avg Package: {packages.average} LPA</span>
          </div>
        )}

        {registeredStudents && (
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-purple-500" />
            <span>{registeredStudents} registered</span>
          </div>
        )}

        {batches && batches.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
              <Layers className="h-4 w-4 text-indigo-500" />
              Batches Eligible
            </div>
            <div className="flex flex-wrap gap-2">
              {batches.map((batch) => (
                <Badge
                  key={batch}
                  variant="outline"
                  className="text-xs border-gray-300 bg-gray-50"
                >
                  {batch}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      {/* Footer Button */}
      <CardFooter className="p-0">
        <Button
          className={cn(
            "w-full text-sm font-medium",
            status === "closed"
              ? "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
              : "bg-green-100 text-green-800 border border-green-300 hover:bg-green-200"
          )}
          size="sm"
        >
          <Briefcase className="h-4 w-4 mr-2" />
          {status === "closed" ? "View Details" : "Apply Now"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PlacementListCard;
