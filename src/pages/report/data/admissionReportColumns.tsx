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

// 1. Define Admission Status Types
type AdmissionStatus =
  | "applied"
  | "under_review"
  | "interview_scheduled"
  | "accepted"
  | "waitlisted"
  | "rejected"
  | "enrolled"
  | "withdrawn";

// 2. Define Admission Type
interface Admission {
  id: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: "male" | "female" | "other";
  dob: Date;
  category: "general" | "obc" | "sc" | "st" | "ews";
  entranceExamScore?: number;
  highSchoolPercentage: number;
  intermediatePercentage: number;
  appliedCourse: string;
  preferredBranch: string;
  status: AdmissionStatus;
  feePaid: boolean;
  scholarship?: string;
  fatherName: string;
  motherName: string;
  annualIncome: number;
  address: string;
  city: string;
  state: string;
  pincode: string;
  documentsVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// 3. Admission Report Columns
export const admissionReportColumns: ColumnDef<Admission>[] = [
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
      <DataTableColumnHeader column={column} title="Applicant Name" />
    ),
    cell: ({ row }) => {
      const { firstName, lastName, email, appliedCourse } = row.original;
      const studentCode = row.original.applicationId;
      const avatarFallback = `${firstName[0]}${lastName[0]}`;
      const year = new Date().getFullYear(); // Or use actual year from data if available

      return (
        <HoverCard>
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`}
              />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <HoverCardTrigger asChild>
              <span className="hover:underline hover:underline-offset-4 hover:cursor-pointer">{`${firstName} ${lastName}`}</span>
            </HoverCardTrigger>
          </div>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar className="h-14 w-14">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`}
                />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <h4 className="text-sm font-semibold">{`${firstName} ${lastName}`}</h4>
                <p className="text-sm">{appliedCourse}</p>
                <p className="text-xs text-muted-foreground">
                  {studentCode} • {year}
                </p>
                <p className="text-xs text-muted-foreground">{email}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() => {
                    // Handle view full profile action
                    console.log("View profile:", row.original.id);
                  }}
                >
                  View Full Profile
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
    meta: { className: "min-w-[160px]" },
  },
  {
    accessorKey: "applicationId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="App ID" />
    ),
    cell: ({ row }) => (
      <div className="font-medium py-3">{row.getValue("applicationId")}</div>
    ),
    meta: {
      className: cn(
        "sticky left-0 z-10 bg-background",
        "group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted"
      ),
    },
  },

  {
    accessorKey: "appliedCourse",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Course" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("appliedCourse")}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as AdmissionStatus;
      const statusClassMap: Record<AdmissionStatus, string> = {
        applied: "bg-muted text-foreground border border-input",
        under_review: "bg-yellow-100 text-yellow-800",
        interview_scheduled: "bg-yellow-100 text-yellow-800",
        accepted: "bg-green-100 text-green-800",
        waitlisted: "bg-purple-100 text-purple-800",
        rejected: "bg-red-100 text-red-800",
        enrolled: "bg-blue-100 text-blue-800",
        withdrawn: "bg-red-100 text-red-800",
      };
      return (
        <Badge className={cn("capitalize", statusClassMap[status])}>
          {status
            .split("_")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
        </Badge>
      );
    },
    meta: { className: "min-w-[140px]" },
  },
  {
    accessorKey: "entranceExamScore",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Entrance Score" />
    ),
    cell: ({ row }) => row.getValue("entranceExamScore") || "-",
  },
  {
    accessorKey: "highSchoolPercentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="10th %" />
    ),
    cell: ({ row }) => `${row.getValue("highSchoolPercentage")}%`,
  },
  {
    accessorKey: "intermediatePercentage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="12th %" />
    ),
    cell: ({ row }) => `${row.getValue("intermediatePercentage")}%`,
  },
  {
    accessorKey: "feePaid",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Fee Paid" />
    ),
    cell: ({ row }) => {
      const feePaid = row.getValue("feePaid") as boolean;
      return feePaid ? (
        <Badge className="bg-green-100 text-green-800">Paid</Badge>
      ) : (
        <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      );
    },
  },
  {
    accessorKey: "documentsVerified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Docs Verified" />
    ),
    cell: ({ row }) => {
      const verified = row.getValue("documentsVerified") as boolean;
      return verified ? (
        <Badge className="bg-green-100 text-green-800">Verified</Badge>
      ) : (
        <Badge className="bg-red-100 text-red-800">Not Verified</Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applied On" />
    ),
    cell: ({ row }) => new Date(row.getValue("createdAt")).toLocaleDateString(),
    meta: { className: "min-w-[120px]" },
  },
];

// Mock data generator
export const admissionStudentListMock: Admission[] = Array.from(
  { length: 20 },
  () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      id: faker.string.uuid(),
      applicationId: faker.string.alphanumeric(8).toUpperCase(),
      firstName,
      lastName,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      phone: `+91 9${faker.string.numeric(9)}`,
      gender: faker.helpers.arrayElement(["male", "female", "other"]),
      dob: faker.date.birthdate({ min: 17, max: 22, mode: "age" }),
      category: faker.helpers.arrayElement([
        "general",
        "obc",
        "sc",
        "st",
        "ews",
      ]),
      entranceExamScore: faker.datatype.boolean()
        ? faker.number.int({ min: 50, max: 100 })
        : undefined,
      highSchoolPercentage: parseFloat(
        faker.number.float({ min: 60, max: 100 }).toFixed(2)
      ),
      intermediatePercentage: parseFloat(
        faker.number.float({ min: 60, max: 100 }).toFixed(2)
      ),
      appliedCourse: faker.helpers.arrayElement([
        "B.Tech",
        "B.Sc",
        "BBA",
        "BCA",
      ]),
      preferredBranch: faker.helpers.arrayElement([
        "Computer Science",
        "Mechanical",
        "IT",
        "Electronics",
      ]),
      status: faker.helpers.arrayElement([
        "applied",
        "under_review",
        "interview_scheduled",
        "accepted",
        "waitlisted",
        "rejected",
        "enrolled",
        "withdrawn",
      ]),
      feePaid: faker.datatype.boolean(),
      scholarship: faker.datatype.boolean()
        ? faker.helpers.arrayElement(["Merit", "Need-based"])
        : undefined,
      fatherName: faker.person.fullName({ sex: "male" }),
      motherName: faker.person.fullName({ sex: "female" }),
      annualIncome: faker.number.int({ min: 100000, max: 1000000 }),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state(),
      pincode: faker.location.zipCode("######"),
      documentsVerified: faker.datatype.boolean(),
      createdAt: faker.date.past({ years: 1 }),
      updatedAt: faker.date.recent(),
    };
  }
);
