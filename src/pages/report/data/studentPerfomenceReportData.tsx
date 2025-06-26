import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { faker } from "@faker-js/faker";
import { ProfileHoverCard } from "@/components/cards/profileHoverCard";

// 1. Define Student Performance Type
interface StudentPerformance {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  year: number;
  attendance: string;
  cgpa: number;
  isPlaced: boolean;
  totalOffers: number;
  currentCompany?: string;
  highestPackage?: number;
  backlogs: number;
  activeBacklogs: boolean;
}

// 2. Performance Report Columns
export const performanceReportColumns: ColumnDef<StudentPerformance>[] = [
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
    id: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student Name" />
    ),
    cell: ({ row }) => {
      const { firstName, lastName, department, year, studentId, email, id } =
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
          onViewDetails={() => console.log("View profile:", id)}
        />
      );
    },
    meta: { className: "sticky left-0 z-10 min-w-[180px] bg-white" },
  },
  {
    accessorKey: "studentId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Student ID" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("studentId")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => <div className="text-sm">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "department",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Department" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("department")}</div>
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
    accessorKey: "attendance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Attendance %" />
    ),
    cell: ({ row }) => {
      const attendance = row.getValue("attendance") as number;
      return <div className="flex items-center">{attendance}%</div>;
    },
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
          ? "text-green-600"
          : cgpa >= 7
          ? "text-blue-600"
          : "text-red-600";
      return (
        <span className={`font-semibold ${colorClass}`}>{cgpa.toFixed(2)}</span>
      );
    },
  },
  {
    accessorKey: "isPlaced",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Placement Status" />
    ),
    cell: ({ row }) => {
      const isPlaced = row.getValue("isPlaced") as boolean;
      return isPlaced ? (
        <Badge className="bg-green-100 text-green-800">Placed</Badge>
      ) : (
        <Badge variant="destructive">Not Placed</Badge>
      );
    },
  },
  {
    accessorKey: "totalOffers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Offers" />
    ),
    cell: ({ row }) => {
      const offers = row.getValue("totalOffers") as number;
      return offers > 0 ? (
        <Badge className="bg-blue-100 text-blue-800">
          {offers} Offer{offers > 1 ? "s" : ""}
        </Badge>
      ) : (
        <span>-</span>
      );
    },
  },
  {
    accessorKey: "currentCompany",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Current Company" />
    ),
    cell: ({ row }) => row.getValue("currentCompany") || "-",
  },
  {
    accessorKey: "backlogs",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Backlogs" />
    ),
    cell: ({ row }) => {
      const backlogs = row.getValue("backlogs") as number;
      return backlogs > 0 ? (
        <Badge
          variant={row.original.activeBacklogs ? "destructive" : "outline"}
        >
          {backlogs} {row.original.activeBacklogs ? "(Active)" : "(Cleared)"}
        </Badge>
      ) : (
        <Badge className="bg-green-100 text-green-800">None</Badge>
      );
    },
  },
];

// Mock data generator
export const studentPerformanceMock: StudentPerformance[] = Array.from(
  { length: 25 },
  () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const department = faker.helpers.arrayElement([
      "Computer Science",
      "Electrical",
      "Mechanical",
      "Electronics",
      "Civil",
      "Information Technology",
    ]);
    const isPlaced = faker.datatype.boolean({ probability: 0.7 });
    const hasMultipleOffers =
      isPlaced && faker.datatype.boolean({ probability: 0.3 });
    const backlogs = faker.number.int({ min: 0, max: 5 });

    return {
      id: faker.string.uuid(),
      studentId: `STU${faker.string.numeric(6)}`,
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      department,
      year: faker.number.int({ min: 1, max: 4 }),
      attendance: faker.number.float({ min: 60, max: 100 }).toFixed(2),
      cgpa: faker.number.float({ min: 6, max: 10 }),
      isPlaced,
      totalOffers: isPlaced
        ? hasMultipleOffers
          ? faker.number.int({ min: 2, max: 5 })
          : 1
        : 0,
      currentCompany: isPlaced ? faker.company.name() : undefined,
      highestPackage: isPlaced
        ? faker.number.float({ min: 3, max: 20 })
        : undefined,
      backlogs,
      activeBacklogs: backlogs > 0 ? faker.datatype.boolean() : false,
    };
  }
);
