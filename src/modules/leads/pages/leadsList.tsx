import { useEffect, useRef, useState } from "react";
import TableView from "@/components/table/table";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";

import { generateColumnsFromResponse } from "../helper/tableBuilder";
import {
  addNoteToLead,
  downloadLeadsReport,
  getAllLeads,
  updateLeadStatus,
} from "../services/leadService";
import { LoadType } from "../types/types";
import showToast from "@/components/comman/toast";
import TabLayout from "@/components/comman/tabLayout";

export default function LeadList() {
  const [tabValue, setTabValue] = useState("all");
  const leadReportColumnsRef = useRef<any[]>([]);
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
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    getLeadList({ loadType: "page" });
  }, []);

  useEffect(() => {
    console.log("Current Filter Data", {
      pagination,
      sorting,
      columnFilters,
      searchTerm,
    });
    const queryString = generateQueryParams({
      pagination,
      sorting,
      columnFilters,
      searchTerm,
      tabValue,
    });
    getLeadList({ loadType: "table", queryString });
  }, [pagination, sorting, columnFilters, searchTerm, tabValue]);

  interface FilterState {
    pagination: {
      pageIndex: number;
      pageSize: number;
    };
    sorting: Array<{
      id: string;
      desc: boolean;
    }>;
    columnFilters: ColumnFiltersState;
    searchTerm?: string;
    tabValue: string;
  }

  function generateQueryParams(filters: FilterState): string {
    const params = new URLSearchParams();

    // Pagination
    params.set("page", String(filters.pagination.pageIndex + 1));
    params.set("pageSize", String(filters.pagination.pageSize));

    // Sorting
    if (filters.sorting.length > 0) {
      const sort = filters.sorting[0];
      params.set("sortBy", sort.id);
      params.set("sortOrder", sort.desc ? "desc" : "asc");
    }

    // Column Filters
    filters.columnFilters.forEach((filter: any) => {
      if (filter.value?.value?.length > 0) {
        params.set(
          `${filter.id}_${filter.value.operator}`,
          filter.value.value.join(",")
        );
      }
    });

    // Search
    if (filters.searchTerm) {
      params.set("search", filters.searchTerm);
    }

    // Tab Value (verified/unverified filter)
    if (filters.tabValue === "verified") {
      params.set("verified", "true");
    } else if (filters.tabValue === "unverified") {
      params.set("verified", "false");
    }
    // Don't add anything if tabValue === "all"

    return params.toString();
  }

  const updateTableState = (partial: {
    pagination?: typeof pagination;
    sorting?: typeof sorting;
    columnFilters?: typeof columnFilters;
    searchTerm?: string;
  }) => {
    if (partial.pagination) setPagination(partial.pagination);
    if (partial.sorting) setSorting(partial.sorting);
    if (partial.columnFilters) setColumnFilters(partial.columnFilters);
    if (partial.searchTerm || partial.searchTerm === "")
      setSearchTerm(partial.searchTerm);
  };

  const handleDownloadReport = async () => {
    await downloadLeadsReport({
      searchTerm,
      columnFilters,
    });
  };

  const updateLoadingState = ({
    loadType,
    loadingState,
  }: LoadType & { loadingState: boolean }) => {
    if (loadType === "page") {
      setIsPageLoading(loadingState);
    } else {
      setIsTableLoading(loadingState);
    }
  };

  const handleLeadUpdate = async ({
    updatedLead,
    updateType,
  }: {
    updatedLead: any;
    updateType: "STATUS" | "NOTE";
  }) => {
    try {
      console.log("lead", { updatedLead, updateType });
      let sucessMsg = "";
      if (updateType === "STATUS") {
        await updateLeadStatus({
          id: updatedLead.id,
          status: updatedLead.newStatus,
          note: updatedLead.note,
        });
        sucessMsg = `${updatedLead.fullName} has been updated as ${updatedLead.newStatus} lead.`;
      } else if (updateType === "NOTE") {
        await addNoteToLead({
          id: updatedLead.id,
          note: updatedLead.note,
        });
        sucessMsg = `Note added to ${updatedLead.name}`;
      }
      showToast({
        title: "Lead added",
        description: sucessMsg,
        type: "success",
      });
    } catch (err) {
      console.log(err);
      const errorMsg =
        updateType === "NOTE"
          ? "Failed to add note"
          : "Failed to update status";
      showToast({
        title: "Error",
        description: errorMsg,
        type: "error",
      });
    }
  };

  const getLeadList = async ({ loadType, queryString }: LoadType) => {
    try {
      updateLoadingState({ loadType, loadingState: true });
      const payload: any = {
        queryParams: queryString,
      };
      const response: any = await getAllLeads(payload);
      if (loadType === "page") {
        leadReportColumnsRef.current = generateColumnsFromResponse(
          response,
          handleLeadUpdate
        );
      }

      setResponse(response);
      updateLoadingState({ loadType, loadingState: false });
    } catch (error) {
      updateLoadingState({ loadType, loadingState: false });
    }
  };

  const tabs = [
    {
      value: "all",
      label: "All Leads",
      count: response?.stats?.verified + response?.stats?.unverified,
    },
    { value: "verified", label: "Verified", count: response?.stats?.verified },
    {
      value: "unverified",
      label: "Unverified",
      count: response?.stats?.unverified,
    },
  ];

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
          <TabLayout
            mode="filter"
            value={tabValue}
            onChange={setTabValue}
            tabs={tabs}
          />

          <TableView
            data={response.rows}
            columns={leadReportColumnsRef.current}
            onViewUpdate={updateTableState}
            onDownloadReport={handleDownloadReport}
            totalCount={response.total}
            tableState={{ pagination, sorting, columnFilters, searchTerm }}
            metaData={{ searchPlaceholder: "Search by lead name, email, code" }}
            isTableLoading={isTableLoading}
          />
        </>
      )}
    </div>
  );
}
