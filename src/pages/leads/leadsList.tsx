import { useState } from "react";
import TableView from "@/components/table/table";
import {
  leadReportColumns,
  leadListMock
} from "./data/leadData";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LeadList() {
  const [tabValue, setTabValue] = useState("all");

  // Filter data based on tab selection
  const filteredData = leadListMock.filter(lead => {
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
      <Tabs 
        value={tabValue} 
        onValueChange={setTabValue}
        className="w-full"
      >
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">All Leads ({leadListMock.length})</TabsTrigger>
            <TabsTrigger value="verified">Verified ({leadListMock.filter(lead => lead.lead_verified === "Yes").length})</TabsTrigger>
            <TabsTrigger value="unverified">Unverified ({leadListMock.filter(lead => lead.lead_verified === "No").length})</TabsTrigger>
          </TabsList>
        </div>
      </Tabs>

      {/* Single TableView with filtered data */}
      <TableView 
        data={filteredData} 
        columns={leadReportColumns} 
      />
    </div>
  );
}