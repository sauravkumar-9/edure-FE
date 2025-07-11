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

// 1. Define Lead Status Types
type LeadStatus = "cold" | "warm" | "hot" | "converted" | "lost";
type LeadSource = "walkin" | "instagram" | "referral" | "website" | "other";

// 2. Define Lead Type
interface Lead {
  leadId: number;
  full_name: string;
  email: string;
  phone: string;
  lead_source: LeadSource;
  referred_by: string | null;
  interested_course: string;
  counseller: string;
  lead_verified: "Yes" | "No";
  lead_status: LeadStatus;
  last_follow_up: string;
  days_since_last_followup: number;
}

// 3. Lead Report Columns


// export const leadReportColumns: ColumnDef<Lead>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//         className="translate-y-[2px]"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//         className="translate-y-[2px]"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
//   {
//     id: "full_name",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Lead Name" />
//     ),
//     cell: ({ row }) => {
//       const { full_name, email, interested_course } = row.original;
//       const leadId = row.original.leadId;
//       const avatarFallback = full_name.split(' ').map(n => n[0]).join('');

//       return (
//         <HoverCard>
//           <div className="flex items-center space-x-3">
//             <Avatar className="h-8 w-8">
//               <AvatarImage
//                 src={`https://api.dicebear.com/7.x/initials/svg?seed=${full_name}`}
//               />
//               <AvatarFallback>{avatarFallback}</AvatarFallback>
//             </Avatar>
//             <HoverCardTrigger asChild>
//               <span className="hover:underline hover:underline-offset-4 hover:cursor-pointer">
//                 {full_name}
//               </span>
//             </HoverCardTrigger>
//           </div>
//           <HoverCardContent className="w-80">
//             <div className="flex justify-between space-x-4">
//               <Avatar className="h-14 w-14">
//                 <AvatarImage
//                   src={`https://api.dicebear.com/7.x/initials/svg?seed=${full_name}`}
//                 />
//                 <AvatarFallback>{avatarFallback}</AvatarFallback>
//               </Avatar>
//               <div className="space-y-1 flex-1">
//                 <h4 className="text-sm font-semibold">{full_name}</h4>
//                 <p className="text-sm">{interested_course}</p>
//                 <p className="text-xs text-muted-foreground">
//                   Lead ID: {leadId}
//                 </p>
//                 <p className="text-xs text-muted-foreground">{email}</p>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   className="mt-2 w-full"
//                   onClick={() => {
//                     console.log("View lead:", row.original.leadId);
//                   }}
//                 >
//                   View Lead Details
//                 </Button>
//               </div>
//             </div>
//           </HoverCardContent>
//         </HoverCard>
//       );
//     },
//     meta: { className: "min-w-[160px]" },
//   },
//   {
//     accessorKey: "leadId",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Lead ID" />
//     ),
//     cell: ({ row }) => (
//       <div className="font-medium py-3">#{row.getValue("leadId")}</div>
//     ),
//     meta: {
//       className: cn(
//         "sticky left-0 z-10 bg-background",
//         "group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted"
//       ),
//     },
//   },
//   {
//     accessorKey: "interested_course",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Interested Course" />
//     ),
//     cell: ({ row }) => (
//       <Badge variant="outline" className="capitalize">
//         {row.getValue("interested_course")}
//       </Badge>
//     ),
//     filterFn: (row, id, value) => {
//       return value.includes(row.getValue(id));
//     },
//   },
//   {
//     accessorKey: "lead_status",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Status" />
//     ),
//     cell: ({ row }) => {
//       const status = row.getValue("lead_status") as LeadStatus;
//       const statusClassMap: Record<LeadStatus, string> = {
//         cold: "bg-gray-100 text-gray-800",
//         warm: "bg-blue-100 text-blue-800",
//         hot: "bg-orange-100 text-orange-800",
//         converted: "bg-green-100 text-green-800",
//         lost: "bg-red-100 text-red-800",
//       };
//       return (
//         <Badge className={cn("capitalize", statusClassMap[status])}>
//           {status.charAt(0).toUpperCase() + status.slice(1)}
//         </Badge>
//       );
//     },
//     meta: { className: "min-w-[100px]", isFilterable: true },
//   },
//   {
//     accessorKey: "lead_source",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Source" />
//     ),
//     cell: ({ row }) => {
//       const source = row.getValue("lead_source") as LeadSource;
//       return (
//         <Badge variant="outline" className="capitalize">
//           {source.charAt(0).toUpperCase() + source.slice(1)}
//         </Badge>
//       );
//     },
//   },
//   {
//     accessorKey: "counseller",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Counsellor" />
//     ),
//     cell: ({ row }) => {
//       const counseller = row.getValue("counseller") as string;
//       return (
//         <div className="flex items-center space-x-2">
//           <Avatar className="h-6 w-6">
//             <AvatarImage
//               src={`https://api.dicebear.com/7.x/initials/svg?seed=${counseller}`}
//             />
//             <AvatarFallback>{counseller[0]}</AvatarFallback>
//           </Avatar>
//           <span>{counseller}</span>
//         </div>
//       );
//     },
//   },
//   {
//     accessorKey: "lead_verified",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Verified" />
//     ),
//     cell: ({ row }) => {
//       const verified = row.getValue("lead_verified") as "Yes" | "No";
//       return verified === "Yes" ? (
//         <Badge className="bg-green-100 text-green-800">Verified</Badge>
//       ) : (
//         <Badge className="bg-red-100 text-red-800">Not Verified</Badge>
//       );
//     },
//   },
//   {
//     accessorKey: "last_follow_up",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Last Follow Up" />
//     ),
//     cell: ({ row }) => {
//       const date = new Date(row.getValue("last_follow_up"));
//       return date.toLocaleDateString();
//     },
//   },
//   {
//     accessorKey: "days_since_last_followup",
//     header: ({ column }) => (
//       <DataTableColumnHeader column={column} title="Days Since Followup" />
//     ),
//     cell: ({ row }) => {
//       const days = row.getValue("days_since_last_followup") as number;
//       let className = "";
//       if (days > 7) className = "text-red-500";
//       else if (days > 3) className = "text-orange-500";
//       else className = "text-green-500";
      
