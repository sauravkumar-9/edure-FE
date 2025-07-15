// import TableView from "../table/table";

interface StudentAssignmentsProps {
  description?: string;
  userList: any[];
  columns: any[];
}

export default function StudentAssignments({
  description = "Assignments content goes here",
}: // userList,
// columns,
StudentAssignmentsProps) {
  return (
    <>
      <div className="text-center p-8 bg-muted/50 rounded-lg">
        {description}
      </div>
      {/* <TableView data={userList} columns={columns} /> */}
    </>
  );
}
