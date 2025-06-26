import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import {
  Building2,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  CheckCircle2,
  Clock,
  Star,
} from "lucide-react";

// 1. Type
interface CompanyPlacement {
  id: string;
  companyName: string;
  companyLogoUrl?: string;
  companyType: "Product" | "Service" | "Startup" | "MNC";
  eligibleStudents: number;
  attendedStudents: number;
  placedStudents: number;
  highestPackage: number;
  averagePackage: number;
  lowestPackage: number;
  driveDate: Date;
  totalOffers: number;
  placedPercentage: number;
}

// 2. Columns
export const companyPlacementColumns: ColumnDef<CompanyPlacement>[] = [
  {
    accessorKey: "companyName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Company" />
    ),
    cell: ({ row }) => {
      const name = row.getValue("companyName") as string;
      return (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <Building2 className="h-4 w-4 text-gray-600" />
          </div>
          <span className="font-medium">{name}</span>
        </div>
      );
    },
    meta: { className: "min-w-[180px]" },
  },
  {
    accessorKey: "companyType",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => {
      const type = row.getValue("companyType") as string;
      const colorMap: Record<string, string> = {
        Product: "bg-blue-100 text-blue-800",
        Service: "bg-green-100 text-green-800",
        Startup: "bg-purple-100 text-purple-800",
        MNC: "bg-orange-100 text-orange-800",
      };
      return <Badge className={colorMap[type]}>{type}</Badge>;
    },
  },
  {
    accessorKey: "eligibleStudents",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Eligible" />
    ),
    cell: ({ row }) => row.getValue("eligibleStudents"),
  },
  {
    accessorKey: "attendedStudents",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Attended" />
    ),
    cell: ({ row }) => row.getValue("attendedStudents"),
  },
  {
    accessorKey: "placedStudents",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Placed" />
    ),
    cell: ({ row }) => row.getValue("placedStudents"),
  },
  {
    accessorKey: "placedStudents",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Placed %" />
    ),
    cell: ({ row }) => {
      const placedPercentage = row.original.placedPercentage;
      return (
        <div className="flex items-center space-x-1">
          <span>{placedPercentage} %</span>
        </div>
      );
    },
  },
  {
    accessorKey: "highestPackage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Highest (LPA)" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("highestPackage") as number;
      return (
        <div className="flex items-center gap-1 text-gray-700">
          <IndianRupee className="h-4 w-4" />
          {value.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: "averagePackage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Average (LPA)" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("averagePackage") as number;
      return (
        <div className="flex items-center gap-1 text-gray-700">
          <IndianRupee className="h-4 w-4" />
          {value.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: "lowestPackage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lowest (LPA)" />
    ),
    cell: ({ row }) => {
      const value = row.getValue("lowestPackage") as number;
      return (
        <div className="flex items-center gap-1 text-gray-700">
          <IndianRupee className="h-4 w-4" />
          {value.toFixed(2)}
        </div>
      );
    },
  },
  {
    accessorKey: "driveDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Drive Date" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("driveDate") as Date;
      return new Date(date).toLocaleDateString();
    },
  },
];

// 3. Mock Data
export const companyPlacementMock: CompanyPlacement[] = [
  {
    id: "1",
    companyName: "TechSolutions Inc.",
    companyType: "Product",
    eligibleStudents: 120,
    attendedStudents: 98,
    placedStudents: 32,
    highestPackage: 24.5,
    lowestPackage: 8.5,
    averagePackage: 14.2,
    driveDate: new Date(2023, 10, 15),
    totalOffers: 32,
    placedPercentage: parseFloat(((32 / 120) * 100).toFixed(1)),
  },
  {
    id: "2",
    companyName: "Global Services",
    companyType: "Service",
    eligibleStudents: 150,
    attendedStudents: 110,
    placedStudents: 42,
    highestPackage: 18.0,
    lowestPackage: 6.0,
    averagePackage: 10.5,
    driveDate: new Date(2023, 9, 22),
    totalOffers: 42,
    placedPercentage: parseFloat(((42 / 150) * 100).toFixed(1)),
  },
  {
    id: "3",
    companyName: "InnovateStart",
    companyType: "Startup",
    eligibleStudents: 80,
    attendedStudents: 65,
    placedStudents: 15,
    highestPackage: 22.0,
    lowestPackage: 10.0,
    averagePackage: 16.0,
    driveDate: new Date(2023, 8, 5),
    totalOffers: 15,
    placedPercentage: parseFloat(((15 / 80) * 100).toFixed(1)),
  },
  {
    id: "4",
    companyName: "MegaCorp International",
    companyType: "MNC",
    eligibleStudents: 200,
    attendedStudents: 180,
    placedStudents: 75,
    highestPackage: 30.0,
    lowestPackage: 7.5,
    averagePackage: 15.8,
    driveDate: new Date(2023, 11, 10),
    totalOffers: 75,
    placedPercentage: parseFloat(((75 / 200) * 100).toFixed(1)),
  },
  {
    id: "5",
    companyName: "CloudByte Ltd.",
    companyType: "Product",
    eligibleStudents: 100,
    attendedStudents: 85,
    placedStudents: 40,
    highestPackage: 20.0,
    lowestPackage: 9.0,
    averagePackage: 13.5,
    driveDate: new Date(2024, 0, 12),
    totalOffers: 40,
    placedPercentage: parseFloat(((40 / 100) * 100).toFixed(1)),
  },
  {
    id: "6",
    companyName: "NextGen Analytics",
    companyType: "Startup",
    eligibleStudents: 70,
    attendedStudents: 50,
    placedStudents: 20,
    highestPackage: 17.5,
    lowestPackage: 8.0,
    averagePackage: 12.1,
    driveDate: new Date(2024, 1, 8),
    totalOffers: 20,
    placedPercentage: parseFloat(((20 / 70) * 100).toFixed(1)),
  },
  {
    id: "7",
    companyName: "EcoSys Solutions",
    companyType: "Service",
    eligibleStudents: 90,
    attendedStudents: 72,
    placedStudents: 33,
    highestPackage: 14.0,
    lowestPackage: 5.5,
    averagePackage: 9.8,
    driveDate: new Date(2024, 2, 5),
    totalOffers: 33,
    placedPercentage: parseFloat(((33 / 90) * 100).toFixed(1)),
  },
  {
    id: "8",
    companyName: "InfinitySoft",
    companyType: "MNC",
    eligibleStudents: 180,
    attendedStudents: 160,
    placedStudents: 90,
    highestPackage: 28.0,
    lowestPackage: 10.0,
    averagePackage: 18.3,
    driveDate: new Date(2024, 3, 15),
    totalOffers: 90,
    placedPercentage: parseFloat(((90 / 180) * 100).toFixed(1)),
  },
];
