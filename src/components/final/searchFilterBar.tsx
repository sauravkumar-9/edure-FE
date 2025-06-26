import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface SearchFilterBarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  filter: string;
  onFilterChange: (value: string) => void;
  showSearch?: boolean;
  showFilter?: boolean;
  filterOptions?: { value: string; label: string }[];
  className?: string;
}

export function SearchFilterBar({
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  showSearch = true,
  showFilter = true,
  filterOptions = [
    { value: "all", label: "All" },
    { value: "performance", label: "Performance" },
    { value: "attendance", label: "Attendance" },
    { value: "payment", label: "Payment" },
    { value: "finance", label: "Finance" },
    { value: "faculty", label: "Faculty" },
    { value: "placement", label: "Placement" },
  ],
  className = "",
}: SearchFilterBarProps) {
  return (
    <div
      className={`flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${className}`}
    >
      {showSearch && (
        <Input
          type="text"
          placeholder="Search reports"
          className="w-full md:w-1/3 bg-white"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      )}

      {showFilter && (
        <Select value={filter} onValueChange={onFilterChange}>
          <SelectTrigger className="w-full md:w-[200px] bg-white">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            {filterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}