//       return <span className={className}>{days} days</span>;
//     },
//   },
// ];


export const leadReportColumns: ColumnDef<Lead>[] = [
  {
    accessorKey: "select",
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
    meta: {
      label: "Select",
      type: "none",
      className: "",
      filterData: {
        isBasic: false,
        isAdvanced: false,
        enableSorting: false,
        enableHiding: false,
      },
    },
  },
  {
    accessorKey: "full_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lead Name" />
    ),
    cell: ({ row }) => {
      const { full_name, email, interested_course, leadId } = row.original;
      const avatarFallback = full_name.split(" ").map((n) => n[0]).join("");

      return (
        <HoverCard>
          <div className="flex items-center space-x-3">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`https://api.dicebear.com/7.x/initials/svg?seed=${full_name}`}
              />
              <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <HoverCardTrigger asChild>
              <span className="hover:underline hover:underline-offset-4 hover:cursor-pointer">
                {full_name}
              </span>
            </HoverCardTrigger>
          </div>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar className="h-14 w-14">
                <AvatarImage
                  src={`https://api.dicebear.com/7.x/initials/svg?seed=${full_name}`}
                />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 flex-1">
                <h4 className="text-sm font-semibold">{full_name}</h4>
                <p className="text-sm">{interested_course}</p>
                <p className="text-xs text-muted-foreground">Lead ID: {leadId}</p>
                <p className="text-xs text-muted-foreground">{email}</p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full"
                  onClick={() => {
                    console.log("View lead:", leadId);
                  }}
                >
                  View Lead Details
                </Button>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
    meta: {
      label: "Lead Name",
      type: "string",
      className: "min-w-[160px]",
      filterData: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: true,
        enableHiding: true,
      },
    },
  },
  {
    accessorKey: "leadId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lead ID" />
    ),
    cell: ({ row }) => (
      <div className="font-medium py-3">#{row.getValue("leadId")}</div>
    ),
    meta: {
      label: "Lead ID",
      type: "string",
      className: cn(
        "sticky left-0 z-10 bg-background",
        "group-hover/row:bg-muted group-data-[state=selected]/row:bg-muted"
      ),
      filterData: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: true,
        enableHiding: false,
      },
    },
  },
  {
    accessorKey: "interested_course",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Interested Course" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.getValue("interested_course")}
      </Badge>
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    meta: {
      label: "Interested Course",
      type: "string",
      className: "min-w-[120px]",
      filterData: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: true,
        enableHiding: true,
      },
    },
  },
  {
    accessorKey: "lead_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
        const status = row.getValue("lead_status") as keyof typeof statusClassMap;

      const statusClassMap = {
        cold: "bg-gray-100 text-gray-800",
        warm: "bg-blue-100 text-blue-800",
        hot: "bg-orange-100 text-orange-800",
        converted: "bg-green-100 text-green-800",
        lost: "bg-red-100 text-red-800",
      };
      return (
        <Badge className={cn("capitalize", statusClassMap[status])}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
    meta: {
      label: "Status",
      type: "enum",
      enum: ["cold", "warm", "hot", "converted", "lost"],
      className: "min-w-[100px]",
      filterData: {
        isBasic: true,
        isAdvanced: true,
        enableSorting: false,
        enableHiding: false,
      },
    },
  },
  {
    accessorKey: "lead_source",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Source" />
    ),
    cell: ({ row }) => {
      const source : string = row.getValue("lead_source");
      return (
        <Badge variant="outline" className="capitalize">
          {source.charAt(0).toUpperCase() + source.slice(1)}
        </Badge>
      );
    },
    meta: {
      label: "Source",
      type: "enum",
      enum: ["facebook", "instagram", "website", "referral"],
      className: "min-w-[100px]",
      filterData: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: true,
        enableHiding: true,
      },
    },
  },
  {
    accessorKey: "counseller",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Counsellor" />
    ),
    cell: ({ row }) => {
      const counseller : string = row.getValue("counseller");
      return (
        <div className="flex items-center space-x-2">
          <Avatar className="h-6 w-6">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/initials/svg?seed=${counseller}`}
            />
            <AvatarFallback>{counseller[0]}</AvatarFallback>
          </Avatar>
          <span>{counseller}</span>
        </div>
      );
    },
    meta: {
      label: "Counsellor",
      type: "string",
      className: "min-w-[140px]",
      filterData: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: false,
        enableHiding: true,
      },
    },
  },
  {
    accessorKey: "lead_verified",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Verified" />
    ),
    cell: ({ row }) => {
      const verified = row.getValue("lead_verified");
      return verified === "Yes" ? (
        <Badge className="bg-green-100 text-green-800">Verified</Badge>
      ) : (
        <Badge className="bg-red-100 text-red-800">Not Verified</Badge>
      );
    },
    meta: {
      label: "Verified",
      type: "enum",
      enum: ["Yes", "No"],
      className: "min-w-[100px]",
      filterData: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: true,
        enableHiding: true,
      },
    },
  },
  {
    accessorKey: "last_follow_up",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Follow Up" />
    ),
    cell: ({ row }) => {
      const date = new Date(row.getValue("last_follow_up"));
      return date.toLocaleDateString();
    },
    meta: {
      label: "Last Follow Up",
      type: "date",
      className: "min-w-[140px]",
      filterData: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: true,
        enableHiding: true,
      },
    },
  },
  {
    accessorKey: "days_since_last_followup",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Days Since Followup" />
    ),
    cell: ({ row }) => {
      const days : any = row.getValue("days_since_last_followup");
      let className = "";
      if (days > 7) className = "text-red-500";
      else if (days > 3) className = "text-orange-500";
      else className = "text-green-500";

      return <span className={className}>{days} days</span>;
    },
    meta: {
      label: "Days Since Followup",
      type: "number",
      className: "min-w-[160px]",
      filterData: {
        isBasic: false,
        isAdvanced: true,
        enableSorting: true,
        enableHiding: true,
      },
    },
  },
];



// Mock data generator
export const leadListMock: Lead[] = Array.from({ length: 20 }, (_, i) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const full_name = `${firstName} ${lastName}`;
  const statuses: LeadStatus[] = ["cold", "warm", "hot", "converted", "lost"];
  const sources: LeadSource[] = ["walkin", "instagram", "referral", "website", "other"];
  const courses = ["Information Science", "Computer Science", "Engineering", "Medicine", "Business"];

  return {
    leadId: i + 1,
    full_name,
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    phone: `9${faker.string.numeric(9)}`,
    lead_source: faker.helpers.arrayElement(sources),
    referred_by: Math.random() > 0.7 ? faker.person.fullName() : null,
    interested_course: faker.helpers.arrayElement(courses),
    counseller: faker.person.fullName(),
    lead_verified: faker.datatype.boolean() ? "Yes" : "No",
    lead_status: faker.helpers.arrayElement(statuses),
    last_follow_up: faker.date.recent({ days: 10 }).toISOString().split('T')[0],
    days_since_last_followup: faker.number.int({ min: 0, max: 10 }),
  };
});