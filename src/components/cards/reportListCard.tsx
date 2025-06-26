import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, BarChart2 } from "lucide-react";
import { Report } from "@/types/report";
import { Badge } from "@/components/ui/badge";

interface ReportCardProps {
  report: Report;
}

export const ReportListCard: React.FC<ReportCardProps> = ({ report }) => {
  return (
    <Card className="w-full bg-white hover:shadow-lg transition-shadow duration-200 relative">
      {/* <Card className="overflow-hidden hover:bg-muted/50 transition-colors"> */}
      <CardContent className="px-4">
        <div className="flex items-center justify-between">
          {/* Left Content */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-md flex items-center justify-center bg-blue-100">
              <BarChart2 className="text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-base text-gray-800">
                {report.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {report.description}
              </p>

              {report.category && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {Array.isArray(report.category) ? (
                    report.category.map((cat) => (
                      <Badge
                        key={cat}
                        variant="outline"
                        className="text-xs border-gray-300 bg-gray-50"
                      >
                        {cat}
                      </Badge>
                    ))
                  ) : (
                    <Badge
                      variant="outline"
                      className="text-xs border-gray-300 bg-gray-50 mt-2"
                    >
                      {report.category}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Chevron */}
          <ChevronRight className="h-5 w-5 text-gray-400 mt-1" />
        </div>
      </CardContent>
    </Card>
  );
};
