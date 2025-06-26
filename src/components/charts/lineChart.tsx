"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "Jan", desktop: 186 },
  { month: "Feb", desktop: 305 },
  { month: "Mar", desktop: 237 },
  { month: "Apr", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "Jun", desktop: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop Visitors",
    color: "#818CF8", // Using indigo-400 as primary color
  },
} satisfies ChartConfig;

export function CustomLineChart() {
  return (
    <Card className="">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Website Traffic</CardTitle>
        <CardDescription>
          Monthly desktop visitors (Jan-Jun 2024)
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              top: 16,
              left: 0,
              right: 16,
              bottom: 16,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#E2E8F0" // gray-200
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              stroke="#64748B" // slate-500
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              stroke="#64748B" // slate-500
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            <ChartTooltip
              cursor={{
                stroke: "#CBD5E1",
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              dot={{
                stroke: "#818CF8", // indigo-400
                strokeWidth: 2,
                fill: "#FFFFFF",
                r: 5,
              }}
              activeDot={{
                stroke: "#FFFFFF",
                strokeWidth: 2,
                fill: "#818CF8", // indigo-400
                r: 7,
              }}
            />
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#93C5FD" /> {/* blue-300 */}
                <stop offset="50%" stopColor="#818CF8" /> {/* indigo-400 */}
                <stop offset="100%" stopColor="#A78BFA" /> {/* purple-400 */}
              </linearGradient>
            </defs>
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 pt-0 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-indigo-500">
          <TrendingUp className="h-4 w-4" />
          <span>12.5% increase from last period</span>
        </div>
        <div className="leading-none text-slate-500">
          {" "}
          {/* slate-500 */}
          Peak traffic in February with 305 visitors
        </div>
      </CardFooter>
    </Card>
  );
}
