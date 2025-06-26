import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Mail,
  BookOpen,
  Calendar,
  GraduationCap,
  User,
  Home,
} from "lucide-react";

interface ProfileHoverCardProps {
  id: string;
  firstName: string;
  lastName: string;
  department: string;
  year: number;
  studentId: string;
  email: string;
  enrollmentDate?: string;
  major?: string;
  campus?: string;
  onViewDetails?: () => void;
}

export function ProfileHoverCard({
  id,
  firstName,
  lastName,
  department,
  year,
  studentId,
  email,
  enrollmentDate,
  major,
  campus,
  onViewDetails,
}: ProfileHoverCardProps) {
  const avatarFallback =
    firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();

  return (
    <HoverCard>
      <div className="flex items-center space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`}
            alt={`${firstName} ${lastName}`}
          />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <HoverCardTrigger asChild>
          <span className="font-medium hover:underline hover:underline-offset-4 hover:cursor-pointer">
            {`${firstName} ${lastName}`}
          </span>
        </HoverCardTrigger>
      </div>

      <HoverCardContent className="w-96 p-0" align="start" side="bottom">
        <div className="space-y-4 p-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-14 w-14 border">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`}
                alt={`${firstName} ${lastName}`}
              />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h4 className="text-lg font-semibold">{`${firstName} ${lastName}`}</h4>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <GraduationCap className="h-4 w-4" />
                <span>{department}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{studentId}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm truncate">{email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{major || "Undeclared"}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Year {year}</span>
              </div>
              {campus && (
                <div className="flex items-center space-x-2">
                  <Home className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{campus}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="border-t px-4 py-3 flex justify-between items-center">
          {enrollmentDate && (
            <p className="text-xs text-muted-foreground">
              Enrolled: {enrollmentDate}
            </p>
          )}
          <Button
            variant="outline"
            size="sm"
            className="ml-auto"
            onClick={onViewDetails}
          >
            View Full Profile
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
