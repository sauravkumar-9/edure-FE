import { LucideIcon, Frown, Inbox, FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

interface EmptyTableProps {
  colSpan: number;
  icon?: "search" | "sad" | "inbox" | "filter";
  title?: string;
  message?: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

const iconMap = {
  search: Inbox,
  sad: Frown,
  inbox: Inbox,
  filter: FilterX,
};

export function EmptyTable({
  colSpan,
  icon = "search",
  title = "No results found",
  message = "Try adjusting your search or filter",
  actionText,
  onAction,
  className = "",
}: EmptyTableProps) {
  const IconComponent = iconMap[icon] as LucideIcon;

  return (
    <TableRow className={className}>
      <TableCell colSpan={colSpan} className="h-64 text-center">
        <div className="flex flex-col items-center justify-center gap-3 py-8">
          <IconComponent className="h-10 w-10 text-muted-foreground/70" />
          <div className="space-y-1">
            <h4 className="text-lg font-medium text-muted-foreground">
              {title}
            </h4>
            <p className="text-sm text-muted-foreground/80">{message}</p>
          </div>
          {actionText && onAction && (
            <Button
              variant="ghost"
              size="sm"
              className="mt-4"
              onClick={onAction}
            >
              {actionText}
            </Button>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}
