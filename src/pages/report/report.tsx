import DashboardTabs from "@/components/other/tabs";
import ReportTable from "./reportTable";
import ReportInsights from "./reportInsights";
import React, { useState } from "react";
import { ReportHeader } from "@/components/final/reportHeader";
import { useParams } from "react-router-dom";
import { roleBasedReports } from "./data/report";

const tabsDetails: any = [
  {
    value: "report",
    label: "Report",
    component: ReportTable,
  },
  {
    value: "insights",
    label: "Insights",
    component: ReportInsights,
  },
];

const departments = [
  "All Department",
  "Computer Science",
  "Electrical",
  "Mechanical",
  "Civil",
  "MBA",
  "Computer Science",
  "Electrical",
  "Mechanical",
  "Civil",
  "MBA",
  "Computer Science",
  "Electrical",
  "Mechanical",
  "Civil",
  "MBA",
];
const academicYears = [
  "2005-06",
  "2006-07",
  "2007-08",
  "2008-09",
  "2009-10",
  "2010-11",
  "2011-12",
  "2012-13",
  "2013-14",
  "2014-15",
  "2015-16",
  "2016-17",
  "2017-18",
  "2018-19",
  "2019-20",
  "2020-21",
  "2021-22",
  "2022-23",
  "2023-24",
  "2024-25",
];

function getReportById(id: string): ReportTableProps | undefined {
  for (const role in roleBasedReports) {
    const reports = roleBasedReports[role];
    const match = reports.find((report: any) => report.id === id);
    if (match) return match;
  }
  return undefined;
}
interface ReportTableProps {
  reportData: {
    id: string;
    title: string;
    description: string;
    category: string[];
    tag?: string;
  };
}

function Report() {
  const { id } = useParams<{ id: string }>();
  const reportData: any = id ? getReportById(id) : undefined;

  const [department, setDepartment] = useState(departments[0]);
  const [selectedYear, setSelectedYear] = useState(academicYears[0]);
  const [timeRange, setTimeRange] = useState("current_year");
  return (
    <React.Fragment>
      <ReportHeader
        title={reportData.title}
        description={`${reportData.description}`}
        filters={[
          {
            options: departments,
            value: department,
            onChange: setDepartment,
            placeholder: "Select department",
          },
          {
            options: academicYears,
            value: selectedYear,
            onChange: setTimeRange,
            placeholder: "Select year",
          },
        ]}
      />
      <DashboardTabs tabs={tabsDetails} reportData={reportData} />
    </React.Fragment>
  );
}
export default Report;
