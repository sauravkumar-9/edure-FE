import TabLayout from "@/components/comman/tabLayout";
import ExamsOverview from "./examsOverview";
import ExamsSchedule from "./examsSchedule";

const tabsDetails: any = [
  {
    value: "schedule",
    label: "Schedule",
    component: ExamsSchedule,
  },
  {
    value: "overview",
    label: "Overview",
    component: ExamsOverview,
  },
];

function ExamDetails() {
  return (
    <div className="">
      <TabLayout tabs={tabsDetails} mode="content" />
    </div>
  );
}

export default ExamDetails;
