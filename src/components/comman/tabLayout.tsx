"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

type Mode = "navigation" | "filter" | "content";

interface BaseTab {
  value: string;
  label: string;
}

interface NavigationTab extends BaseTab {
  to: string;
}

interface FilterTab extends BaseTab {
  count?: number;
}

interface ContentTab extends BaseTab {
  component: React.ComponentType<any>;
  props?: any;
}

interface TabLayoutProps {
  mode: Mode;
  tabs: (NavigationTab | FilterTab | ContentTab)[];
  defaultTab?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  contentClassName?: string;
}

/**
 * TabLayout can be:
 * - Navigation Tabs (with react-router links)
 * - Filter Tabs (with counts)
 * - Content Tabs (render components inside tabs)
 */
export default function TabLayout({
  mode,
  tabs,
  defaultTab,
  value,
  onChange,
  className,
  contentClassName,
}: TabLayoutProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  // For navigation mode, determine active tab from current path
  const navActiveValue =
    mode === "navigation"
      ? (tabs as NavigationTab[]).find((tab) => tab.to === currentPath)
          ?.value ||
        (tabs[0] && tabs[0].value)
      : undefined;

  const tabValue =
    value ??
    navActiveValue ??
    defaultTab ??
    (tabs.length > 0 ? tabs[0].value : "");

  return (
    <Tabs
      value={tabValue}
      onValueChange={onChange}
      defaultValue={defaultTab}
      className={cn("w-full", className)}
    >
      <TabsList>
        {tabs.map((tab) => {
          if (mode === "navigation") {
            const navTab = tab as NavigationTab;
            return (
              <TabsTrigger key={navTab.value} value={navTab.value} asChild>
                <Link to={navTab.to}>{navTab.label}</Link>
              </TabsTrigger>
            );
          }

          if (mode === "filter") {
            const filterTab = tab as FilterTab;
            return (
              <TabsTrigger key={filterTab.value} value={filterTab.value}>
                {filterTab.label}
                {typeof filterTab.count === "number" && (
                  <> ({filterTab.count})</>
                )}
              </TabsTrigger>
            );
          }

          if (mode === "content") {
            return (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            );
          }

          return null;
        })}
      </TabsList>

      {mode === "content" &&
        (tabs as ContentTab[]).map((tab) => (
          <TabsContent
            key={tab.value}
            value={tab.value}
            className={cn("mt-2", contentClassName)}
          >
            <tab.component {...(tab.props || {})} />
          </TabsContent>
        ))}
    </Tabs>
  );
}
