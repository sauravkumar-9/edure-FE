import TableView from "@/components/table/table";
import {
  admissionReportColumns,
  admissionStudentListMock,
} from "./data/admissionReportColumns";
import {
  studentPerformanceMock,
  performanceReportColumns,
} from "./data/studentPerfomenceReportData";

import {
  feesCollectionColumns,
  feesCollectionMock,
} from "./data/feeCollectionData";

import {
  placementStatsColumns,
  placementStatsMock,
} from "./data/placementData";

import {
  collegeExpenseColumns,
  collegeExpenseMock,
} from "./data/collegeExpenceData";

import {
  teacherPerformanceColumns,
  teacherPerformanceMock,
} from "./data/teacherPerfomence";

import {
  companyPlacementColumns,
  companyPlacementMock,
} from "./data/companyPlacementData";
// Utility to find tag from ID
interface ReportTableProps {
  reportData: {
    id: string;
    title: string;
    description: string;
    category: string[];
    tag?: string;
  };
}

export default function ReportTable({ reportData }: ReportTableProps) {
  console.log("DSDSDDS", reportData);
  const tag = reportData.tag;

  // Define fallback
  let data: any = [];
  let columns: any = [];

  // Switch data/columns based on tag
  switch (tag) {
    case "STUDENT_PERFORMANCE":
      data = studentPerformanceMock;
      columns = performanceReportColumns;
      break;

    case "ADMISSION":
      data = admissionStudentListMock;
      columns = admissionReportColumns;
      break;

    case "FEES_COLLECTION":
      data = feesCollectionMock;
      columns = feesCollectionColumns;
      break;

    case "PLACEMENT_STATS":
      data = placementStatsMock;
      columns = placementStatsColumns;
      break;

    case "COLLEGE_EXPENSE":
      data = collegeExpenseMock;
      columns = collegeExpenseColumns;
      break;

    case "TEACHER_PERFORMANCE":
      data = teacherPerformanceMock;
      columns = teacherPerformanceColumns;
      break;

    case "COMPANY_PLACEMENT_STATS":
      data = companyPlacementMock;
      columns = companyPlacementColumns;
      break;
    default:
      data = [];
      columns = [];
      break;
  }

  return (
    <div>
      <TableView data={data} columns={columns} />
    </div>
  );
}
