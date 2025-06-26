import { useState } from "react";
import { CheckCircle, XCircle, MapPin, Calendar, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { Job } from "./data";

interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
  onSave?: (jobId: string) => void;
}

export function JobCard({ job, onApply }: JobCardProps) {
  const handleApply = () => {
    onApply?.(job.id);
  };

  const isEligible = job.isEligible; // assumed to be boolean

  return (
    <Card className="w-full max-w-sm bg-white hover:shadow-lg transition-shadow duration-200 relative px-6 pt-6 pb-5">
      <CardHeader className="pb-3 px-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={job.companyLogo}
                alt={`${job.company} logo`}
                className="rounded-full object-cover"
              />
              <AvatarFallback className="bg-gray-100 text-gray-600 font-semibold">
                {job.company.charAt(0)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Eligibility label */}
          <div
            className={`flex items-center gap-1 px-2 py-1 text-xs rounded-full font-medium ${
              isEligible
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {isEligible ? (
              <>
                <CheckCircle className="h-4 w-4" />
                Eligible
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4" />
                Not Eligible
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-0">
        <div className="mb-5">
          <h1 className="text-lg font-semibold text-gray-900 leading-tight mb-2">
            {job.company}
          </h1>

          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Calendar className="h-3 w-3 mr-1" />
            22/10/2024
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin className="h-3 w-3 mr-1" />
            {job.location}
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Eligible Branches</h3>
          <div className="flex flex-wrap gap-2 mb-4 mt-2">
            {job.jobType.map((type: any) => (
              <Badge
                key={type}
                variant="secondary"
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 font-semibold px-3 py-1"
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>

      <CardFooter className="pt-0 border-t border-gray-200 px-0">
        <div className="w-full flex items-center justify-between mt-4">
          <div>
            <p className="text-lg font-semibold text-gray-900">{job.salary}</p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Users className="h-3 w-3 mr-1" />
              122
            </div>
          </div>

          <Button
            onClick={handleApply}
            className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 text-sm rounded-md transition-colors"
          >
            Apply now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
