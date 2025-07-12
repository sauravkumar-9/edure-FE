import { useEffect, useState } from "react";
import TableView from "@/components/table/table";
import { generateColumnsFromResponse } from "../utils/tableBuilder";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getAllLeads } from "../leadService";

export default function LeadList() {
  const [tabValue, setTabValue] = useState("all");
  const [leadReportColumns, setLeadReportColumns] = useState<any[]>([]);
  const [leadListMock, setLeadListMock] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [response, setResponse] = useState<any>({});

  useEffect(() => {
    getLeadList();
  }, []);

  // useEffect(() => {
  //   getLeadList();
  // }, [filterData]);

  const updateFilterData = (newFilterData: any) => {
    console.log("newFilterDatanewFilterData", newFilterData);
    setFilterData(newFilterData);
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
            onViewUpdate={updateFilterData}
            totalCount={response.total}
            metaData={{ searchPlaceholder: "Search by lead name, email, code" }}
          />
        </>
      )}
    </div>
  );
}
