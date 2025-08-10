import StudentProfileHeader from "../../components/cards/StudentProfileHeader";

import type { StudentProfile } from "@/types/student";

import StudentAttendance from "@/components/layout/studentAttendence";
import TabLayout from "@/components/comman/tabs";
import StudentGrade from "@/components/layout/studentGrade";

const tabsDetails: any = [
  {
    value: "attendance",
    label: "Attendance",
    component: StudentAttendance,
  },
  {
    value: "grade",
    label: "Grade",
    component: StudentGrade,
  },
  // {
  //   value: "assignments",
  //   label: "Assignments",
  //   component: StudentAssignments,
  //   props: {
  //     columns,
  //     userList,
  //   },
  // },
];

function StudentProfile() {
  const studentData: StudentProfile = {
    id: "202500101",
    name: "Rohit Sharma",
    email: "saurav.kumar@gmail.com",
    contactNumber: "9788721672",
    totalAttendance: {
      days: 110,
    },
    absentAttendance: {
      days: 28,
    },
    profileImage:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  };

  return (
    <div className="">
      <StudentProfileHeader student={studentData} />
      <TabLayout tabs={tabsDetails} />
    </div>
  );
}

export default StudentProfile;
