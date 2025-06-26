import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { faker } from "@faker-js/faker";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { ProfileHoverCard } from "@/components/cards/profileHoverCard";
import { IndianRupee } from "lucide-react";

// 1. Define Placement Status
type PlacementStatus = "placed" | "not_placed";

// 2. Define Placement Type
interface Placement {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  year: number;
  cgpa: number;
  status: PlacementStatus;
  companyName: string;
  jobRole: string;
  packageAmount: number;
  offerDate: Date;
  totalOffers: number;
  skills: string[];
}

// 3. Placement Statistics Columns
export const placementStatsColumns: ColumnDef<Placement>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "studentInfo",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student" />
    ),
    cell: ({ row }) => {
      const { id, firstName, lastName, department, year, studentId, email } =
        row.original;

      return (
        <ProfileHoverCard
          id={id}
          firstName={firstName}
          lastName={lastName}
          department={department}
          year={year}
          studentId={studentId}
          email={email}
          onViewDetails={() => console.log("View placement details:", id)}
        />
      );
    },
    meta: { className: "min-w-[180px]" },
  },
  {
    accessorKey: "studentId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student ID" />
    ),
    cell: ({ row }) => (
      <div className="font-mono">{row.getValue("studentId")}</div>
    ),
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => (
      <div className="text-sm">{row.getValue("department")}</div>
    ),
  },
  {
    accessorKey: "year",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Year" />
    ),
    cell: ({ row }) => `${row.getValue("year")}`,
  },
  {
    accessorKey: "cgpa",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="CGPA" />
    ),
    cell: ({ row }) => {
      const cgpa = row.getValue("cgpa") as number;
      const colorClass =
        cgpa >= 8.5
          ? "text-green-500"
          : cgpa >= 7
          ? "text-yellow-500"
          : "text-red-500";
      return (
        <span className={`font-semibold ${colorClass}`}>{cgpa.toFixed(2)}</span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Placement Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as PlacementStatus;
      const statusMap: Record<PlacementStatus, string> = {
        placed: "text-green-600",
        not_placed: "text-gray-500",
      };
      return (
        <span className={cn("capitalize font-medium", statusMap[status])}>
          {status.replace("_", " ")}
        </span>
      );
    },
  },
  {
    accessorKey: "totalOffers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Offers" />
    ),
    cell: ({ row }) => <div>{row.getValue("totalOffers")}</div>,
  },
  {
    accessorKey: "packageAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Package (LPA)" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("packageAmount") as number;
      return amount > 0 ? (
        <div className="flex items-center gap-1 text-gray-700">
          <IndianRupee className="h-4 w-4" />
          {amount.toFixed(2)}
        </div>
      ) : (
        <div>-</div>
      );
    },
  },
  {
    accessorKey: "jobRole",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Job Role" />
    ),
    cell: ({ row }) => row.getValue("jobRole") || "-",
  },
  {
    accessorKey: "companyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("companyName") || "-"}</div>
    ),
  },
  {
    accessorKey: "offerDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Offer Date" />
    ),
    cell: ({ row }) => new Date(row.getValue("offerDate")).toLocaleDateString(),
  },
];

interface Placement {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  year: number;
  cgpa: number;
  status: PlacementStatus;
  companyName: string;
  jobRole: string;
  packageAmount: number;
  offerDate: Date;
  totalOffers: number;
  skills: string[];
}

export const placementStatsMock: Placement[] = Array.from(
  { length: 30 },
  () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const status = faker.helpers.weightedArrayElement([
      { weight: 7, value: "placed" },
      { weight: 3, value: "not_placed" },
    ]) as PlacementStatus;

    const isPlaced = status === "placed";
    const totalOffers = isPlaced ? faker.number.int({ min: 1, max: 5 }) : 0;

    return {
      id: faker.string.uuid(),
      studentId: `STU${faker.string.numeric(6)}`,
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      department: faker.helpers.arrayElement([
        "Computer Science",
        "Electrical",
        "Mechanical",
        "Electronics",
        "Civil",
        "Information Technology",
      ]),
      year: faker.number.int({ min: 3, max: 4 }),
      cgpa: parseFloat(faker.number.float({ min: 6, max: 10 }).toFixed(2)),
      status,
      companyName: isPlaced ? faker.company.name() : "-",
      jobRole: isPlaced
        ? faker.helpers.arrayElement([
            "Software Engineer",
            "Backend Developer",
            "Frontend Engineer",
            "QA Analyst",
            "Data Analyst",
            "DevOps Engineer",
          ])
        : "-",
      packageAmount: isPlaced
        ? parseFloat(faker.number.float({ min: 3, max: 25 }).toFixed(2))
        : 0,
      offerDate: isPlaced
        ? faker.date.recent({ days: 180 })
        : faker.date.future({ years: 1 }),
      totalOffers,
      skills: Array.from({ length: faker.number.int({ min: 3, max: 8 }) }, () =>
        faker.helpers.arrayElement([
          "Java",
          "Python",
          "React",
          "Node.js",
          "SQL",
          "AWS",
          "Data Structures",
          "TypeScript",
          "MongoDB",
          "C++",
        ])
      ).filter((v, i, a) => a.indexOf(v) === i),
    };
  }
);
