import React, { useState } from "react";
import { ReportListCard } from "@/components/cards/reportListCard";
import { roleBasedReports } from "@/modules/report/data/report";
import { SearchFilterBar } from "@/components/final/searchFilterBar";
import { Link } from "react-router-dom";
import { useRole } from "@/app/navigation";
import welcomeImage from "@/assets/vector/reportIntro.png";
import { SectionHeader } from "@/components/final/sectionHeader";

export const ReportListing: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const { role } = useRole();
  console.log("Selected Role is ", role);

  const roleKey = role.toLowerCase();

  // Combine common reports with role-specific reports
  const reports = [
    ...roleBasedReports.common,
    ...(roleBasedReports[roleKey] || []),
  ];

  return (
    <div className="space-y-6">
      {/* <PageBanner
        title="Reports Dashboard"
        subtitle="iew all reports in one place. Use filters and search to narrow down."
        icon={<IconPlugConnected size={48} className="text-indigo-500" />}
      /> */}
      <SectionHeader imageUrl={welcomeImage} />

      <SearchFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filter={filter}
        onFilterChange={setFilter}
        showSearch={true}
        showFilter={true}
      />

      {/* Report list */}
      <div className="space-y-2">
        {reports.length === 0 ? (
          <p className="text-muted-foreground text-sm">No reports found.</p>
        ) : (
          reports.map((report) => (
            <div key={report.id}>
              <Link to={report.id} className="block" key={report.id}>
                <ReportListCard report={report} />
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
