import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface FilterHeaderProps {
  title: string;
  description: string;
  departments: string[];
  currentDepartment: string;
  onDepartmentChange: (value: string) => void;
  timeRangeOptions: { value: string; label: string }[];
  currentTimeRange: string;
  onTimeRangeChange: (value: string) => void;
}

export function FilterHeader({
  title,
  description,
  departments,
  currentDepartment,
  onDepartmentChange,
  timeRangeOptions,
  currentTimeRange,
  onTimeRangeChange,
}: FilterHeaderProps) {
  return (
    <Card className="p-6 rounded-xl bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200 p-6 shadow-lg border-0 shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="text-muted-foreground">{description}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <Select value={currentDepartment} onValueChange={onDepartmentChange}>
            <SelectTrigger className="w-full md:w-[200px] bg-white dark:bg-gray-800">
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              {departments.map((dept) => (
                <SelectItem
                  key={dept}
                  value={dept.toLowerCase().replace(" ", "_")}
                >
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={currentTimeRange} onValueChange={onTimeRangeChange}>
            <SelectTrigger className="w-full md:w-[180px] bg-white dark:bg-gray-800">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              {timeRangeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
}
