"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "#93C5FD" }, // blue-300
  { browser: "safari", visitors: 200, fill: "#818CF8" }, // indigo-400
  { browser: "firefox", visitors: 187, fill: "#A78BFA" }, // purple-400
  { browser: "edge", visitors: 173, fill: "#60A5FA" }, // blue-400
  { browser: "other", visitors: 90, fill: "#C7D2FE" }, // indigo-200
];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "#93C5FD", // blue-300
  },
  safari: {
    label: "Safari",
    color: "#818CF8", // indigo-400
  },
  firefox: {
    label: "Firefox",
    color: "#A78BFA", // purple-400
  },
  edge: {
    label: "Edge",
    color: "#60A5FA", // blue-400
  },
  other: {
    label: "Other",
    color: "#C7D2FE", // indigo-200
  },
} satisfies ChartConfig;

export function PieChartDonut() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Browser Usage</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm items-start">
        <div className="flex items-center gap-2 font-medium leading-none text-indigo-400">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors by browser for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
