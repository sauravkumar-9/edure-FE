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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function DataTableToolbar({
  table,
  metaData,
  onDownloadReport,
}: {
  table: any;
  metaData?: {
    searchPlaceholder?: string;
  };
  onDownloadReport?: () => void;
}) {
  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);
  const [basicFilterValue, setBasicFilterValue] = useState<string[]>([]);
  const [showDownloadDialog, setShowDownloadDialog] = useState(false);

  const basicFilterColumn = table
    .getAllColumns()
    .find((column: any) => column.columnDef.meta?.filterConfig?.isBasic);

  const advancedFilterColumns = table
    .getAllColumns()
    .filter((column: any) => column.columnDef.meta?.filterConfig?.isAdvanced);

  const hideableColumns = table
    .getAllColumns()
    .filter((column: any) => column.columnDef.meta?.filterConfig?.enableHiding);

  const hasHiddenColumns = hideableColumns.some(
    (column: any) => !column.getIsVisible()
  );

  const handleBasicFilterChange = (value: string) => {
    let updatedValues = [...basicFilterValue];
    if (updatedValues.includes(value)) {
      updatedValues = updatedValues.filter((v) => v !== value);
    } else {
      updatedValues.push(value);
    }

    setBasicFilterValue(updatedValues);

    if (!basicFilterColumn) return;

    if (updatedValues.length > 0) {
      table.setColumnFilters([
        {
          id: basicFilterColumn.id,
          value: {
            operator: "in",
            value: updatedValues,
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
    setBasicFilterValue([]);
    setShowAdvancedFilter(false);
  };

  const toggleAdvancedFilter = () => {
    setShowAdvancedFilter(!showAdvancedFilter);
  };

  const handleDownloadClick = () => {
    setShowDownloadDialog(true);
  };

  const confirmDownload = () => {
    setShowDownloadDialog(false);
    onDownloadReport?.();
  };

  const renderBasicFilter = () => {
    if (!basicFilterColumn) return null;

    const columnType = basicFilterColumn.columnDef.meta?.type;
    const enumValues = basicFilterColumn.columnDef.meta?.enum;

    if (columnType === "enum" && enumValues?.length > 0) {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className={cn(
                "w-[180px] justify-between",
                basicFilterValue.length === 0 && "text-muted-foreground"
              )}
            >
              {basicFilterValue.length > 0
                ? basicFilterValue.join(", ")
                : `Filter ${
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
                    key={value.value}
                    value={value.value}
                    onSelect={() => handleBasicFilterChange(value.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        basicFilterValue.includes(value.value)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {value.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
            {basicFilterValue.length > 0 && (
              <div className="border-t px-2 py-2">
                <Button
                  variant="ghost"
                  className="w-full text-sm"
                  onClick={() => {
                    setBasicFilterValue([]);
                    table.setColumnFilters([]);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
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
          value={basicFilterValue[0] || ""}
          onChange={(e) => {
            const val = e.target.value;
            setBasicFilterValue(val ? [val] : []);
            table.setColumnFilters(
              val
                ? [
                    {
                      id: basicFilterColumn.id,
                      value: {
                        operator: "equals",
                        value: [val],
                      },
                    },
                  ]
                : []
            );
          }}
          className="h-8 w-[180px] pr-8"
        />
        {basicFilterValue.length > 0 && (
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

        {/* Right Side: Download and View */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadClick}
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

      {/* Download Confirmation Dialog */}
      <AlertDialog
        open={showDownloadDialog}
        onOpenChange={setShowDownloadDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Download</AlertDialogTitle>
            <AlertDialogDescription>
              This will download the current filtered data. Large datasets may
              take longer to process.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDownload}>
              Download
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
