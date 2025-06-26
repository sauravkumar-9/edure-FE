import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import {
  GraduationCap,
  Users,
  FileCode,
  Microscope,
  Bus,
  Calendar,
  Wrench,
  Lightbulb,
} from "lucide-react";
import { ProfileHoverCard } from "@/components/cards/profileHoverCard";

// 1. Define College Expense Type
interface CollegeExpense {
  id: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  date: Date;
  dueDate: Date;
  paidDate?: Date;
  paymentStatus: "paid" | "pending" | "overdue";
  paymentMethod: string;
  vendor?: string;
  fiscalYear: string;
  incharge: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    department: string;
    year: number;
    userId: string;
  };
}

// 2. Expense Category Type
type ExpenseCategory =
  | "salaries_teaching"
  | "salaries_non_teaching"
  | "software_licenses"
  | "lab_equipment"
  | "transportation"
  | "events"
  | "maintenance"
  | "utilities";

// 3. Columns
export const collegeExpenseColumns: ColumnDef<CollegeExpense>[] = [
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
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      const category = row.getValue("category") as ExpenseCategory;

      const categoryData: Record<
        ExpenseCategory,
        { label: string; icon: any; color: string }
      > = {
        salaries_teaching: {
          label: "Teaching Staff Salaries",
          icon: <GraduationCap className="h-4 w-4 mr-2" />,
          color: "text-blue-600",
        },
        salaries_non_teaching: {
          label: "Non-Teaching Salaries",
          icon: <Users className="h-4 w-4 mr-2" />,
          color: "text-blue-400",
        },
        software_licenses: {
          label: "Software Licenses",
          icon: <FileCode className="h-4 w-4 mr-2" />,
          color: "text-purple-600",
        },
        lab_equipment: {
          label: "Lab Equipment",
          icon: <Microscope className="h-4 w-4 mr-2" />,
          color: "text-green-600",
        },
        transportation: {
          label: "Transportation",
          icon: <Bus className="h-4 w-4 mr-2" />,
          color: "text-red-500",
        },
        events: {
          label: "Events",
          icon: <Calendar className="h-4 w-4 mr-2" />,
          color: "text-yellow-500",
        },
        maintenance: {
          label: "Maintenance",
          icon: <Wrench className="h-4 w-4 mr-2" />,
          color: "text-orange-500",
        },
        utilities: {
          label: "Utilities",
          icon: <Lightbulb className="h-4 w-4 mr-2" />,
          color: "text-amber-400",
        },
      };

      const data = categoryData[category];
      return (
        <div className="flex items-center">
          <span className={data.color}>{data.icon}</span>
          <span>{data.label}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => (
      <div className="max-w-[200px] truncate">
        {row.getValue("description")}
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount (₹)" />
    ),
    cell: ({ row }) => {
      const amount = row.getValue("amount") as number;
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
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Txn Date" />
    ),
    cell: ({ row }) =>
      new Date(row.getValue("date")).toLocaleDateString("en-IN"),
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    cell: ({ row }) =>
      new Date(row.getValue("dueDate")).toLocaleDateString("en-IN"),
  },
  {
    accessorKey: "paidDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Paid Date" />
    ),
    cell: ({ row }) => {
      const paidDate: any = row.getValue("paidDate");
      return paidDate ? new Date(paidDate).toLocaleDateString("en-IN") : "-";
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Payment Status" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("paymentStatus") as string;
      const map: any = {
        paid: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        overdue: "bg-red-100 text-red-800",
      };
      return <Badge className={map[status]}>{status.toUpperCase()}</Badge>;
    },
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Method" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("paymentMethod")}
      </Badge>
    ),
  },
  {
    accessorKey: "incharge",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Incharge User" />
    ),
    cell: ({ row }) => {
      const incharge = row.original.incharge;
      return (
        <ProfileHoverCard
          id={incharge.userId}
          firstName={incharge.firstName}
          lastName={incharge.lastName}
          department={incharge.department}
          year={incharge.year}
          studentId={incharge.userId}
          email={incharge.email}
          onViewDetails={() => console.log("View user profile:", incharge.id)}
        />
      );
    },
    meta: { className: "min-w-[200px]" },
  },
];

