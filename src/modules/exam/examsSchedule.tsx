import TableView from "@/components/table/table";
import { examTimetableColumns, examTimetableData } from "./data";

export default function ExamsSchedule() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Exam Timetable - Semester 1 2024</h2>
      {/* <TableView
        data={examTimetableData}
        columns={examTimetableColumns}
        isToolBar={false}
        isPagination={false}
      /> */}
    </div>
  );
}
