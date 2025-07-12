import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Outlet, useLocation } from "react-router-dom";

interface TabItem {
  value: string;
  label: string;
  to: string;
}

const tabs: TabItem[] = [
  {
    value: "insights",
    label: "Insights",
    to: "/admission/insights", // Use full path
  },
  {
    value: "report",
    label: "Report",
    to: "/admission/report", // Use full path
  },
];

export function Admission() {
  const location = useLocation();

  // More precise matching using pathname
  const currentTab =
    tabs.find(
      (tab) =>
        location.pathname === tab.to ||
        location.pathname.startsWith(`${tab.to}/`)
    )?.value || tabs[0].value;

  return (
    <div className="space-y-4">
      <Tabs value={currentTab} className="w-full">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} asChild>
              <Link to={tab.to}>{tab.label}</Link>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Outlet />
    </div>
  );
}