export const collegeExpenseMock: CollegeExpense[] = [
  {
    id: "1",
    category: "salaries_teaching",
    description: "Monthly salaries for teaching staff",
    amount: 1250000,
    date: new Date(2023, 4, 1),
    dueDate: new Date(2023, 4, 5),
    paidDate: new Date(2023, 4, 3),
    paymentStatus: "paid",
    paymentMethod: "Bank Transfer",
    incharge: {
      id: "U101",
      firstName: "Aditi",
      lastName: "Sharma",
      email: "aditi.sharma@college.edu",
      department: "Finance",
      year: 2020,
      userId: "EMP1023",
    },
    fiscalYear: "2023-24",
  },
  {
    id: "2",
    category: "salaries_non_teaching",
    description: "Monthly salaries for administrative staff",
    amount: 450000,
    date: new Date(2023, 4, 1),
    dueDate: new Date(2023, 4, 4),
    paidDate: new Date(2023, 4, 2),
    paymentStatus: "paid",
    paymentMethod: "Bank Transfer",
    incharge: {
      id: "U102",
      firstName: "Rahul",
      lastName: "Verma",
      email: "rahul.verma@college.edu",
      department: "HR",
      year: 2018,
      userId: "EMP1045",
    },
    fiscalYear: "2023-24",
  },
  {
    id: "3",
    category: "software_licenses",
    description: "Annual license for LMS software",
    amount: 250000,
    date: new Date(2023, 3, 15),
    dueDate: new Date(2023, 3, 25),
    paidDate: new Date(2023, 3, 24),
    paymentStatus: "paid",
    paymentMethod: "Online Payment",
    vendor: "EduTech Solutions",
    incharge: {
      id: "U103",
      firstName: "Sneha",
      lastName: "Iyer",
      email: "sneha.iyer@college.edu",
      department: "IT",
      year: 2019,
      userId: "EMP1071",
    },
    fiscalYear: "2023-24",
  },
  {
    id: "4",
    category: "lab_equipment",
    description: "New computers for CS lab",
    amount: 800000,
    date: new Date(2023, 2, 10),
    dueDate: new Date(2023, 2, 15),
    paidDate: new Date(2023, 2, 16),
    paymentStatus: "overdue",
    paymentMethod: "Cheque",
    vendor: "Tech Hardware Inc.",
    incharge: {
      id: "U104",
      firstName: "Manoj",
      lastName: "Patel",
      email: "manoj.patel@college.edu",
      department: "CSE",
      year: 2015,
      userId: "EMP1098",
    },
    fiscalYear: "2023-24",
  },
  {
    id: "5",
    category: "transportation",
    description: "Monthly bus maintenance and fuel",
    amount: 175000,
    date: new Date(2023, 4, 5),
    dueDate: new Date(2023, 4, 10),
    paidDate: undefined,
    paymentStatus: "pending",
    paymentMethod: "Bank Transfer",
    vendor: "City Transport Services",
    incharge: {
      id: "U105",
      firstName: "Divya",
      lastName: "Nair",
      email: "divya.nair@college.edu",
      department: "Transport",
      year: 2021,
      userId: "EMP1112",
    },
    fiscalYear: "2023-24",
  },
  {
    id: "6",
    category: "events",
    description: "Annual tech fest expenses",
    amount: 300000,
    date: new Date(2023, 1, 20),
    dueDate: new Date(2023, 1, 25),
    paidDate: new Date(2023, 1, 25),
    paymentStatus: "paid",
    paymentMethod: "Cash",
    incharge: {
      id: "U106",
      firstName: "Kunal",
      lastName: "Joshi",
      email: "kunal.joshi@college.edu",
      department: "Events",
      year: 2016,
      userId: "EMP1135",
    },
    fiscalYear: "2023-24",
  },
  {
    id: "7",
    category: "utilities",
    description: "Monthly electricity and water bills",
    amount: 120000,
    date: new Date(2023, 4, 3),
    dueDate: new Date(2023, 4, 7),
    paidDate: undefined,
    paymentStatus: "pending",
    paymentMethod: "Online Payment",
    incharge: {
      id: "U107",
      firstName: "Ritika",
      lastName: "Menon",
      email: "ritika.menon@college.edu",
      department: "Maintenance",
      year: 2022,
      userId: "EMP1160",
    },
    fiscalYear: "2023-24",
  },
  {
    id: "8",
    category: "maintenance",
    description: "Campus building repairs",
    amount: 350000,
    date: new Date(2023, 3, 22),
    dueDate: new Date(2023, 3, 28),
    paidDate: new Date(2023, 3, 27),
    paymentStatus: "paid",
    paymentMethod: "Cheque",
    vendor: "BuildCare Contractors",
    incharge: {
      id: "U108",
      firstName: "Arun",
      lastName: "Kumar",
      email: "arun.kumar@college.edu",
      department: "Infrastructure",
      year: 2017,
      userId: "EMP1189",
    },
    fiscalYear: "2023-24",
  },
];
