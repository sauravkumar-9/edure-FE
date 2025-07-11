import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MixerHorizontalIcon,
  DownloadIcon,
  EyeOpenIcon,
  Cross2Icon,
} from "@radix-ui/react-icons";
import { DataTableAdvancedFilter } from "./data-table-advanced-filter";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

export function DataTableToolbar({ table }: { table: any }) {
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  // Get the single basic filter column (first one marked with isBasic)
  const basicFilterColumn = table
    .getAllColumns()
    .find((column: any) => column.columnDef.meta?.filterData?.isBasic);

  // Columns for advanced filter (marked with isAdvanced)
  const advancedFilterColumns = table
    .getAllColumns()
    .filter((column: any) => column.columnDef.meta?.filterData?.isAdvanced);

  // State for basic filter value
  const [basicFilterValue, setBasicFilterValue] = useState("");

  // Only show columns that can be hidden (enableHiding: true)
  const hideableColumns = table
    .getAllColumns()
    .filter((column: any) => column.columnDef.meta?.filterData?.enableHiding);

  // Check if any hideable columns are currently hidden
  const hasHiddenColumns = hideableColumns.some(
    (column: any) => !column.getIsVisible()
  );

  const handleBasicFilterChange = (value: string) => {
    setBasicFilterValue(value);

    if (!basicFilterColumn) return;

    // Apply filter immediately when changed
    if (value) {
      table.setColumnFilters([{ id: basicFilterColumn.id, value }]);
    } else {
      table.setColumnFilters([]);
    }
  };

  const handleApplyFilters = (filters: any[]) => {
    const columnFilters = filters.map((condition) => ({
      id: condition.column,
      value: {
        operator: condition.operator,
        value: condition.value,
      },
    }));
    table.setColumnFilters(columnFilters);
    setShowAdvancedFilter(false);
  };

  const handleResetFilters = () => {
    table.setColumnFilters([]);
    setBasicFilterValue("");
    setShowAdvancedFilter(false);
  };

  const toggleAdvancedFilter = () => {
    setShowAdvancedFilter(!showAdvancedFilter);
  };

  const handleDownload = () => {
    // Implement your download logic here
    console.log("Download data");
  };

  const renderBasicFilter = () => {
    if (!basicFilterColumn) return null;

    const columnType = basicFilterColumn.columnDef.meta?.type || "string";
    const enumValues = basicFilterColumn.columnDef.meta?.enum || [];

    if (columnType === "enum" && enumValues.length > 0) {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[180px] justify-between",
                !basicFilterValue && "text-muted-foreground"
              )}
            >
              {basicFilterValue ||
                `Filter ${
                  basicFilterColumn.columnDef.meta?.label ||
                  basicFilterColumn.id
                }`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search value..." />
              <CommandEmpty>No value found</CommandEmpty>
              <CommandGroup>
                {enumValues.map((value: string) => (
                  <CommandItem
                    key={value}
                    value={value}
                    onSelect={() => {
                      const newValue = basicFilterValue === value ? "" : value;
                      handleBasicFilterChange(newValue);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        basicFilterValue === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {value}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      );
    }

    return (
      <div className="relative">
        <Input
          placeholder={`Filter ${
            basicFilterColumn.columnDef.meta?.label || basicFilterColumn.id
          }`}
          value={basicFilterValue}
          onChange={(e) => handleBasicFilterChange(e.target.value)}
          className="h-8 w-[180px] pr-8"
        />
        {basicFilterValue && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-8 w-8"
            onClick={() => handleBasicFilterChange("")}
          >
            <Cross2Icon className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          {/* Search Input */}
          <div className="relative">
            <Input
              placeholder="Search all columns..."
              value={table.getState().globalFilter ?? ""}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              className="h-8 w-[150px] lg:w-[250px] pr-8"
            />
            {table.getState().globalFilter && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-8 w-8"
                onClick={() => table.setGlobalFilter("")}
              >
                <Cross2Icon className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Basic Filter (single filter) */}
          {basicFilterColumn && renderBasicFilter()}

          {/* Advanced Filter Button */}
          {advancedFilterColumns.length > 0 && (
            <Button
              variant={showAdvancedFilter ? "default" : "outline"}
              size="sm"
              onClick={toggleAdvancedFilter}
            >
              <MixerHorizontalIcon className="h-4 w-4 mr-2" />
              Advanced
            </Button>
          )}
        </div>

        {/* Right side buttons - Download and View */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownload}
            className="hidden sm:flex"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download
          </Button>

          {hideableColumns.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={hasHiddenColumns ? "default" : "outline"}
                  size="sm"
                >
                  <EyeOpenIcon className="h-4 w-4 mr-2" />
                  View
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {hideableColumns.map((column: any) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.columnDef.meta?.label || column.id}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Advanced Filter Panel */}
      {showAdvancedFilter && advancedFilterColumns.length > 0 && (
        <DataTableAdvancedFilter
          columns={advancedFilterColumns}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />
      )}
    </div>
  );
}
