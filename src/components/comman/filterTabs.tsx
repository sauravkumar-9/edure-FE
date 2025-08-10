"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabItem {
  value: string;
  label: string;
  count?: number;
}

interface StatsTabsProps {
  value: string;
  onChange: (value: string) => void;
  tabs: TabItem[];
}

export function FilterTabs({ value, onChange, tabs }: StatsTabsProps) {
  return (
    <Tabs value={value} onValueChange={onChange} className="w-full">
      <div className="flex items-center justify-between">
        <TabsList>
          {tabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
              {typeof tab.count === "number" && <> ({tab.count})</>}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
    </Tabs>
  );
}
