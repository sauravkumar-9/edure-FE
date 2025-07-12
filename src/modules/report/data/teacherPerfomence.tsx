import { ColumnDef } from "@tanstack/react-table";
import { faker } from "@faker-js/faker";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { ProfileHoverCard } from "@/components/cards/profileHoverCard";

// 1. Define Teacher Performance Type
export interface TeacherPerformance {
  id: string;
  teacherId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  totalDays: number;
  attendedDays: number;
  attendancePercentage: number;
  totalClasses: number;
  ratingOutOf10: number;
  totalReviews: number;
  experience: number;
  highestEducation: string;
  joinedYear: number;
  status: "Active" | "Notice" | "Quit";
}

// 2. Teacher Performance Columns
export const teacherPerformanceColumns: ColumnDef<TeacherPerformance>[] = [
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
    id: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Faculty Name" />
    ),
    cell: ({ row }) => {
      const {
        id,
        firstName,
        lastName,
        department,
        email,
        teacherId,
        joinedYear,
      } = row.original;

      return (
        <ProfileHoverCard
          id={id}
          firstName={firstName}
          lastName={lastName}
          department={department}
          studentId={teacherId}
          email={email}
          year={joinedYear}
          onViewDetails={() => console.log("View profile:", id)}
        />
      );
    },
    meta: { className: "sticky left-0 z-10 min-w-[180px] bg-white" },
  },
  {
    accessorKey: "teacherId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Faculty ID" />
    ),
    cell: ({ row }) => <span>{row.getValue("teacherId")}</span>,
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => <span>{row.getValue("department")}</span>,
  },
  {
    accessorKey: "totalDays",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Days" />
    ),
    cell: ({ row }) => <span>{row.getValue("totalDays")}</span>,
  },
  {
    accessorKey: "attendedDays",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Attended Days" />
    ),
    cell: ({ row }) => <span>{row.getValue("attendedDays")}</span>,
  },
  {
    accessorKey: "attendancePercentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Attendance %" />
    ),
    cell: ({ row }) => (
      <span>
        {(row.getValue("attendancePercentage") as number).toFixed(2)}%
      </span>
    ),
  },
  {
    accessorKey: "totalClasses",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Classes" />
    ),
    cell: ({ row }) => <span>{row.getValue("totalClasses")}</span>,
  },
  {
    accessorKey: "ratingOutOf10",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rating (10)" />
    ),
    cell: ({ row }) => (
      <span>{(row.getValue("ratingOutOf10") as number).toFixed(1)}</span>
    ),
  },
  {
    accessorKey: "totalReviews",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Reviews" />
    ),
    cell: ({ row }) => <span>{row.getValue("totalReviews")}</span>,
  },
  {
    accessorKey: "experience",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Experience (yrs)" />
    ),
    cell: ({ row }) => <span>{row.getValue("experience")}</span>,
  },
  {
    accessorKey: "highestEducation",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Education" />
    ),
    cell: ({ row }) => <span>{row.getValue("highestEducation")}</span>,
  },
  {
    accessorKey: "joinedYear",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined Year" />
    ),
    cell: ({ row }) => <span>{row.getValue("joinedYear")}</span>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const colorMap = {
        Active: "bg-green-100 text-green-800",
        Notice: "bg-yellow-100 text-yellow-800",
        Quit: "bg-red-100 text-red-800",
      };
      return (
        <Badge className={colorMap[status as keyof typeof colorMap]}>
          {status}
        </Badge>
      );
    },
  },
];

// 3. Mock Data
export const teacherPerformanceMock: TeacherPerformance[] = Array.from(
  { length: 20 },
  (_, i) => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const department = faker.helpers.arrayElement([
      "Computer Science",
      "Mathematics",
      "Physics",
      "Chemistry",
      "English",
      "History",
    ]);
    const totalDays = faker.number.int({ min: 180, max: 220 });
    const attendedDays = faker.number.int({ min: 140, max: totalDays });
    const attendancePercentage = (attendedDays / totalDays) * 100;
    const ratingOutOf10 = faker.number.float({ min: 5, max: 10 });
    const experience = faker.number.int({ min: 1, max: 25 });
    const joinedYear = 2024 - experience;
    const education = faker.helpers.arrayElement([
      "M.Sc",
      "M.A",
      "Ph.D",
      "B.Ed",
      "M.Tech",
      "M.Phil",
    ]);
    const status = faker.helpers.weightedArrayElement([
      { weight: 10, value: "Active" },
      { weight: 2, value: "Notice" },
      { weight: 1, value: "Quit" },
    ]) as "Active" | "Notice" | "Quit";

    return {
      id: `tch-${i}`,
      teacherId: `T${1000 + i}`,
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      department,
      totalDays,
      attendedDays,
      attendancePercentage,
      totalClasses: faker.number.int({ min: 40, max: 160 }),
      ratingOutOf10,
      totalReviews: faker.number.int({ min: 5, max: 100 }),
      experience,
      highestEducation: education,
      joinedYear,
      status,
    };
  }
);
