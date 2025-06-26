import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { faker } from "@faker-js/faker";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

// 1. Define Attendance Schema
const attendanceSchema = z.object({
  id: z.string(),
  subjectName: z.string(),
  subjectCode: z.string(),
  faculty: z.string(),
  totalClasses: z.number(),
  classesAttended: z.number(),
  percentage: z.number(),
});

export type Attendance = z.infer<typeof attendanceSchema>;

// 2. Attendance Columns
export const attendanceColumns: ColumnDef<Attendance>[] = [
  {
    accessorKey: "subjectName",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Subject Name"
        sortable={false}
      />
    ),
    cell: ({ row }) => (
      <div className="font-medium py-2">{row.getValue("subjectName")}</div>
    ),
  },
  // {
  //   accessorKey: "subjectCode",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Subject Code" />
  //   ),
  // },
  {
    accessorKey: "faculty",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Faculty" sortable={false} />
    ),
    cell: ({ row }) => {
      const faculty = row.getValue("faculty") as string;

      // Example hardcoded data (replace with actual data)
      const email = "faculty@example.com";
      const designation = "Assistant Professor";
      const employeeCode = "EMP1234";
      const profilePic = ""; // Add a valid image URL if available

      return (
        <HoverCard>
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="min-w-0">
              <HoverCardTrigger asChild>
                <p className="font-medium text-gray-900 truncate hover:underline hover:underline-offset-4">
                  {faculty}
                </p>
              </HoverCardTrigger>
            </div>
          </div>

          <HoverCardContent className="w-80">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 rounded-full">
                <AvatarImage
                  src={profilePic}
                  alt={faculty}
                  className="h-full w-full object-cover rounded-full"
                />
                <AvatarFallback className="bg-blue-100 text-blue-800 font-semibold rounded-full h-full w-full flex items-center justify-center">
                  {faculty.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold">{faculty}</p>
                <p className="text-sm text-muted-foreground">{designation}</p>
              </div>
            </div>
            <div className="mt-3 space-y-1 text-sm">
              <p>
                <strong>Email:</strong> {email}
              </p>
              <p>
                <strong>Emp Code:</strong> {employeeCode}
              </p>
            </div>
            <div className="mt-4 border-t pt-3">
              <Button variant="outline" size="sm">
                View Profile
              </Button>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "totalClasses",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Total Classes"
        sortable={false}
      />
    ),
  },
  {
    accessorKey: "classesAttended",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Attended"
        sortable={false}
      />
    ),
  },
  {
    accessorKey: "percentage",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Percenatge"
        sortable={false}
      />
    ),
    cell: ({ row }) => {
      const percentage = row.getValue("percentage") as number;
      const isLow = percentage < 75;

      return (
        <Badge
          className={
            isLow ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
          }
        >
          {percentage.toFixed(1)}%
        </Badge>
      );
    },
  },
];

// 3. Mock Data Generator
export const generateAttendanceData = (count = 6): Attendance[] => {
  return Array.from({ length: count }, () => {
    const totalClasses = faker.number.int({ min: 20, max: 40 });
    const classesAttended = faker.number.int({ min: 10, max: totalClasses });
    const percentage = (classesAttended / totalClasses) * 100;

    return {
      id: faker.string.uuid(),
      subjectName: faker.helpers.arrayElement([
        "Data Structures",
        "Algorithms",
        "Database Systems",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
      ]),
      subjectCode:
        faker.string.alpha(3).toUpperCase() + faker.string.numeric(3),
      faculty: faker.person.fullName(),
      totalClasses,
      classesAttended,
      percentage: parseFloat(percentage.toFixed(1)),
    };
  });
};

// Example usage:
export const attendanceData = generateAttendanceData();
