import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabContent {
  value: string;
  label: string;
  component: React.ComponentType;
  props: any;
}

interface GaugeMeterProps {
  value: number;
  size?: "sm" | "md" | "lg";
  // Add other GaugeMeter props as needed
}

interface DashboardTabsProps {
  tabs: TabContent[];
  defaultTab?: string;
  gaugeMeterProps?: {
    attendance?: GaugeMeterProps;
    grade?: GaugeMeterProps;
    // Add other gauge meters as needed
  };
  className?: string;
  reportData?: any;
  // Add other component props as needed
}

export default function DashboardTabs({
  tabs,
  defaultTab = tabs[0]?.value,
  className,
  reportData,
}: // Add other props as needed
DashboardTabsProps) {
  return (
    <Tabs defaultValue={defaultTab} className={cn("", className)}>
      <div className="bg-white sticky top-0 z-10 pb-3">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="mt-2">
          <tab.component {...tab.props} reportData={reportData} />
        </TabsContent>
      ))}
    </Tabs>
  );
}
