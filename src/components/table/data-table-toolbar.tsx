import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MixerHorizontalIcon, DownloadIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { DataTableAdvancedFilter } from "./data-table-advanced-filter";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  
  // Get all filterable columns
  const allColumns = table.getAllColumns();
  
  // Columns for basic filter dropdown (only those marked as isBasic)
  const basicFilterColumns = allColumns.filter(
    (column: any) => column.columnDef.meta?.filterData?.isBasic
  );
  
  // Columns for advanced filter (only those marked as isAdvanced)
  const advancedFilterColumns = allColumns.filter(
    (column: any) => column.columnDef.meta?.filterData?.isAdvanced
  );

  // State for basic filter
  const [basicFilter, setBasicFilter] = useState({
    column: basicFilterColumns[0]?.id || "",
    value: ""
  });

  // Check if any columns are hidden
  const hasHiddenColumns = table.getAllColumns().some((column: any) => !column.getIsVisible());

  const handleBasicFilterChange = (columnId: string, value: string) => {
    setBasicFilter({ column: columnId, value });
    
    // Apply filter immediately when changed
    if (value) {
      table.setColumnFilters([
        { id: columnId, value }
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
    setBasicFilter({ column: basicFilter.column, value: "" });
    setShowAdvancedFilter(false);
  };

  const toggleAdvancedFilter = () => {
    setShowAdvancedFilter(!showAdvancedFilter);
  };

  const handleDownload = () => {
    // Implement your download logic here
    console.log("Download data");
  };

  const getColumnType = (columnId: string) => {
    const column = basicFilterColumns.find((col: any) => col.id === columnId);
    return column?.columnDef.meta?.type || "string";
  };

  const getEnumValues = (columnId: string) => {
    const column = basicFilterColumns.find((col: any) => col.id === columnId);
    return column?.columnDef.meta?.enum || [];
  };

  const renderBasicFilterInput = () => {
    if (!basicFilter.column) return null;

    const type = getColumnType(basicFilter.column);
    const enumValues = getEnumValues(basicFilter.column);

    if (type === "enum" && enumValues.length > 0) {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[150px] justify-between",
                !basicFilter.value && "text-muted-foreground"
              )}
            >
              {basicFilter.value || "Select value"}
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
                      const newValue = basicFilter.value === value ? "" : value;
                      handleBasicFilterChange(basicFilter.column, newValue);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        basicFilter.value === value ? "opacity-100" : "opacity-0"
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
      <Input
        placeholder="Filter value..."
        value={basicFilter.value}
        onChange={(e) => 
          handleBasicFilterChange(basicFilter.column, e.target.value)
        }
        className="h-8 w-[150px]"
      />
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1">
          {/* Search Input */}
          <Input
            placeholder="Search all columns..."
            value={table.getState().globalFilter ?? ""}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="h-8 w-[150px] lg:w-[250px]"
          />

                    {/* Basic Filter - Simplified when only one column */}
{basicFilterColumns.length > 0 && (
  <div className="flex items-center gap-2">
    {basicFilterColumns.length > 1 ? (
      <>
        <Select
          value={basicFilter.column}
          onValueChange={(columnId) => 
            handleBasicFilterChange(columnId, "")
          }
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select column" />
          </SelectTrigger>
          <SelectContent>
            {basicFilterColumns.map((column: any) => (
              <SelectItem key={column.id} value={column.id}>
                {column.columnDef.meta?.label || column.id}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {renderBasicFilterInput()}
      </>
    ) : (
      // When only one basic filter column exists
      getColumnType(basicFilterColumns[0].id) === "enum" ? (
        // Multi-select dropdown for enum values
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[200px] justify-between",
                !basicFilter.value?.length && "text-muted-foreground"
              )}
            >
              {basicFilter.value?.length 
                ? `${basicFilter.value.length} selected` 
                : `Select ${basicFilterColumns[0].columnDef.meta?.label || basicFilterColumns[0].id}`}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[250px] p-0">
            <Command>
              <CommandInput placeholder="Search values..." />
              <CommandEmpty>No values found</CommandEmpty>
              <CommandGroup>
                {getEnumValues(basicFilterColumns[0].id).map((value: string) => {
                  const isSelected = basicFilter.value?.includes(value);
                  return (
                    <CommandItem
                      key={value}
                      onSelect={() => {
                        const currentValues = Array.isArray(basicFilter.value) 
                          ? [...basicFilter.value] 
                          : [];
                        
                        const newValues : any = isSelected
                          ? currentValues.filter(v => v !== value)
                          : [...currentValues, value];
                        
                        handleBasicFilterChange(
                          basicFilterColumns[0].id, 
                          newValues.length ? newValues : undefined
                        );
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          isSelected ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {value}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      ) : (
        // For non-enum single columns, show regular input
        renderBasicFilterInput()
      )
    )}
  </div>
)}

          {/* Advanced Filter Button - Moved to left */}
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
              {table
                .getAllColumns()
                .filter((column: any) => column.getCanHide())
                .map((column: any) => (
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