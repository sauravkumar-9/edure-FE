import { useEffect, useState } from "react";
import TableView from "@/components/table/table";
import { generateColumnsFromResponse } from "../utils/tableBuilder";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllLeads } from "../leadService";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export default function LeadList() {
  const [tabValue, setTabValue] = useState("all");
  const [leadReportColumns, setLeadReportColumns] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [response, setResponse] = useState<any>({});

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  useEffect(() => {
    getLeadList();
  }, []);

  useEffect(() => {
    console.log("API CALLEDD", { pagination, sorting, columnFilters });
    getLeadList();
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

  const getLeadList = async () => {
    console.log("getLeadList called");
    try {
      setIsLoading(true);
      const formattedFilterData = formatFilterData(filterData);
      const payload: any = {
        queryParams: formattedFilterData,
      };
      const response: any = await getAllLeads(payload);
      console.log("Ddddd", response);
      setResponse(response);

      const columns = generateColumnsFromResponse(response);
      setLeadReportColumns(columns);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
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
      {isLoading ? (
        <div className="text-center text-muted-foreground py-12">
          Loading...
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
          />
        </>
      )}
    </div>
  );
}
