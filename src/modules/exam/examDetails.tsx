import TabLayout from "@/components/comman/tabLayout";
import ExamsOverview from "./examsOverview";
import ExamsSchedule from "./examsSchedule";
import { useState } from "react";

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

export default function ExamDetails() {
  const [tabValue, setTabValue] = useState(tabsDetails[0].value);
  return (
    <div className="">
      <TabLayout
        tabs={tabsDetails}
        mode="content"
        value={tabValue}
        onChange={setTabValue}
      />
    </div>
  );
}
