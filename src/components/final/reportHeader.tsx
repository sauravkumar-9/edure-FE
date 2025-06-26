import { ReactNode } from "react";
import SearchableSelect from "./dropDown";

interface SelectOption {
  label: string;
  value: string;
}

interface DashboardHeaderProps {
  title: string;
  description: string;
  leftSection?: ReactNode; // Optional: use to override title/description layout
  rightSection?: ReactNode; // Optional: use to override default filters
  filters?: {
    label?: string;
    options: string[];
    value: string;
    onChange: any;
    placeholder?: string;
    maxVisibleItems?: number;
  }[];
}

export function ReportHeader({
  title,
  description,
  leftSection,
  rightSection,
  filters = [],
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-20">
      {leftSection || (
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="text-muted-foreground">{description}</p>
        </div>
      )}

      {rightSection || (
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto bg-white">
          {filters.map((filter, index) => (
            <SearchableSelect
              key={index}
              options={filter.options}
              value={filter.value}
              onChange={filter.onChange}
              placeholder={filter.placeholder}
              maxVisibleItems={filter.maxVisibleItems || 5}
            />
          ))}
        </div>
      )}
    </div>
  );
}
