"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";

interface NavigationTab {
  value: string;
  label: string;
  to: string;
}

interface NavigationTabsProps {
  tabs: NavigationTab[];
  className?: string;
}

export function NavigationTabs({ tabs, className }: NavigationTabsProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Determine active tab from current path
  const activeValue =
    tabs.find((tab) => tab.to === currentPath)?.value || tabs[0].value;

  return (
    <Tabs value={activeValue} className={className || "w-full"}>
      <TabsList>
        {tabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} asChild>
            <Link to={tab.to}>{tab.label}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
