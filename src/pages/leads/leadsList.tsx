import { useEffect, useState } from "react";
import TableView from "@/components/table/table";
import { generateColumnsFromResponse } from "./data/leadData";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { response } from "./data/apiMock";

export default function LeadList() {
  useEffect(() => {
    setLeadListMock(response.data);
    const columns = generateColumnsFromResponse(response);
    setLeadReportColumns(columns);
  }, []);
  const [tabValue, setTabValue] = useState("all");
  const [leadReportColumns, setLeadReportColumns] = useState<any[]>([]);
  const [leadListMock, setLeadListMock] = useState<any[]>([]);

  // Filter data based on tab selection
  const filteredData = leadListMock.filter((lead) => {
    switch (tabValue) {
      case "verified":
        return lead.lead_verified === "Yes";
      case "unverified":
        return lead.lead_verified === "No";
      default:
        return true; // "all" case
    }
  });

  return (
    <div className="space-y-4">
      <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">
              All Leads ({leadListMock.length})
            </TabsTrigger>
            <TabsTrigger value="Yes">
              Verified (
              {
                leadListMock.filter((lead) => lead.verificationStatus === "Yes")
                  .length
              }
              )
            </TabsTrigger>
            <TabsTrigger value="No">
              Unverified (
              {
                leadListMock.filter((lead) => lead.verificationStatus === "No")
                  .length
              }
              )
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      {/* Single TableView with filtered data */}
      <TableView data={filteredData} columns={leadReportColumns} />
    </div>
  );
}
