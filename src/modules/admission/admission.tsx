import { NavigationTabs } from "@/components/comman/navigationTab";
import { Outlet } from "react-router-dom";

interface TabItem {
  value: string;
  label: string;
  to: string;
}

const tabs: TabItem[] = [
  {
    value: "insights",
    label: "Insights",
    to: "/admission/insights",
  },
  {
    value: "report",
    label: "Report",
    to: "/admission/report",
  },
];

export function Admission() {
  return (
    <div className="space-y-4">
      <NavigationTabs tabs={tabs} />
      <Outlet />
    </div>
  );
}
