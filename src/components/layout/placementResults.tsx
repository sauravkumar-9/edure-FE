import React from "react";
import TableView from "../table/table";
import { StatCard } from "../final/statCard";
import { Briefcase, UserCheck, Users, IndianRupee } from "lucide-react";

interface StudentAssignmentsProps {
  description?: string;
  userList: any[];
  columns: any[];
}

export const placementReportStatMockData = [
  {
    title: "Total Applicants",
    value: "154",
    change: "+12 from last drive",
    icon: <Users className="text-muted-foreground h-4 w-4" />,
  },
  {
    title: "Students Shortlisted",
    value: "48",
    change: "+5 from last drive",
    icon: <UserCheck className="text-muted-foreground h-4 w-4" />,
  },
  {
    title: "Final Offers Made",
    value: "22",
    change: "+4 from last drive",
    icon: <Briefcase className="text-muted-foreground h-4 w-4" />,
  },
  {
    title: "Highest Package",
    value: "₹18 LPA",
    change: "+2 LPA from last drive",
    icon: <IndianRupee className="text-muted-foreground h-4 w-4" />,
  },
];

export default function PlacementResults({
  userList,
  columns,
}: StudentAssignmentsProps) {
  const placementReportStat = placementReportStatMockData;

  return (
    <React.Fragment>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 pb-5">
        {placementReportStat.map((stat, idx) => (
          <StatCard
            key={idx}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </div>

      <TableView data={userList} columns={columns} />
    </React.Fragment>
  );
}
