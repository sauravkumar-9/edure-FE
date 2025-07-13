import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  MixerHorizontalIcon,
  DownloadIcon,
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
import { Check, ChevronsUpDown, TableIcon } from "lucide-react";

export function DataTableToolbar({
  table,
  metaData,
}: {
  table: any;
  metaData?: {
    searchPlaceholder?: string;
  };
}) {
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [basicFilterValue, setBasicFilterValue] = useState("");

  // Get the single basic filter column (first one marked with isBasic)
  const basicFilterColumn = table
    .getAllColumns()
    .find((column: any) => column.columnDef.meta?.filterConfig?.isBasic);

  // Columns for advanced filter (marked with isAdvanced)
  const advancedFilterColumns = table
    .getAllColumns()
    .filter((column: any) => column.columnDef.meta?.filterConfig?.isAdvanced);

  // Only show columns that can be hidden (enableHiding: true)
  const hideableColumns = table
    .getAllColumns()
    .filter((column: any) => column.columnDef.meta?.filterConfig?.enableHiding);

  // Check if any hideable columns are currently hidden
  const hasHiddenColumns = hideableColumns.some(
    (column: any) => !column.getIsVisible()
  );

  const handleBasicFilterChange = (value: string) => {
    console.log("Basic Filter Value:", value);
    setBasicFilterValue(value);

    if (!basicFilterColumn) return;

    // Apply filter immediately when changed
    if (value) {
      console.log("basicFilterColumn", basicFilterColumn);
      table.setColumnFilters([
        {
          id: basicFilterColumn.id,
          value: {
            operator: "equals",
            value: [value],
          },
        },
      ]);
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
    console.log("YESSSSS", basicFilterColumn);
    if (!basicFilterColumn) return null;
    console.log("KKKKKKKK", basicFilterColumn);

    const columnType = basicFilterColumn.columnDef.meta?.type;
    const enumValues = basicFilterColumn.columnDef.meta?.enum;
    console.log(JSON.stringify(enumValues));

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
                {enumValues.map((value: any) => (
                  <CommandItem
                    key={value.id}
                    value={value.value}
                    onSelect={() => {
                      const newValue =
                        basicFilterValue === value.value ? "" : value.value;
                      handleBasicFilterChange(newValue);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        basicFilterValue === value.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {value.label}
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
              placeholder={metaData?.searchPlaceholder}
              value={table.getState().globalFilter ?? ""}
              onChange={(e) => table.setGlobalFilter(e.target.value)}
              className="h-8 w-[200px] lg:w-[300px] pr-8 bg-white"
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

          {basicFilterColumn && renderBasicFilter()}

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
                  <TableIcon className="h-4 w-4 mr-2" />
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
