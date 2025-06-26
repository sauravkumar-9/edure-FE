import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import LongText from "@/components/table/long-text";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { z } from "zod";

// 1. Define Admission Status Types
const admissionStatusSchema = z.union([
  z.literal("applied"),
  z.literal("under_review"),
  z.literal("interview_scheduled"),
  z.literal("accepted"),
  z.literal("waitlisted"),
  z.literal("rejected"),
  z.literal("enrolled"),
  z.literal("withdrawn"),
]);
export type AdmissionStatus = z.infer<typeof admissionStatusSchema>;

// 2. Define Admission Schema
const admissionSchema = z.object({
  id: z.string(),
  applicationId: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  gender: z.enum(["male", "female", "other"]),
  dob: z.coerce.date(),
  category: z.enum(["general", "obc", "sc", "st", "ews"]),
  entranceExamScore: z.number().optional(),
  highSchoolPercentage: z.number(),
  intermediatePercentage: z.number(),
  appliedCourse: z.string(),
  preferredBranch: z.string(),
  status: admissionStatusSchema,
  feePaid: z.boolean(),
  scholarship: z.string().optional(),
  fatherName: z.string(),
  motherName: z.string(),
  annualIncome: z.number(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  pincode: z.string(),
  documentsVerified: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
export type Admission = z.infer<typeof admissionSchema>;

export const admissionListSchema = z.array(admissionSchema);

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
    accessorKey: "applicationId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="App ID" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue("applicationId")}</div>
    ),
    meta: {
      className: cn(
        "sticky left-0 z-10 bg-background",
        "group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted"
      ),
    },
  },
  {
    id: "fullName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicant Name" />
    ),
    cell: ({ row }) => {
      const { firstName, lastName } = row.original;
      return `${firstName} ${lastName}`;
    },
    meta: { className: "min-w-[160px]" },
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
        applied: "bg-muted text-foreground border border-input", // grayscale
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
