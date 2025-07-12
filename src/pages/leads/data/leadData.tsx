import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

type LeadStatus = "cold" | "warm" | "hot" | "converted" | "lost";
type LeadSource = "walkin" | "instagram" | "referral" | "website" | "other";

interface Lead {
  id: string;
  leadCode: string;
  fullName: string;
  interestedCourse: string;
  leadStatus: LeadStatus;
  leadSource: LeadSource;
  counseller: string;
  verificationStatus: "Yes" | "No";
  lastFollowUp: string;
}

export function generateColumnsFromResponse(response: any): ColumnDef<Lead>[] {
  const columns: ColumnDef<Lead>[] = [
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
  ];

  response.headers.forEach((config: any) => {
    const column: ColumnDef<Lead> = {
      accessorKey: config.key,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={config.label} />
      ),
      meta: {
        label: config.label,
        type: config.dataType,
        filterConfig: config.filterConfig,
        ...(config.enumValues && { enum: config.enumValues }),
      },
    };

    // Handle cell rendering based on dataType
    switch (config.dataType) {
      case "string":
        if (config.key === "fullName") {
          column.cell = renderFullNameCell;
        } else if (config.key === "counseller") {
          column.cell = renderCounsellorCell;
        } else {
          column.cell = ({ row }) => <span>{row.getValue(config.key)}</span>;
        }
        break;

      case "enum":
        if (config.key === "leadStatus") {
          column.cell = renderStatusCell;
        } else if (config.key === "leadSource") {
          column.cell = renderSourceCell;
        } else if (config.key === "verificationStatus") {
          column.cell = renderVerificationCell;
        }
        break;

      case "date":
        column.cell = renderDateCell;
        break;

      case "number":
        column.cell = renderNumberCell;
        break;

      default:
        column.cell = ({ row }) => <span>{row.getValue(config.key)}</span>;
    }

    columns.push(column);
  });

  return columns;
}

// Helper functions for cell rendering
function renderFullNameCell({ row }: { row: any }) {
  const fullName = row.getValue("fullName");
  const email = row.original.email || "";
  const interestedCourse = row.original.interestedCourse || "";
  const leadCode = row.original.leadCode || "";
  const avatarFallback = fullName
    .split(" ")
    .map((n: string) => n[0])
    .join("");

  return (
    <HoverCard>
      <div className="flex items-center space-x-3">
        <Avatar className="h-8 w-8">
          <AvatarImage
            src={
              row.original.profilePic ||
              `https://api.dicebear.com/7.x/initials/svg?seed=${fullName}`
            }
          />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <HoverCardTrigger asChild>
          <span className="hover:underline hover:underline-offset-4 hover:cursor-pointer">
            {fullName}
          </span>
        </HoverCardTrigger>
      </div>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar className="h-14 w-14">
            <AvatarImage
              src={
                row.original.profilePic ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${fullName}`
              }
            />
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="space-y-1 flex-1">
            <h4 className="text-sm font-semibold">{fullName}</h4>
            <p className="text-sm">{interestedCourse}</p>
            <p className="text-xs text-muted-foreground">Lead ID: {leadCode}</p>
            {email && <p className="text-xs text-muted-foreground">{email}</p>}
            <Button
              variant="outline"
              size="sm"
              className="mt-2 w-full"
              onClick={() => console.log("View lead:", row.original.id)}
            >
              View Lead Details
            </Button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

function renderStatusCell({ row }: { row: any }) {
  const status: LeadStatus = row.getValue("leadStatus");
  const statusClassMap: Record<LeadStatus, string> = {
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
}

function renderSourceCell({ row }: { row: any }) {
  const source = row.getValue("leadSource");
  return (
    <Badge variant="outline" className="capitalize">
      {source.charAt(0).toUpperCase() + source.slice(1)}
    </Badge>
  );
}

function renderCounsellorCell({ row }: { row: any }) {
  const counseller = row.getValue("counseller");
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
}

function renderVerificationCell({ row }: { row: any }) {
  const verified = row.getValue("verificationStatus");
  return verified === "Yes" ? (
    <Badge className="bg-green-100 text-green-800">Verified</Badge>
  ) : (
    <Badge className="bg-red-100 text-red-800">Not Verified</Badge>
  );
}

function renderDateCell({ row, column }: { row: any; column: any }) {
  const dateStr = row.getValue(column.id);
  if (!dateStr) return null;
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString();
  } catch {
    return dateStr;
  }
}

function renderNumberCell({ row, column }: { row: any; column: any }) {
  const value = row.getValue(column.id);
  return <span>{value}</span>;
}
