import TableView from "@/components/table/table";
import { admissionReportColumns } from "./data/admissionReportColumns";
import { admissionStudentListMock } from "@/mockData/admission";
import { admissionListSchema } from "./data/admissionReportColumns";
import SectionHeader from "@/components/cards/sectionHeader";

const userList = admissionListSchema.parse(admissionStudentListMock);

export function AdmissionReport() {
  return (
    <div className="space-y-4">
      <SectionHeader
        title="Admission Report"
        subtitle="Comprehensive overview of current admission statistics and trends"
      />
      {/* <TableView data={userList} columns={admissionReportColumns} /> */}
    </div>
  );
}
