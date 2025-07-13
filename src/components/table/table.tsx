import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";

import {
  RowData,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { EmptyTable } from "./table-empty-state";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    className?: string;
    label?: string;
    type?: "string" | "number" | "date" | "enum" | "none";
    enum?: string[];
    filterConfig?: {
      isBasic?: boolean;
      isAdvanced?: boolean;
      enableSorting?: boolean;
      enableHiding?: boolean;
    };
  }
}

interface DataTableProps {
  columns: any;
  data: any;
  isToolBar?: boolean;
  isPagination?: boolean;
  totalCount?: number;
  onViewUpdate?: (filterData: any) => void;
  tableState: {
    pagination: any;
    sorting: any;
    columnFilters: any;
  };
  metaData?: {
    searchPlaceholder?: string;
  };
  isTableLoading?: boolean;
}

export default function TableView({
  columns,
  data,
  isToolBar = true,
  isPagination = true,
  totalCount = 0,
  onViewUpdate,
  metaData,
  tableState: { pagination, sorting, columnFilters },
  isTableLoading,
}: DataTableProps) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      pagination,
    },
    pageCount: Math.ceil(totalCount / pagination.pageSize),
    manualPagination: true,
    enableRowSelection: true,

    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;
      onViewUpdate?.({ pagination: newPagination });
    },
    onSortingChange: (newSorting) => {
      onViewUpdate?.({ sorting: newSorting });
    },
    onColumnFiltersChange: (newFilters) => {
      onViewUpdate?.({ columnFilters: newFilters });
    },

    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const resetFilters = () => {
    onViewUpdate?.({ columnFilters: [] });
  };

  return (
    <div className="space-y-4">
      {isToolBar && <DataTableToolbar table={table} metaData={metaData} />}

      <div className="rounded-md border overflow-x-auto w-full bg-white">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="group/row">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    className={header.column.columnDef.meta?.className ?? ""}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isTableLoading ? (
              // Skeleton loading state
              Array.from({ length: pagination.pageSize }).map((_, rowIndex) => (
                <TableRow key={`skeleton-${rowIndex}`}>
                  {Array.from({ length: columns.length }).map(
                    (_, cellIndex) => (
                      <TableCell key={`skeleton-cell-${cellIndex}`}>
                        <Skeleton className="h-6 w-full" />
                      </TableCell>
                    )
                  )}
                </TableRow>
              ))
            ) : table.getRowModel().rows.length ? (
              // Normal data rows
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="group/row"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.columnDef.meta?.className ?? ""}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              // Empty state
              <EmptyTable
                colSpan={columns.length}
                icon="filter"
                actionText="Reset Filters"
                onAction={() => resetFilters()}
                className="bg-muted/30"
              />
            )}
          </TableBody>
        </Table>
      </div>

      {isPagination && (
        <DataTablePagination table={table} totalCount={totalCount} />
      )}
    </div>
  );
}
