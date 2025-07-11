import { useEffect, useState } from "react";
import TableView from "@/components/table/table";
import { generateColumnsFromResponse } from "../utils/tableBuilder";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllLeads } from "../leadService";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";

export default function LeadList() {
  const [tabValue, setTabValue] = useState("all");
  const [leadReportColumns, setLeadReportColumns] = useState<any[]>([]);
  const [response, setResponse] = useState<any>({});

  // Loading states
  const [isPageLoading, setIsPageLoading] = useState<boolean>(true);
  const [isTableLoading, setIsTableLoading] = useState<boolean>(true);

  // Filter States
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    getLeadList({ loadType: "page" });
  }, []);

  useEffect(() => {
    console.log("API CALLEDD", { pagination, sorting, columnFilters });
    getLeadList({ loadType: "table" });
  }, [pagination, sorting, columnFilters]);

  const updateTableState = (partial: {
    pagination?: typeof pagination;
    sorting?: typeof sorting;
    columnFilters?: typeof columnFilters;
  }) => {
    if (partial.pagination) setPagination(partial.pagination);
    if (partial.sorting) setSorting(partial.sorting);
    if (partial.columnFilters) setColumnFilters(partial.columnFilters);
  };

  const getLeadList = async ({ loadType }: { loadType: "page" | "table" }) => {
    console.log("getLeadList called");
    try {
      if (loadType === "page") {
        setIsPageLoading(true);
      } else {
        setIsTableLoading(true);
      }

      const formattedFilterData = formatFilterData({
        pagination,
        sorting,
        columnFilters,
      });
      const payload: any = {
        queryParams: formattedFilterData,
      };
      const response: any = await getAllLeads(payload);
      console.log("Ddddd", response);
      setResponse(response);

      const columns = generateColumnsFromResponse(response);
      setLeadReportColumns(columns);

      if (loadType === "page") {
        setIsPageLoading(false);
      } else {
        setIsTableLoading(false);
      }
    } catch (error) {
      if (loadType === "page") {
        setIsPageLoading(false);
      } else {
        setIsTableLoading(false);
      }
    }
  };

  const formatFilterData = (filterData: any) => {
    const {
      searchValue,
      sortBy,
      sortDirection,
      pageSize,
      currentPage,
      filterBy,
    } = filterData;
    const filter = filterBy?.map((item: any) => ({
      [item.columnId]: item.value,
    }));
    return {
      searchValue,
      sortBy,
      sortDirection,
      pageSize,
      currentPage,
      filter,
    };
  };

  return (
    <div className="space-y-4">
      {isPageLoading ? (
        <div className="space-y-4">
          {/* Tab Loading Skeleton */}
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              {["all", "verified", "unverified"].map((tab) => (
                <Skeleton key={tab} className="h-10 w-24 rounded-md" />
              ))}
            </div>
          </div>

          {/* Table Toolbar Loading Skeleton */}
          <div className="flex items-center justify-between gap-2">
            <Skeleton className="h-8 w-[250px]" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>

          {/* Table Loading Skeleton */}
          <div className="rounded-md border overflow-x-auto w-full bg-white">
            <table className="w-full">
              <thead>
                <tr>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <th key={i} className="px-4 py-3 text-left">
                      <Skeleton className="h-4 w-3/4" />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 10 }).map((_, rowIdx) => (
                  <tr key={rowIdx} className="border-t">
                    {Array.from({ length: 5 }).map((_, cellIdx) => (
                      <td key={cellIdx} className="px-4 py-3">
                        <Skeleton className="h-4 w-full" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination Loading Skeleton */}
          <div className="flex items-center justify-between">
            <Skeleton className="h-8 w-32" />
            <div className="flex gap-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
            <Skeleton className="h-8 w-32" />
          </div>
        </div>
      ) : (
        <>
          <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all">
                  All Leads (
                  {response.stats?.verified + response.stats?.unverified})
                </TabsTrigger>
                <TabsTrigger value="verified">
                  Verified ({response.stats?.verified})
                </TabsTrigger>
                <TabsTrigger value="unverified">
                  Unverified ({response.stats?.unverified})
                </TabsTrigger>
              </TabsList>
            </div>
          </Tabs>

          <TableView
            data={response.rows}
            columns={leadReportColumns}
            onViewUpdate={updateTableState}
            totalCount={response.total}
            tableState={{ pagination, sorting, columnFilters }}
            metaData={{ searchPlaceholder: "Search by lead name, email, code" }}
            isTableLoading={isTableLoading}
          />
        </>
      )}
    </div>
  );
}
