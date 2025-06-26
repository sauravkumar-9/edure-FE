"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface BarChartData {
  name: string;
  value: number;
}

interface SubjectBarChartProps {
  title: string;
  description?: string;
  data: BarChartData[];
  metricName: string;
  metricColor?: string;
  peakValue?: number;
  peakMonth?: string;
  trendPercentage?: number;
  className?: string;
}

export function CustomBarChart({
  title,
  description,
  data,
  metricName = "Visitors",
  metricColor = "#818CF8", // indigo-400 as default
  peakValue,
  peakMonth,
  trendPercentage = 0,
  className,
}: SubjectBarChartProps) {
  // Calculate peak if not provided
  const calculatedPeak =
    peakValue || Math.max(...data.map((item) => item.value));
  const calculatedPeakMonth =
    peakMonth || data.find((item) => item.value === calculatedPeak)?.name || "";

  // Determine trend direction
  const isTrendingUp = trendPercentage >= 0;
  const TrendIcon = isTrendingUp ? TrendingUp : TrendingDown;
  const trendColor = isTrendingUp ? "text-green-500" : "text-red-500";

  const chartConfig = {
    value: {
      label: metricName,
      color: metricColor,
    },
  } satisfies ChartConfig;

  return (
    <Card className={cn("border-none shadow-sm")}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pb-2">
        <ChartContainer config={chartConfig}>
          <BarChart
            data={data}
            margin={{
              top: 16,
              right: 16,
              bottom: 16,
              left: 0,
            }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#E2E8F0" // gray-200
            />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              stroke="#64748B" // slate-500
              tick={{ fill: "#64748B", fontSize: 12 }}
            />
            {/* <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              stroke="#64748B" // slate-500
              tick={{ fill: "#64748B", fontSize: 12 }}
            /> */}
            {/* <ChartTooltip
              cursor={{ fill: "#F1F5F9", opacity: 0.8 }} // slate-100
              content={<ChartTooltipContent />}
            /> */}
            <Bar
              dataKey="value"
              name={metricName}
              fill="url(#barGradient)"
              radius={[8, 8, 0, 0]}
              animationDuration={1500}
              barSize={60}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="100%">
                <stop offset="0%" stopColor="#93C5FD" /> {/* blue-300 */}
                <stop offset="50%" stopColor="#818CF8" /> {/* indigo-400 */}
                <stop offset="100%" stopColor="#A78BFA" /> {/* purple-400 */}
              </linearGradient>
            </defs>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-1 pt-0 text-sm">
        {calculatedPeakMonth && (
          <div className="flex items-center gap-2 font-medium leading-none">
            <span className="text-indigo-500">
              Peak in {calculatedPeakMonth} with {calculatedPeak}{" "}
              {metricName.toLowerCase()}
            </span>
          </div>
        )}
        {trendPercentage !== undefined && (
          <div className={`flex items-center gap-1 leading-none ${trendColor}`}>
            <TrendIcon className="h-4 w-4" />
            <span>
              {Math.abs(trendPercentage)}%{" "}
              {isTrendingUp ? "increase" : "decrease"} from previous period
            </span>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

// Helper functions for color manipulation
function lightenColor(color: string, percent: number): string {
  // Implementation depends on your color format
  // This is a simplified version for hex colors
  return color; // Replace with actual lightening logic
}

function darkenColor(color: string, percent: number): string {
  // Implementation depends on your color format
  // This is a simplified version for hex colors
  return color; // Replace with actual darkening logic
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
