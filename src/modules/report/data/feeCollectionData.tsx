import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { faker } from "@faker-js/faker";
import { cn } from "@/lib/utils";
import { ProfileHoverCard } from "@/components/cards/profileHoverCard";

// Payment Status Type
type PaymentStatus = "paid" | "partial" | "overdue" | "pending" | "cancelled";

// Fee Payment Interface
export interface FeePayment {
  id: string;
  studentId: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
  year: number;
  totalFee: number;
  paidAmount: number;
  dueAmount: number;
  paymentStatus: PaymentStatus;
  lastPaymentDate: Date | null;
  dueDate: Date;
  paymentMethod?: string;
  receiptNumber?: string;
  academicYear: string;
  installmentPlan: string;
}

// Fees Collection Columns
export const feesCollectionColumns: ColumnDef<FeePayment>[] = [
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
      <div className="font-mono">{row.getValue("studentId")}</div>
    ),
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
    accessorKey: "totalFee",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Fee (₹)" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("totalFee") as number;
      return (
        <div className="font-medium">
          {amount.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "paidAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paid (₹)" />
    ),
    cell: ({ row }) => {
      const paid = row.getValue("paidAmount") as number;
      const total = row.getValue("totalFee") as number;
      const percentage = (paid / total) * 100;

      return (
        <div>
          <div className="font-medium">
            {paid.toLocaleString("en-IN", {
              style: "currency",
              currency: "INR",
              maximumFractionDigits: 0,
            })}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
            <div
              className={`h-1.5 rounded-full ${
                percentage >= 100
                  ? "bg-green-400"
                  : percentage >= 50
                  ? "bg-yellow-400"
                  : "bg-red-400"
              }`}
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "dueAmount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due (₹)" />
    ),
    cell: ({ row }) => {
      const due = row.getValue("dueAmount") as number;
      return (
        <div
          className={cn(
            "font-medium",
            due > 0 ? "text-red-600" : "text-green-600"
          )}
        >
          {due.toLocaleString("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("paymentStatus") as PaymentStatus;
      const statusMap: Record<
        PaymentStatus,
        { label: string; className: string }
      > = {
        paid: {
          label: "Paid",
          className: "bg-green-100 text-green-800 border-green-200",
        },
        partial: {
          label: "Partial",
          className: "bg-blue-100 text-blue-800 border-blue-200",
        },
        pending: {
          label: "Pending",
          className: "bg-yellow-100 text-yellow-800 border-yellow-200",
        },
        overdue: {
          label: "Overdue",
          className: "bg-red-100 text-red-800 border-red-200",
        },
        cancelled: {
          label: "Cancelled",
          className: "bg-gray-100 text-gray-800 border-gray-200",
        },
      };

      return (
        <Badge className={cn("capitalize", statusMap[status].className)}>
          {statusMap[status].label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) => {
      const dueDate = new Date(row.getValue("dueDate"));
      const today = new Date();
      const isOverdue =
        dueDate < today && row.original.paymentStatus !== "paid";

      return (
        <div className={cn(isOverdue ? "text-red-600 font-medium" : "")}>
          {dueDate.toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "lastPaymentDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Paid On" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("lastPaymentDate") as Date | null;
      return date ? new Date(date).toLocaleDateString() : "-";
    },
  },
];

export const feesCollectionMock: FeePayment[] = Array.from(
  { length: 30 },
  () => {
    const totalFee = faker.number.int({ min: 50000, max: 150000 });
    const status = faker.helpers.weightedArrayElement([
      { weight: 5, value: "paid" },
      { weight: 3, value: "partial" },
      { weight: 2, value: "pending" },
      { weight: 1, value: "overdue" },
    ]);

    const paidAmount =
      status === "paid"
        ? totalFee
        : status === "partial"
        ? faker.number.int({ min: totalFee * 0.1, max: totalFee * 0.9 })
        : 0;

    const dueDate = faker.date.future({ years: 1 });
    const isOverdue = status === "overdue";

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

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
      year: 0,
      totalFee,
      paidAmount,
      dueAmount: totalFee - paidAmount,
      paymentStatus: status,
      lastPaymentDate: status !== "pending" ? faker.date.past() : null,
      dueDate: isOverdue ? faker.date.past() : dueDate,
      paymentMethod: undefined,
      receiptNumber: undefined,
      academicYear: "",
      installmentPlan: "",
    };
  }
);
